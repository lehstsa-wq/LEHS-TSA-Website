import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email.trim()) {
      setError('Please enter your Email.');
      setIsSubmitting(false);
      return;
    }

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const isAuthError =
        err.code === 'auth/invalid-email' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password';

      if (isAuthError) {
        setError('Invalid Email or Password.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ marginTop: -64 }}>
      <SEO title="Login" description="Sign in to the Little Elm High School TSA Member Portal." />

      {/* Subtle background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #005DAA, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #574E8F, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-[440px] animate-fade-in">
        {/* Card */}
        <div className="login-card rounded-2xl p-10 border border-space-500/60"
          style={{
            background: 'var(--login-card-bg)',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-elevated)',
          }}>

          {/* Logo + title */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-[14px] mx-auto mb-4 flex items-center justify-center text-white"
              style={{
                background: '#005DAA',
                boxShadow: '0 0 24px rgba(0,93,170,0.4)',
              }}>
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-ink mb-1.5">Member Portal</h1>
            <p className="text-ink-dim text-sm">Sign in to access resources</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl mb-5 text-sm"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: '#fca5a5',
              }}>
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-ink-dim mb-2 tracking-tight">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder-ink-ghost outline-none transition-all duration-150 border"
                  style={{
                    background: 'var(--login-input-bg)',
                    borderColor: 'var(--login-input-border)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,93,170,0.65)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--login-input-border)'; }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-ink-dim mb-2 tracking-tight">
                Access Code (or Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Access Code"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder-ink-ghost outline-none transition-all duration-150 border"
                  style={{
                    background: 'var(--login-input-bg)',
                    borderColor: 'var(--login-input-border)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,93,170,0.65)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--login-input-border)'; }}
                  required
                />
              </div>
              <p className="text-[10px] text-ink-muted mt-2 font-mono">
                New accounts use the Access Code as the password.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3.5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-7 pt-5 border-t border-space-500/40 text-center">
            <p className="text-ink-dim text-sm">
              Need an account?{' '}
              <Link to="/signup" className="text-electric-400 font-semibold hover:text-electric-400/80 transition-colors">
                Join with Code
              </Link>
            </p>
            <p className="text-[10px] text-ink-muted mt-4 font-mono">v1.2 (Recovery Mode Active)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
