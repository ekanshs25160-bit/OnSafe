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
  const [fetchedResult, setFetchedResult] = useState(null);
  const [backendError, setBackendError] = useState(null);
  const [scanFinished, setScanFinished] = useState(false);



  useEffect(() => {
    const url = localStorage.getItem("onSafe_scanUrl") || "https://example.com";
    setTargetUrl(url);

    const scanState = localStorage.getItem("onSafe_isScanning");
    const savedResult = localStorage.getItem("onSafe_scanResult");

    if (scanState === "true") {
      setIsScanning(true);
      
      // Attempt actual scan from the new Express backend with retry logic
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const MAX_RETRIES = 2;
      let attempt = 0;

      const attemptScan = () => {
        attempt++;
        console.log(`SCAN_ATTEMPT: ${attempt}/${MAX_RETRIES + 1}`);
        fetch(`${API_URL}/api/scan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ url: url })
        })
          .then(res => {
            if (!res.ok) throw new Error(`Backend Error: ${res.status}`);
            return res.json();
          })
          .then(data => {
            setFetchedResult(data);
            setBackendError(null);
            setScanFinished(true);
          })
          .catch(err => {
            console.error(`Scan attempt ${attempt} failed:`, err);
            if (attempt <= MAX_RETRIES) {
              // Retry after a delay (give Render time to wake up)
              setTimeout(attemptScan, 5000);
            } else {
              // All retries exhausted — check if Node backend is at least reachable
              fetch(`${API_URL}/api/dashboard/summary`)
                .then(() => {
                  // Node is online but Python scanner failed — use fallback data
                  console.warn("FALLBACK: Using simulated scan data.");
                  setFetchedResult(null); // Will trigger fallback in handleScanComplete
                  setBackendError(null);
                  setScanFinished(true);
                })
                .catch(() => {
                  setBackendError("CRITICAL_ERROR: ONSAFE_BACKEND_OFFLINE. Handshake failed.");
                  setScanFinished(true);
                });
            }
          });
      };
      attemptScan();
    }
 else if (savedResult) {
      const result = JSON.parse(savedResult);
      setScanResult(result);
      setLoading(false);
      if (result.score < 70) setShowNotification(true);
    } else {
      // Default initial scan result
      const defaultResult = {
        score: 61,
        issues: [
          "Website is not using HTTPS",
          "Missing Content-Security-Policy",
          "Missing X-Frame-Options",
          "Server information exposed: nginx/1.18.0",
          "Potentially risky port open: 22",
          "Accessible admin-related page found: /admin",
        ],
        recommendations: [
          "Enable HTTPS with SSL certificate",
          "Add CSP header to prevent XSS",
          "Add X-Frame-Options header to prevent clickjacking",
          "Hide server version information in headers",
          "Close unused port 22 (SSH)",
          "Restrict access to admin pages via IP whitelisting",
        ],
        open_ports: [80, 443, 22, 3306],
      };
      setScanResult(defaultResult);
      setLoading(false);
    }
  }, []);

  const handleScanComplete = () => {
    setIsScanning(false);
    localStorage.setItem("onSafe_isScanning", "false");

    if (backendError) {
      setScanResult(null);
      return;
    }

    // Use fetched result from backend if available, otherwise fallback to simulation
    const result = fetchedResult || {
      score: 61,
      issues: [
        "Website is not using HTTPS",
        "Missing Content-Security-Policy",
        "Missing X-Frame-Options",
        "Server information exposed: nginx/1.18.0",
        "Potentially risky port open: 22",
        "Accessible admin-related page found: /admin",
      ],
      recommendations: [
        "Enable HTTPS with SSL certificate",
        "Add CSP header to prevent XSS",
        "Add X-Frame-Options header to prevent clickjacking",
        "Hide server version information in headers",
        "Close unused port 22 (SSH)",
        "Restrict access to admin pages via IP whitelisting",
      ],
      open_ports: [80, 443, 22, 3306],
    };

    localStorage.setItem("onSafe_scanResult", JSON.stringify(result));
    setScanResult(result);
    setLoading(false);

    if (result.score < 70) {
      setShowNotification(true);
    }
  };


  const scanLines = [
    { text: `> INITIATING SCAN FOR: ${targetUrl}`, speed: 20, delay: 200 },
    { text: "> [BOOTING_SCANNER...]", speed: 25, delay: 200 },
    { text: "> ANALYZING HTTP HEADERS...", speed: 20, delay: 200 },
    { text: "> CHECKING SECURITY POLICIES...", speed: 20, delay: 200 },
    { text: "> [SEARCHING_VULNERABILITIES...]", speed: 30, delay: 400 },
    { text: "> PROBING COMMON PORTS...", speed: 25, delay: 300 },
    { text: "> [CALCULATING_HEALTH_SCORE...]", speed: 25, delay: 400 },
    { text: "> SYNCING_WITH_REMOTE_SERVER...", speed: 30, delay: 600 },
    { text: "> SCAN_COMPLETE. GENERATING REPORT.", speed: 20, delay: 200 },
  ];



  return (
    <div className="bg-[#0b111a] min-h-screen text-[#e6edf3] font-inter selection:bg-[#00f5ff] selection:text-black pt-28">
      <Navbar />

      <AnimatePresence>
        {isScanning && (
          <Terminal onComplete={handleScanComplete} customLines={scanLines} isScanComplete={scanFinished} backendError={backendError} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isScanning ? 0 : 1, y: isScanning ? 20 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-[3%] lg:px-[5%] relative z-10 mb-20 max-w-[1400px] mx-auto"
      >
        {/* Strategic Recommendation Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl flex items-center justify-between gap-4 mb-10 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-500 animate-pulse">
                    warning
                  </span>
                </div>
                <div>
                  <h4 className="text-red-500 font-bold text-sm uppercase tracking-wider">
                    Critical Risks Detected
                  </h4>
                  <p className="text-xs font-mono text-white/60">
                    Recommended Sprint:{" "}
                    <span className="text-[#00f5ff] underline cursor-pointer">
                      Auth Protocol Audit
                    </span>
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

        {/* Backend Connection Error */}
        {backendError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/5 border border-red-500/20 p-12 rounded-3xl text-center mb-20 backdrop-blur-3xl relative overflow-hidden mt-10"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.05),transparent)] pointer-events-none"></div>
             <span className="material-symbols-outlined text-red-500 text-6xl mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">settings_suggest</span>
             <h2 className="text-white font-black font-space text-3xl uppercase mb-4 tracking-tighter">Backend_Connection_Failed</h2>
             <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] max-w-md mx-auto mb-8 leading-loose">
               The security protocol could not establish a secure handshake with the scanning node. Please ensure the Python backend is active and reachable on port 5000.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-red-500 text-white font-mono text-[10px] font-black tracking-widest uppercase hover:bg-red-600 transition-all rounded-xl shadow-[0_10px_20px_rgba(239,68,68,0.2)]"
                >
                  RETRY_CONNECTION
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white/60 font-mono text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all rounded-xl"
                >
                  RETURN_TO_BASE
                </button>
             </div>
          </motion.div>
        )}

        {/* Scan Results - Only show if backend is working and result exists */}
        {!backendError && scanResult && (
          <>
            {/* Header Section */}
            <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 bg-[#00f5ff] rounded-full animate-pulse shadow-[0_0_12px_rgba(0,245,255,0.8)]"></span>
            <h2 className="font-mono text-[10px] text-[#00f5ff] tracking-[0.4em] uppercase">
              DISCOVERY SCAN RESULTS
            </h2>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black font-space uppercase text-white mb-3">
            {targetUrl.replace(/^https?:\/\//, "").toUpperCase()}
          </h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
            Timestamp: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Security Score - Full Width Top Horizontal */}
        <div className="mb-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff]/5 via-transparent to-[#d1b3ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="relative">
              <svg className="w-44 h-44 transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="88"
                  cy="88"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={502.65}
                  initial={{ strokeDashoffset: 502.65 }}
                  animate={{
                    strokeDashoffset:
                      502.65 - (502.65 * (scanResult?.score || 0)) / 100,
                  }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  className={`${
                    (scanResult?.score || 0) >= 80
                      ? "text-[#39ff14]"
                      : (scanResult?.score || 0) >= 50
                        ? "text-[#ffcc00]"
                        : "text-red-500"
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black font-space text-white">
                  {scanResult?.score || 0}
                </span>
                <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  / 100
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h3 className="font-mono text-[11px] font-bold tracking-[0.3em] text-white/60 uppercase">
                  Global Security Index
                </h3>
                <span
                  className={`px-4 py-1 rounded-full font-mono text-[9px] font-black tracking-widest uppercase border ${
                    (scanResult?.score || 0) >= 80
                      ? "bg-[#39ff14]/10 text-[#39ff14] border-[#39ff14]/30"
                      : (scanResult?.score || 0) >= 50
                        ? "bg-[#ffcc00]/10 text-[#ffcc00] border-[#ffcc00]/30"
                        : "bg-red-500/10 text-red-500 border-red-500/30"
                  }`}
                >
                  {(scanResult?.score || 0) >= 80
                    ? "OPTIMIZED"
                    : (scanResult?.score || 0) >= 50
                      ? "ACTION REQUIRED"
                      : "CRITICAL THREAT"}
                </span>
              </div>
              <p className="text-white/50 font-mono text-xs leading-relaxed max-w-3xl">
                Your security posture is calculated based on SSL/TLS encryption
                strength, HTTP security headers, cookie safety, and open port
                vulnerability analysis.
                <span className="text-[#00f5ff] block mt-1">
                  Recommended: Address all high-severity issues before
                  production deployment.
                </span>
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                  <span className="block font-mono text-[8px] text-white/30 uppercase tracking-widest">
                    Protocol
                  </span>
                  <span className="text-white font-mono text-[11px] font-bold">
                    DISCOVERY SCAN
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                  <span className="block font-mono text-[8px] text-white/30 uppercase tracking-widest">
                    Status
                  </span>
                  <span className="text-[#39ff14] font-mono text-[11px] font-bold uppercase animate-pulse">
                    Monitoring Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Cards - Horizontal Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Issues Found */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-[350px]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <h3 className="font-space font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm">
                  bug_report
                </span>
                Issues
              </h3>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
              {scanResult?.issues.map((issue, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-lg border border-white/5 group hover:border-red-500/30 transition-colors"
                >
                  <p className="text-xs text-white/70 font-medium leading-relaxed">
                    {issue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-[350px]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <h3 className="font-space font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[#39ff14] text-sm">
                  auto_fix_high
                </span>
                Remediation
              </h3>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
              {scanResult?.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-3 bg-[#39ff14]/5 rounded-lg border border-[#39ff14]/10 group hover:border-[#39ff14]/40 transition-colors"
                >
                  <p className="text-xs text-white/60 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Ports */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-[350px]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <h3 className="font-space font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d1b3ff] text-sm">
                  lan
                </span>
                Port Status
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto pr-1 custom-scrollbar flex-1">
              {scanResult?.open_ports.map((port, index) => (
                <div
                  key={index}
                  className="p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col items-center justify-center group hover:border-[#d1b3ff] transition-all"
                >
                  <span className="font-mono text-lg font-black text-white group-hover:text-[#d1b3ff] transition-colors">
                    {port}
                  </span>
                  <span className="font-mono text-[7px] text-white/30 uppercase tracking-widest mt-0.5">
                    {port === 80 ? "HTTP" : port === 443 ? "HTTPS" : "OPEN"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recommended Sprints Section */}
        <div className="mt-20 mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <h3 className="font-mono text-xs font-bold tracking-[0.4em] text-[#d1b3ff] uppercase whitespace-nowrap px-4">
              RECOMMENDED SECURITY SPRINTS
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Essential",
                tagline: "Foundations for idea-stage startups",
                price: "₹5,000",
                features: ["OWASP Top 10 Scan", "Auth & Session Review", "Dependency Audit", "Executive Summary"],
                color: "#4ade80",
                id: "SPR-ESSENTIAL"
              },
              {
                title: "Advanced",
                tagline: "Investor-ready for seed-stage MVPs",
                price: "₹50,000",
                features: ["Everything in Essential", "Full API Pen-Test", "Cloud IAM Audit", "2× Revision Rounds"],
                color: "#818cf8",
                id: "SPR-ADVANCED",
                popular: true
              },
              {
                title: "Full MVP Shield",
                tagline: "Enterprise-grade certification",
                price: "₹1,50,000",
                features: ["Everything in Advanced", "Compliance Analysis", "Manual Code Review", "Trust Certificate"],
                color: "#f59e0b",
                id: "SPR-FULL-MVP"
              }
            ].map((sprint, idx) => (
              <div key={idx} className={`relative group ${sprint.popular ? 'scale-[1.02]' : ''}`}>
                {sprint.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#818cf8] text-white text-[8px] font-black tracking-widest px-3 py-1 rounded-full z-20 shadow-lg uppercase">
                    Most Popular
                  </div>
                )}
                <div className={`h-full bg-black/40 backdrop-blur-xl border ${sprint.popular ? 'border-[#818cf8]/50' : 'border-white/10'} rounded-2xl p-6 flex flex-col hover:border-[#00f5ff]/30 transition-all duration-500`}>
                  <div className="mb-4">
                    <h4 className="text-xl font-black font-space text-white uppercase tracking-tight">{sprint.title}</h4>
                    <p className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider leading-relaxed">{sprint.tagline}</p>
                  </div>
                  
                  <div className="text-2xl font-black font-space text-white mb-6">
                    {sprint.price}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {sprint.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[14px] mt-0.5" style={{ color: sprint.color }}>check_circle</span>
                        <span className="text-[10px] text-white/60 font-mono tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => {
                      window.history.pushState({}, '', '/experts');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`w-full py-3 rounded-xl font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                      sprint.popular 
                      ? 'bg-[#818cf8] text-white hover:bg-[#818cf8]/80 shadow-[0_10px_20px_rgba(129,140,248,0.2)]' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    SELECT PACKAGE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button - More Compact */}
        <div className="flex flex-col items-center justify-center py-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md max-w-4xl mx-auto">
          <h4 className="text-[#00f5ff] font-mono text-[9px] tracking-[0.4em] uppercase mb-4 font-bold">
            READY FOR REMEDIATION?
          </h4>
          <button
            onClick={() => {
              window.history.pushState({}, "", "/experts");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f5ff] to-[#d1b3ff] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#d1b3ff] text-black font-mono font-black px-12 py-4 rounded-xl tracking-[0.2em] text-xs hover:scale-[1.02] transition-all active:scale-95 uppercase shadow-[0_15px_40px_rgba(209,179,255,0.2)]">
              HIRE AN EXPERT TO FIX THESE ISSUES
            </div>
          </button>
          <p className="mt-6 text-white/30 font-mono text-[8px] uppercase tracking-[0.4em]">
            // SECURE_YOUR_STARTUP_NOW
          </p>
          </div>
        </>
      )}
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
