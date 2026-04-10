import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import {
  User as UserIcon, Shield, Hash, GraduationCap, LogOut,
  Save, X, Phone, Star, Award, Edit2, CheckCircle,
  Mail, Calendar, Activity, BookOpen, Tag, Palette, Info
} from 'lucide-react';
import { SEO } from '../components/SEO';

// ─── Constants ──────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  { hex: '3B6DF6', label: 'Blue'   },
  { hex: '8B5CF6', label: 'Purple' },
  { hex: 'EC4899', label: 'Pink'   },
  { hex: 'EF4444', label: 'Red'    },
  { hex: 'F59E0B', label: 'Amber'  },
  { hex: '22C55E', label: 'Green'  },
  { hex: '06B6D4', label: 'Cyan'   },
  { hex: 'EAB308', label: 'Yellow' },
  { hex: '6B7280', label: 'Gray'   },
];

const GRADE_OPTIONS = ['9', '10', '11', '12', 'Faculty', 'Alumni'];

const INTEREST_OPTIONS = [
  'Webmaster', 'Coding', 'CAD', 'Robotics', 'Architecture', 'Video Production',
  'Animation', 'Game Design', 'Biotechnology', 'Engineering Design',
  'Data Science', 'Cybersecurity', 'Photography', 'Leadership', 'Public Speaking',
  'Audio/Podcast', 'Fashion Design', 'Structural Engineering', 'Flight',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const gradeLabel = (grade?: string) => {
  if (!grade) return 'Not set';
  if (grade === 'Faculty' || grade === 'Alumni') return grade;
  const n = parseInt(grade);
  if (isNaN(n)) return grade;
  const suffix = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
  return `${n}${suffix} Grade`;
};

const avatarColorFromUrl = (url?: string): string => {
  if (!url) return '3B6DF6';
  const m = url.match(/background=([A-Fa-f0-9]{6})/);
  return m ? m[1] : '3B6DF6';
};

const buildAvatarUrl = (name: string, color: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=128`;

// ─── Shared UI ───────────────────────────────────────────────────────────────

const card = 'bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden';
const inputCls = 'w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border p-3 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-colors text-sm placeholder-gray-400';
const labelCls = 'block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  editing: boolean;
  saving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  saved: boolean;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title, subtitle, icon: Icon, color, editing, saving, onEdit, onSave, onCancel, saved
}) => (
  <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-dark-border">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      {saved && !editing && (
        <span className="flex items-center gap-1 text-xs font-semibold text-green-500">
          <CheckCircle size={12} /> Saved
        </span>
      )}
      {editing ? (
        <>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            <X size={13} /> Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs font-semibold bg-accent-blue text-white px-4 py-1.5 rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            <Save size={13} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </>
      ) : (
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-hover px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
        >
          <Edit2 size={13} /> Edit
        </button>
      )}
    </div>
  </div>
);

// ─── Section: Identity (name + avatar) ───────────────────────────────────────

const IdentitySection: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { alert: showAlert } = useModal();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [color, setColor] = useState(avatarColorFromUrl(user?.avatar));

  if (!user) return null;

  const reset = () => {
    setName(user.name);
    setColor(avatarColorFromUrl(user.avatar));
    setEditing(false);
  };

  const save = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const newAvatar = buildAvatarUrl(name.trim(), color);
      await updateProfile({ name: name.trim(), avatar: newAvatar, avatarColor: color });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      await showAlert('Error', 'Failed to update identity. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const previewAvatar = buildAvatarUrl(name || user.name, color);

  return (
    <div className={card}>
      <SectionHeader
        title="Identity" subtitle="Display name and avatar"
        icon={UserIcon} color="#3B6DF6"
        editing={editing} saving={saving} saved={saved}
        onEdit={() => setEditing(true)} onSave={save} onCancel={reset}
      />
      <div className="px-6 py-5 flex items-center gap-6">
        {/* Avatar preview */}
        <div className="shrink-0">
          <img
            src={previewAvatar}
            alt={name || user.name}
            className="w-20 h-20 rounded-2xl shadow-md"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className={labelCls}><UserIcon size={12} /> Display Name</label>
            {editing ? (
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className={inputCls}
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-semibold">{user.name}</p>
            )}
          </div>
          {editing && (
            <div>
              <label className={labelCls}><Palette size={12} /> Avatar Color</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {AVATAR_COLORS.map(c => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    title={c.label}
                    className={`w-8 h-8 rounded-lg transition-all border-2 ${
                      color === c.hex
                        ? 'border-gray-900 dark:border-white scale-110 shadow-md'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ background: `#${c.hex}` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Section: Personal Info ───────────────────────────────────────────────────

const PersonalSection: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { alert: showAlert } = useModal();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [grade, setGrade] = useState(user?.grade ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  if (!user) return null;

  const reset = () => {
    setPhone(user.phone ?? '');
    setGrade(user.grade ?? '');
    setBio(user.bio ?? '');
    setEditing(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateProfile({ phone: phone.trim(), grade, bio: bio.trim() });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      await showAlert('Error', 'Failed to save personal info.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={card}>
      <SectionHeader
        title="Personal Info" subtitle="Grade, contact, and bio"
        icon={Info} color="#8B5CF6"
        editing={editing} saving={saving} saved={saved}
        onEdit={() => setEditing(true)} onSave={save} onCancel={reset}
      />
      <div className="px-6 py-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}><GraduationCap size={12} /> Grade</label>
            {editing ? (
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className={inputCls}
              >
                <option value="">Select grade…</option>
                {GRADE_OPTIONS.map(g => (
                  <option key={g} value={g}>{gradeLabel(g)}</option>
                ))}
              </select>
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{gradeLabel(user.grade) || <span className="text-gray-400 italic">Not set</span>}</p>
            )}
          </div>
          <div>
            <label className={labelCls}><Phone size={12} /> Phone Number</label>
            {editing ? (
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className={inputCls}
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">
                {user.phone || <span className="text-gray-400 italic">Not provided</span>}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className={labelCls}><BookOpen size={12} /> Bio</label>
          {editing ? (
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="A short bio about you — interests, goals, favorite competition…"
              rows={3}
              className={`${inputCls} resize-none`}
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium whitespace-pre-wrap text-sm leading-relaxed">
              {user.bio || <span className="text-gray-400 italic">No bio written yet</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Section: TSA Profile ────────────────────────────────────────────────────

const TsaProfileSection: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { alert: showAlert } = useModal();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(user?.skills ?? []);
  const [interests, setInterests] = useState<string[]>(user?.interests ?? []);
  const [achievements, setAchievements] = useState(user?.achievements ?? '');

  if (!user) return null;

  const reset = () => {
    setSkills(user.skills ?? []);
    setInterests(user.interests ?? []);
    setAchievements(user.achievements ?? '');
    setSkillInput('');
    setEditing(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateProfile({ skills, interests, achievements: achievements.trim() });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      await showAlert('Error', 'Failed to save TSA profile.');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
    setSkillInput('');
  };

  const removeSkill = (s: string) => setSkills(skills.filter(x => x !== s));

  const toggleInterest = (i: string) =>
    setInterests(interests.includes(i) ? interests.filter(x => x !== i) : [...interests, i]);

  return (
    <div className={card}>
      <SectionHeader
        title="TSA Profile" subtitle="Skills, interests, and achievements"
        icon={Star} color="#F59E0B"
        editing={editing} saving={saving} saved={saved}
        onEdit={() => setEditing(true)} onSave={save} onCancel={reset}
      />
      <div className="px-6 py-5 space-y-6">

        {/* Skills */}
        <div>
          <label className={labelCls}><Tag size={12} /> Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(editing ? skills : (user.skills ?? [])).map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800/30"
              >
                {s}
                {editing && (
                  <button onClick={() => removeSkill(s)} className="hover:text-red-500 transition-colors">
                    <X size={10} />
                  </button>
                )}
              </span>
            ))}
            {!editing && (user.skills ?? []).length === 0 && (
              <span className="text-gray-400 italic text-sm">No skills added yet</span>
            )}
          </div>
          {editing && (
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(skillInput); }
                }}
                placeholder="Type a skill and press Enter…"
                className={`${inputCls} flex-1`}
              />
              <button
                onClick={() => addSkill(skillInput)}
                disabled={!skillInput.trim()}
                className="px-4 py-2.5 bg-accent-blue text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-accent-hover transition-colors shrink-0"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Interests */}
        <div>
          <label className={labelCls}><Star size={12} /> Competition Interests</label>
          {editing ? (
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map(opt => {
                const active = interests.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleInterest(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-accent-blue text-white border-accent-blue'
                        : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-dark-border hover:border-accent-blue hover:text-accent-blue'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(user.interests ?? []).length > 0 ? (
                (user.interests ?? []).map(i => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/30"
                  >
                    {i}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic text-sm">No interests selected</span>
              )}
            </div>
          )}
        </div>

        {/* Achievements */}
        <div>
          <label className={labelCls}><Award size={12} /> Past TSA Achievements</label>
          {editing ? (
            <textarea
              value={achievements}
              onChange={e => setAchievements(e.target.value)}
              placeholder="Awards, placements, leadership roles, notable projects…"
              rows={4}
              className={`${inputCls} resize-none`}
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium whitespace-pre-wrap text-sm leading-relaxed">
              {user.achievements || <span className="text-gray-400 italic">No achievements listed</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Section: Account Info (read-only) ───────────────────────────────────────

const AccountInfoSection: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const roleColors: Record<string, string> = {
    advisor: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
    officer: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    member: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400',
    guest: 'text-gray-600 bg-gray-50 dark:bg-white/5 dark:text-gray-400',
  };
  const statusColors: Record<string, string> = {
    active: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400',
    pending: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400',
    suspended: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
    archived: 'text-gray-500 bg-gray-100 dark:bg-white/5 dark:text-gray-400',
  };

  const items = [
    { icon: Hash,       label: 'Member ID',  value: user.memberId || 'Pending' },
    { icon: Mail,       label: 'Email',       value: user.email },
    { icon: Shield,     label: 'Role',        value: user.role, badge: roleColors[user.role] },
    { icon: Activity,   label: 'Status',      value: user.status ?? 'active', badge: statusColors[user.status ?? 'active'] },
    { icon: Calendar,   label: 'Joined',      value: user.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown' },
  ];

  return (
    <div className={card}>
      <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-dark-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-white/5">
          <Shield size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Account Information</h3>
          <p className="text-xs text-gray-400 mt-0.5">Managed by chapter officers — contact an officer to change</p>
        </div>
      </div>
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, label, value, badge }) => (
          <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-dark-border">
            <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg shrink-0">
              <Icon size={15} className="text-gray-500 dark:text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
              {badge ? (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${badge}`}>{value}</span>
              ) : (
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate font-mono">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Settings: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors duration-300">
      <SEO title="Settings" description="Manage your Little Elm High School TSA account settings." />

      <div className="max-w-2xl mx-auto space-y-5">
        {/* Page header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage your profile and TSA account details.</p>
        </div>

        <IdentitySection />
        <PersonalSection />
        <TsaProfileSection />
        <AccountInfoSection />

        {/* Sign out */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-red-100 dark:border-red-900/20 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">Sign Out</p>
            <p className="text-xs text-gray-400 mt-0.5">You'll need your access code to sign back in.</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-xl transition-colors font-bold text-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
