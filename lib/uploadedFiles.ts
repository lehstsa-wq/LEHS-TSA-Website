import type React from 'react';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Documents uploaded from the admin panel (competition resources and the
 * general resource library).
 *
 * The project has no Cloud Storage bucket, so files live in Firestore: a
 * metadata doc at {collection}/{id} plus the base64 payload split across
 * {collection}/{id}/chunks/{n}, each chunk kept well under the 1 MiB document
 * limit. A link points at a file with a `<prefix><id>` url; the prefix picks
 * the collection, which carries its own read rules.
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
const CHUNK_CHARS = 700_000;

const STORES = {
  competition: { prefix: 'file:', collection: 'competition_files' },
  resource: { prefix: 'resource-file:', collection: 'resource_files' },
} as const;
export type FileStore = keyof typeof STORES;

const storeOf = (url: string) => Object.values(STORES).find(s => url.startsWith(s.prefix));

export const isUploadedFile = (url: string) => !!storeOf(url);

const locate = (url: string) => {
  const store = storeOf(url);
  if (!store) throw new Error('Not an uploaded file.');
  return { collection: store.collection, id: url.slice(store.prefix.length) };
};

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

/**
 * Uploads a file and returns the url to store on the link. `meta` is saved on
 * the metadata doc (resource files need `accessLevel` for their read rule).
 */
export const uploadFile = async (file: File, store: FileStore, meta: Record<string, string> = {}): Promise<string> => {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`That file is over ${MAX_FILE_BYTES / 1024 / 1024} MB. Try a smaller one or add it as a link.`);
  }
  const { prefix, collection: col } = STORES[store];
  const data = await readAsBase64(file);
  const ref = doc(collection(db, col));

  const chunks: string[] = [];
  for (let i = 0; i < data.length; i += CHUNK_CHARS) chunks.push(data.slice(i, i + CHUNK_CHARS));

  // Metadata goes first so chunk read rules can look up its access level;
  // chunkCount is only set once every chunk is written.
  await setDoc(ref, {
    ...meta,
    name: file.name,
    contentType: file.type || 'application/octet-stream',
    size: file.size,
    chunkCount: 0,
    uploadedAt: new Date().toISOString(),
  });
  await Promise.all(chunks.map((c, i) => setDoc(doc(ref, 'chunks', String(i)), { data: c })));
  await setDoc(ref, { chunkCount: chunks.length }, { merge: true });
  return prefix + ref.id;
};

const loadBlob = async (url: string): Promise<Blob> => {
  const { collection: col, id } = locate(url);
  const meta = await getDoc(doc(db, col, id));
  if (!meta.exists()) throw new Error('That file is no longer available.');
  const { contentType, chunkCount } = meta.data() as { contentType: string; chunkCount: number };
  if (!chunkCount) throw new Error('That file is still uploading. Try again in a moment.');

  const parts = await Promise.all(
    Array.from({ length: chunkCount }, (_, i) => getDoc(doc(db, col, id, 'chunks', String(i))))
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
export const openUploadedFile = async (url: string) => {
  const win = window.open('', '_blank');
  try {
    const blobUrl = URL.createObjectURL(await loadBlob(url));
    if (win) win.location.href = blobUrl;
    else window.location.href = blobUrl;
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
  } catch (e) {
    win?.close();
    throw e;
  }
};

export const deleteUploadedFile = async (url: string) => {
  const { collection: col, id } = locate(url);
  const chunks = await getDocs(collection(db, col, id, 'chunks'));
  await Promise.all(chunks.docs.map(c => deleteDoc(c.ref)));
  await deleteDoc(doc(db, col, id));
};

/**
 * Props for an <a> that opens either an external url or an uploaded file, so
 * existing link markup can stay as it is.
 */
export const linkProps = (url: string, onError: (message: string) => void): React.AnchorHTMLAttributes<HTMLAnchorElement> =>
  isUploadedFile(url)
    ? {
        href: '#',
        onClick: e => {
          e.preventDefault();
          openUploadedFile(url).catch(err => onError(err instanceof Error ? err.message : 'Could not open that file.'));
        },
      }
    : { href: url, target: '_blank', rel: 'noopener noreferrer' };
