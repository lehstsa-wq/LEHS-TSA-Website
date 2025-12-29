
import React from 'react';
import { User, Instagram, Linkedin, GraduationCap, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';

const Officers: React.FC = () => {
  const { officersList } = useData();

  // Sort by order
  const sortedOfficers = [...officersList].sort((a, b) => a.order - b.order);
  
  const executives = sortedOfficers.filter(o => o.category === 'Executive');
  const committees = sortedOfficers.filter(o => o.category === 'Committee');
  const advisors = sortedOfficers.filter(o => o.category === 'Advisor');

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-[#0E1320] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Leadership
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Chapter Leadership</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Meet the dedicated student officers and faculty advisors who guide our chapter. Together, they create opportunities for every member to succeed.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Executive Officers */}
        {executives.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Student Officers</h2>
            <div className="h-px flex-grow bg-gray-200 dark:bg-dark-border"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {executives.map((officer) => (
              <div key={officer.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden p-6 flex flex-col sm:flex-row gap-6 hover:border-accent-blue/30 dark:hover:border-accent-blue/30 transition-all shadow-sm group">
                 <div className="w-full sm:w-32 h-32 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border flex flex-col items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors overflow-hidden">
                    {officer.imageUrl ? (
                        <img src={officer.imageUrl} alt={officer.name} className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <User size={32} className="text-accent-blue mb-2" />
                            <span className="text-[10px] text-gray-500">Photo</span>
                        </>
                    )}
                 </div>
                 <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{officer.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">{officer.grade}</p>
                       </div>
                       <span className="bg-accent-blue text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">{officer.role}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                       {officer.bio}
                    </p>
                    <div className="flex gap-3">
                       {officer.instagram && (
                         <a href={officer.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-purple dark:hover:text-white transition-colors" aria-label="Instagram">
                           <Instagram size={18} />
                         </a>
                       )}
                       {officer.linkedin && (
                         <a href={officer.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                           <Linkedin size={18} />
                         </a>
                       )}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Committee Leaders */}
        {committees.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Committee Leaders</h2>
            <div className="h-px flex-grow bg-gray-200 dark:bg-dark-border"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {committees.map((lead) => (
               <div key={lead.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 text-center hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/10 rounded-full flex items-center justify-center text-accent-blue mx-auto mb-4 border border-blue-200 dark:border-blue-900/30 overflow-hidden">
                     {lead.imageUrl ? <img src={lead.imageUrl} className="w-full h-full object-cover"/> : <User size={24} />}
                  </div>
                  <span className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-3 inline-block">{lead.role}</span>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-0.5">{lead.name}</h3>
                  <p className="text-xs text-gray-500 mb-4">{lead.grade}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4">
                     {lead.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                       {lead.instagram && (
                         <a href={lead.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-purple dark:hover:text-white transition-colors" aria-label="Instagram">
                           <Instagram size={16} />
                         </a>
                       )}
                       {lead.linkedin && (
                         <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                           <Linkedin size={16} />
                         </a>
                       )}
                  </div>
               </div>
            ))}
          </div>
        </div>
        )}

        {/* Advisors */}
        {advisors.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Chapter Advisors</h2>
            <div className="h-px flex-grow bg-gray-200 dark:bg-dark-border"></div>
          </div>
          
           {advisors.map(adv => (
           <div key={adv.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl max-w-4xl mb-8">
             <div className="md:w-2/5 bg-gray-100 dark:bg-[#141B2D] flex flex-col items-center justify-center p-12 text-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-border min-h-[300px]">
                <div className="text-accent-blue mb-4 opacity-80 rounded-full overflow-hidden w-32 h-32 flex items-center justify-center bg-gray-200 dark:bg-white/5">
                  {adv.imageUrl ? <img src={adv.imageUrl} className="w-full h-full object-cover"/> : <GraduationCap size={60} strokeWidth={1.5} />}
                </div>
             </div>

             <div className="md:w-3/5 p-8 lg:p-12">
               <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-semibold px-2.5 py-1 rounded mb-4 inline-block border border-gray-200 dark:border-white/5">TSA Chapter Advisor</span>
               <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">{adv.name}</h3>
               <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Technology Education</p>
               
               <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-sm">
                 {adv.bio}
               </p>
               
               <a href={`mailto:${adv.email || 'advisor@littleelmisd.net'}`} className="inline-flex items-center text-accent-blue hover:text-accent-hover dark:hover:text-white transition-colors text-sm font-medium">
                 <Mail size={16} className="mr-2" />
                 Contact Advisor
               </a>
             </div>
           </div>
           ))}
        </div>
        )}

      </div>
    </div>
  );
};

export default Officers;
