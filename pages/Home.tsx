import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="pt-20 pb-20 lg:pt-32 lg:pb-40 min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Hero Text Content */}
            <div className="lg:w-3/5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in cursor-default">
                <Sparkles size={14} className="text-accent-blue" />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Welcome to Little Elm TSA</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Empowering Future <br/>
                <span className="text-accent-blue">Innovators</span> Through <br/>
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
                <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border border-gray-200 dark:border-dark-border rounded-2xl p-8 lg:p-10 shadow-xl">
                  <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-dark-border text-center">
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
    </div>
  );
};

export default Home;