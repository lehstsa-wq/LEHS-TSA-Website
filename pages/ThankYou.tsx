import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, BookOpen, Instagram } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SectionHeader, DiamondField } from '../components/sections';

const NEXT_STEPS = [
  { to: '/events',        icon: Calendar, label: 'Check the calendar', desc: 'See when the next meeting and competition deadlines land.' },
  { to: '/competitions',  icon: BookOpen, label: 'Pick your events',   desc: 'Browse all 42 events and this season themes before you choose.' },
  { to: '/resources',     icon: Instagram, label: 'Get the resources', desc: 'Study guides, rulebooks and prep material for your event.' },
];

/** Landing page after a form submission, so a completed action has somewhere to go. */
const ThankYou: React.FC = () => (
  <div>
    <SEO
      title="Thank you"
      description="Thanks for reaching out to Little Elm High School TSA. An officer will reply within two school days."
    />

    <section className="relative overflow-hidden" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <DiamondField variant="hero" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-5">
          <span
            className="grid h-14 w-14 place-items-center rounded-full"
            style={{ background: 'color-mix(in srgb, var(--c-green) 18%, transparent)', color: 'var(--c-green)' }}
          >
            <CheckCircle size={28} />
          </span>
        </div>
        <SectionHeader
          as="h1"
          eyebrow="Received"
          title="Thanks, we have got your message"
          dek="An officer will reply within two school days. If it is urgent, find us at a Tuesday meeting or reach out on Instagram."
        />
      </div>
    </section>

    <section style={{ paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-h2 text-2xl md:text-3xl text-center mb-8">While you wait</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {NEXT_STEPS.map(s => {
            const Icon = s.icon;
            return (
              <Link key={s.to} to={s.to} className="card group">
                <Icon size={18} className="mb-3 text-electric-400" />
                <h3 className="font-bold text-ink mb-1">{s.label}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{s.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  </div>
);

export default ThankYou;
