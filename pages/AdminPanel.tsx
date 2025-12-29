
import React, { useState } from 'react';
import { 
  Shield, Users, Bell, Calendar, Settings, 
  Plus, Trash2, X, 
  Briefcase, FolderOpen, Image as ImageIcon,
  TrendingUp, AlertCircle, Key, UserPlus, Activity,
  Check, Star, FileText, ExternalLink, Loader2,
  Archive, RotateCcw, Link as LinkIcon, Save, Edit2, ChevronDown, ChevronUp
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Officer, Event, Project, GalleryItem, ResourceLink, User, Announcement } from '../types';
import { COMPETITIONS } from '../data/competitions';

type Tab = 'overview' | 'members' | 'updates' | 'leadership' | 'events' | 'projects' | 'gallery' | 'competitions' | 'resources' | 'settings';

// Shared Styles
const cardClass = "bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6";
const inputClass = "w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border p-2.5 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-colors placeholder-gray-400 text-sm";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";
const buttonClass = "px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2";

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in transition-colors duration-300 flex flex-col md:flex-row">
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
              { id: 'competitions', label: 'Competitions', icon: Briefcase },
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
           {activeTab === 'updates' && <UpdatesTab />}
           {activeTab === 'leadership' && <LeadershipTab />}
           {activeTab === 'events' && <EventsTab />}
           {activeTab === 'projects' && <ProjectsTab />}
           {activeTab === 'gallery' && <GalleryTab />}
           {activeTab === 'competitions' && <CompetitionsTab />}
           {activeTab === 'resources' && <ResourcesTab />}
           {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};

/* --- TAB COMPONENTS --- */

const OverviewTab: React.FC = () => {
    const { members, competitionInterests } = useData();
    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === 'active').length;
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
                <div className={cardClass}>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">System Status</p>
                    <h3 className="text-3xl font-bold text-green-500 mt-1">Online</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">Mock Data Mode</p>
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

const MembersTab: React.FC = () => {
    const { members, accessCodes, generateAccessCode, deleteAccessCode, updateMemberRole, updateMemberStatus, deleteMember } = useData();
    const [activeSection, setActiveSection] = useState<'directory' | 'codes'>('directory');
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    const handleGenerate = async (role: 'member' | 'officer') => {
        const code = await generateAccessCode(role);
        setGeneratedCode(code);
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
                                        <td className="p-3 flex gap-2">
                                            {m.role !== 'advisor' && (
                                            <>
                                            <button onClick={() => updateMemberRole(m.id, m.role === 'officer' ? 'member' : 'officer')} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded" title="Toggle Officer Role">
                                                <Shield size={14} />
                                            </button>
                                            <button onClick={() => deleteMember(m.id)} className="p-1 hover:bg-red-100 text-red-500 rounded" title="Remove Member">
                                                <Trash2 size={14} />
                                            </button>
                                            </>
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
                            <button onClick={() => handleGenerate('member')} className={`${buttonClass} bg-accent-blue text-white hover:bg-accent-hover`}>
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
                    <div className={cardClass}>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Active Codes</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {accessCodes.filter(c => c.status === 'unused').length === 0 && <p className="text-gray-500 text-sm">No unused codes.</p>}
                            {accessCodes.filter(c => c.status === 'unused').map(code => (
                                <div key={code.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                    <div>
                                        <p className="font-mono font-bold text-gray-900 dark:text-white">{code.id}</p>
                                        <p className="text-xs text-gray-500">{code.role.toUpperCase()} • {new Date(code.createdDate).toLocaleDateString()}</p>
                                    </div>
                                    <button onClick={() => deleteAccessCode(code.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UpdatesTab: React.FC = () => {
    const { announcements, addAnnouncement, deleteAnnouncement } = useData();
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
                    <button type="submit" className={`${buttonClass} w-full bg-accent-blue text-white hover:bg-accent-hover`}>
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
                            <button onClick={() => deleteAnnouncement(a.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
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
                                        <button onClick={() => deleteOfficer(o.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
                            <button onClick={() => deleteEvent(e.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
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
                        <button onClick={() => deleteProject(p.id)} className="absolute top-2 right-2 p-1.5 bg-white dark:bg-dark-bg rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"><Trash2 size={14}/></button>
                        
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
                        <img src={item.imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => deleteGalleryItem(item.id)} className="text-white hover:text-red-400"><Trash2 size={24}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const CompetitionsTab: React.FC = () => {
    const { competitionLinks, updateCompetitionLink } = useData();
    const [search, setSearch] = useState('');
    const filtered = COMPETITIONS.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Competitions</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Add resource links (rulebooks, guides) for each event.</p>
                </div>
                <input 
                    placeholder="Search competitions..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    className="md:w-64 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border p-2 rounded-lg text-sm"
                />
             </div>

             <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-sm">
                 <div className="divide-y divide-gray-200 dark:divide-dark-border">
                     {filtered.map(comp => {
                         const currentLink = competitionLinks[comp.id] || '';
                         return (
                             <div key={comp.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                 <div className="md:w-1/3">
                                     <h4 className="font-bold text-gray-900 dark:text-white">{comp.title}</h4>
                                     <span className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded uppercase">{comp.category}</span>
                                 </div>
                                 <div className="md:w-2/3 flex gap-2">
                                     <div className="relative flex-grow">
                                        <input 
                                            type="text" 
                                            placeholder="Paste Link (Google Drive, PDF URL...)"
                                            value={currentLink}
                                            onChange={(e) => updateCompetitionLink(comp.id, e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                                        />
                                        <LinkIcon size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                     </div>
                                     {currentLink && (
                                         <a href={currentLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 dark:bg-blue-900/20 text-accent-blue rounded-lg hover:bg-accent-blue hover:text-white transition-colors">
                                             <ExternalLink size={18} />
                                         </a>
                                     )}
                                 </div>
                             </div>
                         );
                     })}
                 </div>
             </div>
        </div>
    );
};

const ResourcesTab: React.FC = () => {
    const { resources, addResource, deleteResource } = useData();
    const [form, setForm] = useState({ title: '', url: '', category: 'Competition', description: '' });

    return (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
             <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add General Resource</h3>
                <div className="space-y-3">
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} placeholder="Title (e.g. Medical Form)" />
                    <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} className={inputClass} placeholder="URL" />
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}>
                        <option>Competition</option><option>Officer</option><option>Study</option>
                    </select>
                    <button 
                        onClick={() => {
                            if(!form.title || !form.url) return;
                            addResource({...form, type: 'Link', accessLevel: 'member'});
                            setForm({ title: '', url: '', category: 'Competition', description: '' });
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
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{r.title}</p>
                                    <a href={r.url} target="_blank" className="text-xs text-blue-500 hover:underline">{r.url}</a>
                                </div>
                            </div>
                            <button onClick={() => deleteResource(r.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
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

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className={cardClass}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Settings size={18} /> General Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Remind Join Link</label>
                        <div className="flex gap-2">
                            <input value={remind} onChange={e => setRemind(e.target.value)} className={inputClass} />
                            <button onClick={() => updateSiteSettings({ remindLink: remind })} className={`${buttonClass} bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-900 dark:text-white`}>
                                <Save size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Controls the "Join Remind" button on the student dashboard.</p>
                    </div>
                </div>
            </div>
            <div className={`${cardClass} border-red-200 dark:border-red-900/30`}>
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
