import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { projectStatus } from "../../data/project_status";
import { expertReports } from "../../data/expert_reports";
import { vulnerabilities } from "../../data/vulnerabilities";

const AntigravityPanel = ({ expertId, disableMotion = false }) => {
  const [data, setData] = useState(null);
  const [vulns, setVulns] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation/shift
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });
  
  // Internal elements shift (parallax layers)
  const layer1X = useTransform(mouseX, [-300, 300], [-20, 20]);
  const layer1Y = useTransform(mouseY, [-300, 300], [-20, 20]);
  
  const layer2X = useTransform(mouseX, [-300, 300], [-40, 40]);
  const layer2Y = useTransform(mouseY, [-300, 300], [-40, 40]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (expertId) {
          // Note: In a real app, we'd have an endpoint for specific experts
          // For now, we'll simulate the expert reports or fetch from general pool
          setData(expertReports[expertId] || null);
          setVulns(vulnerabilities.filter(v => v.assigned_expert_id === expertId).slice(0, 3));
        } else {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const response = await fetch(`${API_URL}/api/dashboard/summary`);
          if (!response.ok) throw new Error('NETWORK_FAILURE');
          
          const summary = await response.json();
          setData(summary.project_status);
          setVulns(summary.latest_vulnerabilities.slice(0, 3));
        }
      } catch (err) {
        console.error("Antigravity Panel Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [expertId]);


  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-white/5 rounded-3xl animate-pulse border border-white/10 flex items-center justify-center font-mono text-white/20 uppercase tracking-[0.4em]">
        Synchronizing_Field...
      </div>
    );
  }

  const healthScore = data?.global_health_score || data?.health_score || 0;

  return (
    <div 
      className={`relative w-full h-[600px] ${disableMotion ? '' : 'perspective-1000'} py-12`}
      onMouseMove={disableMotion ? null : handleMouseMove}
      onMouseLeave={disableMotion ? null : handleMouseLeave}
      ref={containerRef}
    >
      <motion.div
        style={{
          rotateX: disableMotion ? 0 : rotateX,
          rotateY: disableMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full bg-black/20 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,245,255,0.05)] overflow-hidden flex flex-col items-center justify-center p-12 group"
      >
        {/* Background Decorative Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[2.5rem]">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00f5ff]/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#d1b3ff]/10 blur-[100px] rounded-full" />
            
            {/* Moving Grid lines */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* ── Layer 1: Health Gauge (Middle Depth) ── */}
        <motion.div
          style={{ x: disableMotion ? 0 : layer1X, y: disableMotion ? 0 : layer1Y, z: 50 }}
          animate={disableMotion ? {} : { y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 flex flex-col items-center mb-12"
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                className="text-white/5"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={552}
                initial={{ strokeDashoffset: 552 }}
                animate={{ strokeDashoffset: 552 - (552 * healthScore) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-[#00f5ff] drop-shadow-[0_0_12px_rgba(0,245,255,0.5)]"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-space font-black text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {healthScore}
                </span>
                <span className="font-mono text-[10px] text-[#00f5ff] tracking-[0.3em] uppercase mt-1">
                    {expertId ? "Expert_Report" : "Global_Index"}
                </span>
            </div>
          </div>
        </motion.div>

        {/* ── Layer 2: Vulnerability Cards (Fore Depth) ── */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30">
          {vulns.map((vuln, i) => (
            <motion.div
              key={vuln.vuln_id}
              style={{ 
                x: disableMotion ? 0 : layer2X, 
                y: disableMotion ? 0 : layer2Y, 
                z: 100,
              }}
              animate={disableMotion ? {} : { 
                y: [0, i % 2 === 0 ? -10 : 10, 0],
                rotateZ: [0, i % 2 === 0 ? 1 : -1, 0]
              }}
              transition={{ 
                duration: 5, 
                delay: i * 0.4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl group/card hover:border-[#00f5ff]/40 transition-colors shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-0.5 rounded font-mono text-[8px] font-bold tracking-widest uppercase ${
                  vuln.severity === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                  vuln.severity === 'High' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' :
                  'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                }`}>
                  {vuln.severity}
                </span>
                <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
                  {vuln.vuln_id}
                </span>
              </div>
              
              <h4 className="font-space font-bold text-sm text-white uppercase mb-2 line-clamp-1">
                {vuln.title}
              </h4>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                   <div className={`w-1.5 h-1.5 rounded-full ${vuln.status === 'Open' ? 'bg-red-500' : 'bg-orange-500'} animate-pulse`} />
                   <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{vuln.status}</span>
                </div>
                <span className="material-symbols-outlined text-white/20 text-[16px] group-hover/card:text-[#00f5ff] transition-colors">
                  shield
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Floating Tech Particles ── */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: 0.1
                    }}
                    animate={disableMotion ? { opacity: 0.1 } : { 
                        y: [0, -30, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                        duration: 3 + Math.random() * 4, 
                        repeat: Infinity, 
                        delay: Math.random() * 5 
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                />
            ))}
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/20 to-transparent animate-scan z-10" />
      </motion.div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AntigravityPanel;
