import React, { useState } from 'react';
import { Mail, MapPin, Instagram, Twitter, Send, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';

const Contact: React.FC = () => {
  const { siteSettings, addProblemReport } = useData();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await addProblemReport({
        reporterName:  form.name,
        reporterEmail: form.email,
        category:      (form.subject || 'General Inquiry') as 'Website Bug' | 'Account Issue' | 'Competition Issue' | 'General Inquiry' | 'Other',
        description:   form.message,
        priority:      'Low',
      });
      setStatus('done');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <SEO title="Contact" description="Get in touch with the Little Elm TSA chapter. We're happy to answer any questions." />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-blue w-[400px] h-[400px] top-[-60px] right-[5%] opacity-25 animate-orb-float-1" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label inline-flex mb-4">Contact</div>
            <h1 className="section-title text-5xl lg:text-6xl mb-6">Get in Touch</h1>
            <p className="section-body max-w-xl">
              Questions about membership, events, or competitions? We're here to help.
              Reach out through the form or find us on social media.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-space-900 to-transparent" />
      </section>

      {/* Main content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left: info */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-8">Chapter Information</h2>
            <div className="space-y-6">

              <div className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-electric-100 text-electric-500 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-semibold text-ink mb-1">Address</div>
                  <div className="text-sm text-ink-dim">
                    Little Elm High School<br />
                    1600 Walker Lane<br />
                    Little Elm, TX 75068
                  </div>
                </div>
              </div>

              <div className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-electric-100 text-electric-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-semibold text-ink mb-1">Email</div>
                  <a href="mailto:lehstsa@gmail.com" className="text-sm text-electric-500 hover:text-electric-400 transition-colors">
                    lehstsa@gmail.com
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="font-semibold text-ink mb-4">Follow Us</div>
                <div className="flex gap-3">
                  {siteSettings.instagramLink && (
                    <a href={siteSettings.instagramLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-space-500/60 text-ink-dim hover:text-ink hover:border-electric-300/50 transition-all text-sm font-medium">
                      <Instagram size={16} /> Instagram
                    </a>
                  )}
                  {siteSettings.twitterLink && (
                    <a href={siteSettings.twitterLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-space-500/60 text-ink-dim hover:text-ink hover:border-electric-300/50 transition-all text-sm font-medium">
                      <Twitter size={16} /> Twitter
                    </a>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="font-semibold text-ink mb-3">TSA National Links</div>
                <div className="space-y-2">
                  {[
                    { name: 'TSA National', url: 'https://tsaweb.org/' },
                    { name: 'Texas TSA',    url: 'https://www.texastsa.org/' },
                  ].map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 text-sm text-ink-dim hover:text-electric-500 transition-colors group">
                      {link.name}
                      <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-8">Send a Message</h2>

            {status === 'done' ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card text-center py-16">
                <CheckCircle2 size={48} className="text-electric-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-ink mb-2">Message Sent!</h3>
                <p className="text-ink-dim text-sm">We'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus('idle')} className="btn-secondary mt-6 text-sm">Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-ink-muted font-semibold uppercase tracking-wide block mb-1.5">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name" required
                      className="w-full bg-space-700/50 border border-space-500/60 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs text-ink-muted font-semibold uppercase tracking-wide block mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com" required
                      className="w-full bg-space-700/50 border border-space-500/60 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-ink-muted font-semibold uppercase tracking-wide block mb-1.5">Subject</label>
                  <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-space-700/50 border border-space-500/60 rounded-xl px-4 py-3 text-sm text-ink focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all">
                    <option value="">Select a topic</option>
                    <option value="Membership">Membership Question</option>
                    <option value="Competitions">Competition Info</option>
                    <option value="Events">Events & Meetings</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Website Bug">Website Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-ink-muted font-semibold uppercase tracking-wide block mb-1.5">Message *</label>
                  <textarea
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what's on your mind..." required rows={6}
                    className="w-full bg-space-700/50 border border-space-500/60 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted focus:border-electric-500 focus:outline-none focus:ring-1 focus:ring-electric-500/30 transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-gold-400 text-sm">
                    <AlertCircle size={16} /> Something went wrong. Please try again.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...</span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>

                <p className="text-xs text-ink-muted text-center">
                  Or email us directly at <a href="mailto:lehstsa@gmail.com" className="text-electric-500 hover:text-electric-400 transition-colors">lehstsa@gmail.com</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
