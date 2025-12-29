
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bell, Download, FileText, Calendar, Trophy, ChevronRight, User, BookOpen, Sparkles, Zap, Star, CheckCircle, XCircle, AlertTriangle, ExternalLink, Lock, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AIAdvisor from '../components/AIAdvisor';

const Dashboard: React.FC = () => {
  const { user, isOfficer } = useAuth();
  const { announcements, siteSettings } = useData();

  // Get the latest 2 announcements
  const recentUpdates = announcements.slice(0, 2);

  // Membership Status Check
  const isFullyActive = isOfficer || (user?.status === 'active' && user?.duesPaid && user?.appCompleted && user?.remindJoined);
  
  // Requirement Item Component
  const RequirementItem = ({ completed, label, actionLink, actionText }: { completed: boolean, label: string, actionLink?: string, actionText?: string }) => (
     <div className={`flex items-center justify-between p-3 rounded-lg border ${completed ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'}`}>
        <div className="flex items-center gap-3">
           {completed ? <CheckCircle size={18} className="text-green-600 dark:text-green-400" /> : <XCircle size={18} className="text-red-500" />}
           <span className={`text-sm font-medium ${completed ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>{label}</span>
        </div>
        {!completed && actionLink && (
            <a href={actionLink} target={actionLink.startsWith('http') ? '_blank' : '_self'} className="text-xs font-bold bg-white dark:bg-black/20 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors shadow-sm">
                {actionText || 'Complete'}
            </a>
        )}
     </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in pb-20 transition-colors duration-500">
      {/* Header / Welcome Section */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center text-accent-blue text-3xl font-bold border border-gray-200 dark:border-dark-border overflow-hidden shadow-md">
                  {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user?.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Welcome, {user?.name.split(' ')[0]}
                  </h1>
                  {isFullyActive && <Star className="text-accent-gold" size={20} fill="currentColor" />}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-widest ${
                        isFullyActive 
                        ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30'
                    }`}>
                        {isFullyActive ? 'Active Member' : 'Registration Pending'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-1">
                      <Zap size={14} className="text-yellow-500" /> Grade {user?.grade}
                    </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
                {isOfficer && (
                    <Link to="/admin" className="flex items-center gap-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border hover:border-red-500/50 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md font-bold text-sm">
                        <Shield size={18} className="text-red-500" /> Admin Console
                    </Link>
                )}
                <div className="h-10 w-px bg-gray-200 dark:bg-dark-border mx-2 hidden md:block"></div>
                <Link to="/settings" className="p-2.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl text-gray-500 hover:text-accent-blue transition-colors">
                  <User size={22} />
                </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* MEMBERSHIP CHECKLIST CARD */}
        {!isFullyActive && (
            <div className="mb-10 bg-white dark:bg-dark-surface border border-red-200 dark:border-red-900/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                           <AlertTriangle className="text-red-500" /> Action Required
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                           Complete the following steps to unlock full member access, including competition registration and resources.
                        </p>
                        <div className="text-xs text-gray-500 italic">
                            Wait for an officer to verify your steps.
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-3">
                        <RequirementItem 
                            completed={!!user?.appCompleted} 
                            label="Submit Membership Application" 
                            actionLink="/join"
                            actionText="Apply"
                        />
                        <RequirementItem 
                            completed={!!user?.duesPaid} 
                            label="Pay Annual Dues ($50)" 
                            actionLink="#" // Add actual payment link if available
                            actionText="Pay Now"
                        />
                        <RequirementItem 
                            completed={!!user?.remindJoined} 
                            label="Join REMIND Group" 
                            actionLink={siteSettings?.remindLink}
                            actionText="Join Remind"
                        />
                    </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Main Portal Content */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Resources', icon: BookOpen, path: '/resources', color: 'blue' },
                    { label: 'Updates', icon: Bell, path: '/updates', color: 'purple' },
                    { label: 'Events', icon: Calendar, path: '/events', color: 'green' },
                    { label: 'Awards', icon: Trophy, path: '/gallery', color: 'yellow' }
                  ].map((item, i) => (
                    <Link 
                      key={i}
                      to={isFullyActive ? item.path : '#'} 
                      className={`bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-5 rounded-2xl transition-all group shadow-sm ${
                          isFullyActive 
                          ? 'hover:border-accent-blue/40 hover:-translate-y-1 hover:shadow-xl' 
                          : 'opacity-70 cursor-not-allowed'
                      }`}
                      onClick={e => !isFullyActive && e.preventDefault()}
                    >
                      <div className={`w-12 h-12 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-4 ${isFullyActive && 'group-hover:bg-accent-blue group-hover:text-white'} transition-all`}>
                         {isFullyActive ? <item.icon size={24} /> : <Lock size={20} />}
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">{item.label}</span>
                      <p className="text-[10px] text-gray-500 mt-1">{isFullyActive ? 'Explore section' : 'Locked'}</p>
                    </Link>
                  ))}
                </div>

                {/* AI Advisor Feature */}
                {isFullyActive && (
                    <div className="relative animate-fade-in">
                        <AIAdvisor />
                    </div>
                )}

                {/* Updates & Activity */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Latest Announcements */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden shadow-sm h-full">
                      <div className="p-5 border-b border-gray-200 dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-white/5">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                              <Bell size={18} className="text-accent-blue" /> Latest Updates
                          </h2>
                          <Link to="/updates" className="text-xs font-bold text-accent-blue hover:text-accent-hover transition-colors">View All</Link>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-dark-border">
                          {recentUpdates.length > 0 ? recentUpdates.map(update => (
                              <div key={update.id} className="p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                  <div className="flex justify-between items-center mb-2">
                                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/10 uppercase tracking-tighter">
                                          {update.type}
                                      </span>
                                      <span className="text-[10px] text-gray-500 font-medium">{update.date}</span>
                                  </div>
                                  <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">{update.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed">{update.content}</p>
                              </div>
                          )) : (
                            <div className="p-10 text-center text-gray-500 text-sm">No recent updates.</div>
                          )}
                      </div>
                  </div>

                  {/* My Events Status */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Trophy size={18} className="text-accent-blue" /> Competitions
                      </h2>
                      <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg/50 border border-dashed border-gray-200 dark:border-dark-border rounded-xl p-6 text-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3">
                            {isFullyActive ? <Zap size={20} /> : <Lock size={20} />}
                          </div>
                          <p className="text-gray-500 text-xs mb-4 font-medium">
                              {isFullyActive ? "Browse events and indicate your interest to get placed on a team." : "Complete membership steps to access competitions."}
                          </p>
                          <Link 
                              to={isFullyActive ? "/competitions" : "#"} 
                              className={`bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${isFullyActive ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}
                          >
                              Explore Competitions
                          </Link>
                      </div>
                  </div>
                </div>

            </div>

            {/* Right: Sidebar / Widgets */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Member Identity / Card */}
                <div className="bg-gradient-to-br from-accent-blue to-accent-purple p-6 rounded-2xl shadow-xl text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Member Card</h4>
                        <p className="text-xl font-bold mt-1">Little Elm TSA</p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                        <Zap size={20} />
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Full Name</p>
                      <p className="text-lg font-semibold tracking-wide">{user?.name}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Member ID</p>
                        <p className="text-sm font-bold font-mono bg-white/10 px-2 py-0.5 rounded">{user?.memberId || 'PENDING'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Grade</p>
                        <p className="text-sm font-bold">{user?.grade}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Downloads */}
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                        <FileText size={18} className="text-accent-blue" /> Essential Files
                    </h2>
                    <ul className="space-y-3">
                        {[
                            { name: 'Medical Release Form.pdf', size: '1.2 MB' },
                            { name: '2025 Rulebook.pdf', size: '4.8 MB' },
                            { name: 'Meeting Agenda Oct.docx', size: '256 KB' }
                        ].map((file, i) => (
                            <li key={i} className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-dark-bg/50 rounded-xl hover:border-accent-blue/30 border border-transparent transition-all group cursor-pointer">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-white dark:bg-dark-surface rounded-lg shadow-sm">
                                      <FileText size={14} className="text-gray-400 group-hover:text-accent-blue transition-colors" />
                                    </div>
                                    <div className="truncate">
                                      <p className="text-sm text-gray-900 dark:text-white font-medium truncate">{file.name}</p>
                                      <p className="text-[10px] text-gray-500">{file.size}</p>
                                    </div>
                                </div>
                                <Download size={14} className="text-gray-400 dark:text-gray-600 group-hover:text-accent-blue transition-colors" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
