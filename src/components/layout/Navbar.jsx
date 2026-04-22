import React from 'react';
import Button from '../ui/Button';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-4 right-4 z-[100] pointer-events-auto transition-all duration-300">
      <div className="bg-black/60 backdrop-blur-3xl border border-white/5 px-6 py-2.5 rounded-2xl flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-l-4 border-l-tertiary">
        {/* Left Side: Status Indicators */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_12px_rgba(57,255,20,0.8)] animate-pulse"></div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-tertiary font-black">ONSAFE_CORE_V1.0</span>
          </div>

          <div className="h-4 w-px bg-white/10 mx-2 hidden lg:block"></div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
            <span className="text-white/40">UPLINK:</span>
            <span className="text-white/70">ACTIVE</span>
            <span className="text-white/20 mx-1">//</span>
            <span className="text-white/40">REGION:</span>
            <span className="text-white/70">NO-SEC-01</span>
          </div>
        </div>
        
        {/* Right Side: Navigation & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-6 border-r border-white/10 pr-6">
            <a href="/" className="nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group">
                <span className="material-symbols-outlined text-[18px] text-white/80 group-hover:scale-110 transition-transform">home</span> 
                <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline text-white/60 group-hover:text-white">HOME</span>
            </a>
            <a href="/experts" className="nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group">
                <span className="material-symbols-outlined text-[18px] text-blue-400 group-hover:scale-110 transition-transform">group</span> 
                <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline text-white/60 group-hover:text-white">EXPERTS</span>
            </a>
            <a href="/sprints" className="nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group">
                <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">bolt</span> 
                <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline text-white/60 group-hover:text-white">MARKETPLACE</span>
            </a>
            <a href="#legal" className="nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group">
                <span className="material-symbols-outlined text-[18px] text-tertiary group-hover:scale-110 transition-transform">gavel</span> 
                <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline text-white/60 group-hover:text-white">LEGAL HUB</span>
            </a>
            <a href="/dashboard" className="nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group">
                <span className="material-symbols-outlined text-[18px] text-fuchsia-400 group-hover:scale-110 transition-transform">dashboard</span> 
                <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline text-white/60 group-hover:text-white">REPORTS</span>
            </a>
          </div>
          
          <a href="/auth" className="bg-[#b388ff] text-black font-mono font-black px-6 py-1.5 rounded-full tracking-tighter text-[11px] hover:bg-[#c29cff] transition-all active:scale-95 shadow-[0_0_20px_rgba(179,136,255,0.4)] border-none uppercase inline-flex items-center justify-center">
            SYSTEM_LOGIN
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

