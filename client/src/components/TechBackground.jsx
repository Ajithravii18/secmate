import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import './TechBackground.css';

/* ─── Wavy 3D Background Particles ─── */
function WavyParticles() {
  const count = 60;
  const sep = 1.2;
  const positions = useMemo(() => {
    let pos = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = 0;
        pos.push(x, y, z);
      }
    }
    return new Float32Array(pos);
  }, [count, sep]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.8;
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        // Antigravity style undulation math
        positionsArray[i + 1] = Math.sin((x + t) * 0.2) * 1.5 + Math.sin((z + t) * 0.25) * 1.5;
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, -5, -15]} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#0055dd" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function TechBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      setMousePos({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="global-bg-tech">
      <div className="radar-sweep" />
      <div className="bg-beam bg-beam-1" />
      <div className="bg-beam bg-beam-2" />
      <div className="bg-particles" />
      
      {/* Wavy Background Particles (Full Screen) */}
      <div className="global-canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true, antialias: false }}>
          <WavyParticles />
        </Canvas>
      </div>
      
      {/* Interactive Cursor Aura */}
      <motion.div
        className="interactive-aura"
        animate={{
          x: mousePos.x - 400, // 400 is half of the aura width (800px)
          y: mousePos.y - 400,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.6 }}
      />
    </div>
  );
}
