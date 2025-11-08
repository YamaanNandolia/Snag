import { useState } from 'react';
import { ArrowLeft, UserX, Search } from 'lucide-react';

interface BlockedUsersScreenProps {
  navigateTo: (screen: string) => void;
}

interface BlockedUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  blockedDate: string;
}

export default function BlockedUsersScreen({ navigateTo }: BlockedUsersScreenProps) {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      id: '1',
      name: 'John Doe',
      username: '@johndoe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      blockedDate: '2 weeks ago'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUnblock = (userId: string) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
  };

  const filteredUsers = blockedUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h2 className="text-[#9333ea] font-semibold text-xl">Blocked Users</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
          <input
            type="text"
            placeholder="Search blocked users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full backdrop-blur-xl bg-white/10 border border-white/30 rounded-full pl-12 pr-4 py-3 text-[#222] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Blocked Users List */}
        {filteredUsers.length > 0 ? (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className={`p-4 flex items-center gap-3 ${
                  index !== filteredUsers.length - 1 ? 'border-b border-purple-100/40' : ''
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full bg-purple-100"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#222] font-medium">{user.name}</h3>
                  <p className="text-[#666] text-sm">{user.username}</p>
                  <p className="text-[#999] text-xs mt-1">Blocked {user.blockedDate}</p>
                </div>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-8 text-center">
            <UserX className="w-12 h-12 text-[#999] mx-auto mb-3" />
            <h3 className="text-[#222] font-medium mb-2">No Blocked Users</h3>
            <p className="text-[#666] text-sm">
              {searchQuery ? 'No users match your search' : 'You haven\'t blocked anyone yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
