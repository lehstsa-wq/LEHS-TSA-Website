import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Target, Heart, GraduationCap, Mail, Award, BookOpen, ArrowRight, User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-32 bg-white dark:bg-[#0E1320]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
           <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
              Our Chapter
           </div>
           <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">About Little Elm TSA</h1>
           <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
             Learn about our chapter's history, mission, and the incredible opportunities we offer to students passionate about technology and leadership.
           </p>
        </div>
      </section>

      {/* What is TSA Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-start">
             {/* Left Text */}
             <div className="lg:w-1/2">
               <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">What is TSA?</h2>
               <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                 <p>
                   The Technology Student Association (TSA) is the only student organization devoted exclusively to students enrolled in Science, Technology, Engineering, and Mathematics (STEM) courses.
                 </p>
                 <p>
                   Since our chapter's founding, Little Elm High School TSA has been dedicated to providing students with hands-on experiences in technology, engineering, and leadership. Our members compete at regional, state, and national levels in over 60 unique STEM competitions.
                 </p>
               </div>
             </div>
             
             {/* Right Stats Grid */}
             <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { val: '50+', label: 'State Awards' },
                  { val: '15+', label: 'National Qualifiers' },
                  { val: '12', label: 'Years of Excellence' },
                  { val: '1000+', label: 'Alumni' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-accent-blue/40 dark:hover:border-accent-blue/40 transition-all shadow-sm group">
                    <div className="text-4xl font-bold text-accent-blue mb-2 group-hover:scale-110 transition-transform">{stat.val}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0E1320] transition-colors duration-300 border-y border-gray-200 dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <span className="text-accent-blue font-bold tracking-wider uppercase text-sm mb-2 block">Our Purpose</span>
           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-10">Mission Statement</h2>
           
           <div className="bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-10 lg:p-16 relative shadow-lg">
             <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
                 <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-accent-blue/10"><circle cx="50" cy="50" r="50" fill="currentColor"/></svg>
             </div>
             <div className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed relative z-10">
               "To prepare students for the challenges of a dynamic world by promoting technological literacy, leadership, and problem-solving, making a positive difference in communities through the application of technology."
             </div>
             <div className="flex justify-center gap-3 mt-8 relative z-10">
               {['Technology', 'Leadership', 'Innovation'].map(tag => (
                 <span key={tag} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{tag}</span>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Lightbulb, title: 'Innovation', desc: 'We encourage creative thinking and novel solutions to real-world problems.' },
               { icon: Users, title: 'Collaboration', desc: 'Teamwork is at the heart of everything we do, from projects to competitions.' },
               { icon: Target, title: 'Excellence', desc: 'We strive for the highest standards in all our endeavors and competitions.' },
               { icon: Heart, title: 'Community', desc: 'We build lasting connections and give back through service and mentorship.' }
             ].map((value, i) => (
               <div key={i} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 text-center hover:border-accent-blue/40 dark:hover:border-accent-blue/40 transition-colors group cursor-default shadow-sm hover:shadow-md relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/10 rounded-lg flex items-center justify-center text-accent-blue mx-auto mb-6 group-hover:bg-accent-blue group-hover:text-white transition-colors">
                   <value.icon size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0E1320] border-t border-gray-200 dark:border-dark-border transition-colors duration-300 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-16">Benefits of TSA Membership</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
             {[
               { icon: Award, title: 'Compete & Win', desc: 'Participate in 60+ competitive events at regional, state, and national conferences.' },
               { icon: User, title: 'Build Leadership', desc: 'Develop communication, teamwork, and leadership skills valued by colleges and employers.' },
               { icon: BookOpen, title: 'Learn & Grow', desc: 'Gain hands-on experience with cutting-edge technology and real-world applications.' }
             ].map((item, i) => (
               <div key={i} className="bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors group shadow-sm hover:shadow-md">
                 <div className="text-accent-blue mb-6 group-hover:scale-110 transition-transform duration-300">
                   <item.icon size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
               </div>
             ))}
           </div>

           <Link to="/join" className="inline-flex items-center bg-accent-blue hover:bg-accent-hover text-white font-semibold py-3.5 px-8 rounded-lg transition-colors shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40">
             Join TSA Today <ArrowRight size={18} className="ml-2" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default About;