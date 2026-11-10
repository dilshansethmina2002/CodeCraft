import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/*
  Code Craft Hero — Light Paper & Cobalt Edition
  - Mobile (< lg): Pure typography, CTA buttons, and badge (zero right-side elements)
  - Desktop (>= lg): Full 3D Interactive Floating Code Studio on the right
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=JetBrains+Mono:wght@400;500;600&display=swap');
.craft-hero { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.craft-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
.craft-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; }
`;

const HEADLINE = ['Build with', 'intention.'];

const CODE_LINES = [
  { num: '01', indent: 0, content: <><span className="text-[#2B3AF7] font-semibold">import</span> {'{ Engine, Scale }'} <span className="text-[#2B3AF7] font-semibold">from</span> <span className="text-[#B9503A]">'@codecraft/core'</span>;</> },
  { num: '02', indent: 0, content: <>&nbsp;</> },
  { num: '03', indent: 0, content: <><span className="text-[#2B3AF7] font-semibold">export async function</span> <span className="text-[#0F766E] font-semibold">launchProduct</span>(vision) {'{'}</> },
  { num: '04', indent: 1, content: <><span className="text-[#8C94B0]">// Engineered for speed, built to scale</span></> },
  { num: '05', indent: 1, content: <><span className="text-[#2B3AF7] font-semibold">const</span> app = <span className="text-[#2B3AF7] font-semibold">await</span> Engine.<span className="text-[#0F766E] font-semibold">architect</span>({'{'}</> },
  { num: '06', indent: 2, content: <>design: <span className="text-[#B9503A]">'pixel-perfect'</span>,</> },
  { num: '07', indent: 2, content: <>performance: <span className="text-[#7C3AED] font-semibold">99.98</span>,</> },
  { num: '08', indent: 2, content: <>security: <span className="text-[#B9503A]">'enterprise-grade'</span>,</> },
  { num: '09', indent: 1, content: <>{'});'}</> },
  { num: '10', indent: 0, content: <>&nbsp;</> },
  { num: '11', indent: 1, content: <><span className="text-[#2B3AF7] font-semibold">return</span> Scale.<span className="text-[#0F766E] font-semibold">deploy</span>(app, {'{ edge: '}<span className="text-[#2B3AF7] font-semibold">true</span>{' }'});</> },
  { num: '12', indent: 0, content: <>{'}'}</> },
];

const STATS = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<40ms', label: 'Global Latency' },
  { value: '3.4x', label: 'Faster Shipping' },
];

export default function CraftingHero() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const floatRef = useRef(null);
  const badgeTopRef = useRef(null);
  const badgeBotRef = useRef(null);
  const sunRef = useRef(null);
  const reduced = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reduced.current = false;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Headline & Copy entrance
        tl.from('.craft-char', {
          yPercent: 115,
          rotate: 5,
          duration: 1.05,
          stagger: 0.03,
          ease: 'power4.out',
        }, 0.15)
          .from('.craft-fade', {
            opacity: 0,
            y: 14,
            duration: 0.75,
            stagger: 0.08,
          }, 0.65);

        // Desktop-only animations (only run when cardRef exists and is visible)
        if (cardRef.current) {
          tl.from(cardRef.current, {
            opacity: 0,
            y: 40,
            rotationX: 12,
            rotationY: -12,
            scale: 0.94,
            duration: 1.1,
            ease: 'power3.out',
          }, 0.3)
            .from('.craft-code-line', {
              opacity: 0,
              x: -14,
              duration: 0.45,
              stagger: 0.05,
              ease: 'power2.out',
            }, 0.65)
            .from([badgeTopRef.current, badgeBotRef.current], {
              opacity: 0,
              scale: 0.85,
              y: 15,
              duration: 0.7,
              stagger: 0.15,
              ease: 'back.out(1.6)',
            }, 1.1);

          gsap.to(floatRef.current, {
            y: -10,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          gsap.to('.craft-caret', {
            opacity: 0,
            duration: 0.55,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)',
          });
        }

        gsap.to(sunRef.current, {
          scale: 1.12,
          opacity: 0.9,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        reduced.current = true;
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  // Desktop 3D parallax tilt on pointer move
  const onMove = contextSafe((e) => {
    if (reduced.current || window.innerWidth < 1024) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: nx * 8,
        rotationX: -ny * 8,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (badgeTopRef.current) {
      gsap.to(badgeTopRef.current, {
        x: nx * 16,
        y: ny * 12,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (badgeBotRef.current) {
      gsap.to(badgeBotRef.current, {
        x: nx * -14,
        y: ny * -10,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  });

  const onLeave = contextSafe(() => {
    if (reduced.current || window.innerWidth < 1024) return;
    gsap.to([cardRef.current, badgeTopRef.current, badgeBotRef.current], {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  return (
    <div
      ref={rootRef}
      className="craft-hero relative min-h-screen overflow-hidden bg-[#EDF0F6] text-[#12162B] selection:bg-[#2B3AF7] selection:text-white"
    >
      <style>{FONT_CSS}</style>

      {/* Subtle architectural paper grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(18,22,43,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,22,43,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Warm golden-hour sun aura */}
      <div
        ref={sunRef}
        className="pointer-events-none absolute -top-16 right-4 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,226,140,0.65)_0%,rgba(43,58,247,0.08)_55%,transparent_75%)] blur-2xl sm:right-8 sm:h-[540px] sm:w-[540px]"
      />

      <main className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-8 px-6 pb-16 pt-20 sm:py-20 md:px-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        
        {/* Left Column: Clean & Focused Copy on Mobile, Expanded on Desktop */}
        <section className="relative z-10 max-w-2xl lg:max-w-none">
          {/* Top Brand Pill */}
          <div className="craft-fade mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#12162B]/10 bg-white/85 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#12162B] shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#2B3AF7]" />
            <span>Code Craft &bull; We Code, You Grow</span>
          </div>

          {/* Kinetic Headline */}
          <h1
            aria-label={HEADLINE.join(' ')}
            className="craft-display mb-8 text-[clamp(3.3rem,14vw,9.2rem)] leading-[0.86] tracking-[-0.035em]"
          >
            {HEADLINE.map((line, lineIdx) => (
              <span
                key={line}
                aria-hidden="true"
                className={`-mb-[0.06em] block overflow-hidden pb-[0.1em] ${
                  lineIdx === 1 ? 'text-[#2B3AF7]' : 'text-[#12162B]'
                }`}
              >
                {[...line].map((ch, i) => (
                  <span key={i} className="craft-char inline-block will-change-transform">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="craft-fade mb-10 max-w-[32rem] text-lg leading-relaxed text-[#6B7390] md:text-xl">
            Craft is care at the level of detail. Sketch it, shape it and ship it with tools that stay out of your way.
          </p>

          <div className="craft-fade mb-14 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <button className="w-full rounded-full bg-[#2B3AF7] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(43,58,247,0.6)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B] sm:w-auto">
              Start crafting
            </button>
            <button className="w-full rounded-full border border-[#12162B]/20 bg-white/60 px-8 py-4 font-semibold text-[#12162B] transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B] sm:w-auto">
              Watch a build
            </button>
          </div>

          <p className="craft-fade max-w-[26rem] border-l-2 border-[#E0A53A] pl-4 text-sm leading-relaxed text-[#6B7390]">
            <span className="font-semibold text-[#12162B]">craft</span> (verb) to make something with skill and close attention to detail.
          </p>
        </section>

        {/* ============================================================
            DESKTOP-ONLY RIGHT COLUMN (Hidden on mobile via 'hidden lg:flex')
           ============================================================ */}
        <section
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative hidden items-center justify-center py-6 select-none lg:flex"
          style={{ perspective: '1400px' }}
          aria-label="Interactive Code Craft studio preview"
        >
          <div ref={floatRef} className="relative w-full max-w-[540px]" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Top-Right Floating Pill: Live Status */}
            <div
              ref={badgeTopRef}
              className="craft-mono absolute -right-6 -top-6 z-20 flex items-center gap-2.5 rounded-xl border border-[#12162B]/10 bg-white/95 px-4 py-2.5 text-xs shadow-[0_12px_30px_-6px_rgba(18,22,43,0.12)] backdrop-blur-md"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[#6B7390]">status:</span>
              <span className="font-semibold text-[#12162B]">production_ready</span>
            </div>

            {/* Main 3D Daylight Studio Card */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-2xl border border-[#12162B]/10 bg-white/90 shadow-[0_30px_70px_-15px_rgba(18,22,43,0.16),0_0_0_1px_rgba(255,255,255,0.8)_inset] backdrop-blur-xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#12162B]/10 bg-[#F7F9FC] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="craft-mono text-xs font-medium text-[#6B7390]">
                  codecraft / <span className="font-semibold text-[#2B3AF7]">architecture.ts</span>
                </span>
                <span className="craft-mono rounded-md bg-[#2B3AF7]/10 px-2 py-0.5 text-[10px] font-semibold text-[#2B3AF7]">
                  v2.4
                </span>
              </div>

              {/* Code Editor Body */}
              <div className="craft-mono space-y-1.5 px-7 py-6 text-sm leading-relaxed">
                {CODE_LINES.map((line) => (
                  <div key={line.num} className="craft-code-line flex items-center">
                    <span className="w-8 shrink-0 select-none text-[#A0A8C0]">{line.num}</span>
                    <div style={{ paddingLeft: `${line.indent * 1.25}rem` }} className="text-[#12162B]">
                      {line.content}
                    </div>
                  </div>
                ))}

                {/* Active Prompt Line */}
                <div className="craft-code-line flex items-center pt-2 font-medium text-[#2B3AF7]">
                  <span className="w-8 shrink-0 select-none text-[#A0A8C0]">13</span>
                  <span>&gt; Ready to ship your next release</span>
                  <span className="craft-caret ml-1.5 inline-block h-4 w-2 bg-[#2B3AF7]" />
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-3 divide-x divide-[#12162B]/10 border-t border-[#12162B]/10 bg-[#F7F9FC]">
                {STATS.map((stat) => (
                  <div key={stat.label} className="px-4 py-3.5 text-center">
                    <div className="craft-display text-2xl text-[#12162B]">{stat.value}</div>
                    <div className="craft-mono mt-0.5 text-[11px] text-[#6B7390]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-Left Floating Badge */}
            <div
              ref={badgeBotRef}
              className="absolute -bottom-7 -left-6 flex items-center justify-between gap-4 rounded-xl border border-[#12162B]/10 bg-white/95 px-5 py-3.5 shadow-[0_15px_35px_-8px_rgba(18,22,43,0.14)] backdrop-blur-md"
              style={{ transform: 'translateZ(35px)' }}
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#2B3AF7]">
                  Clean Architecture
                </div>
                <div className="text-sm font-medium text-[#12162B]">
                  Zero bloat. Built for modern web standards.
                </div>
              </div>
              <div className="craft-mono flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2B3AF7] text-sm font-bold text-white shadow-md shadow-[#2B3AF7]/30">
                {'</>'}
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}