import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Instagram, Twitter, MapPin, Mail,
  LogIn, LayoutDashboard, LogOut, ChevronDown,
  Search, Users, Calendar, BookOpen,
  Newspaper, Image, Cpu, ExternalLink, ArrowRight,
  Command, Home, Info, Phone, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

/* ─────────────────────────────────────────────────────────────
   NAV LINK DEFINITIONS
───────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    label: 'Chapter',
    links: [
      { name: 'Home',        path: '/',            icon: Home,      desc: 'Back to the start' },
      { name: 'About',       path: '/about',       icon: Info,      desc: 'Our story & mission' },
      { name: 'Officers',    path: '/officers',    icon: Users,     desc: 'Meet the leadership team' },
      { name: 'News',        path: '/news',        icon: Newspaper, desc: 'Announcements & updates' },
    ]
  },
  {
    label: 'Compete',
    links: [
      { name: 'Competitions',   path: '/competitions',   icon: Cpu,      desc: 'Explore TSA events' },
      { name: 'Teams',          path: '/teams',          icon: Users,    desc: 'Form & join competition teams' },
      { name: 'Opportunities',  path: '/opportunities',  icon: BookOpen, desc: 'Scholarships, programs & more' },
      { name: 'Events',         path: '/events',         icon: Calendar, desc: 'Meetings & calendar' },
      { name: 'Projects',       path: '/projects',       icon: Cpu,      desc: 'Chapter project showcase' },
      { name: 'Gallery',        path: '/gallery',        icon: Image,    desc: 'Photos & memories' },
    ]
  },
  {
    label: 'Connect',
    links: [
      { name: 'Resources', path: '/resources', icon: BookOpen, desc: 'Guides, PDFs & links' },
      { name: 'Directory', path: '/directory', icon: Users,    desc: 'Member roster & skills' },
      { name: 'Join',      path: '/join',      icon: Users,    desc: 'Become a member' },
      { name: 'Contact',   path: '/contact',   icon: Phone,    desc: 'Get in touch' },
    ]
  },
];

const ALL_LINKS = NAV_GROUPS.flatMap(g => g.links);

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaRef    = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLInputElement>(null);
  const location   = useLocation();
  const navigate   = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();
  const { announcements } = useData();
  const { theme, toggleTheme } = useTheme();

  // Unread announcement count — initialize seen list on first load so existing
  // announcements don't permanently trigger the badge for new/returning users.
  const unreadCount = (() => {
    if (!user || announcements.length === 0) return 0;
    try {
      const key = `lehs-seen-${user.id}`;
      const raw = localStorage.getItem(key);
      if (raw === null) {
        // First time: mark everything current as seen so badge starts at 0
        localStorage.setItem(key, JSON.stringify(announcements.map(a => a.id)));
        return 0;
      }
      const seen: string[] = JSON.parse(raw);
      return announcements.filter(a => !seen.includes(a.id)).length;
    } catch { return 0; }
  })();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setActiveGroup(null);
    setSearchOpen(false);
  }, [location]);

  /* Close mega-menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node))
        setActiveGroup(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Cmd+K shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setActiveGroup(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Focus search input */
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const filteredLinks = searchQuery
    ? ALL_LINKS.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : ALL_LINKS;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-space-900/90 backdrop-blur-xl border-b border-space-500/60 shadow-nav'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105" style={{ backgroundColor: '#005DAA' }}>
                <Cpu size={18} className="text-white" />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-bold text-sm text-ink tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>LEHS TSA</span>
                <span className="text-[10px] text-ink-muted mt-0.5 tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Little Elm, TX</span>
              </div>
            </Link>

            {/* ── Desktop mega-nav ── */}
            <div className="hidden lg:flex items-center gap-1 ml-8" ref={megaRef}>
              {NAV_GROUPS.map(group => (
                <div key={group.label} className="relative">
                  <button
                    onMouseEnter={() => setActiveGroup(group.label)}
                    onClick={() => setActiveGroup(v => v === group.label ? null : group.label)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeGroup === group.label
                        ? 'bg-electric-100 text-electric-500'
                        : 'text-ink-dim hover:text-ink hover:bg-space-600/50'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeGroup === group.label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeGroup === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        onMouseLeave={() => setActiveGroup(null)}
                        className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl shadow-modal py-2 overflow-hidden"
                      >
                        {group.links.map(link => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.path}
                              to={link.path}
                              className={`flex items-center gap-3 px-4 py-3 group/item transition-all duration-150 ${
                                isActive(link.path)
                                  ? 'bg-electric-100 text-electric-500'
                                  : 'hover:bg-space-600/50 text-ink-dim hover:text-ink'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                isActive(link.path)
                                  ? 'bg-electric-200 text-electric-500'
                                  : 'bg-space-600/60 text-ink-muted group-hover/item:bg-electric-100 group-hover/item:text-electric-500'
                              }`}>
                                <Icon size={15} />
                              </div>
                              <div>
                                <div className="text-sm font-medium">{link.name}</div>
                                <div className="text-[11px] text-ink-muted">{link.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* ── Right actions ── */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-space-600/50 transition-all duration-200"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Search / Command Palette */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-600/50 border border-space-500/50 text-ink-muted text-sm hover:border-electric-300 hover:text-ink transition-all duration-200"
              >
                <Search size={14} />
                <span className="hidden xl:block">Search...</span>
                <kbd className="hidden xl:flex items-center gap-1 text-[10px] bg-space-500/60 px-1.5 py-0.5 rounded font-mono">
                  <Command size={9} /> K
                </kbd>
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 ml-1 pl-3 border-l border-space-500/50">
                  <Link
                    to="/dashboard"
                    className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-500 hover:bg-electric-600 text-white text-sm font-medium shadow-glow-blue transition-all duration-200"
                  >
                    <LayoutDashboard size={15} />
                    Dashboard
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-md animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="p-2 text-ink-muted hover:text-ink hover:bg-space-600/50 rounded-lg transition-all"
                    title="Sign out"
                  >
                    <LogOut size={17} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-1 pl-3 border-l border-space-500/50">
                  <Link
                    to="/join"
                    className="btn-primary text-sm py-2 px-5"
                  >
                    Join TSA
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-dim hover:text-ink hover:bg-space-600/50 transition-all"
                  >
                    <LogIn size={15} />
                    Sign in
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile controls ── */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                className="p-2 text-ink-dim hover:text-ink"
              >
                {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </button>
              <button onClick={() => setSearchOpen(true)} className="p-2 text-ink-dim hover:text-ink">
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-ink-dim hover:text-ink hover:bg-space-600/50"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 lg:hidden flex flex-col"
              style={{ background: 'var(--c-surface)', borderLeft: '1px solid var(--c-border)' }}
            >
              {/* Mobile nav header */}
              <div className="flex items-center justify-between p-5 border-b border-space-500/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#005DAA' }}>
                    <Cpu size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-ink" style={{ fontFamily: 'var(--font-heading)' }}>LEHS TSA</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-space-600/50 text-ink-muted">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {NAV_GROUPS.map(group => (
                  <div key={group.label}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-ink-muted mb-2 px-2">
                      {group.label}
                    </div>
                    <div className="space-y-1">
                      {group.links.map(link => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                              isActive(link.path)
                                ? 'bg-electric-100 text-electric-500'
                                : 'text-ink-dim hover:text-ink hover:bg-space-600/50'
                            }`}
                          >
                            <Icon size={16} />
                            <span className="text-sm font-medium">{link.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile auth */}
              <div className="p-4 border-t border-space-500/50 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                      className="relative btn-primary w-full justify-center text-sm py-2.5">
                      <LayoutDashboard size={16} /> Dashboard
                      {unreadCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-md">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); setMobileOpen(false); }}
                      className="btn-secondary w-full justify-center text-sm py-2.5">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/join" onClick={() => setMobileOpen(false)}
                      className="btn-primary w-full justify-center text-sm py-2.5">
                      Join TSA
                    </Link>
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="btn-secondary w-full justify-center text-sm py-2.5">
                      <LogIn size={16} /> Sign In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Command Palette / Search ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-xl rounded-2xl overflow-hidden shadow-modal"
              style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-space-500/50">
                <Search size={20} className="text-ink-muted flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search pages..."
                  className="flex-1 bg-transparent text-ink placeholder-ink-muted text-base outline-none"
                />
                <kbd className="text-[11px] text-ink-muted bg-space-700/50 px-2 py-1 rounded font-mono border border-space-500/50">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredLinks.length > 0 ? filteredLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-space-600/50 group transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-space-600/60 flex items-center justify-center text-ink-muted group-hover:bg-electric-100 group-hover:text-electric-500 transition-all">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink">{link.name}</div>
                        <div className="text-xs text-ink-muted">{link.desc}</div>
                      </div>
                      <ArrowRight size={14} className="ml-auto text-ink-ghost opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                }) : (
                  <div className="py-12 text-center text-ink-muted text-sm">
                    No pages match "{searchQuery}"
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-space-500/50 flex items-center justify-between text-[11px] text-ink-muted">
                <span>Navigate with arrow keys</span>
                <span>Cmd+K to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content doesn't start under fixed nav */}
      <div className="h-16" />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
export const Footer: React.FC = () => {
  const { siteSettings, subscribe } = useData();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      await subscribe(email);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const footerLinks = {
    'Chapter': [
      { name: 'About',   path: '/about' },
      { name: 'Officers', path: '/officers' },
      { name: 'News',    path: '/news' },
      { name: 'Gallery', path: '/gallery' },
    ],
    'Compete': [
      { name: 'Competitions', path: '/competitions' },
      { name: 'Events',       path: '/events' },
      { name: 'Projects',     path: '/projects' },
    ],
    'Resources': [
      { name: 'Study Guides', path: '/resources' },
      { name: 'Join TSA',     path: '/join' },
      { name: 'Contact',      path: '/contact' },
      { name: 'Texas TSA',    path: 'https://www.texastsa.org/', external: true },
      { name: 'National TSA', path: 'https://tsaweb.org/', external: true },
    ],
  };

  return (
    <footer className="footer-root bg-space-950 border-t border-space-500/40 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand column (2 cols on lg) */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#005DAA' }}>
                <Cpu size={18} className="text-white" style={{ color: '#ffffff' }} />
              </div>
              <div>
                <div className="font-bold text-ink text-sm" style={{ fontFamily: 'var(--font-heading)' }}>LEHS TSA</div>
                <div className="text-[10px] tracking-wide uppercase mt-0.5 text-ink-muted" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Little Elm High School</div>
              </div>
            </div>
            <p className="text-ink-dim text-sm leading-relaxed mb-6 max-w-xs">
              Empowering the next generation of tech leaders through competition, collaboration, and innovation.
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-8">
              {siteSettings.instagramLink && (
                <a href={siteSettings.instagramLink} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-space-700 border border-space-500/50 flex items-center justify-center text-ink-muted hover:text-electric-500 hover:border-electric-300 transition-all duration-200">
                  <Instagram size={16} />
                </a>
              )}
              {siteSettings.twitterLink && (
                <a href={siteSettings.twitterLink} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-space-700 border border-space-500/50 flex items-center justify-center text-ink-muted hover:text-electric-500 hover:border-electric-300 transition-all duration-200">
                  <Twitter size={16} />
                </a>
              )}
            </div>

            {/* Newsletter */}
            <div>
              <div className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">Stay Updated</div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  placeholder="your@email.com"
                  disabled={status === 'done'}
                  className="flex-1 min-w-0 bg-space-700/50 border border-space-500/60 rounded-lg px-3 py-2 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/40 transition-all"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading' || status === 'done'}
                  className="btn-primary text-sm py-2 px-4 flex-shrink-0 disabled:opacity-50"
                >
                  {status === 'done' ? 'Done' : status === 'loading' ? '...' : 'Go'}
                </button>
              </div>
              {status === 'done' && (
                <p className="text-xs text-electric-400 mt-1.5">You're subscribed!</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-gold-400 mt-1.5">Something went wrong. Try again.</p>
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.name}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.path}
                        target="_blank" rel="noopener noreferrer"
                        className="text-sm text-ink-dim hover:text-ink flex items-center gap-1 group transition-colors"
                      >
                        {link.name}
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm text-ink-dim hover:text-ink transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-ink-dim">
                <MapPin size={14} className="text-electric-500 mt-0.5 flex-shrink-0" />
                <span>1600 Walker Lane<br />Little Elm, TX 75068</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-electric-500 flex-shrink-0" />
                <a href="mailto:lehstsa@gmail.com" className="text-ink-dim hover:text-electric-500 transition-colors">
                  lehstsa@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] bg-electric-100 border-electric-300/40 text-electric-500" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.05em' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-tsa-green animate-pulse" />
                Chapter Active 2025–2026
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-ink-muted">
          <p>© 2025–2026 Little Elm High School TSA. All rights reserved.</p>
          <p className="font-mono">
            Built by LEHS TSA Webmaster Team
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────────────────────
   LAYOUT WRAPPER
───────────────────────────────────────────────────────────── */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)' }}>
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};
