import React from 'react';

interface VideoEmbedProps {
  /** Vimeo player URL, including any ?h= privacy hash. */
  src: string;
  /** Accessible title for the iframe. Screen readers announce this. */
  title: string;
  className?: string;
}

/**
 * Responsive 16:9 video frame.
 *
 * The embed host must be allowed by the site's CSP `frame-src`
 * (see server.ts) or the iframe is blocked in production.
 */
export const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, title, className = '' }) => (
  <div
    className={`relative w-full overflow-hidden ${className}`}
    style={{
      aspectRatio: '16 / 9',
      borderRadius: 'var(--card-radius)',
      border: '1px solid var(--c-hairline)',
      background: '#000',
      boxShadow: 'var(--shadow-card)',
    }}
  >
    <iframe
      title={title}
      src={src}
      className="absolute inset-0 h-full w-full"
      frameBorder="0"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      allowFullScreen
    />
  </div>
);
