
import React, { useState } from 'react';
import {
  Shield, Users, Bell, Calendar, Settings,
  Plus, Trash2, X, Search, Edit2,
  Briefcase, FolderOpen, Image as ImageIcon,
  TrendingUp, AlertCircle, UserPlus, Activity, Archive,
  Star, FileText, ExternalLink,
  Link as LinkIcon, Save, ChevronDown, ChevronUp,
  AlertOctagon, CheckCircle,
  Cpu, Hammer, Layers, Plane, Zap, PenTool
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { Officer, Announcement } from '../types';
import { COMPETITIONS } from '../data/competitions';
import { SEO } from '../components/SEO';

type Tab = 'overview' | 'members' | 'updates' | 'leadership' | 'events' | 'projects' | 'gallery' | 'competitions' | 'interests' | 'resources' | 'issues' | 'settings' | 'attendance' | 'results' | 'opportunities' | 'teams';

// Shared Styles
const cardClass = "bg-space-800 border border-space-500/30 rounded-xl shadow-sm p-6";
const inputClass = "w-full bg-space-900 border border-space-500/50 p-2.5 rounded-lg text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-colors placeholder-ink-muted text-sm";
const labelClass = "block text-xs font-bold text-ink-muted uppercase tracking-wider mb-1.5";
const buttonClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2";

const AdminPanel: React.FC = () => {
  const { } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

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
                { id: 'members', label: 'Members & Access', icon: Users },
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
           {activeTab === 'overview' && <OverviewTab />}
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

/* --- TAB COMPONENTS --- */

const OverviewTab: React.FC = () => {
    const { members, competitionInterests, problemReports } = useData();
    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === 'active').length;
    const openIssues = problemReports.filter(r => r.status === 'Open').length;
    const recentInterests = [...competitionInterests]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={cardClass}>
                    <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">Total Members</p>
                    <h3 className="text-3xl font-bold text-ink mt-1">{totalMembers}</h3>
                    <p className="text-xs font-medium flex items-center mt-1" style={{ color: '#788c5d' }}><TrendingUp size={12} className="mr-1" /> {activeMembers} Active</p>
                </div>
                <div className={cardClass}>
                    <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">New Interests</p>
                    <h3 className="text-3xl font-bold text-ink mt-1">{competitionInterests.length}</h3>
                    <p className="text-xs text-ink-muted font-medium mt-1">Pending Review</p>
                </div>
                <div className={`${cardClass} ${openIssues > 0 ? 'border-gold-500/30 bg-gold-50/10' : ''}`}>
                    <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">Open Issues</p>
                    <h3 className={`text-3xl font-bold mt-1 ${openIssues > 0 ? 'text-gold-500' : ''}`} style={openIssues === 0 ? { color: '#788c5d' } : {}}>{openIssues}</h3>
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
                        <CheckCircle size={32} className="mx-auto mb-2 opacity-50" style={{ color: '#788c5d' }} />
                        <p className="text-ink-muted">No issues reported. Great job!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const MembersTab: React.FC = () => {
    const { user } = useAuth();
    const { members, accessCodes, generateAccessCode, deleteAccessCode, archiveAccessCode, updateMemberRole, deleteMember, regenerateMemberAccessCode } = useData();
    const { confirm, alert: showAlert } = useModal();
    const [activeSection, setActiveSection] = useState<'directory' | 'codes'>('directory');
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    const handleGenerate = async (role: 'member' | 'officer') => {
        const code = await generateAccessCode(role);
        setGeneratedCode(code);
    };

    const handleRegenerate = async (code: any) => {
        if (!code.assignedUid || !code.assignedTo) {
            await showAlert("Error", "Cannot regenerate code: User data missing.");
            return;
        }
        if (await confirm('Regenerate Code', `Generate a NEW access code for ${code.assignedTo}?\n\nThe old code (${code.id}) will be deleted and the user's profile will be updated with the new code.`, true, 'Regenerate')) {
            const newCode = await regenerateMemberAccessCode(code.id, code.assignedUid, code.assignedTo, code.role);
            if (newCode) {
                setGeneratedCode(newCode);
                await showAlert('Success', `New code generated: ${newCode}\n\nPlease share this with ${code.assignedTo}.`);
            } else {
                await showAlert('Error', "Failed to regenerate code.");
            }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex space-x-4 mb-6">
                <button onClick={() => setActiveSection('directory')} className={`pb-2 px-1 border-b-2 font-bold text-sm transition-colors ${activeSection === 'directory' ? 'border-electric-500 text-electric-400' : 'border-transparent text-ink-muted hover:text-ink'}`}>Member Directory</button>
                <button onClick={() => setActiveSection('codes')} className={`pb-2 px-1 border-b-2 font-bold text-sm transition-colors ${activeSection === 'codes' ? 'border-electric-500 text-electric-400' : 'border-transparent text-ink-muted hover:text-ink'}`}>Access Codes</button>
            </div>

            {activeSection === 'directory' ? (
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
                                        <td className="p-3 font-medium text-ink">{m.name}</td>
                                        <td className="p-3 text-xs text-ink-muted">{m.email}</td>
                                        <td className="p-3">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.role === 'officer' ? 'bg-electric-100 text-electric-500' : m.role === 'advisor' ? 'bg-gold-100 text-gold-600' : 'bg-electric-100 text-electric-500'}`}>
                                                {m.role}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.status === 'active' ? 'bg-electric-50 text-electric-500' : 'bg-space-700 text-ink-muted'}`}>
                                                {m.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-2 items-center">
                                            {user?.role === 'advisor' ? (
                                                <>
                                                    <select
                                                        value={m.role}
                                                        onChange={(e) => updateMemberRole(m.id, e.target.value as any)}
                                                        className="bg-space-900 border border-space-500/50 rounded px-2 py-1 text-xs text-ink outline-none focus:border-electric-500 cursor-pointer"
                                                    >
                                                        <option value="member">Member</option>
                                                        <option value="officer">Officer</option>
                                                        <option value="advisor">Advisor</option>
                                                    </select>
                                                    
                                                    {user.id !== m.id && (
                                                        <button 
                                                            onClick={async () => {
                                                                if (await confirm('Delete Member', `Are you sure you want to delete ${m.name}? This action cannot be undone.`, true, 'Delete')) {
                                                                    deleteMember(m.id);
                                                                }
                                                            }} 
                                                            className="p-1.5 hover:bg-gold-500/10 text-gold-500 rounded ml-2 transition-colors"
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
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className={cardClass}>
                        <h3 className="font-bold text-ink mb-4">Generate New Code</h3>
                        <p className="text-sm text-ink-muted mb-6">Create a one-time use code for new members to sign up.</p>
                        <div className="flex gap-4">
                            <button onClick={() => handleGenerate('member')} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 transition-colors`}>
                                <UserPlus size={18} /> Member Code
                            </button>
                            <button onClick={() => handleGenerate('officer')} className={`${buttonClass} bg-gold-500 text-white hover:bg-gold-400 transition-colors`}>
                                <Shield size={18} /> Officer Code
                            </button>
                        </div>
                        {generatedCode && (
                            <div className="mt-6 p-4 bg-electric-50 border border-electric-200 rounded-lg text-center animate-fade-in">
                                <p className="text-xs text-electric-500 font-bold uppercase mb-1">Code Generated</p>
                                <p className="text-3xl font-mono font-bold text-electric-500 tracking-wider">{generatedCode}</p>
                                <p className="text-xs text-ink-muted mt-2">Share this with the new member.</p>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <div className={cardClass}>
                            <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><UserPlus size={18} className="text-electric-400"/> Member Codes</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {accessCodes.filter(c => c.role === 'member' && c.status !== 'archived').length === 0 && <p className="text-ink-muted text-sm">No member codes.</p>}
                                {accessCodes.filter(c => c.role === 'member' && c.status !== 'archived').map(code => (
                                    <div key={code.id} className={`flex justify-between items-center p-3 rounded-lg border ${code.status === 'used' ? 'bg-electric-50 border-electric-200' : 'bg-space-700/50 border-space-500/30'}`}>
                                        <div>
                                            <p className="font-mono font-bold text-ink">{code.id}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${code.status === 'used' ? 'bg-electric-100 text-electric-500' : 'bg-space-600 text-ink-muted'}`}>
                                                    {code.status}
                                                </span>
                                                <p className="text-xs text-ink-muted">{new Date(code.createdDate).toLocaleDateString()}</p>
                                            </div>
                                            {code.assignedTo && (
                                                <p className="text-xs text-electric-400 font-medium mt-1">Assigned to: {code.assignedTo}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            {code.status === 'used' && (
                                                <button onClick={() => handleRegenerate(code)} className="text-electric-500 hover:bg-electric-50 p-1.5 rounded transition-colors" title="Regenerate Code">
                                                    <Activity size={14} />
                                                </button>
                                            )}
                                            {code.status !== 'archived' && (
                                                <button onClick={async () => {
                                                    if (await confirm('Archive Code', `Archive this code? It will no longer be visible in the main list.`, false, 'Archive')) {
                                                        archiveAccessCode(code.id);
                                                    }
                                                }} className="text-ink-muted hover:bg-space-700/60 p-1.5 rounded transition-colors" title="Archive Code">
                                                    <Archive size={14} />
                                                </button>
                                            )}
                                            <button onClick={async () => {
                                                if (code.status === 'used') {
                                                    if (await confirm('Delete Assigned Code', `This code is currently assigned to ${code.assignedTo || 'a user'}.\n\nClick Confirm to DELETE this code permanently (User will lose access).\nClick Cancel to keep it.`, true, 'Delete Permanently')) {
                                                        deleteAccessCode(code.id);
                                                    }
                                                } else {
                                                    if (await confirm('Delete Code', 'Delete this unused member code?', true, 'Delete')) {
                                                        deleteAccessCode(code.id);
                                                    }
                                                }
                                            }} className="text-gold-500 hover:bg-gold-500/10 p-1.5 rounded transition-colors" title="Delete Code"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cardClass}>
                            <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><Shield size={18} className="text-gold-500"/> Officer Codes</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {accessCodes.filter(c => c.role === 'officer' && c.status !== 'archived').length === 0 && <p className="text-ink-muted text-sm">No officer codes.</p>}
                                {accessCodes.filter(c => c.role === 'officer' && c.status !== 'archived').map(code => (
                                    <div key={code.id} className={`flex justify-between items-center p-3 rounded-lg border ${code.status === 'used' ? 'bg-gold-50 border-gold-200' : 'bg-space-700/50 border-space-500/30'}`}>
                                        <div>
                                            <p className="font-mono font-bold text-ink">{code.id}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${code.status === 'used' ? 'bg-gold-100 text-gold-600' : 'bg-space-600 text-ink-muted'}`}>
                                                    {code.status}
                                                </span>
                                                <p className="text-xs text-ink-muted">{new Date(code.createdDate).toLocaleDateString()}</p>
                                            </div>
                                            {code.assignedTo && (
                                                <p className="text-xs text-gold-500 font-medium mt-1">Assigned to: {code.assignedTo}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            {code.status === 'used' && (
                                                <button onClick={() => handleRegenerate(code)} className="text-gold-500 hover:bg-gold-500/10 p-1.5 rounded transition-colors" title="Regenerate Code">
                                                    <Activity size={14} />
                                                </button>
                                            )}
                                            {code.status !== 'archived' && (
                                                <button onClick={async () => {
                                                    if (await confirm('Archive Code', `Archive this code? It will no longer be visible in the main list.`, false, 'Archive')) {
                                                        archiveAccessCode(code.id);
                                                    }
                                                }} className="text-ink-muted hover:bg-space-700/60 p-1.5 rounded transition-colors" title="Archive Code">
                                                    <Archive size={14} />
                                                </button>
                                            )}
                                            <button onClick={async () => {
                                                if (code.status === 'used') {
                                                    if (await confirm('Delete Assigned Code', `This code is currently assigned to ${code.assignedTo || 'a user'}.\n\nClick Confirm to DELETE this code permanently (User will lose access).\nClick Cancel to keep it.`, true, 'Delete Permanently')) {
                                                        deleteAccessCode(code.id);
                                                    }
                                                } else {
                                                    if (await confirm('Delete Code', 'Delete this unused officer code?', true, 'Delete')) {
                                                        deleteAccessCode(code.id);
                                                    }
                                                }
                                            }} className="text-gold-500 hover:bg-gold-500/10 p-1.5 rounded transition-colors" title="Delete Code"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cardClass}>
                            <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><Archive size={18} className="text-ink-muted"/> Archived Codes</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {accessCodes.filter(c => c.status === 'archived').length === 0 && <p className="text-ink-muted text-sm">No archived codes.</p>}
                                {accessCodes.filter(c => c.status === 'archived').map(code => (
                                    <div key={code.id} className="flex justify-between items-center p-3 rounded-lg border bg-space-700/30 border-space-500/20 opacity-70">
                                        <div>
                                            <p className="font-mono font-bold text-ink-dim line-through">{code.id}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-space-600 text-ink-muted">
                                                    {code.role}
                                                </span>
                                                <p className="text-xs text-ink-muted">{new Date(code.createdDate).toLocaleDateString()}</p>
                                            </div>
                                            {code.assignedTo && (
                                                <p className="text-xs text-ink-muted font-medium mt-1">Assigned to: {code.assignedTo}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={async () => {
                                                if (await confirm('Delete Archived Code', 'Delete this archived code permanently?', true, 'Delete')) {
                                                    deleteAccessCode(code.id);
                                                }
                                            }} className="text-gold-500 hover:bg-gold-500/10 p-1.5 rounded transition-colors" title="Delete Code"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
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

const LeadershipTab: React.FC = () => {
    const { officersList, addOfficer, deleteOfficer } = useData();
    const { confirm } = useModal();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [category, setCategory] = useState<Officer['category']>('Executive');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        addOfficer({ name, role, grade: '12th Grade', category, bio, email, order: officersList.length + 1 });
        setName(''); setRole(''); setEmail(''); setBio('');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Add Leadership Member</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Jane Doe" required />
                        </div>
                        <div>
                            <label className={labelClass}>Role</label>
                            <input value={role} onChange={e => setRole(e.target.value)} className={inputClass} placeholder="President" required />
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="jane@lehs.tsa" />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Biography</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} className={`${inputClass} min-h-[80px]`} placeholder="A short bio..." />
                    </div>
                    <div>
                        <label className={labelClass}>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value as any)} className={inputClass}>
                            <option>Executive</option>
                            <option>Committee</option>
                            <option>Advisor</option>
                        </select>
                    </div>
                    <button type="submit" className={`${buttonClass} bg-electric-500 text-white w-full`}>Add Member</button>
                </form>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Current Leadership Team</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-space-700/40 text-ink-muted">
                            <tr>
                                <th className="p-3 rounded-tl-lg">Name</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Category</th>
                                <th className="p-3 rounded-tr-lg text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-space-500/20">
                            {officersList.map(o => (
                                <tr key={o.id} className="group hover:bg-space-700/40">
                                    <td className="p-3 font-bold text-ink">{o.name}</td>
                                    <td className="p-3 text-ink-dim">{o.role}</td>
                                    <td className="p-3"><span className="text-[10px] bg-space-600/60 px-2 py-1 rounded uppercase font-bold text-ink-muted">{o.category}</span></td>
                                    <td className="p-3 text-right">
                                        <button onClick={async () => {
                                            if (await confirm('Remove Officer', 'Remove this officer?', true, 'Remove')) {
                                                deleteOfficer(o.id);
                                            }
                                        }} className="text-ink-muted hover:text-gold-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
    const [form, setForm] = useState({ title: '', category: 'Software Development', year: '2025', description: '', award: '' });
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
                         <input value={form.year} onChange={e => setForm({...form, year: e.target.value})} className={inputClass} placeholder="Year (e.g. 2025)" />
                         <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={`${inputClass} h-24 resize-none`} placeholder="Detailed Description..." />
                     </div>
                </div>
                <button
                    onClick={() => {
                        if(!form.title) return;
                        addProject(form);
                        setForm({ title: '', category: 'Software Development', year: '2025', description: '', award: '' });
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
                            addGalleryItem({ title, imageUrl: url, category: 'Event', date: '2025' });
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
                            }} className="text-white hover:text-gold-400"><Trash2 size={24}/></button>
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
                <div className="text-center py-16 bg-space-800 border border-dashed border-space-500/30 rounded-xl text-ink-muted">No interests found.</div>
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
                                            <td className="px-4 py-3 italic text-xs max-w-xs truncate">{interest.notes || '—'}</td>
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
    stem:       { label: 'STEM',           color: '#3b82f6', icon: Cpu       },
    arch:       { label: 'Architecture',   color: '#f59e0b', icon: Hammer    },
    man:        { label: 'Manufacturing',  color: '#8b5cf6', icon: Layers    },
    trans:      { label: 'Transportation', color: '#06b6d4', icon: Plane     },
    energy:     { label: 'Energy',         color: '#e05c5c', icon: Zap       },
    ict:        { label: 'ICT',            color: '#60a5fa', icon: Cpu       },
    design:     { label: 'Design',         color: '#ec4899', icon: PenTool   },
    leadership: { label: 'Leadership',     color: '#22c55e', icon: Briefcase },
    teams:      { label: 'TEAMS',          color: '#f97316', icon: Star      },
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
        description: 'Teams of 2–4 compete across Design/Build, Multiple Choice, Mathematical Modeling, and Essay. 2025–2026 theme: "Engineering the Past".',
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

    const removeLink = (i: number) => persist(links.filter((_, idx) => idx !== i));

    const startEdit = (i: number) => {
        setEditingIdx(i);
        setEditName(links[i].name);
        setEditUrl(links[i].url);
    };

    const saveEdit = () => {
        if (editingIdx === null || !editUrl.trim()) return;
        const updated = links.map((l, i) =>
            i === editingIdx ? { url: editUrl.trim(), name: editName.trim() || editUrl.trim() } : l
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
                                        style={{ background: `${compMeta?.color}22` }}
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
                                style={{ background: `${meta.color}22` }}
                            >
                                <meta.icon size={20} style={{ color: meta.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-ink leading-tight">{selected.title}</h3>
                                    <span
                                        className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                                        style={{ background: `${meta.color}20`, color: meta.color }}
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
                            {!showAdd && (
                                <button
                                    onClick={() => { setShowAdd(true); setEditingIdx(null); }}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-electric-500 hover:bg-electric-400 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Plus size={13} /> Add Link
                                </button>
                            )}
                        </div>

                        {/* Empty state */}
                        {links.length === 0 && !showAdd && (
                            <div className="text-center py-16">
                                <div className="w-14 h-14 bg-space-700/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <LinkIcon size={24} className="text-ink-muted" />
                                </div>
                                <p className="text-sm font-semibold text-ink-muted">No resources yet</p>
                                <p className="text-xs text-ink-muted mt-1 max-w-xs mx-auto">
                                    Add a rulebook, study guide, or any helpful link for members.
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
                                                placeholder='Label  (e.g. "2025–2026 Rulebook")'
                                                className={inputClass}
                                            />
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
                                                <LinkIcon size={14} className="text-electric-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-ink truncate">{link.name}</p>
                                                <p className="text-xs text-ink-muted truncate font-mono">{link.url}</p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 text-ink-muted hover:text-electric-400 hover:bg-electric-500/10 rounded-lg transition-colors"
                                                    title="Open link"
                                                >
                                                    <ExternalLink size={13} />
                                                </a>
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
                                    placeholder='Label  (e.g. "2025–2026 Rulebook")'
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
    const [form, setForm] = useState({ title: '', date: '', time: '', location: '', pin: '', type: 'General' as const });
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [webhookUrl, setWebhookUrl] = useState((siteSettings as any).sheetsWebhookUrl ?? '');
    const [webhookSaving, setWebhookSaving] = useState(false);
    const [webhookSaved, setWebhookSaved] = useState(false);
    const [syncingId, setSyncingId] = useState<string | null>(null);
    const [syncMsg, setSyncMsg] = useState<{ id: string; ok: boolean; text: string } | null>(null);

    const generatePin = () => setForm(f => ({ ...f, pin: String(Math.floor(1000 + Math.random() * 9000)) }));

    const handleAdd = async () => {
        if (!form.title.trim() || !form.date || !form.pin.trim()) return;
        await addMeeting({ title: form.title.trim(), date: form.date, time: form.time, location: form.location.trim(), pin: form.pin.trim(), type: form.type, description: '' });
        setForm({ title: '', date: '', time: '', location: '', pin: '', type: 'General' });
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
            setSyncMsg({ id: meeting.id, ok: true, text: 'Synced — check your Sheet.' });
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
                            <input value={form.pin} onChange={e => setForm(f => ({ ...f, pin: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="4–6 digits" className={`${inputClass} font-mono tracking-widest`} maxLength={6} />
                            <button onClick={generatePin} className="px-3 py-2 rounded-lg bg-space-700/60 text-ink-dim text-xs font-bold hover:bg-space-600/60 transition-colors shrink-0">Generate</button>
                        </div>
                    </div>
                </div>
                <button onClick={handleAdd} disabled={!form.title.trim() || !form.date || !form.pin.trim()} className={`${buttonClass} bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-40`}>
                    <Plus size={15} /> Create Meeting
                </button>
            </div>

            {/* Meeting list */}
            {meetings.length === 0 ? (
                <div className="text-center py-16 text-ink-muted text-sm">No meetings yet. Create one above.</div>
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
                                            <p className="text-xs text-ink-muted">{m.date}{m.time ? ` — ${m.time}` : ''}{m.location ? ` — ${m.location}` : ''}</p>
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
                                                                <td className="py-1.5 pr-4 text-ink-muted hidden sm:table-cell">{mem?.email ?? '—'}</td>
                                                                <td className="py-1.5 pr-4 text-ink-muted hidden sm:table-cell">{mem?.grade ?? '—'}</td>
                                                                <td className="py-1.5 font-mono text-ink-muted">{mem?.memberId ?? '—'}</td>
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
                <p className="text-sm text-ink-muted mt-1">Track placements at regionals, state, and nationals — displayed on the public site.</p>
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
                        <input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2025" className={inputClass} />
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
                <div className="text-center py-16 text-ink-muted text-sm">No results recorded yet.</div>
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
    const [form, setForm] = useState({ title: '', url: '', category: 'general', description: '', type: 'Link' });

    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
             <div className={cardClass}>
                <h3 className="font-bold text-ink mb-4">Add General Resource</h3>
                <div className="space-y-3">
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} placeholder="Title (e.g. Medical Form)" />
                    <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} className={inputClass} placeholder="URL" />
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
                        onClick={() => {
                            if(!form.title || !form.url) return;
                            addResource({...form, accessLevel: form.category === 'officer' ? 'officer' : 'member'});
                            setForm({ ...form, title: '', url: '', description: '', type: 'Link' });
                        }}
                        className={`${buttonClass} bg-electric-500 text-white w-full`}
                    >
                        Add Resource
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
                                    <a href={r.url} target="_blank" className="text-xs text-electric-400 hover:underline">{r.url}</a>
                                </div>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Resource', 'Delete this resource?', true, 'Delete')) {
                                    deleteResource(r.id);
                                }
                            }} className="text-ink-muted hover:text-gold-500"><Trash2 size={16}/></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SettingsTab: React.FC = () => {
    const { siteSettings, updateSiteSettings } = useData();
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
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-20">
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
                            value={eventDate ? new Date(eventDate).toISOString().slice(0, 16) : ''} 
                            onChange={e => setEventDate(new Date(e.target.value).toISOString())} 
                            className={inputClass} 
                        />
                    </div>
                </div>
                <p className="text-xs text-ink-muted mt-2">This event will be displayed on the home page countdown timer.</p>
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
                    <p className="text-sm text-ink-muted">{opportunities.length} posted — visible to all members.</p>
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
                            <p className="text-sm text-ink-muted truncate">{opp.organization} — {opp.description}</p>
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
