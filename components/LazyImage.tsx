
import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
