import React from "react";
import Button from "../ui/Button";

const EventsSection = () => {
  const events = [
    {
      name: "VOID_RUN // GLOBAL_CTF",
      date: "04.15 - 04.17",
      desc: "48-hour competitive capture-the-flag focusing on zero-day exploit discovery.",
      type: "COMPETITIVE"
    },
    {
      name: "KERNEL_HARDENING // WKSHOP",
      date: "05.02",
      desc: "In-depth technical session on securing Linux kernels for high-availability nodes.",
      type: "TECHNICAL"
    },
    {
      name: "NODE_SUMMIT // ANNUAL",
      date: "12.12",
      desc: "Year-end gathering to discuss next-gen cryptographic standards and mesh protocols.",
      type: "COMMUNITY"
    }
  ];

  return (
    <section className="events-section py-24 px-[10%] bg-surface-low border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-secondary font-mono text-sm tracking-[0.3em] font-bold mb-4">
              02 // SCHEDULED_OPERATIONS
          </h2>
          <h3 className="text-5xl md:text-6xl font-black font-space uppercase">
            UPCOMING<span className="text-primary">_EVENTS</span>
          </h3>
        </div>
        <Button variant="outline">VIEW_FULL_INTEL</Button>
      </div>

      <div className="flex flex-col gap-px bg-white/5 border border-white/5">
        {events.map((event, i) => (
          <div key={i} className="group bg-surface-mid p-8 md:p-12 flex flex-col md:flex-row justify-between items-center transition-all hover:bg-surface-high cursor-pointer">
            <div className="flex flex-col md:flex-row items-center gap-12 w-full">
                <div className="text-primary font-mono text-lg font-bold tracking-tighter bg-primary/10 px-6 py-2">
                    {event.date}
                </div>
                <div>
                    <h4 className="text-2xl font-bold font-space group-hover:text-secondary transition-colors uppercase mb-2">
                        {event.name}
                    </h4>
                    <p className="text-text-secondary font-inter text-sm max-w-xl">
                        {event.desc}
                    </p>
                </div>
            </div>
            <div className="mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-tertiary font-mono text-xs font-bold ring-1 ring-tertiary/30 px-3 py-1 uppercase">{event.type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;

