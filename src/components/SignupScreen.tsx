import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './ui/input';
import BoxLogo from './BoxLogo';
import { useDarkMode } from '../contexts/DarkModeContext';
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupScreen({ navigateTo }: any) {
  const { darkMode } = useDarkMode();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFullName = (value: string) => {
    if (!value || value.trim().length === 0) {
      setFullNameError('Please enter your full name.');
      return false;
    }
    setFullNameError('');
    return true;
  };

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

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    if (fullNameError) {
      validateFullName(value);
    }
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
    // Re-validate confirm password if it's already filled
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError) {
      validateConfirmPassword(value);
    }
  };

    const handleNext = async () => {
        const isFullNameValid = validateFullName(fullName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

        if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) return;

        try {
            // Create account in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Firebase Auth displayName
            await updateProfile(user, { displayName: fullName });

            // Create Firestore user profile
            await setDoc(doc(db, "users", user.uid), {
                name: fullName,
                email,
                credits: 40,         // default starting credits
                trustScore: 4.5,     // optional
                trades: 0,
                createdAt: new Date(),
            });

            console.log("✅ User created and stored:", user.uid);

            // Navigate forward with user info
            navigateTo("select-interests", { uid: user.uid, fullName, email });
        } catch (error: any) {
            console.error("❌ Signup failed:", error.message);
            if (error.code === "auth/email-already-in-use") {
                setEmailError("That email is already registered.");
            } else if (error.code === "auth/weak-password") {
                setPasswordError("Password should be at least 6 characters.");
            } else {
                setEmailError("Failed to create account. Try again later.");
            }
        }
    };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} px-6 pt-16 pb-12`}>
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <BoxLogo size={80} />
        </div>

        {/* Full Name Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
            onBlur={() => fullName && validateFullName(fullName)}
            className={`${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl ${fullNameError ? 'border-red-500' : ''}`}
          />
          {fullNameError && (
            <p className="text-red-500 mt-2">{fullNameError}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Email address"
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
        <div className="mb-6">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create password"
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

        {/* Confirm Password Input */}
        <div className="mb-8">
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => confirmPassword && validateConfirmPassword(confirmPassword)}
              className={`${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-white/60 border-purple-200/50'} backdrop-blur-xl pr-12 ${confirmPasswordError ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-white/60 hover:text-white/80' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-red-500 mt-2">{confirmPasswordError}</p>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleNext}
            className={`w-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl transition-all shadow-lg`}
          >
            Next
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <span className={darkMode ? 'text-white/60' : 'text-gray-600'}>
            Already have an account?{' '}
          </span>
          <button
            onClick={() => navigateTo('login')}
            className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
