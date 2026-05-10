import React, { useState, useMemo } from 'react';
import {
  Briefcase, GraduationCap, BookOpen, Globe,
  Search, ExternalLink, Calendar, Clock, Tag, ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { OpportunityType, Opportunity } from '../types';
import { SEO } from '../components/SEO';

/* ── Category config ─────────────────────────────────────────── */
const TYPE_CONFIG: Record<OpportunityType | 'All', {
  label: string; color: string; icon: React.ElementType;
}> = {
  All:         { label: 'All',         color: '#b0aea5', icon: Globe       },
  Scholarship: { label: 'Scholarship', color: '#d97757', icon: GraduationCap },
  Internship:  { label: 'Internship',  color: '#6a9bcc', icon: Briefcase   },
  Program:     { label: 'Program',     color: '#6a9bcc', icon: BookOpen    },
  Competition: { label: 'Competition', color: '#d97757', icon: Briefcase   },
  Workshop:    { label: 'Workshop',    color: '#788c5d', icon: BookOpen    },
  Fellowship:  { label: 'Fellowship',  color: '#6a9bcc', icon: GraduationCap },
};

const TYPES: (OpportunityType | 'All')[] = ['All', 'Scholarship', 'Internship', 'Program', 'Competition', 'Workshop', 'Fellowship'];

/* ── Deadline urgency ────────────────────────────────────────── */
function deadlineInfo(deadline?: string): { label: string; urgent: boolean; soon: boolean } | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  const now = new Date();
  const days = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return { label: 'Expired', urgent: false, soon: false };
  if (days <= 7)  return { label: `${days}d left`, urgent: true,  soon: false };
  if (days <= 30) return { label: `${days}d left`, urgent: false, soon: true  };
  return { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), urgent: false, soon: false };
}

