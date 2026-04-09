import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Filter, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { Countdown } from '../components/Countdown';

const CATEGORY_COLORS: Record<string, string> = {
  Competition: 'badge-gold',
  Meeting:     'badge-blue',
  Workshop:    'badge-purple',
  Social:      'badge-green',
  Fundraiser:  'badge-purple',
};

const CATEGORIES = ['All', 'Meeting', 'Competition', 'Workshop', 'Social', 'Fundraiser'];

const Events: React.FC = () => {
  const { eventsList } = useData();
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Past'>('Upcoming');
  const [category, setCategory] = useState('All');

  const filtered = eventsList.filter(e => {
    const matchStatus   = filter === 'All' || e.status === filter;
    const matchCategory = category === 'All' || e.category === category;
    return matchStatus && matchCategory;
  });

  const upcoming = filtered.filter(e => e.status === 'Upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past     = filtered.filter(e => e.status === 'Past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const renderEvents = filter === 'Past' ? past : filter === 'Upcoming' ? upcoming : [...upcoming, ...past];

  return (
    <div>
      <SEO title="Events" description="LEHS TSA upcoming events, competitions, and meetings. Stay on schedule." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-blue w-[400px] h-[400px] top-[-60px] right-[10%] opacity-25 animate-orb-float-1" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label inline-flex mb-4"><Calendar size={12} /> Schedule</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Events & Calendar</h1>
            <p className="section-body max-w-2xl">
              Stay on top of every meeting, competition, workshop, and social event. Never miss a deadline.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-space-900 to-transparent" />
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-space-900/90 backdrop-blur-xl border-b border-space-500/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">
          <div className="flex gap-1.5">
            {(['All', 'Upcoming', 'Past'] as const).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === s ? 'bg-electric-500 text-white shadow-glow-blue' : 'bg-space-700/50 text-ink-muted hover:text-ink border border-space-500/50'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 ml-auto flex-wrap">
            <Filter size={13} className="text-ink-muted self-center" />
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${category === c ? 'bg-gold-500 text-space-950' : 'bg-space-700/50 text-ink-muted hover:text-ink border border-space-500/50'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {renderEvents.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <Calendar size={40} className="mx-auto mb-4 opacity-30" />
            <p>No events found for the current filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {renderEvents.map((event, i) => {
              const d   = new Date(event.date);
              const mon = d.toLocaleString('default', { month: 'short' }).toUpperCase();
              const day = d.getDate();
              const yr  = d.getFullYear();
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`card flex gap-5 group ${event.status === 'Past' ? 'opacity-60' : ''}`}
                >
                  {/* Date block */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-space-700/80 border border-space-500/60 flex flex-col items-center justify-center">
                    <div className="text-[10px] font-bold text-gold-500 uppercase tracking-wide">{mon}</div>
                    <div className="text-2xl font-black text-ink leading-none">{day}</div>
                    <div className="text-[10px] text-ink-muted">{yr}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bold text-ink text-lg group-hover:text-electric-400 transition-colors">{event.title}</h3>
                      <span className={`badge ${CATEGORY_COLORS[event.category] || 'badge-blue'} flex-shrink-0`}>{event.category}</span>
                    </div>
                    {event.description && <p className="text-sm text-ink-dim mt-1.5 line-clamp-2">{event.description}</p>}
                    <div className="flex items-center gap-4 mt-3 text-xs text-ink-muted flex-wrap">
                      {event.time && (
                        <span className="flex items-center gap-1.5"><Clock size={12} />{event.time}</span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1.5"><MapPin size={12} />{event.location}</span>
                      )}
                      {event.status === 'Past' && <span className="text-ink-ghost">Past event</span>}
                    </div>
                  </div>

                  {event.rsvpLink && (
                    <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2 px-3 flex-shrink-0 self-center">
                      RSVP <ExternalLink size={13} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
