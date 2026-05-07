import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const LegalHub = () => {
    const [ndaSigned, setNdaSigned] = useState(false);
    const [dpaLogs, setDpaLogs] = useState([]);

    // Simulate terminal logs
    useEffect(() => {
        const logs = [
            "[SYSTEM] Initializing Data Processing Agreement...",
            "[ENCRYPTION] VULN_DATA encrypted via AES-256-GCM.",
            "[STORAGE] Logs isolated in AWS_US_EAST secure enclave.",
            "[COMPLIANCE] SOC2 Type II protocols engaged.",
            "[RETENTION] Data auto-purged post-remediation (30 days).",
            "[STATUS] DPA_ACTIVE. ZERO-KNOWLEDGE ARCHITECTURE CONFIRMED."
        ];
        let current = 0;
        const interval = setInterval(() => {
            if (current < logs.length) {
                setDpaLogs(prev => [...prev, logs[current]]);
                current++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black pt-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 scanline opacity-5 pointer-events-none z-0"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#d1b3ff]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00f5ff]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <Navbar />

            <main className="container mx-auto px-6 lg:px-16 relative z-10 mb-20 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-8">
                        <div className="p-4 bg-black/40 border border-[#d1b3ff]/30 rounded-xl shadow-[0_0_20px_rgba(209,179,255,0.15)]">
                            <span className="material-symbols-outlined text-4xl text-[#d1b3ff]">gavel</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></span>
                                <span className="font-mono text-[10px] text-[#39ff14] tracking-[0.3em] uppercase">SYSTEM-LEVEL ANCHOR</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black font-space uppercase text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                Legal Safeguards Hub
                            </h1>
                            <p className="font-mono text-[11px] text-white/50 tracking-widest uppercase mt-3">
                                Built-in Protection // Zero Data Misuse
                            </p>
                            <ul className="mt-5 space-y-2">
                                <li className="flex items-start gap-2 font-mono text-[11px] text-white/60">
                                    <span className="material-symbols-outlined text-[#00f5ff] text-[14px] mt-0.5">check_circle</span>
                                    <span><span className="text-white font-bold">Integrated NDA Functionality</span> — Legally binding non-disclosure agreements execute automatically before any expert accesses your codebase or product architecture.</span>
                                </li>
                                <li className="flex items-start gap-2 font-mono text-[11px] text-white/60">
                                    <span className="material-symbols-outlined text-[#d1b3ff] text-[14px] mt-0.5">check_circle</span>
                                    <span><span className="text-white font-bold">Built-in Privacy Contracts</span> — Every engagement is governed by a platform-enforced privacy agreement designed to prevent unauthorised data sharing or commercial misuse.</span>
                                </li>
                                <li className="flex items-start gap-2 font-mono text-[11px] text-white/60">
                                    <span className="material-symbols-outlined text-[#39ff14] text-[14px] mt-0.5">check_circle</span>
                                    <span><span className="text-white font-bold">System-Level Data Safeguards</span> — These are not optional add-ons. Data protection is a core platform feature: all vulnerability data is encrypted, isolated, and auto-purged post-remediation.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Digital NDA Node */}
                        <motion.section variants={itemVariants} className="bg-black/40 backdrop-blur-xl border border-[#00f5ff]/30 p-8 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                                <span className="material-symbols-outlined text-[100px] text-[#00f5ff]">history_edu</span>
                            </div>
                            
                            <h2 className="font-space font-bold text-2xl text-white uppercase mb-2 flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#00f5ff]">fingerprint</span>
                                Digital NDA Node
                            </h2>
                            <p className="font-mono text-xs text-white/60 mb-6 max-w-2xl leading-relaxed">
                                Integrated Non-Disclosure Agreement (NDA) functionality. Legally binds all participating verified operatives before they can access your MVP architecture or source code.
                            </p>

                            <div className="bg-[#05080c] border border-white/10 rounded-xl p-6 relative overflow-hidden">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">SIGNATURE_PAD</span>
                                    {ndaSigned ? (
                                        <span className="font-mono text-[10px] font-bold text-[#39ff14] tracking-widest px-2 py-1 bg-[#39ff14]/10 rounded border border-[#39ff14]/30">
                                            [PROTOCOL_SIGNED]
                                        </span>
                                    ) : (
                                        <span className="font-mono text-[10px] font-bold text-[#ffcc00] tracking-widest px-2 py-1 bg-[#ffcc00]/10 rounded border border-[#ffcc00]/30 animate-pulse">
                                            [PENDING_SIGNATURE]
                                        </span>
                                    )}
                                </div>
                                
                                <div className="h-32 bg-white/5 border border-white/10 rounded-lg relative flex items-center justify-center overflow-hidden mb-6 group-hover:border-[#00f5ff]/40 transition-colors">
                                    {!ndaSigned && (
                                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.8)] animate-[scan-horizontal_3s_ease-in-out_infinite]"></div>
                                    )}
                                    {ndaSigned ? (
                                        <div className="font-space text-4xl text-[#00f5ff] opacity-80 select-none rotate-[-5deg]">FOUNDER_NODE_AUTH</div>
                                    ) : (
                                        <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">AWAITING_BIOMETRIC_INPUT</span>
                                    )}
                                </div>

                                <button 
                                    onClick={() => setNdaSigned(!ndaSigned)}
                                    className={`w-full py-4 rounded-lg font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
                                        ndaSigned ? 'bg-transparent border border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff]/10' : 'bg-[#00f5ff] text-black hover:bg-white shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                                    }`}
                                >
                                    {ndaSigned ? "REVOKE SIGNATURE" : "AUTHORIZE NDA"}
                                </button>
                            </div>
                        </motion.section>

                        {/* Data Handling Manifest (DPA) */}
                        <motion.section variants={itemVariants} className="bg-black/60 border border-white/10 p-8 rounded-2xl">
                            <h2 className="font-space font-bold text-xl text-white uppercase mb-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/50">terminal</span>
                                Data Handling Manifest (DPA)
                            </h2>
                            <div className="bg-[#020406] border border-white/5 rounded-xl p-6 h-64 overflow-y-auto font-mono text-[11px] text-[#39ff14] leading-relaxed shadow-inner relative">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                                {dpaLogs.map((log, idx) => (
                                    <div key={idx} className="mb-2 opacity-90">{log}</div>
                                ))}
                                <div className="animate-pulse">_</div>
                            </div>
                        </motion.section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Expert Trust Vault */}
                            <motion.section variants={itemVariants} className="bg-[#d1b3ff]/5 backdrop-blur-xl border border-[#d1b3ff]/20 p-8 rounded-2xl relative">
                                <h2 className="font-space font-bold text-xl text-white uppercase mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#d1b3ff]">verified_user</span>
                                    Expert Trust Vault
                                </h2>
                                <p className="font-mono text-[10px] text-white/60 mb-6 uppercase tracking-widest leading-relaxed">
                                    Rigorous, verified expert onboarding protocol. Only elite operatives breach our firewall.
                                </p>
                                <ul className="space-y-5">
                                    {[
                                        "Identity Verification (KYC/AML)",
                                        "Certification Validation (OSCP, CISSP)",
                                        "Zero-Trust Network Access provisioning",
                                        "Continuous monitoring of operative nodes"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#d1b3ff] text-[16px] mt-0.5">check_circle</span>
                                            <span className="font-mono text-[11px] text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>

                            {/* Tiered Pricing & SLAs */}
                            <motion.section variants={itemVariants} className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                                <h2 className="font-space font-bold text-xl text-white uppercase mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white/50">receipt_long</span>
                                    Transparent SLAs
                                </h2>
                                <p className="font-mono text-[10px] text-white/60 mb-6 uppercase tracking-widest leading-relaxed">
                                    Tiered pricing structures eliminating informational asymmetry.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg border-l-2 border-l-[#00f5ff]">
                                        <div className="font-bold text-white text-sm mb-1 font-space">API Security Sprint</div>
                                        <div className="font-mono text-[9px] text-white/50 uppercase">Fixed Scope / 48hr SLA</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg border-l-2 border-l-[#d1b3ff]">
                                        <div className="font-bold text-white text-sm mb-1 font-space">Auth Protocol Audit</div>
                                        <div className="font-mono text-[9px] text-white/50 uppercase">Fixed Scope / 72hr SLA</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg border-l-2 border-l-[#39ff14]">
                                        <div className="font-bold text-white text-sm mb-1 font-space">Full Startup MVP Scan</div>
                                        <div className="font-mono text-[9px] text-white/50 uppercase">Custom Scope / 7-day SLA</div>
                                    </div>
                                </div>
                            </motion.section>
                        </div>
                    </div>

                    {/* HUD Sidebar */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
                        {/* Status Panel */}
                        <div className="bg-black/60 border border-white/10 p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                                <span className="material-symbols-outlined text-[16px] text-[#39ff14]">memory</span>
                                <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">Live Telemetry</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-1">ACTIVE_NDAS</div>
                                    <div className="font-space font-black text-3xl text-white">1,402</div>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-1">VERIFIED_OPERATIVES</div>
                                    <div className="font-space font-black text-3xl text-[#d1b3ff]">84</div>
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-1">SECURED_DOCUMENTS</div>
                                    <div className="font-space font-black text-3xl text-[#00f5ff]">3,921</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-[#00f5ff]/5 border border-[#00f5ff]/20 p-6 rounded-2xl">
                            <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#00f5ff] uppercase mb-4">Nav_Shortcuts</h3>
                            <div className="space-y-3">
                                <a href="/experts" className="w-full flex items-center justify-between p-4 bg-black/40 border border-[#00f5ff]/30 rounded-xl hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] transition-all group">
                                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white group-hover:text-[#00f5ff] uppercase">Expert Directory</span>
                                    <span className="material-symbols-outlined text-[16px] text-white/40 group-hover:text-[#00f5ff]">arrow_forward</span>
                                </a>
                                <a href="/sprints" className="w-full flex items-center justify-between p-4 bg-black/40 border border-[#00f5ff]/30 rounded-xl hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] transition-all group">
                                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white group-hover:text-[#00f5ff] uppercase">Marketplace</span>
                                    <span className="material-symbols-outlined text-[16px] text-white/40 group-hover:text-[#00f5ff]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        
                        {/* Trust Badge */}
                        <div className="flex items-center gap-4 justify-center py-6 opacity-60">
                            <span className="material-symbols-outlined text-4xl text-white/30">shield_lock</span>
                            <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                                End-to-End Encryption <br/>
                                Bank-Grade Security
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan-horizontal {
                    0% { left: 0; }
                    50% { left: calc(100% - 4px); }
                    100% { left: 0; }
                }
                .scanline {
                    background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.05) 51%, transparent 100%);
                    background-size: 100% 4px;
                    animation: scan-bg 10s linear infinite;
                }
                @keyframes scan-bg {
                    0% { background-position: 0 -100px; }
                    100% { background-position: 0 100vh; }
                }
            `}} />
        </div>
    );
};

export default LegalHub;
