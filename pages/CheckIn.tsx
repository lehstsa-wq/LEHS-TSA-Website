import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';

const CheckIn: React.FC = () => {
  const { user } = useAuth();
  const { checkInMeeting, meetings } = useData();
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayMeetings = meetings.filter(m => m.date === today);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || !user) return;
    setStatus('loading');
    const result = await checkInMeeting(pin, user.id, user.name);
    if (result.success) {
      setStatus('success');
      setMeetingTitle(result.meetingTitle ?? 'the meeting');
      setMessage('');
    } else {
      setStatus('error');
      setMessage(result.error ?? 'Check-in failed.');
    }
    setPin('');
  };

  const reset = () => {
    setStatus('idle');
    setMessage('');
    setMeetingTitle('');
    setPin('');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-900">
        <p className="text-ink-muted">Please sign in to check in to a meeting.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-900 flex flex-col items-center justify-center px-4 py-20">
      <SEO title="Meeting Check-In" description="Check in to your TSA meeting." />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-electric-500/20 flex items-center justify-center mx-auto mb-4 text-electric-400 font-mono text-xs font-bold">
            PIN
          </div>
          <h1 className="text-3xl font-bold text-ink">Meeting Check-In</h1>
          <p className="text-ink-muted mt-2 text-sm">Enter the PIN from your officer to mark attendance.</p>
        </div>

        {/* Today's meetings (public info) */}
        {todayMeetings.length > 0 && status === 'idle' && (
          <div className="mb-6 space-y-2">
            <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-2">Today's Meetings</p>
            {todayMeetings.map(m => (
              <div key={m.id} className="glass-card rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-electric-500/15 flex items-center justify-center shrink-0 text-electric-400 text-[10px] font-bold">
                  CAL
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{m.title}</p>
                  <div className="flex items-center gap-3 text-[11px] text-ink-muted">
                    <span>{m.time}</span>
                    {m.location && <span>{m.location}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form / Result */}
        <div className="glass-card rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-electric-500/20 flex items-center justify-center mx-auto mb-4 text-electric-400 text-xs font-black uppercase tracking-wider">
                  Done
                </div>
                <h2 className="text-xl font-bold text-ink mb-2">Checked In!</h2>
                <p className="text-ink-muted text-sm mb-6">You're marked present for <span className="text-ink font-semibold">{meetingTitle}</span>.</p>
                <button onClick={reset} className="btn-primary w-full justify-center">
                  Check In Again
                </button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4 text-gold-400 text-xs font-black uppercase tracking-wider">
                  Error
                </div>
                <h2 className="text-xl font-bold text-ink mb-2">Check-In Failed</h2>
                <p className="text-ink-muted text-sm mb-6">{message}</p>
                <button onClick={reset} className="btn-secondary w-full justify-center">
                  Try Again
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    Meeting PIN
                  </label>
                  <input
                    autoFocus
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 4–6 digit PIN"
                    className="w-full bg-space-700/60 border border-space-500/50 rounded-xl px-4 py-3 text-2xl font-mono font-bold text-ink text-center tracking-[0.4em] placeholder-ink-muted focus:ring-2 focus:ring-electric-500/30 focus:border-electric-500 outline-none transition-all"
                  />
                  <p className="text-[11px] text-ink-muted mt-2 text-center">
                    Signed in as <span className="text-ink font-semibold">{user.name}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={pin.length < 4 || status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Checking in…' : 'Check In'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {todayMeetings.length === 0 && status === 'idle' && (
          <p className="text-center text-xs text-ink-muted mt-4">
            No meetings scheduled for today. Check back when a meeting is active.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default CheckIn;
