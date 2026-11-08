import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CraftingHero() {
  const containerRef = useRef(null);

  // Refs for the 3D Gyroscope elements
  const gyroContainerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const coreRef = useRef(null);
  const particlesRef = useRef(null);

  useGSAP(() => {
    // 1. Float the entire gyroscope assembly up and down
    gsap.to(gyroContainerRef.current, {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 2. Rotate Outer Ring (Slow, X & Y axes)
    gsap.to(ring1Ref.current, {
      rotationX: 360,
      rotationY: 180,
      duration: 25,
      repeat: -1,
      ease: "none"
    });

    // 3. Rotate Middle Ring (Reverse direction, different axes)
    gsap.to(ring2Ref.current, {
      rotationX: -180,
      rotationY: -360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // 4. Rotate Inner Ring (Fastest, Z & Y axes)
    gsap.to(ring3Ref.current, {
      rotationY: 360,
      rotationZ: 360,
      duration: 15,
      repeat: -1,
      ease: "none"
    });

    // 5. Pulsate the Center Core
    gsap.to(coreRef.current, {
      scale: 1.3,
      opacity: 0.7,
      boxShadow: '0 0 60px rgba(139, 92, 246, 0.8)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 6. Slowly rotate the background ambient particles
    gsap.to(particlesRef.current, {
      rotationZ: 360,
      duration: 40,
      repeat: -1,
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-indigo-200 pt-24 overflow-hidden">
      <main className="max-w-[1400px] mx-auto px-8 md:px-12 pt-12 lg:pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">

        {/* Left Content - The Meaning of Crafting */}
        <div className="max-w-xl z-10 relative">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
            <span>crafting</span>
            <span className="text-indigo-400 font-normal">/ˈkraftiNG/</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.1] mb-6">
            The art of <span className="relative inline-block text-indigo-600">
              building
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span> with intention.
          </h1>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-[460px]">
            To craft is to exercise skill and careful attention to detail. We provide the digital anvil and tools necessary to shape your raw ideas into powerful, beautiful digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
            <button className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all shadow-lg shadow-gray-900/20 flex items-center gap-2">
              Start Crafting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-semibold rounded-xl transition-all flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See it in action
            </button>
          </div>

          <div className="flex items-center gap-10 border-t border-gray-200 pt-8">
            <div>
              <div className="text-3xl font-bold tracking-tight mb-1 text-gray-900">Pixel</div>
              <div className="text-sm text-gray-500 font-medium">Perfect Precision</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-3xl font-bold tracking-tight mb-1 text-gray-900">∞</div>
              <div className="text-sm text-gray-500 font-medium">Endless Possibilities</div>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Digital Gyroscope Visual */}
        <div className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-[1000px] z-0">

          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 blur-[120px] rounded-full pointer-events-none"></div>

          {/* Ambient Orbital Particles */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-[1px]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>

          {/* Main 3D Gyroscope Assembly */}
          <div ref={gyroContainerRef} className="relative w-[400px] h-[400px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

            {/* Outer Ring (Largest) */}
            <div ref={ring1Ref} className="absolute w-[360px] h-[360px] rounded-full border border-indigo-200/40 bg-white/5 backdrop-blur-sm" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-indigo-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#818cf8]"></div>
              <div className="absolute -bottom-1.5 left-1/2 w-3 h-3 bg-indigo-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#818cf8]"></div>
            </div>

            {/* Middle Ring (Medium) */}
            <div ref={ring2Ref} className="absolute w-[260px] h-[260px] rounded-full border-2 border-dashed border-indigo-400/30" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute top-1/2 -left-2 w-4 h-4 border-2 border-indigo-400 bg-white rounded-full -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 border-2 border-indigo-400 bg-white rounded-full -translate-y-1/2"></div>
            </div>

            {/* Inner Ring (Smallest, thicker glass) */}
            <div ref={ring3Ref} className="absolute w-[160px] h-[160px] rounded-full border-[8px] border-white/60 bg-indigo-100/20 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
            </div>

            {/* The Center Energy Core */}
            <div ref={coreRef} className="absolute w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-fuchsia-400 shadow-[0_0_40px_rgba(139,92,246,0.5)] border-2 border-white/80" style={{ transformStyle: 'preserve-3d' }}>
              {/* Core inner highlight */}
              <div className="absolute inset-1 rounded-full bg-white/30 backdrop-blur-sm"></div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}