import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Feedback() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Operations Director, TechFlow",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      content: "The custom ERP system they built completely transformed our internal operations. We reduced manual data entry by 80% within the first month of deployment.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Founder, Artisan Coffee Co.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
      content: "Upgrading to their cloud-based POS system was the best decision for our three cafes. It's incredibly fast, intuitive, and the real-time inventory tracking is flawless.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Independent Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
      content: "They took my vision for a personal portfolio and brought it to life with stunning animations and a lightning-fast load time. I've received so many compliments on it!",
      rating: 5
    }
  ];

  useGSAP(() => {
    // 1. Explicitly animate Header Elements
    gsap.fromTo(headerRef.current.children, 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%', 
          once: true 
        }
      }
    );

    // 2. Explicitly animate Cards Reveal
    gsap.fromTo('.feedback-card', 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 90%', 
          once: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="feedback" ref={sectionRef} className="py-24 bg-white relative z-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-20">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
            <span>client stories</span>
            <span className="text-indigo-400 font-normal">/ feedback</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Trusted by Innovators
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Don't just take our word for it. Here is what our clients have to say about the solutions we've built for them.
          </p>
        </div>

        {/* Feedback Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="feedback-card opacity-0 group bg-[#fafafa] border border-gray-100 rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)] relative flex flex-col overflow-hidden"
            >
              {/* Subtle hover background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

              {/* Quote Icon Background */}
              <div className="absolute top-8 right-8 text-gray-200/60 group-hover:text-indigo-100 transition-colors duration-500">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Star Rating (using Indigo to match the theme) */}
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Feedback Content */}
              <blockquote className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                "{testimonial.content}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-6 relative z-10">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-gray-900 font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}