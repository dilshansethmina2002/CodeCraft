import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/*
  Code Craft Matrix Intro (about 3.8s, skippable, plays once per session).
  Digital code rain falls across a live canvas while the </> terminal emblem draws,
  the build counter hits 100%, the wordmark locks in, and the two doors slide open.
*/

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=JetBrains+Mono:wght@400;600&display=swap');
.cc-intro { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
.cc-display { font-variation-settings: 'wdth' 75, 'opsz' 96; font-weight: 800; }
.cc-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; }
`;

const KEY = 'codecraft-intro-seen';

const shouldSkip = (once) => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    try {
        return once && sessionStorage.getItem(KEY) === '1';
    } catch {
        return false;
    }
};

// Cyber emblem paths: Hexagonal frame + </> code brackets
const EMBLEM_PATHS = [
    'M60 10 L105 35 L105 85 L60 110 L15 85 L15 35 Z', // Outer hexagon
    'M46 46 L30 60 L46 74',                           // Left bracket <
    'M74 46 L90 60 L74 74',                           // Right bracket >
    'M66 42 L54 78',                                  // Center slash /
];

const Word = ({ text, className }) => (
    <span className={`inline-block overflow-hidden pb-[0.1em] ${className}`}>
        {[...text].map((c, i) => (
            <span key={i} className="cc-letter inline-block">{c}</span>
        ))}
    </span>
);

export default function Intro({ onReveal, onComplete, once = true }) {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);
    const numRef = useRef(null);
    const barRef = useRef(null);
    const tlRef = useRef(null);
    const [done, setDone] = useState(() => shouldSkip(once));

    // If the intro is skipped (return visit, reduced motion), release the page straight away.
    useEffect(() => {
        if (done) {
            onReveal?.();
            onComplete?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Matrix Digital Rain Canvas Effect
    useEffect(() => {
        if (done) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const chars = '01</>[]{};:=+-*&^%$#@!~CODECRAFTｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ';
        const fontSize = 15;
        let columns = Math.floor(width / fontSize);
        let drops = Array.from({ length: columns }, () => Math.random() * -50);

        const draw = () => {
            // Translucent dark slate trail
            ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Bright white/mint head, emerald body
                ctx.fillStyle = Math.random() > 0.88 ? '#ECFDF5' : '#10B981';
                ctx.fillText(char, x, y);

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 35);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            drops = Array.from({ length: columns }, () => 1);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [done]);

    useGSAP(
        () => {
            if (done) return;
            const root = document.documentElement;
            const prevOverflow = root.style.overflow;
            root.style.overflow = 'hidden';

            const finish = () => {
                root.style.overflow = prevOverflow;
                try { sessionStorage.setItem(KEY, '1'); } catch { /* storage unavailable */ }
                setDone(true);
                onComplete?.();
            };

            const paths = gsap.utils.toArray('.cc-draw');
            paths.forEach((p) => {
                const len = p.getTotalLength();
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            });

            gsap.set(barRef.current, { scaleX: 0, transformOrigin: '0 50%' });
            const count = { v: 0 };
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
            tlRef.current = tl;

            tl.from('.cc-seam', { scaleY: 0, duration: 0.8, ease: 'power2.inOut' }, 0)
                .from('.cc-canvas', { opacity: 0, duration: 0.8 }, 0)
                .to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, 0.2)
                .to(count, {
                    v: 100,
                    duration: 2.1,
                    ease: 'power1.inOut',
                    onUpdate: () => {
                        if (numRef.current) numRef.current.textContent = String(Math.round(count.v)).padStart(3, '0');
                    },
                }, 0.2)
                .to(barRef.current, { scaleX: 1, duration: 2.1, ease: 'power1.inOut' }, 0.2)
                .from('.cc-letter', { yPercent: 115, duration: 0.85, stagger: 0.045, ease: 'power4.out' }, 1.1)
                .from('.cc-tag', { opacity: 0, y: 10, duration: 0.6 }, 1.8)
                .to('.cc-core-glow', { opacity: 0.85, scale: 1.15, duration: 0.6, ease: 'sine.out' }, 1.9)
                .addLabel('exit', 2.9)
                .to('.cc-content', { opacity: 0, scale: 1.08, filter: 'blur(6px)', duration: 0.45, ease: 'power2.in' }, 'exit')
                .to('.cc-canvas', { opacity: 0, duration: 0.4 }, 'exit')
                .to('.cc-seam', { opacity: 0, duration: 0.3 }, 'exit')
                .add(() => onReveal?.(), 'exit+=0.15')
                .to('.cc-left', { xPercent: -100, duration: 1, ease: 'power4.inOut' }, 'exit+=0.15')
                .to('.cc-right', { xPercent: 100, duration: 1, ease: 'power4.inOut' }, 'exit+=0.15');

            return () => {
                root.style.overflow = prevOverflow;
            };
        },
        { scope: rootRef, dependencies: [done] }
    );

    // Skip: fast-forward to the moment the doors open.
    const skip = () => {
        const tl = tlRef.current;
        if (tl) tl.pause().tweenTo('exit', { duration: 0.4, ease: 'power2.in', onComplete: () => tl.play() });
    };

    if (done) return null;

    return (
        <div ref={rootRef} className="cc-intro fixed inset-0 z-[200] overflow-hidden text-slate-100" role="status" aria-label="Loading Code Craft">
            <style>{FONT_CSS}</style>

            {/* The two split doors */}
            <div className="cc-left absolute inset-y-0 left-0 w-1/2 bg-slate-950" />
            <div className="cc-right absolute inset-y-0 right-0 w-1/2 bg-slate-950" />

            {/* Matrix Digital Rain Canvas */}
            <canvas ref={canvasRef} className="cc-canvas pointer-events-none absolute inset-0 opacity-35 mix-blend-screen" />

            {/* Radial vignette so the center branding pops cleanly over the rain */}
            <div className="cc-canvas pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,6,23,0.45)_0%,rgba(2,6,23,0.92)_100%)]" />

            {/* Center door seam */}
            <div className="cc-seam absolute inset-y-0 left-1/2 w-px bg-emerald-500/30 shadow-[0_0_12px_#10b981]" />

            {/* Center Branding Content */}
            <div className="cc-content absolute inset-0 flex flex-col items-center justify-center px-6">
                <div className="cc-core-glow pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22),transparent_70%)] opacity-30" />

                {/* Cyber </> Hex Emblem */}
                <svg viewBox="0 0 120 120" className="relative mb-6 h-24 w-24 overflow-visible sm:h-28 sm:w-28" fill="none" aria-hidden="true">
                    <circle className="cc-core-glow" cx="60" cy="60" r="36" fill="rgba(16,185,129,0.12)" opacity="0" />
                    <g stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">
                        {EMBLEM_PATHS.map((d) => (
                            <path key={d} className="cc-draw" d={d} />
                        ))}
                    </g>
                </svg>

                {/* Wordmark */}
                <p className="cc-display flex gap-[0.22em] text-[clamp(2.8rem,10vw,5.5rem)] leading-none tracking-[-0.03em] drop-shadow-[0_0_25px_rgba(16,185,129,0.25)]" aria-hidden="true">
                    <Word text="Code" className="text-slate-100" />
                    <Word text="Craft" className="text-emerald-400" />
                </p>

                {/* Tagline */}
                <p className="cc-tag cc-mono mt-5 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80 sm:text-xs">
                    <span>we code</span>
                    <span className="h-3 w-px bg-emerald-500" />
                    <span>you grow</span>
                </p>

                {/* Bottom Progress Bar & Counter */}
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-8">
                    <div className="mb-3 flex items-end justify-between">
                        <div className="flex items-baseline gap-1">
                            <span ref={numRef} className="cc-display text-4xl tabular-nums text-slate-100 sm:text-5xl">000</span>
                            <span className="cc-mono text-sm text-emerald-400">%</span>
                            <span className="cc-mono ml-3 text-xs tracking-widest uppercase text-emerald-400/70">
                                &gt; compiling_matrix...
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={skip}
                            className="cc-mono rounded-full bg-slate-900/80 px-4 py-2 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30 transition-colors hover:bg-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                        >
                            [Skip]
                        </button>
                    </div>
                    <div className="h-[2px] w-full bg-slate-800">
                        <div ref={barRef} className="h-full origin-left bg-emerald-400 shadow-[0_0_12px_#10b981]" />
                    </div>
                </div>
            </div>
        </div>
    );
}