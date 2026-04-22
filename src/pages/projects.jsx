import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const SecuritySprintMarketplace = () => {
  const sprintPackages = [
    {
      tier: "TIER_01",
      name: "API Security Sprint",
      price: "$1,200",
      focus: ["Endpoint Scans", "Data Exposure", "Rate Limiting Checks"],
      timeline: "5 Days",
      color: "#39ff14"
    },
    {
      tier: "TIER_02",
      name: "Auth Protocol Audit",
      price: "$2,500",
      focus: ["OAuth/JWT Validation", "Session Hijacking Prev.", "MFA Enforcement"],
      timeline: "10 Days",
      color: "#00f5ff",
      featured: true
    },
    {
      tier: "TIER_03",
      name: "Full Startup MVP Scan",
      price: "$4,800",
      focus: ["Comprehensive Code Review", "Cloud Arch Audit", "Penetration Testing"],
      timeline: "21 Days",
      color: "#d1b3ff"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Secure Onboarding & NDA",
      desc: "Sign automated, binding NDAs instantly. Protect your MVP before code access.",
      icon: "gavel"
    },
    {
      step: "02",
      title: "Verified Operative Matching",
      desc: "Connect precisely with vetted experts specialized in your tech stack.",
      icon: "verified_user"
    },
    {
      step: "03",
      title: "Standardized Vulnerability Reporting",
      desc: "Obtain clean, actionable terminal-style feedback. No filler.",
      icon: "bug_report"
    },
    {
      step: "04",
      title: "Guided Remediation & Fixes",
      desc: "Direct support from operatives to patch vulnerabilities and close holes.",
      icon: "build_circle"
    }
  ];

  return (
    <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black">
      <Navbar />

      <main className="pt-32 pb-24 px-[5%] lg:px-[10%] relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBIMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48cGF0aCBkPSJNMzkuNSAwVjQwaC41VjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] pointer-events-none opacity-50 z-0"></div>

        <div className="relative z-10 flex flex-col xl:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header Node */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-space uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00f5ff] mb-4 drop-shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                SECURITY_SPRINT_<br/>MARKETPLACE_V1.0
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed font-mono">
                Economic, structured, and trusted security assessments designed for MVP launch constraints.
              </p>
              
              {/* Trust Banner UI */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 bg-black/40 border border-[#39ff14]/20 p-4 rounded-xl w-max backdrop-blur-xl shadow-[0_0_30px_rgba(57,255,20,0.05)]">
                 <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#39ff14] text-[18px]">lock</span>
                    <span className="font-mono text-[10px] text-[#39ff14] tracking-widest uppercase">Integrated NDA Protection</span>
                 </div>
                 <div className="w-px h-6 bg-white/10 hidden md:block"></div>
                 <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00f5ff] text-[18px]">verified</span>
                    <span className="font-mono text-[10px] text-[#00f5ff] tracking-widest uppercase">Verified Expert Onboarding</span>
                 </div>
              </div>
            </div>

            {/* Tiered Sprint Grid */}
            <div className="mb-20">
               <h2 className="font-mono text-[12px] text-white/50 tracking-[0.3em] uppercase mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-[#00f5ff]/50"></span>
                  AVAILABLE_SPRINT_PACKAGES
               </h2>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {sprintPackages.map((sprint, idx) => (
                   <div key={idx} className={`relative flex flex-col bg-black/40 backdrop-blur-xl border ${sprint.featured ? 'border-[#00f5ff]/40 shadow-[0_0_20px_rgba(0,245,255,0.1)]' : 'border-white/5'} rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-500 overflow-hidden group hover:border-[#00f5ff]/50`}>
                      {sprint.featured && (
                         <div className="absolute top-4 right-4 bg-[#00f5ff] text-black font-space font-bold text-[9px] px-2 py-1 rounded uppercase tracking-widest">
                            RECOMMENDED_NODE
                         </div>
                      )}
                      
                      <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{color: sprint.color}}>
                        // {sprint.tier}
                      </div>
                      <h3 className="font-space font-bold text-2xl text-white uppercase mb-2">
                        {sprint.name}
                      </h3>
                      <div className="font-mono text-3xl font-bold text-white mb-8 border-b border-white/5 pb-6">
                        {sprint.price}
                      </div>
                      
                      <div className="flex-1">
                         <h4 className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">Core Focus_</h4>
                         <ul className="space-y-3 mb-8">
                            {sprint.focus.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 font-mono text-[11px] text-white/70">
                                 <span className="material-symbols-outlined text-[14px]" style={{color: sprint.color}}>arrow_right</span>
                                 {f}
                              </li>
                            ))}
                         </ul>
                      </div>
                      
                      <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 mb-6 bg-white/5 w-max px-3 py-1.5 rounded border border-white/5">
                         <span className="material-symbols-outlined text-[14px]">schedule</span> TIMELINE: {sprint.timeline}
                      </div>

                      <a href="/auth" className="w-full py-4 rounded-xl border border-white/10 font-mono text-[11px] font-bold tracking-[0.2em] text-white hover:bg-[#00f5ff] hover:text-black hover:border-[#00f5ff] transition-all duration-300 uppercase flex justify-between items-center px-6 relative overflow-hidden group/btn group-hover:border-[#00f5ff]/50">
                          <span className="relative z-10"> SELECT_PACKAGE</span>
                          <span className="material-symbols-outlined text-[16px] relative z-10 group-hover/btn:translate-x-1 transition-transform">chevron_right</span>
                      </a>
                   </div>
                 ))}
               </div>
            </div>

            {/* Workflow Protocol Section */}
            <div>
               <h2 className="font-mono text-[12px] text-white/50 tracking-[0.3em] uppercase mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-[#d1b3ff]/50"></span>
                  WORKFLOW_PROTOCOL
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {workflowSteps.map((step, idx) => (
                   <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-[#d1b3ff]/30 transition-colors">
                     {/* Number shadow */}
                     <div className="absolute -right-4 -bottom-6 font-space font-black text-8xl text-white/[0.02] pointer-events-none group-hover:text-white/[0.04] transition-all">
                       {step.step}
                     </div>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-[#d1b3ff]/50 transition-colors">
                           <span className="material-symbols-outlined text-[#d1b3ff] text-[20px]">{step.icon}</span>
                        </div>
                        <h4 className="font-space font-bold uppercase text-white tracking-widest">{step.title}</h4>
                     </div>
                     <p className="font-mono text-[10px] text-white/60 leading-relaxed max-w-[90%]">
                       {step.desc}
                     </p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="w-full xl:w-80 shrink-0 relative z-10">
             <div className="sticky top-32 bg-[#05080c]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl hover:border-[#39ff14]/30 transition-colors">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                   <h3 className="font-mono text-[11px] font-bold text-white tracking-widest uppercase">SYSTEM FEED</h3>
                   <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.8)]"></span>
                </div>
                
                <div className="space-y-6">
                   <div>
                       <div className="font-mono text-[9px] text-white/40 tracking-[0.2em] mb-1">ACTIVE_SPRINTS</div>
                       <div className="font-space font-black text-3xl text-[#00f5ff]">34</div>
                   </div>
                   <div>
                       <div className="font-mono text-[9px] text-white/40 tracking-[0.2em] mb-1">VERIFIED_EXPERTS_ONLINE</div>
                       <div className="flex items-end gap-2">
                           <div className="font-space font-black text-3xl text-[#39ff14]">12</div>
                           <div className="font-mono text-[9px] text-[#39ff14] mb-1 tracking-widest">[+3 THIS WEEK]</div>
                       </div>
                   </div>
                   <div>
                       <div className="font-mono text-[9px] text-white/40 tracking-[0.2em] mb-1">AVG_RISK_REDUCTION_SCORE</div>
                       <div className="font-space font-black text-3xl text-[#d1b3ff]">94.2%</div>
                   </div>
                   
                   <div className="pt-6 border-t border-white/10">
                       <div className="font-mono text-[9px] text-white/50 tracking-widest leading-loose">
                           $ systemctl status onsafe_core<br/>
                            Status: <span className="text-[#39ff14]">ONLINE</span><br/>
                            Node Routing: <span className="text-[#00f5ff]">OPTIMISED</span><br/>
                            Secure Tunnels: <span className="text-[#d1b3ff]">ACTIVE</span><br/>
                       </div>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecuritySprintMarketplace;
