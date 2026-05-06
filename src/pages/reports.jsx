import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Terminal from "../components/ui/Terminal";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [targetUrl, setTargetUrl] = useState("");

  useEffect(() => {
    const url = localStorage.getItem('onSafe_scanUrl') || "https://example.com";
    setTargetUrl(url);

    const scanState = localStorage.getItem('onSafe_isScanning');
    const savedResult = localStorage.getItem('onSafe_scanResult');

    if (scanState === 'true') {
      setIsScanning(true);
    } else if (savedResult) {
      const result = JSON.parse(savedResult);
      setScanResult(result);
      setLoading(false);
      if (result.score < 70) setShowNotification(true);
    } else {
      // Default initial scan result (simulated from scan_tool logic)
      const defaultResult = {
        score: 61,
        issues: [
            "Website is not using HTTPS",
            "Missing Content-Security-Policy",
            "Missing X-Frame-Options",
            "Server information exposed: nginx/1.18.0",
            "Potentially risky port open: 22",
            "Accessible admin-related page found: /admin"
        ],
        recommendations: [
            "Enable HTTPS with SSL certificate",
            "Add CSP header to prevent XSS",
            "Add X-Frame-Options header to prevent clickjacking",
            "Hide server version information in headers",
            "Close unused port 22 (SSH)",
            "Restrict access to admin pages via IP whitelisting"
        ],
        open_ports: [80, 443, 22, 3306]
      };
      setScanResult(defaultResult);
      setLoading(false);
    }
  }, []);

  const handleScanComplete = () => {
    setIsScanning(false);
    localStorage.setItem('onSafe_isScanning', 'false');
    
    // Simulate scan result based on scan_tool logic
    const result = {
        score: 61,
        issues: [
            "Website is not using HTTPS",
            "Missing Content-Security-Policy",
            "Missing X-Frame-Options",
            "Server information exposed: nginx/1.18.0",
            "Potentially risky port open: 22",
            "Accessible admin-related page found: /admin"
        ],
        recommendations: [
            "Enable HTTPS with SSL certificate",
            "Add CSP header to prevent XSS",
            "Add X-Frame-Options header to prevent clickjacking",
            "Hide server version information in headers",
            "Close unused port 22 (SSH)",
            "Restrict access to admin pages via IP whitelisting"
        ],
        open_ports: [80, 443, 22, 3306]
    };
    
    localStorage.setItem('onSafe_scanResult', JSON.stringify(result));
    setScanResult(result);
    setLoading(false);
    
    if (result.score < 70) {
      setShowNotification(true);
    }
  };

  const scanLines = [
    { text: `> INITIATING SCAN FOR: ${targetUrl}`, speed: 30, delay: 400 },
    { text: "> [BOOTING_SCANNER...]", speed: 40, delay: 500 },
    { text: "> ANALYZING HTTP HEADERS...", speed: 30, delay: 400 },
    { text: "> CHECKING SECURITY POLICIES...", speed: 30, delay: 400 },
    { text: "> [SEARCHING_VULNERABILITIES...]", speed: 50, delay: 1000 },
    { text: "> PROBING COMMON PORTS...", speed: 40, delay: 600 },
    { text: "> [CALCULATING_HEALTH_SCORE...]", speed: 40, delay: 800 },
    { text: "> SCAN_COMPLETE. GENERATING REPORT.", speed: 30, delay: 500 },
  ];

  return (
    <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black pt-28">
      <Navbar />
      
      <AnimatePresence>
        {isScanning && (
          <Terminal onComplete={handleScanComplete} customLines={scanLines} />
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isScanning ? 0 : 1, y: isScanning ? 20 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-[5%] lg:px-[15%] relative z-10 mb-20 max-w-6xl mx-auto"
      >
        {/* Strategic Recommendation Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl flex items-center justify-between gap-4 mb-12 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-500 animate-pulse">warning</span>
                </div>
                <div>
                    <h4 className="text-red-500 font-bold text-sm uppercase tracking-wider">Critical Risks Detected</h4>
                    <p className="text-xs font-mono text-white/60">
                      Recommended Sprint: <span className="text-[#00f5ff] underline cursor-pointer">Auth Protocol Audit</span>
                    </p>
                </div>
              </div>
              <button 
                onClick={() => setShowNotification(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 bg-[#00f5ff] rounded-full animate-pulse shadow-[0_0_12px_rgba(0,245,255,0.8)]"></span>
              <h2 className="font-mono text-[10px] text-[#00f5ff] tracking-[0.4em] uppercase">
                DISCOVERY_SCAN_RESULTS
              </h2>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black font-space uppercase text-white mb-4">
              {targetUrl.replace(/^https?:\/\//, '').toUpperCase()}
            </h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
                Timestamp: {new Date().toLocaleString()} // Node: Global-Scanner-01
            </p>
        </div>

        {/* Scan Result Grid (Inspired by scan_tool website but premium) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Security Score Card */}
            <div className="md:col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-[#d1b3ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/40 mb-10 uppercase relative z-10">
                    Security_Score
                </h3>
                <div className="relative">
                    <svg className="w-48 h-48 transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/5"
                        />
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={552.92}
                            initial={{ strokeDashoffset: 552.92 }}
                            animate={{ strokeDashoffset: 552.92 - (552.92 * (scanResult?.score || 0)) / 100 }}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                            className={`${
                                (scanResult?.score || 0) >= 80 ? 'text-[#39ff14]' : 
                                (scanResult?.score || 0) >= 50 ? 'text-[#ffcc00]' : 'text-red-500'
                            }`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black font-space text-white">
                            {scanResult?.score || 0}
                        </span>
                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">/ 100</span>
                    </div>
                </div>
                <div className="mt-8 text-center relative z-10">
                    <span className={`px-4 py-1.5 rounded-full font-mono text-[10px] font-black tracking-widest uppercase border ${
                        (scanResult?.score || 0) >= 80 ? 'bg-[#39ff14]/10 text-[#39ff14] border-[#39ff14]/30' : 
                        (scanResult?.score || 0) >= 50 ? 'bg-[#ffcc00]/10 text-[#ffcc00] border-[#ffcc00]/30' : 'bg-red-500/10 text-red-500 border-red-500/30'
                    }`}>
                        {(scanResult?.score || 0) >= 80 ? 'EXCELLENT' : (scanResult?.score || 0) >= 50 ? 'NEEDS ATTENTION' : 'CRITICAL RISK'}
                    </span>
                </div>
            </div>

            {/* Issues Found List */}
            <div className="md:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <h3 className="font-space font-bold text-white uppercase tracking-wider flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">bug_report</span>
                        Issues_Found
                    </h3>
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                        Count: {scanResult?.issues.length || 0}
                    </span>
                </div>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {scanResult?.issues.map((issue, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group"
                        >
                            <span className="text-red-500 font-mono text-xs mt-0.5 opacity-50 group-hover:opacity-100">0{index + 1}</span>
                            <p className="text-sm text-white/80 font-medium">{issue}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Recommendations */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <h3 className="font-space font-bold text-white uppercase tracking-wider flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#39ff14]">auto_fix_high</span>
                        Strategic_Recommendations
                    </h3>
                </div>
                <div className="space-y-4">
                    {scanResult?.recommendations.map((rec, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-[#39ff14]/5 rounded-xl border border-[#39ff14]/10">
                            <span className="material-symbols-outlined text-[#39ff14] text-sm">check_circle</span>
                            <p className="text-sm text-white/70">{rec}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Open Ports */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <h3 className="font-space font-bold text-white uppercase tracking-wider flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#d1b3ff]">lan</span>
                        Open_Network_Ports
                    </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {scanResult?.open_ports.map((port, index) => (
                        <div key={index} className="p-4 bg-black/40 rounded-xl border border-[#d1b3ff]/20 flex flex-col items-center justify-center group hover:border-[#d1b3ff] transition-all">
                            <span className="font-mono text-2xl font-black text-white group-hover:text-[#d1b3ff] transition-colors">{port}</span>
                            <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-1">
                                {port === 80 ? 'HTTP' : port === 443 ? 'HTTPS' : port === 22 ? 'SSH' : port === 3306 ? 'MYSQL' : 'OPEN'}
                            </span>
                        </div>
                    ))}
                    {scanResult?.open_ports.length === 0 && (
                        <p className="col-span-full text-center text-white/30 font-mono text-xs py-8 italic">
                            No common open ports detected.
                        </p>
                    )}
                </div>
            </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5">
            <button className="bg-gradient-to-r from-[#00f5ff] to-[#d1b3ff] text-black font-mono font-black px-12 py-5 rounded-2xl tracking-widest text-xs hover:scale-105 transition-all active:scale-95 shadow-[0_0_50px_rgba(0,245,255,0.3)] uppercase">
                HIRE AN EXPERT TO FIX THESE ISSUES
            </button>
            <p className="mt-6 text-white/30 font-mono text-[10px] uppercase tracking-[0.3em]">
                Secure your startup today with OnSafe verified experts.
            </p>
        </div>
      </motion.main>

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;
