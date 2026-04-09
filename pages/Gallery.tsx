import React, { useState } from 'react';
import { Image as ImageIcon, Filter, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { LazyImage } from '../components/LazyImage';
import { SEO } from '../components/SEO';

const Gallery: React.FC = () => {
  const { galleryList } = useData();
  const [filter, setFilter]  = useState('All');
  const [preview, setPreview] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(galleryList.map(g => g.category)))];
  const filtered   = filter === 'All' ? galleryList : galleryList.filter(g => g.category === filter);

  return (
    <div>
      <SEO title="Gallery" description="Photos and memories from LEHS TSA competitions, meetings, and events." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple w-[400px] h-[350px] top-[-60px] right-[5%] opacity-25 animate-orb-float-2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label inline-flex mb-4"><ImageIcon size={12} /> Gallery</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Photo Gallery</h1>
            <p className="section-body max-w-xl">
              Competitions, build nights, conferences, and community — captured in photos.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-space-900 to-transparent" />
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-30 bg-space-900/90 backdrop-blur-xl border-b border-space-500/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 flex-wrap items-center">
          <Filter size={13} className="text-ink-muted" />
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === c ? 'bg-electric-500 text-white' : 'bg-space-700/50 text-ink-muted hover:text-ink border border-space-500/50'}`}>
              {c}
            </button>
          ))}
          <span className="text-xs text-ink-muted ml-auto">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <ImageIcon size={40} className="mx-auto mb-4 opacity-30" />
            <p>No photos yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.3, delay: (i % 8) * 0.05 }}
                onClick={() => setPreview(item.imageUrl)}
                className="relative group rounded-2xl overflow-hidden aspect-square bg-space-700 border border-space-500/50 hover:border-electric-300/50 transition-all"
              >
                <LazyImage src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-sm font-semibold text-white truncate">{item.title}</div>
                    {item.date && <div className="text-xs text-white/70 mt-0.5">{item.date}</div>}
                  </div>
                  <ZoomIn size={20} className="absolute top-3 right-3 text-white/80" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setPreview(null)}
          >
            <motion.img
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              src={preview} alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={() => setPreview(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
