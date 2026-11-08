import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Project Data
const projects = [
  {
    id: 1,
    title: "Athukorala Group Unified Management System",
    category: "Enterprise ERP",
    image: "/projects/unified.png", // Replace with your actual image path
    shortDescription: "A comprehensive digital management system digitizing operations across multiple factory departments with real-time analytics.",
    longDescription: "An end-to-end enterprise management solution designed to digitize and streamline operations across the Handmade, Packing, Factory, Manufacturing, and Local Sale sections. The system eliminates paper-based bottlenecks and introduces live data tracking for floor management performance, seamlessly integrating automated TC5 regulatory reporting.",
    features: [
      "Real-time operational dashboards using Socket.io",
      "Automated TC5 regulatory report generation",
      "Multi-departmental data synchronization",
      "Role-based access control and performance tracking"
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 2,
    title: "DK Garage Management System",
    category: "Business Operations",
    image: "/projects/DK.png", // Replace with your actual image path
    shortDescription: "A robust service and inventory management platform tailored for automotive garage workflows.",
    longDescription: "A dedicated management system built to handle the day-to-day operations of an automotive garage. It provides a centralized hub for tracking vehicle repair statuses, managing spare parts inventory, scheduling appointments, and generating automated billing invoices, ensuring a frictionless experience for both mechanics and customers.",
    features: [
      "Live vehicle service status tracking",
      "Automated inventory management and low-stock alerts",
      "Integrated billing and invoice generation",
      "Customer history and appointment scheduling"
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
    link: "#"
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Handle body scroll lock for modal
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  // GSAP Scroll Animations
  useGSAP(() => {
    // Animate Header Elements
    gsap.fromTo(headerRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    // Staggered Cards Reveal
    gsap.fromTo('.portfolio-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 90%',
          once: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-[#fafafa] relative z-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-20">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
            <span>showcase</span>
            <span className="text-indigo-400 font-normal">/ gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our Featured Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Click on any project to explore the architecture, features, and technologies we used to shape raw ideas into powerful digital experiences.
          </p>
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="portfolio-card opacity-0 group cursor-pointer relative bg-white border border-gray-100 rounded-3xl p-4 hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
            >
              {/* Project Image Container */}
              <div className="w-full aspect-video overflow-hidden rounded-2xl bg-gray-50 relative mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Subtle overlay gradient on hover */}
                <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-500"></div>
              </div>

              {/* Card Content */}
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <div className="w-max bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-4">
                  {project.category}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                  {project.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Hint */}
                <div className="pt-4 border-t border-gray-100 flex items-center text-indigo-600 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-auto">
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-100 rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-full flex items-center justify-center transition-colors z-20 border border-gray-200 shadow-sm"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Large Modal Image Header */}
            <div className="w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-gray-50 relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90"></div>
            </div>

            {/* Modal Body Content */}
            <div className="p-8 sm:p-12 -mt-20 relative z-10">
              <span className="w-max bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 block">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                {selectedProject.title}
              </h2>

              <div className="max-w-none">
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                  {selectedProject.longDescription}
                </p>

                <div className="grid sm:grid-cols-2 gap-10 mb-10">
                  {/* Features List */}
                  <div>
                    <h4 className="text-gray-900 font-bold mb-5 text-base border-b border-gray-100 pb-3">Key Features</h4>
                    <ul className="space-y-4">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm">
                          <svg className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-gray-900 font-bold mb-5 text-base border-b border-gray-100 pb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4 mt-auto">
                <a
                  href={selectedProject.link}
                  className="px-6 py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all shadow-lg shadow-gray-900/20 flex items-center text-sm"
                >
                  View Live Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-sm"
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