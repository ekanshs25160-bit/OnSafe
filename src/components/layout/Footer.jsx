import React from 'react';

const Footer = () => {
    return (
      <footer className="footer bg-bg-base border-t border-white/5 py-24 px-[10%] relative overflow-hidden">
        
        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
            {/* Branding Block */}
            <div className="max-w-sm">
                <div className="logo text-white font-black text-3xl tracking-tighter cursor-pointer mb-6 font-space uppercase">
                    ONSAFE<span className="text-[#d1b3ff] font-mono text-sm tracking-widest ml-1">_CORE</span>
                </div>
                <p className="text-white/60 font-inter text-sm leading-relaxed tracking-tight group">
                    A trust-centric cybersecurity collaboration platform engineered to enable early-stage ventures to effectively secure their products prior to market deployment.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 relative z-10">
                {/* Link Column 1 */}
                <div>
                    <h5 className="text-white font-mono text-[10px] font-bold tracking-[0.3em] mb-6 uppercase opacity-50">// SOLUTIONS</h5>
                    <div className="flex flex-col gap-4 font-mono text-[11px] font-bold text-white/50 uppercase">
                        <a href="/experts" className="hover:text-primary transition-all duration-300 tracking-widest">Expert_Directory</a>
                        <a href="/sprints" className="hover:text-primary transition-all duration-300 tracking-widest">Security_Sprints</a>
                        <a href="#nda-framework" className="hover:text-primary transition-all duration-300 tracking-widest">NDA_Framework</a>
                        <a href="#pricing-tiers" className="hover:text-primary transition-all duration-300 tracking-widest">Pricing_Tiers</a>
                    </div>
                </div>
                
                {/* Link Column 2 */}
                <div>
                    <h5 className="text-white font-mono text-[10px] font-bold tracking-[0.3em] mb-6 uppercase opacity-50">// OPERATIVE_HUB</h5>
                    <div className="flex flex-col gap-4 font-mono text-[11px] font-bold text-white/50 uppercase">
                        <a href="/sprints" className="hover:text-primary transition-all duration-300 tracking-widest text-[#00f5ff]">Security_Marketplace</a>
                        <a href="#become-expert" className="hover:text-primary transition-all duration-300 tracking-widest">Become_an_Expert</a>
                        <a href="/auth" className="hover:text-primary transition-all duration-300 tracking-widest">System_Access</a>
                        <a href="/dashboard" className="hover:text-primary transition-all duration-300 tracking-widest text-[#d1b3ff]">Reports_Dashboard</a>
                        <a href="#research-annex" className="hover:text-primary transition-all duration-300 tracking-widest">Research_Annex</a>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Bottom Status Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 relative z-10">
            {/* Copyright */}
            <div className="text-white/40 font-mono text-[9px] uppercase font-bold tracking-[0.4em]">
              &copy; 2026 ONSAFE_PLATFORM // ALL_RIGHTS_RESERVED.
            </div>
            
            {/* Live Status Indicator */}
            <div className="text-[#39ff14] font-mono text-[9px] uppercase font-bold tracking-[0.4em] flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#39ff14] rounded-full animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.8)]"></span>
                TRUST_DRIVEN_COLLABORATION_PROTOCOL_ACTIVE
            </div>
            
            {/* Access Warning */}
            <div className="text-[#00f5ff] font-mono text-[9px] uppercase font-bold tracking-[0.4em]">
                AUTHORIZED_ACCESS_ONLY // ENCRYPTED_CONNECTION_SECURED
            </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;

