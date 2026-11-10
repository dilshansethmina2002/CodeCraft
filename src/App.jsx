import React, { useState, useEffect } from 'react';
import Intro from './components/Intro'; // Adjust path if it's in a different folder
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Feedback from './sections/Feedback';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Adjust the timeout to match your Intro.jsx animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Renders your custom Intro component while loading */}
      {isLoading && <Intro />}

      {/* Main app content with a smooth fade-in transition */}
      <div 
        className={`min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 transition-opacity duration-1000 ${
          isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        <Navbar />

        <main>
          <Hero />
          <div className="relative z-10 bg-slate-900">
            <Services />
            <Portfolio />
            <Feedback />
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;