import React, { useState } from 'react';
import { CheckCircle, Trophy, Users, Lightbulb, ChevronDown, ChevronUp, Send } from 'lucide-react';

const Join: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Join Us
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Become a TSA Member</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Join Little Elm High School's Technology Student Association and start your journey in STEM competitions, leadership, and innovation.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 text-center hover:border-accent-blue/30 dark:hover:border-accent-blue/30 transition-colors shadow-sm hover:shadow-md group">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Trophy size={40} className="text-accent-blue" strokeWidth={1.5} />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Compete at All Levels</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Participate in 60+ events at regional, state, and national competitions.</p>
             </div>
             <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 text-center hover:border-accent-blue/30 dark:hover:border-accent-blue/30 transition-colors shadow-sm hover:shadow-md group">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Users size={40} className="text-accent-blue" strokeWidth={1.5} />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Build Your Network</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Connect with like-minded students, mentors, and industry professionals.</p>
             </div>
             <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 text-center hover:border-accent-blue/30 dark:hover:border-accent-blue/30 transition-colors shadow-sm hover:shadow-md group">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Lightbulb size={40} className="text-accent-blue" strokeWidth={1.5} />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Develop Real Skills</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Gain hands-on experience in technology, leadership, and teamwork.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Application & Details */}
      <section className="py-12 bg-white dark:bg-[#0E1320] border-y border-gray-200 dark:border-dark-border transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
               
               {/* Application Form */}
               <div>
                  <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Apply Now</span>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Membership Application</h2>
                  
                  <div className="bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl p-8 shadow-sm">
                     <form className="space-y-6">
                        <div>
                           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Full Name</label>
                           <input type="text" placeholder="Your full name" className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Email Address</label>
                           <input type="email" placeholder="your.email@student.littleelmisd.net" className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Grade Level</label>
                           <div className="relative">
                             <select className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors appearance-none cursor-pointer">
                               <option>Select your grade</option>
                               <option>9th Grade</option>
                               <option>10th Grade</option>
                               <option>11th Grade</option>
                               <option>12th Grade</option>
                             </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                <ChevronDown size={16} />
                             </div>
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Interests & Experience</label>
                           <textarea rows={4} placeholder="Tell us about your interests in technology, any relevant experience, and which TSA events interest you..." className="w-full bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600 resize-none"></textarea>
                        </div>
                        
                        <button type="button" className="w-full bg-accent-blue hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-accent-blue/20">
                           <Send size={16} className="mr-2" /> Submit Application
                        </button>
                     </form>
                  </div>
               </div>

               {/* Sidebar Info */}
               <div className="space-y-8">
                  
                  {/* Meeting Info */}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block bg-gray-100 dark:bg-dark-surface w-fit px-2 py-1 rounded border border-gray-200 dark:border-dark-border">📅 Meeting Times</span>
                    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
                       <h3 className="text-gray-900 dark:text-white font-bold mb-4 border-b border-gray-200 dark:border-dark-border pb-4">When We Meet</h3>
                       <div className="space-y-4 text-sm">
                          <div className="flex justify-between">
                             <span className="text-gray-600 dark:text-gray-400">Days:</span>
                             <span className="text-gray-900 dark:text-white font-medium">Every Tuesday and Thursday</span>
                          </div>
                          <div className="flex justify-between">
                             <span className="text-gray-600 dark:text-gray-400">Time:</span>
                             <span className="text-gray-900 dark:text-white font-medium">3:30 PM - 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                             <span className="text-gray-600 dark:text-gray-400">Location:</span>
                             <span className="text-gray-900 dark:text-white font-medium">Room 204, Technology Building</span>
                          </div>
                       </div>
                       <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 italic">Competition teams may have additional practice sessions as needed.</p>
                    </div>
                  </div>

                  {/* Dues Info */}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block bg-gray-100 dark:bg-dark-surface w-fit px-2 py-1 rounded border border-gray-200 dark:border-dark-border">💲 Membership Dues</span>
                    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
                       <div className="flex justify-between items-center mb-6">
                         <h3 className="text-gray-900 dark:text-white font-bold text-lg">Annual Dues</h3>
                         <span className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold px-3 py-1 rounded border border-gray-200 dark:border-white/5">$XX</span>
                       </div>
                       
                       <p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-3">Dues include:</p>
                       <ul className="space-y-2 mb-6">
                         {[
                           'National and State TSA membership',
                           'Access to all chapter events and workshops',
                           'Competition registration fees',
                           'Chapter t-shirt',
                           'Team supplies and materials'
                         ].map((item, i) => (
                           <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                             <CheckCircle size={14} className="text-accent-blue mr-2 mt-0.5 shrink-0" />
                             {item}
                           </li>
                         ))}
                       </ul>

                       <div className="text-xs text-gray-500 border-t border-gray-200 dark:border-dark-border pt-4 space-y-1">
                          <p>Payment deadline: <span className="text-gray-900 dark:text-white">October 15, 2024</span></p>
                          <p>Accepted: Cash, Check (payable to LEHS TSA), Online payment (SchoolCash)</p>
                       </div>
                    </div>
                  </div>

               </div>

            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
            <span className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded mb-4 inline-block">? Got Questions?</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
         </div>

         <div className="space-y-4">
            {[
              { q: 'Who can join TSA?', a: 'Any student currently enrolled in Little Elm High School with an interest in STEM can join.' },
              { q: 'Do I need prior experience to join?', a: 'No! We welcome students of all skill levels. Our workshops will teach you everything you need to know.' },
              { q: 'What is the time commitment?', a: 'General meetings are once a week. Competition teams may meet more frequently closer to events.' },
              { q: 'How do I choose which events to compete in?', a: 'We will review all 60+ events during our first few meetings and help you match your interests.' },
              { q: 'Can I join mid-year?', a: 'Yes, but you may not be eligible for certain regional competitions depending on registration deadlines.' },
              { q: 'Are there leadership opportunities?', a: 'Yes, members can run for officer positions or lead specific committees and project teams.' },
              { q: 'What if I can\'t afford the dues?', a: 'Please talk to our advisor privately. We have scholarship options available so finances are never a barrier.' },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden shadow-sm">
                 <button 
                   onClick={() => toggleFaq(i)}
                   className="w-full flex justify-between items-center p-5 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors focus:outline-none"
                 >
                   {item.q}
                   {openFaq === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                 </button>
                 {openFaq === i && (
                   <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-dark-border pt-3">
                     {item.a}
                   </div>
                 )}
              </div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default Join;