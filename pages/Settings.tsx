import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { User, Shield, Hash, GraduationCap, LogOut, Edit2, Save, X, Phone, Star, Award } from 'lucide-react';
import { SEO } from '../components/SEO';

const Settings: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { alert: showAlert } = useModal();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    skills: user?.skills?.join(', ') || '',
    achievements: user?.achievements || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        phone: formData.phone,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        achievements: formData.achievements
      });
      setIsEditing(false);
    } catch (error) {
      await showAlert('Error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors duration-300">
      <SEO title="Settings" description="Manage your Little Elm High School TSA account settings." />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-accent-blue to-accent-purple h-32 relative">
            <div className="absolute -bottom-10 left-8">
              <div className="w-24 h-24 bg-white dark:bg-dark-surface rounded-full p-1 shadow-lg">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-accent-blue text-2xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-12 pb-8 px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{user.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Hash size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Member ID</p>
                  <p className="font-mono font-bold text-gray-900 dark:text-white">{user.memberId || 'Pending'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Role</p>
                  <p className="font-bold text-gray-900 dark:text-white capitalize">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Grade</p>
                  <p className="font-bold text-gray-900 dark:text-white">{user.grade}th Grade</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Status</p>
                  <p className={`font-bold capitalize ${user.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{user.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Profile Details */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Details</h3>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-sm font-bold text-accent-blue hover:text-accent-hover transition-colors"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      phone: user?.phone || '',
                      skills: user?.skills?.join(', ') || '',
                      achievements: user?.achievements || ''
                    });
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={16} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 text-sm font-bold bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-accent-purple transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-accent-purple/40 hover:scale-105 hover:-translate-y-0.5"
                >
                  <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone size={14} /> Phone Number
              </label>
              {isEditing ? (
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="(555) 123-4567"
                  className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-colors"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{user.phone || <span className="text-gray-400 italic">Not provided</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Star size={14} /> Skills (comma separated)
              </label>
              {isEditing ? (
                <input 
                  type="text"
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                  placeholder="e.g. Python, CAD, Public Speaking"
                  className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-colors"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, i) => (
                      <span key={i} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-900/30">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic font-medium">No skills added yet</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Award size={14} /> Past TSA Achievements
              </label>
              {isEditing ? (
                <textarea 
                  value={formData.achievements}
                  onChange={e => setFormData({...formData, achievements: e.target.value})}
                  placeholder="List any past awards, leadership roles, or notable projects..."
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-colors resize-none"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium whitespace-pre-wrap">{user.achievements || <span className="text-gray-400 italic">No achievements listed</span>}</p>
              )}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-red-100 dark:border-red-900/20 p-8">
          <h3 className="text-lg font-bold text-red-600 mb-6">Account Actions</h3>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg transition-colors font-bold text-sm"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
