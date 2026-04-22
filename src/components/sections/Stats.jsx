import React from 'react';

const Stats = ({ stats = [
    { label: "Projects_Ongoing", value: "342" },
    { label: "Total_Members", value: "2.4k+" },
    { label: "Uptime", value: "99.9%" }
] }) => {
  return (
    <section className="stats flex flex-wrap justify-between gap-12 py-20 px-[10%] bg-surface-mid border-y border-white/5">
      {stats.map((stat, i) => (
        <div key={i} className="stat-item flex flex-col items-start min-w-[150px]">
          <span className="text-secondary font-mono text-[10px] uppercase tracking-widest mb-2">
            // {stat.label}
          </span>
          <span className="text-5xl md:text-6xl text-white font-black font-space">
            {stat.value}
          </span>
        </div>
      ))}
    </section>
  );
};

export default Stats;

