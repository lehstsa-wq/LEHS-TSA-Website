import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SectionHeader, DiamondField } from '../components/sections';

/** Popular destinations, so a wrong URL still leads somewhere useful. */
const SUGGESTIONS = [
  { to: '/competitions', label: 'Competitions', desc: 'All 42 TSA events and this season themes' },
  { to: '/join',         label: 'Join the Chapter', desc: 'Membership steps and forms' },
  { to: '/events',       label: 'Events', desc: 'Meetings, competitions and deadlines' },
  { to: '/officers',     label: 'Officer Team', desc: 'Who runs the chapter' },
  { to: '/resources',    label: 'Resources', desc: 'Study guides and rulebooks' },
  { to: '/contact',      label: 'Contact', desc: 'Get in touch with an officer' },
];

const NotFound: React.FC = () => (
  <div>
    <SEO
      title="Page not found"
      description="That page does not exist. Find competitions, events, resources and membership information for Little Elm High School TSA."
    />

    <section className="relative overflow-hidden" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <DiamondField variant="hero" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          as="h1"
          eyebrow="404"
          title="We could not find that page"
          dek="The link may be out of date, or the page may have moved. Everything below is still here."
        />
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-primary text-base px-7 py-3.5">
            <Home size={18} /> Back to home
          </Link>
          <Link to="/competitions" className="btn-secondary text-base px-7 py-3.5">
            <Search size={18} /> Browse competitions
          </Link>
        </div>
      </div>
    </section>

    <section style={{ paddingBottom: 'var(--section-py)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUGGESTIONS.map(s => (
            <Link key={s.to} to={s.to} className="card group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-ink mb-1">{s.label}</h2>
                  <p className="text-sm text-ink-dim leading-relaxed">{s.desc}</p>
                </div>
                <ArrowRight size={16} className="mt-1 flex-shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default NotFound;
