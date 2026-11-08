import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/*
  Same palette as the rest of the page.
  paper #EDF0F6  ink #12162B  slate #6B7390  cobalt #2B3AF7  roof #C2573F  lawn #4E8F3E  gold #D4A94A
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap');
.ct { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.ct-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
`;

const field =
  'w-full rounded-2xl border border-[#12162B]/10 bg-[#F6F7FB] px-4 py-3.5 text-base text-[#12162B] placeholder-[#9AA1BC] transition focus:border-[#2B3AF7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B3AF7]/15';

const DETAILS = [
  {
    label: 'Email us',
    value: 'hello@codecraft.com',
    href: 'mailto:hello@codecraft.com',
    color: '#2B3AF7',
    d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: 'Location',
    value: 'Global / Remote',
    color: '#C2573F',
    d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // connect your backend or email service here
    setSent(true);
  };

  const reset = () => {
    setFormData({ name: '', email: '', message: '' });
    setSent(false);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ct-reveal', {
          y: 36, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="contact" ref={sectionRef} className="ct relative scroll-mt-16 overflow-hidden bg-[#EDF0F6] text-[#12162B]">
      <style>{FONT_CSS}</style>
      {/* the hero's sun, a little further down the page */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,232,160,0.55),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-6 py-16 sm:py-24 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        {/* Info */}
        <div className="ct-reveal">
          <h2 className="ct-display mb-5 text-[clamp(2rem,5.5vw,3.5rem)] leading-[1] tracking-[-0.025em]">Ready to start your next project?</h2>
          <p className="mb-10 max-w-md text-base leading-relaxed text-[#6B7390] md:text-lg">
            Whether you have a fully formed idea or just a concept, the CodeCraft team is here to help you build it. Let's make something extraordinary together.
          </p>

          <ul className="space-y-6">
            {DETAILS.map((item) => {
              const body = (
                <>
                  <span className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white sm:h-14 sm:w-14" style={{ backgroundColor: item.color }}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.d} />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm text-[#6B7390]">{item.label}</span>
                    <span className="block break-all text-lg font-semibold sm:break-normal">{item.value}</span>
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="flex items-center rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Form */}
        <div className="ct-reveal rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-35px_rgba(18,22,43,0.4)] ring-1 ring-[#12162B]/5 sm:p-10">
          <div aria-live="polite">
            {sent ? (
              <div className="flex flex-col items-start py-6 sm:py-10">
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#4E8F3E] text-white">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="ct-display mb-3 text-3xl leading-tight tracking-[-0.02em]">Message sent</h3>
                <p className="mb-8 max-w-sm leading-relaxed text-[#6B7390]">
                  Thanks for reaching out{formData.name ? `, ${formData.name.split(' ')[0]}` : ''}. We will get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded-full border border-[#12162B]/20 px-7 py-3.5 font-semibold transition-colors hover:bg-[#F6F7FB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B] sm:w-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">Full name</label>
                  <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={field} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email address</label>
                  <input type="email" id="email" name="email" autoComplete="email" inputMode="email" value={formData.email} onChange={handleChange} required className={field} placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold">Project details</label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className={`${field} resize-none`} placeholder="Tell us about what you want to build..." />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2B3AF7] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(43,58,247,0.6)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]"
                >
                  Send message
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}