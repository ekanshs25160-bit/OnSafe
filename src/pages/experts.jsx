import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ConsultationModal from "../components/ui/ConsultationModal";
import ExpertReportModal from "../components/ui/ExpertReportModal";
import { experts } from "../data/experts";

const ExpertDirectory = () => {
    const filters = ["ALL", "API_SECURITY", "AUTH_AUDITS", "CLOUD_CONFIG", "PEN_TESTING"];
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [operatives, setOperatives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("INITIALIZING_CONNECTION...");
    const [selectedOperative, setSelectedOperative] = useState(null);
    const [selectedReportExpert, setSelectedReportExpert] = useState(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                setStatus("REQUESTING_TRUST_DATA...");
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 600));
                setStatus("HANDSHAKE_COMPLETE. DATA_RECOVERED.");
                setOperatives(experts);
            } catch (error) {
                console.error('Error fetching experts:', error);
                setStatus("ERROR: CONNECTION_FAILED.");
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };

        fetchExperts();
    }, []);

    return (
        <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter overflow-hidden selection:bg-[#00f5ff] selection:text-black">
            <Navbar />
            
            <main className="pt-32 pb-24 px-[5%] lg:px-[10%] relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f5ff]/5 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Status Feed */}
                {/* <div className="flex items-center gap-4 bg-black/50 border border-white/5 py-2 px-6 rounded-lg mb-12 w-max mx-auto shadow-[0_0_20px_rgba(0,245,255,0.05)]">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${status.includes('ERROR') ? 'bg-red-500' : 'bg-[#39ff14]'}`}></span>
                    <span className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">SYSTEM_STATUS: <span className={status.includes('ERROR') ? 'text-red-500' : 'text-[#00f5ff]'}>{status}</span></span>
                    {!loading && (
                        <>
                            <span className="text-white/20 mx-2">|</span>
                            <span className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">EXPERTS_ONLINE: <span className="text-[#00f5ff]">{operatives.length}</span></span>
                        </>
                    )}
                </div> */}

                <div className="text-center mb-16 relative z-10">
                    {/* <p className="font-mono text-[10px] text-[#00f5ff] tracking-[0.4em] uppercase mb-3">// EXPERT DIRECTORY</p> */}
                    <h1 className="text-5xl md:text-7xl font-black font-space uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <span className="text-[#d1b3ff]">Verified Security Experts</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Finding a trustworthy security professional shouldn't feel like a gamble. Every expert on OnSafe is identity-verified, certified, and bound by integrated NDAs — so you can collaborate with complete confidence before your public launch.
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
                     <div className="flex items-center w-full lg:w-72 bg-black/40 border border-white/10 rounded-lg px-3 focus-within:border-[#d1b3ff] transition-colors">
                         <span className="material-symbols-outlined text-white/30 text-[18px] shrink-0">search</span>
                         <input
                             type="text"
                             placeholder="SEARCH_NODE..."
                             className="flex-1 bg-transparent py-2.5 pl-2 pr-2 font-mono text-xs text-white placeholder-white/30 focus:outline-none"
                         />
                     </div>
                </div>

                {/* Expert Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 min-h-[400px]">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 pt-12 pb-8 animate-pulse">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-xl bg-white/5"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                        <div className="h-3 bg-white/5 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="h-20 bg-white/5 rounded-xl mb-6"></div>
                                <div className="h-10 bg-white/5 rounded-lg"></div>
                            </div>
                        ))
                    ) : (
                        operatives
                            .filter(op => activeFilter === "ALL" || op.specialties.some(s => s.replace('#', '') === activeFilter))
                            .map(op => (
                                <div key={op.id} className="group bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 pt-12 pb-8 hover:border-[#00f5ff]/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all duration-500 relative overflow-hidden">
                                    {/* Verification Badge */}
                                    <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#39ff14]/10 border border-[#39ff14]/20 px-2.5 py-1 rounded">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse"></span>
                                        <span className="font-mono text-[9px] text-[#39ff14] tracking-widest hidden sm:inline">VERIFIED_EXPERT</span>
                                        <span className="font-mono text-[9px] text-[#39ff14] tracking-widest sm:hidden">VERIFIED</span>
                                    </div>

                                    {/* Identity Node */}
                                    <div className="flex items-center gap-5 mb-6">
                                        <div className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden relative group-hover:border-[#00f5ff]/30 transition-colors bg-[#05080c] p-1">
                                            <div className="absolute inset-0 scanline opacity-20 group-hover:opacity-50 pointer-events-none"></div>
                                            <img src={op.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${op.name}&backgroundColor=0b111a`} alt={op.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
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
                                             <span className="font-mono text-[10px] text-white/60 tracking-wider">SPRINTS: {op.sprints_completed || op.sprints}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setSelectedReportExpert(op)}
                                            className="flex-1 text-center bg-transparent border border-[#00f5ff]/40 text-[#00f5ff] font-mono text-[10px] font-bold tracking-[0.2em] py-3 rounded-lg hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] transition-all uppercase whitespace-nowrap"
                                        >
                                            ACTIVE REPORTS
                                        </button>
                                        <button
                                            onClick={() => setSelectedOperative(op)}
                                            className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-[10px] font-bold tracking-[0.2em] py-3 rounded-lg hover:bg-[#d1b3ff] hover:text-black hover:border-[#d1b3ff] transition-all uppercase whitespace-nowrap"
                                        >
                                            CONSULT
                                        </button>
                                    </div>
                                    
                                    {/* Hover Decorative Element */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                            ))
                    )}
                </div>

                {/* Pagination / Load More fake */}
                <div className="mt-16 text-center z-10 relative">
                     <button className="font-mono text-[10px] text-white/40 hover:text-[#00f5ff] transition-colors tracking-[0.3em] uppercase">
                         [ LOAD_MORE_NODES ]
                     </button>
                </div>
            </main>
            <Footer />

            {selectedOperative && (
                <ConsultationModal
                    operative={selectedOperative}
                    onClose={() => setSelectedOperative(null)}
                />
            )}

            {selectedReportExpert && (
                <ExpertReportModal
                    expert={selectedReportExpert}
                    onClose={() => setSelectedReportExpert(null)}
                />
            )}
            
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
