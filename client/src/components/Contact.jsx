import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [message, setMessage] = useState('');

  const handleWhatsAppChat = (e) => {
    e.preventDefault();
    const phone = "918590765005"; // Replace with actual number
    const text = encodeURIComponent(message || "Hi, I'm interested in your security solutions. Can we discuss a site audit?");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div className="contact-bg-orb" />
      <div className="container">
        {/* Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Contact Us</span>
          <h2>
            Let's Secure <br />
            <span className="gradient-text">Your World</span>
          </h2>
          <p>Book a <strong>free site audit</strong> or ask us anything. We respond <strong>within 2 hours</strong>.</p>
        </motion.div>

        <div className="contact-layout">
          {/* Info cards */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ),
                label: 'Phone',
                value: '+91 85907 65005',
                sub: 'Mon–Sat, 9am–7pm',
                href: 'tel:+918590765005',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                ),
                label: 'Email',
                value: 'info@secmate.in',
                sub: 'We reply within 2 hours',
                href: 'mailto:info@secmate.in',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/></svg>
                ),
                label: 'Office',
                value: 'Parali, Kerala',
                sub: 'Serving Palakkad & Thrissur',
              },
            ].map((item) => (
              <div className="contact-info-card glass-card" key={item.label}>
                <div className="info-icon">{item.icon}</div>
                <div>
                  <div className="info-label">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="info-value" style={{ textDecoration: 'none', display: 'block' }}>
                      {item.value}
                    </a>
                  ) : (
                    <div className="info-value">{item.value}</div>
                  )}
                  <div className="info-sub">{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="social-links">
              <a href="https://www.instagram.com/secmate_technologies" target="_blank" rel="noopener noreferrer" className="social-link" id="contact-ig-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                Instagram
              </a>
              <a href="#" className="social-link" id="contact-wa-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <form className="contact-form glass-card" onSubmit={handleWhatsAppChat} id="contact-form">
              <h3>Get a Free Security Audit</h3>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us about your property and security needs..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" id="contact-submit-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Chat on WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
