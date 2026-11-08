import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  useGSAP(() => {
    // 1. Animate the left side (Text & Info) sliding in from the left
    gsap.fromTo(infoRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    // 2. Animate the right side (Form) sliding in from the right
    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2, // Slight stagger after the text
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#fafafa] relative z-10 font-sans border-t border-gray-200/60 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Contact Information */}
          <div ref={infoRef} className="opacity-0">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
              <span>contact</span>
              <span className="text-indigo-400 font-normal">/ get in touch</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Ready to start your next project?
            </h2>

            <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-lg">
              Whether you have a fully formed idea or just a concept, the CodeCraft team is here to help you engineer it into reality. Let's build something extraordinary together.
            </p>

            <div className="space-y-8">
              {/* Email Block */}
              <div className="flex items-center group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mr-5 border border-gray-200 text-indigo-600 shadow-sm group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email Us</p>
                  <p className="font-semibold text-gray-900 text-lg">hello@codecraft.com</p>
                </div>
              </div>

              {/* Location Block */}
              <div className="flex items-center group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mr-5 border border-gray-200 text-indigo-600 shadow-sm group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                  <p className="font-semibold text-gray-900 text-lg">Global / Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div ref={formRef} className="opacity-0 bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder-gray-400 font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder-gray-400 font-medium"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder-gray-400 font-medium resize-none"
                  placeholder="Tell us about what you want to build..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-colors duration-300 shadow-lg shadow-gray-900/10 flex items-center justify-center gap-2"
              >
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}