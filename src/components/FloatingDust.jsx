import React from 'react';

export default function FloatingDust({ particles }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 
        Injecting a simple CSS keyframe animation directly into the component.
        This is much better for performance than using JavaScript to animate dozens of tiny elements.
      */}
      <style>{`
        @keyframes float-dust {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateY(-30px) translateX(15px) scale(1.5); 
            opacity: 0.6; 
          }
        }
      `}</style>
      
      {particles.map((particle, i) => (
        <div 
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
          style={{ 
            top: particle.top, 
            left: particle.left, 
            opacity: 0.1,
            // Apply the CSS animation with a random delay so they don't all move at the exact same time
            animation: `float-dust ${Math.random() * 4 + 4}s infinite ease-in-out`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
}