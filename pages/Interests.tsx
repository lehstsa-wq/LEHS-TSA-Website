import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Trophy, Search, Users, Filter } from 'lucide-react';
import { SEO } from '../components/SEO';

const Interests: React.FC = () => {
  const { competitionInterests } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState('All');

  // Get unique events for filter
  const uniqueEvents = ['All', ...Array.from(new Set(competitionInterests.map(i => i.competitionName)))];

  const filteredInterests = competitionInterests.filter(interest => {
    const matchesSearch = interest.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          interest.competitionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          interest.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEvent = filterEvent === 'All' || interest.competitionName === filterEvent;
    
    return matchesSearch && matchesEvent;
  });

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in pb-20 transition-colors duration-500">
      <SEO title="Member Interests" description="Find partners for your competitions based on their skills and interests at Little Elm High School TSA." />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
                Member Interests
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Users className="text-accent-blue" /> Team Finder
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Find partners for your competitions based on their skills and interests.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, event, or skill..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue outline-none transition-all dark:text-white"
                />
              </div>
              <div className="md:w-64 relative">
                <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue outline-none transition-all dark:text-white appearance-none"
                >
                  {uniqueEvents.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInterests.length > 0 ? (
              filteredInterests.map((interest, index) => (
                <div key={index} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{interest.userName}</h3>
                      <p className="text-sm text-accent-blue font-medium flex items-center gap-1 mt-1">
                        <Trophy size={14} /> {interest.competitionName}
                      </p>
                    </div>
                  </div>
                  
                  {interest.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {interest.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-dark-border">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {interest.teamMembers && interest.teamMembers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Team Members</p>
                      <div className="flex flex-wrap gap-2">
                        {interest.teamMembers.map((member, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-accent-blue text-xs rounded-md border border-blue-100 dark:border-blue-900/30">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {interest.notes && (
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Notes</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-dark-bg p-3 rounded-lg border border-gray-100 dark:border-dark-border">
                        "{interest.notes}"
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl">
                <Users size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No interests found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interests;
