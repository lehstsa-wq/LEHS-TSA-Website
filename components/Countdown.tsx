import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

/* This panel is Deep Space Blue in both themes, so its text is colored
   inline rather than with `text-white` utilities: light mode rewrites those
   utilities to dark ink, which would make the countdown unreadable here. */

export const Countdown: React.FC = () => {
  const { nextEvent } = useData();
  const targetDate = nextEvent ? new Date(nextEvent.date).getTime() : 0;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const tick = () => {
      const distance = targetDate - Date.now();
      if (distance <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(distance / 86400000),
        hours:   Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!nextEvent) return null;

  const TimeBox = ({ val, label }: { val: number; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{ background: 'var(--p-navy)', border: '2px solid var(--p-steel)' }}>
        <span className="relative font-heading text-5xl sm:text-6xl tabular-nums" style={{ color: 'var(--p-smoke)' }}>
          {String(val).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--p-steel)' }}>{label}</span>
    </div>
  );

  return (
    <div className="countdown-panel relative py-12 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--p-deep)' }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'var(--p-navy)', border: '2px solid var(--p-steel)', color: 'var(--p-steel)' }}>
            Next Major Event
          </div>

          <h2 className="text-5xl md:text-6xl mb-10 text-balance" style={{ color: 'var(--p-smoke)' }}>{nextEvent.title}</h2>

          <div className="flex justify-center gap-6 sm:gap-10 mb-8">
            <TimeBox val={timeLeft.days}    label="Days" />
            <TimeBox val={timeLeft.hours}   label="Hours" />
            <TimeBox val={timeLeft.minutes} label="Min" />
            <TimeBox val={timeLeft.seconds} label="Sec" />
          </div>

          <p className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--p-steel)' }}>
            {new Date(targetDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
