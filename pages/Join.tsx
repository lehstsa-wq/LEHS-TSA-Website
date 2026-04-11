import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Users, Lightbulb, ChevronDown, ChevronUp,
  ExternalLink, FileCheck, MessageSquare, CreditCard, ArrowRight,
  Star, CheckCircle2, Zap, Globe, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';

/* ─────────────────────────────────────────────────────────────
   BENEFITS
───────────────────────────────────────────────────────────── */
const BENEFITS = [
  { icon: Trophy,    title: 'Compete in 30+ Events',    body: 'From coding to design to engineering — every skill has a competition.' },
  { icon: Users,     title: 'Build Lifetime Connections', body: 'Network with like-minded STEM students from across Texas and the nation.' },
  { icon: Globe,     title: 'National Conferences',      body: 'Travel to state and national TSA conferences and compete on the biggest stage.' },
  { icon: Award,     title: 'College-Ready Resume',      body: 'TSA membership and competition results make standout college application material.' },
  { icon: Lightbulb, title: 'Real Project Experience',   body: 'Build actual software, hardware, and design pieces — not just schoolwork.' },
  { icon: Zap,       title: 'Leadership Opportunities',  body: 'Run for officer positions and lead the chapter from day one.' },
];

/* ─────────────────────────────────────────────────────────────
   STEPS
───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01', icon: FileCheck, color: '#3b82f6',
    title: 'Join Remind',
    body: 'Join our Remind class to get real-time announcements, meeting reminders, and competition updates directly on your phone.',
  },
  {
    num: '02', icon: FileCheck, color: '#e05c5c',
    title: 'Complete the Application',
    body: 'Fill out the official TSA membership application through JotForm. Takes about 5 minutes — have your student ID and email ready.',
  },
  {
    num: '03', icon: CreditCard, color: '#8b5cf6',
    title: 'Pay Dues',
    body: 'TSA dues cover your national membership, state conference fees, and chapter resources. Payment is made through the district portal.',
  },
  {
    num: '04', icon: FileCheck, color: '#22c55e',
    title: 'Submit District Paperwork',
    body: "Complete the district permission form so you're cleared for all off-campus competitions and events.",
  },
];

/* ─────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'When can I join?', a: 'Membership opens at the start of each school year, typically in September. Late sign-ups may be accepted depending on competition deadlines.' },
  { q: 'How much does membership cost?', a: 'Dues cover national TSA membership plus chapter fees. Check the links below or contact us for the current year\'s amount.' },
  { q: 'Do I need prior experience?', a: 'Not at all! TSA welcomes students of all skill levels. Many members discover new interests through TSA events they\'d never tried before.' },
  { q: 'Can I join if I\'m not in a STEM class?', a: 'Yes. TSA is open to all students at Little Elm High School, not just those enrolled in CTE or STEM courses.' },
  { q: 'How many events can I compete in?', a: 'You can typically enter up to three competitive events per conference level (regional, state, national). We\'ll help you choose the best fit.' },
  { q: 'What if I don\'t want to compete?', a: 'No problem! Members can participate in workshops, build nights, volunteering, and leadership activities without competing.' },
];

/* ─────────────────────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────────────────────── */
const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-gold-border/40' : 'border-warm-700/40'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-850/60 transition-colors"
      >
        <span className="font-semibold text-ink text-sm pr-4">{q}</span>
        {open ? <ChevronUp size={18} className="text-gold flex-shrink-0" /> : <ChevronDown size={18} className="text-ink-muted flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 text-sm text-ink-dim leading-relaxed border-t border-warm-700/40 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   JOIN PAGE
───────────────────────────────────────────────────────────── */
const Join: React.FC = () => {
  const { siteSettings } = useData();

  const links = [
    {
      label: 'Join Remind',
      desc:  'Get real-time updates straight to your phone',
      url:   siteSettings.remindLink,
      icon:  MessageSquare,
      color: '#3b82f6',
    },
    {
      label: 'TSA Application',
      desc:  'Official membership form — takes 5 minutes',
      url:   siteSettings.jotformLink,
      icon:  FileCheck,
      color: '#e05c5c',
    },
    {
      label: 'District Paperwork',
      desc:  'Required permission slip for off-campus events',
      url:   siteSettings.districtAppLink,
      icon:  FileCheck,
      color: '#8b5cf6',
    },
    {
      label: 'Pay Dues',
      desc:  'Secure payment through the district portal',
      url:   siteSettings.successFundLink,
      icon:  CreditCard,
      color: '#22c55e',
    },
  ];

  return (
    <div>
      <SEO title="Join" description="Join Little Elm High School TSA. Compete, lead, and grow with the most exciting STEM student org in Texas." />

      {/* ── Hero ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-[500px] h-[400px] top-[-80px] right-[-60px] opacity-25 animate-orb-float-2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4"><Star size={12} /> Membership</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Join Little Elm TSA</h1>
            <p className="section-body max-w-2xl mx-auto">
              Membership opens the door to 30+ competitive events, national conferences, leadership roles, and a community
              of the most driven STEM students in Texas. Here's how to get in.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-warm-950 to-transparent" />
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4">Why Join?</div>
          <h2 className="section-title mb-4">Everything membership unlocks</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => {
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card group">
                <CheckCircle2 size={18} className="text-gold mb-4" />
                <h3 className="font-bold text-ink mb-2">{b.title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{b.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── How to Join ── */}
      <section className="py-20 bg-warm-950/60 border-y border-warm-700/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4">Process</div>
            <h2 className="section-title mb-4">4 steps to join</h2>
            <p className="section-body">Complete all four steps and you're officially a LEHS TSA member.</p>
          </motion.div>

          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center" style={{ background: `${step.color}20`, color: step.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-ink-muted">{step.num}</span>
                      <h3 className="font-bold text-ink">{step.title}</h3>
                    </div>
                    <p className="text-sm text-ink-dim leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Action Links ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4">Start Here</div>
          <h2 className="section-title mb-4">Complete all four links below</h2>
          <p className="section-body">Click each card to open the link in a new tab. Do them in order.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {links.map((link, i) => {
            const Icon = link.icon;
            const isPlaceholder = link.url.includes('INSERT') || link.url === '#';
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                {isPlaceholder ? (
                  <div className="card opacity-60 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${link.color}20`, color: link.color }}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="font-semibold text-ink">{link.label}</div>
                        <div className="text-xs text-ink-muted mt-0.5">{link.desc}</div>
                        <div className="text-xs text-gold-500 mt-1">Link coming soon</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                    className="card flex items-center gap-4 group hover:border-gold-border/40">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${link.color}20`, color: link.color }}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-ink group-hover:text-gold transition-colors">{link.label}</div>
                      <div className="text-xs text-ink-muted mt-0.5">{link.desc}</div>
                    </div>
                    <ExternalLink size={16} className="text-ink-ghost group-hover:text-gold transition-colors flex-shrink-0" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs text-ink-muted text-center mt-6">
          Questions? <Link to="/contact" className="text-gold hover:text-gold transition-colors">Contact us</Link> or ask an officer at the next meeting.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-warm-950/60 border-t border-warm-700/40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="text-[11px] font-mono uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm mb-4">FAQ</div>
            <h2 className="section-title">Common questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                <FaqItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-ink mb-4">Ready to compete?</h2>
          <p className="text-ink-dim mb-8">Join LEHS TSA today and start building the skills, network, and achievements that define a tech career.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {!links[1].url.includes('INSERT') && (
              <a href={links[1].url} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
                Apply Now <ExternalLink size={16} />
              </a>
            )}
            <Link to="/competitions" className="btn-secondary text-base px-8 py-4">
              Browse Events <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Join;
