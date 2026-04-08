import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    affiliation: currentUser?.affiliation || '',
    bio: currentUser?.bio || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaveMessage('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">My Profile</h1>

          {saveMessage && (
            <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-100 px-4 py-3 text-emerald-700">{saveMessage}</div>
          )}

          <div className="glass-card max-w-3xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-4 py-2 text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)]"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-slate-900 text-lg">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-slate-900 text-lg">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Affiliation</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-slate-900 text-lg">{formData.affiliation || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-slate-900 text-lg">{formData.bio || 'No bio added'}</p>
                )}
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(16,185,129,0.35)]"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
