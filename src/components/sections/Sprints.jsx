import React from "react";

const Sprints = () => {
  return (
    <section
      id="sprints"
      className="py-24 bg-[#0b111a] relative border-t border-white/5"
    >
      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black font-space uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <span className="text-[#d1b3ff]">SECURITY_MARKETPLACE_V1.0</span>
          </h1>
        </div>
        {/* <h2 className="text-[#00f5ff] font-mono text-sm tracking-[0.3em] uppercase mb-4">Security Sprint Packages</h2>
        <h3 className="text-4xl md:text-5xl font-black text-white font-space uppercase">The Sprint Marketplace</h3>
        <p className="text-white/60 mt-4 max-w-2xl font-inter">Transparent, tiered pricing for high-impact security audits. Get exactly what your MVP needs before launch.</p> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Package 1 */}
          <div className="p-8 rounded-2xl bg-black/40 border border-[#00f5ff]/20 hover:border-[#00f5ff] transition-all group relative">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[#00f5ff]">
                api
              </span>
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">
              API Security Sprint
            </h4>
            <div className="text-3xl font-black text-[#00f5ff] mb-6">
              ₹1,200
              <span className="text-sm text-white/40 font-normal">
                {" "}
                / fixed
              </span>
            </div>
            <ul className="space-y-3 mb-8 text-white/70 font-mono text-xs">
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Endpoint Vulnerability
                Scan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Data Exposure Check
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Rate Limiting Audit
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-[#00f5ff]/40 text-[#00f5ff] font-mono uppercase tracking-widest text-xs hover:bg-[#00f5ff]/10 transition-colors">
              Select Package
            </button>
          </div>

          {/* Package 2 */}
          <div className="p-8 rounded-2xl bg-[#d1b3ff]/5 border border-[#d1b3ff]/40 hover:border-[#d1b3ff] transition-all group relative shadow-[0_0_30px_rgba(209,179,255,0.1)]">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[#d1b3ff]">
                key
              </span>
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">
              Auth Protocol Audit
            </h4>
            <div className="text-3xl font-black text-[#d1b3ff] mb-6">
              ₹2,500
              <span className="text-sm text-white/40 font-normal">
                {" "}
                / fixed
              </span>
            </div>
            <ul className="space-y-3 mb-8 text-white/70 font-mono text-xs">
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> OAuth / JWT Validation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Session Hijack
                Prevention
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> MFA Enforcement Check
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-[#d1b3ff] text-black font-mono font-black uppercase tracking-widest text-xs hover:bg-[#e1ccff] shadow-[0_0_20px_rgba(209,179,255,0.2)] transition-colors">
              Select Package
            </button>
          </div>

          {/* Package 3 */}
          <div className="p-8 rounded-2xl bg-black/40 border border-[#39ff14]/20 hover:border-[#39ff14] transition-all group relative">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[#39ff14]">
                shield
              </span>
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">
              Full Startup MVP Scan
            </h4>
            <div className="text-3xl font-black text-[#39ff14] mb-6">
              ₹4,800
              <span className="text-sm text-white/40 font-normal">
                {" "}
                / fixed
              </span>
            </div>
            <ul className="space-y-3 mb-8 text-white/70 font-mono text-xs">
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Comprehensive Code
                Review
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Cloud Architecture
                Audit
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#39ff14]">✓</span> Penetration Testing
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-[#39ff14]/40 text-[#39ff14] font-mono uppercase tracking-widest text-xs hover:bg-[#39ff14]/10 transition-colors">
              Select Package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Sprints;
