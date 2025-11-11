import { useState } from 'react';
import { ArrowLeft, Eye, Users, MapPin, MessageCircle } from 'lucide-react';
import { Switch } from './ui/switch';

interface PrivacySettingsScreenProps {
  navigateTo: (screen: string) => void;
}

export default function PrivacySettingsScreen({ navigateTo }: PrivacySettingsScreenProps) {
  const [profileVisible, setProfileVisible] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showActiveStatus, setShowActiveStatus] = useState(false);

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
            <h2 className="text-[#9333ea] font-semibold text-xl">Privacy Settings</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4 space-y-4">
          <PrivacyOption
            icon={<Eye className="w-5 h-5 text-purple-600" />}
            title="Profile Visibility"
            description="Allow other students to view your profile"
            value={profileVisible}
            onChange={setProfileVisible}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <PrivacyOption
            icon={<MapPin className="w-5 h-5 text-purple-600" />}
            title="Location Sharing"
            description="Show your campus location in listings"
            value={showLocation}
            onChange={setShowLocation}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <PrivacyOption
            icon={<MessageCircle className="w-5 h-5 text-purple-600" />}
            title="Allow Messages"
            description="Let others contact you about listings"
            value={allowMessages}
            onChange={setAllowMessages}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <PrivacyOption
            icon={<Users className="w-5 h-5 text-purple-600" />}
            title="Active Status"
            description="Show when you're online"
            value={showActiveStatus}
            onChange={setShowActiveStatus}
          />
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4">
          <p className="text-[#666] text-sm leading-relaxed">
            These settings help you control who can see your information and how others can interact with you on Snag.
          </p>
        </div>
      </div>
    </div>
  );
}

interface PrivacyOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function PrivacyOption({ icon, title, description, value, onChange }: PrivacyOptionProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0 mt-1">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[#222] font-medium">{title}</h3>
        <p className="text-[#666] text-sm mt-1">{description}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} className="mt-1" />
    </div>
  );
}
