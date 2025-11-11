import { useDarkMode } from '../contexts/DarkModeContext';

interface BoxLogoProps {
  className?: string;
  size?: number;
}

export default function BoxLogo({ className = '', size = 24 }: BoxLogoProps) {
  const { darkMode } = useDarkMode();
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="snag-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Box/Package Icon */}
        <path 
          d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" 
          stroke="url(#snag-gradient)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M12 3L16 5.5V8.5L12 11L8 8.5V5.5L12 3Z" 
          fill="url(#snag-gradient)" 
          fillOpacity="0.3"
        />
      </svg>
      
      {/* "Snag" Text */}
      <div 
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent`}
        style={{ fontSize: size * 0.4 }}
      >
        snag
      </div>
    </div>
  );
}
