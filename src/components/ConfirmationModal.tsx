import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  message: string;
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  icon,
  title,
  message,
  autoDismiss = true,
  dismissDelay = 2500
}: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen && autoDismiss) {
      const timer = setTimeout(() => {
        onClose();
      }, dismissDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDismiss, dismissDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="backdrop-blur-2xl bg-white/90 rounded-3xl p-8 border border-white/60 shadow-[0_24px_48px_rgba(139,92,246,0.3)] max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
          {icon || <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />}
        </div>

        {/* Title */}
        <h3 className="text-[#222] font-semibold text-xl mb-2">{title}</h3>

        {/* Message */}
        <p className="text-[#555]">{message}</p>
      </div>
    </div>
  );
}
