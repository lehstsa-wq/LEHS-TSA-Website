
import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, ...props }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  /* A cached image can finish decoding before React attaches onLoad, and that
     event never fires afterwards. The element then sits at opacity 0 forever,
     so the photo is "missing" on exactly the devices that already have it
     cached, while a cold first visit looks fine. Check `complete` on mount
     (and whenever src changes) instead of trusting the event alone. */
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    const img = ref.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) setIsLoaded(true);
    else setHasError(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-space-700/40 ${className}`}>
      {/* Skeleton / Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <ImageIcon className="text-space-500/60" size={24} />
        </div>
      )}

      {/* Actual Image */}
      {!hasError ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted">
           <ImageIcon size={32} />
           <span className="text-[10px] mt-1 uppercase tracking-wider">Failed to Load</span>
        </div>
      )}
    </div>
  );
};
