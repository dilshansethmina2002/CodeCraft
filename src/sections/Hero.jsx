import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/*
  Palette (a house at golden hour)
  paper #EDF0F6  ink #12162B  slate #6B7390  cobalt #2B3AF7 (buttons)
  walls #F3E9D6  roof #B9503A  brick #A8503A  door #7B4B2A  lawn #8CC063  glass #6EA6CC  lamp #F5C259
  Type: Bricolage Grotesque
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap');
.craft-hero { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.craft-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
`;

const HEADLINE = ['Build with', 'intention.'];

/* ---------- 3D helpers ----------
   Scene units are px on a 420 x 420 lawn. x = right, y = toward the viewer, z = up.
   The sun sits front-right, so each face of a box gets its own darkness. */
const SHADE = { top: 0, front: 0.05, right: 0.12, back: 0.3, left: 0.26 };

function Block({ b, innerRef }) {
  const { x, y, w, d, h, z0 = 0, color, side, top } = b;
  const face = (kind, pattern) => ({
    backgroundColor: color,
    backgroundImage: pattern || undefined,
    boxShadow: `inset 0 0 0 999px rgba(0,0,0,${SHADE[kind]})`,
  });
  const z = `translateZ(${z0}px)`;
  return (
    <div ref={innerRef} className="absolute" style={{ left: x, top: y, width: w, height: d, transformStyle: 'preserve-3d' }}>
      <div className="absolute" style={{ ...face('top', top), left: 0, top: 0, width: w, height: d, transform: `translateZ(${z0 + h}px)` }} />
      <div className="absolute" style={{ ...face('front', side), left: 0, top: d, width: w, height: h, transformOrigin: '0 0', transform: `${z} rotateX(90deg)` }} />
      <div className="absolute" style={{ ...face('back', side), left: 0, top: 0, width: w, height: h, transformOrigin: '0 0', transform: `${z} rotateX(90deg)` }} />
      <div className="absolute" style={{ ...face('right', side), left: w, top: 0, width: h, height: d, transformOrigin: '0 0', transform: `${z} rotateY(-90deg)` }} />
      <div className="absolute" style={{ ...face('left', side), left: 0, top: 0, width: h, height: d, transformOrigin: '0 0', transform: `${z} rotateY(-90deg)` }} />
    </div>
  );
}

const Group = React.forwardRef(({ children }, ref) => (
  <div ref={ref} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
    {children}
  </div>
));

// Upright decal on the front wall (faces the viewer).
const FrontDecal = ({ x, y = 300.5, w, h, z0, children, className = '' }) => (
  <div
    className={`absolute ${className}`}
    style={{ left: x, top: y, width: w, height: h, transformOrigin: '0 0', transform: `translateZ(${z0 + h}px) rotateX(-90deg)` }}
  >
    {children}
  </div>
);

const MULLION = 'linear-gradient(#fff,#fff) center/100% 4px no-repeat, linear-gradient(#fff,#fff) center/4px 100% no-repeat';
const Glass = () => (
  <div
    className="absolute inset-0 rounded-[3px] border-[4px] border-white shadow-[0_3px_8px_rgba(60,40,20,0.3)]"
    style={{ backgroundImage: `${MULLION}, linear-gradient(160deg,#C4E6F7,#6EA6CC)` }}
  >
    {/* the lamp behind the glass: switches on at the end of the build */}
    <div
      className="craft-lamp absolute inset-0"
      style={{
        opacity: 0.85,
        backgroundImage: `${MULLION}, radial-gradient(circle at 50% 65%, #FFF1BE, #F5C259 75%)`,
        boxShadow: '0 0 26px 6px rgba(255,208,110,0.55)',
      }}
    />
  </div>
);

const CODE = [[0, 60, '#7DD3FC'], [1, 84, '#F9A8D4'], [1, 52, '#FDE68A'], [2, 70, '#86EFAC'], [1, 40, '#F9A8D4'], [0, 30, '#7DD3FC']];
const CodeWindow = () => (
  <div className="absolute rounded-md bg-[#14172B] shadow-[0_6px_14px_rgba(0,0,0,0.4)] ring-1 ring-white/25" style={{ left: 74, top: 22, width: 124, height: 88 }}>
    <div className="flex items-center gap-1 px-2 py-1.5">
      <i className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
      <i className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
      <i className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
    </div>
    <div className="space-y-[5px] px-2">
      {CODE.map(([indent, w, c], i) => (
        <div key={i} className="craft-line h-[4px] rounded-full" style={{ marginLeft: indent * 10, width: w, background: c }} />
      ))}
      <div className="craft-caret h-[7px] w-[3px] bg-white" style={{ marginLeft: 10 }} />
    </div>
  </div>
);

