
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, AlertTriangle, Lock, Search, 
  ChevronRight, CheckCircle, 
  Briefcase, PenTool, Cpu, Hammer, Zap, Plane, Layers, X,
  AlertCircle, Users, Clock, FileText, Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { COMPETITIONS } from '../data/competitions';

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: Trophy },
  { id: 'stem', name: 'STEM & General', icon: Cpu },
  { id: 'arch', name: 'Architecture & Construction', icon: Hammer },
  { id: 'man', name: 'Manufacturing', icon: Layers },
  { id: 'trans', name: 'Transportation', icon: Plane },
  { id: 'energy', name: 'Energy & Power', icon: Zap },
  { id: 'ict', name: 'ICT & Computer Science', icon: Cpu },
  { id: 'design', name: 'Design & Visual', icon: PenTool },
  { id: 'leadership', name: 'Leadership & Career', icon: Briefcase },
];

const Competitions: React.FC = () => {
  const { user, isOfficer } = useAuth();
  const { submitInterest, competitionLinks } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Interest Form State
  const [skills, setSkills] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Membership Check
  const isFullyActive = isOfficer || (user?.status === 'active' && user?.duesPaid && user?.appCompleted && user?.remindJoined);

  const filteredCompetitions = COMPETITIONS.filter(comp => {
    const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInterestSubmit = async () => {
      if (!user) return;
      setError('');
      try {
        await submitInterest({
            userId: user.id,
            userName: user.name,
            competitionId: selectedEvent.id,
            competitionName: selectedEvent.title,
            skills,
            notes
        });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setSkills([]);
            setNotes('');
            setSelectedEvent(null);
        }, 2000);
      } catch (err) {
        setError('Failed to submit interest. Please try again later.');
        console.error(err);
      }
  };

  const toggleSkill = (skill: string) => {
      if(skills.includes(skill)) setSkills(skills.filter(s => s !== skill));
      else setSkills([...skills, skill]);
  };

  // Get dynamic link if available
  const currentResourceLink = selectedEvent ? competitionLinks[selectedEvent.id] : null;

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Official Guide
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">TSA Competitions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            Explore 40 high school competitions for the 2024-2025 year. From coding to engineering, there's an event for everyone.
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 flex items-start gap-3 max-w-3xl">
             <AlertTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" size={20} />
             <p className="text-sm text-yellow-800 dark:text-yellow-200">
               <strong>2024-2025 Update:</strong> These events reflect the current National TSA High School Competitive Events Summary.
             </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
           <div className="flex-grow overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 no-scrollbar">
              <div className="flex gap-2">
                 {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                        activeCategory === cat.id ? 'bg-accent-blue text-white border-accent-blue' : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border hover:bg-gray-50'
                      }`}
                    >
                       <cat.icon size={16} /> {cat.name}
                    </button>
                 ))}
              </div>
           </div>
           <div className="relative shrink-0 w-full lg:w-64">
              <input 
                type="text" 
                placeholder="Find an event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-white focus:border-accent-blue outline-none transition-colors"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
           {filteredCompetitions.map(comp => (
             <div key={comp.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 hover:border-accent-blue/40 transition-all flex flex-col h-full group relative overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{comp.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
                   {comp.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded flex items-center gap-1">
                        <Users size={12} /> Max {comp.details.maxTeamSize}
                    </span>
                    {comp.details.timeLimit !== 'N/A' && (
                        <span className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded flex items-center gap-1">
                            <Clock size={12} /> {comp.details.timeLimit}
                        </span>
                    )}
                </div>
                <button 
                  onClick={() => setSelectedEvent(comp)}
                  className="w-full mt-auto bg-gray-50 dark:bg-white/5 hover:bg-accent-blue hover:text-white text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border py-2 rounded-lg transition-all text-sm flex items-center justify-center"
                >
                   Event Details <ChevronRight size={16} className="ml-1" />
                </button>
             </div>
           ))}
        </div>
      </div>

      {selectedEvent && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white dark:bg-[#1A2235] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-white/5 rounded-full z-10 hover:bg-gray-200">
                 <X size={20} className="text-gray-500 dark:text-white" />
              </button>
              
              <div className="p-8">
                 <div className="flex items-start justify-between mb-6">
                    <div>
                        <span className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-2 block">{selectedEvent.category === 'ict' ? 'Computer Science' : selectedEvent.category.toUpperCase()}</span>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedEvent.title}</h2>
                    </div>
                 </div>

                 <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 border-b border-gray-200 dark:border-dark-border pb-8">
                    {selectedEvent.details.fullDescription}
                 </p>

                 <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Users size={18} className="text-accent-blue" /> Eligibility</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.details.eligibility}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><FileText size={18} className="text-accent-blue" /> Procedure Overview</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.details.procedure}</p>
                    </div>
                    <div>
                         <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Briefcase size={18} className="text-accent-blue" /> Career Connections</h4>
                         <div className="flex flex-wrap gap-2">
                             {selectedEvent.details.careers?.map((career: string) => (
                                 <span key={career} className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{career}</span>
                             ))}
                         </div>
                    </div>
                    <div>
                         <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Download size={18} className="text-accent-blue" /> Resources</h4>
                         {currentResourceLink ? (
                             <a 
                                href={currentResourceLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-accent-blue px-4 py-2 rounded-lg font-bold text-sm hover:bg-accent-blue hover:text-white transition-colors"
                             >
                                 <FileText size={16} /> Download Official Guide
                             </a>
                         ) : (
                             <p className="text-sm text-gray-500 italic">No resource link added yet. Check back soon.</p>
                         )}
                    </div>
                 </div>
                 
                 {/* INTEREST FORM SECTION */}
                 <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-xl border border-gray-200 dark:border-dark-border">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="text-accent-blue" size={20} /> Join This Team
                    </h3>
                    
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    {submitted ? (
                        <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-lg text-center font-bold">
                            Interest Submitted! An officer will contact you.
                        </div>
                    ) : (
                        isFullyActive ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">My Relevant Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Coding', 'Design', 'Building', 'Writing', 'Public Speaking', 'Research'].map(skill => (
                                            <button 
                                                key={skill}
                                                onClick={() => toggleSkill(skill)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                                                    skills.includes(skill) 
                                                    ? 'bg-accent-blue text-white border-accent-blue' 
                                                    : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
                                                }`}
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Notes</label>
                                    <textarea 
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="e.g., I have a partner in mind..."
                                        className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg p-3 text-sm outline-none focus:border-accent-blue min-h-[80px]"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setSelectedEvent(null)} className="flex-1 bg-white dark:bg-white/5 border border-gray-300 dark:border-dark-border py-3 rounded-lg font-bold">Cancel</button>
                                    <button onClick={handleInterestSubmit} className="flex-1 bg-accent-blue text-white py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors shadow-lg shadow-accent-blue/20">
                                        Submit Interest
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-white/5 p-6 rounded-xl text-center border border-dashed border-gray-300 dark:border-gray-600">
                                <Lock className="mx-auto text-gray-400 mb-3" size={32} />
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Membership Required</h4>
                                <p className="text-sm text-gray-500 mb-4">
                                    To sign up for competitions, you must complete your membership application.
                                </p>
                                <Link to="/dashboard" className="inline-block bg-gray-200 dark:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-300">
                                    Go to Dashboard
                                </Link>
                            </div>
                        )
                    )}
                 </div>
              </div>
           </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Competitions;
