import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShieldOff, KeyRound, Loader2, LogOut } from 'lucide-react';
import { useAuth, MIN_PASSWORD_LENGTH } from '../context/AuthContext';
import { pwnedPasswordCount, BREACHED_PASSWORD_MESSAGE } from '../lib/pwnedPassword';

/** Shown instead of member pages while an account is pending or deactivated. */
export const AccountStatusScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pending = user?.status === 'pending';
  const Icon = pending ? Clock : ShieldOff;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[460px] bg-space-800 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-electric-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon className="text-electric-400" size={30} />
        </div>
        <h1 className="text-[28px] font-black tracking-tight text-ink mb-3">
          {pending ? 'Awaiting approval' : 'Account not active'}
        </h1>
        <p className="text-ink-dim leading-relaxed mb-6">
          {pending ? (
            <>Thanks, {user?.name?.split(' ')[0] || 'there'}! An officer needs to approve your account before you can
            use the member portal. Check back soon.</>
          ) : (
            <>Your account isn't active right now. If you think that's a mistake, contact an officer.</>
          )}
        </p>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="btn-secondary justify-center w-full"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  );
};

/**
 * One-time question for members who joined with an access code, whose
 * password is still that code: keep it, or set their own. Either answer is
 * recorded on the profile so the question never repeats.
 */
export const PasswordChoicePrompt: React.FC = () => {
  const { updateProfile, changePassword } = useAuth();
  const [mode, setMode] = useState<'ask' | 'change'>('ask');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const keep = async () => {
    setBusy(true);
    setError('');
    try {
      await updateProfile({ passwordChoice: 'kept-code' });
    } catch {
      setError("That didn't save. Please try again.");
      setBusy(false);
    }
  };

  const change = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      if (await pwnedPasswordCount(password)) {
        setError(BREACHED_PASSWORD_MESSAGE);
        setBusy(false);
        return;
      }
      await changePassword(password);
      await updateProfile({ passwordChoice: 'own' });
    } catch (err: any) {
      setError(err.message || "Your password couldn't be changed. Please try again.");
      setBusy(false);
    }
  };

  const inputClass = "w-full bg-space-700/60 border border-space-500/50 rounded-xl px-4 py-3 text-ink focus:border-electric-500 outline-none placeholder-ink-muted";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-choice-title"
    >
      <div className="w-full max-w-[440px] bg-space-800 rounded-2xl p-7 animate-fade-in">
        <div className="w-14 h-14 bg-electric-500/10 rounded-2xl flex items-center justify-center mb-4">
          <KeyRound className="text-electric-400" size={26} />
        </div>
        <h2 id="password-choice-title" className="text-2xl font-black text-ink mb-2">Your password</h2>
        <p className="text-sm text-ink-dim leading-relaxed mb-5">
          You joined with an access code, and that code is still your password. Members now choose their own
          passwords. Would you like to keep your access code as your password, or set a new one? Either way,
          officers can't see your password.
        </p>

        {error && <p className="text-sm text-gold-400 font-medium mb-4">{error}</p>}

        {mode === 'ask' ? (
          <div className="flex flex-col gap-3">
            <button onClick={() => setMode('change')} disabled={busy} className="btn-primary justify-center w-full">
              Set a new password
            </button>
            <button onClick={keep} disabled={busy} className="btn-secondary justify-center w-full">
              {busy ? <Loader2 className="animate-spin" size={18} /> : 'Keep my access code'}
            </button>
          </div>
        ) : (
          <form onSubmit={change} className="space-y-3">
            <label htmlFor="pc-new" className="sr-only">New password</label>
            <input id="pc-new" type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder={`New password (at least ${MIN_PASSWORD_LENGTH} characters)`} autoComplete="new-password"
              className={inputClass} required />
            <label htmlFor="pc-confirm" className="sr-only">Confirm new password</label>
            <input id="pc-confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password" autoComplete="new-password" className={inputClass} required />
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setMode('ask'); setError(''); }} disabled={busy}
                className="btn-secondary flex-1 justify-center">
                Back
              </button>
              <button type="submit" disabled={busy} className="btn-primary flex-1 justify-center">
                {busy ? <Loader2 className="animate-spin" size={18} /> : 'Save password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
