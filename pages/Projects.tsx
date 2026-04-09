import React, { useState } from 'react';
import { Filter, Trophy, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { LazyImage } from '../components/LazyImage';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const { projectsList } = useData();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projectsList.map(p => p.category)))];
  const filtered   = filter === 'All' ? projectsList : projectsList.filter(p => p.category === filter);

  return (
    <div>
      <SEO title="Projects" description="LEHS TSA chapter project showcase — award-winning builds, designs, and innovations." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-blue w-[400px] h-[350px] top-[-60px] right-[5%] opacity-25 animate-orb-float-1" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label inline-flex mb-4"><Zap size={12} /> Portfolio</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Project Showcase</h1>
            <p className="section-body max-w-2xl">
              Award-winning projects, innovative builds, and creative designs from LEHS TSA members.
              Every entry represents countless hours of dedication.
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
          <span className="text-xs text-ink-muted ml-auto">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <Zap size={40} className="mx-auto mb-4 opacity-30" />
            <p>No projects yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 6) * 0.08 }}
                className="card group overflow-hidden !p-0">
                {project.imageUrl && (
                  <div className="aspect-video overflow-hidden bg-space-700">
                    <LazyImage src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-blue text-[10px]">{project.category}</span>
                    <span className="text-[11px] text-ink-muted">{project.year}</span>
                  </div>
                  <h3 className="font-bold text-ink mb-2 group-hover:text-electric-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed line-clamp-3">{project.description}</p>
                  {project.award && (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-space-500/40">
                      <Trophy size={14} className="text-gold-500" />
                      <span className="text-sm font-semibold text-gold-400">{project.award}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="py-20 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-bold text-ink mb-4">Want to see your project here?</h2>
          <p className="text-ink-dim mb-8 max-w-sm mx-auto">Join LEHS TSA and compete — the best projects earn a spot in our showcase.</p>
          <Link to="/join" className="btn-primary inline-flex">Join the Chapter <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
