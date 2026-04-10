import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Trophy, AlertTriangle, Search,
  ChevronRight, CheckCircle,
  Briefcase, PenTool, Cpu, Hammer, Zap, Plane, Layers, X,
  Users, Clock, FileText, Download, Star, MapPin, Filter, UserCheck, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { COMPETITIONS } from '../data/competitions';
import { LazyImage } from '../components/LazyImage';
import { SEO } from '../components/SEO';

/* ── Category metadata with per-category accent colors ── */
const CATEGORY_META: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  stem:       { label: 'STEM',           color: '#3b82f6', bg: 'rgba(59,130,246,0.32)',   icon: Cpu      },
  arch:       { label: 'Architecture',   color: '#f59e0b', bg: 'rgba(245,158,11,0.32)',   icon: Hammer   },
  man:        { label: 'Manufacturing',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.32)',   icon: Layers   },
  trans:      { label: 'Transportation', color: '#06b6d4', bg: 'rgba(6,182,212,0.32)',    icon: Plane    },
  energy:     { label: 'Energy',         color: '#e05c5c', bg: 'rgba(224,92,92,0.32)',    icon: Zap      },
  ict:        { label: 'ICT',            color: '#60a5fa', bg: 'rgba(96,165,250,0.32)',   icon: Cpu      },
  design:     { label: 'Design',         color: '#ec4899', bg: 'rgba(236,72,153,0.32)',   icon: PenTool  },
  leadership: { label: 'Leadership',     color: '#22c55e', bg: 'rgba(34,197,94,0.32)',    icon: Briefcase},
};

const CATEGORIES = [
  { id: 'all',        name: 'All Events' },
  { id: 'stem',       name: 'STEM'       },
  { id: 'arch',       name: 'Architecture'},
  { id: 'man',        name: 'Manufacturing'},
  { id: 'trans',      name: 'Transportation'},
  { id: 'energy',     name: 'Energy'     },
  { id: 'ict',        name: 'ICT'        },
  { id: 'design',     name: 'Design'     },
  { id: 'leadership', name: 'Leadership' },
];

/* ── TEAMS competition components ── */
const TEAMS_COMPONENTS = [
  {
    id: 'design-build',
    title: 'Design / Build',
    description: 'Teams design and construct a physical solution to an engineering challenge based on the annual theme. Judged on creativity, functionality, and engineering principles.',
    icon: Hammer,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'An individual written exam covering engineering aptitude, mathematics, and science concepts relevant to the annual theme.',
    icon: FileText,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.25)',
  },
  {
    id: 'math-modeling',
    title: 'Mathematical Modeling',
    description: 'Teams apply mathematical and scientific reasoning to model and solve an open-ended engineering problem tied to the year\'s theme.',
    icon: Layers,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.25)',
  },
  {
    id: 'essay',
    title: 'Essay',
    description: 'A written response analyzing a real-world engineering issue connected to the annual theme, evaluated on depth of understanding and communication.',
    icon: PenTool,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.25)',
  },
];

