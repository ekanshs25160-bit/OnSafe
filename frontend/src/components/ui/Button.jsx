import React from 'react';

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "px-8 py-3 font-bold transition-all duration-300 uppercase tracking-wider font-space";
  const variants = {
    primary: "bg-primary text-[#0e0e0e] hover:shadow-[0_0_20px_rgba(191,0,255,0.4)] active:scale-95",
    outline: "border border-secondary/30 text-secondary hover:border-secondary hover:shadow-[0_0_15px_rgba(0,245,255,0.25)] active:scale-95",
    ghost: "text-tertiary hover:opacity-80 flex items-center gap-2"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className} outline-none cursor-pointer`} 
      {...props}
    >
      {children}
      {variant === 'ghost' && <span className="animate-pulse">_</span>}
    </button>
  );
};

export default Button;

