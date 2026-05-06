import React, { useState, useEffect } from "react";

const Marketplace = () => {
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sprints")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setSprints(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sprints:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="sprints"
      className="py-24 bg-[#0b111a] relative border-t border-white/5"
    >
      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black font-space uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <span className="text-[#d1b3ff]">SECURITY MARKETPLACE</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-black/40 border border-white/5 animate-pulse h-64"></div>
            ))
          ) : (
            sprints.map((pkg) => (
              <div key={pkg.id} className={`p-8 rounded-2xl bg-black/40 border transition-all group relative flex flex-col h-full ${
                pkg.tier_name === 'Advanced' ? 'border-[#d1b3ff]/40 hover:border-[#d1b3ff] shadow-[0_0_30px_rgba(209,179,255,0.1)] bg-[#d1b3ff]/5' : 
                pkg.tier_name === 'Full MVP Shield' ? 'border-[#39ff14]/20 hover:border-[#39ff14]' :
                'border-[#00f5ff]/20 hover:border-[#00f5ff]'
              }`}>
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className={`material-symbols-outlined ${
                    pkg.tier_name === 'Advanced' ? 'text-[#d1b3ff]' : 
                    pkg.tier_name === 'Full MVP Shield' ? 'text-[#39ff14]' :
                    'text-[#00f5ff]'
                  }`}>
                    {pkg.tier_name === 'Advanced' ? 'key' : pkg.tier_name === 'Full MVP Shield' ? 'shield' : 'api'}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {pkg.name}
                </h4>
                <div className={`text-3xl font-black mb-6 ${
                  pkg.tier_name === 'Advanced' ? 'text-[#d1b3ff]' : 
                  pkg.tier_name === 'Full MVP Shield' ? 'text-[#39ff14]' :
                  'text-[#00f5ff]'
                }`}>
                  {pkg.price_display || `₹${pkg.price}`}
                  <span className="text-sm text-white/40 font-normal">
                    {" "}
                    / {pkg.estimated_duration}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 text-white/70 font-mono text-xs flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#39ff14]">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg border font-mono uppercase tracking-widest text-xs transition-colors ${
                  pkg.tier_name === 'Advanced' ? 'bg-[#d1b3ff] text-black font-black hover:bg-[#e1ccff] shadow-[0_0_20px_rgba(209,179,255,0.2)]' : 
                  pkg.tier_name === 'Full MVP Shield' ? 'border-[#39ff14]/40 text-[#39ff14] hover:bg-[#39ff14]/10' :
                  'border-[#00f5ff]/40 text-[#00f5ff] hover:bg-[#00f5ff]/10'
                }`}>
                  Select Package
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default Marketplace;
