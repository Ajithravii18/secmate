import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './FAQ.css';

const faqs = [
  {
    id: 'faq-1',
    q: 'What types of CCTV systems do you offer?',
    a: <>We offer the full spectrum: analog HD, IP-based NVR systems, PTZ cameras, thermal bi-spectrum cameras, fisheye 360° cameras, and <strong>AI-powered edge analytics cameras</strong>. Each solution is tailored to your property size, lighting conditions, and threat profile.</>,
  },
  {
    id: 'faq-2',
    q: 'How do I choose the right CCTV system for my property?',
    a: <>Our engineers conduct a <strong>free site audit</strong> — evaluating entry points, lighting, cable infrastructure, and your specific risk areas. We then recommend a <strong>layered system with no blind spots</strong>. You can book your free audit via the form on this page.</>,
  },
  {
    id: 'faq-3',
    q: 'Can I access my CCTV footage remotely?',
    a: <>Yes. All our IP NVR and cloud-connected systems support <strong>remote viewing via iOS and Android apps</strong>. You get live feeds, playback, motion alerts, and two-way audio — from anywhere in the world.</>,
  },
  {
    id: 'faq-4',
    q: 'How long is the warranty on your CCTV systems?',
    a: <>We provide a <strong>3-year on-site warranty</strong> for all hardware and a <strong>1-year AMC</strong> (Annual Maintenance Contract) included with every installation. Extended AMC plans covering labor, parts, and priority support are available.</>,
  },
  {
    id: 'faq-5',
    q: 'Do you provide installation services?',
    a: <>Absolutely. Our certified installation teams handle everything — from cable routing and camera mounting to NVR configuration, mobile app setup, and staff training. We typically complete residential installs in a <strong>single day</strong>.</>,
  },
  {
    id: 'faq-6',
    q: 'What is the installation process like?',
    a: <>Step 1: Free site audit (1 hour). Step 2: Custom system design & quote (24–48 hours). Step 3: <strong>Installation day</strong> (varies by scale). Step 4: Configuration, testing & demo. Step 5: Handover with full documentation and app setup.</>,
  },
  {
    id: 'faq-7',
    q: 'Do your cameras work in complete darkness?',
    a: <>Yes — our thermal imaging cameras detect heat signatures in <strong>zero-light conditions</strong>. Our starlight IP cameras activate <strong>color night vision</strong> with as little as 0.001 Lux. IR cameras cover up to 100m in total darkness.</>,
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} id={faq.id}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{faq.q}</span>
        <div className={`faq-icon ${isOpen ? 'rotated' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState('faq-1');
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="faq section" ref={ref}>
      <div className="container">
        <div className="faq-layout">
          {/* Left: Header */}
          <motion.div
            className="faq-header"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">FAQ</span>
            <h2>
              Questions <br />
              <span className="gradient-text">& Answers</span>
            </h2>
            <p>
              Everything you need to know about our security systems and installation process.
              Can't find your answer?
            </p>
            <a href="#contact" className="btn btn-ghost" id="faq-contact-btn" style={{ marginTop: '1.5rem' }}>
              Ask Us Directly →
            </a>

            {/* Support card */}
            <div className="faq-support-card glass-card">
              <div className="support-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="support-label">24/7 Support Line</div>
                <div className="support-number">+91 98XXX XXXXX</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            className="faq-list"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {faqs.map(faq => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
