import { useState } from 'react';
import { ArrowLeft, Camera, Save, X, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useDarkMode } from '../contexts/DarkModeContext';

const PRESET_INTERESTS = [
  'Furniture',
  'Kitchen Supplies',
  'Dorm Decor',
  'Electronics',
  'Clothing',
  'Textbooks',
  'Move-Out Essentials',
  'Cleaning Supplies',
  'Organization',
  'International Student Essentials',
  'Seasonal Items',
  'Halloween',
  'Winter Gear',
  'Plants',
  'Fitness',
  'Gaming',
  'Laundry',
  'Lifestyle'
];

interface EditProfileScreenProps {
  navigateTo: (screen: string) => void;
}

export default function EditProfileScreen({ navigateTo }: EditProfileScreenProps) {
  const { darkMode } = useDarkMode();
  const [profileData, setProfileData] = useState({
    name: 'Ryan Mehta',
    username: '@ryanmehta',
    email: 'ryan.mehta@university.edu',
    bio: 'Computer Science major | Love vintage fashion and tech gadgets',
    campus: 'Main Campus',
    graduationYear: '2025'
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Electronics', 'Clothing', 'Textbooks']);
  const [customTag, setCustomTag] = useState('');
  const [customInterests, setCustomInterests] = useState<string[]>([]);

  // Add error states
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !customInterests.includes(trimmed) && !PRESET_INTERESTS.includes(trimmed)) {
      setCustomInterests([...customInterests, trimmed]);
      setSelectedInterests([...selectedInterests, trimmed]);
      setCustomTag('');
    }
  };

  const handleRemoveCustomTag = (tag: string) => {
    setCustomInterests(customInterests.filter(t => t !== tag));
    setSelectedInterests(selectedInterests.filter(t => t !== tag));
  };

  const allInterests = [...PRESET_INTERESTS, ...customInterests];

  const handleSave = () => {
    setAttemptedSubmit(true);

    // Validate name
    if (!profileData.name.trim()) {
      setNameError('Please enter your full name');
      return;
    }

    // Validate bio (at least one sentence - roughly 10 characters)
    if (!profileData.bio.trim() || profileData.bio.trim().length < 10) {
      setBioError('Please add at least one sentence');
      return;
    }

    toast.success('Profile updated successfully!');
    setTimeout(() => {
      navigateTo('profile');
    }, 500);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} pb-24`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('settings')}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
            </button>
            <h2 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-xl flex-1`}>Edit Profile</h2>
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
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'} rounded-3xl border shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-6`}>
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
            <p className={`${darkMode ? 'text-gray-400' : 'text-[#666]'} text-sm mt-3`}>Click to change photo</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'} rounded-3xl border shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4 space-y-4`}>
          <InputField
            label="Full Name"
            value={profileData.name}
            onChange={(value) => {
              setProfileData({ ...profileData, name: value });
              setNameError('');
            }}
            darkMode={darkMode}
            error={attemptedSubmit ? nameError : ''}
          />
          
          <div className={`border-t ${darkMode ? 'border-white/20' : 'border-purple-100/40'}`} />
          
          <InputField
            label="Username"
            value={profileData.username}
            onChange={(value) => setProfileData({ ...profileData, username: value })}
            darkMode={darkMode}
          />
          
          <div className={`border-t ${darkMode ? 'border-white/20' : 'border-purple-100/40'}`} />
          
          <InputField
            label="Email"
            value={profileData.email}
            onChange={(value) => setProfileData({ ...profileData, email: value })}
            type="email"
            darkMode={darkMode}
          />
          
          <div className={`border-t ${darkMode ? 'border-white/20' : 'border-purple-100/40'}`} />
          
          <TextAreaField
            label="Bio"
            value={profileData.bio}
            onChange={(value) => {
              setProfileData({ ...profileData, bio: value });
              setBioError('');
            }}
            darkMode={darkMode}
            error={attemptedSubmit ? bioError : ''}
          />
        </div>

        {/* Campus Info */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'} rounded-3xl border shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4 space-y-4`}>
          <InputField
            label="Campus"
            value={profileData.campus}
            onChange={(value) => setProfileData({ ...profileData, campus: value })}
            darkMode={darkMode}
          />
          
          <div className={`border-t ${darkMode ? 'border-white/20' : 'border-purple-100/40'}`} />
          
          <InputField
            label="Graduation Year"
            value={profileData.graduationYear}
            onChange={(value) => setProfileData({ ...profileData, graduationYear: value })}
            darkMode={darkMode}
          />
        </div>

        {/* Interests Section */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'} rounded-3xl border shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4`}>
          <label className={`${darkMode ? 'text-gray-400' : 'text-[#666]'} text-sm block mb-4`}>Your Interests</label>
          
          {/* Custom Tag Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add custom tag"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomTag();
                }
              }}
              className={`flex-1 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/50 border-purple-100/50 text-[#222]'} border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            <button
              onClick={handleAddCustomTag}
              disabled={!customTag.trim()}
              className={`px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Interests Grid */}
          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              const isCustom = customInterests.includes(interest);

              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`relative px-3 py-1.5 rounded-full transition-all text-sm ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-600'
                      : darkMode
                      ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20'
                      : 'bg-white/60 text-gray-700 border-purple-200/50 hover:bg-white/80 hover:border-purple-300'
                  } border ${isCustom ? 'pr-7' : ''}`}
                >
                  {interest}
                  {isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCustomTag(interest);
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>
              );
            })}
          </div>
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
  darkMode: boolean;
  error?: string;
}

function InputField({ label, value, onChange, type = 'text', darkMode, error }: InputFieldProps) {
  return (
    <div>
      <label className={`${darkMode ? 'text-gray-400' : 'text-[#666]'} text-sm block mb-2`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/50 border-purple-100/50 text-[#222]'} ${error ? 'border-2 border-red-500' : 'border'} rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
  error?: string;
}

function TextAreaField({ label, value, onChange, darkMode, error }: TextAreaFieldProps) {
  return (
    <div>
      <label className={`${darkMode ? 'text-gray-400' : 'text-[#666]'} text-sm block mb-2`}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`w-full ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/50 border-purple-100/50 text-[#222]'} ${error ? 'border-2 border-red-500' : 'border'} rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}