import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from './ui/input';
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

export default function SelectInterestsScreen({ navigateTo, userData }: any) {
  const { darkMode } = useDarkMode();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [customInterests, setCustomInterests] = useState<string[]>([]);

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

  const handleContinue = () => {
    // Store interests with user data
    const completeUserData = {
      ...userData,
      interests: selectedInterests
    };
    navigateTo('review-profile', completeUserData);
  };

  const handleSkip = () => {
    const completeUserData = {
      ...userData,
      interests: []
    };
    navigateTo('review-profile', completeUserData);
  };

  const allInterests = [...PRESET_INTERESTS, ...customInterests];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 pt-12 pb-24`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Select Your Interests
          </h1>
          <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
            Choose topics that relate to your needs on campus.
          </p>
        </div>

        {/* Custom Tag Input */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Input
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
              className={`${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl flex-1`}
            />
            <button
              onClick={handleAddCustomTag}
              disabled={!customTag.trim()}
              className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700 disabled:bg-white/5 disabled:text-white/30' : 'bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400'} text-white px-4 py-2 rounded-xl transition-all disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Interests Grid */}
        <div className="mb-8 max-h-[50vh] overflow-y-auto no-scrollbar">
          <div className="flex flex-wrap gap-3">
            {allInterests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              const isCustom = customInterests.includes(interest);

              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`relative px-4 py-2 rounded-full transition-all ${
                    isSelected
                      ? darkMode
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-purple-600 text-white border-purple-600'
                      : darkMode
                      ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20'
                      : 'bg-white/60 text-gray-700 border-purple-200/50 hover:bg-white/80 hover:border-purple-300'
                  } border backdrop-blur-xl ${isCustom ? 'pr-8' : ''}`}
                >
                  {interest}
                  {isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCustomTag(interest);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection Counter */}
        {selectedInterests.length > 0 && (
          <div className={`text-center mb-6 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
            {selectedInterests.length} {selectedInterests.length === 1 ? 'interest' : 'interests'} selected
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
            >
              Continue
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSkip}
              className={`w-full ${darkMode ? 'text-white/60 hover:text-white/80 border-white/20 hover:border-white/30' : 'text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400'} border px-8 py-3 rounded-xl transition-all`}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
