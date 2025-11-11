import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import BoxLogo from './BoxLogo';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function VerifyEmailScreen({ navigateTo, userData }: any) {
  const { darkMode } = useDarkMode();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setCode(newCode.slice(0, 6));
      setError('');
      
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    
    if (fullCode.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    // In production, this would verify the code with the backend
    // For demo purposes, accept any 6-digit code
    if (fullCode === '123456') {
      // Simulating invalid code
      setError('Invalid or expired code. Please try again.');
    } else {
      // Success - navigate to interests screen
      navigateTo('select-interests', userData);
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    
    // In production, this would resend the code
    setResendCooldown(60);
    setCode(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 pt-12 pb-12`}>
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigateTo('signup')}
          className={`mb-8 flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white/80' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <BoxLogo size={80} />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Verify Your Email
          </h1>
          <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
            Enter the 6-digit code we emailed you.
          </p>
        </div>

        {/* Code Input */}
        <div className="mb-6">
          <div className="flex gap-3 justify-center mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 text-center ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-purple-200/50 text-gray-900'} backdrop-blur-xl border rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-purple-500' : 'focus:ring-purple-600'} ${error ? 'border-red-500' : ''} transition-all`}
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* Resend Code */}
        <div className="text-center mb-8">
          {resendCooldown > 0 ? (
            <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
              Resend code in {resendCooldown}s
            </p>
          ) : (
            <button
              onClick={handleResend}
              className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
            >
              Resend code
            </button>
          )}
        </div>

        {/* Verify Button */}
        <div className="flex justify-center">
          <button
            onClick={handleVerify}
            className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
