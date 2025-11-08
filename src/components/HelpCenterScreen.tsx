import { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface HelpCenterScreenProps {
  navigateTo: (screen: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenterScreen({ navigateTo }: HelpCenterScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'How do I create my first listing?',
      answer: 'Tap the purple + button at the bottom of your screen, fill in the item details including photos, price, and description, then tap "Publish Listing". Your item will be visible to all students on your campus immediately.'
    },
    {
      category: 'Getting Started',
      question: 'What are Snag Credits and how do they work?',
      answer: 'Snag Credits are our campus currency. You earn credits by selling items, and can spend them on purchases. 1 credit equals approximately $1. Credits help maintain fairness and trust within the community.'
    },
    {
      category: 'Barter Mode',
      question: 'How does Barter Mode work?',
      answer: 'Toggle Barter Mode on when creating a listing to trade items instead of using credits. Other students can offer their items in exchange, and you can accept, counter, or decline offers.'
    },
    {
      category: 'Barter Mode',
      question: 'Can I use both credits and barter?',
      answer: 'Each listing can be either credit-based or barter-based, but not both. However, you can have multiple listings using different payment methods.'
    },
    {
      category: 'Safety',
      question: 'Where should I meet buyers/sellers?',
      answer: 'Always meet in public, well-lit campus locations. We recommend designated meeting spots like the Student Union entrance, Library lobby, or Campus Center. Never meet in private locations.'
    },
    {
      category: 'Safety',
      question: 'What are Trust Badges?',
      answer: 'Trust Badges are earned through verified transactions, student verification, and positive community interactions. They help identify reliable sellers and buyers. Verified students have confirmed their .edu email address.'
    },
    {
      category: 'Account',
      question: 'How do I verify my student status?',
      answer: 'Go to Settings > Edit Profile and verify your university email address. You\'ll receive a verification link to confirm your student status and earn your first Trust Badge.'
    },
    {
      category: 'Account',
      question: 'Can I block or report users?',
      answer: 'Yes! Go to any user\'s profile, tap the three dots, and select "Block User" or "Report User". You can manage blocked users in Settings > Privacy & Safety > Blocked Users.'
    },
    {
      category: 'Transactions',
      question: 'What happens after I confirm a purchase?',
      answer: 'After confirming, you\'ll schedule a meeting time and location with the seller. Credits are held in escrow and released after you confirm receiving the item in good condition.'
    },
    {
      category: 'Transactions',
      question: 'Can I cancel a transaction?',
      answer: 'You can cancel before meeting. Go to Notifications, find the meeting confirmation, and tap "Cancel Meeting". Credits will be returned immediately. Frequent cancellations may affect your Trust Score.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

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
            <h2 className="text-[#9333ea] font-semibold text-xl">Help Center</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full backdrop-blur-xl bg-white/10 border border-white/30 rounded-full pl-12 pr-4 py-3 text-[#222] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Categories */}
        {categories.map(category => {
          const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
          if (categoryFAQs.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-[#555] font-medium text-sm px-2 mb-3">{category}</h3>
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
                {categoryFAQs.map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isExpanded = expandedIndex === globalIndex;
                  
                  return (
                    <div key={globalIndex}>
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : globalIndex)}
                        className="w-full px-4 py-4 flex items-start gap-3 text-left hover:bg-white/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#222] font-medium">{faq.question}</h3>
                          {isExpanded && (
                            <p className="text-[#666] text-sm mt-2 leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-[#999]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#999]" />
                          )}
                        </div>
                      </button>
                      {index !== categoryFAQs.length - 1 && (
                        <div className="border-b border-purple-100/40" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Still Need Help */}
        <div className="backdrop-blur-xl bg-purple-50/50 border border-purple-200/50 rounded-3xl p-4 text-center">
          <h3 className="text-purple-900 font-medium mb-2">Still need help?</h3>
          <p className="text-purple-700 text-sm mb-4">
            Can't find what you're looking for? Send us your feedback and we'll get back to you.
          </p>
          <button
            onClick={() => navigateTo('send-feedback')}
            className="w-full py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
