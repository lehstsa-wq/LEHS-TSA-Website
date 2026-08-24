import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Persistent join prompt for small screens.
 *
 * Hidden at `lg` and above (the navbar already carries a Join button), on the
 * join flow itself, on auth screens, and for anyone already signed in, so it
 * never nags someone who has already acted on it.
 */
const HIDE_ON = ['/join', '/login', '/signup', '/thank-you'];

export const StickyMobileCTA: React.FC = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null;
  if (HIDE_ON.some(p => pathname.startsWith(p))) return null;

  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
      style={{
        background: 'linear-gradient(to top, var(--c-bg) 62%, transparent)',
      }}
    >
      <Link
        to="/join"
        className="btn-primary w-full justify-center text-base py-3.5 shadow-lg"
      >
        Join the Chapter <ArrowRight size={17} />
      </Link>
    </div>
  );
};
