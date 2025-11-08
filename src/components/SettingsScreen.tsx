import { useState } from 'react';
import { ArrowLeft, Bell, Shield, User, Palette, HelpCircle, ChevronRight, MessageSquare, Paintbrush, Moon, Globe } from 'lucide-react';
import { Switch } from './ui/switch';

interface SettingsScreenProps {
  navigateTo: (screen: string) => void;
}

export default function SettingsScreen({ navigateTo }: SettingsScreenProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        { 
          id: 'push-notifications', 
          label: 'Push Notifications', 
          icon: Bell,
          hasToggle: true,
          toggleValue: pushNotifications,
          onToggle: setPushNotifications
        },
        { 
          id: 'email-notifications', 
          label: 'Email Notifications', 
          icon: Bell,
          hasToggle: true,
          toggleValue: emailNotifications,
          onToggle: setEmailNotifications
        }
      ]
    },
    {
      title: 'Privacy & Safety',
      items: [
        { id: 'privacy-settings', label: 'Privacy Settings', icon: Shield, action: () => navigateTo('privacy-settings') },
        { id: 'blocked-users', label: 'Blocked Users', icon: User, action: () => navigateTo('blocked-users') },
        { id: 'safety-tips', label: 'Safety Tips', icon: Shield, action: () => navigateTo('safety-tips') }
      ]
    },
    {
      title: 'Account Settings',
      items: [
        { id: 'edit-profile', label: 'Edit Profile', icon: User, action: () => navigateTo('edit-profile') },
        { id: 'change-password', label: 'Change Password', icon: Shield, action: () => navigateTo('change-password') }
      ]
    },
    {
      title: 'App Preferences',
      items: [
        { 
          id: 'appearance', 
          label: 'Dark Mode', 
          icon: Moon,
          hasToggle: true,
          toggleValue: darkMode,
          onToggle: setDarkMode
        },
        { id: 'language', label: 'Language', icon: Globe, action: () => navigateTo('language-settings') }
      ]
    },
    {
      title: 'Help & Feedback',
      items: [
        { id: 'help-center', label: 'Help Center', icon: HelpCircle, action: () => navigateTo('help-center') },
        { id: 'send-feedback', label: 'Send Feedback', icon: MessageSquare, action: () => navigateTo('send-feedback') }
      ]
    },
    {
      title: 'Developer',
      items: [
        { id: 'style-guide', label: 'Design System / Style Guide', icon: Paintbrush, action: () => navigateTo('style-guide') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#222]" />
            </button>
            <h2 className="text-[#9333ea] font-semibold text-xl">Settings</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-[#555] font-medium text-sm px-2 mb-3">{section.title}</h3>
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
              {section.items.map((item, index) => (
                <SettingsRow
                  key={item.id}
                  item={item}
                  isLast={index === section.items.length - 1}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      console.log('Settings item clicked:', item.id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-[#999] text-sm">Snag v1.0.0</p>
          <p className="text-[#999] text-xs mt-1">Made with 💜 for students</p>
        </div>
      </div>
    </div>
  );
}

interface SettingsRowProps {
  item: {
    id: string;
    label: string;
    icon: any;
    action?: () => void;
    hasToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
  };
  isLast: boolean;
  onClick: () => void;
}

function SettingsRow({ item, isLast, onClick }: SettingsRowProps) {
  const IconComponent = item.icon;

  return (
    <div
      className={`w-full px-4 py-4 flex items-center gap-3 ${
        !isLast ? 'border-b border-purple-100/40' : ''
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
        <IconComponent className="w-5 h-5 text-purple-600" />
      </div>
      <span className="text-[#222] font-medium flex-1">{item.label}</span>
      
      {item.hasToggle && item.onToggle ? (
        <Switch
          checked={item.toggleValue || false}
          onCheckedChange={item.onToggle}
        />
      ) : (
        <button
          onClick={onClick}
          className="hover:bg-white/50 transition-colors active:scale-[0.98] p-2 rounded-full"
        >
          <ChevronRight className="w-5 h-5 text-[#999]" />
        </button>
      )}
    </div>
  );
}
