
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show on home page
  if (pathnames.length === 0) return null;

  return (
    <div className="bg-space-800 border-b border-space-500/30 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-ink-muted hover:text-electric-400 transition-colors text-xs font-medium uppercase tracking-wide">
                Home
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const formattedName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

              return (
                <li key={to} className="flex items-center">
                  <span className="text-space-500/60 mx-1 text-xs">/</span>
                  {isLast ? (
                    <span className="text-xs font-bold text-ink uppercase tracking-wide" aria-current="page">
                      {formattedName}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="text-xs font-medium text-ink-muted hover:text-electric-400 transition-colors uppercase tracking-wide"
                    >
                      {formattedName}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
