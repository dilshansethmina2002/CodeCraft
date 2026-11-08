import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/*
  Palette (Light Theme)
  paper #EDF0F6   cobalt #2B3AF7   ink #12162B   slate #6B7390
  ivory #F5F0E1   gold #D4A94A
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap');
.fb { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.fb-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
`;

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Operations Director, TechFlow',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'The custom ERP system they built completely transformed our internal operations. We reduced manual data entry by 80% within the first month of deployment.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Founder, Artisan Coffee Co.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      "Upgrading to their cloud-based POS system was the best decision for our three cafes. It's incredibly fast, intuitive, and the real-time inventory tracking is flawless.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Independent Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      "They took my vision for a personal portfolio and brought it to life with stunning animations and a lightning-fast load time. I've received so many compliments on it!",
    rating: 5,
  },
];

const Stars = ({ n }) => (
  <div className="flex gap-1" role="img" aria-label={`${n} out of 5 stars`}>
    {[...Array(n)].map((_, i) => (
      <svg key={i} className="h-5 w-5 text-[#D4A94A]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Photo with an initials fallback if the image fails to load
const Avatar = ({ t, size = 'h-12 w-12' }) => (
  <span className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4A94A] text-sm font-bold text-[#12162B]`}>
    {t.name.split(' ').map((w) => w[0]).join('')}
    <img
      src={t.image}
      alt=""
      loading="lazy"
      onError={(e) => (e.currentTarget.style.display = 'none')}
      className="absolute inset-0 h-full w-full object-cover"
    />
  </span>
);

export default function Feedback() {
  const sectionRef = useRef(null);
  const [featured, ...others] = testimonials;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.fb-head', {
          y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        });
        gsap.from('.fb-card', {
          y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.fb-grid', start: 'top 88%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="feedback" ref={sectionRef} className="fb relative scroll-mt-16 overflow-hidden bg-[#EDF0F6] text-[#12162B]">
      <style>{FONT_CSS}</style>
      
      {/* Subtle ambient glow adjusted for light mode (faint cobalt) */}
      <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(43,58,247,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:py-24 md:px-12">
        {/* Header */}
        <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-2 md:items-end md:gap-12">
          <h2 className="fb-head fb-display text-[clamp(2rem,5.5vw,3.5rem)] leading-[1] tracking-[-0.025em]">Trusted by innovators</h2>
          <p className="fb-head max-w-xl text-base leading-relaxed text-[#6B7390] md:text-lg">
            Don't just take our word for it. Here is what our clients say about the solutions we built for them.
          </p>
        </div>

        <div className="fb-grid grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:gap-5">
          {/* Featured quote */}
          <figure className="fb-card relative flex flex-col justify-between rounded-3xl bg-[#F5F0E1] p-7 text-[#12162B] shadow-sm sm:p-10 lg:row-span-2">
            <span aria-hidden="true" className="fb-display pointer-events-none absolute right-6 top-2 select-none text-[9rem] leading-none text-[#D4A94A]/30 sm:text-[12rem]">
              &rdquo;
            </span>
            <div className="relative">
              <Stars n={featured.rating} />
              <blockquote className="mt-6 max-w-xl text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.25] tracking-[-0.01em]">
                {featured.content}
              </blockquote>
            </div>
            <figcaption className="relative mt-10 flex items-center gap-4">
              <Avatar t={featured} size="h-14 w-14" />
              <div>
                <p className="font-bold">{featured.name}</p>
                <p className="text-sm text-[#6B7390]">{featured.role}</p>
              </div>
            </figcaption>
          </figure>

          {/* Supporting quotes */}
          {others.map((t) => (
            <figure key={t.id} className="fb-card flex flex-col justify-between rounded-3xl bg-white p-6 ring-1 ring-[#12162B]/5 shadow-[0_4px_20px_-4px_rgba(18,22,43,0.03)] sm:p-8">
              <div>
                <Stars n={t.rating} />
                <blockquote className="mt-4 text-[0.98rem] leading-relaxed text-[#12162B]/80">{t.content}</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar t={t} />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-[#6B7390]">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}