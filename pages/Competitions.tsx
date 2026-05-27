import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertTriangle, Search,
  ChevronRight, CheckCircle,
  Briefcase, PenTool, Cpu, Hammer, Zap, Plane, Layers, X,
  Users, Clock, FileText, Download, MapPin, Filter, UserCheck
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
  stem:       { label: 'STEM',           color: '#6a9bcc', bg: 'rgba(106,155,204,0.32)', icon: Cpu      },
  arch:       { label: 'Architecture',   color: '#d97757', bg: 'rgba(217,119,87,0.32)',  icon: Hammer   },
  man:        { label: 'Manufacturing',  color: '#6a9bcc', bg: 'rgba(106,155,204,0.32)', icon: Layers   },
  trans:      { label: 'Transportation', color: '#6a9bcc', bg: 'rgba(106,155,204,0.32)', icon: Plane    },
  energy:     { label: 'Energy',         color: '#d97757', bg: 'rgba(217,119,87,0.32)',  icon: Zap      },
  ict:        { label: 'ICT',            color: '#6a9bcc', bg: 'rgba(106,155,204,0.32)', icon: Cpu      },
  design:     { label: 'Design',         color: '#d97757', bg: 'rgba(217,119,87,0.32)',  icon: PenTool  },
  leadership: { label: 'Leadership',     color: '#788c5d', bg: 'rgba(120,140,93,0.32)',  icon: Briefcase},
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
    color: '#d97757',
    bg: 'rgba(217,119,87,0.25)',
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'An individual written exam covering engineering aptitude, mathematics, and science concepts relevant to the annual theme.',
    icon: FileText,
    color: '#6a9bcc',
    bg: 'rgba(106,155,204,0.25)',
  },
  {
    id: 'math-modeling',
    title: 'Mathematical Modeling',
    description: 'Teams apply mathematical and scientific reasoning to model and solve an open-ended engineering problem tied to the year\'s theme.',
    icon: Layers,
    color: '#6a9bcc',
    bg: 'rgba(106,155,204,0.25)',
  },
  {
    id: 'essay',
    title: 'Essay',
    description: 'A written response analyzing a real-world engineering issue connected to the annual theme, evaluated on depth of understanding and communication.',
    icon: PenTool,
    color: '#788c5d',
    bg: 'rgba(120,140,93,0.25)',
  },
];

