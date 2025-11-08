import { ArrowLeft, Package, CheckCircle, MapPin, ShoppingBag, CheckCheck } from 'lucide-react';

export default function NotificationsScreen({ navigateTo, notifications = [], onNotificationClick }: any) {
  // Group notifications by time
  const todayNotifications = notifications.filter((n: any) => 
    n.time.includes('Just now') || n.time.includes('hour') || n.time.includes('minute')
  );
  
  const earlierNotifications = notifications.filter((n: any) => 
    n.time.includes('day') || n.time.includes('week') || n.time.includes('month')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-8">
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
            <h2 className="text-[#9333ea] font-semibold text-xl">Notifications</h2>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="max-w-md mx-auto px-4 py-4 space-y-6">
          {/* Today */}
          {todayNotifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[#222] font-semibold px-2">Today</h3>
              {todayNotifications.map((notification: any) => (
                <NotificationCard 
                  key={notification.id} 
                  notification={notification}
                  onClick={() => onNotificationClick && onNotificationClick(notification)}
                />
              ))}
            </div>
          )}

          {/* Earlier */}
          {earlierNotifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[#222] font-semibold px-2">Earlier</h3>
              {earlierNotifications.map((notification: any) => (
                <NotificationCard 
                  key={notification.id} 
                  notification={notification}
                  onClick={() => onNotificationClick && onNotificationClick(notification)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-12 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
              <CheckCheck className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-[#222] font-semibold mb-2">All caught up!</h3>
            <p className="text-[#555]">You have no new notifications</p>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationCard({ notification, onClick }: any) {
  const iconMap: any = {
    meeting: MapPin,
    listing: Package,
    barter: ShoppingBag,
    default: CheckCircle
  };

  const colorMap: any = {
    meeting: 'from-green-500 to-green-600',
    listing: 'from-indigo-500 to-indigo-600',
    barter: 'from-purple-500 to-purple-600',
    default: 'from-blue-500 to-blue-600'
  };

  const IconComponent = iconMap[notification.type] || iconMap.default;
  const iconColor = colorMap[notification.type] || colorMap.default;

  return (
    <button
      onClick={onClick}
      className={`w-full backdrop-blur-xl rounded-2xl p-4 border shadow-sm transition-all hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] active:scale-[0.98] text-left ${
        notification.unread
          ? 'bg-white/20 border-white/40'
          : 'bg-white/10 border-white/30'
      }`}
    >
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${iconColor} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-[#222] font-medium flex items-center gap-2">
              {notification.title}
              {notification.unread && (
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              )}
            </h3>
          </div>
          <p className="text-[#555] mb-2 text-sm">{notification.message}</p>
          <p className="text-[#888] text-sm font-light">{notification.time}</p>
        </div>
      </div>
    </button>
  );
}