import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const containerRef = useRef(null);

  // Generate random coordinates for the floating "dust" particles
  const particles = useMemo(() => 
    Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`
    }))
  , []);

    useGSAP(() => {
    // 1. Create a Timeline for the Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%', // shorten the pinned scroll duration to one viewport height
        pin: true,
        scrub: 0.5, // Changed from 1 to 0.5. A lower number feels more responsive to the mouse wheel.
      }
    });

    // 2. Strip the expensive CSS shadow immediately so the GPU doesn't choke during the zoom
    tl.to('.zoom-text', {
      textShadow: '0px 0px 0px rgba(0,0,0,0)', 
      duration: 0.1 // Happens in the first 10% of the scroll
    }, 0); // The '0' means this starts at the exact beginning of the timeline

    // 3. Perform the heavy scaling with GPU acceleration enabled
    tl.to('.zoom-text', {
      scale: 150,             
      opacity: 0,             
      ease: "power2.inOut", 
      force3D: true, // Forces the browser to hand the animation to the GPU
    }, 0); // Also starts at time 0

    // 4. The Automatic Scroll (Optional: You can keep this or remove it if it feels annoying to users)
    // After the zoom animation, scroll to the Services section by selector
    gsap.delayedCall(2, () => {
      gsap.to(window, {
        duration: 2.5,
        scrollTo: { y: "#services", autoKill: true },
        ease: "power3.inOut"
      });
    });

    // 6. Ambient Text Float (The "Alive" factor)
    // We animate 'y' so it does not conflict with the ScrollTrigger scaling
    gsap.to('.zoom-text', {
      y: -35,          // Drift up 15 pixels
      duration: 2.5,   // Takes 2.5 seconds to go up
      repeat: -1,      // Loop infinitely
      yoyo: true,      // Ping-pong back and forth (up, then down)
      ease: "sine.inOut", // The smoothest easing for a "breathing" effect
      force3D: true
    });

  }, { scope: containerRef });

  return (
    // FIX: Changed to a standard h-screen. Removed all "sticky" classes.
    // GSAP will now seamlessly connect the next section to the bottom of this one.
    <div ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
      
      {/* === SPOTLIGHT EFFECTS === */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[120vh] bg-gradient-to-br from-white/30 via-white/5 to-transparent blur-[100px] rotate-[25deg] pointer-events-none mix-blend-screen" />
      <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[120vh] bg-gradient-to-bl from-white/20 via-blue-200/5 to-transparent blur-[120px] -rotate-[25deg] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/10 blur-[150px] pointer-events-none" />

      {/* === FLOATING DUST PARTICLES === */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="particle absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
            style={{ top: particle.top, left: particle.left, opacity: 0.2 }}
          />
        ))}
      </div>

      {/* === MAIN TYPOGRAPHY === */}
      <div className="flex flex-col items-center justify-center z-10 w-full">
       <p className="welcome-text text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-300 to-zinc-600 text-lg md:text-lg mb-6 tracking-[0.6em] uppercase font-medium">
          Welcome To
        </p>
        
        <h1 
          className="zoom-text text-[15vw] font-black tracking-tighter leading-none select-none text-center"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 40%, #3f3f46 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `
              0px 1px 1px rgba(255, 255, 255, 0.4),
              0px 2px 0px #52525b,
              0px 3px 0px #3f3f46,
              0px 4px 0px #27272a,
              0px 5px 0px #18181b,
              0px 6px 4px rgba(0, 0, 0, 0.6),
              0px 15px 20px rgba(0, 0, 0, 0.8),
              0px 30px 40px rgba(0, 0, 0, 0.9)
            `
          }}
        >
          CODE CRAFT
        </h1>
      </div>

      {/* === BOTTOM CTA BUTTON === */}
      <button className="absolute bottom-12 z-50 px-8 py-3 rounded-lg border border-white/20 text-zinc-300 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
        See Our Work
      </button>
      
    </div>
  );
}