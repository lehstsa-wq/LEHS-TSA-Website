import React, { useState } from 'react';
import { BookOpen, Download, ExternalLink, Search, Lock, Trophy, Code, PenTool, Users, X, Pin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  competition: Trophy,
  coding:      Code,
  design:      PenTool,
  leadership:  Users,
  general:     BookOpen,
};

const CATEGORY_COLORS: Record<string, string> = {
  competition: '#e05c5c',
  coding:      '#8b5cf6',
  design:      '#ec4899',
  leadership:  '#3b82f6',
  general:     '#22c55e',
};

const QUICK_LINKS = [
  { name: 'TSA National',              url: 'https://tsaweb.org/',                                              desc: 'Official TSA website with rulebooks, forms, and competition info' },
  { name: 'Texas TSA',                 url: 'https://www.texastsa.org/',                                       desc: 'Texas state chapter portal — schedules, results, registration' },
  { name: 'TSA Competition Rules',     url: 'https://tsaweb.org/competitions-programs/tsa-competitions',       desc: 'All official 2025–2026 competition guidelines' },
  { name: 'Khan Academy (STEM)',        url: 'https://www.khanacademy.org/',                                    desc: 'Free prep material for STEM competitions and events' },
  { name: 'Code.org',                  url: 'https://code.org/',                                               desc: 'Programming tutorials for coding competition prep' },
  { name: 'Figma (free for students)', url: 'https://www.figma.com/education/',                                desc: 'Free design tool for Graphic Design, Promotional Design events' },
  { name: 'TSA TEAMS Program',         url: 'https://tsaweb.org/teams',                                        desc: 'Tests of Engineering Aptitude, Mathematics & Science' },
  { name: 'AutoCAD (free for edu)',    url: 'https://www.autodesk.com/education/edu-software/overview',        desc: 'Professional CAD software for Architecture and Engineering events' },
];

const Resources: React.FC = () => {
  const { resources } = useData();
  const { isAuthenticated } = useAuth();
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const pinned   = resources.filter(r => r.pinned && (isAuthenticated || r.accessLevel === 'member'));
  const filtered = resources.filter(r => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category === 'All' || r.category === category;
    const matchAccess = isAuthenticated || r.accessLevel === 'member';
    return matchSearch && matchCat && matchAccess && !r.pinned;
  });
  const totalVisible = filtered.length + (category === 'All' && !search ? pinned.length : 0);

  return (
    <div>
      <SEO title="Resources" description="Competition guides, study materials, and helpful links for LEHS TSA members." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-[400px] h-[400px] top-[-60px] right-[5%] opacity-25 animate-orb-float-2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4"><BookOpen size={12} /> Resources</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Competition Resources</h1>
            <p className="section-body max-w-2xl">
              Study guides, competition rulebooks, design tools, and helpful links — everything you need to
              walk into any TSA event prepared and confident.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-warm-950 to-transparent" />
      </section>

      {/* Quick links */}
      <section className="py-16 bg-warm-950/60 border-y border-warm-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-6">Quick Links</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICK_LINKS.map((link, i) => (
              <motion.a key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                href={link.url} target="_blank" rel="noopener noreferrer"
                className="card flex items-start gap-3 group hover:border-gold-border/40 transition-all">
                <ExternalLink size={15} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-ink text-sm group-hover:text-gold transition-colors">{link.name}</div>
                  <div className="text-xs text-ink-muted mt-0.5 leading-relaxed">{link.desc}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-2">Chapter Library</div>
            <h2 className="text-2xl font-bold text-ink">Member Resources</h2>
          </div>

          {/* Search + filter */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources…"
                className="bg-warm-850/60 border border-warm-700/40 rounded-xl pl-9 pr-8 py-2.5 text-sm text-ink placeholder-ink-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all w-52" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"><X size={13} /></button>}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${category === c ? 'bg-gold text-white ' : 'bg-warm-850/60 text-ink-muted hover:text-ink border border-warm-700/40'}`}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gold-100 border border-gold-300/30 mb-6">
            <Lock size={16} className="text-gold-500 flex-shrink-0" />
            <p className="text-sm text-ink-dim">
              <a href="#/login" className="text-gold hover:text-gold transition-colors font-medium">Sign in</a> to access all officer-only resources.
            </p>
          </div>
        )}

        {/* Pinned resources */}
        {pinned.length > 0 && category === 'All' && !search && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Pin size={13} className="text-gold-400" />
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Pinned</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinned.map((r, i) => {
                const CatIcon = CATEGORY_ICONS[r.category] || BookOpen;
                const color   = CATEGORY_COLORS[r.category] || '#3b82f6';
                return (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="card group border-gold-500/30 hover:border-gold-500/60 relative overflow-hidden">
                    <div className="absolute top-3 right-3">
                      <Star size={13} className="text-gold-400 fill-gold-400" />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color }}>
                        <CatIcon size={20} />
                      </div>
                      <span className="badge badge-gold text-[10px] mr-6">{r.type}</span>
                    </div>
                    <h3 className="font-semibold text-ink mb-2 group-hover:text-gold transition-colors pr-4">{r.title}</h3>
                    {r.description && <p className="text-xs text-ink-muted mb-4 line-clamp-2">{r.description}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-ink-muted">{r.dateAdded}</span>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gold hover:text-gold font-semibold transition-colors">
                        {r.type === 'PDF' ? <><Download size={13} /> Download</> : <><ExternalLink size={13} /> Open</>}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main grid */}
        {filtered.length === 0 && totalVisible === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p>No resources found{search ? ` for "${search}"` : ''}.</p>
            {resources.length === 0 && <p className="text-sm mt-2">Resources will appear here once added by an officer.</p>}
          </div>
        ) : filtered.length > 0 ? (
          <>
            {(pinned.length > 0 && category === 'All' && !search) && (
              <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4">All Resources</div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((r, i) => {
                const CatIcon  = CATEGORY_ICONS[r.category] || BookOpen;
                const color    = CATEGORY_COLORS[r.category] || '#3b82f6';
                const isLocked = r.accessLevel === 'officer' && !isAuthenticated;
                return (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: (i % 6) * 0.06 }}
                    className={`card group ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color }}>
                        <CatIcon size={20} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isLocked && <Lock size={13} className="text-gold-500" />}
                        <span className="badge badge-muted text-[10px]">{r.type}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-ink mb-2 group-hover:text-gold transition-colors">{r.title}</h3>
                    {r.description && <p className="text-xs text-ink-muted mb-4 line-clamp-2">{r.description}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-ink-muted">{r.dateAdded}</span>
                      {!isLocked && (
                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-gold hover:text-gold font-semibold transition-colors">
                          {r.type === 'PDF' ? <><Download size={13} /> Download</> : <><ExternalLink size={13} /> Open</>}
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
};

export default Resources;
