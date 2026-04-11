import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Users, Filter, GraduationCap, Shield, Star,
  Phone, Mail, Tag, X, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { User } from '../types';

const GRADE_OPTIONS = ['All', '9', '10', '11', '12', 'Faculty', 'Alumni'];
const ROLE_OPTIONS = ['All', 'member', 'officer', 'advisor'];

const roleBadge: Record<string, string> = {
  advisor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  officer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  member:  'bg-green-500/20 text-green-400 border-green-500/30',
  guest:   'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const gradeLabel = (g?: string) => {
  if (!g) return '';
  if (g === 'Faculty' || g === 'Alumni') return g;
  const n = parseInt(g);
  if (isNaN(n)) return g;
  return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} Grade`;
};

// ─── Member Card ─────────────────────────────────────────────────────────────

const MemberCard: React.FC<{ member: User; showContact: boolean }> = ({ member, showContact }) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = (member.skills?.length ?? 0) > 0 || (member.interests?.length ?? 0) > 0 || member.bio;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card overflow-hidden"
    >
      {/* Top */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-2xl object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold text-xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-ink truncate">{member.name}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${roleBadge[member.role] ?? roleBadge.member}`}>
              {member.role}
            </span>
            {member.grade && (
              <span className="flex items-center gap-1 text-[11px] text-ink-muted">
                <GraduationCap size={10} /> {gradeLabel(member.grade)}
              </span>
            )}
          </div>

          {/* Contact — officers only */}
          {showContact && (member.phone || member.email) && (
            <div className="flex flex-wrap gap-3 mt-2">
              {member.email && (
                <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-[11px] text-ink-dim hover:text-gold transition-colors">
                  <Mail size={10} /> {member.email}
                </a>
              )}
              {member.phone && (
                <span className="flex items-center gap-1 text-[11px] text-ink-dim">
                  <Phone size={10} /> {member.phone}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Expand toggle */}
        {hasDetails && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="shrink-0 p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-warm-800/60 transition-all"
          >
            <ChevronDown size={15} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && hasDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-warm-700/40 space-y-3">
              {member.bio && (
                <p className="text-xs text-ink-dim leading-relaxed">{member.bio}</p>
              )}
              {(member.skills?.length ?? 0) > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Tag size={9} /> Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills!.map(s => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(member.interests?.length ?? 0) > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Star size={9} /> Competition Interests
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.interests!.map(i => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold-400 border border-gold-500/20 font-medium">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const MemberDirectory: React.FC = () => {
  const { user, isOfficer } = useAuth();
  const { members } = useData();
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeMembers = useMemo(() =>
    members.filter(m => m.status !== 'suspended' && m.status !== 'archived'),
    [members]
  );

  // Collect all unique skills for the skill filter
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    activeMembers.forEach(m => m.skills?.forEach(s => set.add(s)));
    return Array.from(set).sort();
  }, [activeMembers]);

  const filtered = useMemo(() => {
    return activeMembers.filter(m => {
      const matchSearch = !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.bio?.toLowerCase().includes(search.toLowerCase()));
      const matchGrade = gradeFilter === 'All' || m.grade === gradeFilter;
      const matchRole = roleFilter === 'All' || m.role === roleFilter;
      const matchSkill = !skillFilter || (m.skills?.includes(skillFilter) ?? false);
      return matchSearch && matchGrade && matchRole && matchSkill;
    });
  }, [activeMembers, search, gradeFilter, roleFilter, skillFilter]);

  const hasActiveFilters = gradeFilter !== 'All' || roleFilter !== 'All' || !!skillFilter;

  if (!user) return null;

  return (
    <div>
      <SEO title="Member Directory" description="Browse the Little Elm TSA member directory — find teammates and connect with chapter members." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="orb w-[500px] h-[400px] top-[-60px] right-[-40px] opacity-25 animate-orb-float-1" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4"><Users size={12} /> Chapter Members</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-4">Member Directory</h1>
            <p className="section-body max-w-2xl">
              Find teammates, explore skills, and connect with chapter members. {activeMembers.length} active members.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-warm-950 to-transparent" />
      </section>

      {/* Controls */}
      <div className="sticky top-20 z-20 bg-warm-950/95 backdrop-blur-md border-b border-warm-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or bio…"
              className="w-full pl-9 pr-8 py-2.5 bg-warm-850/60 border border-warm-700/40 rounded-xl text-sm text-ink placeholder-ink-muted focus:ring-2 focus:ring-gold/20 focus:border-gold/50 outline-none transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              hasActiveFilters || showFilters
                ? 'bg-gold/20 text-gold border-gold/40'
                : 'bg-warm-850/60 text-ink-muted border-warm-700/40 hover:text-ink'
            }`}
          >
            <Filter size={14} />
            Filters
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            )}
          </button>

          {/* Count */}
          <span className="text-xs text-ink-muted hidden sm:block">
            {filtered.length} of {activeMembers.length}
          </span>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-warm-700/40"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-4 items-end">
                {/* Grade */}
                <div>
                  <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <GraduationCap size={9} /> Grade
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {GRADE_OPTIONS.map(g => (
                      <button key={g} onClick={() => setGradeFilter(g)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          gradeFilter === g ? 'bg-gold text-white' : 'bg-warm-850/60 text-ink-muted hover:text-ink border border-warm-700/40'
                        }`}>
                        {g === 'All' ? 'All' : gradeLabel(g)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Shield size={9} /> Role
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ROLE_OPTIONS.map(r => (
                      <button key={r} onClick={() => setRoleFilter(r)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors capitalize ${
                          roleFilter === r ? 'bg-gold text-white' : 'bg-warm-850/60 text-ink-muted hover:text-ink border border-warm-700/40'
                        }`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skill */}
                {allSkills.length > 0 && (
                  <div>
                    <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Tag size={9} /> Has Skill
                    </label>
                    <select
                      value={skillFilter}
                      onChange={e => setSkillFilter(e.target.value)}
                      className="bg-warm-850/60 border border-warm-700/40 rounded-lg px-3 py-1.5 text-xs text-ink outline-none focus:border-gold/50"
                    >
                      <option value="">Any skill</option>
                      {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                {hasActiveFilters && (
                  <button
                    onClick={() => { setGradeFilter('All'); setRoleFilter('All'); setSkillFilter(''); }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink ml-auto"
                  >
                    <X size={12} /> Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Users size={40} className="mx-auto mb-4 text-ink-muted opacity-40" />
            <p className="text-ink-muted font-semibold">No members match your filters.</p>
            <button onClick={() => { setSearch(''); setGradeFilter('All'); setRoleFilter('All'); setSkillFilter(''); }}
              className="mt-4 text-xs text-gold hover:text-gold font-semibold">
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(m => (
                <MemberCard key={m.id} member={m} showContact={isOfficer} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemberDirectory;
