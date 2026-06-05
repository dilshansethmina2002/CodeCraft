import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase block mb-4">
          // Welcome to the Future of Software
        </span>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6">
          We Craft Digital <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
            Masterpieces
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          Code Craft specializes in building high-performance web applications, robust enterprise systems, and cutting-edge digital solutions tailored to elevate your business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-xl bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors duration-200 shadow-lg shadow-emerald-500/20"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold border border-slate-700 hover:bg-slate-700 transition-colors duration-200"
          >
            Let's Collaborate
          </a>
        </div>
      </div>
    </section>
  );
}