import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div 
      className="lens-loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      style={{ zIndex: 9999 }} // Override to ensure it covers everything
    >
      <div className="lens-crosshair-x"></div>
      <div className="lens-crosshair-y"></div>
      <div className="lens-ring">
        <div className="lens-core"></div>
      </div>
      <div className="lens-loader-text">
        <span className="blink">●</span> INITIALIZING SYSTEM
      </div>
    </motion.div>
  );
}
