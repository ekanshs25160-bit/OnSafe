import React from 'react';

const TrustArchitecture = () => {
  return (
    <section id="trust" className="py-24 bg-[#05080c] relative border-t border-white/5">
        <div className="container mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
                <h2 className="text-[#d1b3ff] font-mono text-sm tracking-[0.3em] uppercase mb-4">Core Foundation</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white font-space uppercase">Trust Architecture</h3>
                <p className="text-white/60 mt-4 max-w-2xl mx-auto font-inter">Built-in safeguards ensuring confidentiality and high-tier expertise.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-10 border border-[#d1b3ff]/20 bg-[#0b111a] rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-8xl text-[#d1b3ff]">verified_user</span>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-[#d1b3ff]/10 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[#d1b3ff]">how_to_reg</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Rigorous Expert Verification</h4>
                    <p className="text-white/60 leading-relaxed font-inter">
                        Our experts pass multi-stage technical assessments, identity verification, and background checks. You only collaborate with top 1% vetted security professionals.
                    </p>
                    <a href="/auth" className="mt-6 inline-flex items-center gap-2 border border-[#d1b3ff]/40 text-[#d1b3ff] px-6 py-2.5 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-[#d1b3ff] hover:text-black transition-colors">
                        GET VERIFIED <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a>
                </div>
                
                <div className="p-10 border border-[#00f5ff]/20 bg-[#0b111a] rounded-3xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-8xl text-[#00f5ff]">gavel</span>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-[#00f5ff]/10 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[#00f5ff]">quick_reference_all</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Integrated NDA Functionality</h4>
                    <p className="text-white/60 leading-relaxed font-inter">
                        Every Sprint is shielded by an automated, cryptographically signed Non-Disclosure Agreement. Your intellectual property is legally secured before a single line of code is shared.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}
export default TrustArchitecture;
