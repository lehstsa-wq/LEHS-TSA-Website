import React, { useState, useMemo } from 'react';
import {
  Briefcase, GraduationCap, Zap, Trophy, BookOpen, Star, Globe,
  Search, ExternalLink, Calendar, Clock, Tag, ArrowRight,
  Sparkles, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { OpportunityType, Opportunity } from '../types';
import { SEO } from '../components/SEO';

/* ── Category config ─────────────────────────────────────────── */
const TYPE_CONFIG: Record<OpportunityType | 'All', {
  label: string; color: string; bg: string; darkBg: string; icon: React.ElementType;
}> = {
  All:         { label: 'All',         color: '#6b7280', bg: 'bg-gray-100',        darkBg: 'dark:bg-white/10',       icon: Globe       },
  Scholarship: { label: 'Scholarship', color: '#f59e0b', bg: 'bg-amber-100',       darkBg: 'dark:bg-amber-900/30',   icon: GraduationCap },
  Internship:  { label: 'Internship',  color: '#3b82f6', bg: 'bg-blue-100',        darkBg: 'dark:bg-blue-900/30',    icon: Briefcase   },
  Program:     { label: 'Program',     color: '#8b5cf6', bg: 'bg-violet-100',      darkBg: 'dark:bg-violet-900/30',  icon: BookOpen    },
  Competition: { label: 'Competition', color: '#e05c5c', bg: 'bg-red-100',         darkBg: 'dark:bg-red-900/30',     icon: Trophy      },
  Workshop:    { label: 'Workshop',    color: '#22c55e', bg: 'bg-green-100',        darkBg: 'dark:bg-green-900/30',   icon: Zap         },
  Fellowship:  { label: 'Fellowship',  color: '#06b6d4', bg: 'bg-cyan-100',        darkBg: 'dark:bg-cyan-900/30',    icon: Star        },
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
      className="group bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
    >
      {/* Color accent bar */}
      <div className="h-1 w-full" style={{ background: cfg.color }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.darkBg}`}
            style={{ color: cfg.color }}
          >
            <TypeIcon size={20} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${cfg.bg} ${cfg.darkBg}`}
              style={{ color: cfg.color }}
            >
              {cfg.label}
            </span>
            {opp.featured && (
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles size={9} /> Featured
              </span>
            )}
          </div>
        </div>

        {/* Title + Org */}
        <h3 className="font-black text-gray-900 dark:text-white text-lg leading-snug mb-1 group-hover:text-accent-blue transition-colors">
          {opp.title}
        </h3>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">{opp.organization}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1 mb-4">
          {opp.description}
        </p>

        {/* Tags */}
        {opp.tags && opp.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {opp.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-border">
                <Tag size={9} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-border mt-auto">
          {dl ? (
            <span className={`flex items-center gap-1.5 text-xs font-bold ${
              dl.urgent ? 'text-red-500 dark:text-red-400' :
              dl.soon   ? 'text-amber-500 dark:text-amber-400' :
              'text-gray-500 dark:text-gray-400'
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
            <span className="text-xs text-gray-400 italic">Link coming soon</span>
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
      className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-xl mb-12"
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
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles size={9} /> Featured Opportunity
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1">{opp.title}</h2>
            <p className="text-base font-semibold text-gray-500 dark:text-gray-400 mb-3">{opp.organization}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 max-w-2xl">{opp.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              {opp.tags && opp.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                  <Tag size={10} /> {tag}
                </span>
              ))}
              {dl && (
                <span className={`flex items-center gap-1.5 text-sm font-bold ${dl.urgent ? 'text-red-500' : dl.soon ? 'text-amber-500' : 'text-gray-500'}`}>
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
      if (o.featured && activeType === 'All' && !search) return false; // shown in spotlight
      const matchesType = activeType === 'All' || o.type === activeType;
      const matchesSearch =
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.organization.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase()) ||
        (o.tags ?? []).some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [opportunities, activeType, search]);

  // Urgent deadlines for banner
  const urgentCount = opportunities.filter(o => {
    const dl = deadlineInfo(o.deadline);
    return dl?.urgent;
  }).length;

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in transition-colors duration-300">
      <SEO title="Opportunities" description="Scholarships, internships, programs, and competitions for LEHS TSA members." />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-bold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
              <Sparkles size={11} /> Member Opportunities
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-4">
              Your Next <span className="text-accent-blue">Big Break</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-8">
              Scholarships, internships, summer programs, and competitions — curated by your officers, updated regularly.
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              {[
                { val: opportunities.length,                                                           label: 'Opportunities',  color: '#3b82f6' },
                { val: opportunities.filter(o => o.type === 'Scholarship').length,                    label: 'Scholarships',   color: '#f59e0b' },
                { val: opportunities.filter(o => o.type === 'Internship' || o.type === 'Program').length, label: 'Programs',   color: '#8b5cf6' },
                { val: urgentCount,                                                                    label: 'Closing Soon',   color: '#e05c5c' },
              ].map((chip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border shadow-sm"
                >
                  <span className="text-2xl font-black" style={{ color: chip.color }}>{chip.val}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{chip.label}</span>
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
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-300 mb-8 text-sm font-semibold"
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
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sticky top-20 z-20 bg-gray-50 dark:bg-dark-bg py-3">
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
                      : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-dark-border/80'
                  }`}
                  style={active ? { background: cfg.color, boxShadow: `0 4px 12px ${cfg.color}40` } : {}}
                >
                  <Icon size={12} />
                  {cfg.label}
                  <span className={`ml-0.5 px-1.5 py-0.5 rounded text-[10px] font-black ${active ? 'bg-white/25 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Search */}
          <div className="relative sm:w-64 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search opportunities…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue outline-none transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-dark-surface border border-dashed border-gray-200 dark:border-dark-border rounded-2xl">
            <Globe size={44} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">No opportunities found</h3>
            <p className="text-sm text-gray-500">
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
          className="mt-14 p-8 bg-gradient-to-br from-accent-blue/10 via-transparent to-violet-500/5 border border-accent-blue/20 rounded-3xl flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent-blue/15 flex items-center justify-center text-accent-blue shrink-0">
            <Sparkles size={24} />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1">Know of an opportunity?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share scholarships, programs, or competitions with an officer and they'll post it here for all members.
            </p>
          </div>
          <a
            href="#/contact"
            className="sm:ml-auto flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-accent-blue hover:bg-accent-hover transition-colors shrink-0 shadow-lg shadow-accent-blue/20"
          >
            Contact Officers <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Opportunities;
