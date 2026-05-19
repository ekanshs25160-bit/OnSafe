import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('onsafe-theme');
    return saved === 'light';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('onsafe-theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handlePop = () => setMenuOpen(false);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navLinks = [
    { href: '/', icon: 'home', label: 'HOME', color: 'text-white/80' },
    { href: '/experts', icon: 'group', label: 'EXPERTS', color: 'text-blue-400' },
    { href: '/sprints', icon: 'bolt', label: 'MARKETPLACE', color: 'text-[#00f5ff]' },
    { href: '/legal', icon: 'gavel', label: 'LEGAL HUB', color: 'text-[#39ff14]' },
    { href: '/dashboard', icon: 'dashboard', label: 'REPORTS', color: 'text-fuchsia-400' },
  ];

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-[100] pointer-events-auto transition-all duration-300">
        <div className="bg-black/60 backdrop-blur-3xl border border-white/5 px-4 sm:px-6 py-2.5 rounded-2xl flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-l-4 border-l-[#39ff14]">
          {/* Left Side: Status Indicators */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.8)] animate-pulse"></div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#39ff14] font-black">ONSAFE_CORE_V1.0</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-6 border-r border-white/10 pr-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group">
                  <span className={`material-symbols-outlined text-[18px] ${link.color} group-hover:scale-110 transition-transform`}>{link.icon}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white">{link.label}</span>
                </a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsLight(prev => !prev)}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 mr-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px] leading-none transition-transform duration-300" style={{ transform: isLight ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isLight ? 'dark_mode' : 'light_mode'}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest">
                {isLight ? 'DARK' : 'LIGHT'}
              </span>
            </button>

            <a href="/auth" className="bg-[#b388ff] text-black font-mono font-black px-6 py-1.5 rounded-full tracking-tighter text-[11px] hover:bg-[#c29cff] transition-all active:scale-95 shadow-[0_0_20px_rgba(179,136,255,0.4)] border-none uppercase inline-flex items-center justify-center">
              SYSTEM_LOGIN
            </a>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsLight(prev => !prev)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isLight ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-[#0b111a]/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-20 left-4 right-4 bg-black/80 border border-white/10 rounded-2xl p-6 transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-all group"
              >
                <span className={`material-symbols-outlined text-[22px] ${link.color} group-hover:scale-110 transition-transform`}>{link.icon}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 group-hover:text-white font-bold">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href="/auth"
              onClick={() => setMenuOpen(false)}
              className="w-full bg-[#b388ff] text-black font-mono font-black px-6 py-3 rounded-xl tracking-[0.1em] text-[11px] hover:bg-[#c29cff] transition-all active:scale-95 shadow-[0_0_20px_rgba(179,136,255,0.4)] uppercase flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              SYSTEM_LOGIN
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
