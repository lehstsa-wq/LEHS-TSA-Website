import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, sendPasswordReset } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleForgotPassword = async () => {
    setError('');
    setNotice('');
    if (!email.trim()) {
      setError('Enter your email above, then select "Forgot password?" again.');
      return;
    }
    try {
      await sendPasswordReset(email.trim());
    } catch {
      // Deliberately ignored: the same message shows whether or not the
      // address has an account, so this can't be used to probe emails.
    }
    setNotice(`If ${email.trim()} has an account, a password reset link is on its way.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
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

      <div className="relative w-full max-w-[440px] animate-fade-in">
        {/* Card */}
        <div className="login-card rounded-2xl p-10 border border-space-500/60"
          style={{
            background: 'var(--login-card-bg)',
          }}>

          {/* Logo + title */}
          <div className="text-center mb-7">
            <div className="brand-mark w-14 h-14 rounded-[14px] mx-auto mb-4 flex items-center justify-center"
              style={{
                background: 'var(--accent)',
                boxShadow: 'none',
              }}>
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-ink mb-1.5">Member Portal</h1>
            <p className="text-ink-dim text-sm">Sign in to access resources</p>
          </div>

          {notice && (
            <p className="p-3 rounded-xl mb-5 text-sm bg-electric-500/10 text-ink" role="status">{notice}</p>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl mb-5 text-sm"
              style={{
                background: 'var(--c-bg)',
                border: '2px solid var(--alert)',
                color: 'var(--alert)',
              }}>
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-ink-dim mb-2 tracking-tight">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder-ink-ghost outline-none transition-all duration-150 border"
                  style={{
                    background: 'var(--login-input-bg)',
                    borderColor: 'var(--login-input-border)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--login-input-border)'; }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-xs font-bold text-ink-dim tracking-tight">
                  Password
                </label>
                <button type="button" onClick={handleForgotPassword}
                  className="text-xs font-semibold text-electric-400 hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder-ink-ghost outline-none transition-all duration-150 border"
                  style={{
                    background: 'var(--login-input-bg)',
                    borderColor: 'var(--login-input-border)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--login-input-border)'; }}
                  required
                />
              </div>
              <p className="text-[10px] text-ink-muted mt-2 font-mono">
                Joined with an access code? It's still your password until you change it.
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
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
