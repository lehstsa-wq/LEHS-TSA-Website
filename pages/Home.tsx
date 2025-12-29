
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, Bell, User, ExternalLink, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LazyImage } from '../components/LazyImage';

const Home: React.FC = () => {
  const { announcements, eventsList, officersList } = useData();

  // Get data for widgets
  const latestNews = announcements.slice(0, 2);
  const upcomingEvents = eventsList
    .filter(e => e.status === 'Upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Random Officer Spotlight
  const featuredStudent = officersList.length > 0 ? officersList[0] : null;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-40 min-h-[85vh] flex items-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Hero Text Content */}
            <div className="lg:w-3/5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in cursor-default hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Sparkles size={14} className="text-accent-blue" />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Welcome to Little Elm TSA</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Empowering Future <br/>
                <span className="text-accent-blue bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-purple-600">Innovators</span> Through <br/>
                Technology
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Join Little Elm High School's award-winning Technology Student Association chapter. Develop leadership skills, compete in STEM events, and build your future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/join" className="group bg-accent-blue hover:bg-accent-hover text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/50 flex items-center justify-center transform hover:-translate-y-1">
                  Join TSA Today <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link to="/events" className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-dark-border text-gray-800 dark:text-white font-semibold py-4 px-8 rounded-lg transition-all flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg">
                  View Events <Calendar className="ml-2" size={18} />
                </Link>
              </div>
            </div>

            {/* Stats Card (Right Side) */}
            <div className="lg:w-2/5 w-full">
                <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border border-gray-200 dark:border-dark-border rounded-2xl p-8 lg:p-10 shadow-xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-dark-border text-center relative z-10">
                    <div className="px-2">
                      <div className="text-3xl lg:text-4xl font-bold text-accent-blue mb-2">150+</div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">Active Members</div>
                    </div>
                    <div className="px-2">
                      <div className="text-3xl lg:text-4xl font-bold text-accent-blue mb-2">25+</div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">Competitions Won</div>
                    </div>
                    <div className="px-2">
                      <div className="text-3xl lg:text-4xl font-bold text-accent-blue mb-2">12</div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">Years Active</div>
                    </div>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Engagement Section: News & Events */}
      <section className="py-16 bg-white dark:bg-[#0E1320] border-y border-gray-200 dark:border-dark-border transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Latest News */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Bell className="text-accent-blue" size={24} /> Latest News
                        </h2>
                        <Link to="/updates" className="text-sm font-bold text-accent-blue hover:text-accent-hover flex items-center">View All <ArrowRight size={14} className="ml-1"/></Link>
                    </div>
                    <div className="space-y-4">
                        {latestNews.length > 0 ? latestNews.map(news => (
                            <div key={news.id} className="bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-5 rounded-xl hover:border-accent-blue/40 transition-colors group">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-white/10 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">{news.type}</span>
                                    <span className="text-xs text-gray-400">{news.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-blue transition-colors">{news.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{news.content}</p>
                            </div>
                        )) : (
                            <p className="text-gray-500 italic">No recent news available.</p>
                        )}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div>
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Calendar className="text-accent-blue" size={24} /> Upcoming Events
                        </h2>
                        <Link to="/events" className="text-sm font-bold text-accent-blue hover:text-accent-hover flex items-center">Calendar <ArrowRight size={14} className="ml-1"/></Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                            <div key={event.id} className="flex gap-4 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl hover:shadow-md transition-shadow">
                                <div className="bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg w-16 h-16 flex flex-col items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-red-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{new Date(event.date).getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{event.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{event.time} • {event.location}</p>
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">{event.category}</span>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 italic">No upcoming events scheduled.</p>
                        )}
                    </div>
                </div>

            </div>
         </div>
      </section>

      {/* Spotlight & Social */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               
               {/* Student Spotlight */}
               {featuredStudent && (
                   <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-8 relative overflow-hidden">
                       <div className="absolute top-0 right-0 bg-accent-blue text-white text-xs font-bold px-4 py-2 rounded-bl-xl z-10">Officer Spotlight</div>
                       <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative z-10">
                           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-white/10 shrink-0">
                               {featuredStudent.imageUrl ? (
                                   <LazyImage src={featuredStudent.imageUrl} alt={featuredStudent.name} className="w-full h-full object-cover" />
                               ) : (
                                   <div className="w-full h-full bg-gray-200 flex items-center justify-center"><User size={32}/></div>
                               )}
                           </div>
                           <div className="text-center sm:text-left">
                               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{featuredStudent.name}</h3>
                               <p className="text-accent-blue font-medium mb-3">{featuredStudent.role}</p>
                               <p className="text-gray-600 dark:text-gray-400 italic text-sm">"{featuredStudent.bio.substring(0, 100)}..."</p>
                               <Link to="/officers" className="inline-block mt-4 text-sm font-bold text-gray-900 dark:text-white underline hover:text-accent-blue">Meet the Team</Link>
                           </div>
                       </div>
                       {/* Abstract BG */}
                       <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-blue/5 rounded-full blur-2xl"></div>
                   </div>
               )}

               {/* Social CTA */}
               <div className="text-center md:text-left">
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join the Conversation</h2>
                   <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                       Follow us on social media for real-time updates, competition photos, and behind-the-scenes looks at our chapter.
                   </p>
                   <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                       <a href="#" className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border px-6 py-3 rounded-xl font-bold text-gray-900 dark:text-white hover:text-accent-blue hover:border-accent-blue transition-all shadow-sm">
                           <Instagram size={20} /> Instagram
                       </a>
                       <a href="#" className="flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-accent-hover transition-all shadow-lg shadow-accent-blue/20">
                           <ExternalLink size={20} /> Join Discord
                       </a>
                   </div>
               </div>

            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
