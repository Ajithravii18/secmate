import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './Portfolio.css';

/**
 * ─── INSTAGRAM PORTFOLIO GRID ───────────────────────────────────────────
 *
 * HOW TO CONNECT TO THE LIVE INSTAGRAM API:
 *
 * 1. Create a Facebook Developer App at https://developers.facebook.com/
 * 2. Add "Instagram Basic Display" product to your app
 * 3. Generate a long-lived user access token for @secmate_technologies
 * 4. Set the token in your server's .env:
 *      INSTAGRAM_ACCESS_TOKEN=your_token_here
 * 5. In this file, replace `MOCK_POSTS` with an API fetch:
 *      const res = await fetch('http://localhost:5000/api/instagram/posts');
 *      const data = await res.json();
 *      setPosts(data.posts);
 *
 * The Node.js backend will:
 *   - Proxy requests to the Instagram Graph API
 *   - Cache results in MongoDB (15-min TTL) to avoid rate limits
 * ─────────────────────────────────────────────────────────────────────────
 */

// ── Mock Instagram posts (replace with API data when token is ready) ──
const MOCK_POSTS = [
  {
    id: '1',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
    title: 'Warehouse Perimeter Protection',
    caption: <>Deployed <strong>48 bi-spectrum thermal cameras</strong> across 2km perimeter. Zero blind spots. 4K thermal imaging with <strong>AI intruder classification</strong>. — Pune Industrial Complex</>,
    tags: ['Thermal', '4K', 'Perimeter', 'AI Detect'],
    likes: 284,
    date: '2 days ago',
  },
  {
    id: '2',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
    title: 'Smart Home Security Suite',
    caption: <><strong>360° panoramic cameras</strong> + video doorbell + <strong>biometric access</strong>. All integrated into a single mobile app. Complete peace of mind for a luxury residence in Koramangala.</>,
    tags: ['Smart Home', '360°', 'Biometric'],
    likes: 412,
    date: '5 days ago',
  },
  {
    id: '3',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop',
    title: 'Hospital Campus Surveillance',
    caption: <><strong>24/7 video monitoring</strong> across 6-building hospital campus. <strong>120+ cameras</strong> with people counting, crowd alerts, and instant notification to security staff.</>,
    tags: ['Healthcare', '24/7 Monitor', 'AI Analytics'],
    likes: 567,
    date: '1 week ago',
  },
  {
    id: '4',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop',
    title: 'Corporate HQ Access Control',
    caption: <>Multi-floor enterprise access with <strong>RFID + face recognition</strong>. Integrated with SAP HR for seamless attendance. Deployed across <strong>14 floors, 800+ employees</strong>.</>,
    tags: ['Access Control', 'RFID', 'Face ID'],
    likes: 329,
    date: '2 weeks ago',
  },
  {
    id: '5',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=500&fit=crop',
    title: 'School Campus Safety System',
    caption: <>Child safety-first design. Facial recognition at entry gates, <strong>AI crowd detection</strong> in corridors, instant parent-notification mobile alerts. <strong>Zero-intrusion record</strong> since installation.</>,
    tags: ['Education', 'Child Safety', 'Smart Alerts'],
    likes: 891,
    date: '3 weeks ago',
  },
  {
    id: '6',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=400&fit=crop',
    title: 'Retail Chain — LPR System',
    caption: <><strong>License Plate Recognition</strong> across 22 store parking lots. Vehicle tracking, unauthorized entry alerts, and parking analytics dashboard. <strong>Reduced theft incidents by 74%</strong>.</>,
    tags: ['LPR', 'Retail', 'Analytics'],
    likes: 255,
    date: '1 month ago',
  },
  {
    id: '7',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=400&h=400&fit=crop',
    title: 'Gated Community — Full Stack',
    caption: <>360-home gated community. Boom barriers, vehicle tracking, visitor management system, and <strong>24/7 NOC monitoring</strong>. Guard-free perimeter with <strong>sub-60s response</strong>.</>,
    tags: ['Residential', 'Boom Barrier', 'NOC'],
    likes: 638,
    date: '1 month ago',
  },
  {
    id: '8',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&h=600&fit=crop',
    title: 'Data Center Physical Security',
    caption: <>Tier-3 data center with multi-layered physical access: mantrap, biometric, CCTV, and motion-activated alarms. <strong>Compliant with ISO 27001</strong> physical security controls.</>,
    tags: ['Data Center', 'ISO 27001', 'Mantrap'],
    likes: 447,
    date: '2 months ago',
  },
  {
    id: '9',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&h=400&fit=crop',
    title: 'Night Vision Upgrade — Factory',
    caption: <>Complete overhaul of an older DVR system to modern IP NVR with <strong>starlight night vision cameras</strong>. 60% reduction in operational costs. Factory now operates <strong>blind-spot-free 24/7</strong>.</>,
    tags: ['Night Vision', 'IP NVR', 'Upgrade'],
    likes: 312,
    date: '2 months ago',
  },
];

/* ─── Lightbox Modal ─── */
function Lightbox({ post, onClose }) {
  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-modal glass-card"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          <img src={post.thumb} alt={post.title} className="lightbox-img" />
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={onClose} id="lightbox-close-btn">✕</button>

            <div className="lightbox-ig-header">
              <div className="ig-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="#00d4ff" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="5" stroke="#00d4ff" strokeWidth="1.5" />
                  <circle cx="18.5" cy="5.5" r="1.5" fill="#00d4ff" />
                </svg>
              </div>
              <div>
                <div className="ig-username">@secmate_technologies</div>
                <div className="ig-date">{post.date}</div>
              </div>
              <a
                href="https://www.instagram.com/secmate_technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="ig-follow-btn"
                id="ig-follow-link"
              >
                Follow
              </a>
            </div>

            <h3 className="lightbox-title">{post.title}</h3>
            <p className="lightbox-caption">{post.caption}</p>

            <div className="lightbox-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">#{tag.replace(/ /g, '_')}</span>
              ))}
            </div>

            <div className="lightbox-stats">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#00d4ff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                {post.likes} likes
              </span>
              <a
                href="https://www.instagram.com/secmate_technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                View on Instagram ↗
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Portfolio Section ─── */
export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="portfolio" className="portfolio section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Our Portfolio</span>
          <h2>
            Innovative Technology for <br />
            <span className="gradient-text">Enhanced Protection</span>
          </h2>
          <p>
            Real-world installations in Palakkad and Thrissur. <strong>Click any project</strong> to see technical details.
            <br />
            <a
              href="https://www.instagram.com/secmate_technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-link"
              id="ig-profile-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#00d4ff" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#00d4ff" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="#00d4ff"/></svg>
              Follow @secmate_technologies for live updates
            </a>
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="portfolio-grid">
          {MOCK_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              className="portfolio-item"
              id={`portfolio-item-${post.id}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(post)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={post.thumb} alt={post.title} loading="lazy" />
              <div className="portfolio-overlay">
                <div className="portfolio-meta">
                  <span className="portfolio-title">{post.title}</span>
                  <div className="portfolio-tags">
                    {post.tags.slice(0, 2).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-likes">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#00d4ff"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {post.likes}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="portfolio-footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://www.instagram.com/secmate_technologies"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            id="portfolio-ig-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            View All on Instagram
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selected && <Lightbox post={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
