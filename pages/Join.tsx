
import React, { useState } from 'react';
import { CheckCircle, Trophy, Users, Lightbulb, ChevronDown, ChevronUp, ExternalLink, FileCheck, Building, MessageSquare, CreditCard } from 'lucide-react';
import { useData } from '../context/DataContext';

const Join: React.FC = () => {
  const { siteSettings } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const StepCard = ({ number, title, desc, icon: Icon, href, action }: { number: string, title: string, desc: string, icon: any, href: string, action: string }) => (
     <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 relative overflow-hidden group hover:border-accent-blue/40 transition-all shadow-sm">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Icon size={64} className="text-accent-blue" />
         </div>
         <div className="flex items-start gap-4 relative z-10">
             <div className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue font-bold shrink-0">
                 {number}
             </div>
             <div>
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
                 <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-accent-blue hover:text-accent-hover"
                 >
                    {action} <ExternalLink size={14} className="ml-1" />
                 </a>
             </div>
         </div>
     </div>
  );

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
      <section className="py-8">
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

      {/* 4-Step Process Section */}
      <section className="py-16 bg-white dark:bg-[#0E1320] border-y border-gray-200 dark:border-dark-border transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Registration Checklist</h2>
               <p className="text-gray-600 dark:text-gray-400 mt-2">Complete all 4 steps to become an official member.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <StepCard 
                    number="1"
                    title="TSA Application"
                    desc="Fill out the official chapter application form via JotForm."
                    icon={FileCheck}
                    href={siteSettings.jotformLink}
                    action="Open Application"
                />
                <StepCard 
                    number="2"
                    title="District Club App"
                    desc="Complete the required LEISD district club paperwork."
                    icon={Building}
                    href={siteSettings.districtAppLink}
                    action="District Form"
                />
                <StepCard 
                    number="3"
                    title="Join Remind"
                    desc="Sign up for text alerts to stay updated on meetings."
                    icon={MessageSquare}
                    href={siteSettings.remindLink}
                    action="Join Class"
                />
                <StepCard 
                    number="4"
                    title="Pay Dues"
                    desc="Pay your annual membership dues securely via SuccessFund."
                    icon={CreditCard}
                    href={siteSettings.successFundLink}
                    action="Pay Now"
                />
            </div>

            <div className="max-w-4xl mx-auto mt-12 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Have an Access Code?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">If you've completed these steps and received an Access Code from an officer, create your portal account now.</p>
                </div>
                <a href="/signup" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                    Create Portal Account
                </a>
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
