
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ChevronRight, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';

const Events: React.FC = () => {
  const { eventsList } = useData();
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All' 
    ? eventsList 
    : eventsList.filter(e => e.category === filter);

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen pb-20 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Calendar
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Events & Calendar</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Stay up to date with TSA meetings, workshops, competitions, and special events. Mark your calendars and never miss an opportunity.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
             <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium mr-2">
               <Filter size={16} className="mr-2" /> Filter:
             </div>
             <div className="relative">
               <select 
                className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-32 p-2.5 outline-none appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors shadow-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
               >
                 <option>All</option>
                 <option>Workshop</option>
                 <option>Competition</option>
                 <option>Meeting</option>
                 <option>Social</option>
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
               </div>
             </div>
          </div>

          <div className="flex bg-white dark:bg-dark-surface p-1 rounded-lg border border-gray-200 dark:border-dark-border shadow-sm">
            <button className="px-4 py-1.5 rounded text-sm font-medium bg-accent-blue text-white shadow-sm">Upcoming</button>
            <button className="px-4 py-1.5 rounded text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Past Events</button>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => {
             const dateObj = new Date(event.date);
             const month = dateObj.toLocaleString('default', { month: 'long' });
             const day = dateObj.getDate();

             return (
            <div key={event.id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 hover:border-accent-blue/30 dark:hover:border-accent-blue/30 transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm hover:shadow-md relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Date Box */}
              <div className="flex-shrink-0 text-center w-full md:w-24 bg-gray-50 dark:bg-dark-bg/50 rounded-lg py-4 border border-gray-200 dark:border-dark-border group-hover:border-accent-blue/30 transition-colors">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium mb-1">{month}</div>
                <div className="text-3xl font-bold text-accent-blue">{day}</div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wide">{event.category}</span>
                  <span className={`border text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wide ${event.status === 'Cancelled' ? 'bg-red-100 text-red-500 border-red-200' : 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue'}`}>{event.status}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-blue transition-colors">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 md:line-clamp-none">{event.description}</p>
                
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                   <div className="flex items-center">
                     <Clock size={14} className="mr-1.5" /> {event.time}
                   </div>
                   <div className="flex items-center">
                     <MapPin size={14} className="mr-1.5" /> {event.location}
                   </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                <button className="flex-1 md:w-32 bg-transparent border border-gray-200 dark:border-dark-border hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center">
                  Details <ChevronRight size={12} className="ml-1" />
                </button>
                {event.rsvpLink && (
                    <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className="flex-1 md:w-32 bg-accent-blue hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-accent-blue/20 text-center flex items-center justify-center">
                    RSVP
                    </a>
                )}
              </div>

            </div>
          )}}
          {filteredEvents.length === 0 && <div className="text-center text-gray-500 py-10">No events found in this category.</div>}
        </div>

        {/* Add Calendar Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-1 overflow-hidden shadow-sm">
           <div className="p-10 flex flex-col justify-center">
             <span className="bg-gray-100 dark:bg-white/5 w-fit text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded mb-4">Stay Connected</span>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Add Our Calendar</h2>
             <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
               Sync our TSA events calendar with your personal calendar to never miss a meeting, workshop, or competition deadline.
             </p>
             <div className="flex gap-4">
               <button className="bg-transparent border border-gray-300 dark:border-dark-border hover:border-gray-500 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center text-sm">
                 <Calendar size={16} className="mr-2" /> Google Calendar
               </button>
               <button className="bg-transparent border border-gray-300 dark:border-dark-border hover:border-gray-500 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center text-sm">
                 <Calendar size={16} className="mr-2" /> iCal
               </button>
             </div>
           </div>
           
           <div className="bg-gray-50 dark:bg-dark-bg/50 min-h-[300px] flex items-center justify-center border-l border-gray-200 dark:border-dark-border relative">
             <div className="text-center text-gray-500 relative z-10">
               <Calendar size={48} className="mx-auto mb-4 opacity-50 text-accent-blue" />
               <p className="text-sm font-medium">Google Calendar Embed</p>
               <p className="text-xs mt-1">Replace with embedded calendar</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Events;
