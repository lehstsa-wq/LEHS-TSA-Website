import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Code, PenTool, BookOpen, Users, ExternalLink, Download, ChevronDown, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Resources: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>('competition');

  const categories = [
    { id: 'competition', name: 'Competition Resources', icon: Trophy },
    { id: 'webmaster', name: 'Webmaster & Technical Resources', icon: Code },
    { id: 'design', name: 'Design & Presentation Tips', icon: PenTool },
    { id: 'study', name: 'Study & Career Resources', icon: BookOpen },
    { id: 'officer', name: 'Officer & Leadership Tools', icon: Users },
  ];

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Resource Hub
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">TSA Resources</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Everything you need to succeed in TSA competitions and beyond. From official guidelines to skill-building resources.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        
        {/* LOCK OVERLAY IF NOT AUTHENTICATED */}
        {!isAuthenticated && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50/80 dark:bg-dark-bg/80 backdrop-blur-sm pt-32 pb-64 px-4 text-center">
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-8 rounded-2xl shadow-2xl max-w-lg w-full">
                    <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent-blue/20">
                        <Lock size={32} className="text-accent-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Members Only Content</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        These resources are exclusive to Little Elm TSA members. Please sign in to access competition guides, templates, and officer tools.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/login" className="bg-accent-blue hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-accent-blue/20">
                            Sign In
                        </Link>
                        <Link to="/join" className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold py-3 px-8 rounded-lg transition-colors">
                            Join TSA
                        </Link>
                    </div>
                </div>
            </div>
        )}

        {/* Content (Blurred if locked is handled by overlay, but we can also blur via class) */}
        <div className={!isAuthenticated ? 'filter blur-sm pointer-events-none select-none opacity-50' : ''}>
            
            {/* Navigation Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {categories.map((cat) => (
                <button
                key={cat.id}
                onClick={() => {
                    const element = document.getElementById(cat.id);
                    if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setOpenSection(cat.id);
                    }
                }}
                className={`bg-white dark:bg-dark-surface border rounded-xl p-6 flex flex-col items-center text-center transition-all duration-200 group h-full shadow-sm hover:shadow-md ${
                  openSection === cat.id 
                    ? 'border-accent-blue ring-1 ring-accent-blue shadow-accent-blue/10' 
                    : 'border-gray-200 dark:border-dark-border hover:border-accent-blue/50'
                }`}
                >
                <div className={`mb-3 transition-colors ${openSection === cat.id ? 'text-accent-blue' : 'text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                    <cat.icon size={28} />
                </div>
                <span className={`text-xs font-bold leading-tight ${openSection === cat.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                    {cat.name}
                </span>
                </button>
            ))}
            </div>

            {/* Sections */}
            <div className="space-y-8">
            
            {/* Competition Resources */}
            <div id="competition" className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden scroll-mt-24 shadow-sm">
                <div className="p-6 md:p-8 border-b border-gray-200 dark:border-dark-border flex items-start bg-gray-50 dark:bg-white/5">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4 text-accent-blue shrink-0">
                    <Trophy size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Competition Resources</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Official guidelines, rubrics, and preparation materials.</p>
                </div>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-dark-border">
                {[
                    { title: 'Official TSA Competition Guidelines', desc: 'Complete rules and rubrics for all TSA competitive events.', icon: ExternalLink },
                    { title: 'Texas TSA Resources', desc: 'State-specific competition information and updates.', icon: ExternalLink },
                    { title: 'Event Preparation Checklist', desc: 'Step-by-step preparation guide for competitions.', icon: Download },
                    { title: 'Competition Timeline Template', desc: 'Downloadable template for planning your project timeline.', icon: Download },
                ].map((item, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-start">
                            <div className="mt-1 mr-3 text-gray-400 group-hover:text-accent-blue">
                                <item.icon size={16} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-0.5 group-hover:text-accent-blue transition-colors">{item.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 dark:text-gray-600" />
                        </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Webmaster Resources */}
            <div id="webmaster" className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden scroll-mt-24 shadow-sm">
                <div className="p-6 md:p-8 border-b border-gray-200 dark:border-dark-border flex items-start bg-gray-50 dark:bg-white/5">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4 text-accent-blue shrink-0">
                    <Code size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Webmaster & Technical Resources</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Technical resources for web development projects.</p>
                </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-dark-border">
                {[
                    { title: 'HTML & CSS Fundamentals', desc: 'Essential web development basics for beginners.', icon: ExternalLink },
                    { title: 'JavaScript Tutorial', desc: 'Interactive JavaScript learning resources.', icon: ExternalLink },
                    { title: 'React Documentation', desc: 'Official React.js documentation and tutorials.', icon: ExternalLink },
                    { title: 'Web Accessibility Guidelines', desc: 'Best practices for creating accessible websites.', icon: ExternalLink },
                ].map((item, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-start">
                            <div className="mt-1 mr-3 text-gray-400 group-hover:text-accent-blue">
                                <item.icon size={16} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-0.5 group-hover:text-accent-blue transition-colors">{item.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 dark:text-gray-600" />
                        </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;