const express = require('express');
const router = express.Router();
const axios = require('axios');
const InstagramCache = require('../models/InstagramCache');

/**
 * ──────────────────────────────────────────────────────────────
 *  INSTAGRAM GRAPH API PROXY
 * ──────────────────────────────────────────────────────────────
 *
 *  TO ENABLE LIVE INSTAGRAM FEED:
 *
 *  1. Create a Facebook Developer App:
 *     https://developers.facebook.com/apps/
 *
 *  2. Add the "Instagram Basic Display" product.
 *
 *  3. Under "User Token Generator", add yourself as a test user
 *     for the @secmate_technologies Instagram account.
 *
 *  4. Generate a Long-lived User Access Token (valid 60 days;
 *     set up a cron to refresh via /refresh_access_token endpoint).
 *
 *  5. Copy the token to your server/.env:
 *        INSTAGRAM_ACCESS_TOKEN=IGAAxxxxxxxxxxxxxxxxxxxxxxxxxx
 *
 *  6. In the React Portfolio component (Portfolio.jsx), replace
 *     the MOCK_POSTS usage with:
 *        const res = await fetch('http://localhost:5000/api/instagram/posts');
 *        const data = await res.json();
 *        setPosts(data.posts);
 * ──────────────────────────────────────────────────────────────
 */

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const IG_API_BASE = 'https://graph.instagram.com';

// ── GET /api/instagram/posts ─────────────────────────────────
router.get('/posts', async (req, res) => {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
      return res.status(200).json({
        source: 'mock',
        message: 'No Instagram access token configured. Set INSTAGRAM_ACCESS_TOKEN in .env to enable live feed.',
        posts: [],
      });
    }

    // ── Check MongoDB cache ──
    const cached = await InstagramCache.findOne({ cacheKey: 'instagram_posts' });
    const now = Date.now();

    if (cached && (now - cached.lastUpdated.getTime()) < CACHE_TTL_MS) {
      console.log('[Instagram] Serving from MongoDB cache');
      return res.json({
        source: 'cache',
        lastUpdated: cached.lastUpdated,
        posts: cached.posts,
      });
    }

    // ── Fetch fresh from Instagram Graph API ──
    console.log('[Instagram] Fetching fresh posts from Instagram API...');

    const mediaRes = await axios.get(`${IG_API_BASE}/me/media`, {
      params: {
        fields: 'id,caption,media_url,thumbnail_url,permalink,media_type,timestamp',
        access_token: token,
        limit: 12,
      },
    });

    const rawPosts = mediaRes.data?.data || [];

    const posts = rawPosts.map(p => ({
      postId:    p.id,
      mediaUrl:  p.media_url,
      thumbnail: p.thumbnail_url || p.media_url, // videos have thumbnail_url
      permalink: p.permalink,
      caption:   p.caption || '',
      mediaType: p.media_type,
      timestamp: p.timestamp,
      likeCount: 0, // Basic Display API doesn't expose like counts
    }));

    // ── Upsert into MongoDB cache ──
    await InstagramCache.findOneAndUpdate(
      { cacheKey: 'instagram_posts' },
      { posts, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    console.log(`[Instagram] Cached ${posts.length} posts in MongoDB`);

    return res.json({
      source: 'live',
      lastUpdated: new Date(),
      posts,
    });

  } catch (err) {
    console.error('[Instagram] Error:', err.response?.data || err.message);

    // Return stale cache if available on error
    try {
      const stale = await InstagramCache.findOne({ cacheKey: 'instagram_posts' });
      if (stale && stale.posts.length) {
        return res.json({
          source: 'stale_cache',
          lastUpdated: stale.lastUpdated,
          posts: stale.posts,
        });
      }
    } catch (_) {}

    return res.status(500).json({
      error: 'Failed to fetch Instagram posts',
      detail: err.response?.data?.error?.message || err.message,
    });
  }
});

// ── GET /api/instagram/refresh ── (call this on a monthly cron)
router.get('/refresh', async (req, res) => {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) return res.status(400).json({ error: 'No token configured' });

    const resp = await axios.get(`${IG_API_BASE}/refresh_access_token`, {
      params: { grant_type: 'ig_refresh_token', access_token: token },
    });

    res.json({
      message: 'Token refreshed — update INSTAGRAM_ACCESS_TOKEN in .env with the new token',
      newToken: resp.data.access_token,
      expiresIn: resp.data.expires_in,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
