import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';

const W  = 'rgba(0,0,0,0.6)';   // icon stroke
const WF = 'rgba(0,0,0,0.12)';  // icon fill

const services = [
  {
    id: 'ip-cameras',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="9" width="20" height="14" rx="2" stroke={W} strokeWidth="1.5" />
        <path d="M22 13l8-4v14l-8-4V13z" stroke={W} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="11" cy="16" r="3" stroke={W} strokeWidth="1.5" />
      </svg>
    ),
    number: '01',
    title: 'IP Camera Systems',
    desc: <><strong>4K ultra-HD IP cameras</strong> with H.265+ compression. Remote access from anywhere via mobile app. <strong>PoE-compatible</strong> with smart motion zones.</>,
    tags: ['4K HDR', 'PoE', 'Night Vision', 'H.265+'],
  },
  {
    id: 'thermal',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke={W} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="7" stroke={W} strokeWidth="1.5" opacity="0.5" />
        <circle cx="16" cy="16" r="3" fill={W} opacity="0.8" />
        <path d="M16 3v3M16 26v3M3 16h3M26 16h3" stroke={W} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    number: '02',
    title: 'Thermal Imaging',
    desc: <>Detect intrusions in complete darkness using <strong>bi-spectrum thermal cameras</strong>. Ideal for warehouses, perimeters, and critical infrastructure.</>,
    tags: ['Bi-Spectrum', '400m Range', '-20°C to 550°C'],
  },
  {
    id: 'perimeter',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="2" stroke={W} strokeWidth="1.5" />
        <path d="M3 12h26M3 20h26M12 3v26M20 3v26" stroke={W} strokeWidth="0.8" opacity="0.3" />
        <rect x="10" y="10" width="12" height="12" rx="1" fill={WF} stroke={W} strokeWidth="1.5" />
        <path d="M13 16l2 2 4-4" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    number: '03',
    title: 'Perimeter Protection',
    desc: <>Smart perimeter alarm systems with <strong>AI-driven vehicle and human classification</strong>. Reduce false alarms by 98% with deep learning analytics.</>,
    tags: ['AI Classify', 'Zero False Alarm', 'IP67'],
  },
  {
    id: 'remote',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="16" height="20" rx="2" stroke={W} strokeWidth="1.5" />
        <circle cx="12" cy="23" r="1.5" fill={W} />
        <path d="M20 14h8M24 10l4 4-4 4" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 11h8M8 15h6" stroke={W} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    number: '04',
    title: 'Remote Monitoring',
    desc: <><strong>24/7 cloud-based video monitoring</strong> with instant push alerts. Our NOC team responds to verified threats in under <strong>60 seconds</strong>.</>,
    tags: ['24/7 NOC', '< 60s Response', 'Cloud DVR'],
  },
  {
    id: 'access',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="10" y="4" width="12" height="10" rx="6" stroke={W} strokeWidth="1.5" />
        <rect x="6" y="14" width="20" height="15" rx="3" stroke={W} strokeWidth="1.5" />
        <circle cx="16" cy="21" r="2.5" fill={W} opacity="0.8" />
        <line x1="16" y1="23.5" x2="16" y2="26" stroke={W} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    number: '05',
    title: 'Access Control',
    desc: <>Biometric access, RFID cards, and <strong>video intercom systems</strong>. Integrate with HR software for automated attendance and workforce analytics.</>,
    tags: ['Biometric', 'RFID', 'Video Intercom'],
  },
  {
    id: 'ai-analytics',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke={W} strokeWidth="1.5" opacity="0.3" />
        <path d="M10 22l3-6 3 4 2-3 4 5" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="2" stroke={W} strokeWidth="1.5" />
        <circle cx="22" cy="10" r="2" stroke={W} strokeWidth="1.5" />
        <circle cx="10" cy="22" r="2" fill={WF} stroke={W} strokeWidth="1.5" />
      </svg>
    ),
    number: '06',
    title: 'AI Video Analytics',
    desc: <>License plate recognition, crowd density heat-maps, and people counting. Transform raw footage into <strong>actionable business intelligence</strong>.</>,
    tags: ['LPR', 'Heat Maps', 'People Count', 'Face Detect'],
  },
];

export default function Services() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="services section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">What We Offer</span>
          <h2>
            Reliable Technology for <br />
            <span className="gradient-text">Unmatched Protection</span>
          </h2>
          <p>Six integrated security disciplines. <strong>One unified platform.</strong></p>
        </motion.div>

        {/* Cards Grid */}
        <div className="services-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="service-card"
              id={`service-${svc.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="service-top">
                <div className="service-icon">{svc.icon}</div>
                <span className="service-number">{svc.number}</span>
              </div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-tags">
                {svc.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="service-hover-glow" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <div className="cta-content">
            <h3>Ready to Secure Your Property?</h3>
            <p>Get a free site assessment and custom security blueprint — no commitment required.</p>
          </div>
          <a href="#contact" className="btn btn-primary" id="services-cta-btn">
            Book Free Audit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
