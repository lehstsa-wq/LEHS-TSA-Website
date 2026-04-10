
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bell, FileText, Calendar, Trophy, User, BookOpen, Zap, Star, ExternalLink, Users, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AIAdvisor from '../components/AIAdvisor';
import { SEO } from '../components/SEO';

const Dashboard: React.FC = () => {
  const { user, isOfficer } = useAuth();
  const { announcements, resources, competitionInterests, problemReports } = useData();

  // Get the latest 2 announcements
  const recentUpdates = announcements.slice(0, 2);
  
  // Get the latest 3 resources
  const recentResources = resources.slice(0, 3);

  // Get user's interests
  const myInterests = competitionInterests.filter(interest => interest.userId === user?.id);

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in pb-20 transition-colors duration-500">
      <SEO title="Dashboard" description="Member dashboard for Little Elm High School TSA." />
      {/* Header / Welcome Section */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center text-accent-blue text-3xl font-bold border border-gray-200 dark:border-dark-border overflow-hidden shadow-md">
                  {user?.avatar ? <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" /> : user?.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Welcome, {user?.name.split(' ')[0]}
                  </h1>
                  <Star className="text-accent-gold" size={20} fill="currentColor" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-widest bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                        Active Member
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-1">
                      <Zap size={14} className="text-yellow-500" /> Grade {user?.grade}
                    </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
                {isOfficer && (
                    <Link to="/admin" className="relative flex items-center gap-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border hover:border-red-500/50 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md font-bold text-sm">
                        <Shield size={18} className="text-red-500" /> Admin Console
                        {problemReports.filter(r => r.status === 'Open').length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                                {problemReports.filter(r => r.status === 'Open').length}
                            </span>
                        )}
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Main Portal Content */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Check-in banner */}
                <Link to="/check-in"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/10 transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 bg-accent-blue text-white rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-accent-blue/30">
                    <QrCode size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Meeting Check-In</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enter your PIN to mark attendance for today's meeting</p>
                  </div>
                  <span className="text-xs font-bold text-accent-blue px-3 py-1.5 rounded-lg bg-accent-blue/10 shrink-0 group-hover:bg-accent-blue group-hover:text-white transition-all">
                    Check In →
                  </span>
                </Link>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Resources', icon: BookOpen, path: '/resources', color: 'blue' },
                    { label: 'Updates', icon: Bell, path: '/updates', color: 'purple' },
                    { label: 'Events', icon: Calendar, path: '/events', color: 'green' },
                    { label: 'Directory', icon: Users, path: '/directory', color: 'yellow' }
                  ].map((item, i) => (
                    <Link
                      key={i}
                      to={item.path}
                      className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-5 rounded-2xl transition-all group shadow-sm hover:border-accent-blue/40 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="w-12 h-12 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-blue group-hover:text-white transition-all">
                         <item.icon size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">{item.label}</span>
                      <p className="text-[10px] text-gray-500 mt-1">Explore section</p>
                    </Link>
                  ))}
                </div>

                {/* AI Advisor Feature */}
                <div className="relative animate-fade-in">
                    <AIAdvisor />
                </div>

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
                          {myInterests.length > 0 ? (
                              <div className="w-full text-left">
                                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">My Interests</h3>
                                  <ul className="space-y-2 mb-4">
                                      {myInterests.map((interest, i) => (
                                          <li key={i} className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-surface p-2 rounded border border-gray-200 dark:border-dark-border">
                                              <span className="font-semibold">{interest.competitionName}</span>
                                              {interest.skills.length > 0 && <span className="text-gray-500 ml-2">({interest.skills.join(', ')})</span>}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          ) : (
                              <>
                                  <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3">
                                    <Zap size={20} />
                                  </div>
                                  <p className="text-gray-500 text-xs mb-4 font-medium">
                                      Browse events and indicate your interest to get placed on a team.
                                  </p>
                              </>
                          )}
                          <div className="flex gap-2 mt-auto w-full">
                              <Link 
                                  to="/competitions" 
                                  className="flex-1 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 text-center hover:scale-105"
                              >
                                  Explore
                              </Link>
                              <Link 
                                  to="/interests" 
                                  className="group flex-1 bg-accent-blue text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm shadow-accent-blue/20 hover:shadow-accent-purple/40 hover:bg-accent-purple text-center flex items-center justify-center gap-1 hover:scale-105 hover:-translate-y-0.5"
                              >
                                  <Users size={14} className="group-hover:scale-110 transition-transform" /> All Interests
                              </Link>
                          </div>
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
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <BookOpen size={18} className="text-accent-blue" /> Featured Resources
                      </h2>
                      <Link to="/resources" className="text-xs font-bold text-accent-blue hover:text-accent-hover transition-colors">View All</Link>
                    </div>
                    <ul className="space-y-3">
                        {recentResources.length > 0 ? recentResources.map((resource, i) => (
                            <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-dark-bg/50 rounded-xl hover:border-accent-blue/30 border border-transparent transition-all group cursor-pointer">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-white dark:bg-dark-surface rounded-lg shadow-sm">
                                      <FileText size={14} className="text-gray-400 group-hover:text-accent-blue transition-colors" />
                                    </div>
                                    <div className="truncate">
                                      <p className="text-sm text-gray-900 dark:text-white font-medium truncate">{resource.title}</p>
                                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{resource.type}</p>
                                    </div>
                                </div>
                                <ExternalLink size={14} className="text-gray-400 dark:text-gray-600 group-hover:text-accent-blue transition-colors" />
                            </a>
                        )) : (
                          <div className="p-4 text-center text-gray-500 text-sm italic">No resources available.</div>
                        )}
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
