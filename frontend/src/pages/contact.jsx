import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const ContactPage = () => {
    return (
      <div className="bg-[#0b111a] min-h-screen text-[#e6edf3]">
        <Navbar />
        <main className="pt-40 px-[10%] mb-32">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-20">
              <div className="w-full md:w-1/2">
                  <h1 className="text-7xl font-black mb-12 gradient-text">Connect<br />with SCS</h1>
                  <p className="text-[#8b949e] text-xl max-w-lg font-medium leading-relaxed mb-12">Looking to collaborate on a project or join the society? Send us a message and we'll get back to you shortly.</p>
                  
                  <div className="flex flex-col gap-8 opacity-0 fade-in-up delay-2">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-[#00ff9c1a] rounded-full flex items-center justify-center text-cyber text-2xl font-bold">@</div>
                          <div>
                              <div className="text-[#8b949e] text-xs font-bold uppercase tracking-widest mb-1">Email</div>
                              <div className="text-xl font-bold">contact@onsafe.edu</div>
                          </div>
                      </div>
                      <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-[#00d4ff1a] rounded-full flex items-center justify-center text-tech text-2xl font-bold">⌘</div>
                          <div>
                              <div className="text-[#8b949e] text-xs font-bold uppercase tracking-widest mb-1">Office</div>
                              <div className="text-xl font-bold">Computer Science Lab, Room 102</div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Form Card */}
              <div className="w-full md:w-1/2 glass p-12 rounded-3xl border border-white/5 relative bg-white/5 shadow-2xl">
                    <form className="flex flex-col gap-8">
                        <div>
                            <label className="text-[#8b949e] text-xs font-bold uppercase tracking-widest mb-2 block">Your Name</label>
                            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-cyber outline-none transition-all" placeholder="Enter name" />
                        </div>
                        <div>
                            <label className="text-[#8b949e] text-xs font-bold uppercase tracking-widest mb-2 block">Your Email</label>
                            <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-cyber outline-none transition-all" placeholder="email@address.com" />
                        </div>
                        <div>
                            <label className="text-[#8b949e] text-xs font-bold uppercase tracking-widest mb-2 block">Message</label>
                            <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 h-40 text-white focus:border-cyber outline-none transition-all resize-none" placeholder="Tell us more about your inquiry..." />
                        </div>
                        <button type="submit" className="btn-primary w-full py-6 mt-4">Send Message</button>
                    </form>
              </div>
          </div>
        </main>
        <Footer />
      </div>
    );
};

export default ContactPage;
