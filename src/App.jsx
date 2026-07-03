import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Our Hero section is 300vh tall (3x the window height).
      // We reveal the navbar when the user scrolls past 2.5x the height,
      // right as the "Code Craft" text finishes zooming past the camera.
      if (window.scrollY > window.innerHeight * 2.5) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    // Listen for scrolling
    window.addEventListener('scroll', handleScroll);
    
    // Fire it once on mount just in case the user refreshes halfway down the page
    handleScroll(); 

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Navbar Wrapper: 
        - fixed: Stays at the top of the viewport
        - z-50: Stays above all other content
        - transition-opacity: Smooth fade in/out
        - pointer-events-none: Prevents the invisible navbar from blocking clicks on the Hero
      */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-700 ease-in-out ${
          showNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar />
      </div>

      <main>
        <Hero />
        
        {/* We wrap the rest of the sections in a relative container with a background 
            color so they securely cover the empty space left by the 300vh Hero scroll */}
        <div className="relative z-10 bg-slate-900">
          <Services />
          <Portfolio />
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;