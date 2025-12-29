
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

      if (!isAuthError) {
        console.error("Login error:", err);
      }

      if (isAuthError) {
         if (password === 'LEHS-ADMIN') {
             setError("Incorrect password. This account exists but uses a different password (created before the update). Please use your original password.");
         } else {
             setError('Invalid Email or Password.');
         }
      } else {
         setError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 -mt-20">
      <div className="w-full max-w-md bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 shadow-2xl animate-fade-in transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Member Portal</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access resources</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-start gap-2 mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" 
                className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400"
                required
              />
              <Mail size={18} className="absolute left-3 top-3.5 text-gray-500" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Access Code (or Password)</label>
              <a href="mailto:lehstsa@gmail.com?subject=TSA%20Password%20Reset%20Request" className="text-xs text-accent-blue hover:text-accent-hover transition-colors">Forgot Password?</a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Access Code" 
                className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-500 dark:placeholder-gray-600"
                required
              />
              <Lock size={18} className="absolute left-3 top-3.5 text-gray-500" />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
                New accounts use the Access Code as the password. Older accounts use the custom password you set.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-accent-blue hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-accent-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn size={18} className="mr-2" /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Need an account?{' '}
            <Link to="/signup" className="text-accent-blue hover:text-accent-hover font-medium transition-colors">Join with Code</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
