import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AntigravityPanel from "../components/ui/AntigravityPanel";

const Dashboard = () => {
  const [selectedVuln, setSelectedVuln] = useState(null);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic fetch for the vulnerabilities list below
    fetch("/api/dashboard/vulnerabilities")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setVulnerabilities(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vulnerabilities:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black pt-28">
      <Navbar />

      <main className="px-[5%] lg:px-[10%] relative z-10 mb-20">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 bg-[#39ff14] rounded-full animate-pulse shadow-[0_0_12px_rgba(57,255,20,0.8)]"></span>
              <h2 className="font-mono text-[10px] text-[#39ff14] tracking-[0.3em] uppercase">
                SYSTEM_STATUS: MONITORING
              </h2>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black font-space uppercase text-white drop-shadow-[0_0_15px_rgba(255,204,0,0.1)]">
              SECURITY HEALTH HUB
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/5 p-3 rounded-lg">
            <div className="flex flex-col items-end pr-4 border-r border-white/10">
              <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                LATENCY
              </span>
              <span className="font-mono text-[#00f5ff] font-bold">14ms</span>
            </div>
            <div className="flex flex-col items-end px-4 border-r border-white/10">
              <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                UPTIME
              </span>
              <span className="font-mono text-white font-bold">99.99%</span>
            </div>
            <div className="flex flex-col items-end pl-4">
              <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                PROXY
              </span>
              <span className="font-mono text-[#d1b3ff] font-bold">SECURE</span>
            </div>
          </div>
        </div>

        {/* Hero Section: The Antigravity Visualization */}
        {/* <div className="mb-12">
            <AntigravityPanel disableMotion={true} />
        </div> */}

        {/* Middle Section: Stats & Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ff4d4d]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff4d4d]/20 transition-all"></div>
                <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/60 mb-8 uppercase">
                    Remediation_Overview
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="font-mono text-[9px] text-red-500 uppercase tracking-widest mb-1">Critical</div>
                        <div className="font-space font-black text-3xl text-white">
                            {vulnerabilities.filter(v => v.severity === 'Critical').length}
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="font-mono text-[9px] text-orange-500 uppercase tracking-widest mb-1">High_Risk</div>
                        <div className="font-space font-black text-3xl text-white">
                            {vulnerabilities.filter(v => v.severity === 'High').length}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative group overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#d1b3ff]/10 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/60 mb-8 uppercase">
                    Security_Sprint_Progress
                </h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono uppercase tracking-widest">Global Patch Rate</span>
                        <span className="text-xs font-mono text-[#00f5ff]">65%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                        <div className="h-full bg-gradient-to-r from-[#00f5ff] to-[#d1b3ff] rounded-full w-[65%] shadow-[0_0_10px_rgba(0,245,255,0.3)]"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Section: Detailed Findings */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                <h3 className="font-space font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00f5ff]">bug_report</span>
                    Active_Vulnerability_Log
                </h3>
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
                    // AUTHENTICATED_SESSION
                </span>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
                                <th className="pb-6 pl-2 font-medium">Node_ID</th>
                                <th className="pb-6 font-medium">Finding_Description</th>
                                <th className="pb-6 font-medium">Severity</th>
                                <th className="pb-6 font-medium">Expert_Node</th>
                                <th className="pb-6 text-right pr-2 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {vulnerabilities.map((vuln) => (
                                <tr 
                                    key={vuln.vuln_id}
                                    className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                                    onClick={() => setSelectedVuln(vuln)}
                                >
                                    <td className="py-6 pl-2 font-mono text-xs text-[#00f5ff]">{vuln.vuln_id}</td>
                                    <td className="py-6">
                                        <div className="font-space font-bold text-sm text-white group-hover:text-[#00f5ff] transition-colors mb-1">{vuln.title}</div>
                                        <div className="font-mono text-[9px] text-white/30 tracking-wider uppercase">{vuln.category}</div>
                                    </td>
                                    <td className="py-6">
                                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold tracking-widest uppercase ${
                                            vuln.severity === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                                            vuln.severity === 'High' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' :
                                            'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                        }`}>
                                            {vuln.severity}
                                        </span>
                                    </td>
                                    <td className="py-6 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                                        {vuln.assigned_expert_id}
                                    </td>
                                    <td className="py-6 text-right pr-2">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-mono text-[10px] text-white/60 tracking-wider uppercase">{vuln.status}</span>
                                            <div className={`w-1.5 h-1.5 rounded-full ${vuln.status === 'Open' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : vuln.status === 'Fixed' ? 'bg-[#39ff14]' : 'bg-orange-500'}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </main>

      <Footer />

      {/* Vulnerability Detail Overlay */}
      {selectedVuln && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedVuln(null)} />
              <div className="relative w-full max-w-3xl bg-[#0b111a] border border-[#00f5ff]/30 rounded-[2rem] p-10 shadow-[0_0_100px_rgba(0,245,255,0.15)] max-h-[90vh] overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start mb-10 pb-6 border-b border-white/10">
                      <div>
                          <div className="flex items-center gap-3 mb-3">
                              <span className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase ${
                                  selectedVuln.severity === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/30'
                              }`}>
                                  {selectedVuln.severity}
                              </span>
                              <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">ID: {selectedVuln.vuln_id}</span>
                          </div>
                          <h2 className="text-3xl font-space font-black text-white uppercase tracking-tight leading-tight">{selectedVuln.title}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedVuln(null)} 
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00f5ff] hover:border-[#00f5ff]/50 transition-all text-4xl font-light"
                      >
                        &times;
                      </button>
                  </div>

                  <div className="space-y-10">
                      <div>
                          <div className="flex items-center gap-2 mb-4">
                              <span className="material-symbols-outlined text-[#d1b3ff] text-[20px]">visibility</span>
                              <h4 className="font-mono text-[10px] text-[#d1b3ff] uppercase tracking-[0.3em]">Business_Impact_Analysis</h4>
                          </div>
                          <p className="text-white/70 text-base leading-relaxed pl-7">{selectedVuln.description}</p>
                      </div>

                      <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-2 mb-6">
                              <span className="material-symbols-outlined text-[#39ff14] text-[20px]">auto_fix_high</span>
                              <h4 className="font-mono text-[10px] text-[#39ff14] uppercase tracking-[0.3em]">Standard_Remediation_Path</h4>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed font-mono bg-black/40 p-6 rounded-xl border border-white/5 whitespace-pre-wrap">
                            {selectedVuln.remediation_guide}
                          </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                          <div>
                              <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-2">Legal_NDA_ID</p>
                              <p className="font-mono text-xs text-[#00f5ff]">{selectedVuln.legal_safeguard_id}</p>
                          </div>
                          <div>
                              <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-2">Discovery_Timestamp</p>
                              <p className="font-mono text-xs text-white/60">{new Date(selectedVuln.timestamp).toLocaleString()}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;
