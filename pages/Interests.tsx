import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Trophy, Search, Users, Filter, X, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SEO } from '../components/SEO';

const Interests: React.FC = () => {
  const { competitionInterests, deleteInterest } = useData();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState('All');
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const [mySubmissionsOpen, setMySubmissionsOpen] = useState(true);

  // User's own submissions
  const mySubmissions = user
    ? competitionInterests.filter(i => i.userId === user.id)
    : [];

  // Get unique events for filter (exclude user's own from community list)
  const communityInterests = competitionInterests.filter(i => !user || i.userId !== user.id);
  const uniqueEvents = ['All', ...Array.from(new Set(communityInterests.map(i => i.competitionName))).sort()];

  const filteredCommunity = communityInterests.filter(interest => {
    const matchesSearch =
      interest.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interest.competitionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interest.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEvent = filterEvent === 'All' || interest.competitionName === filterEvent;
    return matchesSearch && matchesEvent;
  });

  const handleWithdraw = async (interest: typeof mySubmissions[0]) => {
    if (!interest.id) return;
    setWithdrawingId(interest.id);
    try {
      await deleteInterest(interest.id);
      showToast('Interest withdrawn.', 'success');
    } catch {
      showToast('Failed to withdraw. Try again.', 'error');
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in pb-20 transition-colors duration-500">
      <SEO title="Member Interests" description="Find partners for your competitions based on their skills and interests at Little Elm High School TSA." />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
              Member Interests
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Users className="text-accent-blue" /> Team Finder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Find teammates for your competitions. See who else is interested and connect.
            </p>
          </div>

          {/* ── My Submissions ── */}
          {user && mySubmissions.length > 0 && (
            <div className="bg-white dark:bg-dark-surface border border-accent-blue/30 rounded-2xl shadow-sm mb-8 overflow-hidden">
              <button
                onClick={() => setMySubmissionsOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-accent-blue" />
                  <span className="font-bold text-gray-900 dark:text-white">My Submissions</span>
                  <span className="text-xs font-bold bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded-full">
                    {mySubmissions.length}
                  </span>
                </div>
                {mySubmissionsOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>

              {mySubmissionsOpen && (
                <div className="px-6 pb-5 space-y-3 border-t border-gray-100 dark:border-dark-border pt-4">
                  {mySubmissions.map((sub, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-4 p-4 bg-blue-50/50 dark:bg-accent-blue/5 rounded-xl border border-blue-100 dark:border-accent-blue/20"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy size={14} className="text-accent-blue flex-shrink-0" />
                          <span className="font-bold text-gray-900 dark:text-white text-sm">{sub.competitionName}</span>
                          <span className="text-xs text-gray-400 ml-auto shrink-0">{new Date(sub.timestamp).toLocaleDateString()}</span>
                        </div>
                        {sub.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {sub.skills.map(s => (
                              <span key={s} className="px-2 py-0.5 bg-accent-blue/10 text-accent-blue rounded text-xs font-medium">{s}</span>
                            ))}
                          </div>
                        )}
                        {(sub.teamMembers ?? []).length > 0 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Team: {(sub.teamMembers ?? []).join(', ')}
                          </p>
                        )}
                        {sub.notes && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">"{sub.notes}"</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleWithdraw(sub)}
                        disabled={withdrawingId === sub.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-900/30 transition-colors disabled:opacity-50 shrink-0"
                      >
                        <X size={12} />
                        {withdrawingId === sub.id ? 'Removing…' : 'Withdraw'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Search & Filter ── */}
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm p-5 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name, event, or skill…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue outline-none transition-all dark:text-white text-sm"
                />
              </div>
              <div className="md:w-60 relative">
                <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                <select
                  value={filterEvent}
                  onChange={e => setFilterEvent(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue outline-none transition-all dark:text-white text-sm appearance-none"
                >
                  {uniqueEvents.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Community Cards ── */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Community — {filteredCommunity.length} member{filteredCommunity.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCommunity.length > 0 ? (
                filteredCommunity.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-accent-blue/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{interest.userName}</h3>
                        <p className="text-sm text-accent-blue font-medium flex items-center gap-1 mt-0.5">
                          <Trophy size={12} /> {interest.competitionName}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(interest.timestamp).toLocaleDateString()}</span>
                    </div>

                    {interest.skills.length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {interest.skills.map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-dark-border font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(interest.teamMembers ?? []).length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Team Members</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(interest.teamMembers ?? []).map((member, i) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-accent-blue text-xs rounded-md border border-blue-100 dark:border-blue-900/30">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {interest.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-dark-bg p-3 rounded-lg border border-gray-100 dark:border-dark-border">
                        "{interest.notes}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl">
                  <Users size={44} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No members found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Interests;
