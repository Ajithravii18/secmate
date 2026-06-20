const mongoose = require('mongoose');

const instagramPostSchema = new mongoose.Schema({
  postId:    { type: String, required: true, unique: true },
  mediaUrl:  { type: String },
  thumbnail: { type: String },
  permalink: { type: String },
  caption:   { type: String },
  mediaType: { type: String }, // IMAGE, VIDEO, CAROUSEL_ALBUM
  timestamp: { type: String },
  likeCount: { type: Number, default: 0 },
});

const instagramCacheSchema = new mongoose.Schema({
  cacheKey: { type: String, default: 'instagram_posts', unique: true },
  posts:    [instagramPostSchema],
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InstagramCache', instagramCacheSchema);
