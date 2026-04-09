import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Star, Heart, Target, Lightbulb, ChevronRight, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { LazyImage } from '../components/LazyImage';
import { SEO } from '../components/SEO';

/* ─────────────────────────────────────────────────────────────
   TIMELINE DATA  (TODO: Update with real chapter milestones)
───────────────────────────────────────────────────────────── */
const TIMELINE = [
  {
    year: '2022',
    title: 'Chapter Founded',
    body: 'Little Elm High School officially chartered its TSA chapter, welcoming its first 20 founding members.',
    accent: '#3b82f6',
  },
  {
    year: '2023',
    title: 'First Regional Competition',
    body: 'The chapter sent its first team to regionals, earning multiple top-3 placements in Webmaster and Coding.',
    accent: '#e05c5c',
  },
  {
    year: '2024',
    title: 'State Conference Debut',
    body: 'LEHS TSA qualified 50+ members for the Texas State Conference — a landmark milestone for the chapter.',
    accent: '#8b5cf6',
  },
  {
    year: '2025',
    title: 'National Qualifiers',
    body: 'For the first time in chapter history, LEHS TSA members advanced to the National TSA Conference.',
    accent: '#22c55e',
  },
];

/* ─────────────────────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────────────────────── */
const About: React.FC = () => {
  const { officersList } = useData();
  const executive = officersList.filter(o => o.category === 'Executive').slice(0, 6);
  const advisors  = officersList.filter(o => o.category === 'Advisor');

  return (
    <div>
      <SEO
        title="About"
        description="Learn about Little Elm High School TSA — our history, mission, leadership team, and chapter milestones."
      />

      {/* ── Hero ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-blue w-[500px] h-[400px] top-[-80px] right-[-60px] opacity-30 animate-orb-float-1" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label inline-flex mb-4">Our Chapter</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">About LEHS TSA</h1>
            <p className="section-body max-w-2xl">
              We're a student-run Technology Student Association chapter dedicated to
              developing the next generation of tech leaders through competition, collaboration, and community.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-space-900 to-transparent" />
      </section>

      {/* ── What is TSA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label inline-flex mb-4">What We Are</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">
              The only student org devoted entirely to STEM.
            </h2>
            <div className="space-y-5 text-ink-dim leading-relaxed text-base">
              <p>
                The Technology Student Association (TSA) is the only student organization exclusively
                devoted to students enrolled in STEM courses. With chapters in all 50 states and over
                250,000 members, TSA is the gold standard for tech-focused student activity.
              </p>
              <p>
                At Little Elm High School, our chapter fosters personal growth, leadership, and
                real-world skills. Members apply science, technology, engineering, and math concepts
                through 30+ competitive events and collaborative projects.
              </p>
              <p>
                Whether you're into coding, design, engineering, or leadership — there's a TSA event
                built for you.
              </p>
            </div>
            <Link to="/competitions" className="btn-primary mt-8 inline-flex">
              Explore Competitions <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: '75+',  label: 'Active Members',      icon: Users,     color: '#3b82f6' },
              { val: '50+',  label: 'State Qualifiers',    icon: Trophy,    color: '#e05c5c' },
              { val: '15+',  label: 'National Qualifiers', icon: Star,      color: '#8b5cf6' },
              { val: '3',    label: 'Years of Excellence', icon: Heart,     color: '#22c55e' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card text-center group"
                >
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: `${s.color}20`, color: s.color }}>
                    <Icon size={20} />
                  </div>
                  <div className="text-3xl font-black text-ink mb-1">{s.val}</div>
                  <div className="text-xs text-ink-muted">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-20 bg-space-950/60 border-y border-space-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label inline-flex mb-4">What Drives Us</div>
            <h2 className="section-title mb-4">Mission & Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Mission',
                body: 'To foster personal growth, leadership, and opportunities in technology, innovation, design, and engineering for every student at Little Elm High School.',
                accent: '#3b82f6',
              },
              {
                icon: Lightbulb,
                title: 'Vision',
                body: 'A world where every student has the technical skills, leadership experience, and competitive edge to shape the future of technology.',
                accent: '#e05c5c',
              },
              {
                icon: Heart,
                title: 'Values',
                body: 'Excellence in competition. Integrity in everything. Community above individual. Innovation as a mindset. Inclusion for every aspiring engineer and creator.',
                accent: '#8b5cf6',
              },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card group hover:border-opacity-80"
                  style={{ '--hover-color': v.accent } as React.CSSProperties}
                >
                  <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                    style={{ background: `${v.accent}20`, color: v.accent }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-ink mb-3">{v.title}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label inline-flex mb-4">Our Story</div>
          <h2 className="section-title">Chapter Milestones</h2>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-500/40 via-violet-500/40 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex gap-8 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="flex-1 card group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="font-mono text-sm font-bold px-3 py-1 rounded-full"
                      style={{ background: `${item.accent}20`, color: item.accent }}>
                      {item.year}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed">{item.body}</p>
                </div>

                {/* Center dot (desktop) */}
                <div className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full border-2 z-10 items-center justify-center mt-4"
                  style={{ background: `${item.accent}20`, borderColor: item.accent }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Officer Team ── */}
      {executive.length > 0 && (
        <section className="py-20 bg-space-950/60 border-t border-space-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <div className="section-label inline-flex mb-4">Leadership</div>
                <h2 className="section-title">Meet the Officers</h2>
              </div>
              <Link to="/officers"
                className="flex items-center gap-1.5 text-sm text-electric-500 hover:text-electric-400 transition-colors font-medium">
                Full Team <ChevronRight size={16} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {executive.map((officer, i) => (
                <motion.div
                  key={officer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group text-center"
                >
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-3 overflow-hidden border-2 border-space-500/60 group-hover:border-electric-300/60 transition-all duration-300">
                    {officer.imageUrl ? (
                      <LazyImage src={officer.imageUrl} alt={officer.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-space-700 flex items-center justify-center text-ink-muted">
                        <User size={28} />
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-ink group-hover:text-electric-400 transition-colors truncate">
                    {officer.name}
                  </div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{officer.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Faculty Advisors ── */}
      {advisors.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="section-label inline-flex mb-4">Faculty</div>
          <h2 className="text-2xl font-bold text-ink mb-8">Our Advisors</h2>
          <div className="flex flex-wrap gap-4">
            {advisors.map(a => (
              <div key={a.id} className="card flex items-center gap-4 min-w-[280px]">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-space-700 flex-shrink-0">
                  {a.imageUrl ? (
                    <LazyImage src={a.imageUrl} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-muted">
                      <User size={20} />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-ink text-sm">{a.name}</div>
                  <div className="text-xs text-ink-muted">{a.role}</div>
                  {a.email && (
                    <a href={`mailto:${a.email}`} className="text-xs text-electric-500 hover:text-electric-400 transition-colors mt-1 block">
                      {a.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-ink mb-4">Ready to be part of the story?</h2>
          <p className="text-ink-dim mb-8">Join us this year and add your chapter to the next milestone.</p>
          <Link to="/join" className="btn-primary text-base px-8 py-4">
            Join LEHS TSA <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
