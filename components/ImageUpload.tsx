import React, { useRef, useState } from 'react';
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

/**
 * Photo picker used by the admin Leadership editor and member Settings.
 *
 * Images are downscaled in-browser and stored as data URLs directly on the
 * Firestore document — the project has no Cloud Storage bucket wired up, and a
 * 512px JPEG lands around 30–60 KB, well inside the 1 MiB document limit.
 */

const MAX_DIM = 512;
const MAX_BYTES = 600_000; // stay clear of Firestore's 1 MiB document ceiling

export const compressImageFile = (file: File, maxDim = MAX_DIM): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('That file is not an image.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode that image.'));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Image processing is not supported in this browser.')); return; }
        // White matte so transparent PNGs don't turn black once flattened to JPEG
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        let quality = 0.85;
        let out = canvas.toDataURL('image/jpeg', quality);
        while (out.length > MAX_BYTES && quality > 0.4) {
          quality -= 0.15;
          out = canvas.toDataURL('image/jpeg', quality);
        }
        if (out.length > MAX_BYTES) {
          reject(new Error('That image is too large even after compression. Try a smaller one.'));
          return;
        }
        resolve(out);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

interface ImageUploadProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  /** Fallback shown when there is no image (usually an initial or icon). */
  placeholder?: React.ReactNode;
  shape?: 'square' | 'circle';
  size?: number;
  /** Also offer a plain URL field alongside the file picker. */
  allowUrl?: boolean;
  onError?: (message: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value, onChange, placeholder, shape = 'square', size = 80, allowUrl = true, onError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');

  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await compressImageFile(file));
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Could not process that image.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const radius = shape === 'circle' ? '9999px' : '1rem';

  return (
    <div className="flex items-start gap-4">
      <div
        className="relative shrink-0 overflow-hidden border border-space-500/50 bg-space-700/50 flex items-center justify-center"
        style={{ width: size, height: size, borderRadius: radius }}
      >
        {value
          ? <img src={value} alt="" className="w-full h-full object-cover" />
          : <span className="text-ink-muted">{placeholder ?? <ImageIcon size={20} />}</span>}
        {busy && (
          <div className="absolute inset-0 flex items-center justify-center bg-space-900/70 text-ink">
            <Loader2 size={18} className="animate-spin" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-500 text-white text-xs font-bold hover:bg-electric-400 transition-colors disabled:opacity-50"
          >
            <Upload size={13} /> {value ? 'Replace photo' : 'Upload photo'}
          </button>
          {allowUrl && (
            <button
              type="button"
              onClick={() => setShowUrl(v => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-space-500/50 text-ink-dim text-xs font-bold hover:text-ink transition-colors"
            >
              <LinkIcon size={13} /> Use URL
            </button>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-space-500/50 text-ink-muted text-xs font-bold hover:text-gold-500 transition-colors"
            >
              <X size={13} /> Remove
            </button>
          )}
        </div>

        {showUrl && (
          <div className="flex gap-2">
            <input
              value={urlDraft}
              onChange={e => setUrlDraft(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="flex-1 min-w-0 bg-space-900 border border-space-500/50 px-2.5 py-1.5 rounded-lg text-xs text-ink placeholder-ink-muted outline-none focus:border-electric-500"
            />
            <button
              type="button"
              onClick={() => {
                const trimmed = urlDraft.trim();
                if (!trimmed) return;
                onChange(trimmed);
                setUrlDraft('');
                setShowUrl(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-electric-500 text-white text-xs font-bold hover:bg-electric-400 transition-colors shrink-0"
            >
              Set
            </button>
          </div>
        )}

        <p className="text-[11px] text-ink-muted">
          JPG or PNG. Photos are resized to {MAX_DIM}px before saving.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => pick(e.target.files?.[0])}
      />
    </div>
  );
};
