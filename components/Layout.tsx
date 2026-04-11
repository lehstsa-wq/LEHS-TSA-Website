import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Instagram, Mail, MapPin,
  LogIn, LayoutDashboard, LogOut, ChevronDown,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

/* ─────────────────────────────────────────────────────────────
   NAV LINK DEFINITIONS
───────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    label: 'Chapter',
    links: [
      { name: 'About',       path: '/about',       desc: 'Our story & mission' },
      { name: 'Officers',    path: '/officers',    desc: 'Meet the leadership team' },
      { name: 'News',        path: '/news',        desc: 'Announcements & updates' },
      { name: 'Gallery',     path: '/gallery',     desc: 'Photos & memories' },
    ]
  },
  {
    label: 'Compete',
    links: [
      { name: 'Competitions',  path: '/competitions',  desc: 'Browse TSA events' },
      { name: 'Teams',         path: '/teams',         desc: 'Form & join competition teams' },
      { name: 'Events',        path: '/events',        desc: 'Meetings & calendar' },
      { name: 'Projects',      path: '/projects',      desc: 'Chapter project showcase' },
    ]
  },
  {
    label: 'Resources',
    links: [
      { name: 'Opportunities', path: '/opportunities', desc: 'Scholarships, programs & more' },
      { name: 'Study Guides',  path: '/resources',     desc: 'Guides, PDFs & links' },
      { name: 'Directory',     path: '/directory',     desc: 'Member roster & skills' },
      { name: 'Join TSA',      path: '/join',          desc: 'Become a member' },
      { name: 'Contact',       path: '/contact',       desc: 'Get in touch' },
    ]
  },
];


/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const megaRef  = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();
  const { announcements } = useData();

  const unreadCount = (() => {
    if (!user || announcements.length === 0) return 0;
    try {
      const key = `lehs-seen-${user.id}`;
      const raw = localStorage.getItem(key);
      if (raw === null) {
        localStorage.setItem(key, JSON.stringify(announcements.map(a => a.id)));
        return 0;
      }
      const seen: string[] = JSON.parse(raw);
      return announcements.filter(a => !seen.includes(a.id)).length;
    } catch { return 0; }
  })();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveGroup(null);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node))
        setActiveGroup(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveGroup(null); setMobileOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <nav
        style={{
          background: scrolled ? 'var(--c-bg)' : 'var(--c-bg)',
          borderBottom: scrolled ? '1px solid var(--c-border)' : '1px solid transparent',
          transition: 'border-color 300ms ease',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14">

            {/* ── Wordmark ── */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/assets/tsa-emblem.svg"
                alt="TSA emblem"
                className="w-7 h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span
                className="font-display font-bold text-lg leading-none tracking-tight"
                style={{ color: 'var(--c-text)' }}
              >
                LEHS <span style={{ color: 'var(--c-gold)' }}>TSA</span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden lg:flex items-center gap-1" ref={megaRef}>
              <Link
                to="/"
                className="px-3.5 py-2 text-sm transition-colors duration-150"
                style={{ color: isActive('/') ? 'var(--c-text)' : 'var(--c-text-dim)' }}
                onMouseEnter={() => setActiveGroup(null)}
              >
                Home
              </Link>

              {NAV_GROUPS.map(group => (
                <div key={group.label} className="relative">
                  <button
                    onMouseEnter={() => setActiveGroup(group.label)}
                    onClick={() => setActiveGroup(v => v === group.label ? null : group.label)}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm transition-colors duration-150"
                    style={{
                      color: group.links.some(l => isActive(l.path))
                        ? 'var(--c-text)'
                        : activeGroup === group.label
                        ? 'var(--c-text)'
                        : 'var(--c-text-dim)'
                    }}
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeGroup === group.label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeGroup === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.13, ease: 'easeOut' }}
                        onMouseLeave={() => setActiveGroup(null)}
                        className="absolute top-full left-0 mt-1 w-56 py-1 rounded shadow-dropdown"
                        style={{
                          background: 'var(--c-surface)',
                          border: '1px solid var(--c-border)',
                        }}
                      >
                        {group.links.map(link => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2.5 text-sm transition-colors duration-100"
                            style={{
                              color: isActive(link.path) ? 'var(--c-text)' : 'var(--c-text-dim)',
                              background: isActive(link.path) ? 'var(--c-surface-2)' : 'transparent',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--c-surface-2)';
                              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = isActive(link.path) ? 'var(--c-surface-2)' : 'transparent';
                              (e.currentTarget as HTMLAnchorElement).style.color = isActive(link.path) ? 'var(--c-text)' : 'var(--c-text-dim)';
                            }}
                          >
                            {link.name}
                            {isActive(link.path) && (
                              <span className="ml-2 inline-block w-1 h-1 rounded-full align-middle" style={{ background: 'var(--c-gold)' }} />
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* ── Right actions ── */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="relative btn-primary text-sm py-2 px-4"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="btn-ghost py-2 px-3"
                    title="Sign out"
                    style={{ color: 'var(--c-text-dim)' }}
                  >
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost text-sm py-2 px-3">
                    <LogIn size={15} />
                    Sign in
                  </Link>
                  <Link to="/join" className="btn-primary text-sm py-2 px-4">
                    Join TSA
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile controls ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 lg:hidden transition-colors"
              style={{ color: 'var(--c-text-dim)' }}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(14,12,10,0.7)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 lg:hidden flex flex-col"
              style={{ background: 'var(--c-surface)', borderLeft: '1px solid var(--c-border)' }}
            >
              <div className="flex items-center justify-between px-5 h-14 border-b" style={{ borderColor: 'var(--c-border)' }}>
                <span className="font-display font-bold text-base" style={{ color: 'var(--c-text)' }}>
                  LEHS <span style={{ color: 'var(--c-gold)' }}>TSA</span>
                </span>
                <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--c-text-dim)' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-5 py-2.5 text-sm"
                  style={{ color: isActive('/') ? 'var(--c-text)' : 'var(--c-text-dim)' }}
                >
                  Home
                </Link>

                {NAV_GROUPS.map(group => (
                  <div key={group.label} className="mt-4">
                    <div
                      className="px-5 pb-1 text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--c-text-muted)' }}
                    >
                      {group.label}
                    </div>
                    {group.links.map(link => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="block px-5 py-2.5 text-sm transition-colors"
                        style={{ color: isActive(link.path) ? 'var(--c-text)' : 'var(--c-text-dim)' }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div className="p-4 space-y-2 border-t" style={{ borderColor: 'var(--c-border)' }}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="relative btn-primary w-full justify-center text-sm py-2.5"
                    >
                      <LayoutDashboard size={15} /> Dashboard
                      {unreadCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={() => { logout(); navigate('/'); setMobileOpen(false); }}
                      className="btn-secondary w-full justify-center text-sm py-2.5"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/join" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center text-sm py-2.5">
                      Join TSA
                    </Link>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full justify-center text-sm py-2.5">
                      <LogIn size={15} /> Sign In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
export const Footer: React.FC = () => {
  const { siteSettings } = useData();

  return (
    <footer className="mt-auto" style={{ background: 'var(--c-surface)', borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-8">

        {/* Masthead row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-10 border-b" style={{ borderColor: 'var(--c-border)' }}>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--c-text-muted)' }}>
              Technology Student Association
            </div>
            <h2 className="font-display font-bold text-3xl leading-none" style={{ color: 'var(--c-text)' }}>
              Little Elm<br />
              <span style={{ color: 'var(--c-gold)' }}>High School</span>
            </h2>
            <p className="text-sm mt-3 max-w-xs" style={{ color: 'var(--c-text-dim)' }}>
              Chapter at Little Elm High School, TX. Competing at state and national level since 2022.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start md:items-end">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              <MapPin size={13} style={{ color: 'var(--c-gold)' }} />
              1600 Walker Lane, Little Elm, TX 75068
            </div>
            <a
              href="mailto:lehstsa@gmail.com"
              className="flex items-center gap-2 text-sm transition-colors duration-150"
              style={{ color: 'var(--c-text-dim)' }}
            >
              <Mail size={13} style={{ color: 'var(--c-gold)' }} />
              lehstsa@gmail.com
            </a>
            {siteSettings.instagramLink && (
              <a
                href={siteSettings.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-150"
                style={{ color: 'var(--c-text-dim)' }}
              >
                <Instagram size={13} style={{ color: 'var(--c-gold)' }} />
                @lehstsa
              </a>
            )}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-text-muted)' }}>Chapter</div>
            <ul className="space-y-2">
              {[
                { name: 'About', path: '/about' },
                { name: 'Officers', path: '/officers' },
                { name: 'News', path: '/news' },
                { name: 'Gallery', path: '/gallery' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm transition-colors" style={{ color: 'var(--c-text-dim)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text-dim)'}
                  >{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-text-muted)' }}>Compete</div>
            <ul className="space-y-2">
              {[
                { name: 'Competitions', path: '/competitions' },
                { name: 'Teams', path: '/teams' },
                { name: 'Events', path: '/events' },
                { name: 'Projects', path: '/projects' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm transition-colors" style={{ color: 'var(--c-text-dim)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text-dim)'}
                  >{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-text-muted)' }}>Resources</div>
            <ul className="space-y-2">
              {[
                { name: 'Opportunities', path: '/opportunities' },
                { name: 'Study Guides', path: '/resources' },
                { name: 'Directory', path: '/directory' },
                { name: 'Join TSA', path: '/join' },
                { name: 'Contact', path: '/contact' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm transition-colors" style={{ color: 'var(--c-text-dim)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text-dim)'}
                  >{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-text-muted)' }}>Official</div>
            <ul className="space-y-2">
              {[
                { name: 'Texas TSA', href: 'https://www.texastsa.org/' },
                { name: 'National TSA', href: 'https://tsaweb.org/' },
              ].map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm inline-flex items-center gap-1 transition-colors"
                    style={{ color: 'var(--c-text-dim)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text-dim)'}
                  >
                    {l.name}
                    <ExternalLink size={10} style={{ opacity: 0.5 }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-6 border-t" style={{ borderColor: 'var(--c-border)' }}>
          <p className="text-xs" style={{ color: 'var(--c-text-muted)' }}>
            © 2025 Little Elm High School TSA · All rights reserved
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--c-text-muted)' }}>
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
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--c-bg)', color: 'var(--c-text)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};
