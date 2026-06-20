import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="Secmate" className="footer-logo-img" />
              <span>
                <strong style={{ fontWeight: 800 }}>SECMATE</strong>{' '}
                <span style={{ fontWeight: 300 }}>TECHNOLOGIES</span>
              </span>
            </div>
            <p>
              Kerala's <strong>trusted security technology partner</strong>. Cutting-edge CCTV, AI analytics, and thermal imaging — <strong>protecting what matters most</strong>.
            </p>
            <div className="footer-badge">
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', display: 'inline-block', animation: 'blink 1.5s ease-in-out infinite' }} />
              24/7 NOC Active
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {['Home', 'About', 'Services', 'Portfolio', 'FAQ', 'Contact'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {[
                'IP Camera Systems',
                'Thermal Imaging',
                'Perimeter Protection',
                'Remote Monitoring',
                'Access Control',
                'AI Video Analytics',
              ].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="https://www.instagram.com/secmate_technologies" target="_blank" rel="noopener noreferrer" id="footer-ig-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                  @secmate_technologies
                </a>
              </li>
              <li><a href="mailto:info@secmate.in">info@secmate.in</a></li>
              <li><a href="tel:+918590765005">+91 85907 65005</a></li>
              <li style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.82rem', cursor: 'default' }}>
                Parali, Kerala, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="divider" style={{ marginBottom: '1.5rem' }} />
          <div className="footer-bottom-content">
            <span>© {year} Secmate Technologies Pvt. Ltd. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Warranty Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
