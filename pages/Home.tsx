import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { MILESTONES, CHAPTER_YEARS, CHAPTER_YEARS_WORD } from '../data/milestones';
import { TOTAL_COMPETITIONS } from '../data/competitions';
import {
  SectionHeader, Reveal, StatCard, Counter,
  StageScene, TabRail, StoryTrack, AnnouncementPill, VideoEmbed,
} from '../components/sections';
import type { Stage, TabItem } from '../components/sections';

const CATEGORY_COLORS: Record<string, string> = {
  Competition: 'badge-gold',
  Meeting: 'badge-blue',
  Workshop: 'badge-purple',
  Social: 'badge-green',
  Fundraiser: 'badge-purple',
};

/* ─────────────────────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────────────────────── */
const COMPETITIONS = [
  'Webmaster', 'Software Development', 'Coding', 'Architectural Design',
  'Dragster Design', 'Promotional Design', 'Video Game Design',
  'Technology Problem Solving', 'Forensic Technology', 'System Control Technology',
  'Engineering Design', 'Fashion Design', 'Graphic Design',
];

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS: stages for the scroll scene
───────────────────────────────────────────────────────────── */
const HOW_IT_WORKS: Stage[] = [
  {
    num: '01',
    title: 'Apply',
    body: 'Fill out the membership form and submit your dues. Takes less than 5 minutes.',
    accent: '#005DAA',
    image: '/assets/photos/step-apply.jpg',
    imageAlt: 'Illuminated TSA marquee letters at a chapter event',
  },
  {
    num: '02',
    title: 'Pick Events',
    body: 'Browse 30+ competitive events across engineering, coding, design, and leadership.',
    accent: '#EC881D',
    image: '/assets/photos/step-pick.jpg',
    imageAlt: 'A member choosing and preparing a glider for competition',
  },
  {
    num: '03',
    title: 'Compete & Win',
    body: 'Train, collaborate, and compete at regional, state, and national conferences.',
    accent: '#574E8F',
    image: '/assets/photos/step-win.jpg',
    imageAlt: 'Chapter members holding a competition trophy',
  },
];

