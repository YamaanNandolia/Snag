import { Home, Users, Plus, User, Settings } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  navigateTo: (screen: string) => void;
}

export default function BottomNav({ activeScreen, navigateTo }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'circles-home', label: 'Circles', icon: Users },
    { id: 'create', label: 'Create', icon: Plus, isFab: true },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pb-safe">
      <div className="max-w-md mx-auto backdrop-blur-xl bg-white/10 border-t border-white/30 shadow-[0_-8px_24px_rgba(139,92,246,0.08)]">
        {/* Navigation Container - All items on same baseline */}
        <div className="flex items-center justify-between px-2 h-20">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeScreen === item.id;

            if (item.isFab) {
              return (
                <div key={item.id} className="flex flex-col items-center justify-end h-full pb-3 px-1">
                  <button
                    onClick={() => navigateTo('create')}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(139,92,246,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform -mt-7"
                  >
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </button>
                  <span className="text-xs font-medium text-purple-600 mt-1">
                    {item.label}
                  </span>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="flex flex-col items-center justify-end h-full pb-3 min-w-[56px] flex-1"
              >
                <IconComponent 
                  className="w-6 h-6" 
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ color: isActive ? '#9333ea' : '#6b7280' }}
                />
                <span 
                  className="text-xs font-medium mt-2"
                  style={{ color: isActive ? '#9333ea' : '#6b7280' }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}