const Competitions: React.FC = () => {
  const { user } = useAuth();
  const { submitInterest, competitionLinks, competitionInterests, deleteInterest } = useData();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [filterType, setFilterType] = useState<'all' | 'nqe' | 'ute'>('all');
  const teamsSectionRef = useRef<HTMLElement>(null);

  const [skills, setSkills] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [teamMemberInput, setTeamMemberInput] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Check if current user already submitted for the selected event
  const existingInterest = user && selectedEvent
    ? competitionInterests.find(i => i.userId === user.id && i.competitionId === selectedEvent.id)
    : null;

  const filteredCompetitions = COMPETITIONS.filter(comp => {
    const isUTE = comp.id.startsWith('ute-') || comp.title.includes('(UTE)');
    if (filterType === 'nqe' && isUTE) return false;
    if (filterType === 'ute' && !isUTE) return false;
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
        teamMembers,
      });
      showToast('Interest submitted!', 'success');
      setTimeout(() => {
        setIsSubmitting(false);
        setSkills([]);
        setNotes('');
        setTeamMembers([]);
        setTeamMemberInput('');
        setSelectedEvent(null);
      }, 500);
    } catch (err) {
      showToast('Failed to submit interest. Please try again.', 'error');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!existingInterest?.id) return;
    setIsWithdrawing(true);
    try {
      await deleteInterest(existingInterest.id);
      showToast('Interest withdrawn.', 'success');
      setSelectedEvent(null);
    } catch {
      showToast('Failed to withdraw. Please try again.', 'error');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addTeamMember = (name: string) => {
    const trimmed = name.trim();
    if (trimmed && !teamMembers.includes(trimmed)) {
      setTeamMembers(prev => [...prev, trimmed]);
    }
    setTeamMemberInput('');
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
        <div className="orb orb-gold w-[350px] h-[350px] bottom-[0px]  left-[5%]      opacity-20 animate-orb-float-2" />
        <div className="orb orb-gold   w-[280px] h-[280px] top-[20%]     right-[25%]    opacity-15 animate-orb-float-3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label inline-flex mb-5">2025–2026 Season</div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-balance">
              Compete.{' '}
              <span className="text-gradient-blue">Build.</span>
              <br />
              <span className="text-gradient-gold">Win.</span>
            </h1>

            <p className="text-xl text-ink-dim leading-relaxed max-w-2xl mb-10">
              40 official TSA events spanning engineering, coding, design, and leadership.
              Find your event, join a team, and make it to nationals.
            </p>

            {/* Quick-stat chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { val: '40', label: 'Total Events',  color: '#6a9bcc' },
                { val: '8',  label: 'Categories',    color: '#d97757' },
                { val: '1',  label: 'per Chapter',   color: '#d97757' },
                { val: 'TX', label: 'UTE Events Available', color: '#6a9bcc' },
              ].map((chip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-space-800 border border-space-500/60 rounded-2xl px-5 py-3 flex items-center gap-3"
                >
                  <span className="text-2xl font-black" style={{ color: chip.color }}>{chip.val}</span>
                  <span className="text-xs text-ink-muted font-medium leading-tight">{chip.label}</span>
                </motion.div>
              ))}
            </div>

            {/* NQE / UTE info cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="bg-space-800 border-l-4 border-electric-500 rounded-2xl p-5 flex items-start gap-4" style={{ borderTop: '1px solid rgba(78,138,201,0.25)', borderRight: '1px solid rgba(78,138,201,0.25)', borderBottom: '1px solid rgba(78,138,201,0.25)' }}>
                <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center flex-shrink-0">
                  <ChevronRight size={18} />
                </div>
                <div>
                  <div className="font-bold text-ink text-sm mb-1">NQE — National Qualifying</div>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    Winners advance from state to the National TSA Conference.
                  </p>
                </div>
              </div>
              <div className="bg-space-800 border-l-4 border-electric-500 rounded-2xl p-5 flex items-start gap-4" style={{ borderTop: '1px solid rgba(78,138,201,0.25)', borderRight: '1px solid rgba(78,138,201,0.25)', borderBottom: '1px solid rgba(78,138,201,0.25)' }}>
                <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center flex-shrink-0">
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
              <strong className="text-gold-300">2025–2026 Update:</strong>{' '}
              Events reflect the current National TSA High School Competitive Events Summary and Texas UTE list.
            </span>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-space-900 to-transparent" />
      </section>

      {/* ════════════════════════════════════════
          STICKY FILTER BAR
      ════════════════════════════════════════ */}
      <div className="sticky top-16 z-30 border-b border-space-500/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">

          {/* Row 1: Type filters + TEAMS button + Search */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Type pills: All / NQE / UTE */}
            <div className="flex gap-1 shrink-0">
              {([
                { id: 'all', label: 'All Events' },
                { id: 'nqe', label: 'NQE' },
                { id: 'ute', label: 'UTE' },
              ] as const).map(type => (
                <button
                  key={type.id}
                  onClick={() => setFilterType(type.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    filterType === type.id
                      ? 'bg-electric-500 text-white border-transparent'
                      : 'bg-space-700/50 text-ink-muted border-space-500/50 hover:text-ink'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-space-500/50 hidden sm:block" />

            {/* TEAMS scroll button */}
            <button
              onClick={() => teamsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 hover:bg-gold-500/20 transition-all whitespace-nowrap shrink-0"
            >
              <Users size={11} /> TEAMS ↓
            </button>

            {/* Spacer */}
            <div className="flex-1" />

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

          {/* Row 2: Category pills with visible thin scrollbar */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(106,155,204,0.35) transparent' }}
          >
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
                    background: catMeta?.color ?? '#6a9bcc',
                    boxShadow: `0 0 12px ${catMeta?.color ?? '#6a9bcc'}50`,
                  } : {}}
                >
                  {catMeta && <CatIcon size={11} />}
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Count + clear */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 flex items-center gap-3">
          <span className="text-xs text-ink-muted">
            Showing <span className="text-ink font-semibold">{filteredCompetitions.length}</span> event{filteredCompetitions.length !== 1 ? 's' : ''}
          </span>
          {(activeCategory !== 'all' || searchQuery || filterType !== 'all') && (
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setFilterType('all'); }}
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
                  style={{ boxShadow: 'var(--shadow-card)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${catMeta.color}50`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `var(--shadow-card-hover), 0 0 0 1px ${catMeta.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
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
                        className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg border"
                        style={{
                          background: 'rgba(4, 8, 15, 0.65)',
                          color: catMeta.color,
                          borderColor: `${catMeta.color}55`,
                        }}
                      >
                        {catMeta.label}
                      </span>
                      {comp.title.includes('(UTE)') && (
                        <span className="badge badge-blue text-[10px] flex items-center gap-1">
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
      <section ref={teamsSectionRef} className="relative py-24 border-t border-space-500/30 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-900/0 via-space-800/40 to-space-900/0 pointer-events-none" />
        <div className="orb orb-blue   w-[600px] h-[500px] top-[-80px]  left-[-100px] opacity-10 animate-orb-float-2 pointer-events-none" />
        <div className="orb orb-gold w-[300px] h-[300px] bottom-[0px] right-[5%]   opacity-10 animate-orb-float-3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="section-label inline-flex mb-4">TSA TEAMS Program</div>
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
              <div className="bg-space-800 border border-gold-500/30 rounded-2xl px-5 py-3">
                <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">2025–2026 Theme</div>
                <div className="text-sm font-black text-gold-300">Engineering the Past</div>
              </div>
              <div className="bg-space-800 border border-electric-500/30 rounded-2xl px-5 py-3">
                <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">Team Size</div>
                <div className="text-sm font-black text-ink">2–4 Members</div>
              </div>
              <div className="bg-space-800 border border-electric-500/30 rounded-2xl px-5 py-3">
                <div className="text-[10px] text-ink-muted font-bold uppercase tracking-widest">Advancement</div>
                <div className="text-sm font-black text-ink">State to Nationals</div>
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
                  className="bg-space-800 border border-space-500/60 rounded-2xl p-6 flex flex-col gap-4 border border-space-500/50 hover:border-space-400/70 transition-all duration-300"
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
              className="bg-space-800 border border-electric-500/25 rounded-2xl p-6 mb-5"
            >
              <h3 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                <Download size={14} className="text-electric-400" /> TEAMS Resources
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
            className="bg-space-800 border border-electric-500/25 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
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
              Learn More
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75"
            onClick={e => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-space-800 border border-space-500/60"
              style={{ boxShadow: `var(--shadow-elevated), 0 0 0 1px ${meta?.color ?? '#6a9bcc'}25` }}
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
                    background: `linear-gradient(to top, ${meta?.color ?? '#6a9bcc'}40 0%, rgba(12,26,46,0.6) 50%, transparent 100%)`,
                  }}
                />
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span
                      className="text-[10px] font-bold uppercase px-3 py-1 rounded-lg border"
                      style={{ background: 'rgba(4, 8, 15, 0.65)', color: meta?.color, borderColor: `${meta?.color}55` }}
                    >
                      {meta?.label}
                    </span>
                    {selectedEvent.title.includes('(UTE)') && (
                      <span className="badge badge-blue text-[10px]">Texas UTE</span>
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
                  <div className="bg-space-800 border border-space-500/60 rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <Users size={14} className="text-electric-400" /> Eligibility
                    </h4>
                    <p className="text-sm text-ink-dim leading-relaxed">{selectedEvent.details.eligibility}</p>
                  </div>
                  <div className="bg-space-800 border border-space-500/60 rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <FileText size={14} className="text-electric-400" /> Procedure
                    </h4>
                    <p className="text-sm text-ink-dim leading-relaxed">{selectedEvent.details.procedure}</p>
                  </div>
                  <div className="bg-space-800 border border-space-500/60 rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <Briefcase size={14} className="text-gold-400" /> Career Connections
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.details.careers?.map((career: string) => (
                        <span key={career} className="badge badge-gold text-[10px]">{career}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-space-800 border border-space-500/60 rounded-xl p-5">
                    <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                      <Download size={14} className="text-electric-400" /> Resources
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
                  className="bg-space-800 border border-space-500/60 rounded-2xl p-6 border"
                  style={{ borderColor: `${meta?.color}25` }}
                >
                  <h3 className="font-bold text-ink mb-1">Express Interest</h3>
                  <p className="text-xs text-ink-muted mb-5">Let officers know you're interested — no commitment required.</p>

                  {!user ? (
                    <p className="text-sm text-ink-muted">
                      <a href="#/login" className="text-electric-400 hover:text-electric-300 font-semibold transition-colors">Sign in</a>{' '}
                      to register your interest in this event.
                    </p>
                  ) : existingInterest ? (
                    /* ── Already submitted state ── */
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-green/10 border border-brand-green/25">
                        <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#788c5d' }} />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#788c5d' }}>You've already expressed interest!</p>
                          <p className="text-xs text-ink-muted mt-0.5">Submitted {new Date(existingInterest.timestamp).toLocaleDateString()}. Officers can see your submission.</p>
                        </div>
                      </div>
                      {existingInterest.skills.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">Your Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {existingInterest.skills.map(s => (
                              <span key={s} className="px-3 py-1 rounded-xl text-xs font-semibold text-white border-transparent" style={{ background: meta?.color }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {(existingInterest.teamMembers ?? []).length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">Team Members</p>
                          <div className="flex flex-wrap gap-2">
                            {(existingInterest.teamMembers ?? []).map((m, i) => (
                              <span key={i} className="px-3 py-1 rounded-xl text-xs font-semibold bg-space-700/60 border border-space-500/50 text-ink-muted">{m}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {existingInterest.notes && (
                        <p className="text-xs text-ink-muted italic bg-space-700/40 rounded-xl px-4 py-3 border border-space-500/30">"{existingInterest.notes}"</p>
                      )}
                      <div className="flex gap-3 pt-1">
                        <button onClick={() => setSelectedEvent(null)} className="btn-secondary flex-1 py-3">Close</button>
                        <button
                          onClick={handleWithdraw}
                          disabled={isWithdrawing}
                          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gold-700/80 hover:bg-gold-700 transition-all duration-200 disabled:opacity-50"
                        >
                          {isWithdrawing ? 'Withdrawing…' : 'Withdraw Interest'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Submit form ── */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">My Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {['Coding', 'Design', 'Building', 'Writing', 'Public Speaking', 'Research', 'CAD/3D Modeling', 'Video Editing'].map(skill => (
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
                        {teamMembers.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {teamMembers.map((m, i) => (
                              <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-space-700/60 border border-space-500/50 text-ink">
                                {m}
                                <button onClick={() => setTeamMembers(prev => prev.filter((_, idx) => idx !== i))} className="text-ink-muted hover:text-gold-400 transition-colors">
                                  <X size={11} />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <input
                          type="text"
                          value={teamMemberInput}
                          onChange={e => setTeamMemberInput(e.target.value)}
                          onKeyDown={e => {
                            if ((e.key === 'Enter' || e.key === ',') && teamMemberInput.trim()) {
                              e.preventDefault();
                              addTeamMember(teamMemberInput);
                            }
                          }}
                          onBlur={() => { if (teamMemberInput.trim()) addTeamMember(teamMemberInput); }}
                          placeholder="Type a name and press Enter…"
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
                        <button onClick={() => setSelectedEvent(null)} className="btn-secondary flex-1 py-3">Cancel</button>
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
