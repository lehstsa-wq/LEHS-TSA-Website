
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show on home page
  if (pathnames.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-accent-blue transition-colors">
                <Home size={16} />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const formattedName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

              return (
                <li key={to} className="flex items-center">
                  <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 mx-1" />
                  {isLast ? (
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide" aria-current="page">
                      {formattedName}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="text-xs font-medium text-gray-500 hover:text-accent-blue dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-wide"
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
