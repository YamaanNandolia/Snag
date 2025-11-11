import { useState } from 'react';
import { 
  Home, Search, Bell, BookOpen, Armchair, ShoppingBag, MapPin, 
  Plus, Users, ArrowLeft, Calendar, Package, ArrowLeftRight,
  CheckCircle, Shield, Eye, X, Upload, Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function ComponentLibrary({ navigateTo }: any) {
  const { darkMode } = useDarkMode();
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');

  // Use activeMode to show components in either light or dark, regardless of actual darkMode setting
  const isDark = activeMode === 'dark';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} pb-24`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-xl`}>UI Panel</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-[#888]'} text-sm mt-1`}>Complete Design System</p>
            </div>
            {/* Mode Toggle */}
            <div className={`flex gap-2 p-1 rounded-full ${darkMode ? 'bg-white/10' : 'bg-white/60'}`}>
              <button
                onClick={() => setActiveMode('light')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeMode === 'light'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#888] hover:text-[#222]'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setActiveMode('dark')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeMode === 'dark'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-[#888] hover:text-[#222]'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        
        {/* 1. Input Fields */}
        <Section title="Input Fields" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Standard Input</p>
                <Input
                  placeholder="Enter text..."
                  className={`backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl`}
                />
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Title Input</p>
                <Input
                  placeholder="Item title..."
                  className={`backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl`}
                />
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Description Field</p>
                <Textarea
                  placeholder="Describe your item..."
                  className={`min-h-24 backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl resize-none`}
                />
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Time Input (HH:MM AM/PM)</p>
                <Input
                  placeholder="e.g., 2:30 PM"
                  className={`backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl`}
                />
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Date Input (MM/DD/YYYY)</p>
                <Input
                  placeholder="e.g., 12/25/2024"
                  className={`backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-purple-200/60 text-[#222] placeholder:text-[#888]'} rounded-2xl`}
                />
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Search Bar (No Errors)</p>
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-[#888]'}`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-white/60 text-[#222] placeholder:text-[#888]'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50`}
                  />
                </div>
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Error State - Red Border</p>
                <Input
                  placeholder="Enter text..."
                  className={`backdrop-blur-xl ${isDark ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-white/80 text-[#222] placeholder:text-[#888]'} rounded-2xl border-2 border-red-500`}
                />
                <p className="text-red-500 text-sm mt-1">Please enter a valid title.</p>
              </div>

              <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-2`}>Error State - Description</p>
                <Textarea
                  placeholder="Describe your item..."
                  className={`min-h-24 backdrop-blur-xl ${isDark ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-white/80 text-[#222] placeholder:text-[#888]'} rounded-2xl resize-none border-2 border-red-500`}
                />
                <p className="text-red-500 text-sm mt-1">Add at least 50 words.</p>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 2. Buttons */}
        <Section title="Buttons (Center-Aligned)" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-3">
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center">
                Primary Button
              </button>
              <button className={`w-full py-4 rounded-2xl backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-purple-200/60 text-purple-700'} border shadow-sm transition-transform active:scale-[0.98] mx-auto flex items-center justify-center`}>
                Secondary Button
              </button>
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center gap-2">
                <Package className="w-5 h-5" />
                Snag Now
              </button>
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center gap-2">
                <ArrowLeftRight className="w-5 h-5" />
                Offer to Trade
              </button>
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" strokeWidth={2.5} />
                Create Circle
              </button>
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center">
                Post in This Circle
              </button>
              <button className={`w-full py-3 rounded-2xl backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-purple-200/60 text-purple-700'} border shadow-sm transition-transform active:scale-[0.98] mx-auto flex items-center justify-center`}>
                View Full Listing
              </button>
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center">
                Got It
              </button>
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] mx-auto flex items-center justify-center">
                Continue
              </button>
              <button className={`px-6 py-2 rounded-full ${isDark ? 'text-white hover:bg-white/10' : 'text-[#9333ea] hover:bg-white/50'} transition-colors mx-auto flex items-center justify-center`}>
                Back
              </button>
              <div className="flex items-center justify-center gap-2">
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transition-transform active:scale-95">
                  Following
                </button>
                <button className={`px-6 py-2 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-purple-200/60 text-purple-700'} border transition-transform active:scale-95`}>
                  Join Circle
                </button>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 3. Cards */}
        <Section title="Cards" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Listing Card</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden`}>
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-lavender-100 flex items-center justify-center relative">
                  <span className="text-purple-400 text-sm">Image</span>
                  <div className="absolute top-3 right-3">
                    <div className={`backdrop-blur-xl ${isDark ? 'bg-white/20 border-white/30' : 'bg-white/90 border-white/60'} rounded-full px-3 py-1.5 border shadow-md flex items-center gap-1.5`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500" />
                      <span className={`text-xs ${isDark ? 'text-white' : 'text-[#222]'}`}>15 Cr</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <button className={`${isDark ? 'text-white hover:text-purple-400' : 'text-[#222] hover:text-purple-600'} text-sm transition-colors`}>
                      @username
                    </button>
                    <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <h3 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-sm mb-1`}>Vintage Desk Chair</h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className={`px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-300' : 'bg-purple-100/60 text-purple-700'} text-xs`}>
                      Furniture
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-300' : 'bg-purple-100/60 text-purple-700'} text-xs`}>
                      Dorm
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-gray-400' : 'text-[#999]'}`} />
                    <span className={`${isDark ? 'text-gray-400' : 'text-[#999]'} text-xs`}>12:00 PM – 2:00 PM</span>
                  </div>
                </div>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Circle Card</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden`}>
                <div className="flex items-center gap-3 p-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-100 to-lavender-100">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-purple-400 text-xs">Cover</span>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-sm mb-1`}>Move-Out Sale 2025</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-[#555]'} text-xs mb-2 line-clamp-1`}>Graduating seniors selling everything!</p>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-purple-500" />
                      <span className={`${isDark ? 'text-gray-400' : 'text-[#999]'} text-xs`}>128 active posts</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs">
                    Following
                  </div>
                </div>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Empty State Card</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] p-8`}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-3 flex items-center justify-center">
                    <Package className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>No posts yet</p>
                </div>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 4. Navigation */}
        <Section title="Navigation Components" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mb-3`}>Bottom Navigation Bar</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/40'} rounded-2xl border shadow-lg p-4`}>
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-1 text-purple-500">
                    <Home className="w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                    <span className="text-[10px]">Home</span>
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Users className="w-6 h-6" />
                    <span className="text-[10px]">Circles</span>
                  </div>
                  <div className="relative -mt-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(139,92,246,0.4)] flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Users className="w-6 h-6" />
                    <span className="text-[10px]">Profile</span>
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MapPin className="w-6 h-6" />
                    <span className="text-[10px]">Settings</span>
                  </div>
                </div>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Active vs Inactive States</p>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1 text-purple-500">
                  <Home className="w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  <span className="text-[10px]">Active</span>
                </div>
                <div className={`flex flex-col items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Home className="w-6 h-6" />
                  <span className="text-[10px]">Inactive</span>
                </div>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 5. Tag System */}
        <Section title="Tag System Components" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Default Tags</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-purple-100/60 border-purple-200/60 text-purple-700'} border text-sm`}>
                  Textbook
                </span>
                <span className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-purple-100/60 border-purple-200/60 text-purple-700'} border text-sm`}>
                  Furniture
                </span>
                <span className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-purple-100/60 border-purple-200/60 text-purple-700'} border text-sm`}>
                  Apparel
                </span>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Active/Selected Tags</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm shadow-lg">
                  Textbook
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm shadow-lg">
                  Furniture
                </span>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Custom Tag</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-purple-500/20 border-purple-400/40 text-purple-300' : 'bg-purple-200/60 border-purple-300/60 text-purple-700'} border text-sm`}>
                  Custom Tag
                </span>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Add New Tag Button</p>
              <button className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-purple-200/60 text-purple-700'} border text-sm hover:border-purple-500 transition-colors flex items-center gap-1.5`}>
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            </div>
          </ComponentCard>
        </Section>

        {/* 6. Circle System */}
        <Section title="Circle System Components" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Circle Header</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden`}>
                <div className="h-32 bg-gradient-to-br from-purple-100 to-lavender-100 flex items-center justify-center">
                  <span className="text-purple-400">Cover Image</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-1`}>Circle Name</h2>
                      <p className={`${isDark ? 'text-gray-400' : 'text-[#555]'} text-sm`}>Circle description goes here</p>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm shadow-lg">
                      Following
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className={`${isDark ? 'text-gray-400' : 'text-[#999]'} text-sm`}>128 active posts</span>
                  </div>
                </div>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Join/Following Toggle</p>
              <div className="flex gap-2">
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transition-transform active:scale-95">
                  Following
                </button>
                <button className={`px-6 py-2 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-purple-200/60 text-purple-700'} border transition-transform active:scale-95`}>
                  Join Circle
                </button>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 7. Notification System */}
        <Section title="Notification System" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Notification Bell with Badge</p>
              <div className="relative inline-block">
                <Bell className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#222]'}`} />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Notification Row</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] p-4`}>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-sm mb-1`}>New listing posted</p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-[#555]'} text-xs mb-1`}>Check out this new item in your feed</p>
                    <span className={`${isDark ? 'text-gray-500' : 'text-[#999]'} text-xs`}>2 hours ago</span>
                  </div>
                </div>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Event Types</p>
              <div className="space-y-2 text-sm">
                <p className={`${isDark ? 'text-gray-300' : 'text-[#555]'}`}>• New listing posted</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-[#555]'}`}>• Offer on your trade</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-[#555]'}`}>• Offer accepted / counter-offer</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-[#555]'}`}>• Meeting confirmed</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-[#555]'}`}>• Meeting reminder</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-[#555]'}`}>• New Circle post (if following)</p>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 8. Profile View */}
        <Section title="Profile View Components" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Profile Header</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white">
                    RM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold`}>Ryan Mehta</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-[#555]'} text-sm`}>@ryanmehta</p>
                </div>
                <CheckCircle className="w-5 h-5 text-purple-500" />
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Bio Block</p>
              <div className={`${isDark ? 'text-gray-300' : 'text-[#555]'} text-sm`}>
                Computer Science major | Love vintage fashion and tech gadgets
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Trust Score Bar</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-sm`}>Trust Score</span>
                  <span className="text-purple-500 font-semibold">92%</span>
                </div>
                <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 9. Modals */}
        <Section title="Modal Components" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Confirmation Modal</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-black/90 border-white/20' : 'bg-white/95 border-white/60'} rounded-3xl border shadow-[0_16px_48px_rgba(0,0,0,0.3)] p-6 text-center`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-2`}>Success!</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#555]'} text-sm mb-4`}>Your action was completed successfully</p>
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]">
                  Got It
                </button>
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Error Modal</p>
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-black/90 border-white/20' : 'bg-white/95 border-white/60'} rounded-3xl border shadow-[0_16px_48px_rgba(0,0,0,0.3)] p-6 text-center`}>
                <div className="w-16 h-16 rounded-full bg-red-500 mx-auto mb-4 flex items-center justify-center">
                  <X className="w-8 h-8 text-white" />
                </div>
                <h3 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-2`}>Error</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#555]'} text-sm mb-4`}>Please check your inputs and try again</p>
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]">
                  OK
                </button>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 10. Universal Elements */}
        <Section title="Universal Elements" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Section Header</p>
              <h2 className={`${isDark ? 'text-white' : 'text-[#222]'} font-semibold text-lg`}>Section Title</h2>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Divider</p>
              <div className={`border-t ${isDark ? 'border-white/20' : 'border-purple-100/40'}`} />

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Default Avatar</p>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white">
                  AB
                </AvatarFallback>
              </Avatar>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Back Arrow</p>
              <button className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}>
                <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#222]'}`} />
              </button>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Close Icon</p>
              <button className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}>
                <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#222]'}`} />
              </button>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Placeholder Image</p>
              <div className="w-full h-40 bg-gradient-to-br from-purple-100 to-lavender-100 rounded-2xl flex items-center justify-center">
                <span className="text-purple-400">Image Placeholder</span>
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 11. Toggles & Switches */}
        <Section title="Toggles & Switches" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>Trade Toggle</p>
              <div className={`flex items-center justify-between backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-gradient-to-r from-purple-100/60 to-lavender-100/60 border-white/60'} rounded-3xl px-4 py-3 border shadow-sm`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <ArrowLeftRight className="w-4 h-4 text-white" />
                  </div>
                  <span className={`${isDark ? 'text-white' : 'text-[#222]'}`}>Trade Mode</span>
                </div>
                <Switch />
              </div>

              <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm mt-4`}>Dark Mode Toggle</p>
              <div className={`flex items-center justify-between backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-purple-200/60'} rounded-3xl px-4 py-3 border shadow-sm`}>
                <span className={`${isDark ? 'text-white' : 'text-[#222]'}`}>Dark Mode</span>
                <Switch />
              </div>
            </div>
          </ComponentCard>
        </Section>

        {/* 12. Glass Effects Reference */}
        <Section title="Liquid Glass Effects Reference" darkMode={darkMode}>
          <ComponentCard isDark={isDark}>
            <div className="space-y-3">
              <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-4 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
                <p className={`${isDark ? 'text-white' : 'text-[#222]'} mb-1`}>Standard Glass Panel</p>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>
                  {isDark ? 'bg-white/10, border-white/20' : 'bg-white/70, border-white/60'}
                </p>
              </div>
              <div className={`backdrop-blur-xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-white/60'} rounded-3xl p-4 border shadow-sm`}>
                <p className={`${isDark ? 'text-white' : 'text-[#222]'} mb-1`}>Solid Glass Panel</p>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>
                  {isDark ? 'bg-white/10, border-white/20' : 'bg-white/80, border-white/60'}
                </p>
              </div>
              <div className={`backdrop-blur-xl ${isDark ? 'bg-purple-500/20 border-purple-400/40' : 'bg-gradient-to-r from-purple-100/60 to-lavender-100/60 border-purple-200/60'} rounded-3xl p-4 border shadow-sm`}>
                <p className={`${isDark ? 'text-white' : 'text-[#222]'} mb-1`}>Gradient Glass Panel</p>
                <p className={`${isDark ? 'text-gray-400' : 'text-[#888]'} text-sm`}>
                  {isDark ? 'bg-purple-500/20' : 'from-purple-100/60 to-lavender-100/60'}
                </p>
              </div>
            </div>
          </ComponentCard>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children, darkMode }: { title: string; children: React.ReactNode; darkMode: boolean }) {
  return (
    <section>
      <h2 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-lg mb-4`}>{title}</h2>
      {children}
    </section>
  );
}

function ComponentCard({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
      {children}
    </div>
  );
}
