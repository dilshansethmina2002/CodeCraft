import React from 'react';

export default function Feedback() {
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

  return (
    <section id="feedback" className="py-24 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase block mb-3">
            // Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Innovators
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here is what our clients have to say about the solutions we've built for them.
          </p>
        </div>

        {/* Feedback Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 relative flex flex-col"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 text-slate-800/50">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Feedback Content */}
              <blockquote className="text-slate-300 leading-relaxed mb-8 flex-grow relative z-10">
                "{testimonial.content}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto border-t border-slate-800 pt-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-800"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}