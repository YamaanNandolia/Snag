import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ChangePasswordScreenProps {
  navigateTo: (screen: string) => void;
}

export default function ChangePasswordScreen({ navigateTo }: ChangePasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    toast.success('Password changed successfully!');
    setTimeout(() => {
      navigateTo('settings');
    }, 500);
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
            <h2 className="text-[#9333ea] font-semibold text-xl flex-1">Change Password</h2>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Security Info */}
        <div className="backdrop-blur-xl bg-purple-50/50 border border-purple-200/50 rounded-3xl p-4">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-purple-900 font-medium mb-1">Password Requirements</h3>
              <p className="text-purple-700 text-sm">
                Your password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
              </p>
            </div>
          </div>
        </div>

        {/* Password Fields */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4 space-y-4">
          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            show={showCurrent}
            onToggleShow={() => setShowCurrent(!showCurrent)}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            show={showNew}
            onToggleShow={() => setShowNew(!showNew)}
          />
          
          <div className="border-t border-purple-100/40" />
          
          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirm}
            onToggleShow={() => setShowConfirm(!showConfirm)}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button className="text-purple-600 hover:text-purple-700 text-sm">
            Forgot your current password?
          </button>
        </div>
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
}

function PasswordField({ label, value, onChange, show, onToggleShow }: PasswordFieldProps) {
  return (
    <div>
      <label className="text-[#666] text-sm block mb-2">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/50 border border-purple-100/50 rounded-xl px-4 py-2 pr-12 text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#666] transition-colors"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
