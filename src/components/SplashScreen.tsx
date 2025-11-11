import BoxLogo from './BoxLogo';

export default function SplashScreen() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
      {/* Liquid glass effect background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
      
      {/* Animated blur circles */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-10 w-56 h-56 rounded-full bg-purple-300/20 blur-3xl animate-pulse delay-700" />
      
      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="backdrop-blur-2xl bg-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/30">
          <div className="text-center">
            {/* Icon Logo */}
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-lg flex items-center justify-center">
                <BoxLogo className="text-white" size={48} />
              </div>
              <h1 className="text-white tracking-wider font-semibold">Snag</h1>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-150" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-300" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        <p className="text-white/90 text-center px-8 font-light">
          Turn Extras into Essentials.
        </p>
      </div>
    </div>
  );
}