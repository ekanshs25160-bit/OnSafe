import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const EventsPage = () => {
    return (
      <div className="bg-[#0b111a] min-h-screen text-[#e6edf3]">
        <Navbar />
        <main className="pt-40 px-[10%]">
          <h1 className="text-7xl font-black mb-12 gradient-text">Ongoing & Upcoming</h1>
          <div className="grid grid-cols-1 gap-12 mb-32">
              {/* Featured Event */}
              <div className="glass p-12 rounded-3xl border-l-[12px] border-cyber flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 h-80 bg-cyber/10 rounded-2xl animate-pulse" />
                  <div className="w-full md:w-1/2">
                      <span className="text-cyber text-sm font-bold uppercase tracking-widest bg-cyber/10 px-4 py-2 rounded-full">Coming Soon</span>
                      <h2 className="text-5xl font-black mt-6 mb-4">Code Quest 2026</h2>
                      <p className="text-[#8b949e] text-lg mb-8">Our flagship 24-hour hackathon is back, bigger and better than ever. Compete with the best minds for a prize pool of $1000.</p>
                      <button className="btn-primary">Register Now</button>
                  </div>
              </div>
  
              {/* Event Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/10 group cursor-pointer">
                          <div className="text-[#8b949e] text-xs font-bold mb-4">MARCH 25, 2026</div>
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-tech">Workshop: React + Framer</h3>
                          <p className="text-[#8b949e] text-sm">Learn advanced UI animations with our core design team.</p>
                      </div>
                  ))}
              </div>
          </div>
        </main>
        <Footer />
      </div>
    );
};

export default EventsPage;
