import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Dashboard = () => {
  const [selectedVuln, setSelectedVuln] = useState(null);

  const vulnerabilities = [
    {
      id: "CVE-2026-X190",
      severity: "CRITICAL",
      type: "Unauthenticated API Access",
      status: "OPEN",
      operative: "LAKSHAY S.",
      remediation: [
        "Implement strict JWT validation on /api/v2/core endpoint.",
        "Rotate compromised secret keys within the AWS Secret Manager.",
        "Deploy a rate-limiting middleware to throttle excess requests."
      ],
      color: "#ff4d4d"
    },
    {
      id: "AWS-IAM-001",
      severity: "HIGH",
      type: "Over-permissive S3 Bucket Policy",
      status: "IN-PROGRESS",
      operative: "SAHIL D.",
      remediation: [
        "Restrict bucket access to specific VPC endpoints.",
        "Remove s3:GetObject permission for anonymous users."
      ],
      color: "#ffcc00"
    },
    {
      id: "AUTH-JWT-042",
      severity: "MEDIUM",
      type: "Missing Refresh Token Expiration",
      status: "FIXED",
      operative: "EKANSH S.",
      remediation: [
        "Enforce a strict 7-day expiration limit on all refresh tokens.",
        "Implement token revocation on logout."
      ],
      color: "#39ff14"
    }
  ];

  return (
    <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black pt-28 pb-20">
      <Navbar />

      <main className="px-[5%] lg:px-[10%] relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-2.5 h-2.5 bg-[#39ff14] rounded-full animate-pulse shadow-[0_0_12px_rgba(57,255,20,0.8)]"></span>
                    <h2 className="font-mono text-[10px] text-[#39ff14] tracking-[0.3em] uppercase">SYSTEM_STATUS: MONITORING</h2>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black font-space uppercase text-white drop-shadow-[0_0_15px_rgba(255,204,0,0.1)]">
                    VULNERABILITY_HUB
                </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/5 p-3 rounded-lg">
                <div className="flex flex-col items-end pr-4 border-r border-white/10">
                    <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">LATENCY</span>
                    <span className="font-mono text-[#00f5ff] font-bold">14ms</span>
                </div>
                <div className="flex flex-col items-end px-4 border-r border-white/10">
                    <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">UPTIME</span>
                    <span className="font-mono text-white font-bold">99.99%</span>
                </div>
                <div className="flex flex-col items-end pl-4">
                    <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">PROXY</span>
                    <span className="font-mono text-[#d1b3ff] font-bold">SECURE</span>
                </div>
            </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Risk & Progress */}
            <div className="space-y-8">
                {/* Risk Overview Node */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ff4d4d]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff4d4d]/20 transition-all"></div>
                    
                    <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/60 mb-6 uppercase">Global Risk Score</h3>
                    
                    <div className="flex items-center gap-6">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {/* SVG Gauge Simulation */}
                            <svg className="w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                                <path
                                    className="text-white/5"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-[#ffcc00] animate-[dash_2s_ease-out]"
                                    strokeWidth="3"
                                    strokeDasharray="72, 100"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute font-space font-black text-4xl text-white">72</div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="font-mono text-[9px] text-[#ff4d4d] tracking-widest uppercase mb-1">CRITICAL THREATS</div>
                                <div className="font-space font-bold text-xl text-white">01</div>
                            </div>
                            <div>
                                <div className="font-mono text-[9px] text-[#ffcc00] tracking-widest uppercase mb-1">WARNINGS</div>
                                <div className="font-space font-bold text-xl text-white">04</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Sprint Progress */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/60 mb-4 uppercase">Sprint Progress</h3>
                    
                    <div className="mb-2 flex justify-between items-center text-[10px] font-mono font-bold">
                        <span className="text-[#00f5ff] uppercase">API Security Sprint</span>
                        <span className="text-white">75% COMPLETE</span>
                    </div>
                    
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/10">
                        <div className="bg-[#00f5ff] h-2 rounded-full w-[75%] shadow-[0_0_10px_rgba(0,245,255,0.8)] relative">
                            {/* Glitch anim overlay */}
                            <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                        </div>
                    </div>

                    <p className="font-mono text-[9px] text-white/40 tracking-widest uppercase mt-4">Running tests on remaining endpoints</p>
                </div>
            </div>

            {/* Middle Column: Vulnerability Feed */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                    <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/60 mb-6 uppercase flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">table_rows</span>
                        ACTIVE_SCANS & LOGS
                    </h3>

                    <div className="flex-1 overflow-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 font-mono text-[9px] tracking-widest text-white/40 uppercase">
                                    <th className="pb-4 pr-4">Severity</th>
                                    <th className="pb-4 px-4">Vuln_ID</th>
                                    <th className="pb-4 px-4">Status</th>
                                    <th className="pb-4 pl-4 text-right">Assigned Node</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vulnerabilities.map((vuln, i) => (
                                    <tr 
                                      key={vuln.id} 
                                      onClick={() => setSelectedVuln(vuln)}
                                      className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group ${selectedVuln?.id === vuln.id ? 'bg-white/5' : ''}`}
                                    >
                                        <td className="py-4 pr-4">
                                            <span className="font-mono text-[9px] font-bold tracking-[0.2em] px-2 py-1 rounded bg-black/40 border" style={{color: vuln.color, borderColor: `${vuln.color}40`}}>
                                                {vuln.severity}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-mono text-[11px] text-white/80 group-hover:text-white transition-colors">{vuln.id}</td>
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-[9px] tracking-widest uppercase text-white/60">{vuln.status}</span>
                                        </td>
                                        <td className="py-4 pl-4 text-right font-mono text-[10px] text-[#d1b3ff] tracking-widest uppercase">{vuln.operative}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

        {/* Guided Remediation Panel (Appears when a vulnerability is selected) */}
        {selectedVuln && (
            <div className="mt-8 bg-[#0b131a] border border-[#ffcc00]/20 rounded-2xl p-8 relative overflow-hidden backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[0_0_30px_rgba(255,204,0,0.05)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffcc00]/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="absolute top-4 right-4 flex items-center gap-4">
                     <button className="font-mono text-[9px] text-[#ffcc00] border border-[#ffcc00]/40 px-3 py-1.5 rounded uppercase tracking-widest hover:bg-[#ffcc00]/10 transition-colors">
                        EXPORT_LOG
                     </button>
                     <button onClick={() => setSelectedVuln(null)} className="text-white/40 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                     </button>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#ffcc00] text-[20px]">healing</span>
                    <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#ffcc00] uppercase">GUIDED REMEDIATION PROTOCOL</h3>
                </div>
                
                <h2 className="font-space font-bold text-3xl text-white mb-2 uppercase">{selectedVuln.type}</h2>
                <div className="font-mono text-[11px] text-white/40 tracking-widest mb-8">TARGET_ID: {selectedVuln.id} / ORIGIN: STATIC_ANALYSIS</div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-4 shadow-sm">RECOMMENDED_STEPS:</div>
                        {selectedVuln.remediation.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                                <div className="font-space font-bold text-white/20 text-xl leading-none">{idx + 1}</div>
                                <p className="font-mono text-[11px] text-white/70 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-black/60 border border-white/10 rounded-xl p-6 self-start">
                        <div className="font-mono text-[10px] text-[#d1b3ff] tracking-widest uppercase mb-4">ASSIGNED_PRACTITIONER</div>
                        <div className="flex items-center gap-3 mb-6">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${selectedVuln.operative.split(" ")[0]}&backgroundColor=0b111a`} className="w-12 h-12 rounded bg-white/5 border border-white/10" alt="Operative" />
                            <div>
                                <div className="font-space font-bold text-white uppercase text-sm">{selectedVuln.operative}</div>
                                <div className="font-mono text-[9px] text-[#39ff14] tracking-widest uppercase flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full"></span> VERIFIED
                                </div>
                            </div>
                        </div>
                        
                        <a href="/experts" className="block w-full text-center py-3 rounded-lg border border-[#d1b3ff]/50 font-mono text-[10px] font-bold tracking-[0.2em] text-[#d1b3ff] hover:bg-[#d1b3ff] hover:text-black transition-all uppercase items-center justify-center">
                            CONSULT EXPERT
                        </a>
                    </div>
                </div>

            </div>
        )}

      </main>

      <Footer />
      
      {/* Glitch Animation Styles Simulation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}} />
    </div>
  );
};

export default Dashboard;
