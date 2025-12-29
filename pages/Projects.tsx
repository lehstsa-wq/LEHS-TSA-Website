
import React, { useState } from 'react';
import { Filter, Trophy, Video, Palette, Monitor, Cpu, Code, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Projects() {
  const { projectsList } = useData();
  const [filter, setFilter] = useState('All');

  // Helper to get icon
  const getIcon = (cat: string) => {
      const c = cat.toLowerCase();
      if(c.includes('software') || c.includes('web')) return Code;
      if(c.includes('video') || c.includes('production')) return Video;
      if(c.includes('design') || c.includes('promotion')) return Palette;
      if(c.includes('engineering') || c.includes('biotech')) return Cpu;
      return Monitor;
  }

  // Filter logic
  const filteredList = filter === 'All' 
    ? projectsList 
    : projectsList.filter(p => p.category.includes(filter));

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-[#0E1320] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Our Work
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Projects & Competitions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Explore the innovative projects created by our talented TSA members. From software development to engineering design, see what we've accomplished.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
             <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium mr-2">
               <Filter size={16} className="mr-2" /> Filters:
             </div>
             <select 
               className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-32 p-2.5 outline-none hover:border-gray-400 dark:hover:border-gray-500 transition-colors shadow-sm"
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
             >
               <option>All</option>
               <option>Software</option>
               <option>Engineering</option>
               <option>Design</option>
             </select>
          </div>
          <div className="text-gray-500 text-sm">
             Showing {filteredList.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredList.map((project, i) => {
            const Icon = getIcon(project.category);
            return (
            <div key={project.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden hover:border-accent-blue/30 dark:hover:border-accent-blue/30 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
               <div className="bg-gray-100 dark:bg-dark-bg/50 h-40 flex items-center justify-center relative border-b border-gray-200 dark:border-dark-border overflow-hidden">
                  <div className="absolute inset-0 bg-accent-blue/5 group-hover:bg-accent-blue/10 transition-colors"></div>
                  {project.imageUrl && (
                      <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  )}
                  <div className="absolute top-3 right-3 bg-white/60 dark:bg-white/10 text-xs font-bold text-gray-800 dark:text-white px-2 py-0.5 rounded border border-gray-200 dark:border-white/5 backdrop-blur-sm z-10">{project.year}</div>
                  {project.award && (
                  <div className="absolute bottom-3 left-3 z-10">
                     <span className="bg-accent-blue text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center shadow-sm">
                        <Trophy size={10} className="mr-1" /> {project.award}
                     </span>
                  </div>
                  )}
                  {!project.imageUrl && <Icon size={40} className="text-gray-400 group-hover:text-accent-blue transition-colors relative z-0 group-hover:scale-110 duration-500" />}
               </div>
               <div className="p-6">
                  <div className="bg-gray-100 dark:bg-dark-bg w-fit px-2 py-0.5 rounded border border-gray-200 dark:border-dark-border text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{project.category}</div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 leading-tight group-hover:text-accent-blue transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-sm line-clamp-3">{project.description}</p>
               </div>
            </div>
            )
          })}
          {filteredList.length === 0 && <div className="text-gray-500 col-span-full text-center py-10">No projects found.</div>}
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-[#0E1320] py-20 border-t border-gray-200 dark:border-dark-border text-center transition-colors duration-300 relative overflow-hidden">
         <div className="max-w-2xl mx-auto px-4 relative z-10">
            <span className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-accent-blue text-xs font-bold px-2.5 py-1 rounded-full mb-4 inline-block">Get Involved</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Own Project</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Interested in competing? TSA offers over 60 different competitive events. Join our chapter and find the perfect project category for your skills and interests.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-accent-blue hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-accent-blue/20 flex items-center">
                View Competition Events <ArrowRight size={16} className="ml-2" />
              </button>
              <button className="bg-transparent border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white text-gray-900 dark:text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Join TSA
              </button>
            </div>
         </div>
      </div>
    </div>
  );
}