const Competitions: React.FC = () => {
  const { user } = useAuth();
  const { submitInterest, competitionLinks } = useData();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [skills, setSkills] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCompetitions = COMPETITIONS.filter(comp => {
    const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
    const matchesSearch =
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInterestSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await submitInterest({
        userId: user.id,
        userName: user.name,
        competitionId: selectedEvent.id,
        competitionName: selectedEvent.title,
        skills,
        notes,
        teamMembers: teamMembers.split(',').map((m: string) => m.trim()).filter((m: string) => m),
      });
      showToast('Interest submitted successfully!', 'success');
      setTimeout(() => {
        setIsSubmitting(false);
        setSkills([]);
        setNotes('');
        setTeamMembers('');
        setSelectedEvent(null);
      }, 500);
    } catch (err) {
      showToast('Failed to submit interest. Please try again.', 'error');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const currentResourceLinks = selectedEvent ? (competitionLinks[selectedEvent.id] ?? []) : [];
  const meta = selectedEvent ? (CATEGORY_META[selectedEvent.category] ?? CATEGORY_META['stem']) : null;

  return (
    <div>
      <SEO title="Competitions" description="Browse and sign up for TSA competitions at Little Elm High School." />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 grid-bg opacity-25" />

        {/* Orbs */}
        <div className="orb orb-blue   w-[600px] h-[500px] top-[-80px]   right-[-60px]  opacity-30 animate-orb-float-1" />
        <div className="orb orb-crimson w-[350px] h-[350px] bottom-[0px]  left-[5%]      opacity-20 animate-orb-float-2" />
        <div className="orb orb-gold   w-[280px] h-[280px] top-[20%]     right-[25%]    opacity-15 animate-orb-float-3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label inline-flex mb-5"><Trophy size={12} /> 2025–2026 Season</div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-balance">
              Compete.{' '}
              <span className="text-gradient-blue">Build.</span>
              <br />
              <span className="text-gradient-crimson">Win.</span>
            </h1>

            <p className="text-xl text-ink-dim leading-relaxed max-w-2xl mb-10">
              40 official TSA events spanning engineering, coding, design, and leadership.
              Find your event, join a team, and make it to nationals.
            </p>

            {/* Quick-stat chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { val: '40', label: 'Total Events',  color: '#3b82f6' },
                { val: '8',  label: 'Categories',    color: '#e05c5c' },
                { val: '1',  label: 'per Chapter',   color: '#f59e0b' },
                { val: 'TX', label: 'UTE Events Available', color: '#8b5cf6' },
              ].map((chip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3"
                >
                  <span className="text-2xl font-black" style={{ color: chip.color }}>{chip.val}</span>
                  <span className="text-xs text-ink-muted font-medium leading-tight">{chip.label}</span>
                </motion.div>
              ))}
            </div>

            {/* NQE / UTE info cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="glass-card rounded-2xl p-5 flex items-start gap-4 border-l-2 border-electric-500/60">
                <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center flex-shrink-0">
                  <Trophy size={18} />
                </div>
                <div>
                  <div className="font-bold text-ink text-sm mb-1">NQE — National Qualifying</div>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    Winners advance from state to the National TSA Conference.
                  </p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5 flex items-start gap-4 border-l-2 border-violet-500/60">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-bold text-ink text-sm mb-1">UTE — Unique to Texas</div>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    Texas-only events aligned with CTE programs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alert banner */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm"
          >
            <AlertTriangle size={15} className="flex-shrink-0" />
            <span>
              <strong className="text-gold-300">2024–2025 Update:</strong>{' '}
              Events reflect the current National TSA High School Competitive Events Summary and Texas UTE list.
            </span>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-space-950 to-transparent" />
      </section>

      {/* ════════════════════════════════════════
          STICKY FILTER BAR
      ════════════════════════════════════════ */}
      <div className="sticky top-16 z-30 bg-space-900/95 backdrop-blur-xl border-b border-space-500/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">

          {/* Category pills */}
          <div className="flex gap-1.5 flex-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => {
              const catMeta = CATEGORY_META[cat.id];
              const active = activeCategory === cat.id;
              const CatIcon = catMeta?.icon ?? Filter;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
                    active
                      ? 'text-white border-transparent'
                      : 'bg-space-700/50 text-ink-muted hover:text-ink border-space-500/50'
                  }`}
                  style={active ? {
                    background: catMeta?.color ?? '#3b82f6',
                    boxShadow: `0 0 12px ${catMeta?.color ?? '#3b82f6'}50`,
                  } : {}}
                >
                  {catMeta ? <CatIcon size={11} /> : <Trophy size={11} />}
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-space-700/50 border border-space-500/60 rounded-xl pl-9 pr-9 py-2 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Count + clear */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 flex items-center gap-3">
          <span className="text-xs text-ink-muted">
            Showing <span className="text-ink font-semibold">{filteredCompetitions.length}</span> event{filteredCompetitions.length !== 1 ? 's' : ''}
          </span>
          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-xs text-electric-400 hover:text-electric-300 transition-colors"
            >
              Clear filters ×
            </button>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          COMPETITION GRID
      ════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
        {filteredCompetitions.length === 0 ? (
          <div className="text-center py-24 text-ink-muted">
            <Trophy size={44} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-1">No events found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompetitions.map((comp, i) => {
              const catMeta = CATEGORY_META[comp.category] ?? CATEGORY_META['stem'];
              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.035, 0.35) }}
                  onClick={() => setSelectedEvent(comp)}
                  className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 bg-space-800/50 border border-space-500/50"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${catMeta.color}50`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${catMeta.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
                  }}
                >
                  {/* Top gradient stripe — category color */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to right, ${catMeta.color}, transparent)` }}
                  />

                  {/* Image */}
                  <div className="h-48 relative overflow-hidden flex-shrink-0">
                    <LazyImage
                      src={comp.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'}
                      alt={comp.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                    />

                    {/* Gradient overlay — tinted with category color */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to top, ${catMeta.color}60 0%, rgba(7,17,30,0.5) 50%, transparent 100%)`,
                      }}
                    />

                    {/* Category + UTE badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg backdrop-blur-sm border"
                        style={{
                          background: 'rgba(4, 8, 15, 0.65)',
                          color: catMeta.color,
                          borderColor: `${catMeta.color}55`,
                        }}
                      >
                        {catMeta.label}
                      </span>
                      {comp.title.includes('(UTE)') && (
                        <span className="badge badge-purple text-[10px] backdrop-blur-sm flex items-center gap-1">
                          <MapPin size={8} /> TX Only
                        </span>
                      )}
                    </div>

                    {/* Title on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-black text-white text-base leading-tight drop-shadow-lg">
                        {comp.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-ink-dim leading-relaxed line-clamp-3 flex-1 mb-4">
                      {comp.description}
                    </p>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="flex items-center gap-1 text-xs text-ink-muted bg-space-700/60 border border-space-500/40 px-2.5 py-1 rounded-lg">
                        <Users size={11} /> Max {comp.details.maxTeamSize}
                      </span>
                      {comp.details.timeLimit !== 'N/A' && (
                        <span className="flex items-center gap-1 text-xs text-ink-muted bg-space-700/60 border border-space-500/40 px-2.5 py-1 rounded-lg">
                          <Clock size={11} /> {comp.details.timeLimit}
                        </span>
                      )}
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-4 border-t border-space-500/30">
                      <span className="text-xs font-medium" style={{ color: catMeta.color }}>
                        View details
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5"
                        style={{ background: catMeta.bg, color: catMeta.color }}
                      >
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          TEAMS COMPETITION SECTION
      ════════════════════════════════════════ */}
      <section className="relative py-24 border-t border-space-500/30 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-900/0 via-space-800/40 to-space-900/0 pointer-events-none" />
        <div className="orb orb-blue   w-[600px] h-[500px] top-[-80px]  left-[-100px] opacity-10 animate-orb-float-2 pointer-events-none" />
        <div className="orb orb-crimson w-[300px] h-[300px] bottom-[0px] right-[5%]   opacity-10 animate-orb-float-3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="section-label inline-flex mb-4"><Shield size={12} /> TSA TEAMS Program</div>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                <span className="text-gradient-blue">TEAMS</span>
              </h2>
              <span className="text-ink-muted text-base font-medium mb-1 leading-snug">
                Tests of Engineering Aptitude,<br className="hidden sm:block" /> Mathematics &amp; Science
              </span>
            </div>
            <p className="text-ink-dim text-lg max-w-2xl leading-relaxed mb-6">
              A nationally recognized TSA competition where teams of 2–4 students tackle real-world engineering challenges using math and science. Winners advance from state to the National TSA Conference.
            </p>

            {/* Theme + size chips */}
            <div className="flex flex-wrap gap-3">
              <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 border border-amber-500/30">
                <Star size={15} className="text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">2025–2026 Theme</div>
                  <div className="text-sm font-black text-amber-300">Engineering the Past</div>
                </div>
              </div>
              <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 border border-electric-500/30">
                <Users size={15} className="text-electric-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">Team Size</div>
                  <div className="text-sm font-black text-ink">2–4 Members</div>
                </div>
              </div>
              <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 border border-violet-500/30">
                <Trophy size={15} className="text-violet-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">Advancement</div>
                  <div className="text-sm font-black text-ink">State → Nationals</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Four components */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <h3 className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-6 flex items-center gap-2">
              <ChevronRight size={12} /> Four Competition Components
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {TEAMS_COMPONENTS.map((comp, i) => {
              const Icon = comp.icon;
              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-space-500/50 hover:border-space-400/70 transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: comp.bg, color: comp.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: comp.color }}>
                      Component {i + 1}
                    </div>
                    <h4 className="font-black text-ink text-base leading-snug mb-2">{comp.title}</h4>
                    <p className="text-sm text-ink-dim leading-relaxed">{comp.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* TEAMS resource links (admin-managed) */}
          {(competitionLinks['teams'] ?? []).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-card rounded-2xl p-6 border border-violet-500/25 mb-5"
            >
              <h3 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                <Download size={14} className="text-violet-400" /> TEAMS Resources
              </h3>
              <div className="flex flex-wrap gap-2">
                {(competitionLinks['teams'] ?? []).map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 badge badge-blue hover:bg-electric-500/30 transition-colors text-xs"
                  >
                    <FileText size={11} /> {link.name || 'TEAMS Resource'}
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA / info banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 border border-electric-500/25 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-electric-500/20 text-electric-400 flex items-center justify-center flex-shrink-0">
              <UserCheck size={26} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-ink text-lg mb-1">Interested in TEAMS?</h4>
              <p className="text-sm text-ink-dim leading-relaxed">
                TEAMS is open to all LEHS TSA members. Teams of 2–4 compete together across all four components — talk to an officer to get placed on a team or form your own.
              </p>
            </div>
            <a
              href="https://tsaweb.org/teams"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0 flex items-center gap-2 text-sm"
            >
              <Trophy size={14} /> Learn More
            </a>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          DETAIL MODAL
      ════════════════════════════════════════ */}
      {selectedEvent && createPortal(
        <AnimatePresence>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={e => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-space-800 border border-space-500/60"
              style={{ boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px ${meta?.color ?? '#3b82f6'}25` }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-space-700/90 hover:bg-space-600 flex items-center justify-center text-ink-muted hover:text-ink transition-colors border border-space-500/50"
              >
                <X size={16} />
              </button>

              {/* Hero image */}
              <div className="h-72 relative overflow-hidden rounded-t-2xl">
                <LazyImage
                  src={selectedEvent.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                {/* Color-tinted overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${meta?.color ?? '#3b82f6'}40 0%, rgba(12,26,46,0.6) 50%, transparent 100%)`,
                  }}
                />
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span
                      className="text-[10px] font-bold uppercase px-3 py-1 rounded-lg border backdrop-blur-sm"
                      style={{ background: 'rgba(4, 8, 15, 0.65)', color: meta?.color, borderColor: `${meta?.color}55` }}
                    >
                      {meta?.label}
                    </span>
                    {selectedEvent.title.includes('(UTE)') && (
                      <span className="badge badge-purple text-[10px] backdrop-blur-sm">Texas UTE</span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-xl">
                    {selectedEvent.title}
                  </h2>
                </div>

                {/* Bottom category color line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(to right, ${meta?.color}, transparent)` }}
                />
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Description */}
                <p className="text-ink-dim text-base leading-relaxed mb-8 pb-8 border-b border-space-500/40">
                  {selectedEvent.details.fullDescription}
                </p>

                {/* Info grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="glass-card rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <Users size={14} className="text-electric-400" /> Eligibility
                    </h4>
                    <p className="text-sm text-ink-dim leading-relaxed">{selectedEvent.details.eligibility}</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <FileText size={14} className="text-electric-400" /> Procedure
                    </h4>
                    <p className="text-sm text-ink-dim leading-relaxed">{selectedEvent.details.procedure}</p>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <Briefcase size={14} className="text-gold-400" /> Career Connections
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.details.careers?.map((career: string) => (
                        <span key={career} className="badge badge-gold text-[10px]">{career}</span>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <Download size={14} className="text-violet-400" /> Resources
                    </h4>
                    {currentResourceLinks.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {currentResourceLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 badge badge-blue hover:bg-electric-500/30 transition-colors text-xs"
                          >
                            <FileText size={11} /> {link.name || 'Download Official Guide'}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-ink-muted italic">No resource link yet — check back soon.</p>
                    )}
                  </div>
                </div>

                {/* Requirements */}
                {selectedEvent.details.requirements?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: meta?.color }} /> Requirements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.details.requirements.map((req: string) => (
                        <span
                          key={req}
                          className="text-[11px] font-semibold px-3 py-1 rounded-lg border"
                          style={{ background: meta?.bg, color: meta?.color, borderColor: `${meta?.color}35` }}
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interest / Sign-in */}
                <div
                  className="glass-card rounded-2xl p-6 border"
                  style={{ borderColor: `${meta?.color}25` }}
                >
                  <h3 className="font-bold text-ink mb-1 flex items-center gap-2">
                    <Star size={16} style={{ color: meta?.color }} /> Express Interest
                  </h3>
                  <p className="text-xs text-ink-muted mb-5">Let officers know you're interested — no commitment required.</p>

                  {!user ? (
                    <p className="text-sm text-ink-muted">
                      <a href="#/login" className="text-electric-400 hover:text-electric-300 font-semibold transition-colors">Sign in</a>{' '}
                      to register your interest in this event.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">My Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {['Coding', 'Design', 'Building', 'Writing', 'Public Speaking', 'Research'].map(skill => (
                            <button
                              key={skill}
                              onClick={() => toggleSkill(skill)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                skills.includes(skill)
                                  ? 'text-white border-transparent'
                                  : 'bg-space-700/50 text-ink-muted border-space-500/50 hover:text-ink'
                              }`}
                              style={skills.includes(skill) ? {
                                background: meta?.color,
                                boxShadow: `0 0 10px ${meta?.color}50`,
                              } : {}}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">Team Members (optional)</label>
                        <input
                          type="text"
                          value={teamMembers}
                          onChange={e => setTeamMembers(e.target.value)}
                          placeholder="Comma-separated names"
                          className="w-full bg-space-700/50 border border-space-500/60 rounded-xl px-4 py-2.5 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">Notes</label>
                        <textarea
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                          placeholder="e.g., I have a partner in mind…"
                          className="w-full bg-space-700/50 border border-space-500/60 rounded-xl px-4 py-2.5 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all min-h-[80px] resize-none"
                        />
                      </div>
                      <div className="flex gap-3 pt-1">
                        <button onClick={() => setSelectedEvent(null)} className="btn-secondary flex-1 py-3">
                          Cancel
                        </button>
                        <button
                          onClick={handleInterestSubmit}
                          disabled={isSubmitting}
                          className="flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50"
                          style={{
                            background: `linear-gradient(135deg, ${meta?.color}, ${meta?.color}bb)`,
                            boxShadow: `0 4px 15px ${meta?.color}40`,
                          }}
                        >
                          {isSubmitting ? 'Submitting…' : 'Submit Interest'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Competitions;
