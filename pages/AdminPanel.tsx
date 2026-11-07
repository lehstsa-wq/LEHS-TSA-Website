
import React, { useRef, useState } from 'react';
import {
  Shield, Users, Bell, Calendar, Settings,
  Plus, Trash2, X, Search, Edit2,
  Briefcase, FolderOpen, Image as ImageIcon,
  TrendingUp, AlertCircle, Activity, Archive,
  Star, FileText, ExternalLink,
  Link as LinkIcon, Save, ChevronDown, ChevronUp,
  AlertOctagon, CheckCircle, UserCheck, UserX,
  Cpu, Hammer, Layers, Plane, Zap, PenTool, Palette, Upload, Loader2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  useAuth, buildAvatarUrl, avatarColorOf, avatarPhotoOf, AVATAR_COLORS, deriveMemberId, isApprovedMember,
} from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { Officer, Announcement, User } from '../types';
import { COMPETITIONS } from '../data/competitions';
import { SEO } from '../components/SEO';
import { ImageUpload } from '../components/ImageUpload';
import { tint } from '../lib/color';
import {
  uploadFile, openUploadedFile, deleteUploadedFile, linkProps, isUploadedFile, MAX_FILE_BYTES,
} from '../lib/uploadedFiles';

type Tab = 'overview' | 'approvals' | 'members' | 'updates' | 'leadership' | 'events' | 'projects' | 'gallery' | 'competitions' | 'interests' | 'resources' | 'issues' | 'settings' | 'attendance' | 'results' | 'opportunities' | 'teams';

// Shared Styles
const cardClass = "bg-space-800 border border-space-500/30 rounded-xl shadow-sm p-6";
const inputClass = "w-full bg-space-900 border border-space-500/50 p-2.5 rounded-lg text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-colors placeholder-ink-muted text-sm";
const labelClass = "block text-xs font-bold text-ink-muted uppercase tracking-wider mb-1.5";
const buttonClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2";

