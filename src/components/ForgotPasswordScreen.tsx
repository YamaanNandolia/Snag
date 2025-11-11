import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import BoxLogo from './BoxLogo';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function ForgotPasswordScreen({ navigateTo }: any) {
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Enter a valid email.');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Enter a valid email.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handleSendResetLink = () => {
    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      // In production, this would send the reset link
      setShowConfirmation(true);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigateTo('login');
  };

  if (showConfirmation) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 flex items-center justify-center`}>
        <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-purple-200/50'} backdrop-blur-xl rounded-3xl p-8 border max-w-md w-full`}>
          <div className="flex flex-col items-center text-center">
            <div className={`${darkMode ? 'bg-purple-600' : 'bg-purple-600'} rounded-full p-4 mb-6`}>
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Check Your Email
            </h2>
            <p className={`mb-8 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
              We've sent you a reset link to {email}
            </p>
            <button
              onClick={handleCloseConfirmation}
              className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 pt-12 pb-12`}>
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigateTo('login')}
          className={`mb-8 flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white/80' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <BoxLogo size={80} />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Forgot Password?
          </h1>
          <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-8">
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

        {/* Send Reset Link Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSendResetLink}
            className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
}
