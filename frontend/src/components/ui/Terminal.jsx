import React, { useEffect, useState } from "react";

export default function Terminal({ onComplete, customLines }) {
  const terminalLines = customLines || [
    { text: "> initializing OnSafe system...", speed: 30, delay: 300 },
    { text: "> loading modules...", speed: 40, delay: 300 },
    { text: "> verifying identity...", speed: 80, delay: 800 },
    { text: "> identity: unknown", speed: 80, delay: 800 },
    { text: "> access: restricted", speed: 20, delay: 1000 },
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const handleAccess = () => {
    setGlitch(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => setShowButton(true), 400);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[currentLineIndex];

    if (charIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentLine.text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, currentLine.speed); 
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine.text]);
        setCurrentText("");
        setCharIndex(0);
        setCurrentLineIndex((prev) => prev + 1);
      }, currentLine.delay); 
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLineIndex, terminalLines]);

  return (
    <div className={`fixed inset-0 z-[200] bg-[#0b111a] text-[#00f5ff] font-mono flex items-center justify-center transition-all duration-300 ${glitch ? "animate-glitch" : ""}`}>
      <div className="w-full max-w-2xl p-8 border border-[#00f5ff]/30 rounded-2xl bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,245,255,0.1)] relative overflow-hidden">
        {glitch && <div className="absolute inset-0 bg-[#00f5ff]/10 pointer-events-none" />}
        
        <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <span className="ml-2 text-[10px] text-white/30 tracking-[0.2em] uppercase">onSafe_vulnerability_scanner_v1.0.4</span>
        </div>
        
        <div className="space-y-2 min-h-[200px]">
          {displayedLines.map((line, index) => (
            <p key={index} className="text-sm opacity-80">{line}</p>
          ))}
          <p className="text-sm">
            {currentText}
            {!showButton && <span className="animate-pulse">█</span>}
          </p>
        </div>

        {showButton && (
          <button 
            onClick={handleAccess}
            className="mt-8 px-8 py-3 border border-[#d1b3ff] text-[#d1b3ff] hover:bg-[#d1b3ff] hover:text-black transition duration-300 font-bold tracking-widest block mx-auto relative z-10 text-xs uppercase rounded-lg shadow-[0_0_20px_rgba(209,179,255,0.2)]"
          >
            GENERATE_SECURITY_REPORT
          </button>
        )}
      </div>
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 0.2s infinite;
          text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
        }
      `}</style>
    </div>
  );
}