import { Coins, ArrowLeftRight } from 'lucide-react';

interface PillToggleProps {
  value: 'credits' | 'trade';
  onChange: (value: 'credits' | 'trade') => void;
}

export default function PillToggle({ value, onChange }: PillToggleProps) {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 border border-white/60 rounded-full p-1 shadow-sm">
      <div className="relative flex items-center">
        {/* Animated thumb */}
        <div
          className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-md transition-all duration-300 ${
            value === 'credits' ? 'left-1' : 'left-[calc(50%+3px)]'
          }`}
          style={{
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
          }}
        />
        
        {/* Credits option */}
        <button
          onClick={() => onChange('credits')}
          className="relative z-10 flex-1 flex items-center justify-center gap-2 px-4 py-2.5 transition-all"
        >
          <Coins className={`w-4 h-4 transition-colors ${
            value === 'credits' ? 'text-white' : 'text-[#555]'
          }`} />
          <span className={`text-sm font-medium transition-all ${
            value === 'credits' ? 'text-white font-semibold' : 'text-[#555] opacity-60'
          }`}>
            Credits
          </span>
        </button>

        {/* Trade option */}
        <button
          onClick={() => onChange('trade')}
          className="relative z-10 flex-1 flex items-center justify-center gap-2 px-4 py-2.5 transition-all"
        >
          <ArrowLeftRight className={`w-4 h-4 transition-colors ${
            value === 'trade' ? 'text-white' : 'text-[#555]'
          }`} />
          <span className={`text-sm font-medium transition-all ${
            value === 'trade' ? 'text-white font-semibold' : 'text-[#555] opacity-60'
          }`}>
            Trade
          </span>
        </button>
      </div>
    </div>
  );
}