
import React, { useState, useEffect } from 'react';
import { Search, Pin, Calendar, User, FileText, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

const StudentUpdates: React.FC = () => {
  const { announcements } = useData();
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');

  // Mark all current announcements as read when page is visited
  useEffect(() => {
    if (!user) return;
    const key = `lehs-seen-${user.id}`;
    const ids = announcements.map(a => a.id);
    localStorage.setItem(key, JSON.stringify(ids));
  }, [announcements, user]);

  const filteredUpdates = filter === 'All' 
    ? announcements 
    : announcements.filter(a => a.type === filter);

  // Sort: Pinned first, then by date
  const sortedUpdates = [...filteredUpdates].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen animate-fade-in">
      <SEO title="Student Updates" description="Internal announcements, deadlines, and news for Little Elm High School TSA members." />
      <div className="bg-space-900 border-b border-space-500/30 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="bg-electric-500/10 text-electric-400 text-xs font-bold px-2 py-1 rounded mb-4 inline-block border border-electric-500/20">Members Only</span>
            <h1 className="text-4xl font-bold text-ink mb-4">Student Updates</h1>
            <p className="text-ink-muted text-lg">Internal announcements, deadlines, and news for TSA members.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Search updates..."
                    className="w-full bg-space-700/60 border border-space-500/50 rounded-lg pl-10 pr-4 py-2.5 text-ink focus:border-electric-500 focus:ring-1 focus:ring-electric-500/30 outline-none transition-colors placeholder-ink-muted"
                />
                <Search size={18} className="absolute left-3 top-3 text-ink-muted" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {['All', 'Meeting', 'Deadline', 'Competition', 'Fundraiser'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                            filter === type
                            ? 'bg-electric-500 text-white border-electric-500'
                            : 'bg-space-700/60 text-ink-muted border-space-500/50 hover:text-ink'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
            {sortedUpdates.map(update => (
                <div key={update.id} className={`card border ${update.isPinned ? 'border-electric-500/30' : 'border-space-500/30'} rounded-xl p-6 sm:p-8 animate-fade-in hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-electric-500 to-electric-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide border ${
                                update.type === 'Deadline' ? 'bg-gold-500/10 text-gold-400 border-gold-500/20' :
                                update.type === 'Meeting' ? 'bg-electric-500/10 text-electric-400 border-electric-500/20' :
                                update.type === 'Fundraiser' ? 'bg-electric-500/10 text-electric-400 border-electric-500/20' :
                                'bg-space-600/60 text-ink-muted border-space-500/30'
                            }`}>
                                {update.type}
                            </span>
                            <span className="text-ink-muted text-xs flex items-center">
                                <Calendar size={12} className="mr-1" /> {update.date}
                            </span>
                        </div>
                        {update.isPinned && (
                            <div className="text-electric-400" title="Pinned Post">
                                <Pin size={18} fill="currentColor" className="transform rotate-45" />
                            </div>
                        )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">{update.title}</h2>
                    <div className="text-ink-dim leading-relaxed whitespace-pre-line mb-6">
                        {update.content}
                    </div>

                    {/* Attachments Section */}
                    {update.attachments && update.attachments.length > 0 && (
                        <div className="mb-6 space-y-2">
                            <h4 className="text-xs font-bold text-ink-muted uppercase">Attachments</h4>
                            <div className="flex flex-wrap gap-3">
                                {update.attachments.map((att, i) => (
                                    <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-space-700/40 border border-space-500/30 px-3 py-2 rounded-lg text-sm text-electric-400 hover:underline">
                                        {att.type === 'file' ? <FileText size={14}/> : <ExternalLink size={14}/>}
                                        {att.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center border-t border-space-500/30 pt-4">
                        <div className="w-8 h-8 bg-space-700/40 rounded-full flex items-center justify-center text-ink-muted border border-space-500/30 mr-3">
                            <User size={14} />
                        </div>
                        <span className="text-sm text-ink-muted font-medium">Posted by {update.author}</span>
                    </div>
                </div>
            ))}

            {sortedUpdates.length === 0 && (
                <div className="text-center py-20 border border-space-500/30 border-dashed rounded-xl">
                    <p className="text-ink-muted">No updates found matching your filter.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default StudentUpdates;
