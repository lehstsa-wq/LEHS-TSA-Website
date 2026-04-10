
import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Users, Bell, Calendar, Settings,
  Plus, Trash2, X,
  Briefcase, FolderOpen, Image as ImageIcon,
  TrendingUp, AlertCircle, UserPlus, Activity, Archive,
  Star, FileText, ExternalLink,
  Link as LinkIcon, Save, ChevronDown, ChevronUp,
  AlertOctagon, CheckCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { Officer, Announcement } from '../types';
import { COMPETITIONS } from '../data/competitions';
import { SEO } from '../components/SEO';

type Tab = 'overview' | 'members' | 'updates' | 'leadership' | 'events' | 'projects' | 'gallery' | 'competitions' | 'interests' | 'resources' | 'issues' | 'settings';

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
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        addAnnouncement({ title, content, type, isPinned: false, visibility: 'public', imageUrl });
        setTitle('');
        setContent('');
        setImageUrl('');
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
                        <label className={labelClass}>Image URL (Optional)</label>
                        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={inputClass} placeholder="https://..." />
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
                                {a.imageUrl && <p className="text-xs text-accent-blue mt-1 flex items-center gap-1"><ImageIcon size={12}/> Has Image</p>}
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
    const [imageUrl, setImageUrl] = useState('');
    const [bio, setBio] = useState('');
    const [category, setCategory] = useState<Officer['category']>('Executive');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        addOfficer({ name, role, grade: '12th Grade', category, bio, imageUrl, email, order: officersList.length + 1 });
        setName(''); setRole(''); setEmail(''); setImageUrl(''); setBio('');
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
                        <div>
                            <label className={labelClass}>Image URL</label>
                            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={inputClass} placeholder="https://..." />
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
    const [form, setForm] = useState({ title: '', category: 'Software Development', year: '2025', description: '', award: '', imageUrl: '' });
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
                         <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className={inputClass} placeholder="Image URL (optional)" />
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
                        setForm({ title: '', category: 'Software Development', year: '2025', description: '', award: '', imageUrl: '' });
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

