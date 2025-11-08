import { useState } from 'react';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditProfileScreenProps {
  navigateTo: (screen: string) => void;
}

export default function EditProfileScreen({ navigateTo }: EditProfileScreenProps) {
  const [profileData, setProfileData] = useState({
    name: 'Ryan Mehta',
    username: '@ryanmehta',
    email: 'ryan.mehta@university.edu',
    bio: 'Computer Science major | Love vintage fashion and tech gadgets',
    campus: 'Main Campus',
    graduationYear: '2025'
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setTimeout(() => {
      navigateTo('profile');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('settings')}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#222]" />
            </button>
            <h2 className="text-[#9333ea] font-semibold text-xl flex-1">Edit Profile</h2>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Photo */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"
                alt="Profile"
                className="w-24 h-24 rounded-full bg-purple-100"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[#666] text-sm mt-3">Click to change photo</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4 space-y-4">
          <InputField
            label="Full Name"
            value={profileData.name}
            onChange={(value) => setProfileData({ ...profileData, name: value })}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <InputField
            label="Username"
            value={profileData.username}
            onChange={(value) => setProfileData({ ...profileData, username: value })}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <InputField
            label="Email"
            value={profileData.email}
            onChange={(value) => setProfileData({ ...profileData, email: value })}
            type="email"
          />
          
          <div className="border-t border-purple-100/40" />
          
          <TextAreaField
            label="Bio"
            value={profileData.bio}
            onChange={(value) => setProfileData({ ...profileData, bio: value })}
          />
        </div>

        {/* Campus Info */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4 space-y-4">
          <InputField
            label="Campus"
            value={profileData.campus}
            onChange={(value) => setProfileData({ ...profileData, campus: value })}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <InputField
            label="Graduation Year"
            value={profileData.graduationYear}
            onChange={(value) => setProfileData({ ...profileData, graduationYear: value })}
          />
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function InputField({ label, value, onChange, type = 'text' }: InputFieldProps) {
  return (
    <div>
      <label className="text-[#666] text-sm block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/50 border border-purple-100/50 rounded-xl px-4 py-2 text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function TextAreaField({ label, value, onChange }: TextAreaFieldProps) {
  return (
    <div>
      <label className="text-[#666] text-sm block mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-white/50 border border-purple-100/50 rounded-xl px-4 py-2 text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
    </div>
  );
}
