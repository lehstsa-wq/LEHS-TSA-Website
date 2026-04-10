
import React, { useState } from 'react';
import {
  Shield, Users, Bell, Calendar, Settings,
  Plus, Trash2, X, Search, Edit2,
  Briefcase, FolderOpen, Image as ImageIcon,
  TrendingUp, AlertCircle, UserPlus, Activity, Archive,
  Star, FileText, ExternalLink,
  Link as LinkIcon, Save, ChevronDown, ChevronUp,
  AlertOctagon, CheckCircle, Award,
  Cpu, Hammer, Layers, Plane, Zap, PenTool
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { Officer, Announcement } from '../types';
import { COMPETITIONS } from '../data/competitions';
import { SEO } from '../components/SEO';

type Tab = 'overview' | 'members' | 'updates' | 'leadership' | 'events' | 'projects' | 'gallery' | 'competitions' | 'interests' | 'resources' | 'issues' | 'settings' | 'attendance' | 'results';

// Shared Styles
const cardClass = "bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6";
const inputClass = "w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border p-2.5 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-colors placeholder-gray-400 text-sm";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";
const buttonClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2";

const AdminPanel: React.FC = () => {
  const { } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in transition-colors duration-300 flex flex-col md:flex-row">
      <SEO title="Admin Panel" description="Manage Little Elm High School TSA website content and settings." />
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border md:flex flex-col md:sticky md:top-20 md:h-[calc(100vh-5rem)] z-30 hidden">
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center gap-2 text-accent-blue">
             <Shield size={24} />
             <span className="font-bold text-lg">Officer Portal</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {[
              { id: 'overview', label: 'Overview', icon: Shield },
              { id: 'members', label: 'Members & Access', icon: Users },
              { id: 'issues', label: 'Issue Reports', icon: AlertOctagon },
              { id: 'competitions', label: 'Competitions', icon: Briefcase },
              { id: 'interests', label: 'Interest Tracking', icon: Users },
              { id: 'updates', label: 'Announcements', icon: Bell },
              { id: 'leadership', label: 'Leadership', icon: Star },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              { id: 'attendance', label: 'Attendance', icon: CheckCircle },
              { id: 'results', label: 'Competition Results', icon: TrendingUp },
              { id: 'resources', label: 'Resources', icon: LinkIcon },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-accent-blue/10 text-accent-blue'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
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
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Members</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalMembers}</h3>
                    <p className="text-xs text-green-500 font-medium flex items-center mt-1"><TrendingUp size={12} className="mr-1" /> {activeMembers} Active</p>
                </div>
                <div className={cardClass}>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">New Interests</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{competitionInterests.length}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">Pending Review</p>
                </div>
                <div className={`${cardClass} ${openIssues > 0 ? 'border-red-500/30 bg-red-50 dark:bg-red-900/10' : ''}`}>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Open Issues</p>
                    <h3 className={`text-3xl font-bold mt-1 ${openIssues > 0 ? 'text-red-500' : 'text-green-500'}`}>{openIssues}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">Reported Problems</p>
                </div>
            </div>
            
            <div className={cardClass}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Activity size={18} className="text-accent-blue" /> Recent Competition Interests
                    </h3>
                </div>
                <div className="space-y-4">
                    {recentInterests.length > 0 ? (
                        recentInterests.map((interest, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-accent-blue font-bold">
                                    {interest.userName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                                        {interest.userName} is interested in <span className="text-accent-blue font-bold">{interest.competitionName}</span>
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {interest.skills.map(s => (
                                            <span key={s} className="text-[10px] bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{s}</span>
                                        ))}
                                    </div>
                                    {interest.notes && <p className="text-xs text-gray-500 mt-1 italic">"{interest.notes}"</p>}
                                </div>
                            </div>
                        ))
                    ) : <p className="text-gray-500 text-center py-4">No recent activity.</p>}
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Issue Reports</h2>
                    <p className="text-sm text-gray-500">Track and resolve issues reported by members.</p>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    {problemReports.filter(r => r.status === 'Open').length} Open Issues
                </div>
            </div>

            <div className="space-y-4">
                {problemReports.length > 0 ? problemReports.map(report => (
                    <div key={report.id} className={`bg-white dark:bg-dark-surface border rounded-xl p-5 shadow-sm transition-all ${
                        report.status === 'Resolved' ? 'border-green-200 dark:border-green-900/30 opacity-70' : 
                        report.status === 'In Progress' ? 'border-yellow-200 dark:border-yellow-900/30' :
                        'border-red-200 dark:border-red-900/30'
                    }`}>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                        report.priority === 'High' ? 'bg-red-100 text-red-600' :
                                        report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {report.priority}
                                    </span>
                                    <span className="text-xs text-gray-500">• {report.category}</span>
                                    <span className="text-xs text-gray-400">• {report.submittedDate}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{report.description}</h3>
                                <p className="text-sm text-gray-500 mt-1">Reported by: <span className="font-medium text-gray-700 dark:text-gray-300">{report.reporterName}</span> ({report.reporterEmail})</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <select 
                                    value={report.status}
                                    onChange={(e) => updateProblemReport(report.id, { status: e.target.value as any })}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                                        report.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                                        report.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                        'bg-red-50 text-red-700 border-red-200'
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
                                }} className="text-gray-400 hover:text-red-500 self-end p-1">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <CheckCircle size={32} className="mx-auto text-green-500 mb-2 opacity-50" />
                        <p className="text-gray-500">No issues reported. Great job!</p>
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
                <button onClick={() => setActiveSection('directory')} className={`pb-2 px-1 border-b-2 font-bold text-sm transition-colors ${activeSection === 'directory' ? 'border-accent-blue text-accent-blue' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>Member Directory</button>
                <button onClick={() => setActiveSection('codes')} className={`pb-2 px-1 border-b-2 font-bold text-sm transition-colors ${activeSection === 'codes' ? 'border-accent-blue text-accent-blue' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>Access Codes</button>
            </div>

            {activeSection === 'directory' ? (
                <div className={cardClass}>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">All Members ({members.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                                <tr>
                                    <th className="p-3 rounded-tl-lg">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {members.map(m => (
                                    <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                                        <td className="p-3 font-medium text-gray-900 dark:text-white">{m.name}</td>
                                        <td className="p-3 text-xs text-gray-500">{m.email}</td>
                                        <td className="p-3">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.role === 'officer' ? 'bg-purple-100 text-purple-600' : m.role === 'advisor' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {m.role}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {m.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-2 items-center">
                                            {user?.role === 'advisor' ? (
                                                <>
                                                    <select
                                                        value={m.role}
                                                        onChange={(e) => updateMemberRole(m.id, e.target.value as any)}
                                                        className="bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-xs outline-none focus:border-accent-blue cursor-pointer"
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
                                                            className="p-1.5 hover:bg-red-100 text-red-500 rounded ml-2 transition-colors" 
                                                            title="Remove Member"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">View Only</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {members.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-500">No members found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className={cardClass}>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Generate New Code</h3>
                        <p className="text-sm text-gray-500 mb-6">Create a one-time use code for new members to sign up.</p>
                        <div className="flex gap-4">
                            <button onClick={() => handleGenerate('member')} className={`${buttonClass} bg-accent-blue text-white hover:bg-accent-purple transition-colors`}>
                                <UserPlus size={18} /> Member Code
                            </button>
                            <button onClick={() => handleGenerate('officer')} className={`${buttonClass} bg-purple-600 text-white hover:bg-purple-700`}>
                                <Shield size={18} /> Officer Code
                            </button>
                        </div>
                        {generatedCode && (
                            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg text-center animate-fade-in">
                                <p className="text-xs text-green-800 dark:text-green-300 font-bold uppercase mb-1">Code Generated</p>
                                <p className="text-3xl font-mono font-bold text-green-600 dark:text-green-400 tracking-wider selection:bg-green-200">{generatedCode}</p>
                                <p className="text-xs text-gray-500 mt-2">Share this with the new member.</p>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <div className={cardClass}>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><UserPlus size={18} className="text-accent-blue"/> Member Codes</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {accessCodes.filter(c => c.role === 'member' && c.status !== 'archived').length === 0 && <p className="text-gray-500 text-sm">No member codes.</p>}
                                {accessCodes.filter(c => c.role === 'member' && c.status !== 'archived').map(code => (
                                    <div key={code.id} className={`flex justify-between items-center p-3 rounded-lg border ${code.status === 'used' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5'}`}>
                                        <div>
                                            <p className="font-mono font-bold text-gray-900 dark:text-white">{code.id}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${code.status === 'used' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                                    {code.status}
                                                </span>
                                                <p className="text-xs text-gray-500">{new Date(code.createdDate).toLocaleDateString()}</p>
                                            </div>
                                            {code.assignedTo && (
                                                <p className="text-xs text-accent-blue font-medium mt-1">Assigned to: {code.assignedTo}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            {code.status === 'used' && (
                                                <button onClick={() => handleRegenerate(code)} className="text-accent-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1.5 rounded transition-colors" title="Regenerate Code">
                                                    <Activity size={14} />
                                                </button>
                                            )}
                                            {code.status !== 'archived' && (
                                                <button onClick={async () => {
                                                    if (await confirm('Archive Code', `Archive this code? It will no longer be visible in the main list.`, false, 'Archive')) {
                                                        archiveAccessCode(code.id);
                                                    }
                                                }} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 p-1.5 rounded transition-colors" title="Archive Code">
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
                                            }} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors" title="Delete Code"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cardClass}>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Shield size={18} className="text-purple-500"/> Officer Codes</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {accessCodes.filter(c => c.role === 'officer' && c.status !== 'archived').length === 0 && <p className="text-gray-500 text-sm">No officer codes.</p>}
                                {accessCodes.filter(c => c.role === 'officer' && c.status !== 'archived').map(code => (
                                    <div key={code.id} className={`flex justify-between items-center p-3 rounded-lg border ${code.status === 'used' ? 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-900/30' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5'}`}>
                                        <div>
                                            <p className="font-mono font-bold text-gray-900 dark:text-white">{code.id}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${code.status === 'used' ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-600'}`}>
                                                    {code.status}
                                                </span>
                                                <p className="text-xs text-gray-500">{new Date(code.createdDate).toLocaleDateString()}</p>
                                            </div>
                                            {code.assignedTo && (
                                                <p className="text-xs text-purple-600 font-medium mt-1">Assigned to: {code.assignedTo}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            {code.status === 'used' && (
                                                <button onClick={() => handleRegenerate(code)} className="text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 p-1.5 rounded transition-colors" title="Regenerate Code">
                                                    <Activity size={14} />
                                                </button>
                                            )}
                                            {code.status !== 'archived' && (
                                                <button onClick={async () => {
                                                    if (await confirm('Archive Code', `Archive this code? It will no longer be visible in the main list.`, false, 'Archive')) {
                                                        archiveAccessCode(code.id);
                                                    }
                                                }} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 p-1.5 rounded transition-colors" title="Archive Code">
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
                                            }} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors" title="Delete Code"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cardClass}>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Archive size={18} className="text-gray-500"/> Archived Codes</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {accessCodes.filter(c => c.status === 'archived').length === 0 && <p className="text-gray-500 text-sm">No archived codes.</p>}
                                {accessCodes.filter(c => c.status === 'archived').map(code => (
                                    <div key={code.id} className="flex justify-between items-center p-3 rounded-lg border bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 opacity-70">
                                        <div>
                                            <p className="font-mono font-bold text-gray-900 dark:text-white line-through">{code.id}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-gray-200 text-gray-600">
                                                    {code.role}
                                                </span>
                                                <p className="text-xs text-gray-500">{new Date(code.createdDate).toLocaleDateString()}</p>
                                            </div>
                                            {code.assignedTo && (
                                                <p className="text-xs text-gray-500 font-medium mt-1">Assigned to: {code.assignedTo}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={async () => {
                                                if (await confirm('Delete Archived Code', 'Delete this archived code permanently?', true, 'Delete')) {
                                                    deleteAccessCode(code.id);
                                                }
                                            }} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors" title="Delete Code"><Trash2 size={14} /></button>
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Post Announcement</h3>
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
                    <button type="submit" className={`${buttonClass} w-full bg-accent-blue text-white hover:bg-accent-purple transition-colors`}>
                        <Plus size={16} /> Post Update
                    </button>
                </form>
            </div>
            <div className={`md:col-span-2 ${cardClass}`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Announcements</h3>
                <div className="space-y-3">
                    {announcements.map(a => (
                        <div key={a.id} className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 flex justify-between items-start group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 uppercase">{a.type}</span>
                                    <span className="text-xs text-gray-400">{a.date}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{a.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{a.content}</p>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Announcement', 'Delete this announcement?', true, 'Delete')) {
                                    deleteAnnouncement(a.id);
                                }
                            }} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {announcements.length === 0 && <p className="text-gray-500 text-center italic">No announcements posted.</p>}
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add Leadership Member</h3>
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
                    <button type="submit" className={`${buttonClass} bg-accent-blue text-white w-full`}>Add Member</button>
                </form>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Current Leadership Team</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="p-3 rounded-tl-lg">Name</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Category</th>
                                <th className="p-3 rounded-tr-lg text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {officersList.map(o => (
                                <tr key={o.id} className="group hover:bg-gray-50 dark:hover:bg-white/5">
                                    <td className="p-3 font-bold text-gray-900 dark:text-white">{o.name}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-400">{o.role}</td>
                                    <td className="p-3"><span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-1 rounded uppercase font-bold text-gray-500">{o.category}</span></td>
                                    <td className="p-3 text-right">
                                        <button onClick={async () => {
                                            if (await confirm('Remove Officer', 'Remove this officer?', true, 'Remove')) {
                                                deleteOfficer(o.id);
                                            }
                                        }} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Create Event</h3>
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
                    <button type="submit" className={`${buttonClass} bg-accent-blue text-white w-full`}>Create Event</button>
                </form>
            </div>
            <div className={`lg:col-span-2 ${cardClass}`}>
                 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
                 <div className="space-y-3">
                    {eventsList.map(e => (
                        <div key={e.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                            <div className="flex gap-4 items-center">
                                <div className="text-center bg-white dark:bg-dark-bg p-2 rounded border border-gray-200 dark:border-white/10 min-w-[3rem]">
                                    <span className="block text-xs font-bold text-red-500 uppercase">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="block text-lg font-bold text-gray-900 dark:text-white">{new Date(e.date).getDate()}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{e.title}</h4>
                                    <p className="text-xs text-gray-500">{e.time} • {e.location}</p>
                                </div>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Event', 'Delete this event?', true, 'Delete')) {
                                    deleteEvent(e.id);
                                }
                            }} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                    {eventsList.length === 0 && <p className="text-gray-500 italic">No events scheduled.</p>}
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add Project Showcase</h3>
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
                    className={`${buttonClass} bg-accent-blue text-white w-full mt-4`}
                >
                    <Plus size={18} /> Add Project
                </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectsList.map(p => (
                    <div key={p.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl relative group">
                        <button onClick={async () => {
                            if (await confirm('Delete Project', 'Delete this project?', true, 'Delete')) {
                                deleteProject(p.id);
                            }
                        }} className="absolute top-2 right-2 p-1.5 bg-white dark:bg-dark-bg rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"><Trash2 size={14}/></button>
                        
                        <div className="flex items-start justify-between mb-2 pr-8">
                            <h4 className="font-bold text-gray-900 dark:text-white">{p.title}</h4>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">{p.category}</span>
                            {p.award && <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded">{p.award}</span>}
                        </div>

                        {p.imageUrl && (
                            <img src={p.imageUrl} className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-100 dark:border-white/5" alt={p.title} />
                        )}

                        <div className={`text-sm text-gray-500 overflow-hidden transition-all duration-300 ${expandedId === p.id ? 'max-h-96' : 'max-h-16 line-clamp-2'}`}>
                            {p.description}
                        </div>
                        
                        <button onClick={() => toggleExpand(p.id)} className="text-xs text-accent-blue mt-2 flex items-center gap-1 hover:underline">
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add Photo to Gallery</h3>
                <div className="flex gap-3">
                    <input value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="Caption" />
                    <input value={url} onChange={e => setUrl(e.target.value)} className={inputClass} placeholder="Image URL (Unsplash, etc.)" />
                    <button 
                        onClick={() => {
                            if(!url) return;
                            addGalleryItem({ title, imageUrl: url, category: 'Event', date: '2025' });
                            setUrl(''); setTitle('');
                        }}
                        className={`${buttonClass} bg-accent-blue text-white whitespace-nowrap`}
                    >
                        Add Photo
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryList.map(item => (
                    <div key={item.id} className="relative aspect-square group rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5">
                        <img src={item.imageUrl} alt={item.title || 'Gallery Image'} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={async () => {
                                if (await confirm('Delete Image', 'Delete this image?', true, 'Delete')) {
                                    deleteGalleryItem(item.id);
                                }
                            }} className="text-white hover:text-red-400"><Trash2 size={24}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const InterestsTab: React.FC = () => {
    const { competitionInterests } = useData();
    const [search, setSearch] = useState('');
    const [filterEvent, setFilterEvent] = useState('All');

    const uniqueEvents = ['All', ...Array.from(new Set(competitionInterests.map(i => i.competitionName)))];

    const filtered = competitionInterests.filter(i => {
        const matchesSearch = i.userName.toLowerCase().includes(search.toLowerCase()) || 
                              i.competitionName.toLowerCase().includes(search.toLowerCase());
        const matchesEvent = filterEvent === 'All' || i.competitionName === filterEvent;
        return matchesSearch && matchesEvent;
    });

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interest Tracking</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">View members interested in competitions.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <input 
                        placeholder="Search members..." 
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        className="flex-1 md:w-48 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border p-2 rounded-lg text-sm"
                    />
                    <select
                        value={filterEvent}
                        onChange={e => setFilterEvent(e.target.value)}
                        className="flex-1 md:w-48 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border p-2 rounded-lg text-sm"
                    >
                        {uniqueEvents.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
             </div>

             <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
                 <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                         <thead className="bg-gray-50 dark:bg-dark-bg/50 text-gray-900 dark:text-white font-bold border-b border-gray-200 dark:border-dark-border">
                             <tr>
                                 <th className="p-4">Member</th>
                                 <th className="p-4">Competition</th>
                                 <th className="p-4">Skills</th>
                                 <th className="p-4">Notes</th>
                                 <th className="p-4">Date</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                             {filtered.map((interest, idx) => (
                                 <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                     <td className="p-4 font-bold text-gray-900 dark:text-white">{interest.userName}</td>
                                     <td className="p-4">{interest.competitionName}</td>
                                     <td className="p-4">
                                         <div className="flex flex-wrap gap-1">
                                             {interest.skills.map(s => (
                                                 <span key={s} className="px-2 py-0.5 bg-accent-blue/10 text-accent-blue rounded text-xs">{s}</span>
                                             ))}
                                         </div>
                                     </td>
                                     <td className="p-4 italic text-xs max-w-xs truncate">{interest.notes}</td>
                                     <td className="p-4 text-xs">{new Date(interest.timestamp).toLocaleDateString()}</td>
                                 </tr>
                             ))}
                             {filtered.length === 0 && (
                                 <tr>
                                     <td colSpan={5} className="p-8 text-center text-gray-500">No interests found.</td>
                                 </tr>
                             )}
                         </tbody>
                     </table>
                 </div>
             </div>
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Competition Resources</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Attach rulebooks, study guides, and links to each competition. Members see these on the Competitions page.
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <div className="text-center px-4 py-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{totalLinks}</p>
                        <p className="text-[11px] text-gray-400">total links</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{configuredCount}</p>
                        <p className="text-[11px] text-gray-400">configured</p>
                    </div>
                </div>
            </div>

            {/* Two-panel layout */}
            <div className="flex gap-4 flex-1 min-h-0">

                {/* ── Left panel: competition list ── */}
                <div className="w-72 shrink-0 flex flex-col bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
                    {/* Search */}
                    <div className="p-3 border-b border-gray-100 dark:border-dark-border shrink-0">
                        <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search competitions..."
                                className="w-full pl-7 pr-7 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category filter pills */}
                    <div className="flex gap-1 flex-wrap px-3 py-2 border-b border-gray-100 dark:border-dark-border shrink-0">
                        {COMP_CATEGORY_FILTERS.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoryFilter(cat.id)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                                    categoryFilter === cat.id
                                        ? 'bg-accent-blue text-white'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-dark-border">
                        {filtered.length === 0 && (
                            <p className="text-xs text-gray-400 italic text-center py-10">No results</p>
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
                                            ? 'bg-accent-blue/10 border-accent-blue'
                                            : 'border-transparent hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: `${compMeta?.color}22` }}
                                    >
                                        {compMeta && <compMeta.icon size={13} style={{ color: compMeta.color }} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-semibold truncate ${isActive ? 'text-accent-blue' : 'text-gray-800 dark:text-white'}`}>
                                            {comp.title}
                                        </p>
                                        {comp.subtitle && (
                                            <p className="text-[10px] text-gray-400 truncate">{comp.subtitle}</p>
                                        )}
                                    </div>
                                    {compLinks.length > 0 && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-accent-blue shrink-0">
                                            {compLinks.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Right panel: detail + link editor ── */}
                <div className="flex-1 min-w-0 flex flex-col bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
                    {/* Competition header */}
                    <div
                        className="px-6 py-4 border-b border-gray-100 dark:border-dark-border shrink-0"
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
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{selected.title}</h3>
                                    <span
                                        className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                                        style={{ background: `${meta.color}20`, color: meta.color }}
                                    >
                                        {meta.label}
                                    </span>
                                    {saved && (
                                        <span className="flex items-center gap-1 text-[11px] font-semibold text-green-500 shrink-0">
                                            <CheckCircle size={11} /> Saved
                                        </span>
                                    )}
                                </div>
                                {selected.subtitle && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selected.subtitle}</p>
                                )}
                                {selected.description && (
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{selected.description}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Links section */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                Resource Links
                                {links.length > 0 && (
                                    <span className="ml-2 text-gray-400 font-normal text-xs">({links.length})</span>
                                )}
                            </h4>
                            {!showAdd && (
                                <button
                                    onClick={() => { setShowAdd(true); setEditingIdx(null); }}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-accent-blue hover:bg-accent-hover px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Plus size={13} /> Add Link
                                </button>
                            )}
                        </div>

                        {/* Empty state */}
                        {links.length === 0 && !showAdd && (
                            <div className="text-center py-16">
                                <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <LinkIcon size={24} className="text-gray-300 dark:text-gray-600" />
                                </div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No resources yet</p>
                                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                                    Add a rulebook, study guide, or any helpful link for members.
                                </p>
                                <button
                                    onClick={() => setShowAdd(true)}
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-accent-blue hover:bg-accent-hover px-5 py-2.5 rounded-xl transition-colors shadow-sm"
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
                                    className="group border border-gray-100 dark:border-dark-border rounded-xl overflow-hidden"
                                >
                                    {editingIdx === i ? (
                                        /* Inline edit form */
                                        <div className="p-4 bg-blue-50/60 dark:bg-blue-900/10 space-y-2.5">
                                            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Editing Link</p>
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
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-accent-blue text-white rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-accent-hover transition-colors"
                                                >
                                                    <Save size={12} /> Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setEditingIdx(null)}
                                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 text-xs font-semibold"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Read-only row */
                                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                                <LinkIcon size={14} className="text-accent-blue" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{link.name}</p>
                                                <p className="text-xs text-gray-400 truncate font-mono">{link.url}</p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 text-gray-400 hover:text-accent-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="Open link"
                                                >
                                                    <ExternalLink size={13} />
                                                </a>
                                                <button
                                                    onClick={() => startEdit(i)}
                                                    className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => removeLink(i)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
                            <div className="mt-4 border border-blue-200 dark:border-blue-700/40 rounded-xl p-4 bg-blue-50/50 dark:bg-blue-900/10 space-y-3">
                                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">New Link</p>
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
                                        className="flex items-center gap-1.5 px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-accent-hover transition-colors"
                                    >
                                        <Plus size={14} /> Add Link
                                    </button>
                                    <button
                                        onClick={() => { setShowAdd(false); setAddName(''); setAddUrl(''); }}
                                        className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-semibold"
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
    const { meetings, addMeeting, deleteMeeting, members } = useData();
    const { confirm } = useModal();
    const [form, setForm] = useState({ title: '', date: '', time: '', location: '', pin: '', type: 'General' as const });
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const generatePin = () => {
        setForm(f => ({ ...f, pin: String(Math.floor(1000 + Math.random() * 9000)) }));
    };

    const handleAdd = async () => {
        if (!form.title.trim() || !form.date || !form.pin.trim()) return;
        await addMeeting({ title: form.title.trim(), date: form.date, time: form.time, location: form.location.trim(), pin: form.pin.trim(), type: form.type, description: '' });
        setForm({ title: '', date: '', time: '', location: '', pin: '', type: 'General' });
    };

    const handleDelete = async (id: string) => {
        const ok = await confirm('Delete Meeting', 'Remove this meeting and all attendance records?');
        if (ok) await deleteMeeting(id);
    };

    const memberMap = Object.fromEntries(members.map(m => [m.id, m.name]));

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Tracker</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create meetings with PINs. Members check in at <span className="font-mono text-accent-blue">/check-in</span>.</p>
            </div>

            {/* Add meeting form */}
            <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Create Meeting</h3>
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
                            <button onClick={generatePin} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors shrink-0">Generate</button>
                        </div>
                    </div>
                </div>
                <button onClick={handleAdd} disabled={!form.title.trim() || !form.date || !form.pin.trim()} className={`${buttonClass} bg-accent-blue text-white hover:bg-accent-hover disabled:opacity-40`}>
                    <Plus size={15} /> Create Meeting
                </button>
            </div>

            {/* Meeting list */}
            {meetings.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">No meetings yet.</div>
            ) : (
                <div className="space-y-3">
                    {meetings.map(m => {
                        const isOpen = expandedId === m.id;
                        const attendeeNames = m.attendees.map(id => memberMap[id] ?? id);
                        return (
                            <div key={m.id} className={cardClass + ' p-0 overflow-hidden'}>
                                <button onClick={() => setExpandedId(isOpen ? null : m.id)}
                                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center min-w-[48px]">
                                            <p className="text-xl font-black text-accent-blue leading-none">{m.attendees.length}</p>
                                            <p className="text-[10px] text-gray-400">present</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white text-sm">{m.title}</p>
                                            <p className="text-xs text-gray-500">{m.date}{m.time ? ` · ${m.time}` : ''}{m.location ? ` · ${m.location}` : ''}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="font-mono text-sm font-bold text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-lg tracking-widest">
                                            PIN: {m.pin}
                                        </span>
                                        <button onClick={e => { e.stopPropagation(); handleDelete(m.id); }} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                        {isOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                                    </div>
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-4 border-t border-gray-100 dark:border-dark-border pt-3">
                                        {attendeeNames.length === 0 ? (
                                            <p className="text-xs text-gray-400 italic">No check-ins yet.</p>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {attendeeNames.map((name, i) => (
                                                    <span key={i} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30 px-2.5 py-1 rounded-full font-medium">
                                                        {name}
                                                    </span>
                                                ))}
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
    Regional: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
    State:    'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
    National: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/30',
};
const placementColors: Record<string, string> = {
    '1st Place': 'text-yellow-500',
    '2nd Place': 'text-gray-400',
    '3rd Place': 'text-amber-600',
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Competition Results</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track placements at regionals, state, and nationals — displayed on the public site.</p>
            </div>

            {/* Add form */}
            <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Add Result</h3>
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
                <button onClick={handleAdd} disabled={!form.competition.trim()} className={`${buttonClass} bg-accent-blue text-white hover:bg-accent-hover disabled:opacity-40`}>
                    <Plus size={15} /> Add Result
                </button>
            </div>

            {/* Year filter */}
            {years.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {years.map(y => (
                        <button key={y} onClick={() => setYearFilter(y)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${yearFilter === y ? 'bg-accent-blue text-white' : 'bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-accent-blue/50'}`}>
                            {y}
                        </button>
                    ))}
                </div>
            )}

            {/* Results grouped by level */}
            {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">No results recorded yet.</div>
            ) : (
                <div className="space-y-6">
                    {([['National', nationals], ['State', state], ['Regional', regional]] as [string, typeof filtered][]).map(([level, items]) =>
                        items.length === 0 ? null : (
                            <div key={level}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${levelColors[level]}`}>{level}</span>
                                    <span className="text-xs text-gray-400">{items.length} result{items.length !== 1 ? 's' : ''}</span>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {items.map(r => (
                                        <div key={r.id} className={`${cardClass} relative group`}>
                                            <button onClick={() => handleDelete(r.id)} className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                                                <Trash2 size={13} />
                                            </button>
                                            <div className="flex items-start gap-3 mb-3">
                                                <Award size={18} className={placementColors[r.placement] ?? 'text-accent-blue'} />
                                                <div>
                                                    <p className={`text-sm font-black ${placementColors[r.placement] ?? 'text-gray-900 dark:text-white'}`}>{r.placement}</p>
                                                    <p className="text-xs text-gray-500">{r.year}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{r.competition}</p>
                                            {r.members.length > 0 && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{r.members.join(', ')}</p>
                                            )}
                                            {r.notes && <p className="text-xs text-gray-400 mt-1 italic">{r.notes}</p>}
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add General Resource</h3>
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
                        className={`${buttonClass} bg-accent-blue text-white w-full`}
                    >
                        Add Resource
                    </button>
                </div>
            </div>
            <div className={`lg:col-span-2 ${cardClass}`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Resource Library</h3>
                <div className="space-y-2">
                    {resources.map(r => (
                        <div key={r.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-accent-blue" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">{r.title}</p>
                                        <span className="text-[10px] bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded uppercase">{r.type}</span>
                                    </div>
                                    <a href={r.url} target="_blank" className="text-xs text-blue-500 hover:underline">{r.url}</a>
                                </div>
                            </div>
                            <button onClick={async () => {
                                if (await confirm('Delete Resource', 'Delete this resource?', true, 'Delete')) {
                                    deleteResource(r.id);
                                }
                            }} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
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
                <p className="text-xs text-gray-500 mt-2">This event will be displayed on the home page countdown timer.</p>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Settings size={18} /> General Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Remind Join Link</label>
                        <input value={remind} onChange={e => setRemind(e.target.value)} className={inputClass} placeholder="https://www.remind.com/join/..." />
                        <p className="text-xs text-gray-500 mt-1">Controls the "Join Remind" button on the student dashboard.</p>
                    </div>
                    
                    <div>
                        <label className={labelClass}>TSA Application Link (JotForm)</label>
                        <input value={jotform} onChange={e => setJotform(e.target.value)} className={inputClass} placeholder="https://form.jotform.com/..." />
                        <p className="text-xs text-gray-500 mt-1">The official chapter application form.</p>
                    </div>

                    <div>
                        <label className={labelClass}>District Paperwork Link</label>
                        <input value={district} onChange={e => setDistrict(e.target.value)} className={inputClass} placeholder="https://..." />
                        <p className="text-xs text-gray-500 mt-1">Link to the required LEISD district club paperwork.</p>
                    </div>

                    <div>
                        <label className={labelClass}>Dues Payment Link (SuccessFund)</label>
                        <input value={successFund} onChange={e => setSuccessFund(e.target.value)} className={inputClass} placeholder="https://www.successfund.com/..." />
                        <p className="text-xs text-gray-500 mt-1">Direct link to the payment portal for membership dues.</p>
                    </div>
                </div>
            </div>

            <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
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
                <button onClick={handleSave} className={`${buttonClass} bg-accent-blue text-white w-full hover:bg-accent-purple transition-colors shadow-lg shadow-accent-blue/20`}>
                    <Save size={16} /> Save All Settings
                </button>
            </div>

            <div className={`${cardClass} border-red-200 dark:border-red-900/30 mt-12`}>
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> Danger Zone
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Resetting the semester will archive all current members and clear competition interests.
                </p>
                <button className={`${buttonClass} bg-red-50 text-red-600 border border-red-200 hover:bg-red-100`}>
                    Archive Semester Data
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;
