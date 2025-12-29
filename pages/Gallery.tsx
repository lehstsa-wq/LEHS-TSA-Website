
import React, { useState } from 'react';
import { Filter, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';

const Gallery: React.FC = () => {
  const { galleryList } = useData();
  const [filter, setFilter] = useState('All');

  const filteredList = filter === 'All' ? galleryList : galleryList.filter(i => i.category === filter);

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-12 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-[#0E1320] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block bg-gray-100 dark:bg-white/5 w-fit px-2 py-1 rounded">Photos</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Photo Gallery</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Browse through memories from our competitions, workshops, meetings, and events. See our chapter in action!
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
             <select onChange={e => setFilter(e.target.value)} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-32 p-2.5 outline-none hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
               <option>All</option>
               <option>Competition</option>
               <option>Event</option>
             </select>
          </div>
          <div className="text-gray-500 text-sm">
             Showing {filteredList.length} photos
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {filteredList.map((item, index) => (
            <div key={item.id} className={`bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl relative overflow-hidden group aspect-square shadow-sm`}>
               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                 <div>
                    <p className="text-white text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.date} • {item.category}</p>
                 </div>
               </div>
            </div>
          ))}
          {filteredList.length === 0 && <div className="col-span-full text-center text-gray-500 py-10">No photos found.</div>}
        </div>
      </div>

      {/* Contribute CTA */}
      <div className="bg-white dark:bg-[#0E1320] py-20 border-t border-gray-200 dark:border-dark-border text-center transition-colors duration-300">
         <div className="max-w-2xl mx-auto px-4">
            <span className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded mb-4 inline-block">Share Your Photos</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contribute to Our Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Have photos from a TSA event? Share them with us to be featured in our gallery. Contact an officer or submit through our contact form.
            </p>
            <button className="bg-accent-blue hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-accent-blue/20">
               Submit Photos
            </button>
         </div>
      </div>
    </div>
  );
};

export default Gallery;
