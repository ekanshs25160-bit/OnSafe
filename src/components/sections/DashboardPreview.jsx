import React from 'react';

const DashboardPreview = () => {
    return (
        <section id="dashboard" className="py-24 bg-[#0b111a] relative border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-16">
                
                <div className="lg:w-1/2 space-y-6 z-10 relative">
                    <h2 className="text-[#39ff14] font-mono text-sm tracking-[0.3em] uppercase mb-4">Platform UI</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white font-space uppercase">Vulnerability Reporting Dashboard</h3>
                    <p className="text-white/60 mt-4 font-inter text-lg">
                        Ditch chaotic PDF reports. Experience a guided remediation workflow where you interact directly with your security expert to resolve findings.
                    </p>
                    <ul className="space-y-4 pt-4 mt-4 font-mono text-sm text-white/50">
                        <li className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]"></div>
                           Interactive Issue Tracking
                        </li>
                        <li className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#d1b3ff]"></div>
                           Direct Chat with Expert Nodes
                        </li>
                        <li className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14]"></div>
                           Guided Remediation Steps
                        </li>
                    </ul>
                </div>

                <div className="lg:w-1/2 w-full relative z-10">
                    {/* Fake Dashboard Mockup */}
                    <div className="bg-[#05080c] border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10">
                        {/* Windows controls */}
                        <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>

                        {/* Top bar fake */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="font-mono text-xs text-white/40">PROJECT: <span className="text-white">XYZ_FINANCE</span></div>
                            <div className="bg-[#39ff14]/10 text-[#39ff14] font-mono text-[10px] px-2 py-1 rounded">2 CRITICAL</div>
                        </div>

                        {/* Issue 1 */}
                        <div className="bg-[#111] border border-red-500/30 rounded-xl p-4 mb-4 hover:border-red-500/80 transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1 rounded-r-xl h-full bg-red-500/50"></div>
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-white/90">SQL Injection in /api/v1/auth</div>
                                <span className="text-red-500 bg-red-500/10 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest">HIGH</span>
                            </div>
                            <p className="text-white/40 text-xs font-mono mb-4">Input validation missing in login controller.</p>
                            <div className="flex justify-between items-center text-[10px] font-mono text-white/30">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat</span> 3 comments</span>
                                <span className="text-[#00f5ff]">View Remediation &rarr;</span>
                            </div>
                        </div>

                        {/* Issue 2 */}
                        <div className="bg-[#111] border border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500/80 transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1 rounded-r-xl h-full bg-yellow-500/50"></div>
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-white/90">Outdated JWT Library</div>
                                <span className="text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest">MED</span>
                            </div>
                            <p className="text-white/40 text-xs font-mono mb-4">Dependency jsonwebtoken is v8.5.1.</p>
                            <div className="flex justify-between items-center text-[10px] font-mono text-white/30">
                                <span className="flex items-center gap-1 text-[#39ff14]"><span className="material-symbols-outlined text-[14px]">done_all</span> Resolved</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#00f5ff]/10 via-[#d1b3ff]/10 to-transparent blur-[80px] rounded-full pointer-events-none -z-10"></div>
                </div>

            </div>
        </section>
    )
}

export default DashboardPreview;
