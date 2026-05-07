import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AntigravityPanel from "./AntigravityPanel";

const ExpertReportModal = ({ expert, onClose }) => {
  if (!expert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#05080c]/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-[#0b111a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl border border-[#00f5ff]/30 p-1 bg-black/40">
                <img 
                  src={expert.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${expert.name}`} 
                  alt={expert.name} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <h2 className="font-space font-black text-2xl text-white uppercase tracking-tight">
                  Standardized Security Report
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-[10px] text-[#00f5ff] tracking-widest uppercase">
                    Assigned_Expert: {expert.name}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                    ID: {expert.id}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00f5ff] hover:border-[#00f5ff]/50 transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
            {/* The Floating Dashboard */}
            <div className="mb-12">
               <AntigravityPanel expertId={expert.id} disableMotion={true} />
            </div>

            {/* Detailed Findings Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                <div className="space-y-6">
                    <h3 className="font-space font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#d1b3ff]">description</span>
                        Engagement_Scope
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                        This report summarizes the security audit performed by {expert.name} under Sprint Protocol {expert.id.split('-')[1]}. 
                        The assessment focused on {expert.specialties.join(", ")} within the PayFlow MVP environment. 
                        All findings are bound by NDA-SAFE-2024-{expert.id.split('-')[1]} and are intended for internal remediation only.
                    </p>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <h3 className="font-space font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4 text-sm">
                        <span className="material-symbols-outlined text-[#39ff14]">verified</span>
                        Compliance_Status
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-white/40 uppercase">Identity_Verified</span>
                            <span className="font-mono text-[10px] text-[#39ff14] uppercase">YES</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-white/40 uppercase">NDA_Active</span>
                            <span className="font-mono text-[10px] text-[#39ff14] uppercase">YES</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-white/40 uppercase">Certification_Verified</span>
                            <span className="font-mono text-[10px] text-[#39ff14] uppercase">YES</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 text-center">
                <button className="bg-[#00f5ff] text-black font-space font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-all text-xs">
                    Download Full PDF Report
                </button>
            </div>
          </div>
        </motion.div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 245, 255, 0.3);
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
};

export default ExpertReportModal;
