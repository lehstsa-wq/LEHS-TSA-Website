import React, { useState } from 'react';
import {
  Users, Plus, Search, Filter,
  UserPlus, UserMinus, Trash2, ChevronDown, ChevronUp,
  Lock, Unlock, CheckCircle, X, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { useModal } from '../context/ModalContext';
import { COMPETITIONS } from '../data/competitions';
import { Team } from '../types';
import { SEO } from '../components/SEO';

const MAX_SIZES = [2, 3, 4, 5, 6];

const statusConfig = {
  open:   { label: 'Open',   color: 'text-electric-400', bg: 'bg-electric-500/10', icon: Unlock },
  full:   { label: 'Full',   color: 'text-gold-400',     bg: 'bg-gold-500/10',     icon: Users  },
  closed: { label: 'Closed', color: 'text-ink-muted',    bg: 'bg-space-600/40',    icon: Lock   },
};

// ── Create Team Form ──────────────────────────────────────────────────────────
const CreateTeamForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useAuth();
  const { createTeam } = useData();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [maxSize, setMaxSize] = useState(3);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const allComps = [
    ...COMPETITIONS.map(c => ({ id: c.id, title: c.title })),
    { id: 'teams', title: 'TEAMS' },
  ].sort((a, b) => a.title.localeCompare(b.title));

  const selectedComp = allComps.find(c => c.id === competitionId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim() || !competitionId) return;
    setSaving(true);
    try {
      await createTeam({
        name: name.trim(),
        competitionId,
        competitionName: selectedComp?.title ?? competitionId,
        leaderId: user.id,
        leaderName: user.name,
        maxSize,
        description: description.trim(),
      });
      showToast('Team created!', 'success');
      onClose();
    } catch {
      showToast('Failed to create team. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="bg-space-800 border border-electric-500/30 rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-ink flex items-center gap-2">
          <Plus size={18} className="text-electric-400" /> Create a New Team
        </h2>
        <button onClick={onClose} className="p-1.5 rounded-lg text-ink-muted hover:text-ink transition-colors">
          <X size={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-1.5">Team Name *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Circuit Breakers"
            required
            className="w-full bg-space-700/60 border border-space-500/50 rounded-xl px-4 py-2.5 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors placeholder-ink-muted"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-1.5">Competition *</label>
          <div className="relative">
            <select
              value={competitionId}
              onChange={e => setCompetitionId(e.target.value)}
              required
              className="w-full bg-space-700/60 border border-space-500/50 rounded-xl px-4 pr-9 py-2.5 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select event…</option>
              {allComps.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-1.5">Max Team Size</label>
          <div className="relative">
            <select
              value={maxSize}
              onChange={e => setMaxSize(Number(e.target.value))}
              className="w-full bg-space-700/60 border border-space-500/50 rounded-xl px-4 pr-9 py-2.5 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors appearance-none cursor-pointer"
            >
              {MAX_SIZES.map(n => <option key={n} value={n}>{n} members</option>)}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-1.5">Description (optional)</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What are you looking for in teammates?"
            rows={2}
            className="w-full bg-space-700/60 border border-space-500/50 rounded-xl px-4 py-2.5 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors resize-none placeholder-ink-muted"
          />
        </div>
        <div className="sm:col-span-2 flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-xl text-sm font-semibold text-ink-muted hover:bg-space-700/40 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !name.trim() || !competitionId}
            className="px-6 py-2 rounded-xl text-sm font-bold bg-electric-500 text-white hover:bg-electric-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Plus size={15} />
            {saving ? 'Creating…' : 'Create Team'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// ── Team Card ─────────────────────────────────────────────────────────────────
const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
  const { user } = useAuth();
  const { joinTeam, leaveTeam, deleteTeam, updateTeamStatus } = useData();
  const { showToast } = useToast();
  const { confirm } = useModal();
  const [expanded, setExpanded] = useState(false);
  const [acting, setActing] = useState(false);

  const isLeader = user?.id === team.leaderId;
  const isMember = user ? team.memberIds.includes(user.id) : false;
  const spotsLeft = team.maxSize - team.memberIds.length;
  const cfg = statusConfig[team.status];
  const StatusIcon = cfg.icon;

  const handleJoin = async () => {
    if (!user) return;
    setActing(true);
    try {
      await joinTeam(team.id, user.id, user.name);
      showToast(`Joined ${team.name}!`, 'success');
    } catch {
      showToast('Failed to join. Try again.', 'error');
    } finally {
      setActing(false);
    }
  };

  const handleLeave = async () => {
    if (!user) return;
    const ok = await confirm('Leave Team', `Leave ${team.name}? You can rejoin if there's still space.`, false, 'Leave');
    if (!ok) return;
    setActing(true);
    try {
      await leaveTeam(team.id, user.id);
      showToast('Left the team.', 'success');
    } catch {
      showToast('Failed to leave. Try again.', 'error');
    } finally {
      setActing(false);
    }
  };

  const handleDelete = async () => {
    const ok = await confirm('Disband Team', `Disband ${team.name}? This cannot be undone.`, true, 'Disband');
    if (!ok) return;
    await deleteTeam(team.id);
    showToast('Team disbanded.', 'success');
  };

  const handleToggleClosed = async () => {
    const newStatus = team.status === 'closed' ? (spotsLeft > 0 ? 'open' : 'full') : 'closed';
    await updateTeamStatus(team.id, newStatus);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-space-800 border rounded-xl shadow-sm overflow-hidden transition-all ${
        isMember ? 'border-electric-500/40' : 'border-space-500/30'
      }`}
    >
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-ink text-base truncate">{team.name}</h3>
              {isMember && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/20">
                  {isLeader ? 'Your team' : 'Joined'}
                </span>
              )}
            </div>
            <p className="text-sm text-electric-400 font-medium">{team.competitionName}</p>
          </div>
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${cfg.bg} ${cfg.color} shrink-0`}>
            <StatusIcon size={12} /> {cfg.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-ink-muted">{team.memberIds.length} / {team.maxSize} members</span>
            {spotsLeft > 0 && team.status !== 'closed' && (
              <span className="text-xs font-semibold text-electric-400">{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} open</span>
            )}
          </div>
          <div className="w-full h-1.5 bg-space-600/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(team.memberIds.length / team.maxSize) * 100}%`,
                background: team.memberIds.length >= team.maxSize ? '#d97757' : '#6a9bcc',
              }}
            />
          </div>
        </div>

        {/* Leader */}
        <p className="text-xs text-ink-muted mb-3">
          Led by <span className="font-semibold text-ink-dim">{team.leaderName}</span>
        </p>

        {/* Description */}
        {team.description && (
          <p className="text-xs text-ink-dim bg-space-700/40 rounded-lg px-3 py-2 border border-space-500/30 mb-3">
            {team.description}
          </p>
        )}

        {/* Expand members toggle */}
        <button
          onClick={() => setExpanded(o => !o)}
          className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors mb-3"
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Hide' : 'Show'} members
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {team.memberNames.map((name, i) => (
                  <span
                    key={i}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      team.memberIds[i] === team.leaderId
                        ? 'bg-gold-500/10 text-gold-400 border-gold-500/20'
                        : 'bg-space-700/40 text-ink-dim border-space-500/30'
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        {user && (
          <div className="flex gap-2 flex-wrap">
            {!isMember && team.status === 'open' && (
              <button
                onClick={handleJoin}
                disabled={acting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-electric-500 text-white hover:bg-electric-600 transition-colors disabled:opacity-50"
              >
                <UserPlus size={14} /> {acting ? 'Joining…' : 'Join Team'}
              </button>
            )}
            {isMember && !isLeader && (
              <button
                onClick={handleLeave}
                disabled={acting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-ink-muted border border-space-500/50 hover:border-gold-500/40 hover:text-gold-400 transition-colors disabled:opacity-50"
              >
                <UserMinus size={14} /> Leave
              </button>
            )}
            {isLeader && (
              <>
                <button
                  onClick={handleToggleClosed}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                    team.status === 'closed'
                      ? 'border-electric-500/40 text-electric-400 hover:bg-electric-500/10'
                      : 'border-space-500/50 text-ink-muted hover:border-gold-500/40 hover:text-gold-400'
                  }`}
                >
                  {team.status === 'closed' ? <><Unlock size={14} /> Reopen</> : <><Lock size={14} /> Close</>}
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-ink-muted hover:text-gold-500 hover:bg-gold-500/10 border border-space-500/50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const Teams: React.FC = () => {
  const { user } = useAuth();
  const { teams } = useData();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [filterComp, setFilterComp] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'full' | 'closed'>('all');
  const [myTeamsOpen, setMyTeamsOpen] = useState(true);

  const myTeams = user ? teams.filter(t => t.memberIds.includes(user.id)) : [];

  const uniqueComps = ['All', ...Array.from(new Set(teams.map(t => t.competitionName))).sort()];

  const communityTeams = teams.filter(t => {
    if (user && t.memberIds.includes(user.id)) return false; // exclude mine — shown above
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.competitionName.toLowerCase().includes(search.toLowerCase()) ||
                          t.leaderName.toLowerCase().includes(search.toLowerCase());
    const matchesComp = filterComp === 'All' || t.competitionName === filterComp;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesComp && matchesStatus;
  });

  return (
    <div className="min-h-screen animate-fade-in pb-24">
      <SEO title="Teams" description="Find or form a competition team with LEHS TSA members." />

      {/* ── Hero ── */}
      <div className="bg-electric-500/5 border-b border-space-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-wider text-electric-400 uppercase bg-electric-500/10 rounded-full border border-electric-500/20">
                <Shield size={11} /> Competition Teams
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-ink tracking-tight mb-2">
                Find Your <span className="text-electric-400">Team</span>
              </h1>
              <p className="text-ink-muted text-lg max-w-xl">
                Browse open teams, join one that fits your skills, or start your own for any TSA competition.
              </p>
            </div>
            {user && (
              <button
                onClick={() => setShowCreate(o => !o)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-electric-500 hover:bg-electric-600 transition-colors shadow-lg shadow-electric-500/20 shrink-0"
              >
                <Plus size={18} />
                {showCreate ? 'Cancel' : 'Create Team'}
              </button>
            )}
          </div>

          {/* Stats row */}
          <div className="flex gap-6 mt-8">
            {[
              { label: 'Total Teams', val: teams.length },
              { label: 'Open', val: teams.filter(t => t.status === 'open').length, color: 'text-electric-400' },
              { label: 'My Teams', val: myTeams.length, color: 'text-electric-400' },
            ].map(s => (
              <div key={s.label}>
                <div className={`text-2xl font-black ${s.color ?? 'text-ink'}`}>{s.val}</div>
                <div className="text-xs text-ink-muted font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Create Form */}
        <AnimatePresence>
          {showCreate && <CreateTeamForm onClose={() => setShowCreate(false)} />}
        </AnimatePresence>

        {/* My Teams */}
        {user && myTeams.length > 0 && (
          <div className="bg-space-800 border border-electric-500/30 rounded-2xl shadow-sm mb-8 overflow-hidden">
            <button
              onClick={() => setMyTeamsOpen(o => !o)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-electric-400" />
                <span className="font-bold text-ink">My Teams</span>
                <span className="text-xs font-bold bg-electric-500/10 text-electric-400 px-2 py-0.5 rounded-full">{myTeams.length}</span>
              </div>
              {myTeamsOpen ? <ChevronUp size={16} className="text-ink-muted" /> : <ChevronDown size={16} className="text-ink-muted" />}
            </button>
            {myTeamsOpen && (
              <div className="px-6 pb-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-space-500/30 pt-4">
                {myTeams.map(t => <TeamCard key={t.id} team={t} />)}
              </div>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              placeholder="Search teams, competitions, leaders…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors placeholder-ink-muted"
            />
          </div>
          <div className="relative sm:w-52">
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <select
              value={filterComp}
              onChange={e => setFilterComp(e.target.value)}
              className="w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-ink focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-colors appearance-none"
            >
              {uniqueComps.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-1.5">
            {(['all', 'open', 'full', 'closed'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold capitalize transition-colors border ${
                  filterStatus === s
                    ? 'bg-electric-500 text-white border-transparent'
                    : 'bg-space-700/60 border-space-500/50 text-ink-muted hover:text-ink hover:border-electric-500/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="mb-4">
          <p className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-4">
            {user && myTeams.length > 0 ? 'Other Teams' : 'All Teams'} — {communityTeams.length} result{communityTeams.length !== 1 ? 's' : ''}
          </p>
          {communityTeams.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-space-500/30 rounded-2xl">
              <Users size={44} className="mx-auto text-ink-muted opacity-30 mb-3" />
              <h3 className="font-bold text-ink mb-1">No teams found</h3>
              <p className="text-sm text-ink-muted">
                {teams.length === 0 ? 'Be the first to create a team!' : 'Try adjusting filters or be the first to create a team here.'}
              </p>
              {user && (
                <button
                  onClick={() => setShowCreate(true)}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-electric-500 text-white hover:bg-electric-600 transition-colors"
                >
                  <Plus size={15} /> Create Team
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {communityTeams.map(t => <TeamCard key={t.id} team={t} />)}
            </div>
          )}
        </div>

        {/* Guest CTA */}
        {!user && (
          <div className="mt-8 p-6 bg-space-800 border border-electric-500/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-electric-500/10 flex items-center justify-center text-electric-400 shrink-0">
              <Users size={22} />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-ink">Want to join or create a team?</p>
              <p className="text-sm text-ink-muted mt-0.5">Sign in to your LEHS TSA account to get started.</p>
            </div>
            <a href="#/login" className="sm:ml-auto px-5 py-2.5 rounded-xl text-sm font-bold bg-electric-500 text-white hover:bg-electric-600 transition-colors shrink-0">
              Sign In
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
