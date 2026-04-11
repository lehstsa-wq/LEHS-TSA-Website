import React, { useState } from 'react';
import { User, Instagram, Mail, GraduationCap, Users, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { LazyImage } from '../components/LazyImage';
import { SEO } from '../components/SEO';

const CATEGORY_COLORS: Record<string, string> = {
  Executive: 'badge-gold',
  Committee: 'badge-muted',
  Advisor:   'badge-muted',
};

const Officers: React.FC = () => {
  const { officersList } = useData();
  const [filter, setFilter] = useState<'All' | 'Executive' | 'Committee' | 'Advisor'>('All');

  const categories = ['All', 'Executive', 'Committee', 'Advisor'] as const;
  const filtered = filter === 'All' ? officersList : officersList.filter(o => o.category === filter);
  const executive = officersList.filter(o => o.category === 'Executive');

  return (
    <div>
      <SEO title="Officers" description="Meet the Little Elm TSA leadership team — dedicated students driving our chapter forward." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-[400px] h-[400px] top-[-60px] right-[5%] opacity-25 animate-orb-float-1" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4"><Star size={12} /> Leadership</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Officer Team</h1>
            <p className="section-body max-w-2xl">
              Meet the students who keep LEHS TSA running — from organizing competitions to leading workshops
              and representing the chapter at conferences.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-warm-950 to-transparent" />
      </section>

      {/* Featured exec strip */}
      {executive.length > 0 && (
        <section className="py-16 bg-warm-950/60 border-y border-warm-700/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-8">Executive Board</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {executive.map((officer, i) => (
                <motion.div key={officer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group text-center">
                  <div className="relative w-20 h-20 rounded-2xl mx-auto mb-3 overflow-hidden border-2 border-gold-500/40 group-hover:border-gold-500/80 transition-all duration-300 /30">
                    {officer.imageUrl ? (
                      <LazyImage src={officer.imageUrl} alt={officer.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-warm-850 flex items-center justify-center text-ink-muted">
                        <User size={28} />
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-bold text-ink group-hover:text-gold-400 transition-colors truncate">{officer.name}</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{officer.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All officers with filter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filter */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === c ? 'bg-gold text-white ' : 'bg-warm-850/60 text-ink-muted hover:text-ink border border-warm-700/40'}`}>
              {c}
            </button>
          ))}
          <span className="text-xs text-ink-muted ml-auto">{filtered.length} member{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <Users size={40} className="mx-auto mb-4 opacity-30" />
            <p>No officers in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((officer, i) => (
              <motion.div key={officer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 6) * 0.08 }}
                className="card group overflow-hidden">
                {/* Color accent bar */}
                <div className="h-1 -mx-6 -mt-6 mb-6" style={{ background: officer.category === 'Executive' ? 'linear-gradient(to right, #e05c5c, #c44444)' : officer.category === 'Advisor' ? 'linear-gradient(to right, #8b5cf6, #7c3aed)' : 'linear-gradient(to right, #3b82f6, #2563eb)' }} />

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-warm-700/40 group-hover:border-gold-border/50 transition-all flex-shrink-0">
                    {officer.imageUrl ? (
                      <LazyImage src={officer.imageUrl} alt={officer.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-warm-850 flex items-center justify-center text-ink-muted">
                        <User size={22} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-ink truncate group-hover:text-gold transition-colors">{officer.name}</h3>
                    <div className="text-sm text-ink-muted mt-0.5">{officer.role}</div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`badge ${CATEGORY_COLORS[officer.category] || 'badge-muted'}`}>{officer.category}</span>
                      {officer.grade && (
                        <span className="flex items-center gap-1 text-[11px] text-ink-muted">
                          <GraduationCap size={11} /> {officer.grade}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {officer.bio && (
                  <p className="text-sm text-ink-dim leading-relaxed mt-4 line-clamp-3">{officer.bio}</p>
                )}

                {/* Social links */}
                {(officer.email || officer.instagram) && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-warm-700/40">
                    {officer.email && (
                      <a href={`mailto:${officer.email}`} className="p-2 rounded-lg bg-warm-850/60 text-ink-muted hover:text-gold hover:bg-gold-muted transition-all">
                        <Mail size={14} />
                      </a>
                    )}
                    {officer.instagram && (
                      <a href={officer.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-warm-850/60 text-ink-muted hover:text-gold hover:bg-gold-muted transition-all">
                        <Instagram size={14} />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Officers;
