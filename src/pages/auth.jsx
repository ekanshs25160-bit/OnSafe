import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const AuthenticationPage = () => {
  const [authType, setAuthType] = useState(null); // 'FOUNDER' or 'OPERATIVE'
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const sequence = [
      "Establishing_Secure_Connection...",
      "Protocol_V1.0_Active",
      "Verifying_Client_Certificate...",
      "Auth_Node_Ready"
    ];
    let i = 0;
    const logInterval = setInterval(() => {
      if (i < sequence.length) {
        setLogs(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background Scanning Anim */}
      <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>

      <Navbar />

      <main className="px-[5%] lg:px-[20%] relative z-10 flex flex-col items-center">
        
        {/* Header HUD */}
        <div className="text-center mb-10 w-full max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 bg-[#00f5ff] rounded-full animate-pulse shadow-[0_0_12px_rgba(0,245,255,0.8)]"></span>
            <span className="font-mono text-[#00f5ff] text-[10px] tracking-[0.3em] uppercase">SYSTEM STATUS: AUTHENTICATING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-space uppercase text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             Restricted_Access
          </h1>
          
          <div className="bg-black/60 border border-white/5 p-4 rounded-lg text-left mt-4 mx-auto max-w-md h-32 overflow-hidden flex flex-col justify-end">
             {logs.map((log, i) => (
                <div key={i} className="font-mono text-[9px] text-[#39ff14] tracking-widest uppercase opacity-80">{log}</div>
             ))}
             <div className="font-mono text-[9px] text-[#39ff14] tracking-widest animate-pulse mt-1">_</div>
          </div>
        </div>

        {!authType ? (
           /* Identity Selection Node */
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              <button 
                onClick={() => setAuthType("FOUNDER")}
                className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#d1b3ff]/60 p-10 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(209,179,255,0.15)] group relative overflow-hidden text-left"
              >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d1b3ff]/10 blur-3xl pointer-events-none group-hover:bg-[#d1b3ff]/20 transition-colors"></div>
                  <span className="material-symbols-outlined text-[40px] text-[#d1b3ff] mb-6">rocket_launch</span>
                  <h2 className="font-space font-bold text-2xl text-white uppercase mb-2">I am a Founder</h2>
                  <p className="font-mono text-[11px] text-white/50 tracking-widest uppercase">Securing an MVP / Startup</p>
              </button>

              <button 
                onClick={() => setAuthType("OPERATIVE")}
                className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#00f5ff]/60 p-10 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] group relative overflow-hidden text-left"
              >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f5ff]/10 blur-3xl pointer-events-none group-hover:bg-[#00f5ff]/20 transition-colors"></div>
                  <span className="material-symbols-outlined text-[40px] text-[#00f5ff] mb-6">terminal</span>
                  <h2 className="font-space font-bold text-2xl text-white uppercase mb-2">I am an Operative</h2>
                  <p className="font-mono text-[11px] text-white/50 tracking-widest uppercase">Joining the Elite Network</p>
              </button>
           </div>
        ) : authType === "FOUNDER" ? (
           /* Founder Onboarding Flow */
           <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-[#d1b3ff]/30 p-8 md:p-12 rounded-2xl shadow-[0_0_40px_rgba(209,179,255,0.05)] animate-in fade-in slide-in-from-bottom-4 relative">
               <button onClick={() => setAuthType(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
               </button>
               
               <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#d1b3ff] text-[24px]">fingerprint</span>
                  <h2 className="font-space font-bold text-2xl text-white uppercase">Founder Uplink</h2>
               </div>

               <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); window.location.href='/dashboard';}}>
                  <div>
                     <label className="block font-mono text-[10px] text-[#d1b3ff] tracking-widest uppercase mb-2">ACCESS_ID (Email)</label>
                     <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-[#d1b3ff] transition-colors" placeholder="founder@startup.io"/>
                  </div>
                  <div>
                     <label className="block font-mono text-[10px] text-[#d1b3ff] tracking-widest uppercase mb-2">SECURE_KEY (Password)</label>
                     <input type="password" required className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-[#d1b3ff] transition-colors" placeholder="••••••••••••"/>
                  </div>

                  <div className="h-px w-full bg-white/10 my-8"></div>
                  
                  <div className="mb-4 font-mono text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">Project Payload Data</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block font-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">MVP URL / Repository</label>
                         <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="https://..."/>
                      </div>
                      <div>
                         <label className="block font-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">Primary Tech Stack</label>
                         <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="React, Node, AWS"/>
                      </div>
                  </div>

                  {/* Legal Node */}
                  <div className="bg-[#ffcc00]/5 border border-[#ffcc00]/20 rounded-lg p-4 mt-6">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-[16px] text-[#ffcc00]">history_edu</span>
                          <span className="font-mono text-[10px] font-bold text-[#ffcc00] tracking-widest uppercase">Legal Safeguard Module</span>
                      </div>
                      <p className="font-mono text-[9px] text-white/50 leading-relaxed uppercase mb-4">
                         By proceeding, you digitally sign the interconnected standard Mutual NDA, ensuring your proprietary code and architecture are legally protected before any verified operative accesses your node.
                      </p>
                      <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" required className="w-4 h-4 bg-black border border-white/20 rounded accent-[#d1b3ff]"/>
                          <span className="font-mono text-[10px] text-white/80 tracking-widest">I ACKNOWLEDGE AND SIGN PROTOCOL_NDA</span>
                      </label>
                  </div>

                  <button type="submit" className="w-full mt-6 bg-[#d1b3ff] text-black font-mono font-black tracking-[0.2em] py-4 rounded-xl hover:bg-white transition-all uppercase drop-shadow-[0_0_15px_rgba(209,179,255,0.4)] relative overflow-hidden group">
                      <span className="relative z-10">INITIALIZE WORKSPACE</span>
                      <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                  </button>
               </form>
           </div>
        ) : (
           /* Operative Onboarding Flow */
           <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-[#00f5ff]/30 p-8 md:p-12 rounded-2xl shadow-[0_0_40px_rgba(0,245,255,0.05)] animate-in fade-in slide-in-from-bottom-4 relative">
               <button onClick={() => setAuthType(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
               </button>
               
               <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#00f5ff] text-[24px]">verified_user</span>
                  <h2 className="font-space font-bold text-2xl text-white uppercase">Operative Intake</h2>
               </div>

               <div className="bg-[#00f5ff]/5 border border-[#00f5ff]/20 rounded-lg p-4 mb-8">
                   <p className="font-mono text-[10px] text-[#00f5ff] uppercase tracking-widest leading-relaxed">
                        SYSTEM NOTICE: You are entering a rigorous expert onboarding protocol. Due to the sensitive nature of tactical MVP security, all nodes require manual verification of credentials, GitHub commits, and certifications before network access is granted.
                   </p>
               </div>

               <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); alert('Verification Submitted. Status: PENDING.');}}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block font-mono text-[10px] text-white/70 tracking-widest uppercase mb-2">CALLSIGN (Full Name)</label>
                         <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-[#00f5ff] transition-colors" placeholder="Jane Doe"/>
                      </div>
                      <div>
                         <label className="block font-mono text-[10px] text-white/70 tracking-widest uppercase mb-2">COMM_LINK (Email)</label>
                         <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-[#00f5ff] transition-colors" placeholder="jane.doe@example.com"/>
                      </div>
                  </div>

                  <div>
                     <label className="block font-mono text-[10px] text-white/70 tracking-widest uppercase mb-2">GITHUB NODE URL</label>
                     <input type="url" required className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-[#00f5ff] transition-colors" placeholder="https://github.com/..."/>
                  </div>
                  
                  <div>
                     <label className="block font-mono text-[10px] text-white/70 tracking-widest uppercase mb-2">CERTIFICATION OR PORTFOLIO LINK</label>
                     <input type="url" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 font-mono text-xs text-white focus:outline-none focus:border-[#00f5ff] transition-colors" placeholder="OSCP, HackerOne Profile, etc..."/>
                  </div>

                  <button type="submit" className="w-full mt-8 bg-transparent border border-[#00f5ff] text-[#00f5ff] font-mono font-black tracking-[0.2em] py-4 rounded-xl hover:bg-[#00f5ff] hover:text-black transition-all uppercase relative overflow-hidden group">
                      <span className="relative z-10">SUBMIT CREDENTIALS FOR VERIFICATION</span>
                  </button>
               </form>
           </div>
        )}

      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .scanline {
          background: linear-gradient(to bottom, transparent 50%, rgba(209, 179, 255, 0.4) 51%, transparent 100%);
          background-size: 100% 4px;
          animation: scan 8s linear infinite;
        }
        @keyframes scan {
          0% { background-position: 0 -100px; }
          100% { background-position: 0 100vh; }
        }
      `}} />
    </div>
  );
};

export default AuthenticationPage;
