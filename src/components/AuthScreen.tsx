import { useState } from 'react';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import BoxLogo from './BoxLogo'; // (Snag 로고 컴포넌트)

// 1. App.tsx로부터 "로그인 성공" 함수를 받습니다.
interface AuthScreenProps {
  onLoginSuccess: (user: any) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  // 2. '로그인' 모드와 '회원가입' 모드를 토글하는 상태
  const [isLogin, setIsLogin] = useState(true);
  
  // 3. 모든 input 필드에 대한 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // 4. "Login" 또는 "Next"(회원가입) 버튼을 눌렀을 때 실행될 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // 에러 메시지 초기화

    if (isLogin) {
      // --- 로그인 모드 ---
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }
        
        // 5. 로그인 성공! App.tsx로 유저 정보를 넘겨줍니다.
        onLoginSuccess(data);
        
      } catch (err: any) {
        setError(err.message);
      }
      
    } else {
      // --- 회원가입 모드 ---
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }
        
        // 6. 회원가입 성공! App.tsx로 유저 정보를 넘겨줍니다.
        onLoginSuccess(data);
        
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  // --- UI 렌더링 ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
          <BoxLogo className="text-white" size={24} />
        </div>
        <h1 className="text-3xl text-purple-600 font-semibold">Snag</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        
        {/* '회원가입' 모드일 때만 "Full Name" 필드 표시 */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          />
        )}

        {/* 공통 필드: Email, Password */}
        <input
          type="email"
          placeholder={isLogin ? "Enter your email" : "Email address"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
        />
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={isLogin ? "Enter your password" : "Create password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* '회원가입' 모드일 때만 "Confirm Password" 필드 표시 */}
        {!isLogin && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        )}

        {/* 에러 메시지 표시 */}
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        {/* "Login" 또는 "Next" 버튼 */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLogin ? 'Login' : 'Next'}
        </button>
        
        {/* "Forgot Password?" (로그인 모드) */}
        {isLogin && (
          <div className="text-right">
            <button type="button" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </button>
          </div>
        )}
      </form>

      {/* "Continue as Guest" (로그인 모드) */}
      {isLogin && (
        <button
          onClick={() => onLoginSuccess({ id: 'guest', name: 'Guest', followedCircles: [] })}
          className="w-full max-w-sm mt-4 py-3 rounded-lg backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm text-gray-700 font-medium"
        >
          Continue as Guest
        </button>
      )}

      {/* 하단 모드 토글 링크 */}
      <div className="mt-8 text-sm text-gray-600">
        {isLogin ? (
          <span>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)} className="font-semibold text-purple-600 hover:underline">
              Sign Up
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)} className="font-semibold text-purple-600 hover:underline">
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
}