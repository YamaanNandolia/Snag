import { X } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function ReviewProfileScreen({ navigateTo, userData }: any) {
  const { darkMode } = useDarkMode();
  const { fullName = '', email = '', interests = [] } = userData || {};

  const handleFinishSetup = () => {
    // In production, this would create the account and authenticate
    // For now, navigate to home
    navigateTo('home');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 pt-12 pb-24`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Review Profile Information
          </h1>
          <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
            Make sure everything looks good before finishing setup.
          </p>
        </div>

        {/* Profile Information Cards */}
        <div className="space-y-4 mb-8">
          {/* Name Section */}
          <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl rounded-2xl p-6 border`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={darkMode ? 'text-white' : 'text-gray-900'}>Name</h3>
              <button
                onClick={() => navigateTo('signup')}
                className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
              >
                Edit
              </button>
            </div>
            <p className={darkMode ? 'text-white/80' : 'text-gray-700'}>
              {fullName || 'Not provided'}
            </p>
          </div>

          {/* Email Section */}
          <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl rounded-2xl p-6 border`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={darkMode ? 'text-white' : 'text-gray-900'}>Email</h3>
              <button
                onClick={() => navigateTo('signup')}
                className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
              >
                Edit
              </button>
            </div>
            <p className={darkMode ? 'text-white/80' : 'text-gray-700'}>
              {email || 'Not provided'}
            </p>
          </div>

          {/* Interests Section */}
          <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl rounded-2xl p-6 border`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={darkMode ? 'text-white' : 'text-gray-900'}>Interests</h3>
              <button
                onClick={() => navigateTo('select-interests', userData)}
                className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
              >
                Edit
              </button>
            </div>
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest: string) => (
                  <span
                    key={interest}
                    className={`${darkMode ? 'bg-purple-600/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300'} px-3 py-1 rounded-full border`}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
                No interests selected
              </p>
            )}
          </div>
        </div>

        {/* Finish Setup Button */}
        <div className="flex justify-center">
          <button
            onClick={handleFinishSetup}
            className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
          >
            Finish Setup
          </button>
        </div>
      </div>
    </div>
  );
}