/* ── Opportunity Card ────────────────────────────────────────── */
const OppCard: React.FC<{ opp: Opportunity; index: number }> = ({ opp, index }) => {
  const cfg = TYPE_CONFIG[opp.type];
  const TypeIcon = cfg.icon;
  const dl = deadlineInfo(opp.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      className="group bg-space-800 border border-space-500/30 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
    >
      {/* Color accent bar */}
      <div className="h-1 w-full" style={{ background: cfg.color }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${cfg.color}18`, color: cfg.color }}
          >
            <TypeIcon size={20} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg"
              style={{ background: `${cfg.color}18`, color: cfg.color }}
            >
              {cfg.label}
            </span>
            {opp.featured && (
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-gold-100 text-gold-600">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Title + Org */}
        <h3 className="font-black text-ink text-lg leading-snug mb-1 group-hover:text-electric-400 transition-colors">
          {opp.title}
        </h3>
        <p className="text-sm font-semibold text-ink-muted mb-3">{opp.organization}</p>

        {/* Description */}
        <p className="text-sm text-ink-dim leading-relaxed line-clamp-3 flex-1 mb-4">
          {opp.description}
        </p>

        {/* Tags */}
        {opp.tags && opp.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {opp.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-space-700 text-ink-dim border border-space-500/30">
                <Tag size={9} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-space-500/30 mt-auto">
          {dl ? (
            <span className={`flex items-center gap-1.5 text-xs font-bold ${
              dl.urgent ? 'text-gold-500' :
              dl.soon   ? 'text-gold-400' :
              'text-ink-muted'
            }`}>
              <Clock size={12} />
              {dl.urgent || dl.soon ? `Deadline: ${dl.label}` : `Due ${dl.label}`}
            </span>
          ) : <span />}

          {opp.link ? (
            <a
              href={opp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-bold transition-colors"
              style={{ color: cfg.color }}
              onClick={e => e.stopPropagation()}
            >
              Apply / Learn More <ExternalLink size={13} />
            </a>
          ) : (
            <span className="text-xs text-ink-muted italic">Link coming soon</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Featured Spotlight ──────────────────────────────────────── */
const FeaturedSpotlight: React.FC<{ opp: Opportunity }> = ({ opp }) => {
  const cfg = TYPE_CONFIG[opp.type];
  const TypeIcon = cfg.icon;
  const dl = deadlineInfo(opp.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden border border-space-500/30 shadow-card-hover mb-12"
      style={{ background: `linear-gradient(135deg, ${cfg.color}18 0%, transparent 60%)` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: cfg.color }} />
      <div className="p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${cfg.color}20`, color: cfg.color }}>
            <TypeIcon size={28} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg" style={{ background: `${cfg.color}18`, color: cfg.color }}>
                {cfg.label}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-gold-100 text-gold-600">
                Featured Opportunity
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink mb-1">{opp.title}</h2>
            <p className="text-base font-semibold text-ink-muted mb-3">{opp.organization}</p>
            <p className="text-ink-dim leading-relaxed mb-5 max-w-2xl">{opp.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              {opp.tags && opp.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-space-700 text-ink-dim">
                  <Tag size={10} /> {tag}
                </span>
              ))}
              {dl && (
                <span className={`flex items-center gap-1.5 text-sm font-bold ${dl.urgent ? 'text-gold-500' : dl.soon ? 'text-gold-400' : 'text-ink-muted'}`}>
                  <Calendar size={14} /> {dl.urgent || dl.soon ? `Closes in ${dl.label}` : `Due ${dl.label}`}
                </span>
              )}
            </div>
          </div>
          {opp.link && (
            <a
              href={opp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 shrink-0 shadow-lg"
              style={{ background: cfg.color, boxShadow: `0 8px 24px ${cfg.color}40` }}
            >
              Apply Now <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Page ───────────────────────────────────────────────── */
const Opportunities: React.FC = () => {
  const { opportunities } = useData();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<OpportunityType | 'All'>('All');

  const featured = useMemo(() => opportunities.find(o => o.featured), [opportunities]);

  const filtered = useMemo(() => {
    return opportunities.filter(o => {
      if (o.featured && activeType === 'All' && !search) return false;
      const matchesType = activeType === 'All' || o.type === activeType;
      const matchesSearch =
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.organization.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase()) ||
        (o.tags ?? []).some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [opportunities, activeType, search]);

  const urgentCount = opportunities.filter(o => {
    const dl = deadlineInfo(o.deadline);
    return dl?.urgent;
  }).length;

  return (
    <div className="bg-space-900 min-h-screen animate-fade-in">
      <SEO title="Opportunities" description="Scholarships, internships, programs, and competitions for LEHS TSA members." />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-space-800 border-b border-space-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-500/5 via-transparent to-electric-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-bold tracking-wider text-electric-500 uppercase bg-electric-50 rounded-full border border-electric-200">
              Member Opportunities
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-ink leading-[1.05] mb-4">
              Your Next <span className="text-electric-500">Big Break</span>
            </h1>
            <p className="text-xl text-ink-dim max-w-2xl leading-relaxed mb-8">
              Scholarships, internships, summer programs, and competitions — curated by your officers, updated regularly.
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              {[
                { val: opportunities.length,                                                               label: 'Opportunities', color: '#6a9bcc' },
                { val: opportunities.filter(o => o.type === 'Scholarship').length,                        label: 'Scholarships',  color: '#d97757' },
                { val: opportunities.filter(o => o.type === 'Internship' || o.type === 'Program').length, label: 'Programs',      color: '#6a9bcc' },
                { val: urgentCount,                                                                        label: 'Closing Soon',  color: '#d97757' },
              ].map((chip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-space-700 border border-space-500/30 shadow-card"
                >
                  <span className="text-2xl font-black" style={{ color: chip.color }}>{chip.val}</span>
                  <span className="text-xs text-ink-muted font-medium">{chip.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Urgent deadline banner */}
        {urgentCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gold-100 border border-gold-200/30 text-gold-500 mb-8 text-sm font-semibold"
          >
            <Clock size={16} className="shrink-0" />
            {urgentCount} opportunit{urgentCount === 1 ? 'y closes' : 'ies close'} within 7 days — don't miss out!
            <button onClick={() => setActiveType('All')} className="ml-auto text-xs font-bold underline underline-offset-2">View all</button>
          </motion.div>
        )}

        {/* Featured Spotlight */}
        {featured && activeType === 'All' && !search && (
          <FeaturedSpotlight opp={featured} />
        )}

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sticky top-20 z-20 bg-space-900 py-3">
          {/* Type pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 flex-1">
            {TYPES.map(type => {
              const cfg = TYPE_CONFIG[type];
              const Icon = cfg.icon;
              const active = activeType === type;
              const count = type === 'All' ? opportunities.length : opportunities.filter(o => o.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    active
                      ? 'text-white border-transparent shadow-md'
                      : 'bg-space-800 border-space-500/30 text-ink-dim hover:border-space-400/50'
                  }`}
                  style={active ? { background: cfg.color, boxShadow: `0 4px 12px ${cfg.color}40` } : {}}
                >
                  <Icon size={12} />
                  {cfg.label}
                  <span className={`ml-0.5 px-1.5 py-0.5 rounded text-[10px] font-black ${active ? 'bg-white/25 text-white' : 'bg-space-700 text-ink-muted'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Search */}
          <div className="relative sm:w-64 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              placeholder="Search opportunities…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-space-800 border border-space-500/30 rounded-xl pl-9 pr-4 py-2 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-space-800 border border-dashed border-space-500/30 rounded-2xl">
            <Globe size={44} className="mx-auto text-ink-muted mb-3" />
            <h3 className="font-bold text-ink mb-1">No opportunities found</h3>
            <p className="text-sm text-ink-dim">
              {opportunities.length === 0
                ? 'Check back soon — officers post new opportunities regularly.'
                : 'Try adjusting your search or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp, i) => <OppCard key={opp.id} opp={opp} index={i} />)}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 p-8 bg-gradient-to-br from-electric-500/10 via-transparent to-electric-500/5 border border-electric-500/20 rounded-3xl flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-electric-100 flex items-center justify-center text-electric-500 shrink-0">
            <BookOpen size={24} />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-black text-ink text-lg mb-1">Know of an opportunity?</h3>
            <p className="text-sm text-ink-dim">
              Share scholarships, programs, or competitions with an officer and they'll post it here for all members.
            </p>
          </div>
          <a
            href="#/contact"
            className="sm:ml-auto flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-electric-500 hover:bg-electric-400 transition-colors shrink-0 shadow-lg shadow-electric-500/20"
          >
            Contact Officers <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Opportunities;
