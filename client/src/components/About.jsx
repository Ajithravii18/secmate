import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const highlights = [
  { icon: '🛡️', title: 'Our Vision', text: 'To be the most trusted security technology partner — making advanced surveillance accessible to every home and business in Palakkad and Thrissur.' },
  { icon: '🎯', title: 'Our Mission', text: 'Delivering cutting-edge CCTV, thermal imaging, and AI-powered threat detection with unmatched after-sales support and 99.8% uptime guarantees.' },
];

const milestones = [
  { year: '2012', event: 'Founded in Parali, Kerala with a focus on IP camera installations' },
  { year: '2015', event: 'Expanded to thermal imaging and perimeter protection systems' },
  { year: '2018', event: 'Launched AI-powered real-time threat detection platform' },
  { year: '2021', event: 'Crossed 3,000 successful enterprise installations across Kerala' },
  { year: '2024', event: '5K+ installations, partnered with Hikvision & CP Plus officially' },
];

export default function About() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">About Us</span>
          <h2>
            Prioritizing Your <br />
            <span className="gradient-text">Security from Day One</span>
          </h2>
          <p className="about-intro">
            <strong>Secmate Technologies</strong> was founded on a single promise: <strong className="hero-accent">no property should be unprotected.</strong>
            Over 12 years, we've grown from a local installer to a <strong>full-spectrum security integrator</strong>
            trusted by warehouses, hospitals, campuses, and smart homes in Palakkad and Thrissur.
          </p>
        </motion.div>

        {/* Vision / Mission Cards */}
        <div className="about-cards">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="about-card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
            >
              <div className="about-card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}

          {/* Commitment card */}
          <motion.div
            className="about-card about-card-accent glass-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="commitment-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="#00d4ff" strokeWidth="1.5" opacity="0.4" />
                <path d="M18 5L7 11v7c0 6.3 4.5 12.2 11 13.6C24.5 30.2 29 24.3 29 18v-7L18 5z"
                  fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 18l2.5 2.5 5-5" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Our Commitment is Your Safety</h3>
            <p>We don't just install cameras — we build <strong>layered security ecosystems</strong>. Every project comes with a <strong>full site audit</strong>, custom placement strategy, and dedicated support line.</p>
            <div className="commitment-stats">
              <div><strong>299+</strong><span>Enterprises</span></div>
              <div><strong>1100+</strong><span>Residences</span></div>
              <div><strong>12</strong><span>States</span></div>
              <div><strong>12.2K</strong><span>Cameras Active</span></div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          className="timeline"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="section-label" style={{ marginBottom: '2rem' }}>Our Journey</div>
          <div className="timeline-track">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
              >
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-event">{m.event}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
