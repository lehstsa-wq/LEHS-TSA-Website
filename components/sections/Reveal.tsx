import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface RevealProps {
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Fades and lifts its children into place the first time they enter the viewport.
 * Under prefers-reduced-motion the children render immediately, unanimated.
 *
 * Uses a latching `useInView` + `animate` rather than `whileInView`: several of
 * these sit inside legacy motion wrappers that animate their own opacity and
 * transform on mount. That parent motion makes the intersection observer report
 * out-of-view mid-flight, and `whileInView` + `once` then strands the child at a
 * partial opacity forever. `useInView(..., { once: true })` latches true and never
 * flips back, so the target state is reached and held.
 */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
