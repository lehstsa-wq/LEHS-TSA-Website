import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Bell, FileText, Calendar, User,
  BookOpen, ExternalLink, Users, QrCode, LogOut,
  Code, Cpu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AIAdvisor from '../components/AIAdvisor';
import { SEO } from '../components/SEO';

const STAT_COLORS: Record<string, { fg: string; bg: string; border: string }> = {
  blue:   { fg: '#005DAA', bg: 'rgba(0,93,170,0.10)',    border: 'rgba(0,93,170,0.20)'   },
  violet: { fg: '#574E8F', bg: 'rgba(87,78,143,0.10)',   border: 'rgba(87,78,143,0.20)'  },
  green:  { fg: '#5a8f22', bg: 'rgba(134,187,80,0.12)',  border: 'rgba(134,187,80,0.22)' },
  amber:  { fg: '#b86200', bg: 'rgba(236,136,29,0.10)',  border: 'rgba(236,136,29,0.20)' },
};

const Dashboard: React.FC = () => {
  const { user, isOfficer, logout } = useAuth();
  const { announcements, resources, competitionInterests, problemReports } = useData();

  const recentUpdates = announcements.slice(0, 3);
  const recentResources = resources.slice(0, 3);
  const myInterests = competitionInterests.filter(i => i.userId === user?.id);
  const firstName = user?.name?.split(' ')[0] ?? 'Member';

  const UPDATE_DOT_COLORS: Record<string, string> = {
    Announcement: '#EE2624',
    Resource:     '#005DAA',
    Event:        '#EC881D',
  };

  return (
    <div className="min-h-screen animate-fade-in pb-20">
      <SEO title="Dashboard" description="Member dashboard for Little Elm High School TSA." />

      {/* ── Welcome header ── */}
      <div className="pt-20 pb-6" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 flex-wrap">

            {/* Avatar + name */}
            <div className="flex items-center gap-5">
              <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-3xl font-black flex-shrink-0 border-2 border-white/10 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #005DAA, #4E8AC9)',
                  boxShadow: '0 0 24px rgba(0,93,170,0.35)',
                }}>
                {user?.avatar
                  ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  : firstName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h1 className="text-3xl font-black tracking-tight text-ink">
                    Welcome, {firstName}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="badge badge-blue">Active Member</span>
                  <span className="font-mono text-xs text-ink-muted flex items-center gap-1">
                    Grade {user?.grade}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              {isOfficer && (
                <Link to="/admin"
                  className="relative btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                  <Shield size={16} className="text-gold-400" /> Admin Console
                  {problemReports.filter(r => r.status === 'Open').length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                      {problemReports.filter(r => r.status === 'Open').length}
                    </span>
                  )}
                </Link>
              )}
              <Link to="/settings" className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                <User size={15} /> Settings
              </Link>
              <button onClick={logout}
                className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ─── Main column ─── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Check-in banner */}
            <Link to="/check-in"
              className="flex items-center gap-4 p-4 rounded-2xl border border-electric-300/30 transition-all group bg-electric-100 hover:bg-electric-200"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-glow-blue"
                style={{ background: '#005DAA' }}>
                <QrCode size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-ink">Meeting Check-In</p>
                <p className="text-xs text-ink-dim mt-0.5">Enter your PIN to mark attendance for today's meeting</p>
              </div>
              <span className="text-xs font-bold text-electric-500 px-3.5 py-2 rounded-lg flex-shrink-0 bg-electric-100 border border-electric-300/30">
                Check In
              </span>
            </Link>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                { label: 'Resources', icon: BookOpen, path: '/resources', color: 'blue'   },
                { label: 'Updates',   icon: Bell,     path: '/updates',   color: 'violet' },
                { label: 'Events',    icon: Calendar,  path: '/events',    color: 'green'  },
                { label: 'Directory', icon: Users,     path: '/directory', color: 'amber'  },
              ] as const).map((item) => {
                const clr = STAT_COLORS[item.color];
                return (
                  <Link key={item.label} to={item.path}
                    className="card group transition-all hover:-translate-y-0.5 p-5"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: clr.bg, color: clr.fg, border: `1px solid ${clr.border}` }}>
                      <item.icon size={20} />
                    </div>
                    <div className="text-sm font-bold text-ink">{item.label}</div>
                  </Link>
                );
              })}
            </div>

            {/* AI Advisor */}
            <div className="animate-fade-in">
              <AIAdvisor />
            </div>

            {/* Recent Updates + Competitions */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* Recent Updates */}
              <div className="card overflow-hidden" style={{ padding: 0 }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-space-500/40"
                  style={{ background: 'var(--c-surface)' }}>
                  <h2 className="text-base font-bold text-ink flex items-center gap-2">
                    <Bell size={16} className="text-electric-400" /> Latest Updates
                  </h2>
                  <Link to="/updates" className="text-xs font-bold text-electric-400 hover:text-electric-400/70 transition-colors">
                    View all
                  </Link>
                </div>
                <div>
                  {recentUpdates.length > 0 ? recentUpdates.map((update, i) => (
                    <div key={update.id}
                      className={`flex items-start gap-3 px-5 py-4 transition-colors hover:bg-space-800/40 ${i > 0 ? 'border-t border-space-500/30' : ''}`}>
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: UPDATE_DOT_COLORS[update.type] ?? '#3b82f6' }} />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-ink mb-0.5 truncate">{update.title}</h3>
                        <p className="text-xs text-ink-dim line-clamp-2 leading-relaxed">{update.content}</p>
                      </div>
                      <span className="text-[10px] text-ink-muted font-mono flex-shrink-0 mt-0.5">{update.date}</span>
                    </div>
                  )) : (
                    <div className="p-10 text-center text-ink-muted text-sm">No recent updates.</div>
                  )}
                </div>
              </div>

              {/* Competitions / My Interests */}
              <div className="card flex flex-col">
                <h2 className="text-base font-bold text-ink flex items-center gap-2 mb-4">
                  My Competitions
                </h2>
                <div className="flex-1 flex flex-col gap-2">
                  {myInterests.length > 0 ? myInterests.map((interest, i) => (
                    <div key={i}
                      className="flex items-center gap-3 p-3 rounded-xl border border-space-500/40 bg-space-950/40">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,93,170,0.12)', color: '#005DAA' }}>
                        <Code size={14} />
                      </div>
                      <span className="text-sm font-semibold text-ink flex-1 truncate">{interest.competitionName}</span>
                    </div>
                  )) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-4 rounded-xl border border-dashed border-space-500/40"
                      style={{ background: 'var(--c-surface)' }}>
                      <p className="text-xs text-ink-muted max-w-[160px]">
                        Browse events and submit your interest to get placed on a team.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to="/competitions"
                    className="btn-secondary text-xs px-4 py-2 flex-1 text-center">
                    Explore
                  </Link>
                  <Link to="/interests"
                    className="btn-primary text-xs px-4 py-2 flex-1 text-center flex items-center justify-center gap-1.5">
                    <Users size={12} /> All Interests
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* ─── Sidebar ─── */}
          <div className="lg:col-span-4 space-y-5">

            {/* Member card */}
            <div className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #172a44 0%, #243d62 100%)',
                border: '1px solid rgba(0,93,170,0.35)',
                boxShadow: '0 0 32px rgba(0,93,170,0.18)',
              }}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Member Card</p>
                  <p className="text-lg font-bold mt-1">Little Elm TSA</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Cpu size={20} />
                </div>
              </div>
              <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-1">Full Name</p>
              <p className="text-base font-semibold mb-5">{user?.name}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-1">Member ID</p>
                  <p className="text-sm font-bold font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {user?.memberId ?? 'PENDING'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-1">Grade</p>
                  <p className="text-sm font-bold">{user?.grade}</p>
                </div>
              </div>
            </div>

            {/* Featured Resources */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-ink flex items-center gap-2">
                  <BookOpen size={16} className="text-electric-400" /> Featured Resources
                </h2>
                <Link to="/resources" className="text-xs font-bold text-electric-400 hover:text-electric-400/70 transition-colors">
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {recentResources.length > 0 ? recentResources.map((resource, i) => (
                  <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-space-500/40 hover:border-electric-300/40 transition-all group"
                    style={{ background: 'rgba(4,8,15,0.4)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-space-500/40"
                      style={{ background: 'rgba(26,48,80,0.6)' }}>
                      <FileText size={14} className="text-ink-muted group-hover:text-electric-400 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{resource.title}</p>
                      <p className="text-[10px] text-ink-muted uppercase tracking-wider font-mono">{resource.type}</p>
                    </div>
                    <ExternalLink size={12} className="text-ink-ghost group-hover:text-electric-400 transition-colors flex-shrink-0" />
                  </a>
                )) : (
                  <p className="text-center text-ink-muted text-sm py-4 italic">No resources available.</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
