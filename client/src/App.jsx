import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import Navbar from './components/Navbar';
import TechBackground from './components/TechBackground';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a short delay (2.5s) to allow 3D assets & content to initialize
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--clr-bg)' }}>
      <TechBackground />
      <div style={{ position: 'relative', zIndex: 10 }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      {/* Floating "Get In Touch" button */}
      <a
        href="tel:+918590765005"
        id="floating-cta"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 900,
          padding: '0.75rem 1.4rem',
          background: '#000000',
          color: '#ffffff',
          borderRadius: '999px',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,0,0,0.2)';
          e.currentTarget.style.background = '#1a1a1a';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
          e.currentTarget.style.background = '#000000';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Get In Touch
      </a>
      </div>
    </div>
    </>
  );
}
