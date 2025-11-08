import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';

// 1. props로 currentUser와 onProfileUpdate를 받도록 수정
export default function EditProfileScreen({ navigateTo, currentUser, onProfileUpdate }: any) {
  
  // 2. input 필드를 제어하기 위한 별도의 상태를 만듭니다.
  //    (초기값은 App.tsx에서 받은 현재 이름)
  const [name, setName] = useState(currentUser.name);

  // 3. 'Save' 버튼을 눌렀을 때 실행될 함수
  const handleSave = () => {
    // 이름이 비어있지 않다면
    if (name.trim() !== '') {
      // 4. App.tsx로 "이름이 변경되었습니다"라고 알림 (onProfileUpdate 함수 호출)
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

        {/* Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[#555] text-xs mb-2 block">Full Name</Label>
            <Input
              id="name"
              value={name} // 5. input 값은 'name' 상태와 연결
              onChange={(e) => setName(e.target.value)} // 6. 타이핑할 때마다 'name' 상태 업데이트
              placeholder="Enter your full name"
              className="backdrop-blur-xl bg-white/80 border-white/60 text-[#222]"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-[#555] text-xs mb-2 block">Email</Label>
            <Input
              id="email"
              value="ryan.mehta@campus.edu" // (이메일은 지금 하드코딩)
              disabled
              className="backdrop-blur-xl bg-white/50 border-white/60 text-[#888]"
            />
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto">
          {/* 7. 'Save Changes' 버튼이 handleSave 함수를 호출 */}
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