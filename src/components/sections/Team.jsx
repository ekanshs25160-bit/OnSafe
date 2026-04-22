import React from "react";

const TeamSection = () => {
  const operatives = [
    { 
      name: "Ekansh Shrotriya", 
      role: "Security Architect & Lead Researcher", 
      id: "001",
      verification: "Verified Professional",
      specialty: "Architecture & Threat Models",
      legal: "NDA-Bound"
    },
    { 
      name: "Sahil Dhillon", 
      role: "Penetration Testing Lead", 
      id: "002",
      verification: "Verified Professional",
      specialty: "Network & Web Pentesting",
      legal: "NDA-Bound"
    },
    { 
      name: "Lakshay Sharma", 
      role: "Vulnerability Assessment Specialist", 
      id: "003",
      verification: "Verified Professional",
      specialty: "Vulnerability Scanning",
      legal: "NDA-Bound"
    },
    { 
      name: "Priyanshu Shrivastava", 
      role: "Security Protocol Engineer", 
      id: "004",
      verification: "Verified Professional",
      specialty: "API Security & Auth Audits",
      legal: "NDA-Bound"
    },
    { 
      name: "Utkarsh Jain", 
      role: "Compliance & Risk Strategist", 
      id: "005",
      verification: "Verified Professional",
      specialty: "Cloud Configs & Compliance",
      legal: "NDA-Bound"
    }
  ];

  return (
    <section className="team-section py-24 px-[10%] bg-bg-base overflow-hidden border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-tertiary font-mono text-sm tracking-[0.3em] font-bold mb-4 uppercase">
            EXPERT NETWORK
        </h2>
        <h3 className="text-4xl md:text-5xl font-black font-space uppercase text-white mb-6">
          VERIFIED SECURITY PRACTITIONERS
        </h3>
        <p className="text-white/60 text-lg md:text-xl max-w-4xl font-inter leading-relaxed">
          Access a vetted network of independent cybersecurity practitioners specialized in securing early-stage MVPs. Our operatives are verified through a rigorous onboarding protocol to ensure your startup receives trusted, affordable, and expert-led remediation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {operatives.map((op, i) => (
          <div key={i} className="group relative bg-[#0b111a] p-8 rounded-2xl border border-white/5 hover:border-[#39ff14]/40 transition-all duration-500">
            {/* Status Header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#39ff14]"></div>
                 <span className="text-[10px] uppercase font-mono tracking-widest text-[#39ff14]">{op.verification}</span>
              </div>
              <div className="text-[10px] font-mono text-white/30 tracking-widest">
                  ID_{op.id}
              </div>
            </div>

            {/* Profile Info */}
            <h4 className="text-xl font-bold font-space text-white mb-1 uppercase">
                {op.name}
            </h4>
            <p className="text-[#00f5ff] font-mono text-[11px] tracking-widest uppercase mb-6 h-8">
                {op.role}
            </p>
            
            {/* Trust Features */}
            <div className="space-y-3 font-mono text-[10px] text-white/50 tracking-wider">
               <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                  <span>SPECIALTIES:</span>
                  <span className="text-white/80">{op.specialty}</span>
               </div>
               <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                  <span>LEGAL STATUS:</span>
                  <span className="text-[#d1b3ff] flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">gavel</span> {op.legal}</span>
               </div>
            </div>

            {/* Hover Effect Glow */}
            <div className="absolute inset-0 border border-[#39ff14] rounded-2xl opacity-0 group-hover:opacity-10 transition-all pointer-events-none shadow-[0_0_20px_rgba(57,255,20,0)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
