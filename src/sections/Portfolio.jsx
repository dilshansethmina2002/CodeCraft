import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/*
  Same palette as the hero house and the services section.
  paper #EDF0F6  ink #12162B  slate #6B7390  cobalt #2B3AF7
  Each project borrows a colour from the house: roof terracotta, gold.
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap');
.port { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.port-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
`;

// Project Data
const projects = [
  {
    id: 1,
    title: 'Athukorala Group Unified Management System',
    category: 'Enterprise ERP',
    color: '#C2573F',
    ink: '#fff',
    image: '/projects/unified.png', // Replace with your actual image path
    shortDescription:
      'A comprehensive digital management system digitizing operations across multiple factory departments with real-time analytics.',
    longDescription:
      'An end-to-end enterprise management solution designed to digitize and streamline operations across the Handmade, Packing, Factory, Manufacturing, and Local Sale sections. The system eliminates paper-based bottlenecks and introduces live data tracking for floor management performance, seamlessly integrating automated TC5 regulatory reporting.',
    features: [
      'Real-time operational dashboards using Socket.io',
      'Automated TC5 regulatory report generation',
      'Multi-departmental data synchronization',
      'Role-based access control and performance tracking',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: 2,
    title: 'DK Garage Management System',
    category: 'Business Operations',
    color: '#D4A94A',
    ink: '#12162B',
    image: '/projects/DK.png', // Replace with your actual image path
    shortDescription: 'A robust service and inventory management platform tailored for automotive garage workflows.',
    longDescription:
      'A dedicated management system built to handle the day-to-day operations of an automotive garage. It provides a centralized hub for tracking vehicle repair statuses, managing spare parts inventory, scheduling appointments, and generating automated billing invoices, ensuring a frictionless experience for both mechanics and customers.',
    features: [
      'Live vehicle service status tracking',
      'Automated inventory management and low-stock alerts',
      'Integrated billing and invoice generation',
      'Customer history and appointment scheduling',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS'],
    link: '#',
  },
];

const Arrow = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// A browser window around the screenshot, sitting on a tinted mount in the project's colour.
const Frame = ({ project, large = false }) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-20px_rgba(18,22,43,0.45)] ring-1 ring-[#12162B]/10">
    <div className="flex items-center gap-1.5 border-b border-[#12162B]/10 bg-[#F6F7FB] px-3 py-2.5">
      <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </div>
    <div className={`${large ? 'aspect-video sm:aspect-[21/9]' : 'aspect-[16/10]'} overflow-hidden`} style={{ backgroundColor: `${project.color}22` }}>
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = 'none')}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  </div>
);

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  // Lock page scroll, close on Escape, return focus to the card that opened the modal.
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e) => e.key === 'Escape' && setSelectedProject(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(panelRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      openerRef.current?.focus();
    };
  }, [selectedProject]);

  const openProject = (p, e) => {
    openerRef.current = e.currentTarget;
    setSelectedProject(p);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.port-head', {
          y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        });
        gsap.utils.toArray('.port-row').forEach((row) => {
          gsap.from(row, {
            y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]';

  return (
    <section id="portfolio" ref={sectionRef} className="port scroll-mt-16 bg-[#EDF0F6] text-[#12162B]">
      <style>{FONT_CSS}</style>

      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-24 md:px-12">
        {/* Header */}
        <div className="mb-12 grid gap-4 md:mb-20 md:grid-cols-2 md:items-end md:gap-12">
          <h2 className="port-head port-display text-[clamp(2rem,5.5vw,3.5rem)] leading-[1] tracking-[-0.025em]">Our featured work</h2>
          <p className="port-head max-w-xl text-base leading-relaxed text-[#6B7390] md:text-lg">
            Open a project to see how it was built: the architecture, the features and the technology behind it.
          </p>
        </div>

        {/* Case studies: one project per row, image side alternates */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((p, i) => (
            <article key={p.id} className="port-row grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              {/* Screenshot on a coloured mount */}
              <button
                type="button"
                onClick={(e) => openProject(p, e)}
                aria-label={`Open ${p.title}`}
                className={`group relative block rounded-[2rem] p-3 text-left transition-transform duration-500 hover:-translate-y-1 sm:p-5 ${i % 2 ? 'lg:order-2' : ''} ${focusRing}`}
                style={{ backgroundColor: `${p.color}33` }}
              >
                <Frame project={p} />
              </button>

              <div>
                <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#4B5270]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.category}
                </p>
                <h3 className="port-display mb-4 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.02] tracking-[-0.02em]">{p.title}</h3>
                <p className="mb-6 max-w-md text-base leading-relaxed text-[#6B7390]">{p.shortDescription}</p>

                <ul className="mb-8 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <li key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#4B5270] ring-1 ring-[#12162B]/10">{t}</li>
                  ))}
                  {p.tags.length > 4 && (
                    <li className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#4B5270] ring-1 ring-[#12162B]/10">+{p.tags.length - 4}</li>
                  )}
                </ul>

                <button
                  type="button"
                  onClick={(e) => openProject(p, e)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12162B] px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto ${focusRing}`}
                >
                  View case study <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal: a bottom sheet on phones, a centred panel on larger screens */}
      {selectedProject && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#12162B]/50 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="port-modal-title"
            className="port relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-[#EDF0F6] shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#12162B] shadow-md ring-1 ring-[#12162B]/10 hover:bg-[#F6F7FB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12162B]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-3 pt-16 sm:p-5 sm:pt-5" style={{ backgroundColor: `${selectedProject.color}33` }}>
              <Frame project={selectedProject} large />
            </div>

            <div className="p-6 sm:p-10">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#4B5270]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedProject.color }} />
                {selectedProject.category}
              </p>
              <h2 id="port-modal-title" className="port-display mb-5 text-[clamp(1.8rem,5vw,2.8rem)] leading-[1.02] tracking-[-0.02em]">
                {selectedProject.title}
              </h2>
              <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#4B5270] sm:text-lg">{selectedProject.longDescription}</p>

              <div className="mb-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
                <div>
                  <h3 className="mb-4 border-b border-[#12162B]/10 pb-3 text-base font-bold">What it does</h3>
                  <ul className="space-y-3">
                    {selectedProject.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-[#4B5270]">
                        <svg className="mt-0.5 h-5 w-5 shrink-0" style={{ color: selectedProject.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 border-b border-[#12162B]/10 pb-3 text-base font-bold">Built with</h3>
                  <ul className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <li key={t} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#4B5270] ring-1 ring-[#12162B]/10">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#12162B]/10 pt-6 sm:flex-row">
                <a
                  href={selectedProject.link}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2B3AF7] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(43,58,247,0.6)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]"
                >
                  View live project <Arrow />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-[#12162B]/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]"
                >
                  Back to portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}