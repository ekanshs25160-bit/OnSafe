import { useEffect, useState } from "react";

const lines = [

  { text: "> initializing OnSafe system...", speed: 30, delay: 300 },
  { text: "> loading modules...", speed: 40, delay: 300 },
  { text: "> verifying identity...", speed: 80, delay: 800 },
  { text: "> identity: unknown", speed: 80, delay: 800 },
  { text: "> access: restricted", speed: 20, delay: 1000 },
];


export default function Terminal({ onComplete }) {
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
    if (currentLineIndex >= lines.length) {
      const timeout = setTimeout(() => setShowButton(true), 1000);
      return () => clearTimeout(timeout);
    }

    const currentLine = lines[currentLineIndex];

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
  }, [charIndex, currentLineIndex]);

  return (
    <div className={`bg-black text-green-400 font-mono h-screen flex items-center justify-center transition-all duration-300 ${glitch ? "animate-glitch" : ""}`}>
      <div className="w-[600px] p-6 border border-green-500 rounded-lg shadow-lg relative overflow-hidden">
        {glitch && <div className="absolute inset-0 bg-green-500/10 pointer-events-none" />}
        
        {displayedLines.map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}

        <p>
          {currentText}
          {!showButton && <span className="animate-pulse">█</span>}
        </p>

        {showButton && (
          <button 
            // onClick={onComplete} 
            onClick={handleAccess}
            className="mt-6 px-6 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition duration-300 font-bold tracking-widest block mx-auto relative z-10"
          >
            BYPASS SECURITY
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