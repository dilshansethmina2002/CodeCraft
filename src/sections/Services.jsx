import React from 'react';

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Full-Stack Web Engineering",
      description: "Building highly scalable, responsive applications using modern stacks like MERN. We seamlessly connect dynamic front-ends with robust, secure backend architectures.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 2,
      title: "IoT & System Integration",
      description: "Bridging the physical and digital worlds. We design systems that integrate real-time hardware sensors into comprehensive, user-friendly management dashboards.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Interactive 3D & Experiences",
      description: "Crafting immersive digital environments, dynamic animations, and high-performance, browser-based applications that push the boundaries of standard web design.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase block mb-3">
            // Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Solutions Engineered for Scale
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We deliver comprehensive technical solutions, from the database layer to immersive user interfaces, ensuring your digital presence is fast, reliable, and engaging.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/5 relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500 pointer-events-none"></div>
              
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-slate-800 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}