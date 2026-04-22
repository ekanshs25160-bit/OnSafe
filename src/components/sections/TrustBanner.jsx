import React from 'react';

const TrustBanner = () => {
    const subsetOperatives = [
        {
          id: "001",
          name: "EKANSH S.",
          role: "SECURITY ARCHITECT",
          specialty: "#THREAT_MODELING",
          image: "https://api.dicebear.com/7.x/bottts/svg?seed=Ekansh&backgroundColor=0b111a",
        },
        {
          id: "002",
          name: "SAHIL D.",
          role: "PEN_TEST LEAD",
          specialty: "#RED_TEAM",
          image: "https://api.dicebear.com/7.x/bottts/svg?seed=Sahil&backgroundColor=0b111a",
        },
        {
          id: "003",
          name: "LAKSHAY S.",
          role: "VULN ASSESSOR",
          specialty: "#API_SECURITY",
          image: "https://api.dicebear.com/7.x/bottts/svg?seed=Lakshay&backgroundColor=0b111a",
        }
      ];

  return (
    <div className="bg-[#05080c] border-y border-white/5 py-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39ff14]/5 to-transparent blur-3xl pointer-events-none"></div>
      <div className="px-[5%] lg:px-[10%] flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="shrink-0 flex items-center gap-4">
            <span className="material-symbols-outlined text-[32px] text-[#39ff14]">verified_user</span>
            <div>
                <h4 className="font-space font-bold text-white text-sm uppercase">Backed by Verified Experts</h4>
                <p className="font-mono text-[#39ff14] text-[10px] tracking-widest uppercase">NDA-Bound • Vetted Node Network</p>
            </div>
        </div>

        <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-4 min-w-max pb-2 md:pb-0">
                {subsetOperatives.map((op) => (
                    <div key={op.id} className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-lg p-3 hover:border-[#39ff14]/50 transition-colors w-64 group cursor-pointer" onClick={() => window.location.href='/experts'}>
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#39ff14] rounded-full z-10 border border-black group-hover:animate-ping"></span>
                            <img src={op.image} alt={op.name} className="w-10 h-10 rounded bg-white/5 border border-white/10 object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"/>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <h5 className="font-space font-bold text-white text-xs">{op.name}</h5>
                                <span className="material-symbols-outlined text-[10px] text-[#39ff14]">verified</span>
                            </div>
                            <div className="font-mono text-[8px] text-white/50 tracking-widest">{op.role}</div>
                            <div className="font-mono text-[8px] text-[#00f5ff] tracking-widest mt-0.5">{op.specialty}</div>
                        </div>
                    </div>
                ))}
                
                <a href="/experts" className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#d1b3ff] hover:text-white px-4 tracking-widest uppercase transition-colors shrink-0 whitespace-nowrap group">
                    VIEW_ALL_NODES <span className="material-symbols-outlined text-[12px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
