import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Full-Stack Web Engineering",
      description: "Building highly scalable, responsive applications using modern stacks like MERN. We seamlessly connect dynamic front-ends with robust, secure backend architectures.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Enterprise ERP Systems",
      description: "Custom ERP solutions to streamline your business operations, integrate internal processes, and manage data efficiently across all your departments.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Custom POS Systems",
      description: "Modern, cloud-based Point of Sale software tailored for retail and hospitality, enabling seamless transactions and real-time inventory tracking.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Product & E-Commerce",
      description: "High-converting product landing pages and fully featured e-commerce platforms designed to maximize your digital sales and brand reach.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Portfolios & Personal Sites",
      description: "Beautiful, lightning-fast personal websites and digital portfolios to showcase your work, resume, and unique professional brand to the world.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Digital Invitation Cards",
      description: "Elegant, interactive digital invitations for weddings, corporate events, and parties, complete with custom animations and built-in RSVP tracking.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  useGSAP(() => {
    // 1. Explicitly animate Header Elements from 0 to 1
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
          start: 'top 90%', // Triggers slightly earlier
          once: true // Ensures it stays visible after animating
        }
      }
    );

    // 2. Explicitly animate Cards Reveal from 0 to 1
    gsap.fromTo('.service-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 95%', // Very forgiving trigger point
          once: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-white relative z-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-20">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
            <span>expertise</span>
            <span className="text-indigo-400 font-normal">/ toolkit</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Solutions Engineered for Scale
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We deliver comprehensive technical solutions, from the database layer to immersive user interfaces, ensuring your digital presence is fast, reliable, and engaging.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group bg-[#fafafa] border border-gray-100 rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] relative overflow-hidden opacity-0"
            >
              {/* Subtle hover background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

              {/* Icon Container */}
              <div className="relative w-14 h-14 bg-white border border-gray-200 shadow-sm rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all duration-500 z-10">
                {service.icon}
              </div>

              <h3 className="relative text-xl font-bold text-gray-900 mb-4 z-10">
                {service.title}
              </h3>

              <p className="relative text-gray-600 leading-relaxed text-sm z-10">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}