import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Fades and lifts its children into place when they enter the viewport.
 * Under prefers-reduced-motion the children render immediately, unanimated.
 */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, className, children }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
