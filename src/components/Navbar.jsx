import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Change to true if you want the mobile dropdown open by default

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Works', href: '#works' },
    { name: 'Feedback', href: '#feedback' },
  ];

  return (
    // Fixed wrapper to keep it top-center and above all content
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] md:w-auto flex flex-col items-center font-sans">

      {/* === LIGHT GLASSMORPHISM TOP NAV PILL === */}
      <nav className="relative px-6 md:px-8 py-3 rounded-full bg-white/70 border border-gray-200/50 backdrop-blur-md flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full md:w-auto transition-all">

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Vertical Divider */}
          <div className="w-[1px] h-5 bg-gray-300 mx-1" />

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="text-gray-900 font-semibold hover:text-indigo-600 transition-colors whitespace-nowrap"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Branding (Visible only on small screens inside the pill) */}
        <div className="md:hidden flex items-center gap-2 text-gray-900 font-bold tracking-tight text-base">
          <img
            src="/company logo.png"
            alt="CodeCraft Logo"
            className="w-6 h-6 object-contain"
          />
          CodeCraft
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors"
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
      <div
        className={`md:hidden mt-2 w-full bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out shadow-xl ${isOpen ? 'max-h-72 opacity-100 py-5' : 'max-h-0 opacity-0 py-0'
          }`}
      >
        <div className="flex flex-col items-center gap-5 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-indigo-600 transition-colors w-full text-center"
            >
              {link.name}
            </a>
          ))}

          {/* Horizontal Divider */}
          <div className="w-12 h-[1px] bg-gray-200" />

          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-900 font-bold hover:text-indigo-600 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>

    </div>
  );
}