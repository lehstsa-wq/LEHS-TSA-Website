import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { LazyImage } from '../components/LazyImage';
import { SEO } from '../components/SEO';
import { MILESTONES as TIMELINE, CHAPTER_YEARS } from '../data/milestones';
import { SectionHeader, StatCard, Reveal } from '../components/sections';

/* ─────────────────────────────────────────────────────────────
   TIMELINE DATA
───────────────────────────────────────────────────────────── */

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
        description="Learn about Little Elm High School TSA. Our history, mission, leadership team, and chapter milestones."
      />

      {/* ── Hero ── */}
      <section className="relative py-6 overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              as="h1"
              eyebrow="Our Chapter"
              title="About LEHS TSA"
              dek="We're a student-run Technology Student Association chapter dedicated to developing the next generation of tech leaders through competition, collaboration, and community."
            />
          </motion.div>
        </div>

      </section>

      {/* ── What is TSA ── */}
      <section className="py-7 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label inline-flex mb-4">Who We Are</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">
              The only student organization devoted entirely to STEM.
            </h2>
            <div className="space-y-5 text-ink-dim leading-relaxed text-base">
              <p>
                The Technology Student Association (TSA) is the only student organization devoted
                entirely to science, technology, engineering, and math. You do not need to be enrolled
                in a STEM course to join, every student is welcome. With chapters in all 50 states and
                over 250,000 members, TSA is the gold standard for tech-focused student activity.
              </p>
              <p>
                At Little Elm High School, our chapter fosters personal growth, leadership, and
                real-world skills. Members apply science, technology, engineering, and math concepts
                through 30+ competitive events and collaborative projects.
              </p>
              <p>
                Whether you're into coding, design, engineering, or leadership, there's a TSA event
                built for you.
              </p>
            </div>
            <Link to="/competitions" className="btn-primary mt-8 inline-flex">
              Explore Competitions
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: 50,  label: 'Members',             color: '#6a9bcc' },
              { val: 20,  label: 'State Qualifiers',    color: '#d97757' },
              { val: 14,  label: 'National Qualifiers', color: '#6a9bcc' },
              { val: CHAPTER_YEARS, label: 'Years of Excellence', color: '#788c5d' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <StatCard value={s.val} label={s.label} accent={s.color} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-7 bg-space-950/60 border-y border-space-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Mission & Values"
            className="mb-7"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Mission',
                body: 'To foster personal growth, leadership, and opportunities in technology, innovation, design, and engineering for every student at Little Elm High School.',
                accent: '#6a9bcc',
              },
              {
                title: 'Vision',
                body: 'A world where every student has the technical skills, leadership experience, and competitive edge to shape the future of technology.',
                accent: '#d97757',
              },
              {
                title: 'Values',
                body: 'Excellence in competition. Integrity in everything. Community above individual. Innovation as a mindset. Inclusion for every aspiring engineer and creator.',
                accent: '#6a9bcc',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card group hover:border-opacity-80"
              >
                <h3 className="font-bold text-lg text-ink mb-3" style={{ color: v.accent }}>{v.title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Our Story"
          title="Chapter Milestones"
          className="mb-7"
        />

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-500/40 via-electric-500/20 to-transparent -translate-x-1/2 hidden md:block" />

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
        <section className="py-7 bg-space-950/60 border-t border-space-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-end justify-between mb-6"
            >
              <div>
                <div className="section-label inline-flex mb-4">Leadership</div>
                <h2 className="section-title">Meet the Officers</h2>
              </div>
              <Link to="/officers"
                className="flex items-center gap-1.5 text-sm text-electric-500 hover:text-electric-400 transition-colors font-medium">
                Full Team
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
                      <div className="w-full h-full bg-space-700 flex items-center justify-center text-ink-muted text-xs font-bold">
                        {officer.name.charAt(0)}
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
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="section-label inline-flex mb-4">Faculty</div>
          <h2 className="text-2xl font-bold text-ink mb-6">Our Advisors</h2>
          <div className="flex flex-wrap gap-4">
            {advisors.map(a => (
              <div key={a.id} className="card flex items-center gap-4 min-w-[280px]">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-space-700 flex-shrink-0">
                  {a.imageUrl ? (
                    <LazyImage src={a.imageUrl} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-muted text-xs font-bold">
                      {a.name.charAt(0)}
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
      <section className="py-8 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-ink mb-4">Ready to be part of the story?</h2>
          <p className="text-ink-dim mb-6">Join us this year and add your chapter to the next milestone.</p>
          <Link to="/join" className="btn-primary text-base px-8 py-4">
            Join LEHS TSA
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