/* ─────────────────────────────────────────────────────────────
   WHAT WE DO: tab rail
───────────────────────────────────────────────────────────── */
const WHAT_WE_DO: TabItem[] = [
  {
    label: 'Compete in 30+ Events',
    image: '/assets/photos/compete.jpg',
    imageAlt: 'Four chapter members in TSA blazers posing together at a conference',
    accent: '#005DAA',
    description: 'From Software Development to Architectural Design, TSA competitions build real-world skills across engineering, coding, design, and leadership disciplines.',
    panel: (
      <div>
        <h3 className="section-h2 text-2xl md:text-3xl mb-3">Compete in 30+ Events</h3>
        <Link to="/competitions" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium" style={{ color: '#005DAA' }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    ),
  },
  {
    label: 'Lead & Grow',
    image: '/assets/photos/lead.jpg',
    imageAlt: 'A member reacting on stage as Photographic Technology finalists are announced',
    accent: '#EC881D',
    description: 'Run for officer positions, organize events, and develop the leadership skills that colleges and employers value.',
    panel: (
      <div>
        <h3 className="section-h2 text-2xl md:text-3xl mb-3">Lead & Grow</h3>
        <Link to="/officers" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium" style={{ color: '#EE2624' }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    ),
  },
  {
    label: 'Connect Nationally',
    image: '/assets/photos/connect.jpg',
    imageAlt: 'A member holding a collector pin map at the national conference',
    accent: '#EE2624',
    description: 'Compete at regional, state, and national TSA conferences alongside thousands of STEM students from across the country.',
    panel: (
      <div>
        <h3 className="section-h2 text-2xl md:text-3xl mb-3">Connect Nationally</h3>
        <Link to="/events" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium" style={{ color: '#86BB50' }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    ),
  },
  {
    label: 'Code & Build',
    image: '/assets/photos/build.jpg',
    imageAlt: 'Members setting up their competition builds at the event tables',
    accent: '#574E8F',
    description: 'Sharpen your software skills with coding competitions, hackathons, and collaborative build nights.',
    panel: (
      <div>
        <h3 className="section-h2 text-2xl md:text-3xl mb-3">Code & Build</h3>
        <Link to="/competitions" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium" style={{ color: '#574E8F' }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    ),
  },
  {
    label: 'Design & Create',
    image: '/assets/photos/design.jpg',
    imageAlt: 'Two members examining an architectural scale model',
    accent: '#86BB50',
    description: 'Graphic design, video game design, architectural modeling, fashion design. TSA rewards every kind of creative talent.',
    panel: (
      <div>
        <h3 className="section-h2 text-2xl md:text-3xl mb-3">Design & Create</h3>
        <Link to="/competitions" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium" style={{ color: '#EC881D' }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    ),
  },
  {
    label: 'Study & Prepare',
    image: '/assets/photos/study.jpg',
    imageAlt: 'Members preparing a balsa glider together before an event',
    accent: '#4E8AC9',
    description: 'Access competition guides, past results, and expert prep materials, everything you need to walk into any event confident.',
    panel: (
      <div>
        <h3 className="section-h2 text-2xl md:text-3xl mb-3">Study & Prepare</h3>
        <Link to="/resources" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium" style={{ color: '#4E8AC9' }}>
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    ),
  },
];

const Home: React.FC = () => {
  const { announcements, eventsList, nextEvent } = useData();
  const latestNews = announcements.slice(0, 3);
  const upcomingEvents = eventsList
    .filter(e => e.status === 'Upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      <SEO
        title="Home"
        description="Little Elm High School TSA. Compete. Innovate. Lead. Join Texas's most driven TSA chapter."
      />

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[78vh] flex items-center overflow-hidden">
        {/* Chapter photo backdrop, dimmed so the headline keeps its contrast */}
        <img
          src="/assets/photos/hero-chapter.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 w-full text-center">
          {/* Announcement */}
          {nextEvent && (
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <AnnouncementPill
                label="Next Event"
                text={`${nextEvent.title} · ${new Date(nextEvent.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
                href="/events"
                cta="See schedule"
              />
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="hero-title mb-6 text-balance"
          >
            Where{' '}
            <span style={{ color: '#4E8AC9' }}>Technology</span>
            <br />
            Meets{' '}
            <span style={{ color: '#EE2624' }}>Ambition.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="section-dek mx-auto mb-7"
          >
            Join Little Elm's award-winning TSA chapter! Compete in 30+ STEM events,
            develop real-world skills, and build the future alongside your peers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.19 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/join" className="btn-primary text-base px-7 py-3.5 group">
              Join the Chapter
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/competitions" className="btn-secondary text-base px-7 py-3.5 group">
              View Competitions
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
            className="flex flex-wrap gap-8 mt-8 justify-center"
          >
            {[
              { num: 50, suffix: '', label: 'MEMBERS',          color: 'text-electric-400' },
              { num: 20, suffix: '', label: 'STATE QUALIFIERS',  color: 'text-gold-400' },
              { num: 14, suffix: '', label: 'NATIONAL QUALIFIERS', color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i}>
                <div className={`stat-value ${s.color}`}>
                  <Counter value={s.num} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Mini cards */}
          <motion.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.33 }}
            className="grid grid-cols-2 gap-3 mt-8 max-w-lg mx-auto text-left"
          >
            {[
              {
                label: 'Next Event',
                value: nextEvent?.title ?? 'To be announced',
                sub: nextEvent
                  ? new Date(nextEvent.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                  : undefined,
              },
              { label: 'Chapter Status', value: 'Active, TX' },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-4">
                <div className="text-[10px] text-ink-muted uppercase tracking-wide">{item.label}</div>
                <div className="text-sm font-semibold text-ink truncate">{item.value}</div>
                {item.sub && <div className="text-[11px] text-ink-muted mt-0.5">{item.sub}</div>}
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════
          COMPETITION MARQUEE
      ═══════════════════════════════════════════════════ */}
      <section
        className="border-y"
        style={{
          borderColor: 'var(--c-hairline)',
          background: 'var(--c-surface)',
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-eyebrow justify-center w-full mb-5">
            <span aria-hidden="true" className="section-eyebrow__flank">◆</span>
            Event Examples
            <span aria-hidden="true" className="section-eyebrow__flank">◆</span>
          </h2>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {COMPETITIONS.map(name => (
              <li
                key={name}
                className="text-sm font-medium px-4 py-2 rounded-full"
                style={{
                  background: 'var(--c-card)',
                  border: '1px solid var(--c-amber)',
                  color: 'var(--c-text)',
                }}
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="text-center mt-6">
            <Link to="/competitions" className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-500 hover:text-electric-400 transition-colors">
              See all {TOTAL_COMPETITIONS} competitions <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CHAPTER VIDEO
      ═══════════════════════════════════════════════════ */}
      <section
        className="px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Watch"
            title="What TSA is all about"
            className="mb-6"
          />
          <Reveal>
            <VideoEmbed
              src="https://player.vimeo.com/video/986072709?h=49a2c22ff7"
              title="TSA Overview, from the Technology Student Association"
            />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES BENTO GRID
      ═══════════════════════════════════════════════════ */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="What We Do"
          title="Compete. Innovate. Lead."
          className="mb-7"
        />

        <TabRail items={WHAT_WE_DO} />
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-7 overflow-hidden relative bg-space-950/60 border-y border-space-500/20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/5 via-violet-500/5 to-gold-500/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 50,  suffix: '+',  label: 'Active Members',      accent: 'var(--c-blue-bright)' },
              { val: 20,  suffix: '+',  label: 'State Qualifiers',    accent: 'var(--c-red)' },
              { val: 14,  suffix: '+',  label: 'National Qualifiers', accent: 'var(--c-amber)' },
              { val: CHAPTER_YEARS, suffix: '', label: 'Years of Excellence', accent: 'var(--c-green)' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 80}>
                <StatCard
                  value={stat.val}
                  suffix={stat.suffix}
                  label={stat.label}
                  accent={stat.accent}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NEWS + EVENTS PREVIEW
      ═══════════════════════════════════════════════════ */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-10">

          {/* Latest News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="section-label inline-flex mb-2">Updates</div>
                <h2 className="text-2xl font-bold text-ink">Latest News</h2>
              </div>
              <Link to="/news"
                className="flex items-center gap-1.5 text-sm text-electric-500 hover:text-electric-400 transition-colors font-medium">
                View all <ChevronRight size={16} />
              </Link>
            </div>

            <StoryTrack label="Latest news">
              {latestNews.length > 0 ? latestNews.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative card h-full hover:border-electric-300/40 overflow-hidden"
                >
                  <div className="highlight-bar opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0 pl-2">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="badge badge-blue text-[10px]">{item.type}</span>
                        <span className="text-xs text-ink-muted">{item.date}</span>
                      </div>
                      <h3 className="font-semibold text-ink mb-1.5 group-hover:text-electric-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-ink-dim line-clamp-2">{item.content}</p>
                    </div>
                    <ChevronRight size={16} className="text-ink-ghost flex-shrink-0 mt-1 group-hover:text-electric-500 transition-colors" />
                  </div>
                </motion.div>
              )) : (
                <div className="card text-center py-6 text-ink-muted text-sm">
                  No announcements yet, check back soon!
                </div>
              )}
            </StoryTrack>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="section-label inline-flex mb-2">Schedule</div>
                <h2 className="text-2xl font-bold text-ink">Upcoming Events</h2>
              </div>
              <Link to="/events"
                className="flex items-center gap-1.5 text-sm text-electric-500 hover:text-electric-400 transition-colors font-medium">
                Calendar <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.length > 0 ? upcomingEvents.map((event, i) => {
                const d = new Date(event.date);
                const mon = d.toLocaleString('default', { month: 'short' }).toUpperCase();
                const day = d.getDate();
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group card flex items-center gap-4 hover:border-gold-300/40 overflow-hidden relative"
                  >
                    {/* Date block */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-space-700/80 border border-space-500/60 flex flex-col items-center justify-center text-center">
                      <div className="text-[10px] font-bold text-gold-500 uppercase tracking-wide">{mon}</div>
                      <div className="text-xl font-black text-ink leading-none">{day}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink mb-1 truncate group-hover:text-gold-400 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        <span>{event.time}</span>
                        {event.location && <span className="truncate">{event.location}</span>}
                      </div>
                    </div>

                    <span className={`badge ${CATEGORY_COLORS[event.category] || 'badge-blue'} flex-shrink-0`}>
                      {event.category}
                    </span>
                  </motion.div>
                );
              }) : (
                <div className="card text-center py-6 text-ink-muted text-sm">
                  No upcoming events scheduled yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════
          CASE STUDIES
      ═══════════════════════════════════════════════════ */}
      <section
        className="px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Accomplishments"
            title="Chapter Achievements"
            dek={`${CHAPTER_YEARS_WORD} years of results, from ten founding members to the largest STEM organization at Little Elm High School.`}
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 70}>
                <article
                  className="h-full"
                  style={{
                    borderRadius: 'var(--card-radius)',
                    padding: 'var(--card-pad)',
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-hairline)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="block h-1 w-10 rounded-full mb-4"
                    style={{ background: m.accent }}
                  />
                  <p className="font-mono text-xs mb-2" style={{ color: m.accent }}>{m.year}</p>
                  <h3 className="font-bold text-ink mb-2">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-dim">{m.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/about" className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-500 hover:text-electric-400 transition-colors">
              Read the full chapter story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <StageScene
        className="bg-space-950/60 border-y border-space-500/30"
        eyebrow="Membership"
        title="Get started in 3 steps"
        stages={HOW_IT_WORKS}
      />


      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cta-gradient-box flex flex-col lg:flex-row justify-between items-center gap-8 rounded-3xl px-10 py-8"
        >
          <div>
            <div className="badge badge-gold mb-3 uppercase tracking-widest text-[11px]">Apply Now</div>
            <h3 className="text-3xl sm:text-4xl font-black text-ink mb-2 tracking-tight">
              Your future in tech starts here.
            </h3>
            <p className="text-ink-dim text-base">
              Applications open for 2026-2027. Get started in 3 steps.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/join" className="btn-primary text-base px-7 py-3.5 group">
              Join Chapter
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-secondary text-base px-7 py-3.5">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
