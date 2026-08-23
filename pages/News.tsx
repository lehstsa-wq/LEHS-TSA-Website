import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { SectionHeader, DiamondField, SegmentedToggle } from '../components/sections';

const TYPE_COLORS: Record<string, string> = {
  Meeting:     'badge-blue',
  Deadline:    'badge-gold',
  Competition: 'badge-gold',
  General:     'badge-green',
  Urgent:      'badge-purple',
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
      <section className="relative py-10 overflow-hidden">
        <DiamondField variant="hero" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionHeader
              as="h1"
              eyebrow="Updates"
              title="Chapter News"
              dek="Announcements, deadlines, competition news, and chapter updates, all in one place."
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-space-900 to-transparent" />
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-space-900 border-b border-space-500/40 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..."
              className="w-full bg-space-700/50 border border-space-500/60 rounded-xl pl-9 pr-3 py-2 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all" />
            {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"><X size={13} /></button>}
          </div>
          <SegmentedToggle
            options={types}
            value={typeFilter}
            onChange={v => setTypeFilter(v as typeof typeFilter)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {allFiltered.length === 0 ? (
          <div className="text-center py-12 text-ink-muted">
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
                        Pinned
                      </div>
                      <span className={`badge ${TYPE_COLORS[item.type] || 'badge-blue'}`}>{item.type}</span>
                      <span className="text-xs text-ink-muted">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-ink mb-2 group-hover:text-electric-400 transition-colors">{item.title}</h3>
                    <p className="text-sm text-ink-dim leading-relaxed">{item.content}</p>
                    <div className="flex items-center gap-1.5 mt-4 text-xs text-ink-muted">
                      {item.author}
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
                      <span className={`badge ${TYPE_COLORS[item.type] || 'badge-blue'}`}>{item.type}</span>
                      <span className="text-xs text-ink-muted">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-ink mb-1.5 group-hover:text-electric-400 transition-colors">{item.title}</h3>
                    <p className="text-sm text-ink-dim leading-relaxed">{item.content}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-ink-muted">
                      {item.author}
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
