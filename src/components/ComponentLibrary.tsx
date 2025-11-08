import { Home, Search, Bell, BookOpen, Armchair, ShoppingBag, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function ComponentLibrary({ navigateTo }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-purple-600">Component Library</h1>
          <p className="text-purple-600 mt-1">Liquid Glass Design System</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        {/* Colors */}
        <section>
          <h2 className="text-purple-900 mb-4">Colors</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg" />
                <div>
                  <p className="text-purple-900">Primary Purple</p>
                  <p className="text-purple-600">Purple 500-600</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-lavender-100 border border-purple-200/60" />
                <div>
                  <p className="text-purple-900">Lavender Gradient</p>
                  <p className="text-purple-600">Backgrounds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl backdrop-blur-2xl bg-white/70 border border-white/60 shadow-sm" />
                <div>
                  <p className="text-purple-900">Liquid Glass</p>
                  <p className="text-purple-600">Cards & Panels</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-purple-900 mb-4">Buttons</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-3">
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]">
              Primary Button
            </button>
            <button className="w-full py-4 rounded-2xl backdrop-blur-xl bg-white/80 text-purple-700 border border-purple-200/60 shadow-sm transition-transform active:scale-[0.98]">
              Secondary Button
            </button>
            <button className="p-3 rounded-full backdrop-blur-xl bg-white/80 border border-purple-200/60 shadow-sm hover:bg-white/90 transition-colors">
              <Home className="w-6 h-6 text-purple-600" />
            </button>
            <button className="relative -mt-2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(139,92,246,0.4)] flex items-center justify-center transition-transform active:scale-95 mx-auto">
              <span className="text-white text-2xl">+</span>
            </button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-purple-900 mb-4">Inputs</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search items or descriptions"
                className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-purple-300 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              />
            </div>
            <Input
              placeholder="Regular input"
              className="backdrop-blur-xl bg-white/80 border-purple-200/60 rounded-xl"
            />
          </div>
        </section>

        {/* Toggles & Switches */}
        <section>
          <h2 className="text-purple-900 mb-4">Toggles & Switches</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-purple-100/60 to-lavender-100/60 rounded-3xl px-4 py-3 border border-white/60 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white">🔄</span>
                </div>
                <span className="text-purple-900">Barter Mode</span>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-purple-900 mb-4">Cards</h2>
          <div className="space-y-3">
            <div className="backdrop-blur-2xl bg-white/70 rounded-3xl border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-lavender-100 flex items-center justify-center relative">
                <span className="text-purple-400">Image Placeholder</span>
                <div className="absolute top-3 right-3">
                  <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1.5 border border-white/60 shadow-md flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500" />
                    <span className="text-purple-900">15 Cr</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-purple-900 mb-1">Item Title</h3>
                <p className="text-purple-600 mb-3">Short description goes here</p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-xs">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-purple-800">Seller Name</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tags & Badges */}
        <section>
          <h2 className="text-purple-900 mb-4">Tags & Badges</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="space-y-4">
              <div>
                <p className="text-purple-600 mb-2">Category Tags</p>
                <div className="flex flex-wrap gap-2">
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700">Textbook</span>
                  </div>
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <Armchair className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700">Furniture</span>
                  </div>
                  <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-700">Apparel</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-purple-600 mb-2">Status Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                    🔄 Barter
                  </Badge>
                  <Badge className="backdrop-blur-xl bg-purple-100/60 text-purple-700 border border-purple-200/60">
                    🎓 .edu Verified
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-purple-600 mb-2">Credit Chips</p>
                <div className="flex flex-wrap gap-2">
                  <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1.5 border border-white/60 shadow-md flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500" />
                    <span className="text-purple-900">42</span>
                  </div>
                  <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1.5 border border-white/60 shadow-md flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500" />
                    <span className="text-purple-900">15 Cr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section>
          <h2 className="text-purple-900 mb-4">Navigation</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <p className="text-purple-600 mb-4">Bottom Navigation Bar</p>
            <div className="backdrop-blur-2xl bg-white/60 rounded-2xl border border-white/40 shadow-lg p-4">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center gap-1 text-purple-600">
                  <Home className="w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  <span className="text-[10px]">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <Bell className="w-6 h-6" />
                  <span className="text-[10px]">Events</span>
                </div>
                <div className="relative -mt-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(139,92,246,0.4)] flex items-center justify-center">
                  <span className="text-white text-2xl">+</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                  <MapPin className="w-6 h-6" />
                  <span className="text-[10px]">Profile</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-purple-900 mb-4">Typography</h2>
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-3">
            <div>
              <h1 className="text-purple-900">Display / H1</h1>
              <p className="text-purple-600">24px / 28px line-height</p>
            </div>
            <div>
              <h2 className="text-purple-900">Heading 2</h2>
              <p className="text-purple-600">20px / 24px line-height</p>
            </div>
            <div>
              <h3 className="text-purple-900">Heading 3</h3>
              <p className="text-purple-600">16px / 20px line-height</p>
            </div>
            <div>
              <p className="text-purple-900">Body Text</p>
              <p className="text-purple-600">14px / 18px line-height</p>
            </div>
            <div>
              <p className="text-purple-600">Caption Text</p>
              <p className="text-purple-500">12px / 16px line-height</p>
            </div>
          </div>
        </section>

        {/* Glass Effects */}
        <section>
          <h2 className="text-purple-900 mb-4">Liquid Glass Effects</h2>
          <div className="space-y-3">
            <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
              <p className="text-purple-900 mb-1">Standard Glass Panel</p>
              <p className="text-purple-600">70% white opacity, 2xl blur</p>
            </div>
            <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-6 border border-white/60 shadow-sm">
              <p className="text-purple-900 mb-1">Solid Glass Panel</p>
              <p className="text-purple-600">80% white opacity, xl blur</p>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-100/60 to-lavender-100/60 rounded-3xl p-6 border border-purple-200/60 shadow-sm">
              <p className="text-purple-900 mb-1">Gradient Glass Panel</p>
              <p className="text-purple-600">Purple to lavender gradient</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
