import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './ui/input';
import BoxLogo from './BoxLogo';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function LoginScreen({ navigateTo }: any) {
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Please enter a valid email.');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password must be at least 8 characters.');
      return false;
    }
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      validatePassword(value);
    }
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      // Simulate login - in production this would authenticate
      navigateTo('home');
    }
  };

  const handleContinueAsGuest = () => {
    navigateTo('home');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 pt-20 pb-12`}>
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <BoxLogo size={80} />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => email && validateEmail(email)}
            className={`${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && (
            <p className="text-red-500 mt-2">{emailError}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => password && validatePassword(password)}
              className={`${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl pr-12 ${passwordError ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-white/60 hover:text-white/80' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 mt-2">{passwordError}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-8">
          <button
            onClick={() => navigateTo('forgot-password')}
            className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleLogin}
            className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
          >
            Login
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mb-8">
          <span className={darkMode ? 'text-white/60' : 'text-gray-600'}>
            Don't have an account?{' '}
          </span>
          <button
            onClick={() => navigateTo('signup')}
            className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Continue as Guest */}
        <div className="flex justify-center">
          <button
            onClick={handleContinueAsGuest}
            className={`${darkMode ? 'text-white/60 hover:text-white/80 border-white/20 hover:border-white/30' : 'text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400'} border px-8 py-3 rounded-xl transition-all w-full`}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
