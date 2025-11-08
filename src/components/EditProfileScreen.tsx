import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function EditProfileScreen({ navigateTo, currentUser, onProfileUpdate }: any) {
  const [name, setName] = useState(currentUser.name);
  const handleSave = () => {
    if (name.trim() !== '') {
      onProfileUpdate({ name: name.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('settings')}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">Edit Profile</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-32 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-4xl font-medium">
              {name ? name.charAt(0) : '?'}
            </AvatarFallback>
          </Avatar>
          <button className="text-sm font-medium text-purple-600">
            Change Photo (Not implemented)
          </button>
        </div>


        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[#555] text-xs mb-2 block">Full Name</Label>
            <Input
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name"
              className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-[#555] text-xs mb-2 block">Email</Label>
            <Input
              id="email"
              value="ryan.mehta@campus.edu" // (hardcoding currently)
              disabled
              className="backdrop-blur-xl bg-white/50 border-white/60 text-[#888]"
            />
          </div>
        </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto">

          <button
            onClick={handleSave}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}