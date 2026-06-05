import React, { useState, useEffect } from 'react';
import { projects } from '../data/project';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-24 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Our Featured Works</h2>
          <p className="text-neutral-400 max-w-xl">
            Click on any project to explore the architecture, features, and technologies we used to bring it to life.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] flex flex-col h-full overflow-hidden"
            >
              {/* Project Image Container */}
              <div className="w-full aspect-video overflow-hidden border-b border-slate-800 bg-slate-950 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Card Content Wrapper */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed flex-grow">
                  {project.shortDescription}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-slate-950 text-neutral-300 px-3 py-1 rounded-full border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Hint */}
                <div className="pt-4 border-t border-slate-800 flex items-center text-emerald-500 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                  View Details 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL OVERLAY --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-neutral-400 hover:text-white rounded-full flex items-center justify-center transition-colors z-20 border border-slate-800"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Large Modal Image Header */}
            <div className="w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-slate-900 border-b border-slate-800 relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-10">
              <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-2 block">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                {selectedProject.title}
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  {/* Features List */}
                  <div>
                    <h4 className="text-white font-semibold mb-4 text-base border-b border-slate-800 pb-2">Key Features</h4>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-neutral-400 text-sm">
                          <svg className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-white font-semibold mb-4 text-base border-b border-slate-800 pb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4 mt-auto">
                <a 
                  href={selectedProject.link}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-black font-bold hover:from-emerald-300 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center text-sm"
                >
                  View Live Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors text-sm"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>

          </div>
         </div>
      )}
    </section>
  );
}