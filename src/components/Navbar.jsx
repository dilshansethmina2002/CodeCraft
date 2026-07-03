import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    // Fixed wrapper to keep it top-center and above all GSAP animations
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto flex flex-col items-center">
      
      {/* === GLASSMORPHISM TOP NAV PILL === */}
      <nav className="relative px-6 md:px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-2xl w-full md:w-auto">
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
          
          {/* Vertical Divider */}
          <div className="w-[1px] h-5 bg-white/20 mx-2" />
          
          {/* Desktop CTA */}
          <a href="#contact" className="text-white hover:text-emerald-400 transition-colors whitespace-nowrap tracking-wide">
            Get in Touch
          </a>
        </div>

        {/* Mobile Branding (Visible only on small screens inside the pill) */}
        <div className="md:hidden text-white font-bold tracking-widest text-xs uppercase">
          Code Craft
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* === MOBILE DROPDOWN MENU === */}
      {/* A detached glass container that slides down below the pill on mobile */}
      <div 
        className={`md:hidden mt-2 w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100 py-4 shadow-2xl' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col items-center gap-5 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Horizontal Divider */}
          <div className="w-12 h-[1px] bg-white/20" />
          
          <a 
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-emerald-400 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
      
    </div>
  );
}