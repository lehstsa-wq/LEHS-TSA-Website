
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, GraduationCap, ChevronRight, AlertCircle, Loader2, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

const Signup: React.FC = () => {
  const [accessCode, setAccessCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!accessCode.trim()) {
      setError('An Access Code is required to join.');
      setIsSubmitting(false);
      return;
    }

    if (accessCode.length < 6) {
        setError('Access Code must be at least 6 characters.');
        setIsSubmitting(false);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      setIsSubmitting(false);
      return;
    }

    try {
      await signup(accessCode, name, email, grade);
      navigate('/dashboard');
    } catch (err: any) {
      const isKnownError = 
        err.code === 'auth/email-already-in-use' || 
        err.message?.includes('email-already-in-use') ||
        err.message?.includes("Invalid Access Code") ||
        err.message?.includes("Access Code has already been used") ||
        err.message?.includes("Admin account already exists");

      if (!isKnownError) console.error("Signup error:", err);

      if (err.code === 'auth/email-already-in-use' || err.message?.includes('email-already-in-use')) {
        setError('This email is already registered. Please Log In.');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Registration failed. Verify your Access Code.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <SEO title="Sign Up" description="Create an account for the Little Elm High School TSA Member Portal." />
      <div className="w-full max-w-[440px] bg-space-800 border border-space-500/30 rounded-2xl p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-electric-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-electric-500/20">
            <Key className="text-electric-400" size={32} />
          </div>
          <h1 className="text-[28px] font-black tracking-tight text-ink mb-2">Join LEHS TSA</h1>
          <p className="text-ink-muted">Use your Access Code to create your account.</p>
        </div>

        {error && (
          <div className="bg-gold-500/10 border border-gold-500/20 text-gold-400 p-4 rounded-xl flex flex-col items-start gap-2 mb-6">
            <div className="flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
            </div>
            {(error.includes('already exists') || error.includes('Log In')) && (
                 <Link to="/login" className="text-xs font-bold text-gold-300 underline ml-8">
                     Go to Login Page &rarr;
                 </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-ink-muted uppercase ml-1">Access Code</label>
            <div className="relative">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="MOCK-XXXX"
                className="w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-10 pr-4 py-3 text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-all placeholder-ink-muted uppercase font-mono tracking-wider"
                required
              />
              <Key size={18} className="absolute left-3.5 top-3.5 text-electric-400" />
            </div>
            <p className="text-[10px] text-ink-muted ml-1">This will also be your <strong>password</strong> for future logins.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-ink-muted uppercase ml-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-10 pr-4 py-3 text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-all placeholder-ink-muted"
                required
              />
              <User size={18} className="absolute left-3.5 top-3.5 text-ink-muted" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-ink-muted uppercase ml-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@leisdstudent.ws"
                className="w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-10 pr-4 py-3 text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-all placeholder-ink-muted"
                required
              />
              <Mail size={18} className="absolute left-3.5 top-3.5 text-ink-muted" />
            </div>
          </div>

          <div className="space-y-1">
              <label className="text-xs font-bold text-ink-muted uppercase ml-1">Grade Level</label>
              <div className="relative">
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-space-700/60 border border-space-500/50 rounded-xl pl-10 pr-4 py-3 text-ink focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Grade</option>
                  <option>9th Grade</option>
                  <option>10th Grade</option>
                  <option>11th Grade</option>
                  <option>12th Grade</option>
                </select>
                <GraduationCap size={18} className="absolute left-3.5 top-3.5 text-ink-muted" />
              </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-electric-500 hover:bg-electric-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-electric-500/25 mt-6 disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-[1.02] hover:-translate-y-1"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Create Account
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
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
