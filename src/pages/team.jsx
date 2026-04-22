import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const ExpertDirectory = () => {
    const filters = ["ALL", "API_SECURITY", "AUTH_AUDITS", "CLOUD_CONFIG", "PEN_TESTING"];
    const [activeFilter, setActiveFilter] = useState("ALL");

    const operatives = [
      {
        id: "OP_001",
        name: "Ekansh Shrotriya",
        role: "Security Architect & Lead Researcher",
        specialties: ["#THREAT_MODELING", "#ZERO_KNOWLEDGE"],
        sprints: 42,
        verified: true,
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=Ekansh&backgroundColor=0b111a",
      },
      {
        id: "OP_002",
        name: "Sahil Dhillon",
        role: "Penetration Testing Lead",
        specialties: ["#PEN_TESTING", "#RED_TEAM"],
        sprints: 38,
        verified: true,
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=Sahil&backgroundColor=0b111a",
      },
      {
        id: "OP_003",
        name: "Lakshay Sharma",
        role: "Vulnerability Assessment Specialist",
        specialties: ["#VULN_SCAN", "#API_SECURITY"],
        sprints: 29,
        verified: true,
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=Lakshay&backgroundColor=0b111a",
      },
      {
        id: "OP_004",
        name: "Priyanshu Shrivastava",
        role: "Security Protocol Engineer",
        specialties: ["#AUTH_AUDITS", "#API_SECURITY"],
        sprints: 34,
        verified: true,
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=Priyanshu&backgroundColor=0b111a",
      },
      {
        id: "OP_005",
        name: "Utkarsh Jain",
        role: "Compliance & Risk Strategist",
        specialties: ["#CLOUD_CONFIG", "#COMPLIANCE"],
        sprints: 27,
        verified: true,
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=Utkarsh&backgroundColor=0b111a",
      }
    ];

    return (
        <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter overflow-hidden selection:bg-[#00f5ff] selection:text-black">
            <Navbar />
            
            <main className="pt-32 pb-24 px-[5%] lg:px-[10%] relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f5ff]/5 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Status Feed */}
                <div className="flex items-center gap-4 bg-black/50 border border-white/5 py-2 px-6 rounded-lg mb-12 w-max mx-auto shadow-[0_0_20px_rgba(0,245,255,0.05)]">
                    <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse"></span>
                    <span className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">EXPERTS_ONLINE: <span className="text-[#00f5ff]">12</span></span>
                    <span className="text-white/20 mx-2">|</span>
                    <span className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">VERIFIED_NODES: <span className="text-[#39ff14]">ACTIVE</span></span>
                </div>

                {/* Header Section */}
                <div className="text-center mb-16 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black font-space uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        OPERATIVE<span className="text-[#d1b3ff]">_DIRECTORY_V1.0</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Access a vetted network of independent cybersecurity practitioners specialized in securing early-stage MVPs.
                    </p>
                </div>

                {/* Filter & Search HUD */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16 relative z-10">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                        {filters.map(filter => (
                            <button 
                                key={filter} 
                                onClick={() => setActiveFilter(filter)}
                                className={`font-mono text-[10px] px-4 py-2 rounded uppercase tracking-widest transition-all border ${activeFilter === filter ? 'border-[#00f5ff] text-[#00f5ff] bg-[#00f5ff]/10' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/80'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                     <div className="relative w-full lg:w-72">
                         <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-[18px]">search</span>
                         <input 
                            type="text" 
                            placeholder="SEARCH_NODE..." 
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 font-mono text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d1b3ff] transition-colors"
                         />
                     </div>
                </div>

                {/* Expert Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {operatives.map(op => (
                        <div key={op.id} className="group bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#00f5ff]/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all duration-500 relative overflow-hidden">
                            {/* Verification Badge */}
                            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#39ff14]/10 border border-[#39ff14]/20 px-2.5 py-1 rounded">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse"></span>
                                <span className="font-mono text-[9px] text-[#39ff14] tracking-widest hidden sm:inline">VERIFIED_OPERATIVE</span>
                                <span className="font-mono text-[9px] text-[#39ff14] tracking-widest sm:hidden">VERIFIED</span>
                            </div>

                            {/* Identity Node */}
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden relative group-hover:border-[#00f5ff]/30 transition-colors bg-[#05080c] p-1">
                                    <div className="absolute inset-0 scanline opacity-20 group-hover:opacity-50 pointer-events-none"></div>
                                    <img src={op.image} alt={op.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
                                </div>
                                <div>
                                    <h3 className="font-space font-bold text-lg text-white uppercase">{op.name}</h3>
                                    <p className="font-mono text-[10px] text-[#00f5ff] tracking-widest">{op.role}</p>
                                </div>
                            </div>

                            {/* Specialty Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {op.specialties.map(spec => (
                                    <span key={spec} className="font-mono text-[9px] bg-white/5 px-2 py-1 rounded text-white/50 tracking-widest border border-white/5">{spec}</span>
                                ))}
                            </div>

                            {/* Trust Metrics */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                     <span className="material-symbols-outlined text-[14px] text-[#d1b3ff]">gavel</span>
                                     <span className="font-mono text-[10px] text-white/60 tracking-wider">NDA_BOUND</span>
                                </div>
                                <div className="flex items-center gap-2">
                                     <span className="material-symbols-outlined text-[14px] text-[#00f5ff]">speed</span>
                                     <span className="font-mono text-[10px] text-white/60 tracking-wider">SPRINTS: {op.sprints}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <a href="/dashboard" className="flex-1 text-center bg-transparent border border-[#00f5ff]/40 text-[#00f5ff] font-mono text-[10px] font-bold tracking-[0.2em] py-3 rounded-lg hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] transition-all uppercase whitespace-nowrap">
                                    ACTIVE REPORTS
                                </a>
                                <button className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] font-bold tracking-[0.2em] py-3 rounded-lg hover:bg-[#d1b3ff] hover:text-black hover:border-[#d1b3ff] transition-all uppercase whitespace-nowrap">
                                    CONSULT
                                </button>
                            </div>
                            
                            {/* Hover Decorative Element */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* Pagination / Load More fake */}
                <div className="mt-16 text-center z-10 relative">
                     <button className="font-mono text-[10px] text-white/40 hover:text-[#00f5ff] transition-colors tracking-[0.3em] uppercase">
                         [ LOAD_MORE_NODES ]
                     </button>
                </div>
            </main>
            <Footer />
            
            <style>{`
               .scanline {
                  background: linear-gradient(to bottom, transparent 50%, rgba(0, 245, 255, 0.3) 51%, transparent 100%);
                  background-size: 100% 4px;
                  animation: scan 5s linear infinite;
               }
               @keyframes scan {
                  0% { background-position: 0 -100px; }
                  100% { background-position: 0 100%; }
               }
            `}</style>
        </div>
    );
};

export default ExpertDirectory;
