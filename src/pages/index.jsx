import { useEffect, useState } from "react";
import Terminal from "../components/ui/Terminal";

export default function Entry({ onComplete }) {
  const [entered, setEntered] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("onsafe_Visited");
    if (hasVisited) {
      onComplete();
    }
  }, [onComplete]);

  const handleTerminalComplete = () => {
    localStorage.setItem("onsafe_Visited", "true");
    setEntered(true);
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      onComplete();
    }, 1000);
  };

  return (
    <>
      {!entered ? (
        <Terminal onComplete={handleTerminalComplete} />
      ) : (
      <div
        className={`bg-black text-green-400 font-mono h-screen flex items-center justify-center ${
          glitch ? "animate-glitch" : ""
        }`}
      >
        {/* <h1 className="text-6xl text-white font-space uppercase drop-shadow-[0_0_15px_rgba(191,0,255,0.3)]">
          Welcome to OnSafe 🚀
        </h1> */}
      </div>

      )}

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 0.2s infinite;
          text-shadow: 2px 0 #00fff9, -2px 0 #ff00c1;
        }
      `}</style>
    </>
  );
}
