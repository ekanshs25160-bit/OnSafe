import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRICING = [
  { label: "API Security Sprint", price: "₹1,200", tag: "FIXED_SCOPE" },
  { label: "Auth Protocol Audit", price: "₹2,500", tag: "FIXED_SCOPE" },
  { label: "Full MVP Scan", price: "₹4,800", tag: "CUSTOM_SCOPE" },
];

const ConsultationModal = ({ operative, onClose }) => {
  const [scanDone, setScanDone] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setScanDone(true), 1200);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, []);

  const handleCloseEnter = () => setGlitch(true);
  const handleCloseLeave = () => setGlitch(false);

  if (!operative) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Panel */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0b111a] rounded-2xl border border-transparent overflow-hidden"
          style={{
            background: "linear-gradient(#0b111a, #0b111a) padding-box, linear-gradient(135deg, #00f5ff55, #d1b3ff55) border-box",
            border: "1px solid transparent",
          }}
        >
          {/* Cyan Laser Scan Line */}
          <AnimatePresence>
            {!scanDone && (
              <motion.div
                key="scan"
                initial={{ top: 0, opacity: 1 }}
                animate={{ top: "100%", opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, #00f5ff, transparent)",
                  boxShadow: "0 0 16px 4px rgba(0,245,255,0.5)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Gradient corner glow accents */}
          <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 bg-[#00f5ff]/10 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 bg-[#d1b3ff]/10 blur-3xl rounded-full" />

          <div className="relative z-10 p-8">

            {/* ── Header bar ── */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="font-mono text-[9px] text-[#00f5ff] tracking-[0.4em] uppercase mb-1">
                  // CONSULTATION_NODE :: SECURE_CHANNEL
                </p>
                <h2 className="font-space font-black text-2xl md:text-3xl text-white uppercase leading-tight">
                  {operative.name}
                </h2>
                <p className="font-mono text-[11px] text-[#00f5ff] tracking-widest mt-1 uppercase">
                  {operative.role}
                </p>
              </div>

              {/* Close button with glitch effect */}
              <button
                onClick={onClose}
                onMouseEnter={handleCloseEnter}
                onMouseLeave={handleCloseLeave}
                className="relative flex items-center gap-1.5 font-mono text-[9px] text-white/40 border border-white/10 px-3 py-1.5 rounded hover:text-[#ff4d4d] hover:border-[#ff4d4d]/40 transition-colors uppercase tracking-widest group"
              >
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={glitch ? { animation: "glitch 0.15s steps(2) infinite" } : {}}
                >
                  close
                </span>
                <span className={glitch ? "opacity-0" : ""}>CLOSE_TERMINAL</span>
              </button>
            </div>

            {/* ── Operative Identity Node ── */}
            <div className="flex items-center gap-5 mb-8 p-5 bg-black/40 rounded-xl border border-white/5">
              <div className="w-16 h-16 rounded-xl border border-[#00f5ff]/20 overflow-hidden bg-[#05080c] p-1 flex-shrink-0">
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${operative.name.split(" ")[0]}&backgroundColor=0b111a`}
                  alt={operative.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="material-symbols-outlined text-[#39ff14] text-[16px]">verified_user</span>
                  <span className="font-mono text-[10px] font-bold text-[#39ff14] tracking-[0.3em] uppercase bg-[#39ff14]/10 border border-[#39ff14]/30 px-2.5 py-0.5 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse inline-block" />
                    VERIFIED_OPERATIVE
                  </span>
                </div>
                <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  OPERATIVE_ID: {operative.id} // NDA_BOUND
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              {/* ── Trust Ledger ── */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#d1b3ff] text-[16px]">history_edu</span>
                  <h3 className="font-mono text-[10px] font-bold text-white/50 tracking-[0.3em] uppercase">
                    Trust Ledger
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* NDA Status */}
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-white/40 uppercase tracking-widest">NDA STATUS</span>
                    <span className="text-[#39ff14] font-bold tracking-wider">PROTOCOL_ACTIVE</span>
                  </div>

                  {/* Sprint History */}
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-white/40 uppercase tracking-widest">COMPLETED SPRINTS</span>
                    <span className="text-white font-bold">{operative.sprints ?? "34"}</span>
                  </div>

                  {/* Trust Score bar */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                      <span className="text-white/40 uppercase tracking-widest">TRUST SCORE</span>
                      <span className="text-[#00f5ff] font-bold">{operative.trustScore ?? "9.4"} / 10</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((operative.trustScore ?? 9.4) / 10) * 100}%` }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #00f5ff, #d1b3ff)" }}
                      />
                    </div>
                  </div>

                  {/* Encryption badge */}
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-white/40 uppercase tracking-widest">ENCRYPTION</span>
                    <span className="text-[#d1b3ff] font-bold">AES-256-GCM</span>
                  </div>
                </div>
              </div>

              {/* ── Expertise Matrix ── */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#00f5ff] text-[16px]">security</span>
                  <h3 className="font-mono text-[10px] font-bold text-white/50 tracking-[0.3em] uppercase">
                    Expertise Matrix
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(operative.specialties ?? ["#API_SECURITY", "#AUTH_AUDIT", "#REMEDIATION_GUIDE"]).map((spec) => (
                    <span
                      key={spec}
                      className="font-mono text-[9px] bg-[#00f5ff]/5 border border-[#00f5ff]/20 px-2.5 py-1 rounded text-[#00f5ff] tracking-widest"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="font-mono text-[10px] text-white/50 leading-relaxed">
                  Guided Remediation approach — this operative doesn't just surface vulnerabilities. 
                  They deliver step-by-step remediation protocols ensuring your team can implement fixes without a full-time security hire.
                </p>
              </div>
            </div>

            {/* ── Engagement Console ── */}
            <div className="bg-black/40 border border-[#00f5ff]/10 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#ffcc00] text-[16px]">receipt_long</span>
                <h3 className="font-mono text-[10px] font-bold text-white/50 tracking-[0.3em] uppercase">
                  Engagement Console // Available Sprints
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRICING.map((pkg) => (
                  <div
                    key={pkg.label}
                    className="bg-white/5 border border-white/5 rounded-lg p-3 hover:border-[#00f5ff]/30 transition-colors cursor-pointer group/pkg"
                  >
                    <div className="font-mono text-[8px] text-white/30 tracking-widest uppercase mb-1 group-hover/pkg:text-[#00f5ff]/60 transition-colors">
                      {pkg.tag}
                    </div>
                    <div className="font-space font-bold text-white text-sm">{pkg.label}</div>
                    <div className="font-mono text-[#00f5ff] font-bold text-base mt-1">{pkg.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Primary CTA ── */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-mono font-black text-[11px] tracking-[0.35em] uppercase text-black relative overflow-hidden group/cta"
              style={{
                background: "linear-gradient(135deg, #00f5ff, #d1b3ff)",
                boxShadow: "0 0 30px rgba(0,245,255,0.25), 0 0 60px rgba(209,179,255,0.1)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                INITIATE_SECURE_CHANNEL
              </span>
              {/* shimmer sweep */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>

            {/* Footer disclaimer */}
            <p className="font-mono text-[9px] text-white/20 text-center mt-4 tracking-widest uppercase">
              All communications are end-to-end encrypted // NDA enforced by platform
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Glitch keyframe injected inline */}
      <style>{`
        @keyframes glitch {
          0%   { transform: translate(0); opacity: 1; }
          25%  { transform: translate(2px, -1px); opacity: 0.6; }
          50%  { transform: translate(-2px, 1px); opacity: 1; }
          75%  { transform: translate(1px, 2px); opacity: 0.7; }
          100% { transform: translate(0); opacity: 1; }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default ConsultationModal;
