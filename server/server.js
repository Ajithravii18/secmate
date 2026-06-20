require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const instagramRoutes = require('./routes/instagram');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/secmate';

// ── Middleware ──
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ── Routes ──
app.use('/api/instagram', instagramRoutes);

// ── Contact form endpoint (wire to email service later) ──
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, message } = req.body;
  console.log(`[Contact] New lead: ${name} | ${email} | ${phone} | ${service}`);
  // TODO: Add nodemailer / SendGrid to email this to info@secmate.in
  res.json({ success: true, message: 'Thank you! We will reach out within 2 hours.' });
});

// ── Health check ──
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── MongoDB + Server start ──
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB connected: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 Secmate API running on http://localhost:${PORT}`);
      console.log(`📸 Instagram feed: http://localhost:${PORT}/api/instagram/posts`);
    });
  })
  .catch(err => {
    console.warn(`⚠️  MongoDB not available (${err.message}). Starting without DB...`);
    // Start without MongoDB — Instagram route will skip caching
    app.listen(PORT, () => {
      console.log(`🚀 Secmate API running on http://localhost:${PORT} (no DB)`);
    });
  });
