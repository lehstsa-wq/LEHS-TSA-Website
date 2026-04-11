import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

export const Countdown: React.FC = () => {
  const { siteSettings } = useData();
  const targetDate = siteSettings.nextEventDate ? new Date(siteSettings.nextEventDate).getTime() : 0;
  const eventTitle = siteSettings.nextEventTitle || 'Upcoming Event';

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

  if (!siteSettings.nextEventDate) return null;

  const TimeBox = ({ val, label }: { val: number; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
        {/* Shine */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        <span className="relative font-mono font-black text-3xl sm:text-4xl text-white tabular-nums">
          {String(val).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">{label}</span>
    </div>
  );

  return (
    <div className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1e3a5f, #07111e 40%, #2d1f4f)' }} />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="orb w-[500px] h-[400px] top-[-100px] left-[-100px] opacity-25 animate-orb-float-1 absolute" />
      <div className="orb w-[400px] h-[300px] bottom-[-80px] right-[-80px] opacity-20 animate-orb-float-2 absolute" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa' }}>
            <Zap size={12} />
            Next Major Event
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-10 text-balance">{eventTitle}</h2>

          <div className="flex justify-center gap-6 sm:gap-10 mb-8">
            <TimeBox val={timeLeft.days}    label="Days" />
            <TimeBox val={timeLeft.hours}   label="Hours" />
            <TimeBox val={timeLeft.minutes} label="Min" />
            <TimeBox val={timeLeft.seconds} label="Sec" />
          </div>

          <p className="flex items-center justify-center gap-2 text-sm text-white/60">
            <Clock size={14} />
            {new Date(targetDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
