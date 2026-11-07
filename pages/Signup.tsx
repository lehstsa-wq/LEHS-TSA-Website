import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, GraduationCap, ChevronRight, AlertCircle, Loader2, UserPlus, Lock, Users, Info } from 'lucide-react';
import { useAuth, MIN_PASSWORD_LENGTH } from '../context/AuthContext';
import { SEO } from '../components/SEO';
import { pwnedPasswordCount, BREACHED_PASSWORD_MESSAGE } from '../lib/pwnedPassword';

const fieldClass = "w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-10 pr-4 py-3 text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-all placeholder-ink-muted";
const labelClass = "text-xs font-bold text-ink-muted uppercase ml-1";

const Signup: React.FC = () => {
  const [accountType, setAccountType] = useState<'student' | 'parent'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [parentOf, setParentOf] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const isParent = accountType === 'parent';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!ageConfirmed) {
      setError('You must be 13 years of age or older to create an account.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords don't match.");
      return;
    }
    if (!isParent && !grade) {
      setError('Please select your grade.');
      return;
    }
    if (isParent && parentOf.trim().length < 2) {
      setError("Please enter the full name of the member you're the parent of.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (await pwnedPasswordCount(password)) {
        setError(BREACHED_PASSWORD_MESSAGE);
        return;
      }
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        accountType,
        grade: isParent ? undefined : grade,
        parentOf: isParent ? parentOf.trim() : undefined,
      });
      navigate('/dashboard');
    } catch (err: any) {
      if (!err.message?.includes('already registered')) console.error("Signup error:", err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <SEO title="Sign Up" description="Create an account for the Little Elm High School TSA Member Portal." />
      <div className="w-full max-w-[460px] bg-space-800 rounded-2xl p-8 animate-fade-in">
        <div className="text-center mb-7">
          <div className="w-16 h-16 bg-electric-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-electric-400" size={32} />
          </div>
          <h1 className="text-[28px] font-black tracking-tight text-ink mb-2">Join LEHS TSA</h1>
          <p className="text-ink-muted">
            Create your account. An officer will approve it before you can use the member portal.
          </p>
        </div>

        {error && (
          <div className="bg-gold-500/10 border border-gold-500/40 text-gold-400 p-4 rounded-xl flex flex-col items-start gap-2 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            {error.includes('Sign In') && (
              <Link to="/login" className="text-xs font-bold underline ml-8">
                Go to Sign In &rarr;
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account type */}
          <fieldset className="space-y-1">
            <legend className={labelClass}>I am a</legend>
            <div className="grid grid-cols-2 gap-2 pt-1" role="radiogroup">
              {([
                { id: 'student', label: 'Student', icon: GraduationCap },
                { id: 'parent', label: "Member's parent", icon: Users },
              ] as const).map(opt => {
                const selected = accountType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAccountType(opt.id)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      selected ? '' : 'bg-space-700/60 text-ink-muted hover:text-ink'
                    }`}
                    style={selected ? { background: 'var(--accent)', color: 'var(--c-on-accent)' } : undefined}
                  >
                    <opt.icon size={16} /> {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Parent policy, always stated */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-electric-500/10 text-xs text-ink leading-relaxed">
            <Info size={15} className="shrink-0 mt-0.5 text-electric-400" />
            <p>
              <strong>Parents can't join on their own.</strong> A parent may only have an account as the
              parent of a <strong>current LEHS TSA member</strong>, named below. Officers check this before
              approving.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-name" className={labelClass}>Full Name</label>
            <div className="relative">
              <input id="signup-name" type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Jane Doe" autoComplete="name" className={fieldClass} required />
              <User size={18} className="absolute left-3.5 top-3.5 text-ink-muted pointer-events-none" />
            </div>
          </div>

          {isParent ? (
            <div className="space-y-1">
              <label htmlFor="signup-parent-of" className={labelClass}>Member you're the parent of</label>
              <div className="relative">
                <input id="signup-parent-of" type="text" value={parentOf} onChange={e => setParentOf(e.target.value)}
                  placeholder="Student's full name" className={fieldClass} required />
                <Users size={18} className="absolute left-3.5 top-3.5 text-ink-muted pointer-events-none" />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <label htmlFor="signup-grade" className={labelClass}>Grade Level</label>
              <div className="relative">
                <select id="signup-grade" value={grade} onChange={e => setGrade(e.target.value)}
                  className={`${fieldClass} appearance-none cursor-pointer`} required>
                  <option value="" disabled>Select Grade</option>
                  <option>9th Grade</option>
                  <option>10th Grade</option>
                  <option>11th Grade</option>
                  <option>12th Grade</option>
                </select>
                <GraduationCap size={18} className="absolute left-3.5 top-3.5 text-ink-muted pointer-events-none" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="signup-email" className={labelClass}>Email</label>
            <div className="relative">
              <input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={isParent ? 'you@email.com' : 'student@leisdstudent.ws'} autoComplete="email"
                className={fieldClass} required />
              <Mail size={18} className="absolute left-3.5 top-3.5 text-ink-muted pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-password" className={labelClass}>Password</label>
            <div className="relative">
              <input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`} autoComplete="new-password"
                minLength={MIN_PASSWORD_LENGTH} className={fieldClass} required />
              <Lock size={18} className="absolute left-3.5 top-3.5 text-ink-muted pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-password-confirm" className={labelClass}>Confirm Password</label>
            <div className="relative">
              <input id="signup-password-confirm" type="password" value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password"
                className={fieldClass} required />
              <Lock size={18} className="absolute left-3.5 top-3.5 text-ink-muted pointer-events-none" />
            </div>
            <p className="text-[11px] text-ink-muted ml-1">
              Your password is never visible to officers or anyone else.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={e => setAgeConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-electric-500 cursor-pointer flex-shrink-0"
            />
            <span className="text-xs text-ink-muted leading-relaxed">
              I confirm that I am <strong className="text-ink">13 years of age or older</strong>. This site does not collect data from children under 13 in compliance with COPPA.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || !ageConfirmed}
            className="btn-primary w-full justify-center py-3.5 mt-6 group"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Request Account
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-space-500/30 text-center">
          <p className="text-ink-muted text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-electric-400 hover:text-electric-300 font-bold transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
