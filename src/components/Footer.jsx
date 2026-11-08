import React from 'react';

/*
  Same palette as the rest of the page: the house at night.
  ink #0C0F1F  ivory #F5F0E1  gold #D4A94A  slate #9AA1BC
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap');
.ft { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.ft-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
`;

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms of service', href: '#' },
  { label: 'Cookie policy', href: '#' },
];

const SOCIAL = [
  {
    label: 'GitHub',
    href: '#',
    d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];

const link =
  'rounded text-[0.95rem] text-[#9AA1BC] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A94A]';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ft relative overflow-hidden bg-[#1A1953] text-white">
      <style>{FONT_CSS}</style>
      {/* lamp glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,194,89,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1280px] px-6 pt-16 md:px-12 md:pt-20">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <a href="#home" className="mb-5 inline-flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A94A]">
              {/* a small house: the page's mark */}
              <svg className="h-9 w-9 text-[#D4A94A]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                <path d="M4 15L16 5l12 10" />
                <path d="M7 13v13h18V13" />
                <path d="M13 26v-7h6v7" />
              </svg>
              <span className="ft-display text-3xl tracking-[-0.02em]">CodeCraft</span>
            </a>
            <p className="mb-8 max-w-sm text-[0.95rem] leading-relaxed text-[#9AA1BC]">
              Engineering high-performance digital solutions, intuitive web applications and robust enterprise systems for the modern era.
            </p>

            <ul className="flex gap-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[#9AA1BC] ring-1 ring-white/15 transition-colors duration-200 hover:bg-[#D4A94A] hover:text-[#0C0F1F] hover:ring-[#D4A94A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A94A]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: side by side on phones */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-2 lg:gap-16">
            <nav aria-label="Footer navigation">
              <h3 className="mb-5 text-sm font-semibold text-white">Navigation</h3>
              <ul className="space-y-3">
                {NAV.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h3 className="mb-5 text-sm font-semibold text-white">Legal</h3>
              <ul className="space-y-3">
                {LEGAL.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-[#9AA1BC] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} CodeCraft. All rights reserved.</p>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <p>
              Designed &amp; engineered with <span className="mx-0.5 text-[#D4A94A] motion-safe:animate-pulse" aria-label="love">♥</span>
            </p>
            <a href="#home" className="inline-flex items-center gap-1.5 rounded font-semibold text-white transition-colors hover:text-[#D4A94A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A94A]">
              Back to top
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped at the bottom edge */}
      <div aria-hidden="true" className="ft-display pointer-events-none -mb-[0.16em] select-none overflow-hidden text-center text-[clamp(3.6rem,19vw,17rem)] leading-[0.8] tracking-[-0.04em] text-white/[0.05]">
        CodeCraft
      </div>
    </footer>
  );
}