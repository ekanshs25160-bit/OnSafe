import React from "react";

const Card = ({
  id,
  title,
  description,
  icon,
  color = "text-primary",
  borderColor = "border-primary/10",
  className = "",
  children
}) => {
  return (
    <div 
      className={`group bg-[#13171f] border ${borderColor} p-10 rounded-[2.5rem] h-full flex flex-col justify-between hover:bg-[#1a1f29] transition-all duration-500 cursor-pointer relative overflow-hidden shadow-2xl ${className}`}
    >
      {/* Project ID (Top Right) */}
      {id && (
        <span className="absolute top-10 right-10 font-mono text-[10px] text-white/20 tracking-widest font-bold">
          {id}
        </span>
      )}

      {/* Icon and Title Container */}
      <div className="space-y-12">
        {icon && (
          <span className={`material-symbols-outlined text-4xl ${color} filter drop-shadow-md`}>
            {icon}
          </span>
        )}
        
        <div className="space-y-4">
          <h3 className="text-white text-3xl font-black font-space tracking-tight group-hover:text-secondary transition-colors uppercase">
            {title}
          </h3>
          <p className="text-white/40 font-inter text-sm leading-relaxed max-w-xs group-hover:text-white/60 transition-colors">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative Corner Bracket */}
      <div className={`absolute -bottom-1 -right-1 w-12 h-12 border-b-2 border-r-2 ${borderColor} rounded-br-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      
      {children}
    </div>
  );
};

export default Card;

