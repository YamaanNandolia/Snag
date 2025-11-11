import { useState } from 'react';
import { ArrowLeft, Check, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LanguageSettingsScreenProps {
  navigateTo: (screen: string) => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export default function LanguageSettingsScreen({ navigateTo }: LanguageSettingsScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    const language = languages.find(lang => lang.code === code);
    toast.success(`Language changed to ${language?.name}`);
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
            <h2 className="text-[#9333ea] font-semibold text-xl">Language</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="backdrop-blur-xl bg-purple-50/50 border border-purple-200/50 rounded-3xl p-4">
          <div className="flex gap-3">
            <Globe className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-purple-900 font-medium mb-1">App Language</h3>
              <p className="text-purple-700 text-sm">
                Select your preferred language. The app will restart to apply changes.
              </p>
            </div>
          </div>
        </div>

        {/* Languages List */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
          {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full px-4 py-4 flex items-center gap-3 text-left hover:bg-white/50 transition-colors ${
                index !== languages.length - 1 ? 'border-b border-purple-100/40' : ''
              }`}
            >
              <span className="text-2xl flex-shrink-0">{language.flag}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#222] font-medium">{language.name}</h3>
                <p className="text-[#666] text-sm">{language.nativeName}</p>
              </div>
              {selectedLanguage === language.code && (
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
