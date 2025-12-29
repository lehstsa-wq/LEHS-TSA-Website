
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Instagram, Twitter, Youtube, Facebook, MapPin, Mail, Cpu, ExternalLink, LogIn, User, LayoutDashboard, LogOut, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Breadcrumbs } from './Breadcrumbs';

// Search Data Map
const SITE_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'About TSA', path: '/about' },
  { name: 'Events Calendar', path: '/events' },
  { name: 'Officer Team', path: '/officers' },
  { name: 'Projects', path: '/projects' },
  { name: 'Competitions', path: '/competitions' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Resources', path: '/resources' },
  { name: 'Join Membership', path: '/join' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const allLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Leadership', path: '/officers' },
    { name: 'Competitions', path: '/competitions' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const mainLinks = allLinks.slice(0, 4); 
  const moreLinks = allLinks.slice(4);

  const isActive = (path: string) => location.pathname === path;
  const isMoreActive = moreLinks.some(link => isActive(link.path));

  // Search Filtering
  const filteredPages = searchQuery 
    ? SITE_PAGES.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredPages.length > 0) {
      navigate(filteredPages[0].path);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMoreOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  return (
    <>
      <nav className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-gray-200 dark:border-dark-border sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 shrink-0 group">
              <div className="w-10 h-10 bg-accent-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-accent-blue/20 group-hover:scale-105 transition-transform duration-300">
                <Cpu size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block group-hover:text-accent-blue transition-colors">Little Elm TSA</span>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white sm:hidden">LE TSA</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center ml-8 flex-1 justify-start">
              <div className="flex items-baseline space-x-2">
                {mainLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-accent-blue bg-accent-blue/10 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* More Dropdown */}
                <div className="relative ml-2" ref={dropdownRef}>
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 focus:outline-none ${
                      isMoreActive || isMoreOpen
                        ? 'text-accent-blue bg-accent-blue/10 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                    aria-label="More links"
                    aria-expanded={isMoreOpen}
                  >
                    <span className="text-sm font-medium">More</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMoreOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-200 dark:border-dark-border py-2 animate-fade-in overflow-hidden z-50 origin-top-left ring-1 ring-black ring-opacity-5">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`block px-4 py-3 text-sm font-medium transition-colors border-l-2 ${
                            isActive(link.path)
                              ? 'text-accent-blue bg-accent-blue/5 border-accent-blue'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-transparent'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Action */}
            <div className="hidden lg:flex items-center ml-4 space-x-3">
               {/* Search Trigger */}
               <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Search"
               >
                 <Search size={20} />
               </button>

               <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors mr-2"
                title="Toggle Theme"
                aria-label="Toggle Theme"
               >
                 {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
               </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-white bg-accent-blue hover:bg-accent-hover px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-accent-blue/10"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <div className="h-6 w-px bg-gray-200 dark:bg-dark-border mx-2"></div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 dark:text-gray-400 text-sm font-medium">Hi, {user?.name.split(' ')[0]}</span>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 dark:border-dark-border" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center text-accent-blue border border-gray-200 dark:border-dark-border">
                        <User size={16} />
                      </div>
                    )}
                    <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" title="Logout">
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/join" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors">Join</Link>
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile/Tablet Menu Button */}
            <div className="-mr-2 flex lg:hidden items-center gap-2">
              <button 
                 onClick={() => setIsSearchOpen(true)}
                 className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Search size={20} />
              </button>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
               >
                 {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
               </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border animate-fade-in shadow-lg absolute w-full z-40 max-h-[90vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {allLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                     isActive(link.path) 
                       ? 'text-accent-blue bg-accent-blue/10 pl-4' 
                       : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:pl-4'
                  } transition-all duration-200`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 dark:border-dark-border my-2 pt-2 pb-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-accent-blue bg-accent-blue/10 mb-2"
                    >
                      <LayoutDashboard size={18} className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    >
                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 px-2 mt-2">
                    <Link
                      to="/join"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-4 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10"
                    >
                      Join TSA
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-4 py-2 rounded-lg text-base font-medium text-white bg-accent-blue hover:bg-accent-hover shadow-lg shadow-accent-blue/20"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Global Search Modal */}
      {isSearchOpen && (
         <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in" onClick={() => setIsSearchOpen(false)}>
            <div className="w-full max-w-2xl bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden animate-slide-up" onClick={e => e.stopPropagation()}>
               <div className="p-4 border-b border-gray-200 dark:border-dark-border flex items-center gap-3">
                  <Search className="text-gray-400" size={24} />
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pages (e.g., Events, Competitions)..." 
                    className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white outline-none placeholder-gray-400"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg">
                    <X size={20} className="text-gray-500" />
                  </button>
               </div>
               {searchQuery && (
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                     {filteredPages.length > 0 ? (
                        filteredPages.map(page => (
                           <Link 
                             key={page.path} 
                             to={page.path}
                             onClick={() => setIsSearchOpen(false)}
                             className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                           >
                              <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-accent-blue">{page.name}</span>
                              <ExternalLink size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </Link>
                        ))
                     ) : (
                        <div className="p-8 text-center text-gray-500">
                           No pages found matching "{searchQuery}"
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      )}
      
      <Breadcrumbs />
    </>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-bg pt-16 pb-8 border-t border-gray-200 dark:border-dark-border mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-blue rounded flex items-center justify-center text-white">
                <Cpu size={18} />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Little Elm TSA</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Technology Student Association<br />
              Empowering students through technology, leadership, and innovation at Little Elm High School.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-blue dark:hover:text-white transition-all hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded hover:-translate-y-1" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-accent-blue dark:hover:text-white transition-all hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded hover:-translate-y-1" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-accent-blue dark:hover:text-white transition-all hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded hover:-translate-y-1" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-accent-blue dark:hover:text-white transition-all hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded hover:-translate-y-1" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">About TSA</Link></li>
              <li><Link to="/events" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Events</Link></li>
              <li><Link to="/officers" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Leadership</Link></li>
              <li><Link to="/competitions" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Competitions</Link></li>
              <li><Link to="/projects" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Projects</Link></li>
              <li><Link to="/gallery" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Gallery</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/resources" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Competition Resources</Link></li>
              <li><Link to="/resources" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Webmaster Tools</Link></li>
              <li><Link to="/resources" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Design Tips</Link></li>
              <li><Link to="/join" className="hover:text-accent-blue transition-all duration-300 block py-1 hover:translate-x-1">Join TSA</Link></li>
              <li><a href="#" className="hover:text-accent-blue transition-all duration-300 flex items-center py-1 hover:translate-x-1">Texas TSA <ExternalLink size={12} className="ml-1"/></a></li>
            </ul>
          </div>

          {/* Contact & Subscribe */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 mt-1 shrink-0 text-accent-blue" />
                <span>Little Elm High School<br/>1600 Walker Lane<br/>Little Elm, TX 75068</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 shrink-0 text-accent-blue" />
                <a href="mailto:tsa@littleelmisd.net" className="hover:text-accent-blue dark:hover:text-white transition-colors">tsa@littleelmisd.net</a>
              </li>
            </ul>

            <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-3">Stay Updated</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-100 dark:bg-transparent border border-gray-300 dark:border-dark-border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue focus:outline-none w-full placeholder-gray-500 dark:placeholder-gray-600 transition-all"
              />
              <button className="bg-accent-blue hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-accent-blue/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>2025 Little Elm High School TSA. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with dedication by Little Elm TSA Webmaster Team</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-text-main font-sans selection:bg-accent-blue selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};
