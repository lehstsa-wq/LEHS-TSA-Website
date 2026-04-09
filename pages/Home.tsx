import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Trophy, Users, Calendar, BookOpen,
  ChevronRight, Star, Code2, Globe, Layers,
  Award, Target, Lightbulb
} from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────── */
const Counter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value, suffix = '', duration = 1.5
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on('change', v => setDisplay(Math.floor(v)));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
};

/* ─────────────────────────────────────────────────────────────
   TERMINAL TYPEWRITER
───────────────────────────────────────────────────────────── */
const TERMINAL_LINES = [
  '$ tsa --chapter "Little Elm HS" --year 2025',
  '> Loading 75+ members...',
  '> Competitions: Webmaster, Coding, Design...',
  '> State qualifiers: 50+',
  '> National qualifiers: 15+',
  '> Status: Chapter Active ✓',
];

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    if (currentLine >= TERMINAL_LINES.length) return;

    const line = TERMINAL_LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [inView, currentLine, currentChar]);

  const activeText = currentLine < TERMINAL_LINES.length
    ? TERMINAL_LINES[currentLine].slice(0, currentChar)
    : '';

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-space-500/60 bg-space-950 shadow-card font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-space-500/40 bg-space-800/50">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-ink-muted text-[11px] tracking-wide">lehs-tsa ~ bash</span>
      </div>
      {/* Content */}
      <div className="p-5 space-y-2 min-h-[200px]">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-gold-400' : 'text-green-400'}>
            {line}
          </div>
        ))}
        {currentLine < TERMINAL_LINES.length && (
          <div className={TERMINAL_LINES[currentLine].startsWith('$') ? 'text-gold-400' : 'text-green-400'}>
            {activeText}
            <span className="animate-pulse border-r-2 border-current ml-0.5">&nbsp;</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   BENTO GRID CARD
───────────────────────────────────────────────────────────── */
interface BentoCardProps {
  icon: React.ElementType;
  title: string;
  body: string;
  accent: string;
  link: string;
  className?: string;
  large?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ icon: Icon, title, body, accent, link, className = '', large }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className={`group relative rounded-2xl border border-space-500/60 overflow-hidden transition-all duration-300
      hover:border-opacity-80 cursor-pointer bg-space-800/40 h-full ${className}`}
    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
  >
    {/* Gradient hover overlay */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      style={{ background: `radial-gradient(ellipse at top left, ${accent}18, transparent 60%)` }}
    />
    {/* Shine */}
    <div className="absolute inset-0 bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className={`relative ${large ? 'p-8' : 'p-6'}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}
        style={{ background: `${accent}20`, color: accent }}>
        <Icon size={22} />
      </div>
      <h3 className={`font-bold text-ink mb-2 ${large ? 'text-xl' : 'text-base'}`}>{title}</h3>
      <p className={`text-ink-dim leading-relaxed ${large ? 'text-base' : 'text-sm'}`}>{body}</p>

      <Link to={link}
        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
        style={{ color: accent }}>
        Learn more <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────────────────────── */
const COMPETITIONS = [
  'Webmaster', 'Software Development', 'Coding', 'Architectural Design',
  'Dragster Design', 'Promotional Design', 'Video Game Design',
  'Technology Problem Solving', 'Forensic Technology', 'System Control Technology',
  'Engineering Design', 'Fashion Design', 'Graphic Design',
];

const MarqueeRow: React.FC<{ reverse?: boolean }> = ({ reverse }) => {
  const items = [...COMPETITIONS, ...COMPETITIONS];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} whitespace-nowrap`}>
        {items.map((c, i) => (
          <span key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-space-500/60 bg-space-800/50 text-sm text-ink-dim font-medium flex-shrink-0">
            <Trophy size={12} className="text-gold-500" />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const { announcements, eventsList, siteSettings } = useData();
  const latestNews = announcements.slice(0, 3);
  const upcomingEvents = eventsList
    .filter(e => e.status === 'Upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      <SEO
        title="Home"
        description="Little Elm High School TSA — Compete. Innovate. Lead. Join Texas's most driven TSA chapter."
      />

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-hero-mesh" />

        {/* Orbs */}
        <div className="orb orb-blue w-[600px] h-[600px] top-[-100px] right-[-100px] opacity-40 animate-orb-float-1" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-[50px] left-[-80px] opacity-30 animate-orb-float-2" />
        <div className="orb orb-gold w-[300px] h-[300px] bottom-[-50px] right-[30%] opacity-20 animate-orb-float-3" />
        <div className="orb orb-amber w-[250px] h-[250px] top-[20%] left-[15%] opacity-15 animate-orb-float-1" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="badge badge-blue mb-6 inline-flex"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-electric-500 animate-pulse" />
                Little Elm High School TSA · 2024–2025
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-balance"
              >
                Where{' '}
                <span className="text-gradient-blue">Technology</span>
                <br />
                Meets{' '}
                <span className="text-gradient-gold">Ambition.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-ink-dim leading-relaxed mb-8 max-w-lg"
              >
                Join Little Elm's award-winning TSA chapter. Compete in 30+ STEM events,
                develop real-world skills, and build the future alongside your peers.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/join" className="btn-primary text-base px-7 py-3.5 group">
                  Join the Chapter
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/competitions" className="btn-secondary text-base px-7 py-3.5 group">
                  <Trophy size={18} />
                  View Competitions
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-8 mt-10 pt-8 border-t border-space-500/40"
              >
                {[
                  { num: 75, suffix: '+', label: 'Members' },
                  { num: 50, suffix: '+', label: 'State Qualifiers' },
                  { num: 3,  suffix: '',  label: 'Years Running' },
                ].map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl font-black text-ink">
                      <Counter value={s.num} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-ink-muted mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <Terminal />

              {/* Mini cards below terminal */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { label: 'Next Event', value: siteSettings.nextEventTitle || 'State Conference', icon: Calendar, color: '#3b82f6' },
                  { label: 'Chapter Status', value: 'Active · TX', icon: Star, color: '#e05c5c' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, color: item.color }}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="text-[10px] text-ink-muted uppercase tracking-wide">{item.label}</div>
                        <div className="text-sm font-semibold text-ink">{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-950 via-space-950/80 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════
          COMPETITION MARQUEE
      ═══════════════════════════════════════════════════ */}
      <section className="py-10 overflow-hidden border-y border-space-500/30 bg-space-950">
        <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES BENTO GRID
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4"><div className="section-label">What We Do</div></div>
          <h2 className="section-title mb-4">Everything a future tech leader needs</h2>
          <p className="section-body max-w-2xl mx-auto">
            From robotics to software to design — LEHS TSA is where ideas become achievements.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 h-full"
          >
            <BentoCard
              icon={Trophy}
              title="Compete in 30+ Events"
              body="From Software Development to Architectural Design, TSA competitions build real-world skills across engineering, coding, design, and leadership disciplines."
              accent="#3b82f6"
              link="/competitions"
              large
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BentoCard
              icon={Code2}
              title="Code & Build"
              body="Sharpen your software skills with coding competitions, hackathons, and collaborative build nights."
              accent="#8b5cf6"
              link="/competitions"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <BentoCard
              icon={Users}
              title="Lead & Grow"
              body="Run for officer positions, organize events, and develop the leadership skills that colleges and employers value."
              accent="#e05c5c"
              link="/officers"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BentoCard
              icon={Globe}
              title="Connect Nationally"
              body="Compete at regional, state, and national TSA conferences alongside thousands of STEM students from across the country."
              accent="#22c55e"
              link="/events"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <BentoCard
              icon={Layers}
              title="Design & Create"
              body="Graphic design, video game design, architectural modeling, fashion design — TSA rewards every kind of creative talent."
              accent="#f97316"
              link="/competitions"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BentoCard
              icon={BookOpen}
              title="Study & Prepare"
              body="Access competition guides, past results, and expert prep materials — everything you need to walk into any event confident."
              accent="#06b6d4"
              link="/resources"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 overflow-hidden relative bg-space-950/60 border-y border-space-500/20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/5 via-violet-500/5 to-gold-500/5" />
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: 75,  suffix: '+',  label: 'Active Members',      icon: Users,  color: '#3b82f6' },
              { val: 50,  suffix: '+',  label: 'State Qualifiers',    icon: Trophy, color: '#e05c5c' },
              { val: 15,  suffix: '+',  label: 'National Qualifiers', icon: Award,  color: '#f59e0b' },
              { val: 3,   suffix: '',   label: 'Years of Excellence', icon: Star,   color: '#22c55e' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${stat.color}20`, color: stat.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="text-4xl font-black text-ink mb-1">
                    <Counter value={stat.val} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-ink-muted">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NEWS + EVENTS PREVIEW
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Latest News */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="section-label inline-flex mb-2">Updates</div>
                <h2 className="text-2xl font-bold text-ink">Latest News</h2>
              </div>
              <Link to="/news"
                className="flex items-center gap-1.5 text-sm text-electric-500 hover:text-electric-400 transition-colors font-medium">
                View all <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-3">
              {latestNews.length > 0 ? latestNews.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative card hover:border-electric-300/40 overflow-hidden"
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
                <div className="card text-center py-10 text-ink-muted text-sm">
                  No announcements yet — check back soon!
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
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
                const CATEGORY_COLORS: Record<string, string> = {
                  Competition: 'badge-gold',
                  Meeting: 'badge-blue',
                  Workshop: 'badge-purple',
                  Social: 'badge-green',
                  Fundraiser: 'badge-purple',
                };
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
                        <span>·</span>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <span className={`badge ${CATEGORY_COLORS[event.category] || 'badge-blue'} flex-shrink-0`}>
                      {event.category}
                    </span>
                  </motion.div>
                );
              }) : (
                <div className="card text-center py-10 text-ink-muted text-sm">
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
      <section className="py-24 bg-space-950/60 border-y border-space-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4"><div className="section-label">Membership</div></div>
            <h2 className="section-title mb-4">Get started in 3 steps</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                icon: Target,
                title: 'Apply',
                body: 'Fill out the membership form and submit your dues. Takes less than 5 minutes.',
                color: '#3b82f6',
              },
              {
                num: '02',
                icon: Lightbulb,
                title: 'Pick Events',
                body: 'Browse 30+ competitive events across engineering, coding, design, and leadership.',
                color: '#f97316',
              },
              {
                num: '03',
                icon: Trophy,
                title: 'Compete & Win',
                body: 'Train, collaborate, and compete at regional, state, and national conferences.',
                color: '#8b5cf6',
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  {/* Connector line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+44px)] w-[calc(100%-44px)] h-px bg-gradient-to-r from-space-500/50 to-transparent" />
                  )}
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center relative"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <Icon size={26} style={{ color: step.color }} />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                      style={{ background: step.color, color: '#07111e' }}>
                      {step.num.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-ink mb-3">{step.title}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed max-w-xs mx-auto">{step.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Orb backdrop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.4), transparent 70%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6"><div className="section-label">Ready?</div></div>
          <h2 className="text-4xl sm:text-5xl font-black text-ink mb-6 text-balance">
            Your future in tech starts{' '}
            <span className="text-gradient-blue">here.</span>
          </h2>
          <p className="text-lg text-ink-dim mb-8">
            Join the Little Elm TSA chapter today and compete, build, and lead
            alongside the next generation of innovators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/join" className="btn-primary text-base px-8 py-4 group">
              Join Now — It's Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-secondary text-base px-8 py-4">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