/* ---------- Scene data ---------- */
const WALL = '#F3E9D6';
const ROOF_LINES = 'repeating-linear-gradient(to bottom, transparent 0 11px, rgba(0,0,0,0.2) 11px 12px)';
const BRICK = 'repeating-linear-gradient(to bottom, transparent 0 7px, rgba(0,0,0,0.28) 7px 8px)';

const TREES = [
  { x: 28, y: 330 },
  { x: 352, y: 40 },
  { x: 346, y: 318 },
];
const LIFT = [0, 0, 110, 110, 18, 18, 18]; // body, details, roof, chimney, 3 trees (hover lift)

export default function CraftingHero() {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const floatRef = useRef(null);
  const shadowRef = useRef(null);
  const sunRef = useRef(null);
  const groupRefs = useRef([]);
  const stageRef = useRef(null);
  const scalerRef = useRef(null);
  const swayRef = useRef(null);
  const openRef = useRef(false);
  const touchRef = useRef(false);
  const reduced = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const groups = groupRefs.current;

      gsap.set(tiltRef.current, { rotationX: 58, rotationZ: -10 });
      gsap.set(shadowRef.current, { z: -40 });

      // Fit the 3D scene to whatever space it gets (320px phones up to desktop).
      const fit = () => {
        const el = stageRef.current;
        const s = Math.min(el.clientWidth / 600, el.clientHeight / 520, 1.05);
        gsap.set(scalerRef.current, { xPercent: -50, yPercent: -47, scale: s });
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(stageRef.current);

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reduced.current = false;

        // One orchestrated moment: the plot is marked, the house goes up piece by piece,
        // then the windows light up while the headline sets itself.
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(tiltRef.current, { rotationZ: -130, duration: 2.8 }, 0)
          .from('.craft-wire', { scale: 0.6, opacity: 0, transformOrigin: '50% 50%', duration: 0.7, stagger: 0.08 }, 0.2)
          .from(groups, { z: 650, duration: 1.1, stagger: 0.2, ease: 'power4.out' }, 0.8)
          .from('.craft-lamp', { opacity: 0, duration: 1.2, stagger: 0.15, ease: 'sine.out' }, 2.6)
          .from('.craft-line', { scaleX: 0, transformOrigin: '0 50%', duration: 0.5, stagger: 0.12, ease: 'power2.out' }, 2.6)
          .from('.craft-char', { yPercent: 115, rotate: 5, duration: 1.1, stagger: 0.035, ease: 'power4.out' }, 0.2)
          .from('.craft-fade', { opacity: 0, y: 14, duration: 0.8, stagger: 0.1 }, 1.0);

        // Idle: the house breathes, the sun and the windows glow softly.
        gsap.to(floatRef.current, { y: -12, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(sunRef.current, { scale: 1.12, opacity: 0.85, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.craft-caret', { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' });
        gsap.fromTo('.craft-wave', { scale: 0.2, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 2.4, repeat: -1, stagger: 0.8, ease: 'power1.out', delay: 3.2 });
        gsap.to('.craft-lamp', { opacity: 0.6, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 });
      });

      // Touch screens have no hover, so the house turns slowly on its own.
      mm.add('(prefers-reduced-motion: no-preference) and (hover: none)', () => {
        gsap.fromTo(swayRef.current, { rotationZ: -12 }, { rotationZ: 12, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        reduced.current = true;
      });

      return () => {
        mm.revert();
        ro.disconnect();
      };
    },
    { scope: rootRef }
  );

  const onMove = contextSafe((e) => {
    if (reduced.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    gsap.to(tiltRef.current, { rotationX: 58 - ny * 9, rotationZ: -38 + nx * 14, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
  });

  // Hover lifts the roof and chimney off the house.
  const spread = contextSafe((open) => {
    if (reduced.current) return;
    gsap.to(groupRefs.current, { z: (i) => (open ? LIFT[i] : 0), duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(shadowRef.current, { scale: open ? 1.2 : 1, opacity: open ? 0.6 : 1, duration: 1, ease: 'power3.out' });
    if (!open) gsap.to(tiltRef.current, { rotationX: 58, rotationZ: -38, duration: 1.1, ease: 'power3.out', overwrite: 'auto' });
  });

  // Touch: tap the house to lift or lower the roof.
  const onTap = () => {
    if (!touchRef.current) return;
    openRef.current = !openRef.current;
    spread(openRef.current);
  };

  return (
    <div ref={rootRef} className="craft-hero relative min-h-screen overflow-hidden bg-[#EDF0F6] text-[#12162B] selection:bg-[#2B3AF7] selection:text-white">
      <style>{FONT_CSS}</style>

      <main className="mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-2 px-6 pb-14 pt-6 sm:gap-6 sm:py-20 md:px-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-4">
        {/* Copy */}
        <section className="relative z-10">
          <h1 aria-label={HEADLINE.join(' ')} className="craft-display mb-8 text-[clamp(3.3rem,15vw,9.5rem)] leading-[0.86] tracking-[-0.035em]">
            {HEADLINE.map((line) => (
              <span key={line} aria-hidden="true" className="-mb-[0.06em] block overflow-hidden pb-[0.1em]">
                {[...line].map((ch, i) => (
                  <span key={i} className="craft-char inline-block will-change-transform">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="craft-fade mb-10 max-w-[30rem] text-lg leading-relaxed text-[#6B7390] md:text-xl">
            Craft is care at the level of detail. Sketch it, shape it and ship it with tools that stay out of your way.
          </p>

          <div className="craft-fade mb-14 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="w-full rounded-full bg-[#2B3AF7] px-8 py-4 sm:w-auto font-semibold text-white shadow-[0_10px_30px_-8px_rgba(43,58,247,0.6)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]">
              Start crafting
            </button>
            <button className="w-full rounded-full border border-[#12162B]/20 px-8 py-4 sm:w-auto font-semibold transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12162B]">
              Watch a build
            </button>
          </div>

          <p className="craft-fade max-w-[26rem] border-l-2 border-[#E0A53A] pl-4 text-sm leading-relaxed text-[#6B7390]">
            <span className="font-semibold text-[#12162B]">craft</span> (verb) to make something with skill and close attention to detail.
          </p>
        </section>

        {/* The 3D house */}
        <section
          ref={stageRef}
          className="relative order-first -mx-6 h-[400px] touch-pan-y select-none bg-[radial-gradient(ellipse_at_85%_8%,rgba(255,232,160,0.6),transparent_60%)] sm:mx-0 sm:h-[540px] lg:order-none lg:h-[640px]"
          onPointerDown={(e) => (touchRef.current = e.pointerType !== 'mouse')}
          onPointerMove={onMove}
          onPointerEnter={(e) => e.pointerType === 'mouse' && spread(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && spread(false)}
          onClick={onTap}
          aria-label="A 3D model of a house, built piece by piece, with warm light in the windows"
        >
          {/* The sun */}
          <div ref={sunRef} className="pointer-events-none absolute right-3 top-1 h-28 w-28 rounded-full bg-[radial-gradient(circle,#FFF6CF_0%,rgba(255,226,140,0.7)_35%,transparent_70%)] blur-[2px] sm:right-10 sm:top-6 sm:h-52 sm:w-52" />

          <div ref={scalerRef} className="absolute left-1/2 top-1/2 h-[420px] w-[420px]" style={{ perspective: '2000px' }}>
            <div ref={floatRef} style={{ transformStyle: 'preserve-3d' }}>
              <div ref={tiltRef} className="relative h-[420px] w-[420px]" style={{ transformStyle: 'preserve-3d' }}>
                <div ref={swayRef} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                  <div ref={shadowRef} className="absolute inset-[-8%] rounded-[2rem] bg-[#3B2A14]/30 blur-2xl" />

                  {/* Lawn: soil edge, mown stripes, sunlight from the front right */}
                  <div className="absolute inset-0 rounded-3xl bg-[#6E5233]" style={{ transform: 'translateZ(-12px)' }} />
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      backgroundColor: '#8CC063',
                      backgroundImage:
                        'radial-gradient(circle at 85% 90%, rgba(255,250,200,0.45), transparent 55%), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 30px, transparent 30px 60px)',
                      boxShadow: 'inset 0 0 0 3px rgba(60,100,40,0.35)',
                    }}
                  />
                  {/* Soft shadow the house throws on the lawn (away from the sun) */}
                  <div className="absolute rounded-lg bg-[#1E3A12]/35 blur-xl" style={{ left: 56, top: 80, width: 260, height: 200, transform: 'translateZ(1px)' }} />
                  {/* Path to the door */}
                  <div className="absolute rounded-md bg-[#E2D7BE]" style={{ left: 196, top: 322, width: 38, height: 98, transform: 'translateZ(1px)' }} />

                  {/* Plot marking */}
                  <div className="craft-wire absolute rounded-sm border-[1.5px] border-dashed border-[#2F5A1E]/70" style={{ left: 78, top: 108, width: 264, height: 204, transform: 'translateZ(2px)' }} />

                  {/* 0 Walls */}
                  <Group ref={(el) => (groupRefs.current[0] = el)}>
                    <Block b={{ x: 86, y: 116, w: 248, d: 188, h: 10, color: '#A39B8B' }} />
                    <Block b={{ x: 90, y: 120, w: 240, d: 180, h: 110, color: WALL, top: undefined }} />
                  </Group>

                  {/* 1 Door, windows, porch, hedges */}
                  <Group ref={(el) => (groupRefs.current[1] = el)}>
                    <Block b={{ x: 182, y: 300, w: 66, d: 24, h: 6, color: '#CFC8B8' }} />
                    <Block b={{ x: 106, y: 304, w: 64, d: 20, h: 22, color: '#4E8F3E' }} />
                    <Block b={{ x: 264, y: 304, w: 60, d: 20, h: 22, color: '#4E8F3E' }} />
                    <Block b={{ x: 166, y: 350, w: 6, d: 6, h: 34, color: '#6B4A2E' }} />
                    <FrontDecal x={145} y={356.5} w={48} h={24} z0={30}>
                      <div className="flex h-full w-full items-center justify-center rounded-[3px] border-2 border-[#F3D58A] bg-[#12162B] text-[13px] font-extrabold tracking-tight text-[#F3D58A]">{'</>'}</div>
                    </FrontDecal>
                    <FrontDecal x={110} w={50} h={46} z0={46}><Glass /></FrontDecal>
                    <FrontDecal x={270} w={50} h={46} z0={46}><Glass /></FrontDecal>
                    <FrontDecal x={190} w={50} h={76} z0={6}>
                      <div
                        className="absolute inset-0 rounded-t-md border-[3px] border-[#F8F3E8] bg-[#7B4B2A] shadow-[0_3px_8px_rgba(60,40,20,0.35)]"
                        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2)) 50% 12%/62% 34% no-repeat, linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2)) 50% 82%/62% 34% no-repeat' }}
                      >
                        <span className="absolute right-2 top-1/2 h-2 w-2 rounded-full bg-[#F3D58A]" />
                      </div>
                    </FrontDecal>
                    {/* window on the left wall */}
                    <div
                      className="absolute"
                      style={{ left: 89.5, top: 170, width: 46, height: 50, transformOrigin: '0 0', transform: `translateZ(${46 + 46}px) rotateY(90deg)` }}
                    >
                      <Glass />
                    </div>
                  </Group>

                  {/* 2 Roof: two slopes and two gables */}
                  <Group ref={(el) => (groupRefs.current[2] = el)}>
                    <div className="absolute" style={{ left: 76, top: 210, width: 268, height: 139, transformOrigin: '0 0', transform: 'translateZ(190px) rotateX(-41.5deg)', backgroundColor: '#C2573F', backgroundImage: ROOF_LINES, boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.12)' }}>
                      <CodeWindow />
                    </div>
                    <div className="absolute" style={{ left: 76, top: 106, width: 268, height: 139, transformOrigin: '0 0', transform: 'translateZ(98px) rotateX(41.5deg)', backgroundColor: '#8F3F2E', backgroundImage: ROOF_LINES, boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.12)' }} />
                    <div className="absolute" style={{ left: 90, top: 120, width: 80, height: 180, transformOrigin: '0 0', transform: 'translateZ(110px) rotateY(-90deg)', backgroundColor: '#D6C8AC', clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} />
                    <div className="absolute" style={{ left: 330, top: 120, width: 80, height: 180, transformOrigin: '0 0', transform: 'translateZ(110px) rotateY(-90deg)', backgroundColor: '#E9DEC8', clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} />
                  </Group>

                  {/* 3 Chimney */}
                  <Group ref={(el) => (groupRefs.current[3] = el)}>
                    <Block b={{ x: 276, y: 192, w: 28, d: 28, h: 102, z0: 118, color: '#A8503A', side: BRICK }} />
                    <Block b={{ x: 273, y: 189, w: 34, d: 34, h: 6, z0: 214, color: '#4A4540' }} />
                    <Block b={{ x: 288, y: 204, w: 4, d: 4, h: 44, z0: 220, color: '#4A4540' }} />
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="craft-wave absolute rounded-full border-2 border-[#2B3AF7] opacity-0" style={{ left: 240, top: 156, width: 100, height: 100, transform: 'translateZ(268px)' }} />
                    ))}
                  </Group>

                  {/* 4-6 Trees */}
                  {TREES.map((t, i) => (
                    <Group key={i} ref={(el) => (groupRefs.current[4 + i] = el)}>
                      <Block b={{ x: t.x + 16, y: t.y + 16, w: 12, d: 12, h: 34, color: '#6B4A2E' }} />
                      <Block b={{ x: t.x, y: t.y, w: 44, d: 44, h: 30, z0: 28, color: '#4E8F3E' }} />
                      <Block b={{ x: t.x + 8, y: t.y + 8, w: 28, d: 28, h: 26, z0: 56, color: '#66AE4F' }} />
                    </Group>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-0 left-0 right-0 hidden px-6 text-center text-xs text-[#6B7390] [@media(hover:none)]:block">
            Tap the house to lift the roof. Drag to turn it.
          </p>
        </section>
      </main>
    </div>
  );
}