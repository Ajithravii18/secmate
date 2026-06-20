import React, { useRef, useEffect, Suspense, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Realistic Rectangular Bullet Camera ─── */
function CCTVCamera({ globalMouse, isInteracting, isDragging, dragOffset }) {
  const group = useRef();
  const innerGimbal = useRef();
  const lensGlow = useRef();
  const isReady = useRef(false);

  useEffect(() => {
    if (group.current) {
      // Initial hidden state: camera is high up in the ceiling
      group.current.position.y = 5;
      
      // Initial gimbal state: looking straight down at the floor
      if (innerGimbal.current) {
        innerGimbal.current.rotation.x = -Math.PI / 2;
      }

      // 1. Drop down from the ceiling
      gsap.to(group.current.position, {
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // 2. Sentry activation: robotically swing the lens up to look at the user
      if (innerGimbal.current) {
        gsap.to(innerGimbal.current.rotation, {
          x: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.75)', // Adds a slight mechanical bounce when locking in
          delay: 0.9, // Swings up after the drop finishes
          onComplete: () => {
            isReady.current = true; // Enable mouse tracking after activation
          }
        });
      }
    }
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Interactive tracking (only after entry animation completes)
    if (innerGimbal.current && isReady.current) {
      let targetPan = 0;
      let targetTilt = 0;

      if (isDragging && isDragging.current) {
        // Drag mode
        targetPan = dragOffset.current.pan;
        targetTilt = dragOffset.current.tilt;
        
        // Clamp to prevent breaking its neck
        targetPan = Math.max(-Math.PI/2, Math.min(Math.PI/2, targetPan));
        targetTilt = Math.max(-Math.PI/3, Math.min(Math.PI/4, targetTilt));
        
        dragOffset.current.pan = targetPan;
        dragOffset.current.tilt = targetTilt;

      } else if (isInteracting && isInteracting.current) {
        // Mouse tracking mode
        targetPan = globalMouse.x * (Math.PI / 4); 
        targetTilt = -globalMouse.y * (Math.PI / 6);
        
        // Sync drag offset so next drag starts from current pan/tilt
        if (dragOffset) {
           dragOffset.current.pan = targetPan;
           dragOffset.current.tilt = targetTilt;
        }
      }

      // Safety check to prevent NaN corrupting the mesh transform
      if (isNaN(targetPan)) targetPan = 0;
      if (isNaN(targetTilt)) targetTilt = 0;

      // Fast, snappy interpolation for responsive motorized movement without bounce
      innerGimbal.current.rotation.y += (targetPan - innerGimbal.current.rotation.y) * 0.12;
      innerGimbal.current.rotation.x += (targetTilt - innerGimbal.current.rotation.x) * 0.12;
    }

    // Lens recording indicator pulse
    if (lensGlow.current) {
      lensGlow.current.material.emissiveIntensity = (Math.sin(t * 4) > 0) ? 0.8 : 0.2;
    }
  });

  return (
    <group ref={group} scale={[2.2, 2.2, 2.2]} rotation={[0.25, -0.5, 0]}>
      
      {/* ══ CEILING MOUNT BRACKET ══ */}
      <group position={[0, 0.45, -0.2]}>
        {/* Top ceiling mount plate */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.04, 32]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.3} />
        </mesh>
        
        {/* Vertical arm */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 32]} />
          <meshStandardMaterial color="#ebebeb" metalness={0.2} roughness={0.3} />
        </mesh>
        
        {/* Pivot Knuckle */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#cccccc" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>

      {/* ══ MAIN CAMERA BODY (Tracks Mouse) ══ */}
      <group ref={innerGimbal} position={[0, 0.35, -0.2]}>
        
        {/* The main white rectangular casing */}
        <RoundedBox args={[0.35, 0.35, 0.9]} radius={0.06} position={[0, 0, 0.25]}>
          <meshStandardMaterial color="#ffffff" metalness={0.05} roughness={0.2} />
        </RoundedBox>

        {/* Branding on the Right Side */}
        <group position={[0.176, 0, 0.25]} rotation={[0, Math.PI / 2, 0]}>
          <Text 
            position={[0.02, 0.03, 0]} 
            fontSize={0.06} 
            color="#333333" 
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
            fontWeight="bold"
          >
            SECMATE
          </Text>
          <Text 
            position={[0.02, -0.04, 0]} 
            fontSize={0.025} 
            color="#555555" 
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.15}
          >
            TECHNOLOGIES
          </Text>
        </group>

        {/* Branding on the Left Side */}
        <group position={[-0.176, 0, 0.25]} rotation={[0, -Math.PI / 2, 0]}>
          <Text 
            position={[-0.02, 0.03, 0]} 
            fontSize={0.06} 
            color="#333333" 
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
            fontWeight="bold"
          >
            SECMATE
          </Text>
          <Text 
            position={[-0.02, -0.04, 0]} 
            fontSize={0.025} 
            color="#555555" 
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.15}
          >
            TECHNOLOGIES
          </Text>
        </group>

        {/* Visor / Sun Shield (top overhang) */}
        <RoundedBox args={[0.38, 0.03, 0.95]} radius={0.015} position={[0, 0.185, 0.3]}>
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
        </RoundedBox>

        {/* Dark front face block */}
        <RoundedBox args={[0.3, 0.3, 0.1]} radius={0.04} position={[0, 0, 0.68]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </RoundedBox>

        {/* Lens Outer Ring */}
        <mesh position={[0, 0, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 32]} />
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lens Glass */}
        <mesh position={[0, 0, 0.74]}>
          <circleGeometry args={[0.1]} />
          <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
        </mesh>

        {/* Camera Sensor reflection */}
        <mesh position={[0, 0, 0.745]}>
          <circleGeometry args={[0.04, 32]} />
          <meshStandardMaterial color="#020205" metalness={0.9} roughness={0.1} emissive="#003366" emissiveIntensity={0.25} />
        </mesh>

        {/* Inner IR dot */}
        <mesh position={[0, 0, 0.746]}>
          <circleGeometry args={[0.015, 16]} />
          <meshStandardMaterial color="#000" emissive="#0066ff" emissiveIntensity={0.4} />
        </mesh>

        {/* Recording Indicator (Red LED) */}
        <mesh ref={lensGlow} position={[0.11, -0.11, 0.73]}>
           <sphereGeometry args={[0.012, 8, 8]} />
           <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Decorative Wires ─── */
function Wires() {
  const wires = useMemo(() => {
    const curves = [];
    // Create an organized, sweeping cable loom branching both ways
    for (let i = 0; i < 8; i++) {
      const offsetX = Math.sin(i * Math.PI / 4) * 0.06;
      const offsetY = Math.cos(i * Math.PI / 4) * 0.06;
      
      const isGoingRight = i % 2 === 0;
      const targetX = isGoingRight ? 6.0 : -6.0; 
      const targetY = isGoingRight ? 4.0 : 5.0;
      
      curves.push({
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(0 + offsetX, 0.45, -0.2 + offsetY), 
          new THREE.Vector3((isGoingRight ? 2.0 : -2.0) + offsetX, 1.5 + offsetY, -1.5),
          new THREE.Vector3((isGoingRight ? 4.0 : -4.0) + offsetX, 3.0 + offsetY, -4.0),
          new THREE.Vector3(targetX + offsetX, targetY + offsetY, -8.0)
        ]),
        isFiber: i === 2 || i === 7 
      });
    }
    return curves;
  }, []);

  return (
    <group>
      {wires.map((wire, index) => (
        <mesh key={index}>
          <tubeGeometry args={[wire.curve, 64, wire.isFiber ? 0.006 : 0.012, 8, false]} />
          <meshStandardMaterial 
            color={wire.isFiber ? "#0066ff" : "#cccccc"} 
            roughness={0.2} 
            metalness={0.8} 
            emissive={wire.isFiber ? "#0066ff" : "#000000"}
            emissiveIntensity={wire.isFiber ? 1 : 0}
            transparent={true}
            opacity={0.25} // Very subtle watermark effect
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Background Grid ─── */
function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshStandardMaterial
        color="#000000"
        wireframe
        transparent
        opacity={0.03}
      />
    </mesh>
  );
}



/* ─── Hero 3D Canvas ─── */
function Scene({ scrollProgress, globalMouse, isInteracting, isDragging, dragOffset }) {
  return (
    <>
      <fog attach="fog" args={['#ffffff', 5, 15]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 6, 4]} intensity={3.5} color="#ffffff" />
      <pointLight position={[-4, 3, -2]} intensity={1.8} color="#e8f0ff" />
      <pointLight position={[0, -3, 5]} intensity={1.2} color="#ffffff" />
      <spotLight position={[0, 8, 2]} intensity={3} color="#ffffff" angle={0.35} penumbra={0.85} />

      {/* Subtle Neon Particles */}
      <Sparkles
        count={70}
        scale={12}
        size={0.7}
        speed={0.15}
        color="#0066ff"
        opacity={0.15}
        noise={1}
      />

      <group position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <CCTVCamera globalMouse={globalMouse} isInteracting={isInteracting} isDragging={isDragging} dragOffset={dragOffset} />
        <Wires />
      </group>

      <Environment preset="night" />
    </>
  );
}


/* ─── Hero Section ─── */
export default function Hero() {
  const scrollProgress = useRef(0);
  const sectionRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isInteracting = useRef(false);
  const isDragging = useRef(false);
  const dragOffset = useRef({ pan: 0, tilt: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const interactionTimeout = useRef(null);

  const getClientPos = (e) => {
    if (typeof e.clientX === 'number') {
      return { x: e.clientX, y: e.clientY };
    }
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: 0, y: 0 };
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = getClientPos(e);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    const pos = getClientPos(e);
    
    if (isDragging.current) {
      const dx = pos.x - lastMousePos.current.x;
      const dy = pos.y - lastMousePos.current.y;
      
      if (!isNaN(dx) && !isNaN(dy)) {
        dragOffset.current.pan += dx * 0.005; // Drag direction mapping
        dragOffset.current.tilt += dy * 0.005;
      }
      lastMousePos.current = pos;
    } else {
      setMousePos(pos);
    }
    
    isInteracting.current = true;
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      isInteracting.current = false;
    }, 100);
  };

  const handleInteractionStart = () => { isInteracting.current = true; };
  const handleInteractionEnd = () => { 
    isInteracting.current = false; 
    isDragging.current = false; 
  };

  // Compute normalized global mouse coordinates [-1, 1] for the 3D camera
  const globalMouse = {
    x: typeof window !== 'undefined' ? (mousePos.x / window.innerWidth) * 2 - 1 : 0,
    y: typeof window !== 'undefined' ? -(mousePos.y / window.innerHeight) * 2 + 1 : 0
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const maskReveal = {
    hidden: { y: '120%' },
    visible: { y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section 
      id="home" 
      className="hero" 
      ref={sectionRef} 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerEnter={handleInteractionStart}
      onPointerLeave={handleInteractionEnd}
      onPointerCancel={handleInteractionEnd}
    >
      {/* Scan line effect */}
      <div className="scanline" />


      {/* Content */}
      <div className="hero-content container">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-dot" />
            Trusted Security Partner
          </motion.div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
              <motion.h1 variants={maskReveal} style={{ margin: 0, lineHeight: 1.15 }}>
                Advanced <span className="hero-accent">Surveillance.</span>
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
              <motion.h1 variants={maskReveal} style={{ margin: 0, lineHeight: 1.15 }}>
                Uncompromised <span className="hero-accent">Security.</span>
              </motion.h1>
            </div>
          </div>

          {/* Sub */}
          <motion.p className="hero-sub" variants={itemVariants}>
            Enterprise-grade CCTV, intelligent tracking & thermal imaging systems.
            Next-generation protection for commercial and residential infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <a href="#services" className="btn btn-primary" id="hero-cta-primary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="3" fill="currentColor" />
              </svg>
              Ready to Get CCTV
            </a>
            <a href="#portfolio" className="btn btn-ghost" id="hero-cta-secondary">
              View Portfolio →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero-stats" variants={itemVariants}>
            {[
              { value: '12+', label: 'Years of Excellence' },
              { value: '5K+', label: 'Successful Installations' },
              { value: '75+', label: 'Patents in Security' },
              { value: '99.8%', label: 'Uptime Guaranteed' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Canvas Container on the right */}
      <motion.div
        className="hero-camera-container"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', height: '100%', width: '100%' }}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} globalMouse={globalMouse} isInteracting={isInteracting} isDragging={isDragging} dragOffset={dragOffset} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
