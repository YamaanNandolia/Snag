interface BoxLogoProps {
  className?: string;
  size?: number;
}

export default function BoxLogo({ className = '', size = 24 }: BoxLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Box/Package Icon */}
      <path 
        d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 3L16 5.5V8.5L12 11L8 8.5V5.5L12 3Z" 
        fill="currentColor" 
        fillOpacity="0.2"
      />
    </svg>
  );
}
