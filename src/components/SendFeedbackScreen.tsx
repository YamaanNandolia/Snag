import { useState } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SendFeedbackScreenProps {
  navigateTo: (screen: string) => void;
}

export default function SendFeedbackScreen({ navigateTo }: SendFeedbackScreenProps) {
  const [feedbackType, setFeedbackType] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', emoji: '💬' },
    { id: 'bug', label: 'Report a Bug', emoji: '🐛' },
    { id: 'feature', label: 'Feature Request', emoji: '✨' },
    { id: 'safety', label: 'Safety Concern', emoji: '🛡️' }
  ];

  const handleSubmit = () => {
    if (!subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Feedback sent successfully! We\'ll get back to you soon.');
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
            <h2 className="text-[#9333ea] font-semibold text-xl flex-1">Send Feedback</h2>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="backdrop-blur-xl bg-purple-50/50 border border-purple-200/50 rounded-3xl p-4">
          <div className="flex gap-3">
            <MessageSquare className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-purple-900 font-medium mb-1">We'd love to hear from you!</h3>
              <p className="text-purple-700 text-sm">
                Your feedback helps us make Snag better for everyone in the campus community.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Type */}
        <div>
          <label className="text-[#666] text-sm block mb-3 px-2">Feedback Type</label>
          <div className="grid grid-cols-2 gap-3">
            {feedbackTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFeedbackType(type.id)}
                className={`backdrop-blur-xl rounded-2xl border p-4 transition-all ${
                  feedbackType === type.id
                    ? 'bg-purple-100/50 border-purple-300 shadow-[0_4px_16px_rgba(139,92,246,0.2)]'
                    : 'bg-white/10 border-white/30 hover:bg-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{type.emoji}</div>
                <div className="text-[#222] text-sm font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4">
          <label className="text-[#666] text-sm block mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of your feedback"
            className="w-full bg-white/50 border border-purple-100/50 rounded-xl px-4 py-2 text-[#222] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Message */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4">
          <label className="text-[#666] text-sm block mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more about your feedback..."
            rows={8}
            className="w-full bg-white/50 border border-purple-100/50 rounded-xl px-4 py-3 text-[#222] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <p className="text-[#999] text-xs mt-2">{message.length}/1000 characters</p>
        </div>

        {/* Contact Info */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4">
          <label className="text-[#666] text-sm block mb-2">Your Email (Optional)</label>
          <input
            type="email"
            placeholder="your.email@university.edu"
            className="w-full bg-white/50 border border-purple-100/50 rounded-xl px-4 py-2 text-[#222] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-[#999] text-xs mt-2">We'll use this to follow up if needed</p>
        </div>
      </div>
    </div>
  );
}
