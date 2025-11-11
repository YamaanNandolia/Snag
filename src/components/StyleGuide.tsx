import { Home, Search, Bell, BookOpen, Armchair, Shirt, Package, MapPin, ArrowLeftRight, Beaker, Laptop, UtensilsCrossed, Coins } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import BoxLogo from './BoxLogo';

export default function StyleGuide({ navigateTo }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-[#9333ea] font-semibold">Design System</h1>
          <p className="text-[#555] mt-1">Snag Liquid Glass UI</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        {/* Snag Logo */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Logo</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <BoxLogo className="text-white" size={32} />
                </div>
                <div>
                  <p className="text-[#222] font-semibold">Box Logo</p>
                  <p className="text-[#555] text-sm">Primary app icon</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center">
                  <BoxLogo className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-[#222] font-semibold">Glass Variant</p>
                  <p className="text-[#555] text-sm">For light backgrounds</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center">
                  <BoxLogo className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-white font-semibold">On Purple</p>
                  <p className="text-white/80 text-sm">Splash & headers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Typography — Manrope</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-5">
            <div>
              <h1 className="text-[#9333ea] font-semibold">Page Title / H1</h1>
              <p className="text-[#555] text-sm mt-1">Manrope Semibold 20–24px, Purple 600 (#9333ea)</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">font-semibold text-[#9333ea]</code>
            </div>
            <div>
              <h2 className="text-[#222] font-semibold">Heading 2</h2>
              <p className="text-[#555] text-sm mt-1">Manrope Semibold 18–20px</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">font-semibold text-[#222]</code>
            </div>
            <div>
              <h3 className="text-[#222] font-semibold">Heading 3</h3>
              <p className="text-[#555] text-sm mt-1">Manrope Semibold 16–18px</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">font-semibold text-[#222]</code>
            </div>
            <div>
              <p className="text-[#222] font-medium">Body Medium</p>
              <p className="text-[#555] text-sm mt-1">Manrope Medium 14–16px</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">font-medium text-[#222]</code>
            </div>
            <div>
              <p className="text-[#555]">Body Regular</p>
              <p className="text-[#555] text-sm mt-1">Manrope Regular 14–16px, for descriptions</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">text-[#555]</code>
            </div>
            <div>
              <p className="text-[#555] text-sm font-medium">Caption / Label</p>
              <p className="text-[#555] text-sm mt-1">Manrope Medium 12–14px</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">text-sm font-medium</code>
            </div>
            <div>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold">
                Button Text
              </button>
              <p className="text-[#555] text-sm mt-2">Manrope Semibold/Bold 16px, centered</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">font-semibold</code>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Colors</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-4">
              <div>
                <p className="text-[#222] font-semibold mb-3">Primary Purple</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 shadow-md" />
                    <div>
                      <p className="text-[#222] font-medium">Purple 500</p>
                      <code className="text-xs text-[#555]">#a855f7</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-600 shadow-md" />
                    <div>
                      <p className="text-[#222] font-medium">Purple 600</p>
                      <code className="text-xs text-[#555]">#9333ea</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-md" />
                    <div>
                      <p className="text-[#222] font-medium">Purple Gradient</p>
                      <code className="text-xs text-[#555]">from-purple-500 to-purple-600</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[#222] font-semibold mb-3">Lavender Accents</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/40" />
                    <div>
                      <p className="text-[#222] font-medium">Purple 50</p>
                      <code className="text-xs text-[#555]">#faf5ff</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200/40" />
                    <div>
                      <p className="text-[#222] font-medium">Purple 100</p>
                      <code className="text-xs text-[#555]">#f3e8ff</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[#222] font-semibold mb-3">Text Colors</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#222] shadow-md" />
                    <div>
                      <p className="text-[#222] font-medium">Primary Text</p>
                      <code className="text-xs text-[#555]">#222222</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#555] shadow-md" />
                    <div>
                      <p className="text-[#222] font-medium">Secondary Text</p>
                      <code className="text-xs text-[#555]">#555555</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#888] shadow-md" />
                    <div>
                      <p className="text-[#222] font-medium">Muted Text</p>
                      <code className="text-xs text-[#555]">#888888</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[#222] font-semibold mb-3">Glass Overlay Colors</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl backdrop-blur-xl bg-white/10 border border-white/30" />
                    <div>
                      <p className="text-[#222] font-medium">Glass 10%</p>
                      <code className="text-xs text-[#555]">bg-white/10 border-white/30</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl backdrop-blur-xl bg-white/20 border border-white/40" />
                    <div>
                      <p className="text-[#222] font-medium">Glass 20%</p>
                      <code className="text-xs text-[#555]">bg-white/20 border-white/40</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Buttons</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4">
            <div>
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] font-semibold">
                Primary Button (Snag Now)
              </button>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">bg-gradient-to-r from-purple-500 to-purple-600</code>
            </div>
            <div>
              <button className="w-full py-4 rounded-2xl backdrop-blur-xl bg-white/20 text-purple-700 border border-white/30 shadow-sm transition-transform active:scale-[0.98] font-semibold">
                Secondary Button (Barter/Offer)
              </button>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">backdrop-blur-xl bg-white/20</code>
            </div>
            <div>
              <button className="w-full py-4 rounded-2xl backdrop-blur-xl bg-white/10 text-[#555] border border-white/20 shadow-sm transition-transform active:scale-[0.98] font-medium">
                Ghost Button (Cancel)
              </button>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">backdrop-blur-xl bg-white/10</code>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button className="p-3 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-sm hover:bg-white/30 transition-colors">
                <Home className="w-6 h-6 text-purple-600" />
              </button>
              <button className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(139,92,246,0.4)] flex items-center justify-center transition-transform active:scale-95">
                <span className="text-white text-2xl">+</span>
              </button>
            </div>
            <p className="text-[#555] text-sm text-center">Icon buttons & FAB</p>
          </div>
        </section>

        {/* Inputs & Fields */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Inputs & Fields</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" />
              <input
                type="text"
                placeholder="Search items or descriptions"
                className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              />
            </div>
            <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded inline-block">rounded-full backdrop-blur-xl bg-white/20</code>
            
            <input
              type="text"
              placeholder="Regular text input"
              className="w-full px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            />
            <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded inline-block">rounded-2xl backdrop-blur-xl bg-white/20</code>

            <textarea
              placeholder="Description textarea"
              className="w-full px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
              rows={3}
            />
          </div>
        </section>

        {/* Tags & Badges */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Tags & Badges</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-4">
              <div>
                <p className="text-[#222] font-medium mb-2">Category Tags</p>
                <div className="flex flex-wrap gap-2">
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700 text-sm font-medium">Textbooks</span>
                  </div>
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <Armchair className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700 text-sm font-medium">Furniture</span>
                  </div>
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <Shirt className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700 text-sm font-medium">Apparel</span>
                  </div>
                </div>
                <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">bg-purple-100/60 border-purple-200/60</code>
              </div>

              <div>
                <p className="text-[#222] font-medium mb-2">Filter Chips (Active)</p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full px-3 py-1.5 shadow-lg font-medium text-sm">
                    Dorm
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full px-3 py-1.5 shadow-lg font-medium text-sm">
                    Electronics
                  </div>
                </div>
                <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">bg-gradient-to-r from-purple-500 to-purple-600</code>
              </div>

              <div>
                <p className="text-[#222] font-medium mb-2">Filter Chips (Inactive)</p>
                <div className="flex flex-wrap gap-2">
                  <div className="backdrop-blur-xl bg-white/20 text-[#555] rounded-full px-3 py-1.5 border border-white/30 font-medium text-sm">
                    Kitchen
                  </div>
                  <div className="backdrop-blur-xl bg-white/20 text-[#555] rounded-full px-3 py-1.5 border border-white/30 font-medium text-sm">
                    Seasonal
                  </div>
                </div>
                <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">backdrop-blur-xl bg-white/20</code>
              </div>

              <div>
                <p className="text-[#222] font-medium mb-2">Status Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Barter</span>
                  </Badge>
                  <Badge className="backdrop-blur-xl bg-blue-100/60 text-blue-700 border border-blue-200/60 font-medium">
                    🎓 .edu Verified
                  </Badge>
                  <Badge className="backdrop-blur-xl bg-green-100/60 text-green-700 border border-green-200/60 font-medium">
                    Active
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-[#222] font-medium mb-2">Credit Chips</p>
                <div className="flex flex-wrap gap-2">
                  <div className="backdrop-blur-xl bg-white/20 rounded-full px-3 py-1.5 border border-white/30 shadow-md flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-[#222] font-medium">42</span>
                  </div>
                  <div className="backdrop-blur-xl bg-white/20 rounded-full px-3 py-1.5 border border-white/30 shadow-md flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-[#222] font-medium">15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Cards</h2>
          <div className="space-y-4">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-lavender-100 flex items-center justify-center relative">
                <span className="text-purple-400 font-medium">Image Placeholder</span>
                <div className="absolute top-3 right-3">
                  <div className="backdrop-blur-xl bg-white/20 rounded-full px-3 py-1.5 border border-white/30 shadow-md flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-[#222] font-medium">15</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[#222] font-semibold mb-1">Marketplace Card</h3>
                <p className="text-[#555] mb-3 text-sm">Short description goes here</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-purple-700 text-xs font-medium">Furniture</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-xs font-medium">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[#555] text-sm">Seller Name</span>
                </div>
              </div>
            </div>
            <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded inline-block">backdrop-blur-xl bg-white/10 rounded-3xl</code>
          </div>
        </section>

        {/* Glass Effects & Borders */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Glass Effects</h2>
          <div className="space-y-3">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
              <p className="text-[#222] font-semibold mb-1">Ultra Glass Panel (10%)</p>
              <p className="text-[#555] text-sm mb-2">Main cards, feed items</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded">backdrop-blur-xl bg-white/10 border-white/30</code>
            </div>
            <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-6 border border-white/40 shadow-sm">
              <p className="text-[#222] font-semibold mb-1">Medium Glass Panel (20%)</p>
              <p className="text-[#555] text-sm mb-2">Inputs, secondary cards</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded">backdrop-blur-xl bg-white/20 border-white/40</code>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-100/60 to-lavender-100/60 rounded-3xl p-6 border border-purple-200/60">
              <p className="text-[#222] font-semibold mb-1">Gradient Glass Panel</p>
              <p className="text-[#555] text-sm mb-2">Special highlights, mode toggles</p>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded">from-purple-100/60 to-lavender-100/60</code>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Border Radius</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl backdrop-blur-xl bg-purple-500/20 border border-white/30" />
                <div>
                  <p className="text-[#222] font-medium">16px / rounded-2xl</p>
                  <p className="text-[#555] text-sm">Small cards, icons</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-3xl backdrop-blur-xl bg-purple-500/20 border border-white/30" />
                <div>
                  <p className="text-[#222] font-medium">24px / rounded-3xl</p>
                  <p className="text-[#555] text-sm">Main cards, modals</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full backdrop-blur-xl bg-purple-500/20 border border-white/30" />
                <div>
                  <p className="text-[#222] font-medium">Full / rounded-full</p>
                  <p className="text-[#555] text-sm">Pills, chips, FAB, avatars</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blur Levels */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Blur Levels</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-3 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-300 to-lavender-200 rounded-3xl -z-10" />
              <div className="backdrop-blur bg-white/20 rounded-2xl p-3 border border-white/30">
                <p className="text-[#222] font-medium">backdrop-blur (4px)</p>
              </div>
              <div className="backdrop-blur-md bg-white/20 rounded-2xl p-3 border border-white/30">
                <p className="text-[#222] font-medium">backdrop-blur-md (12px)</p>
              </div>
              <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-3 border border-white/30">
                <p className="text-[#222] font-medium">backdrop-blur-xl (16–20px) — Primary</p>
              </div>
              <div className="backdrop-blur-2xl bg-white/20 rounded-2xl p-3 border border-white/30">
                <p className="text-[#222] font-medium">backdrop-blur-2xl (24px)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Navigation</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <p className="text-[#222] font-medium mb-4">Bottom Navigation Bar</p>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/30 shadow-lg p-4">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center gap-1 text-purple-600">
                  <Home className="w-6 h-6" strokeWidth={2.5} />
                  <span className="text-[10px] font-medium">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <Bell className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Events</span>
                </div>
                <div className="relative -mt-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(139,92,246,0.4)] flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">+</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <MapPin className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Profile</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <Package className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Settings</span>
                </div>
              </div>
            </div>
            <p className="text-[#555] text-sm mt-3">Active state: Purple 600 (#9333ea), strokeWidth 2.5</p>
          </div>
        </section>

        {/* Icons */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Icons</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <BoxLogo className="text-white" size={24} />
                </div>
                <span className="text-[#555] text-xs text-center">Box Logo</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center">
                  <ArrowLeftRight className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Barter</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Home</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Notifications</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-purple-100/60 border border-purple-200/60 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Textbooks</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-purple-100/60 border border-purple-200/60 flex items-center justify-center">
                  <Armchair className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Furniture</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-purple-100/60 border border-purple-200/60 flex items-center justify-center">
                  <Shirt className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Apparel</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-purple-100/60 border border-purple-200/60 flex items-center justify-center">
                  <Beaker className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Lab/Tech</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-purple-100/60 border border-purple-200/60 flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Electronics</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-purple-100/60 border border-purple-200/60 flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-[#555] text-xs text-center">Kitchen</span>
              </div>
            </div>
            <p className="text-[#555] text-sm mt-4">Lucide React icons, 20-24px standard size</p>
          </div>
        </section>

        {/* Interaction States */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Interaction States</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-3">
            <div>
              <p className="text-[#222] font-medium mb-2">Focus State</p>
              <input
                type="text"
                placeholder="Focus ring example"
                className="w-full px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              />
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block">focus:ring-2 focus:ring-purple-400/50</code>
            </div>
            <div>
              <p className="text-[#222] font-medium mb-2">Active State</p>
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transition-transform active:scale-[0.98] font-semibold">
                Press Me
              </button>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block ml-3">active:scale-[0.98]</code>
            </div>
            <div>
              <p className="text-[#222] font-medium mb-2">Hover State</p>
              <button className="px-6 py-3 rounded-2xl backdrop-blur-xl bg-white/20 text-purple-700 border border-white/30 transition-all hover:bg-white/30 font-medium">
                Hover Me
              </button>
              <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-2 inline-block ml-3">hover:bg-white/30</code>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="text-[#9333ea] mb-4 font-semibold">Shadows</h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-4">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/30 shadow-sm">
                <p className="text-[#222] font-medium">Subtle Shadow</p>
                <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-1 inline-block">shadow-sm</code>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/30 shadow-md">
                <p className="text-[#222] font-medium">Medium Shadow</p>
                <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-1 inline-block">shadow-md</code>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
                <p className="text-[#222] font-medium">Purple Tinted Shadow</p>
                <code className="text-xs text-purple-700 bg-purple-100/60 px-2 py-1 rounded mt-1 inline-block">shadow-[0_8px_24px_rgba(139,92,246,0.12)]</code>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 shadow-[0_8px_24px_rgba(139,92,246,0.4)]">
                <p className="text-white font-medium">Purple Glow Shadow</p>
                <code className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded mt-1 inline-block">shadow-[0_8px_24px_rgba(139,92,246,0.4)]</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
