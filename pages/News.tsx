import React, { useState } from 'react';
import { Newspaper, Search, Pin, Calendar, User, X, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';

const TYPE_COLORS: Record<string, string> = {
  Meeting:     'badge-muted',
  Deadline:    'badge-gold',
  Competition: 'badge-gold',
  General:     'badge-green',
  Urgent:      'badge-muted',
};

const News: React.FC = () => {
  const { announcements } = useData();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const types = ['All', ...Array.from(new Set(announcements.map(a => a.type)))];

  const pinned  = announcements.filter(a => a.isPinned);
  const regular = announcements.filter(a => !a.isPinned);

  const applyFilters = (list: typeof announcements) =>
    list.filter(a => {
      const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter === 'All' || a.type === typeFilter;
      return matchSearch && matchType;
    });

  const filteredPinned  = applyFilters(pinned);
  const filteredRegular = applyFilters(regular);
  const allFiltered     = [...filteredPinned, ...filteredRegular];

  return (
    <div>
      <SEO title="News" description="LEHS TSA announcements, updates, and chapter news." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-[400px] h-[350px] top-[-50px] right-[10%] opacity-25 animate-orb-float-1" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4"><Newspaper size={12} /> Updates</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Chapter News</h1>
            <p className="section-body max-w-xl">
              Announcements, deadlines, competition news, and chapter updates — all in one place.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-warm-950 to-transparent" />
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-warm-950/90 backdrop-blur-xl border-b border-warm-700/40 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..."
              className="w-full bg-warm-850/60 border border-warm-700/40 rounded-xl pl-9 pr-3 py-2 text-sm text-ink placeholder-ink-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all" />
            {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"><X size={13} /></button>}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${typeFilter === t ? 'bg-gold text-white' : 'bg-warm-850/60 text-ink-muted hover:text-ink border border-warm-700/40'}`}>
                {t !== 'All' && <Tag size={11} />} {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {allFiltered.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <Newspaper size={40} className="mx-auto mb-4 opacity-30" />
            <p>No announcements found{search ? ` for "${search}"` : ''}.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Pinned first */}
            {filteredPinned.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="card border-gold-300/30 relative group overflow-hidden">
                {/* Pinned stripe */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-600" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-gold-500 text-xs font-bold">
                        <Pin size={12} /> Pinned
                      </div>
                      <span className={`badge ${TYPE_COLORS[item.type] || 'badge-muted'}`}>{item.type}</span>
                      <span className="flex items-center gap-1 text-xs text-ink-muted"><Calendar size={12} />{item.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-ink mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                    <p className="text-sm text-ink-dim leading-relaxed">{item.content}</p>
                    <div className="flex items-center gap-1.5 mt-4 text-xs text-ink-muted">
                      <User size={12} /> {item.author}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Regular */}
            {filteredRegular.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="card group relative overflow-hidden">
                <div className="highlight-bar opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4">
                  <div className="flex-1 pl-3">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`badge ${TYPE_COLORS[item.type] || 'badge-muted'}`}>{item.type}</span>
                      <span className="flex items-center gap-1 text-xs text-ink-muted"><Calendar size={11} />{item.date}</span>
                    </div>
                    <h3 className="font-bold text-ink mb-1.5 group-hover:text-gold transition-colors">{item.title}</h3>
                    <p className="text-sm text-ink-dim leading-relaxed">{item.content}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-ink-muted">
                      <User size={11} /> {item.author}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