const CompetitionLinkRow = ({ comp, currentLinks, updateCompetitionLinks }: {
    comp: { id: string; title: string; category: string };
    currentLinks: Array<{ url: string; name: string }>;
    updateCompetitionLinks: (compId: string, links: Array<{ url: string; name: string }>) => void;
}) => {
    const [links, setLinks] = useState(currentLinks);
    // ref always holds latest value — fixes stale closure on onBlur handlers
    const latestLinks = useRef(links);

    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newUrl, setNewUrl] = useState('');

    // Only sync from parent when parent genuinely changes (e.g. another admin edits),
    // not every time Firestore echoes back our own save.
    const prevParent = useRef(currentLinks);
    useEffect(() => {
        if (prevParent.current !== currentLinks) {
            prevParent.current = currentLinks;
            // Don't overwrite if user is mid-edit
            if (!isAdding) {
                latestLinks.current = currentLinks;
                setLinks(currentLinks);
            }
        }
    }, [currentLinks, isAdding]);

    // Update a field in the local list; keep the ref in sync immediately
    const updateField = (i: number, field: 'url' | 'name', val: string) => {
        const updated = latestLinks.current.map((l, idx) =>
            idx === i ? { ...l, [field]: val } : l
        );
        latestLinks.current = updated;
        setLinks(updated);
    };

    // Persist current ref value to Firestore on blur
    const saveOnBlur = () => updateCompetitionLinks(comp.id, latestLinks.current);

    const removeLink = (i: number) => {
        const updated = latestLinks.current.filter((_, idx) => idx !== i);
        latestLinks.current = updated;
        setLinks(updated);
        updateCompetitionLinks(comp.id, updated);
    };

    const addLink = () => {
        if (!newUrl.trim()) return;
        const updated = [...latestLinks.current, {
            url: newUrl.trim(),
            name: newName.trim() || newUrl.trim(),
        }];
        latestLinks.current = updated;
        setLinks(updated);
        updateCompetitionLinks(comp.id, updated);
        setNewName('');
        setNewUrl('');
        setIsAdding(false);
    };

    return (
        <div className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{comp.title}</h4>
                    <span className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded uppercase">{comp.category}</span>
                </div>
                <span className="text-xs text-gray-400">{links.length} link{links.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="space-y-1.5 ml-1">
                {links.length === 0 && !isAdding && (
                    <p className="text-xs text-gray-400 italic">No links yet.</p>
                )}
                {links.map((link, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={link.name}
                            onChange={e => updateField(i, 'name', e.target.value)}
                            onBlur={saveOnBlur}
                            placeholder="Label (e.g. Rulebook)"
                            className="w-32 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-accent-blue"
                        />
                        <div className="relative flex-1">
                            <LinkIcon size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={link.url}
                                onChange={e => updateField(i, 'url', e.target.value)}
                                onBlur={saveOnBlur}
                                placeholder="Paste URL..."
                                className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg pl-7 pr-2 py-1 text-xs outline-none focus:ring-1 focus:ring-accent-blue"
                            />
                        </div>
                        {link.url && (
                            <a href={link.url} target="_blank" rel="noopener noreferrer"
                                className="p-1 text-accent-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                                <ExternalLink size={13} />
                            </a>
                        )}
                        <button onClick={() => removeLink(i)}
                            className="p-1 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                            <Trash2 size={13} />
                        </button>
                    </div>
                ))}

                {isAdding && (
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            autoFocus
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            placeholder="Label"
                            className="w-32 bg-gray-50 dark:bg-dark-bg border border-blue-400 dark:border-blue-600 rounded-lg px-2 py-1 text-xs outline-none"
                        />
                        <input
                            type="text"
                            value={newUrl}
                            onChange={e => setNewUrl(e.target.value)}
                            placeholder="Paste URL..."
                            className="flex-1 bg-gray-50 dark:bg-dark-bg border border-blue-400 dark:border-blue-600 rounded-lg px-2 py-1 text-xs outline-none"
                            onKeyDown={e => {
                                if (e.key === 'Enter') addLink();
                                if (e.key === 'Escape') { setIsAdding(false); setNewName(''); setNewUrl(''); }
                            }}
                        />
                        <button onClick={addLink}
                            className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded">
                            <CheckCircle size={13} />
                        </button>
                        <button onClick={() => { setIsAdding(false); setNewName(''); setNewUrl(''); }}
                            className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
                            <X size={13} />
                        </button>
                    </div>
                )}

                {!isAdding && (
                    <button onClick={() => setIsAdding(true)}
                        className="flex items-center gap-1 text-xs text-accent-blue hover:text-blue-500 font-medium mt-1">
                        <Plus size={11} /> Add link
                    </button>
                )}
            </div>
        </div>
    );
};

const CompetitionsTab: React.FC = () => {
    const { competitionLinks, updateCompetitionLinks } = useData();
    const [search, setSearch] = useState('');
    const filtered = COMPETITIONS.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

    const teamsLinks = competitionLinks['teams'] ?? [];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Competitions</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Add resource links (rulebooks, guides) for each event. Multiple links allowed.</p>
                </div>
                <input
                    placeholder="Search competitions..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="md:w-64 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border p-2 rounded-lg text-sm"
                />
            </div>

            {/* TEAMS special section */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 px-1">TEAMS Program</h3>
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
                    <CompetitionLinkRow
                        comp={{ id: 'teams', title: 'TEAMS — Tests of Engineering Aptitude, Mathematics & Science', category: 'stem' }}
                        currentLinks={teamsLinks}
                        updateCompetitionLinks={updateCompetitionLinks}
                    />
                </div>
            </div>

            {/* All competitions */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 px-1">Individual &amp; Team Competitions</h3>
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-gray-200 dark:divide-dark-border">
                        {filtered.map(comp => (
                            <CompetitionLinkRow
                                key={comp.id}
                                comp={comp}
                                currentLinks={competitionLinks[comp.id] ?? []}
                                updateCompetitionLinks={updateCompetitionLinks}
                            />
                        ))}
                    </div>
                </div>
            </div>
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
