import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, ChevronRight, Trophy, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

/* ─────────────────────────────────────────────────────────────
   HOME PAGE — Editorial Masthead Layout
───────────────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const { announcements, eventsList, officersList } = useData();
  const { isAuthenticated } = useAuth();

  const latestNews = announcements.slice(0, 4);
  const nextEvents = eventsList
    .filter(e => e.date && new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
    .slice(0, 3);

  const presidentOfficer = officersList.find(o =>
    o.role.toLowerCase().includes('president') && !o.role.toLowerCase().includes('vice')
  );

  const season = (() => {
    const m = new Date().getMonth();
    if (m >= 8) return 'Fall';
    if (m >= 5) return 'Summer';
    if (m >= 2) return 'Spring';
    return 'Winter';
  })();
  const year = new Date().getFullYear();

  return (
    <div style={{ background: 'var(--c-bg)' }}>

      {/* ═══════════════════════════════════════════════════════
          MASTHEAD
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">

        {/* Publication bar */}
        <div
          className="flex items-center justify-between pb-3 border-b"
          style={{ borderColor: 'var(--c-border)' }}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--c-text-muted)' }}>
            Technology Student Association · Little Elm High School
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--c-text-muted)' }}>
            {season} {year}
          </span>
        </div>

        {/* Hero split */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0 min-h-[52vh] items-center overflow-hidden">

          {/* Left: headline + CTAs */}
          <div className="py-14 lg:py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              <div
                className="text-[11px] font-mono uppercase tracking-widest mb-5"
                style={{ color: 'var(--c-gold)' }}
              >
                Chapter 2024–25
              </div>

              <h1
                className="font-display leading-[0.92] tracking-tight mb-6"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                  color: 'var(--c-text)',
                  fontWeight: 700,
                }}
              >
                Compete.
                <br />
                <span style={{ color: 'var(--c-gold)' }}>Innovate.</span>
                <br />
                Lead.
              </h1>

              <p
                className="text-base leading-relaxed mb-8 max-w-md"
                style={{ color: 'var(--c-text-dim)', fontFamily: 'var(--font-sans)' }}
              >
                {"Little Elm High School's TSA chapter — where engineering students compete at state and national level."}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/competitions" className="btn-primary">
                  View Competitions
                  <ArrowRight size={15} />
                </Link>
                {!isAuthenticated ? (
                  <Link to="/join" className="btn-secondary">
                    Join the Chapter
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn-secondary">
                    My Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right: TSA emblem — large structural graphic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:flex items-center justify-end self-stretch"
            style={{ width: '38vw', maxWidth: '480px', minWidth: '320px' }}
            aria-hidden="true"
          >
            <img
              src="/assets/tsa-emblem.svg"
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                opacity: 0.1,
                filter: 'brightness(4) saturate(0)',
                transform: 'scale(1.2) translateX(8%)',
                transformOrigin: 'center center',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--c-border)' }} />

      {/* ═══════════════════════════════════════════════════════
          CONTENT GRID — News + Events
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">

          {/* Left: Announcements */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl" style={{ color: 'var(--c-text)' }}>
                Latest News
              </h2>
              <Link
                to="/news"
                className="text-xs flex items-center gap-1 transition-colors"
                style={{ color: 'var(--c-text-dim)' }}
              >
                All announcements <ChevronRight size={12} />
              </Link>
            </div>

            {latestNews.length > 0 ? (
              <div>
                {latestNews.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.07 }}
                    className={`py-5 ${i < latestNews.length - 1 ? 'border-b' : ''}`}
                    style={{ borderColor: 'var(--c-border)' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[10px] font-mono uppercase tracking-widest mb-1.5"
                          style={{ color: 'var(--c-text-muted)' }}
                        >
                          {item.date
                            ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : 'Recent'}
                        </div>
                        <h3
                          className="font-display font-semibold text-base leading-snug mb-1"
                          style={{ color: 'var(--c-text)' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed line-clamp-2"
                          style={{ color: 'var(--c-text-dim)' }}
                        >
                          {item.content}
                        </p>
                      </div>
                      {item.isPinned && (
                        <span className="badge badge-gold flex-shrink-0 mt-0.5">Pinned</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className="py-10 rounded text-center text-sm"
                style={{ border: '1px solid var(--c-border)', color: 'var(--c-text-dim)' }}
              >
                No announcements yet. Check back soon.
              </div>
            )}
          </div>

          {/* Right: Events + Quick Links */}
          <div className="space-y-10">

            {/* Upcoming events */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl" style={{ color: 'var(--c-text)' }}>
                  Upcoming
                </h2>
                <Link
                  to="/events"
                  className="text-xs flex items-center gap-1"
                  style={{ color: 'var(--c-text-dim)' }}
                >
                  Calendar <ChevronRight size={12} />
                </Link>
              </div>

              {nextEvents.length > 0 ? (
                <div>
                  {nextEvents.map((evt, i) => {
                    const d = evt.date ? new Date(evt.date) : null;
                    return (
                      <div
                        key={evt.id}
                        className={`flex gap-4 py-4 ${i < nextEvents.length - 1 ? 'border-b' : ''}`}
                        style={{ borderColor: 'var(--c-border)' }}
                      >
                        {d ? (
                          <div className="flex-shrink-0 w-11 text-center">
                            <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--c-gold)' }}>
                              {d.toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div
                              className="font-display font-bold text-xl leading-none"
                              style={{ color: 'var(--c-text)' }}
                            >
                              {d.getDate()}
                            </div>
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-11 pt-1">
                            <Calendar size={18} style={{ color: 'var(--c-text-muted)' }} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-medium leading-snug" style={{ color: 'var(--c-text)' }}>
                            {evt.title}
                          </div>
                          {evt.location && (
                            <div className="text-xs mt-0.5" style={{ color: 'var(--c-text-muted)' }}>
                              {evt.location}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm py-4" style={{ color: 'var(--c-text-dim)' }}>
                  No upcoming events scheduled.
                </p>
              )}
            </div>

            {/* Quick links */}
            <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '2rem' }}>
              <h2 className="font-display font-bold text-xl mb-5" style={{ color: 'var(--c-text)' }}>
                Explore
              </h2>
              <div>
                {[
                  { label: 'Browse Competitions', path: '/competitions', Icon: Trophy },
                  { label: 'Team Formation', path: '/teams', Icon: Users },
                  { label: 'Opportunities', path: '/opportunities', Icon: ArrowRight },
                  { label: 'Join the Chapter', path: '/join', Icon: ArrowRight },
                ].map((item, i, arr) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between py-3 transition-colors group ${i < arr.length - 1 ? 'border-b' : ''}`}
                    style={{ borderColor: 'var(--c-border)', color: 'var(--c-text-dim)' }}
                  >
                    <span
                      className="text-sm group-hover:text-[var(--c-text)] transition-colors duration-150"
                    >
                      {item.label}
                    </span>
                    <ChevronRight size={14} className="opacity-40 group-hover:opacity-80 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT BAND
      ═══════════════════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-surface)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <div>
              <div className="w-8 h-0.5 mb-5" style={{ background: 'var(--c-gold)' }} />
              <h2 className="font-display font-bold text-3xl leading-tight mb-3" style={{ color: 'var(--c-text)' }}>
                What is TSA?
              </h2>
              <p className="text-sm" style={{ color: 'var(--c-text-dim)' }}>
                Technology Student Association
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--c-text-dim)' }}>
                The Technology Student Association is a national nonprofit dedicated to STEM education.
                Members compete in engineering, coding, design, and technology events at regional, state,
                and national competitions.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--c-text-dim)' }}>
                The LEHS chapter competes across dozens of events — from Software Development and Coding
                to Video Game Design, CAD, and Structural Engineering. We bring home medals at Texas
                State every year.
              </p>
              <div className="flex flex-wrap gap-8">
                {[
                  { label: '60+ events', note: 'competition categories' },
                  { label: 'Est. 2022', note: 'chapter founded' },
                  { label: 'State & Nationals', note: 'competition levels' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="font-display font-semibold text-lg" style={{ color: 'var(--c-text)' }}>
                      {stat.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--c-text-muted)' }}>
                      {stat.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COMPETITION CTA
      ═══════════════════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
            <div>
              <div className="w-8 h-0.5 mb-5" style={{ background: 'var(--c-gold)' }} />
              <h2
                className="font-display font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'var(--c-text)' }}
              >
                Ready to compete?
              </h2>
              <p className="text-base max-w-lg" style={{ color: 'var(--c-text-dim)' }}>
                Browse 60+ TSA competition events, register your interest, form a team,
                and start building toward State and Nationals.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/competitions" className="btn-primary">
                See Competitions <ArrowRight size={15} />
              </Link>
              {!isAuthenticated && (
                <Link to="/join" className="btn-secondary">
                  Join Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OFFICER SPOTLIGHT
      ═══════════════════════════════════════════════════════ */}
      {presidentOfficer && (
        <section style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-surface)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">
              <div>
                <div className="w-8 h-0.5 mb-5" style={{ background: 'var(--c-gold)' }} />
                <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--c-text)' }}>
                  Leadership
                </h2>
              </div>
              <div className="flex items-start gap-6">
                {presidentOfficer.imageUrl ? (
                  <img
                    src={presidentOfficer.imageUrl}
                    alt={presidentOfficer.name}
                    className="w-16 h-16 rounded-sm object-cover flex-shrink-0"
                    style={{ border: '1px solid var(--c-border)' }}
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-sm flex-shrink-0 flex items-center justify-center font-display font-bold text-xl"
                    style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-gold)' }}
                  >
                    {presidentOfficer.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: 'var(--c-gold)' }}
                  >
                    {presidentOfficer.role}
                  </div>
                  <div className="font-display font-bold text-lg mb-2" style={{ color: 'var(--c-text)' }}>
                    {presidentOfficer.name}
                  </div>
                  {presidentOfficer.bio && (
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-dim)' }}>
                      {presidentOfficer.bio}
                    </p>
                  )}
                  <Link
                    to="/officers"
                    className="inline-flex items-center gap-1 text-xs mt-3 transition-colors"
                    style={{ color: 'var(--c-text-muted)' }}
                  >
                    Meet all officers <ChevronRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
