import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Documents uploaded to a competition's resource list.
 *
 * The project has no Cloud Storage bucket, so files live in Firestore: a
 * metadata doc at competition_files/{id} plus the base64 payload split across
 * competition_files/{id}/chunks/{n}, each chunk kept well under the 1 MiB
 * document limit. A resource link points at a file with a `file:<id>` url.
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
const CHUNK_CHARS = 700_000;
const FILE_PREFIX = 'file:';

export const isUploadedFile = (url: string) => url.startsWith(FILE_PREFIX);
export const fileIdOf = (url: string) => url.slice(FILE_PREFIX.length);

const readAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.readAsDataURL(file);
  });

/** Uploads a file and returns the `file:<id>` url to store on the link. */
export const uploadCompetitionFile = async (file: File, compId: string): Promise<string> => {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`That file is over ${MAX_FILE_BYTES / 1024 / 1024} MB. Try a smaller one or add it as a link.`);
  }
  const data = await readAsBase64(file);
  const ref = doc(collection(db, 'competition_files'));

  const chunks: string[] = [];
  for (let i = 0; i < data.length; i += CHUNK_CHARS) chunks.push(data.slice(i, i + CHUNK_CHARS));

  await Promise.all(chunks.map((c, i) => setDoc(doc(ref, 'chunks', String(i)), { data: c })));
  // Metadata goes last so a half-finished upload is never readable as complete
  await setDoc(ref, {
    name: file.name,
    contentType: file.type || 'application/octet-stream',
    size: file.size,
    chunkCount: chunks.length,
    compId,
    uploadedAt: new Date().toISOString(),
  });
  return FILE_PREFIX + ref.id;
};

const loadBlob = async (id: string): Promise<Blob> => {
  const meta = await getDoc(doc(db, 'competition_files', id));
  if (!meta.exists()) throw new Error('That file is no longer available.');
  const { contentType, chunkCount } = meta.data() as { contentType: string; chunkCount: number };

  const parts = await Promise.all(
    Array.from({ length: chunkCount }, (_, i) => getDoc(doc(db, 'competition_files', id, 'chunks', String(i))))
  );
  const binary = atob(parts.map(p => (p.data()?.data as string) ?? '').join(''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: contentType });
};

/**
 * Opens an uploaded file in a new tab. The tab is opened synchronously, before
 * the download, so popup blockers treat it as part of the click.
 */
export const openCompetitionFile = async (url: string) => {
  const win = window.open('', '_blank');
  try {
    const blobUrl = URL.createObjectURL(await loadBlob(fileIdOf(url)));
    if (win) win.location.href = blobUrl;
    else window.location.href = blobUrl;
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
  } catch (e) {
    win?.close();
    throw e;
  }
};

export const deleteCompetitionFile = async (url: string) => {
  const id = fileIdOf(url);
  const chunks = await getDocs(collection(db, 'competition_files', id, 'chunks'));
  await Promise.all(chunks.docs.map(c => deleteDoc(c.ref)));
  await deleteDoc(doc(db, 'competition_files', id));
};