const AdminPanel: React.FC = () => {
  const { members } = useData();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const pendingCount = members.filter(m => m.status === 'pending').length;

  return (
    <div className="bg-space-900 min-h-screen animate-fade-in transition-colors duration-300 flex flex-col md:flex-row">
      <SEO title="Admin Panel" description="Manage Little Elm High School TSA website content and settings." />
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-space-800 border-r border-space-500/30 md:flex flex-col md:sticky md:top-20 md:h-[calc(100vh-5rem)] z-30 hidden">
        <div className="p-6 border-b border-space-500/30">
          <div className="flex items-center gap-2 text-electric-400">
             <Shield size={24} />
             <span className="font-bold text-lg">Officer Portal</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {[
            {
              label: 'General',
              items: [
                { id: 'overview', label: 'Overview', icon: Shield },
                { id: 'settings', label: 'Settings', icon: Settings },
              ]
            },
            {
              label: 'Members',
              items: [
                { id: 'approvals', label: 'Approvals', icon: UserCheck, badge: pendingCount },
                { id: 'members', label: 'Members', icon: Users },
                { id: 'attendance', label: 'Attendance', icon: CheckCircle },
                { id: 'issues', label: 'Issue Reports', icon: AlertOctagon },
              ]
            },
            {
              label: 'Competitions',
              items: [
                { id: 'competitions', label: 'Competition Links', icon: Briefcase },
                { id: 'interests', label: 'Interest Tracking', icon: Activity },
                { id: 'teams', label: 'Teams', icon: Users },
                { id: 'results', label: 'Results', icon: TrendingUp },
              ]
            },
            {
              label: 'Content',
              items: [
                { id: 'updates', label: 'Announcements', icon: Bell },
                { id: 'opportunities', label: 'Opportunities', icon: Zap },
                { id: 'leadership', label: 'Leadership', icon: Star },
                { id: 'events', label: 'Events', icon: Calendar },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                { id: 'resources', label: 'Resources', icon: LinkIcon },
              ]
            },
          ].map((group) => (
            <div key={group.label} className="mb-2">
              <p className="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest text-ink-muted">{group.label}</p>
              <ul className="space-y-0.5 px-3">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id as Tab)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-electric-500/10 text-electric-400'
                          : 'text-ink-dim hover:bg-space-700/60'
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                      {'badge' in item && (item as { badge?: number }).badge ? (
                        <span className="ml-auto min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center text-on-accent"
                          style={{ background: 'var(--cta)' }}>
                          {(item as { badge?: number }).badge}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-5rem)]">
        <div className="max-w-6xl mx-auto">
           {activeTab === 'overview' && <OverviewTab onOpenApprovals={() => setActiveTab('approvals')} />}
           {activeTab === 'approvals' && <ApprovalsTab />}
           {activeTab === 'members' && <MembersTab />}
           {activeTab === 'issues' && <IssuesTab />}
           {activeTab === 'updates' && <UpdatesTab />}
           {activeTab === 'leadership' && <LeadershipTab />}
           {activeTab === 'events' && <EventsTab />}
           {activeTab === 'projects' && <ProjectsTab />}
           {activeTab === 'gallery' && <GalleryTab />}
           {activeTab === 'competitions' && <CompetitionsTab />}
           {activeTab === 'interests' && <InterestsTab />}
           {activeTab === 'resources' && <ResourcesTab />}
           {activeTab === 'attendance' && <AttendanceTab />}
           {activeTab === 'results' && <ResultsTab />}
           {activeTab === 'opportunities' && <OpportunitiesTab />}
           {activeTab === 'teams' && <TeamsAdminTab />}
           {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};

/** Scrollable edit dialog shared by the leadership and member editors. */
const EditorModal: React.FC<{
    title: string;
    saving?: boolean;
    onCancel: () => void;
    onSave: () => void;
    children: React.ReactNode;
}> = ({ title, saving, onCancel, onSave, children }) => (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" onClick={onCancel}>
        <div
            className="bg-space-800 border border-space-500/30 rounded-2xl shadow-modal w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-between px-6 py-4 border-b border-space-500/30 shrink-0">
                <h3 className="font-bold text-ink">{title}</h3>
                <button onClick={onCancel} className="text-ink-muted hover:text-ink transition-colors"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 overflow-y-auto">{children}</div>
            <div className="px-6 py-4 border-t border-space-500/30 flex justify-end gap-3 bg-space-700/30 shrink-0">
                <button onClick={onCancel} className="px-4 py-2 text-sm font-bold text-ink-muted hover:text-ink rounded-lg transition-colors">
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    disabled={saving}
                    className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-50`}
                >
                    <Save size={15} /> {saving ? 'Saving…' : 'Save Changes'}
                </button>
            </div>
        </div>
    </div>
);

/* --- TAB COMPONENTS --- */

const OverviewTab: React.FC<{ onOpenApprovals: () => void }> = ({ onOpenApprovals }) => {
    const { members, competitionInterests, problemReports } = useData();
    const totalMembers = members.filter(m => isApprovedMember(m)).length;
    const pendingCount = members.filter(m => m.status === 'pending').length;
    const openIssues = problemReports.filter(r => r.status === 'Open').length;
    const recentInterests = [...competitionInterests]
.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
.slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in">
             {pendingCount > 0 && (
                <button onClick={onOpenApprovals}
                    className="w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left bg-gold-500/10 border-2 border-gold-500 hover:bg-gold-500/20 transition-colors">
                    <span className="flex items-center gap-3">
                        <UserCheck size={22} className="text-gold-500 shrink-0" />
                        <span>
                            <span className="block font-bold text-ink">
                                {pendingCount} {pendingCount === 1 ? 'account is' : 'accounts are'} awaiting approval
                            </span>
                            <span className="block text-sm text-ink-muted">Review new sign-ups before they can use the member portal.</span>
                        </span>
                    </span>
                    <span className="text-sm font-bold text-gold-500 shrink-0">Review &rarr;</span>
                </button>
             )}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={cardClass}>
                    <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">Total Members</p>
                    <h3 className="text-3xl font-bold text-ink mt-1">{totalMembers}</h3>
                </div>
                <div className={cardClass}>
                    <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">New Interests</p>
                    <h3 className="text-3xl font-bold text-ink mt-1">{competitionInterests.length}</h3>
                    <p className="text-xs text-ink-muted font-medium mt-1">Pending Review</p>
                </div>
                <div className={`${cardClass} ${openIssues > 0 ? 'border-gold-500/30 bg-gold-50/10' : ''}`}>
                    <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">Open Issues</p>
                    <h3 className={`text-3xl font-bold mt-1 ${openIssues > 0 ? 'text-gold-500' : ''}`} style={openIssues === 0 ? { color: 'var(--accent)' } : {}}>{openIssues}</h3>
                    <p className="text-xs text-ink-muted font-medium mt-1">Reported Problems</p>
                </div>
            </div>
            
            <div className={cardClass}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-ink flex items-center gap-2">
                        <Activity size={18} className="text-electric-400" /> Recent Competition Interests
                    </h3>
                </div>
                <div className="space-y-4">
                    {recentInterests.length > 0 ? (
                        recentInterests.map((interest, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-space-700/40 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-electric-500/10 flex items-center justify-center text-electric-400 font-bold">
                                    {interest.userName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm text-ink font-medium">
                                        {interest.userName} is interested in <span className="text-electric-400 font-bold">{interest.competitionName}</span>
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {interest.skills.map(s => (
                                            <span key={s} className="text-[10px] bg-space-600/60 px-2 py-0.5 rounded text-ink-dim">{s}</span>
                                        ))}
                                    </div>
                                    {interest.notes && <p className="text-xs text-ink-muted mt-1 italic">"{interest.notes}"</p>}
                                </div>
                            </div>
                        ))
                    ) : <p className="text-ink-muted text-center py-4">No recent activity.</p>}
                </div>
            </div>
        </div>
    );
};

const IssuesTab: React.FC = () => {
    const { problemReports, updateProblemReport, deleteProblemReport } = useData();
    const { confirm } = useModal();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-ink">Issue Reports</h2>
                    <p className="text-sm text-ink-muted">Track and resolve issues reported by members.</p>
                </div>
                <div className="text-sm text-ink-muted font-medium">
                    {problemReports.filter(r => r.status === 'Open').length} Open Issues
                </div>
            </div>

            <div className="space-y-4">
                {problemReports.length > 0 ? problemReports.map(report => (
                    <div key={report.id} className={`bg-space-800 border rounded-xl p-5 shadow-sm transition-all ${
                        report.status === 'Resolved' ? 'border-space-500/30 opacity-70' :
                        report.status === 'In Progress' ? 'border-gold-500/30' :
                        'border-gold-700/30'
                    }`}>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                        report.priority === 'High' ? 'bg-gold-100 text-gold-700' :
                                        report.priority === 'Medium' ? 'bg-gold-100 text-gold-500' :
                                        'bg-electric-100 text-electric-500'
                                    }`}>
                                        {report.priority}
                                    </span>
                                    <span className="text-xs text-ink-muted">• {report.category}</span>
                                    <span className="text-xs text-ink-muted">• {report.submittedDate}</span>
                                </div>
                                <h3 className="font-bold text-ink text-lg">{report.description}</h3>
                                <p className="text-sm text-ink-muted mt-1">Reported by: <span className="font-medium text-ink-dim">{report.reporterName}</span> ({report.reporterEmail})</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <select 
                                    value={report.status}
                                    onChange={(e) => updateProblemReport(report.id, { status: e.target.value as any })}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                                        report.status === 'Resolved' ? 'bg-space-700 text-ink-dim border-space-500/30' :
                                        report.status === 'In Progress' ? 'bg-gold-100 text-gold-600 border-gold-200' :
                                        'bg-gold-100 text-gold-700 border-gold-300'
                                    }`}
                                >
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Resolved</option>
                                </select>
                                <button onClick={async () => {
                                    if (await confirm('Delete Report', 'Are you sure you want to delete this report?', true, 'Delete')) {
                                        deleteProblemReport(report.id);
                                    }
                                }} className="text-ink-muted hover:text-gold-500 self-end p-1">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 bg-space-800 rounded-xl border border-dashed border-space-500/40">
                        <CheckCircle size={32} className="mx-auto mb-2 opacity-50" style={{ color: 'var(--accent)' }} />
                        <p className="text-ink-muted">No issues reported. Great job!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const MEMBER_GRADES = ['9', '10', '11', '12', 'Faculty', 'Alumni'];

/** Fields an officer can edit on someone else's member record. */
const MemberEditor: React.FC<{
    member: User;
    canChangeRole: boolean;
    onClose: () => void;
}> = ({ member, canChangeRole, onClose }) => {
    const { updateMember } = useData();
    const { alert: showAlert } = useModal();
    const [saving, setSaving] = useState(false);
    const [photo, setPhoto] = useState(avatarPhotoOf(member));
    const [color, setColor] = useState(avatarColorOf(member));
    const [draft, setDraft] = useState({
        name: member.name ?? '',
        email: member.email ?? '',
        phone: member.phone ?? '',
        grade: member.grade ?? '',
        bio: member.bio ?? '',
        role: member.role,
        status: member.status ?? 'active',
        duesPaid: !!member.duesPaid,
        appCompleted: !!member.appCompleted,
        remindJoined: !!member.remindJoined,
    });

    const set = (patch: Partial<typeof draft>) => setDraft(prev => ({ ...prev, ...patch }));

    const save = async () => {
        if (!draft.name.trim()) {
            await showAlert('Missing name', 'A member needs a name.');
            return;
        }
        setSaving(true);
        try {
            await updateMember(member.id, {
                name: draft.name.trim(),
                avatar: photo || buildAvatarUrl(draft.name.trim(), color),
                avatarColor: color,
                email: draft.email.trim(),
                phone: draft.phone.trim(),
                grade: draft.grade,
                bio: draft.bio.trim(),
                role: draft.role,
                status: draft.status,
                duesPaid: draft.duesPaid,
                appCompleted: draft.appCompleted,
                remindJoined: draft.remindJoined,
            });
            onClose();
        } catch {
            await showAlert('Error', 'Could not save those changes. Check your connection and try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <EditorModal title={`Edit ${member.name}`} saving={saving} onCancel={onClose} onSave={save}>
            <div className="space-y-4">
                <div>
                    <label className={labelClass}>Profile Photo</label>
                    <ImageUpload
                        value={photo}
                        onChange={setPhoto}
                        shape="circle"
                        size={72}
                        placeholder={<span className="text-2xl font-black">{draft.name.charAt(0) || '?'}</span>}
                        onError={msg => showAlert('Photo', msg)}
                    />
                </div>

                <div>
                    <label className={labelClass}><Palette size={12} className="inline mr-1" /> Avatar Color</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {AVATAR_COLORS.map(c => (
                            <button
                                key={c.hex}
                                type="button"
                                onClick={() => setColor(c.hex)}
                                title={c.label}
                                aria-label={c.label}
                                aria-pressed={color === c.hex}
                                className={`w-8 h-8 rounded-lg transition-all border-2 ${
                                    color === c.hex ? 'border-ink scale-110 shadow-md' : 'border-transparent hover:scale-105'
                                }`}
                                style={{ background: `#${c.hex}` }}
                            />
                        ))}
                    </div>
                    <p className="text-[11px] text-ink-muted mt-2">
                        {photo
                            ? 'The photo is shown instead of the color tile. Remove it to use the color.'
                            : 'Used for this member\u2019s initials tile across the portal.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Name</label>
                        <input value={draft.name} onChange={e => set({ name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Email</label>
                        <input value={draft.email} onChange={e => set({ email: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Phone</label>
                        <input value={draft.phone} onChange={e => set({ phone: e.target.value })} className={inputClass} placeholder="(555) 123-4567" />
                    </div>
                    <div>
                        <label className={labelClass}>Grade</label>
                        <select value={draft.grade} onChange={e => set({ grade: e.target.value })} className={inputClass}>
                            <option value="">Not set</option>
                            {MEMBER_GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Role</label>
                        <select
                            value={draft.role}
                            disabled={!canChangeRole}
                            onChange={e => set({ role: e.target.value as User['role'] })}
                            className={`${inputClass} disabled:opacity-60`}
                        >
                            <option value="member">Member</option>
                            <option value="officer">Officer</option>
                            <option value="advisor">Advisor</option>
                        </select>
                        {!canChangeRole && <p className="text-[11px] text-ink-muted mt-1">Only advisors can change roles.</p>}
                    </div>
                    <div>
                        <label className={labelClass}>Status</label>
                        <select value={draft.status} onChange={e => set({ status: e.target.value as User['status'] })} className={inputClass}>
                            <option value="active">Member</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspended</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Bio</label>
                    <textarea value={draft.bio} onChange={e => set({ bio: e.target.value })} className={`${inputClass} min-h-[80px]`} />
                </div>

                <div>
                    <label className={labelClass}>Membership Requirements</label>
                    <div className="flex flex-wrap gap-4 mt-1">
                        {([
                            ['duesPaid', 'Dues paid'],
                            ['appCompleted', 'Application completed'],
                            ['remindJoined', 'Joined Remind'],
                        ] as const).map(([key, label]) => (
                            <label key={key} className="flex items-center gap-2 text-sm text-ink-dim cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={draft[key]}
                                    onChange={e => set({ [key]: e.target.checked } as Partial<typeof draft>)}
                                    className="w-4 h-4 accent-current text-electric-500"
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Render the derived id rather than the stored memberId: until the
                    one-off purge has run, older records still hold the raw access
                    code there, which is also the member's password. */}
                <div className="text-xs text-ink-muted border-t border-space-500/30 pt-3">
                    Member ID <span className="font-mono text-ink-dim">{deriveMemberId(member.id)}</span>
                </div>
            </div>
        </EditorModal>
    );
};

/** Who an account is: a student, or the parent of a named member. */
const accountLabel = (m: User) =>
    m.accountType === 'parent' ? `Parent of ${m.parentOf || 'a member'}` : (m.grade || 'Student');

/**
 * New sign-ups wait here. Approving opens the member portal to them;
 * declining marks the account archived, which keeps it locked out (the email
 * stays registered, so it can't simply sign up again). Officers never see
 * passwords: Firebase stores only a hash.
 */
const ApprovalsTab: React.FC = () => {
    const { members, updateMemberStatus } = useData();
    const { confirm } = useModal();
    const { showToast } = useToast();

    const byNewest = (a: User, b: User) => (b.joinDate || '').localeCompare(a.joinDate || '');
    const pending = members.filter(m => m.status === 'pending').sort(byNewest);
    const declined = members.filter(m => m.status === 'archived').sort(byNewest);
    const studentNames = new Set(
        members
            .filter(m => isApprovedMember(m) && m.accountType !== 'parent')
            .map(m => m.name.trim().toLowerCase())
    );

    const approve = async (m: User) => {
        await updateMemberStatus(m.id, 'active');
        showToast(`${m.name} approved`, 'success');
    };
    const decline = async (m: User) => {
        if (!await confirm('Decline account', `Decline ${m.name}'s account? They won't be able to use the member portal. You can approve them later from this tab.`, true, 'Decline')) return;
        await updateMemberStatus(m.id, 'archived');
    };

    const Row: React.FC<{ m: User; declinedRow?: boolean }> = ({ m, declinedRow }) => {
        const parentMatch = m.accountType === 'parent'
            ? studentNames.has((m.parentOf || '').trim().toLowerCase())
            : null;
        return (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-space-700/50">
                <div className="min-w-0">
                    <p className="font-bold text-ink">{m.name}</p>
                    <p className="text-xs text-ink-muted break-all">{m.email}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.accountType === 'parent' ? 'badge-gold' : 'badge-blue'}`}>
                            {m.accountType === 'parent' ? 'Parent' : 'Student'}
                        </span>
                        <span className="text-xs text-ink-dim">{accountLabel(m)}</span>
                        {parentMatch !== null && (
                            <span className={`text-xs font-semibold ${parentMatch ? 'text-electric-400' : 'text-gold-500'}`}>
                                {parentMatch ? '· Matches a current member' : '· No current member with that name, check before approving'}
                            </span>
                        )}
                        {m.joinDate && <span className="text-xs text-ink-muted">· Requested {new Date(m.joinDate + 'T00:00:00').toLocaleDateString()}</span>}
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button onClick={() => approve(m)} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-600`}>
                        <UserCheck size={16} /> Approve
                    </button>
                    {!declinedRow && (
                        <button onClick={() => decline(m)} className={`${buttonClass} btn-secondary !py-2 !px-4 !text-sm`}>
                            <UserX size={16} /> Decline
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-1">Awaiting approval ({pending.length})</h3>
                <p className="text-sm text-ink-muted mb-5">
                    New accounts can't use the member portal until approved. Parents may only join as the parent of a
                    current member, so check the name they gave. Passwords are never visible to officers.
                </p>
                <div className="space-y-3">
                    {pending.length === 0 && <p className="text-ink-muted text-sm">No accounts are waiting. You're all caught up.</p>}
                    {pending.map(m => <Row key={m.id} m={m} />)}
                </div>
            </div>

            {declined.length > 0 && (
                <div className={cardClass}>
                    <h3 className="font-bold text-ink mb-1">Declined or deactivated ({declined.length})</h3>
                    <p className="text-sm text-ink-muted mb-5">These accounts are locked out. Approve one to restore access.</p>
                    <div className="space-y-3">
                        {declined.map(m => <Row key={m.id} m={m} declinedRow />)}
                    </div>
                </div>
            )}
        </div>
    );
};

const MembersTab: React.FC = () => {
    const { user } = useAuth();
    const { members, updateMemberRole, deleteMember } = useData();
    const { confirm } = useModal();
    const [editingMember, setEditingMember] = useState<User | null>(null);

    const canManage = user?.role === 'advisor' || user?.role === 'officer';
    const isAdvisor = user?.role === 'advisor';

    return (
        <div className="space-y-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">All Members ({members.length})</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-space-700/40 text-ink-muted">
                            <tr>
                                <th className="p-3 rounded-tl-lg">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-space-500/20">
                            {members.map(m => (
                                <tr key={m.id} className="hover:bg-space-700/30">
                                    <td className="p-3">
                                        <span className="font-medium text-ink">{m.name}</span>
                                        {m.accountType === 'parent' && (
                                            <span className="block text-xs text-ink-muted">{accountLabel(m)}</span>
                                        )}
                                    </td>
                                    <td className="p-3 text-xs text-ink-muted">{m.email}</td>
                                    <td className="p-3">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.role === 'advisor' ? 'bg-gold-100 text-gold-600' : 'bg-electric-100 text-electric-500'}`}>
                                            {m.role}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${isApprovedMember(m) ? 'bg-electric-50 text-electric-500' : 'bg-space-700 text-ink-muted'}`}>
                                            {isApprovedMember(m) ? 'active' : m.status === 'archived' ? 'declined' : m.status}
                                        </span>
                                    </td>
                                    <td className="p-3 flex gap-2 items-center">
                                        {canManage ? (
                                            <>
                                                <button
                                                    onClick={() => setEditingMember(m)}
                                                    className="p-1.5 hover:bg-electric-500/10 text-electric-400 rounded transition-colors"
                                                    title="Edit Details"
                                                >
                                                    <Edit2 size={14} />
                                                </button>

                                                {isAdvisor && (
                                                    <select
                                                        value={m.role}
                                                        onChange={(e) => updateMemberRole(m.id, e.target.value as any)}
                                                        className="bg-space-900 border border-space-500/50 rounded px-2 py-1 text-xs text-ink outline-none focus:border-electric-500 cursor-pointer"
                                                    >
                                                        <option value="member">Member</option>
                                                        <option value="officer">Officer</option>
                                                        <option value="advisor">Advisor</option>
                                                    </select>
                                                )}

                                                {isAdvisor && user?.id !== m.id && (
                                                    <button
                                                        onClick={async () => {
                                                            if (await confirm('Delete Member', `Are you sure you want to delete ${m.name}? This action cannot be undone.`, true, 'Delete')) {
                                                                deleteMember(m.id);
                                                            }
                                                        }}
                                                        className="p-1.5 hover:bg-gold-500/10 text-gold-500 rounded ml-1 transition-colors"
                                                        title="Remove Member"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-xs text-ink-muted italic">View Only</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-ink-muted">No members found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingMember && (
                <MemberEditor
                    member={editingMember}
                    canChangeRole={isAdvisor}
                    onClose={() => setEditingMember(null)}
                />
            )}
        </div>
    );
};

const UpdatesTab: React.FC = () => {
    const { announcements, addAnnouncement, deleteAnnouncement } = useData();
    const { confirm } = useModal();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState<Announcement['type']>('General');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        addAnnouncement({ title, content, type, isPinned: false, visibility: 'public' });
        setTitle('');
        setContent('');
    };

    return (
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            <div className={`md:col-span-1 ${cardClass} h-fit`}>
                <h3 className="font-bold text-ink mb-4">Post Announcement</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={labelClass}>Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="Meeting Cancelled..." required />
                    </div>
                    <div>
                        <label className={labelClass}>Category</label>
                        <select value={type} onChange={e => setType(e.target.value as any)} className={inputClass}>
                            <option>General</option>
                            <option>Meeting</option>
                            <option>Deadline</option>
                            <option>Competition</option>
                            <option>Fundraiser</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Content</label>
                        <textarea value={content} onChange={e => setContent(e.target.value)} className={`${inputClass} min-h-[100px] resize-none`} placeholder="Details..." required />
                    </div>
                    <button type="submit" className={`${buttonClass} w-full bg-electric-500 text-white hover:bg-electric-400 transition-colors`}>
                        <Plus size={16} /> Post Update
                    </button>
                </form>
            </div>
            <div className={`md:col-span-2 ${cardClass}`}>
                <h3 className="font-bold text-ink mb-4">Recent Announcements</h3>
                <div className="space-y-3">
                    {announcements.map(a => (
                        <div key={a.id} className="p-4 bg-space-700/40 rounded-lg border border-space-500/20 flex justify-between items-start group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-space-600/60 text-ink-muted uppercase">{a.type}</span>
                                    <span className="text-xs text-ink-muted">{a.date}</span>
                                </div>
                                <h4 className="font-bold text-ink">{a.title}</h4>
                                <p className="text-sm text-ink-dim mt-1 line-clamp-2">{a.content}</p>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Announcement', 'Delete this announcement?', true, 'Delete')) {
                                    deleteAnnouncement(a.id);
                                }
                            }} className="text-ink-muted hover:text-gold-500 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {announcements.length === 0 && <p className="text-ink-muted text-center italic">No announcements posted.</p>}
                </div>
            </div>
        </div>
    );
};

const GRADE_CHOICES = ['9th Grade', '10th Grade', '11th Grade', '12th Grade', 'Faculty', 'Alumni'];

type OfficerDraft = Omit<Officer, 'id'>;

const blankOfficer = (order: number): OfficerDraft => ({
    name: '', role: '', grade: '12th Grade', category: 'Executive',
    bio: '', email: '', instagram: '', imageUrl: '', order,
});

/** Shared field set for adding and editing a leadership member. */
const OfficerFields: React.FC<{
    draft: OfficerDraft;
    onChange: (patch: Partial<OfficerDraft>) => void;
    onPhotoError: (msg: string) => void;
}> = ({ draft, onChange, onPhotoError }) => (
    <div className="space-y-4">
        <div>
            <label className={labelClass}>Photo</label>
            <ImageUpload
                value={draft.imageUrl || undefined}
                onChange={v => onChange({ imageUrl: v ?? '' })}
                placeholder={<span className="text-2xl font-black">{draft.name.charAt(0) || '?'}</span>}
                onError={onPhotoError}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className={labelClass}>Name</label>
                <input value={draft.name} onChange={e => onChange({ name: e.target.value })} className={inputClass} placeholder="Jane Doe" required />
            </div>
            <div>
                <label className={labelClass}>Role</label>
                <input value={draft.role} onChange={e => onChange({ role: e.target.value })} className={inputClass} placeholder="President" required />
            </div>
            <div>
                <label className={labelClass}>Grade</label>
                <select value={draft.grade} onChange={e => onChange({ grade: e.target.value })} className={inputClass}>
                    {GRADE_CHOICES.map(g => <option key={g}>{g}</option>)}
                </select>
            </div>
            <div>
                <label className={labelClass}>Category</label>
                <select value={draft.category} onChange={e => onChange({ category: e.target.value as Officer['category'] })} className={inputClass}>
                    <option>Executive</option>
                    <option>Committee</option>
                    <option>Advisor</option>
                </select>
            </div>
            <div>
                <label className={labelClass}>Email</label>
                <input value={draft.email ?? ''} onChange={e => onChange({ email: e.target.value })} className={inputClass} placeholder="jane@lehs.tsa" />
            </div>
            <div>
                <label className={labelClass}>Instagram URL</label>
                <input value={draft.instagram ?? ''} onChange={e => onChange({ instagram: e.target.value })} className={inputClass} placeholder="https://instagram.com/..." />
            </div>
            <div>
                <label className={labelClass}>Display Order</label>
                <input
                    type="number"
                    value={draft.order}
                    onChange={e => onChange({ order: parseInt(e.target.value, 10) || 0 })}
                    className={inputClass}
                />
            </div>
        </div>
        <div>
            <label className={labelClass}>Biography</label>
            <textarea value={draft.bio} onChange={e => onChange({ bio: e.target.value })} className={`${inputClass} min-h-[80px]`} placeholder="A short bio..." />
        </div>
    </div>
);

const LeadershipTab: React.FC = () => {
    const { officersList, addOfficer, updateOfficer, deleteOfficer } = useData();
    const { confirm, alert: showAlert } = useModal();
    const [draft, setDraft] = useState<OfficerDraft>(blankOfficer(1));
    const [editing, setEditing] = useState<Officer | null>(null);
    const [editDraft, setEditDraft] = useState<OfficerDraft | null>(null);
    const [saving, setSaving] = useState(false);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft.name.trim() || !draft.role.trim()) return;
        setSaving(true);
        try {
            await addOfficer({ ...draft, order: draft.order || officersList.length + 1 });
            setDraft(blankOfficer(officersList.length + 2));
        } catch {
            await showAlert('Error', 'Could not add that leadership member. Check your connection and try again.');
        } finally {
            setSaving(false);
        }
    };

    const openEdit = (officer: Officer) => {
        const { id: _id, ...rest } = officer;
        setEditing(officer);
        setEditDraft({ instagram: '', imageUrl: '', email: '', ...rest });
    };

    const saveEdit = async () => {
        if (!editing || !editDraft) return;
        setSaving(true);
        try {
            await updateOfficer(editing.id, editDraft);
            setEditing(null);
            setEditDraft(null);
        } catch {
            await showAlert('Error', 'Could not save those changes. Check your connection and try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Add Leadership Member</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <OfficerFields
                        draft={draft}
                        onChange={patch => setDraft(prev => ({ ...prev, ...patch }))}
                        onPhotoError={msg => showAlert('Photo', msg)}
                    />
                    <button type="submit" disabled={saving} className={`${buttonClass} bg-electric-500 text-white w-full disabled:opacity-50`}>
                        <Plus size={16} /> {saving ? 'Saving…' : 'Add Member'}
                    </button>
                </form>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Current Leadership Team</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-space-700/40 text-ink-muted">
                            <tr>
                                <th className="p-3 rounded-tl-lg">Member</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Category</th>
                                <th className="p-3 rounded-tr-lg text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-space-500/20">
                            {officersList.map(o => (
                                <tr key={o.id} className="group hover:bg-space-700/40">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-space-700 flex items-center justify-center text-xs font-bold text-ink-muted shrink-0">
                                                {o.imageUrl
                                                    ? <img src={o.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    : o.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-ink">{o.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-ink-dim">{o.role}</td>
                                    <td className="p-3"><span className="text-[10px] bg-space-600/60 px-2 py-1 rounded uppercase font-bold text-ink-muted">{o.category}</span></td>
                                    <td className="p-3 text-right whitespace-nowrap">
                                        <button onClick={() => openEdit(o)} className="text-ink-muted hover:text-electric-400 transition-colors mr-3" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={async () => {
                                            if (await confirm('Remove Officer', `Remove ${o.name} from the leadership team?`, true, 'Remove')) {
                                                deleteOfficer(o.id);
                                            }
                                        }} className="text-ink-muted hover:text-gold-500 transition-colors" title="Remove"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                            {officersList.length === 0 && (
                                <tr><td colSpan={4} className="p-4 text-center text-ink-muted">No leadership members yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {editing && editDraft && (
                <EditorModal
                    title={`Edit ${editing.name || 'Leadership Member'}`}
                    saving={saving}
                    onCancel={() => { setEditing(null); setEditDraft(null); }}
                    onSave={saveEdit}
                >
                    <OfficerFields
                        draft={editDraft}
                        onChange={patch => setEditDraft(prev => prev ? { ...prev, ...patch } : prev)}
                        onPhotoError={msg => showAlert('Photo', msg)}
                    />
                </EditorModal>
            )}
        </div>
    );
};

const EventsTab: React.FC = () => {
    const { eventsList, addEvent, deleteEvent } = useData();
    const { confirm } = useModal();
    const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '', category: 'Meeting' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEvent({ ...form, status: 'Upcoming' } as any);
        setForm({ title: '', date: '', time: '', location: '', description: '', category: 'Meeting' });
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Create Event</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} placeholder="Event Title" required />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className={inputClass} required />
                        <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className={inputClass} required />
                    </div>
                    <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className={inputClass} placeholder="Location (e.g. Room 204)" required />
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}>
                        <option>Meeting</option><option>Competition</option><option>Social</option><option>Workshop</option>
                    </select>
                    <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} placeholder="Description..." rows={3} />
                    <button type="submit" className={`${buttonClass} bg-electric-500 text-white w-full`}>Create Event</button>
                </form>
            </div>
            <div className={`lg:col-span-2 ${cardClass}`}>
                 <h3 className="font-bold text-ink mb-4">Upcoming Events</h3>
                 <div className="space-y-3">
                    {eventsList.map(e => (
                        <div key={e.id} className="flex justify-between items-center p-3 bg-space-700/40 rounded-lg border border-space-500/20">
                            <div className="flex gap-4 items-center">
                                <div className="text-center bg-space-800 p-2 rounded border border-space-500/30 min-w-[3rem]">
                                    <span className="block text-xs font-bold text-gold-500 uppercase">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-lg font-bold text-ink">{new Date(e.date).getDate()}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-ink">{e.title}</h4>
                                    <p className="text-xs text-ink-muted">{e.time} • {e.location}</p>
                                </div>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Event', 'Delete this event?', true, 'Delete')) {
                                    deleteEvent(e.id);
                                }
                            }} className="text-ink-muted hover:text-gold-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                    {eventsList.length === 0 && <p className="text-ink-muted italic">No events scheduled.</p>}
                 </div>
            </div>
        </div>
    );
};

const ProjectsTab: React.FC = () => {
    const { projectsList, addProject, deleteProject } = useData();
    const { confirm } = useModal();
    const [form, setForm] = useState({ title: '', category: 'Software Development', year: '2026', description: '', award: '' });
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Add Project Showcase</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-3">
                         <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} placeholder="Project Title" />
                         <input value={form.award} onChange={e => setForm({...form, award: e.target.value})} className={inputClass} placeholder="Award (e.g., 1st Place State)" />
                     </div>
                     <div className="space-y-3">
                         <input value={form.year} onChange={e => setForm({...form, year: e.target.value})} className={inputClass} placeholder="Year (e.g. 2026)" />
                         <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={`${inputClass} h-24 resize-none`} placeholder="Detailed Description..." />
                     </div>
                </div>
                <button
                    onClick={() => {
                        if(!form.title) return;
                        addProject(form);
                        setForm({ title: '', category: 'Software Development', year: '2026', description: '', award: '' });
                    }}
                    className={`${buttonClass} bg-electric-500 text-white w-full mt-4`}
                >
                    <Plus size={18} /> Add Project
                </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectsList.map(p => (
                    <div key={p.id} className="bg-space-800 border border-space-500/30 p-4 rounded-xl relative group">
                        <button onClick={async () => {
                            if (await confirm('Delete Project', 'Delete this project?', true, 'Delete')) {
                                deleteProject(p.id);
                            }
                        }} className="absolute top-2 right-2 p-1.5 bg-space-700 rounded-full text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"><Trash2 size={14}/></button>

                        <div className="flex items-start justify-between mb-2 pr-8">
                            <h4 className="font-bold text-ink">{p.title}</h4>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-[10px] bg-space-600/60 px-2 py-0.5 rounded text-ink-muted">{p.category}</span>
                            {p.award && <span className="text-[10px] bg-gold-500/10 text-gold-400 px-2 py-0.5 rounded">{p.award}</span>}
                        </div>

                        {p.imageUrl && (
                            <img src={p.imageUrl} className="w-full h-32 object-cover rounded-lg mb-3 border border-space-500/20" alt={p.title} />
                        )}

                        <div className={`text-sm text-ink-muted overflow-hidden transition-all duration-300 ${expandedId === p.id ? 'max-h-96' : 'max-h-16 line-clamp-2'}`}>
                            {p.description}
                        </div>

                        <button onClick={() => toggleExpand(p.id)} className="text-xs text-electric-400 mt-2 flex items-center gap-1 hover:underline">
                            {expandedId === p.id ? <><ChevronUp size={12}/> Show Less</> : <><ChevronDown size={12}/> Show Details</>}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GalleryTab: React.FC = () => {
    const { galleryList, addGalleryItem, deleteGalleryItem } = useData();
    const { confirm } = useModal();
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    return (
        <div className="space-y-6 animate-fade-in">
             <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Add Photo to Gallery</h3>
                <div className="flex gap-3">
                    <input value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="Caption" />
                    <input value={url} onChange={e => setUrl(e.target.value)} className={inputClass} placeholder="Image URL (Unsplash, etc.)" />
                    <button
                        onClick={() => {
                            if(!url) return;
                            addGalleryItem({ title, imageUrl: url, category: 'Event', date: '2026' });
                            setUrl(''); setTitle('');
                        }}
                        className={`${buttonClass} bg-electric-500 text-white whitespace-nowrap`}
                    >
                        Add Photo
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryList.map(item => (
                    <div key={item.id} className="relative aspect-square group rounded-lg overflow-hidden bg-space-700/40">
                        <img src={item.imageUrl} alt={item.title || 'Gallery Image'} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={async () => {
                                if (await confirm('Delete Image', 'Delete this image?', true, 'Delete')) {
                                    deleteGalleryItem(item.id);
                                }
                            }} className="hover:text-gold-400" style={{ color: 'var(--p-smoke)' }}><Trash2 size={24}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const SHEETS_INTERESTS_WEBHOOK = '';

const InterestsTab: React.FC = () => {
    const { competitionInterests, deleteInterest } = useData();
    const { confirm } = useModal();
    const [search, setSearch] = useState('');
    const [filterEvent, setFilterEvent] = useState('All');
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'done' | 'error'>('idle');
    const [sheetsWebhook, setSheetsWebhook] = useState(SHEETS_INTERESTS_WEBHOOK);
    const [showSheetsConfig, setShowSheetsConfig] = useState(false);

    const uniqueEvents = ['All', ...Array.from(new Set(competitionInterests.map(i => i.competitionName))).sort()];

    const filtered = competitionInterests.filter(i => {
        const matchesSearch = i.userName.toLowerCase().includes(search.toLowerCase()) ||
                              i.competitionName.toLowerCase().includes(search.toLowerCase()) ||
                              i.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
        const matchesEvent = filterEvent === 'All' || i.competitionName === filterEvent;
        return matchesSearch && matchesEvent;
    });

    // Group by competition name
    const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, i) => {
        const key = i.competitionName;
        if (!acc[key]) acc[key] = [];
        acc[key].push(i);
        return acc;
    }, {});

    const exportCSV = () => {
        const rows = [
            ['Member', 'Competition', 'Skills', 'Team Members', 'Notes', 'Date Submitted'],
...filtered.map(i => [
                i.userName,
                i.competitionName,
                i.skills.join('; '),
                (i.teamMembers ?? []).join('; '),
                i.notes,
                new Date(i.timestamp).toLocaleDateString(),
            ])
        ];
        const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `competition_interests_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const syncToSheets = async () => {
        if (!sheetsWebhook) { setShowSheetsConfig(true); return; }
        setSyncStatus('syncing');
        try {
            await fetch(sheetsWebhook, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'interests',
                    timestamp: new Date().toISOString(),
                    interests: competitionInterests.map(i => ({
                        name: i.userName,
                        competition: i.competitionName,
                        skills: i.skills.join(', '),
                        teamMembers: (i.teamMembers ?? []).join(', '),
                        notes: i.notes,
                        submitted: new Date(i.timestamp).toLocaleDateString(),
                    })),
                }),
            });
            setSyncStatus('done');
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch {
            setSyncStatus('error');
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    const handleDelete = async (interest: typeof filtered[0]) => {
        const ok = await confirm('Remove Interest', `Remove ${interest.userName}'s interest in ${interest.competitionName}?`, true, 'Remove');
        if (!ok || !interest.id) return;
        await deleteInterest(interest.id);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-ink">Interest Tracking</h2>
                    <p className="text-ink-muted text-sm">{competitionInterests.length} total submissions across {Object.keys(grouped).length + (filterEvent !== 'All' ? 0 : 0)} competitions.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={exportCSV} className={`${buttonClass} bg-space-800 border border-space-500/30 text-ink-dim hover:bg-space-700/60`}>
                        <Archive size={15} /> Export CSV
                    </button>
                    <button
                        onClick={syncToSheets}
                        className={`${buttonClass} ${syncStatus === 'done' ? 'bg-electric-500 text-white' : syncStatus === 'error' ? 'bg-gold-500 text-white' : 'bg-electric-500 text-white hover:bg-electric-400'}`}
                    >
                        <Activity size={15} />
                        {syncStatus === 'syncing' ? 'Syncing…' : syncStatus === 'done' ? 'Synced!' : syncStatus === 'error' ? 'Error' : 'Sync to Sheets'}
                    </button>
                </div>
            </div>

            {/* Sheets Config */}
            {showSheetsConfig && (
                <div className={`${cardClass} border-electric-500/30`}>
                    <h3 className="font-bold text-ink mb-2 flex items-center gap-2"><Activity size={16} className="text-electric-400" /> Google Sheets Webhook</h3>
                    <p className="text-xs text-ink-muted mb-3">Paste your Apps Script Web App URL below. The script should use the same format as the Attendance tab webhook.</p>
                    <div className="flex gap-2">
                        <input
                            value={sheetsWebhook}
                            onChange={e => setSheetsWebhook(e.target.value)}
                            placeholder="https://script.google.com/macros/s/..."
                            className={inputClass}
                        />
                        <button onClick={() => { setShowSheetsConfig(false); syncToSheets(); }} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 px-6`}>
                            Save &amp; Sync
                        </button>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                    <input placeholder="Search members, skills…" value={search} onChange={e => setSearch(e.target.value)} className={`${inputClass} pl-9`} />
                </div>
                <select value={filterEvent} onChange={e => setFilterEvent(e.target.value)} className={`${inputClass} sm:w-56`}>
                    {uniqueEvents.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
            </div>

            {/* Grouped Tables */}
            {Object.keys(grouped).length === 0 ? (
                <div className="text-center py-10 bg-space-800 border border-dashed border-space-500/30 rounded-xl text-ink-muted">No interests found.</div>
            ) : (
                Object.entries(grouped).map(([compName, entries]) => (
                    <div key={compName} className="bg-space-800 border border-space-500/30 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-5 py-3 bg-space-700/40 border-b border-space-500/30 flex items-center justify-between">
                            <h3 className="font-bold text-ink flex items-center gap-2">
                                {compName}
                            </h3>
                            <span className="text-xs font-bold text-ink-muted bg-space-600/60 px-2 py-0.5 rounded-full">{entries.length} member{entries.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-ink-dim">
                                <thead className="bg-space-700/30 text-xs font-bold text-ink-muted uppercase tracking-wider border-b border-space-500/30">
                                    <tr>
                                        <th className="px-4 py-2.5">Member</th>
                                        <th className="px-4 py-2.5">Skills</th>
                                        <th className="px-4 py-2.5">Team Members</th>
                                        <th className="px-4 py-2.5">Notes</th>
                                        <th className="px-4 py-2.5">Date</th>
                                        <th className="px-4 py-2.5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-space-500/20">
                                    {entries.map((interest, idx) => (
                                        <tr key={idx} className="hover:bg-space-700/40 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{interest.userName}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {interest.skills.map(s => (
                                                        <span key={s} className="px-2 py-0.5 bg-electric-500/10 text-electric-400 rounded text-[11px] font-medium">{s}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-ink-muted">
                                                {(interest.teamMembers ?? []).length > 0
                                                    ? (interest.teamMembers ?? []).join(', ')
                                                    : <span className="italic">None listed</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 italic text-xs max-w-xs truncate">{interest.notes || 'N/A'}</td>
                                            <td className="px-4 py-3 text-xs whitespace-nowrap">{new Date(interest.timestamp).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => handleDelete(interest)} className="p-1.5 rounded-lg text-ink-muted hover:text-gold-500 hover:bg-gold-500/10 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

// ─── COMPETITIONS TAB ────────────────────────────────────────────────────────

const COMP_CATEGORY_META: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    stem:       { label: 'STEM',           color: 'var(--accent)', icon: Cpu       },
    arch:       { label: 'Architecture',   color: 'var(--alert)', icon: Hammer    },
    man:        { label: 'Manufacturing',  color: 'var(--alert)', icon: Layers    },
    trans:      { label: 'Transportation', color: 'var(--accent)', icon: Plane     },
    energy:     { label: 'Energy',         color: 'var(--cta)', icon: Zap       },
    ict:        { label: 'ICT',            color: 'var(--accent)', icon: Cpu       },
    design:     { label: 'Design',         color: 'var(--cta)', icon: PenTool   },
    leadership: { label: 'Leadership',     color: 'var(--accent)', icon: Briefcase },
    teams:      { label: 'TEAMS',          color: 'var(--alert)', icon: Star      },
};

const COMP_CATEGORY_FILTERS = [
    { id: 'all', name: 'All' },
    { id: 'stem', name: 'STEM' },
    { id: 'arch', name: 'Architecture' },
    { id: 'man', name: 'Manufacturing' },
    { id: 'trans', name: 'Transportation' },
    { id: 'energy', name: 'Energy' },
    { id: 'ict', name: 'ICT' },
    { id: 'design', name: 'Design' },
    { id: 'leadership', name: 'Leadership' },
];

type CompItem = { id: string; title: string; subtitle: string; category: string; description: string };

const ALL_COMP_ITEMS: CompItem[] = [
    {
        id: 'teams',
        title: 'TEAMS',
        subtitle: 'Tests of Engineering Aptitude, Mathematics & Science',
        category: 'teams',
        description: 'Teams of 4 to 6 compete across Design/Build, Multiple Choice, Mathematical Modeling, and Essay. 2026-2027 theme: "Engineering a Smarter World".',
    },
...COMPETITIONS.map(c => ({
        id: c.id,
        title: c.title,
        subtitle: '',
        category: c.category,
        description: c.description,
    })),
];

const CompetitionsTab: React.FC = () => {
    const { competitionLinks, updateCompetitionLinks } = useData();
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedId, setSelectedId] = useState<string>('teams');
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editUrl, setEditUrl] = useState('');
    const [addName, setAddName] = useState('');
    const [addUrl, setAddUrl] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    const filtered = ALL_COMP_ITEMS.filter(c => {
        const matchCat = categoryFilter === 'all' || c.category === categoryFilter;
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const selected = ALL_COMP_ITEMS.find(c => c.id === selectedId) ?? ALL_COMP_ITEMS[0];
    const links = competitionLinks[selectedId] ?? [];
    const meta = COMP_CATEGORY_META[selected.category] ?? COMP_CATEGORY_META['stem'];

    const persist = (updated: Array<{ url: string; name: string }>) => {
        updateCompetitionLinks(selectedId, updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addLink = () => {
        if (!addUrl.trim()) return;
        persist([...links, { url: addUrl.trim(), name: addName.trim() || addUrl.trim() }]);
        setAddName(''); setAddUrl(''); setShowAdd(false);
    };

    const handleUpload = async (file: File) => {
        const compId = selectedId;
        setUploading(true);
        try {
            const url = await uploadFile(file, 'competition', { compId });
            const name = file.name.replace(/\.[^.]+$/, '') || file.name;
            updateCompetitionLinks(compId, [...(competitionLinks[compId] ?? []), { url, name }]);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            showToast(`${file.name} uploaded`, 'success');
        } catch (e) {
            showToast(e instanceof Error ? e.message : 'Upload failed.', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const openLink = (url: string) => {
        openUploadedFile(url).catch(e => showToast(e instanceof Error ? e.message : 'Could not open that file.', 'error'));
    };

    const removeLink = (i: number) => {
        const url = links[i].url;
        persist(links.filter((_, idx) => idx !== i));
        if (isUploadedFile(url)) {
            deleteUploadedFile(url).catch(e => console.error('Error deleting competition file:', e));
        }
    };

    const startEdit = (i: number) => {
        setEditingIdx(i);
        setEditName(links[i].name);
        setEditUrl(links[i].url);
    };

    const saveEdit = () => {
        if (editingIdx === null || !editUrl.trim()) return;
        const updated = links.map((l, i) =>
            i === editingIdx ? { url: editUrl.trim(), name: editName.trim() || l.name } : l
        );
        persist(updated);
        setEditingIdx(null);
    };

    const selectComp = (id: string) => {
        setSelectedId(id);
        setShowAdd(false);
        setEditingIdx(null);
        setAddName(''); setAddUrl('');
    };

    const totalLinks = Object.values(competitionLinks).reduce((acc, ls) => acc + ls.length, 0);
    const configuredCount = Object.keys(competitionLinks).filter(k => (competitionLinks[k]?.length ?? 0) > 0).length;

    return (
        <div className="animate-fade-in flex flex-col gap-5" style={{ height: 'calc(100vh - 10rem)' }}>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-ink">Competition Resources</h2>
                    <p className="text-sm text-ink-muted mt-0.5">
                        Attach rulebooks, study guides, and links to each competition. Members see these on the Competitions page.
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <div className="text-center px-4 py-2 bg-space-800 border border-space-500/30 rounded-xl shadow-sm">
                        <p className="text-lg font-bold text-ink">{totalLinks}</p>
                        <p className="text-[11px] text-ink-muted">total links</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-space-800 border border-space-500/30 rounded-xl shadow-sm">
                        <p className="text-lg font-bold text-ink">{configuredCount}</p>
                        <p className="text-[11px] text-ink-muted">configured</p>
                    </div>
                </div>
            </div>

            {/* Two-panel layout */}
            <div className="flex gap-4 flex-1 min-h-0">

                {/* ── Left panel: competition list ── */}
                <div className="w-72 shrink-0 flex flex-col bg-space-800 border border-space-500/30 rounded-xl overflow-hidden shadow-sm">
                    {/* Search */}
                    <div className="p-3 border-b border-space-500/30 shrink-0">
                        <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search competitions..."
                                className="w-full pl-7 pr-7 py-2 bg-space-900 border border-space-500/50 rounded-lg text-xs text-ink placeholder-ink-muted focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category filter pills */}
                    <div className="flex gap-1 flex-wrap px-3 py-2 border-b border-space-500/30 shrink-0">
                        {COMP_CATEGORY_FILTERS.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoryFilter(cat.id)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                                    categoryFilter === cat.id
                                        ? 'bg-electric-500 text-white'
                                        : 'bg-space-700/60 text-ink-muted hover:bg-space-600/60'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-space-500/20">
                        {filtered.length === 0 && (
                            <p className="text-xs text-ink-muted italic text-center py-10">No results</p>
                        )}
                        {filtered.map(comp => {
                            const compLinks = competitionLinks[comp.id] ?? [];
                            const compMeta = COMP_CATEGORY_META[comp.category];
                            const isActive = selectedId === comp.id;
                            return (
                                <button
                                    key={comp.id}
                                    onClick={() => selectComp(comp.id)}
                                    className={`w-full text-left px-3 py-2.5 transition-colors flex items-center gap-2.5 border-l-2 ${
                                        isActive
                                            ? 'bg-electric-500/10 border-electric-500'
                                            : 'border-transparent hover:bg-space-700/40'
                                    }`}
                                >
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: tint(compMeta?.color, 13) }}
                                    >
                                        {compMeta && <compMeta.icon size={13} style={{ color: compMeta.color }} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-semibold truncate ${isActive ? 'text-electric-400' : 'text-ink'}`}>
                                            {comp.title}
                                        </p>
                                        {comp.subtitle && (
                                            <p className="text-[10px] text-ink-muted truncate">{comp.subtitle}</p>
                                        )}
                                    </div>
                                    {compLinks.length > 0 && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 shrink-0">
                                            {compLinks.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Right panel: detail + link editor ── */}
                <div className="flex-1 min-w-0 flex flex-col bg-space-800 border border-space-500/30 rounded-xl overflow-hidden shadow-sm">
                    {/* Competition header */}
                    <div
                        className="px-6 py-4 border-b border-space-500/30 shrink-0"
                        style={{ borderTop: `3px solid ${meta.color}` }}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: tint(meta.color, 13) }}
                            >
                                <meta.icon size={20} style={{ color: meta.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-ink leading-tight">{selected.title}</h3>
                                    <span
                                        className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                                        style={{ background: tint(meta.color, 13), color: meta.color }}
                                    >
                                        {meta.label}
                                    </span>
                                    {saved && (
                                        <span className="flex items-center gap-1 text-[11px] font-semibold text-electric-400 shrink-0">
                                            <CheckCircle size={11} /> Saved
                                        </span>
                                    )}
                                </div>
                                {selected.subtitle && (
                                    <p className="text-xs text-ink-muted mt-0.5">{selected.subtitle}</p>
                                )}
                                {selected.description && (
                                    <p className="text-xs text-ink-muted mt-1 line-clamp-2">{selected.description}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Links section */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-ink">
                                Resource Links
                                {links.length > 0 && (
                                    <span className="ml-2 text-ink-muted font-normal text-xs">({links.length})</span>
                                )}
                            </h4>
                            <div className="flex items-center gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    title={`Upload a document (max ${MAX_FILE_BYTES / 1024 / 1024} MB)`}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-ink bg-space-700/60 hover:bg-space-600/60 border border-space-500/40 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                                    {uploading ? 'Uploading...' : 'Upload File'}
                                </button>
                                {!showAdd && (
                                    <button
                                        onClick={() => { setShowAdd(true); setEditingIdx(null); }}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-white bg-electric-500 hover:bg-electric-400 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Plus size={13} /> Add Link
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Empty state */}
                        {links.length === 0 && !showAdd && (
                            <div className="text-center py-10">
                                <div className="w-14 h-14 bg-space-700/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <LinkIcon size={24} className="text-ink-muted" />
                                </div>
                                <p className="text-sm font-semibold text-ink-muted">No resources yet</p>
                                <p className="text-xs text-ink-muted mt-1 max-w-xs mx-auto">
                                    Upload a rulebook or study guide, or add any helpful link for members.
                                </p>
                                <button
                                    onClick={() => setShowAdd(true)}
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-electric-500 hover:bg-electric-400 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                                >
                                    <Plus size={15} /> Add First Link
                                </button>
                            </div>
                        )}

                        {/* Link cards */}
                        <div className="space-y-2">
                            {links.map((link, i) => (
                                <div
                                    key={i}
                                    className="group border border-space-500/30 rounded-xl overflow-hidden"
                                >
                                    {editingIdx === i ? (
                                        /* Inline edit form */
                                        <div className="p-4 bg-electric-500/5 space-y-2.5">
                                            <p className="text-[10px] font-bold text-electric-400 uppercase tracking-wider">Editing Link</p>
                                            <input
                                                autoFocus
                                                value={editName}
                                                onChange={e => setEditName(e.target.value)}
                                                placeholder='Label  (e.g. "2026-2027 Rulebook")'
                                                className={inputClass}
                                            />
                                            {!isUploadedFile(editUrl) && (
                                                <input
                                                    value={editUrl}
                                                    onChange={e => setEditUrl(e.target.value)}
                                                    placeholder="https://..."
                                                    className={`${inputClass} font-mono`}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') saveEdit();
                                                        if (e.key === 'Escape') setEditingIdx(null);
                                                    }}
                                                />
                                            )}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={saveEdit}
                                                    disabled={!editUrl.trim()}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-electric-500 text-white rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-electric-400 transition-colors"
                                                >
                                                    <Save size={12} /> Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setEditingIdx(null)}
                                                    className="px-4 py-2 text-ink-muted hover:text-ink text-xs font-semibold"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Read-only row */
                                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-space-700/40 transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-electric-500/10 flex items-center justify-center shrink-0">
                                                {isUploadedFile(link.url)
                                                    ? <FileText size={14} className="text-electric-400" />
                                                    : <LinkIcon size={14} className="text-electric-400" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-ink truncate">{link.name}</p>
                                                <p className="text-xs text-ink-muted truncate font-mono">
                                                    {isUploadedFile(link.url) ? 'Uploaded file' : link.url}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                {isUploadedFile(link.url) ? (
                                                    <button
                                                        onClick={() => openLink(link.url)}
                                                        className="p-1.5 text-ink-muted hover:text-electric-400 hover:bg-electric-500/10 rounded-lg transition-colors"
                                                        title="Open file"
                                                    >
                                                        <ExternalLink size={13} />
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 text-ink-muted hover:text-electric-400 hover:bg-electric-500/10 rounded-lg transition-colors"
                                                        title="Open link"
                                                    >
                                                        <ExternalLink size={13} />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => startEdit(i)}
                                                    className="p-1.5 text-ink-muted hover:text-ink hover:bg-space-600/60 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => removeLink(i)}
                                                    className="p-1.5 text-ink-muted hover:text-gold-500 hover:bg-gold-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add form */}
                        {showAdd && (
                            <div className="mt-4 border border-electric-500/30 rounded-xl p-4 bg-electric-500/5 space-y-3">
                                <p className="text-[10px] font-bold text-electric-400 uppercase tracking-wider">New Link</p>
                                <input
                                    autoFocus
                                    value={addName}
                                    onChange={e => setAddName(e.target.value)}
                                    placeholder='Label  (e.g. "2026-2027 Rulebook")'
                                    className={inputClass}
                                />
                                <input
                                    value={addUrl}
                                    onChange={e => setAddUrl(e.target.value)}
                                    placeholder="https://..."
                                    className={`${inputClass} font-mono`}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') addLink();
                                        if (e.key === 'Escape') { setShowAdd(false); setAddName(''); setAddUrl(''); }
                                    }}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={addLink}
                                        disabled={!addUrl.trim()}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-electric-500 text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-electric-400 transition-colors"
                                    >
                                        <Plus size={14} /> Add Link
                                    </button>
                                    <button
                                        onClick={() => { setShowAdd(false); setAddName(''); setAddUrl(''); }}
                                        className="px-4 py-2 text-ink-muted hover:text-ink text-sm font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── ATTENDANCE TAB ──────────────────────────────────────────────────────────

const AttendanceTab: React.FC = () => {
    const { meetings, addMeeting, deleteMeeting, members, siteSettings, updateSiteSettings } = useData();
    const { confirm } = useModal();
    const { showToast } = useToast();
    const [form, setForm] = useState<{ title: string; date: string; time: string; location: string; pin: string; type: 'General' | 'Officer' | 'Competition' | 'Workshop' }>({ title: '', date: '', time: '', location: '', pin: '', type: 'General' });
    const [saving, setSaving] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [webhookUrl, setWebhookUrl] = useState((siteSettings as any).sheetsWebhookUrl ?? '');
    const [webhookSaving, setWebhookSaving] = useState(false);
    const [webhookSaved, setWebhookSaved] = useState(false);
    const [syncingId, setSyncingId] = useState<string | null>(null);
    const [syncMsg, setSyncMsg] = useState<{ id: string; ok: boolean; text: string } | null>(null);

    const generatePin = () => setForm(f => ({ ...f, pin: String(Math.floor(1000 + Math.random() * 9000)) }));

    const handleAdd = async () => {
        if (!form.title.trim() || !form.date || !form.pin.trim()) return;
        setSaving(true);
        try {
            await addMeeting({ title: form.title.trim(), date: form.date, time: form.time, location: form.location.trim(), pin: form.pin.trim(), type: form.type, description: '' });
            setForm({ title: '', date: '', time: '', location: '', pin: '', type: 'General' });
            showToast('Meeting created!', 'success');
        } catch (e: any) {
            console.error('Create meeting error:', e);
            showToast(e?.message ?? 'Failed to create meeting. Check Firestore permissions.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        const ok = await confirm('Delete Meeting', 'Remove this meeting and all attendance records?');
        if (ok) await deleteMeeting(id);
    };

    const memberMap = Object.fromEntries(members.map(m => [m.id, m]));

    // ── CSV export ──────────────────────────────────────────────────────────
    const exportCsv = (meeting: typeof meetings[0]) => {
        const attendees = meeting.attendees.map(uid => ({ uid, member: memberMap[uid] }));
        const rows = [
            ['Meeting', 'Date', 'Time', 'Location', 'Name', 'Email', 'Grade', 'Member ID'],
...attendees.map(({ uid, member: m }) => [
                meeting.title,
                meeting.date,
                meeting.time ?? '',
                meeting.location ?? '',
                m?.name ?? uid,
                m?.email ?? '',
                m?.grade ?? '',
                m?.memberId ?? '',
            ]),
        ];
        if (attendees.length === 0) rows.push([meeting.title, meeting.date, meeting.time ?? '', meeting.location ?? '', '(no attendees)', '', '', '']);
        const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-${meeting.title.replace(/\s+/g, '-')}-${meeting.date}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportAllCsv = () => {
        const rows = [['Meeting', 'Date', 'Time', 'Location', 'Type', 'Name', 'Email', 'Grade', 'Member ID']];
        for (const m of meetings) {
            if (m.attendees.length === 0) {
                rows.push([m.title, m.date, m.time ?? '', m.location ?? '', m.type, '(no attendees)', '', '', '']);
            } else {
                for (const uid of m.attendees) {
                    const mem = memberMap[uid];
                    rows.push([m.title, m.date, m.time ?? '', m.location ?? '', m.type, mem?.name ?? uid, mem?.email ?? '', mem?.grade ?? '', mem?.memberId ?? '']);
                }
            }
        }
        const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-all-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ── Google Sheets sync via Apps Script webhook ───────────────────────────
    const saveWebhook = async () => {
        setWebhookSaving(true);
        await updateSiteSettings({ ...siteSettings, sheetsWebhookUrl: webhookUrl.trim() } as any);
        setWebhookSaving(false);
        setWebhookSaved(true);
        setTimeout(() => setWebhookSaved(false), 2500);
    };

    const syncToSheets = async (meeting: typeof meetings[0]) => {
        const url = ((siteSettings as any).sheetsWebhookUrl ?? '').trim();
        if (!url) return;
        setSyncingId(meeting.id);
        setSyncMsg(null);
        try {
            const attendees = meeting.attendees.map(id => {
                const m = memberMap[id];
                return { name: m?.name ?? id, email: m?.email ?? '', grade: m?.grade ?? '', memberId: m?.memberId ?? '' };
            });
            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ meeting: meeting.title, date: meeting.date, time: meeting.time, location: meeting.location, type: meeting.type, attendees }),
            });
            setSyncMsg({ id: meeting.id, ok: true, text: 'Synced, check your Sheet.' });
        } catch {
            setSyncMsg({ id: meeting.id, ok: false, text: 'Sync failed. Check the webhook URL.' });
        } finally {
            setSyncingId(null);
        }
    };

    const hasWebhook = !!((siteSettings as any).sheetsWebhookUrl ?? '').trim();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="text-2xl font-bold text-ink">Attendance Tracker</h2>
                    <p className="text-sm text-ink-muted mt-1">
                        Members check in at <a href="/#/check-in" target="_blank" className="font-mono text-electric-400 hover:underline">/check-in</a> using the meeting PIN.
                    </p>
                </div>
                {meetings.length > 0 && (
                    <button onClick={exportAllCsv} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400`}>
                        <FileText size={14} /> Export All CSV
                    </button>
                )}
            </div>

            {/* Google Sheets webhook */}
            <div className={cardClass}>
                <div className="flex items-center gap-2 mb-1">
                    <ExternalLink size={14} className="text-electric-400" />
                    <h3 className="font-bold text-ink text-sm">Google Sheets Sync</h3>
                    {hasWebhook && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">Connected</span>}
                </div>
                <p className="text-xs text-ink-muted mb-3">
                    Paste a <strong>Google Apps Script</strong> Web App URL to push attendance directly to a Google Sheet with one click.{' '}
                    <span className="text-electric-400 cursor-pointer hover:underline" onClick={() => window.open('https://developers.google.com/apps-script/guides/web', '_blank')}>
                        How to set this up
                    </span>
                </p>
                <div className="bg-space-900 border border-space-500/30 rounded-xl p-3 mb-3 font-mono text-xs text-ink-muted overflow-x-auto whitespace-pre">
{`// Paste this into Google Apps Script - New Project
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
.getSheetByName('Attendance') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('Attendance');
  if (sheet.getLastRow() === 0)
    sheet.appendRow(['Meeting','Date','Time','Location','Type','Name','Email','Grade','Member ID']);
  data.attendees.forEach(a => sheet.appendRow([
    data.meeting, data.date, data.time, data.location, data.type,
    a.name, a.email, a.grade, a.memberId
  ]));
  return ContentService.createTextOutput('OK');
}`}
                </div>
                <div className="flex gap-2">
                    <input
                        value={webhookUrl}
                        onChange={e => setWebhookUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className={`${inputClass} flex-1 font-mono text-xs`}
                    />
                    <button
                        onClick={saveWebhook}
                        disabled={webhookSaving}
                        className={`${buttonClass} shrink-0 ${webhookSaved ? 'bg-electric-500 text-white' : 'bg-electric-500 text-white hover:bg-electric-400'} disabled:opacity-40`}
                    >
                        <Save size={13} /> {webhookSaved ? 'Saved!' : webhookSaving ? 'Saving…' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Create meeting form */}
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4 text-sm">Create Meeting</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className={labelClass}>Title</label>
                        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. General Meeting" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Type</label>
                        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as typeof form.type }))} className={inputClass}>
                            {['General', 'Officer', 'Competition', 'Workshop'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Date</label>
                        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Time</label>
                        <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Location</label>
                        <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Room 204" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Check-in PIN</label>
                        <div className="flex gap-2">
                            <input value={form.pin} onChange={e => setForm(f => ({ ...f, pin: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="4 to 6 digits" className={`${inputClass} font-mono tracking-widest`} maxLength={6} />
                            <button onClick={generatePin} className="px-3 py-2 rounded-lg bg-space-700/60 text-ink-dim text-xs font-bold hover:bg-space-600/60 transition-colors shrink-0">Generate</button>
                        </div>
                    </div>
                </div>
                <button onClick={handleAdd} disabled={saving || !form.title.trim() || !form.date || !form.pin.trim()} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-40`}>
                    <Plus size={15} /> {saving ? 'Creating…' : 'Create Meeting'}
                </button>
            </div>

            {/* Meeting list */}
            {meetings.length === 0 ? (
                <div className="text-center py-10 text-ink-muted text-sm">No meetings yet. Create one above.</div>
            ) : (
                <div className="space-y-3">
                    {meetings.map(m => {
                        const isOpen = expandedId === m.id;
                        const attendeeMems = m.attendees.map(id => memberMap[id]);
                        return (
                            <div key={m.id} className={cardClass + ' p-0 overflow-hidden'}>
                                <button onClick={() => setExpandedId(isOpen ? null : m.id)}
                                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-space-700/40 transition-colors text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center min-w-[48px]">
                                            <p className="text-xl font-black text-electric-400 leading-none">{m.attendees.length}</p>
                                            <p className="text-[10px] text-ink-muted">present</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink text-sm">{m.title}</p>
                                            <p className="text-xs text-ink-muted">{m.date}{m.time ? `, ${m.time}` : ''}{m.location ? `, ${m.location}` : ''}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="font-mono text-sm font-bold text-electric-400 bg-electric-500/10 px-3 py-1 rounded-lg tracking-widest hidden sm:block">
                                            PIN: {m.pin}
                                        </span>
                                        <button
                                            onClick={e => { e.stopPropagation(); exportCsv(m); }}
                                            className="p-1.5 text-electric-400 hover:bg-electric-500/10 rounded-lg transition-colors"
                                            title="Export CSV"
                                        >
                                            <FileText size={14} />
                                        </button>
                                        {hasWebhook && (
                                            <button
                                                onClick={e => { e.stopPropagation(); syncToSheets(m); }}
                                                disabled={syncingId === m.id}
                                                className="p-1.5 text-electric-400 hover:bg-electric-500/10 rounded-lg transition-colors disabled:opacity-40"
                                                title="Sync to Google Sheets"
                                            >
                                                <ExternalLink size={14} />
                                            </button>
                                        )}
                                        <button onClick={e => { e.stopPropagation(); handleDelete(m.id); }} className="p-1.5 text-gold-500 hover:bg-gold-500/10 rounded-lg transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                        {isOpen ? <ChevronUp size={15} className="text-ink-muted" /> : <ChevronDown size={15} className="text-ink-muted" />}
                                    </div>
                                </button>
                                {syncMsg?.id === m.id && (
                                    <div className={`mx-5 mb-2 text-xs font-medium px-3 py-2 rounded-lg ${syncMsg.ok ? 'bg-electric-500/10 text-electric-400' : 'bg-gold-500/10 text-gold-500'}`}>
                                        {syncMsg.text}
                                    </div>
                                )}
                                {isOpen && (
                                    <div className="px-5 pb-5 border-t border-space-500/30 pt-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold text-ink-muted uppercase tracking-wider">Attendees ({m.attendees.length})</p>
                                            <span className="font-mono text-xs font-bold text-electric-400 bg-electric-500/10 px-2.5 py-1 rounded-lg sm:hidden">PIN: {m.pin}</span>
                                        </div>
                                        {attendeeMems.length === 0 ? (
                                            <p className="text-xs text-ink-muted italic">No check-ins yet.</p>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-xs">
                                                    <thead>
                                                        <tr className="text-left text-ink-muted border-b border-space-500/30">
                                                            <th className="pb-2 font-semibold pr-4">Name</th>
                                                            <th className="pb-2 font-semibold pr-4 hidden sm:table-cell">Email</th>
                                                            <th className="pb-2 font-semibold pr-4 hidden sm:table-cell">Grade</th>
                                                            <th className="pb-2 font-semibold">Member ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-space-500/20">
                                                        {attendeeMems.map((mem, i) => (
                                                            <tr key={i} className="text-ink-dim">
                                                                <td className="py-1.5 pr-4 font-medium">{mem?.name ?? m.attendees[i]}</td>
                                                                <td className="py-1.5 pr-4 text-ink-muted hidden sm:table-cell">{mem?.email ?? 'N/A'}</td>
                                                                <td className="py-1.5 pr-4 text-ink-muted hidden sm:table-cell">{mem?.grade ?? 'N/A'}</td>
                                                                <td className="py-1.5 font-mono text-ink-muted">{mem?.memberId ?? 'N/A'}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// ─── RESULTS TAB ─────────────────────────────────────────────────────────────

const PLACEMENT_OPTIONS = ['1st Place', '2nd Place', '3rd Place', 'State Qualifier', 'Nationals Qualifier', 'Semifinalist', 'Finalist', 'Participant'];
const LEVEL_OPTIONS: Array<'Regional' | 'State' | 'National'> = ['Regional', 'State', 'National'];

const levelColors: Record<string, string> = {
    Regional: 'bg-electric-50 text-electric-500 border-electric-200',
    State:    'bg-electric-100 text-electric-600 border-electric-200',
    National: 'bg-gold-100 text-gold-600 border-gold-200',
};
const placementColors: Record<string, string> = {
    '1st Place': 'text-gold-500',
    '2nd Place': 'text-ink-muted',
    '3rd Place': 'text-gold-600',
};

const ResultsTab: React.FC = () => {
    const { competitionResults, addCompetitionResult, deleteCompetitionResult } = useData();
    const { confirm } = useModal();
    const currentYear = new Date().getFullYear().toString();
    const [form, setForm] = useState({
        competition: '', placement: '1st Place', level: 'Regional' as 'Regional' | 'State' | 'National',
        year: currentYear, members: '', notes: ''
    });
    const [yearFilter, setYearFilter] = useState('All');

    const years = ['All', ...Array.from(new Set(competitionResults.map(r => r.year))).sort((a, b) => b.localeCompare(a))];
    const filtered = yearFilter === 'All' ? competitionResults : competitionResults.filter(r => r.year === yearFilter);

    const handleAdd = async () => {
        if (!form.competition.trim()) return;
        await addCompetitionResult({
            competition: form.competition.trim(),
            placement: form.placement,
            level: form.level,
            year: form.year,
            members: form.members.split(',').map(s => s.trim()).filter(Boolean),
            notes: form.notes.trim(),
        });
        setForm({ competition: '', placement: '1st Place', level: 'Regional', year: currentYear, members: '', notes: '' });
    };

    const handleDelete = async (id: string) => {
        const ok = await confirm('Delete Result', 'Remove this competition result?');
        if (ok) await deleteCompetitionResult(id);
    };

    // Group by level for display
    const nationals = filtered.filter(r => r.level === 'National');
    const state     = filtered.filter(r => r.level === 'State');
    const regional  = filtered.filter(r => r.level === 'Regional');

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-ink">Competition Results</h2>
                <p className="text-sm text-ink-muted mt-1">Track placements at regionals, state, and nationals, displayed on the public site.</p>
            </div>

            {/* Add form */}
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4 text-sm">Add Result</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className={labelClass}>Competition</label>
                        <input value={form.competition} onChange={e => setForm(f => ({ ...f, competition: e.target.value }))} placeholder="e.g. Webmaster" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Placement</label>
                        <select value={form.placement} onChange={e => setForm(f => ({ ...f, placement: e.target.value }))} className={inputClass}>
                            {PLACEMENT_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Level</label>
                        <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value as typeof form.level }))} className={inputClass}>
                            {LEVEL_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Year</label>
                        <input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2026" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Members (comma separated)</label>
                        <input value={form.members} onChange={e => setForm(f => ({ ...f, members: e.target.value }))} placeholder="Alex Rivera, Jordan Lee" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Notes (optional)</label>
                        <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any extra context…" className={inputClass} />
                    </div>
                </div>
                <button onClick={handleAdd} disabled={!form.competition.trim()} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-40`}>
                    <Plus size={15} /> Add Result
                </button>
            </div>

            {/* Year filter */}
            {years.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {years.map(y => (
                        <button key={y} onClick={() => setYearFilter(y)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${yearFilter === y ? 'bg-electric-500 text-white' : 'bg-space-800 border border-space-500/30 text-ink-dim hover:border-electric-500/50'}`}>
                            {y}
                        </button>
                    ))}
                </div>
            )}

            {/* Results grouped by level */}
            {filtered.length === 0 ? (
                <div className="text-center py-10 text-ink-muted text-sm">No results recorded yet.</div>
            ) : (
                <div className="space-y-6">
                    {([['National', nationals], ['State', state], ['Regional', regional]] as [string, typeof filtered][]).map(([level, items]) =>
                        items.length === 0 ? null : (
                            <div key={level}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${levelColors[level]}`}>{level}</span>
                                    <span className="text-xs text-ink-muted">{items.length} result{items.length !== 1 ? 's' : ''}</span>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {items.map(r => (
                                        <div key={r.id} className={`${cardClass} relative group`}>
                                            <button onClick={() => handleDelete(r.id)} className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 text-gold-500 hover:bg-gold-500/10 rounded-lg transition-all">
                                                <Trash2 size={13} />
                                            </button>
                                            <div className="flex items-start gap-3 mb-3">
                                                <div>
                                                    <p className={`text-sm font-black ${placementColors[r.placement] ?? 'text-ink'}`}>{r.placement}</p>
                                                    <p className="text-xs text-ink-muted">{r.year}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-ink text-sm mb-2">{r.competition}</p>
                                            {r.members.length > 0 && (
                                                <p className="text-xs text-ink-muted">{r.members.join(', ')}</p>
                                            )}
                                            {r.notes && <p className="text-xs text-ink-muted mt-1 italic">{r.notes}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

const ResourcesTab: React.FC = () => {
    const { resources, addResource, deleteResource } = useData();
    const { confirm } = useModal();
    const { showToast } = useToast();
    const [form, setForm] = useState({ title: '', url: '', category: 'general', description: '', type: 'Link' });
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const pickFile = (f: File | undefined) => {
        if (!f) return;
        if (f.size > MAX_FILE_BYTES) {
            showToast(`That file is over ${MAX_FILE_BYTES / 1024 / 1024} MB. Try a smaller one or add it as a link.`, 'error');
            return;
        }
        const ext = f.name.includes('.') ? f.name.split('.').pop()!.toUpperCase() : 'File';
        setFile(f);
        setForm(prev => ({
            ...prev,
            url: '',
            title: prev.title || f.name.replace(/\.[^.]+$/, ''),
            type: prev.type === 'Link' ? ext : prev.type,
        }));
    };

    const clearFile = () => {
        setFile(null);
        setForm(prev => ({ ...prev, type: 'Link' }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const add = async () => {
        if (!form.title || (!form.url && !file)) return;
        const accessLevel = form.category === 'officer' ? 'officer' : 'member';
        let url = form.url;
        if (file) {
            setUploading(true);
            try {
                url = await uploadFile(file, 'resource', { accessLevel });
            } catch (e) {
                showToast(e instanceof Error ? e.message : 'Upload failed.', 'error');
                setUploading(false);
                return;
            }
            setUploading(false);
        }
        addResource({ ...form, url, accessLevel });
        setForm({ ...form, title: '', url: '', description: '', type: 'Link' });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        showToast('Resource added', 'success');
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
             <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Add General Resource</h3>
                <div className="space-y-3">
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} placeholder="Title (e.g. Medical Form)" />
                    {file ? (
                        <div className="flex items-center gap-2 p-2.5 bg-space-900 border border-electric-500/40 rounded-lg text-sm">
                            <FileText size={14} className="text-electric-400 shrink-0" />
                            <span className="flex-1 min-w-0 truncate text-ink">{file.name}</span>
                            <button onClick={clearFile} className="text-ink-muted hover:text-ink" title="Remove file"><X size={14} /></button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} className={inputClass} placeholder="URL" />
                            <input ref={fileInputRef} type="file" className="hidden" onChange={e => pickFile(e.target.files?.[0])} />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                title={`Upload a document instead (max ${MAX_FILE_BYTES / 1024 / 1024} MB)`}
                                className={`${buttonClass} bg-space-700/60 text-ink border border-space-500/40 hover:bg-space-600/60 shrink-0`}
                            >
                                <Upload size={14} /> File
                            </button>
                        </div>
                    )}
                    <input value={form.type} onChange={e => setForm({...form, type: e.target.value})} className={inputClass} placeholder="Type (e.g. General comp resource, PDF, Guide)" />
                    <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} placeholder="Description (optional)" />
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}>
                        <option value="general">General Resources</option>
                        <option value="competition">Competition Resources</option>
                        <option value="webmaster">Webmaster & Technical</option>
                        <option value="design">Design & Presentation</option>
                        <option value="study">Study & Career</option>
                        <option value="officer">Officer Tools (Restricted)</option>
                    </select>
                    <button
                        onClick={add}
                        disabled={uploading}
                        className={`${buttonClass} bg-electric-500 text-white w-full disabled:opacity-50`}
                    >
                        {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : 'Add Resource'}
                    </button>
                </div>
            </div>
            <div className={`lg:col-span-2 ${cardClass}`}>
                <h3 className="font-bold text-ink mb-4">Resource Library</h3>
                <div className="space-y-2">
                    {resources.map(r => (
                        <div key={r.id} className="flex justify-between items-center p-3 bg-space-700/40 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-electric-400" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-ink text-sm">{r.title}</p>
                                        <span className="text-[10px] bg-space-600/60 text-ink-muted px-1.5 py-0.5 rounded uppercase">{r.type}</span>
                                    </div>
                                    <a {...linkProps(r.url, msg => showToast(msg, 'error'))} className="text-xs text-electric-400 hover:underline">
                                        {isUploadedFile(r.url) ? 'Uploaded file' : r.url}
                                    </a>
                                </div>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Resource', 'Delete this resource?', true, 'Delete')) {
                                    deleteResource(r.id);
                                    if (isUploadedFile(r.url)) {
                                        deleteUploadedFile(r.url).catch(e => console.error('Error deleting resource file:', e));
                                    }
                                }
                            }} className="text-ink-muted hover:text-gold-500"><Trash2 size={16}/></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/** ISO string → the local "YYYY-MM-DDTHH:mm" a datetime-local input expects. */
const toLocalDateTimeInput = (iso: string): string => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const SettingsTab: React.FC = () => {
    const { siteSettings, updateSiteSettings, nextEvent } = useData();
    const [remind, setRemind] = useState(siteSettings.remindLink);
    const [jotform, setJotform] = useState(siteSettings.jotformLink);
    const [district, setDistrict] = useState(siteSettings.districtAppLink);
    const [successFund, setSuccessFund] = useState(siteSettings.successFundLink);
    const [instagram, setInstagram] = useState(siteSettings.instagramLink || '');
    const [twitter, setTwitter] = useState(siteSettings.twitterLink || '');
    const [eventTitle, setEventTitle] = useState(siteSettings.nextEventTitle || '');
    const [eventDate, setEventDate] = useState(siteSettings.nextEventDate || '');

    const handleSave = () => {
        updateSiteSettings({
            remindLink: remind,
            jotformLink: jotform,
            districtAppLink: district,
            successFundLink: successFund,
            instagramLink: instagram,
            twitterLink: twitter,
            nextEventTitle: eventTitle,
            nextEventDate: eventDate
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-12">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                    <Calendar size={18} /> Next Major Event
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Event Title</label>
                        <input value={eventTitle} onChange={e => setEventTitle(e.target.value)} className={inputClass} placeholder="State Competition" />
                    </div>
                    <div>
                        <label className={labelClass}>Date & Time</label>
                        <input
                            type="datetime-local"
                            value={toLocalDateTimeInput(eventDate)}
                            onChange={e => setEventDate(e.target.value ? new Date(e.target.value).toISOString() : '')}
                            className={inputClass}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                    <button
                        type="button"
                        onClick={() => { setEventTitle(''); setEventDate(''); }}
                        className="text-xs font-bold text-electric-400 hover:text-electric-300 transition-colors"
                    >
                        Clear override
                    </button>
                    <p className="text-xs text-ink-muted">
                        Optional. Leave blank (or let the date pass) and the countdown automatically uses the
                        next event on the calendar.
                    </p>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-space-700/40 border border-space-500/30 text-xs">
                    {nextEvent ? (
                        <>
                            <span className="text-ink-muted uppercase tracking-wider font-bold text-[10px]">Currently showing</span>
                            <p className="text-ink font-bold mt-1">{nextEvent.title}</p>
                            <p className="text-ink-muted mt-0.5">
                                {new Date(nextEvent.date).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
                                {' · '}
                                {nextEvent.source === 'manual' ? 'from this override' : 'from the events calendar'}
                            </p>
                        </>
                    ) : (
                        <p className="text-ink-muted">No upcoming event, the countdown is hidden. Add an event or set an override above.</p>
                    )}
                </div>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                    <Settings size={18} /> General Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Remind Join Link</label>
                        <input value={remind} onChange={e => setRemind(e.target.value)} className={inputClass} placeholder="https://www.remind.com/join/..." />
                        <p className="text-xs text-ink-muted mt-1">Controls the "Join Remind" button on the student dashboard.</p>
                    </div>

                    <div>
                        <label className={labelClass}>TSA Application Link (JotForm)</label>
                        <input value={jotform} onChange={e => setJotform(e.target.value)} className={inputClass} placeholder="https://form.jotform.com/..." />
                        <p className="text-xs text-ink-muted mt-1">The official chapter application form.</p>
                    </div>

                    <div>
                        <label className={labelClass}>District Paperwork Link</label>
                        <input value={district} onChange={e => setDistrict(e.target.value)} className={inputClass} placeholder="https://..." />
                        <p className="text-xs text-ink-muted mt-1">Link to the required LEISD district club paperwork.</p>
                    </div>

                    <div>
                        <label className={labelClass}>Dues Payment Link (SuccessFund)</label>
                        <input value={successFund} onChange={e => setSuccessFund(e.target.value)} className={inputClass} placeholder="https://www.successfund.com/..." />
                        <p className="text-xs text-ink-muted mt-1">Direct link to the payment portal for membership dues.</p>
                    </div>
                </div>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                    <LinkIcon size={18} /> Social Media Links
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Instagram URL</label>
                        <input value={instagram} onChange={e => setInstagram(e.target.value)} className={inputClass} placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                        <label className={labelClass}>Twitter / X URL</label>
                        <input value={twitter} onChange={e => setTwitter(e.target.value)} className={inputClass} placeholder="https://twitter.com/..." />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button onClick={handleSave} className={`${buttonClass} bg-electric-500 text-white w-full hover:bg-electric-400 transition-colors shadow-lg shadow-electric-500/20`}>
                    <Save size={16} /> Save All Settings
                </button>
            </div>

            <div className={`${cardClass} border-gold-500/30 mt-12`}>
                <h3 className="font-bold text-gold-500 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> Danger Zone
                </h3>
                <p className="text-sm text-ink-dim mb-4">
                    Resetting the semester will archive all current members and clear competition interests.
                </p>
                <button className={`${buttonClass} bg-gold-500/10 text-gold-500 border border-gold-500/30 hover:bg-gold-500/20`}>
                    Archive Semester Data
                </button>
            </div>
        </div>
    );
}

// ─── OPPORTUNITIES TAB ─────────────────────────────────────────────────────

const OPP_TYPES = ['Scholarship', 'Internship', 'Program', 'Competition', 'Workshop', 'Fellowship'] as const;

const OpportunitiesTab: React.FC = () => {
    const { opportunities, addOpportunity, updateOpportunity, deleteOpportunity } = useData();
    const { confirm } = useModal();
    const [form, setForm] = useState({
        title: '', organization: '', description: '',
        type: 'Scholarship' as typeof OPP_TYPES[number],
        deadline: '', link: '', tags: '', featured: false,
    });
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const resetForm = () => {
        setForm({ title: '', organization: '', description: '', type: 'Scholarship', deadline: '', link: '', tags: '', featured: false });
        setEditId(null);
    };

    const startEdit = (opp: typeof opportunities[0]) => {
        setForm({
            title: opp.title, organization: opp.organization, description: opp.description,
            type: opp.type, deadline: opp.deadline ?? '', link: opp.link ?? '',
            tags: (opp.tags ?? []).join(', '), featured: opp.featured ?? false,
        });
        setEditId(opp.id);
    };

    const handleSave = async () => {
        if (!form.title || !form.organization) return;
        setSaving(true);
        const payload = {
            title: form.title, organization: form.organization, description: form.description,
            type: form.type, featured: form.featured,
...(form.deadline && { deadline: form.deadline }),
...(form.link && { link: form.link }),
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        };
        if (editId) {
            await updateOpportunity(editId, payload);
        } else {
            await addOpportunity(payload);
        }
        setSaving(false);
        resetForm();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-ink">Opportunities</h2>
                    <p className="text-sm text-ink-muted">{opportunities.length} posted, visible to all members.</p>
                </div>
            </div>

            {/* Form */}
            <div className={`${cardClass} border-electric-500/20`}>
                <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                    <Plus size={16} className="text-electric-400" />
                    {editId ? 'Edit Opportunity' : 'Post New Opportunity'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Title *</label>
                        <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g., STEM Excellence Scholarship" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Organization *</label>
                        <input value={form.organization} onChange={e => setForm(f => ({...f, organization: e.target.value}))} placeholder="e.g., Texas STEM Foundation" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Type</label>
                        <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value as typeof OPP_TYPES[number]}))} className={inputClass}>
                            {OPP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Description</label>
                        <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3} placeholder="Describe the opportunity, eligibility, award amount, etc." className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Deadline (optional)</label>
                        <input type="date" value={form.deadline} onChange={e => setForm(f => ({...f, deadline: e.target.value}))} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Link (optional)</label>
                        <input value={form.link} onChange={e => setForm(f => ({...f, link: e.target.value}))} placeholder="https://apply.example.com" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Tags (comma-separated)</label>
                        <input value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} placeholder="STEM, Texas, Engineering" className={inputClass} />
                    </div>
                    <div className="flex items-center gap-3 pt-5">
                        <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({...f, featured: e.target.checked}))} className="w-4 h-4 accent-electric-500" />
                        <label htmlFor="featured" className="text-sm font-semibold text-ink-dim select-none cursor-pointer">
                            Feature this opportunity (shown as spotlight)
                        </label>
                    </div>
                    <div className="sm:col-span-2 flex gap-2 justify-end">
                        {editId && <button onClick={resetForm} className={`${buttonClass} border border-space-500/30 text-ink-dim`}>Cancel</button>}
                        <button onClick={handleSave} disabled={saving || !form.title || !form.organization} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-50 px-6`}>
                            <Save size={15} /> {saving ? 'Saving…' : editId ? 'Update' : 'Post Opportunity'}
                        </button>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {opportunities.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-space-500/30 rounded-xl text-ink-muted text-sm">No opportunities posted yet.</div>
                )}
                {opportunities.map(opp => (
                    <div key={opp.id} className={`${cardClass} p-4 flex items-start gap-4`}>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-bold text-ink">{opp.title}</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-electric-500/10 text-electric-400">{opp.type}</span>
                                {opp.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-500/10 text-gold-400">Featured</span>}
                                {opp.deadline && <span className="text-[10px] text-ink-muted">Due {new Date(opp.deadline).toLocaleDateString()}</span>}
                            </div>
                            <p className="text-sm text-ink-muted truncate">{opp.organization}, {opp.description}</p>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => startEdit(opp)} className="p-2 rounded-lg text-ink-muted hover:text-electric-400 hover:bg-electric-500/10 transition-colors"><Edit2 size={15} /></button>
                            <button onClick={async () => {
                                if (await confirm('Delete Opportunity', `Delete "${opp.title}"?`, true, 'Delete')) deleteOpportunity(opp.id);
                            }} className="p-2 rounded-lg text-ink-muted hover:text-gold-500 hover:bg-gold-500/10 transition-colors"><Trash2 size={15} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── TEAMS ADMIN TAB ────────────────────────────────────────────────────────

const TeamsAdminTab: React.FC = () => {
    const { teams, deleteTeam, updateTeamStatus } = useData();
    const { confirm } = useModal();
    const [search, setSearch] = useState('');

    const filtered = teams.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.competitionName.toLowerCase().includes(search.toLowerCase()) ||
        t.leaderName.toLowerCase().includes(search.toLowerCase())
    );

    // Group by competition
    const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, t) => {
        if (!acc[t.competitionName]) acc[t.competitionName] = [];
        acc[t.competitionName].push(t);
        return acc;
    }, {});

    const statusColor: Record<string, string> = {
        open:   'bg-electric-50 text-electric-500',
        full:   'bg-gold-100 text-gold-600',
        closed: 'bg-space-700 text-ink-muted',
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-ink">Teams</h2>
                    <p className="text-sm text-ink-muted">{teams.length} team{teams.length !== 1 ? 's' : ''} across {Object.keys(grouped).length} competition{Object.keys(grouped).length !== 1 ? 's' : ''}.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                    <input placeholder="Search teams…" value={search} onChange={e => setSearch(e.target.value)} className={`${inputClass} pl-9`} />
                </div>
            </div>

            {Object.keys(grouped).length === 0 ? (
                <div className="text-center py-12 border border-dashed border-space-500/30 rounded-xl text-ink-muted text-sm">
                    No teams created yet. Members create teams from the Teams page.
                </div>
            ) : (
                Object.entries(grouped).map(([comp, compTeams]) => (
                    <div key={comp} className="bg-space-800 border border-space-500/30 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-5 py-3 bg-space-700/40 border-b border-space-500/30 flex items-center justify-between">
                            <h3 className="font-bold text-ink flex items-center gap-2">
                                {comp}
                            </h3>
                            <span className="text-xs font-bold text-ink-muted bg-space-600/40 px-2 py-0.5 rounded-full">{compTeams.length} team{compTeams.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-ink-dim">
                                <thead className="text-xs font-bold text-ink-muted uppercase tracking-wider border-b border-space-500/30 bg-space-700/30">
                                    <tr>
                                        <th className="px-4 py-2.5">Team Name</th>
                                        <th className="px-4 py-2.5">Leader</th>
                                        <th className="px-4 py-2.5">Members</th>
                                        <th className="px-4 py-2.5">Status</th>
                                        <th className="px-4 py-2.5">Created</th>
                                        <th className="px-4 py-2.5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-space-500/20">
                                    {compTeams.map(team => (
                                        <tr key={team.id} className="hover:bg-space-700/40 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-ink">{team.name}</td>
                                            <td className="px-4 py-3">{team.leaderName}</td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs">{team.memberIds.length} / {team.maxSize}</span>
                                                <div className="w-16 h-1 bg-space-600/40 rounded-full mt-1 overflow-hidden">
                                                    <div className="h-full bg-electric-500 rounded-full" style={{ width: `${(team.memberIds.length / team.maxSize) * 100}%` }} />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={team.status}
                                                    onChange={e => updateTeamStatus(team.id, e.target.value as 'open' | 'full' | 'closed')}
                                                    className={`text-xs font-bold px-2 py-1 rounded-lg border-0 outline-none cursor-pointer ${statusColor[team.status]}`}
                                                >
                                                    <option value="open">Open</option>
                                                    <option value="full">Full</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-xs">{new Date(team.createdAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={async () => {
                                                    if (await confirm('Disband Team', `Disband "${team.name}"? This cannot be undone.`, true, 'Disband')) deleteTeam(team.id);
                                                }} className="p-1.5 rounded-lg text-ink-muted hover:text-gold-500 hover:bg-gold-500/10 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminPanel;
