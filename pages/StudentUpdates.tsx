
import React, { useState } from 'react';
import { Bell, Search, Pin, Calendar, User, FileText, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

const StudentUpdates: React.FC = () => {
  const { announcements } = useData();
  const [filter, setFilter] = useState('All');

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
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in transition-colors duration-300">
      <div className="bg-white dark:bg-[#0E1320] border-b border-gray-200 dark:border-dark-border pt-24 pb-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="bg-accent-blue/10 text-accent-blue text-xs font-bold px-2 py-1 rounded mb-4 inline-block border border-accent-blue/20">Members Only</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Student Updates</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Internal announcements, deadlines, and news for TSA members.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <input 
                    type="text" 
                    placeholder="Search updates..." 
                    className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                />
                <Search size={18} className="absolute left-3 top-3 text-gray-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {['All', 'Meeting', 'Deadline', 'Competition', 'Fundraiser'].map(type => (
                    <button 
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                            filter === type 
                            ? 'bg-accent-blue text-white border-accent-blue' 
                            : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:text-white'
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
                <div key={update.id} className={`bg-white dark:bg-dark-surface border ${update.isPinned ? 'border-accent-blue/30' : 'border-gray-200 dark:border-dark-border'} rounded-xl p-6 sm:p-8 animate-fade-in shadow-sm`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide border ${
                                update.type === 'Deadline' ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' : 
                                update.type === 'Meeting' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' : 
                                update.type === 'Fundraiser' ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                                'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600/30'
                            }`}>
                                {update.type}
                            </span>
                            <span className="text-gray-500 text-xs flex items-center">
                                <Calendar size={12} className="mr-1" /> {update.date}
                            </span>
                        </div>
                        {update.isPinned && (
                            <div className="text-accent-blue" title="Pinned Post">
                                <Pin size={18} fill="currentColor" className="transform rotate-45" />
                            </div>
                        )}
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">{update.title}</h2>
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                        {update.content}
                    </div>

                    {/* Attachments Section */}
                    {update.attachments && update.attachments.length > 0 && (
                        <div className="mb-6 space-y-2">
                            <h4 className="text-xs font-bold text-gray-500 uppercase">Attachments</h4>
                            <div className="flex flex-wrap gap-3">
                                {update.attachments.map((att, i) => (
                                    <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border px-3 py-2 rounded-lg text-sm text-accent-blue hover:underline">
                                        {att.type === 'file' ? <FileText size={14}/> : <ExternalLink size={14}/>}
                                        {att.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center border-t border-gray-200 dark:border-dark-border pt-4">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center text-gray-400 border border-gray-200 dark:border-dark-border mr-3">
                            <User size={14} />
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Posted by {update.author}</span>
                    </div>
                </div>
            ))}

            {sortedUpdates.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border border-dashed rounded-xl">
                    <p className="text-gray-500">No updates found matching your filter.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default StudentUpdates;
