import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/*
  Same world as the hero house: every service takes a colour from a part of the build.
  paper #EDF0F6  ink #12162B  slate #6B7390  cobalt #2B3AF7
  roof #C2573F  gold #D4A94A  lawn #4E8F3E  glass #4F8DB8  door #7B4B2A
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap');
.svc { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.svc-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
`;

const Icon = ({ d }) => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
  </svg>
);

const SERVICES = [
  {
    id: 'web', wide: true,
    title: 'Full-stack web engineering',
    color: '#2B3AF7',
    ink: '#fff',
    description:
      'Scalable, responsive applications built on modern stacks like MERN. We connect dynamic front-ends to robust, secure backends.',
    d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    id: 'erp',
    title: 'Enterprise ERP systems',
    color: '#C2573F',
    ink: '#fff',
    description:
      'Custom ERP software that streamlines your operations, joins up your internal processes and keeps data tidy across every department.',
    d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
  {
    id: 'pos',
    title: 'Custom POS systems',
    color: '#D4A94A',
    ink: '#12162B',
    description:
      'Modern cloud point-of-sale software for retail and hospitality, with smooth transactions and real-time inventory tracking.',
    d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  },
  {
    id: 'shop', wide: true,
    title: 'Product and e-commerce',
    color: '#4E8F3E',
    ink: '#fff',
    description:
      'Product landing pages and full e-commerce platforms designed to convert visitors into customers and grow your reach.',
    d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
  {
    id: 'folio',
    title: 'Portfolios and personal sites',
    color: '#4F8DB8',
    ink: '#fff',
    description:
      'Fast, beautiful personal websites that show off your work, your resume and your professional brand.',
    d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    id: 'invite', wide: true,
    title: 'Digital invitation cards',
    color: '#7B4B2A',
    ink: '#fff',
    description:
      'Interactive invitations for weddings, corporate events and parties, with custom animation and built-in RSVP tracking.',
    d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.svc-head', {
          y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        });
        gsap.from('.svc-card', {
          y: 36, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 90%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="services" ref={sectionRef} className="svc scroll-mt-16 border-t border-[#12162B]/10 bg-[#EDF0F6] text-[#12162B]">
      <style>{FONT_CSS}</style>

      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-24 md:px-12">
        {/* Header: a section title, not a hero */}
        <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-2 md:items-end md:gap-12">
          <h2 className="svc-head svc-display text-[clamp(2rem,5.5vw,3.5rem)] leading-[1] tracking-[-0.025em]">
            Solutions engineered for scale
          </h2>
          <p className="svc-head max-w-xl text-base leading-relaxed text-[#6B7390] md:text-lg">
            From the database layer to the interface people touch, we build digital products that are fast, reliable and a pleasure to use.
          </p>
        </div>

        {/* Services: wide and narrow cards in a staggered grid */}
        <ul className="svc-grid grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((s) => (
            <li
              key={s.id}
              className={`svc-card group relative overflow-hidden rounded-3xl border bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${s.wide ? 'lg:col-span-2' : ''}`}
              style={{ borderColor: `${s.color}30`, boxShadow: `inset 0 0 0 100px ${s.color}08` }}
            >
              {/* oversized icon as a quiet watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -right-4 h-44 w-44 opacity-[0.08] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 [&_svg]:h-full [&_svg]:w-full"
                style={{ color: s.color }}
              >
                <Icon d={s.d} />
              </span>

              <span
                className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm sm:mb-8 sm:h-14 sm:w-14"
                style={{ backgroundColor: s.color, color: s.ink }}
              >
                <Icon d={s.d} />
              </span>

              <h3 className="svc-display relative mb-3 text-[1.6rem] leading-[1.05] tracking-[-0.015em] sm:text-[1.9rem]">{s.title}</h3>
              <p className={`relative text-[0.95rem] leading-relaxed text-[#4B5270] ${s.wide ? 'max-w-lg' : 'max-w-sm'}`}>{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}