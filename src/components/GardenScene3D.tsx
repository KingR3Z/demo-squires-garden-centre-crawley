"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Procedural grass plane
function GrassPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30, 32, 32]} />
      <meshStandardMaterial color="#2d5016" roughness={0.9} metalness={0} />
    </mesh>
  );
}

// Procedural tree — seed-based color for stability across re-renders
function Tree({ position, scale = 1, seed = 0 }: { position: [number, number, number]; scale?: number; seed?: number }) {
  const trunkColor = useMemo(() => new THREE.Color("#4a3728"), []);
  const leafColor = useMemo(() => {
    // Deterministic pseudo-random from seed instead of Math.random()
    const hueOffset = ((seed * 7 + 3) % 100) / 100 * 0.08;
    const lightOffset = ((seed * 13 + 7) % 100) / 100 * 0.15;
    return new THREE.Color().setHSL(0.28 + hueOffset, 0.6, 0.3 + lightOffset);
  }, [seed]);
  const leafColorLight = useMemo(() => leafColor.clone().multiplyScalar(1.1), [leafColor]);

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, 1.2, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <mesh position={[0, 1.6, 0]} castShadow>
          <sphereGeometry args={[0.7, 12, 12]} />
          <meshStandardMaterial color={leafColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.1, 0]} castShadow>
          <sphereGeometry args={[0.5, 10, 10]} />
          <meshStandardMaterial color={leafColorLight} roughness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

// Procedural stone path
function StonePath() {
  const stones = useMemo(() => {
    const s: Array<{ pos: [number, number, number]; scale: [number, number, number]; rot: number }> = [];
    for (let i = 0; i < 12; i++) {
      const z = -5 + i * 0.9;
      const x = Math.sin(i * 0.4) * 0.3;
      // Deterministic pseudo-random from index
      const sw = 0.35 + ((i * 7 + 3) % 10) / 10 * 0.15;
      const sd = 0.3 + ((i * 13 + 7) % 10) / 10 * 0.1;
      const rot = ((i * 11 + 5) % 10) / 10 * 0.3;
      s.push({ pos: [x, -0.45, z], scale: [sw, 0.06, sd], rot });
    }
    return s;
  }, []);

  return (
    <group>
      {stones.map((stone, i) => (
        <mesh key={i} position={stone.pos} rotation={[0, stone.rot, 0]} receiveShadow>
          <boxGeometry args={stone.scale} />
          <meshStandardMaterial color="#8a8276" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// Procedural flower bed
function FlowerBed({ position, color }: { position: [number, number, number]; color: string }) {
  const flowers = useMemo(() => {
    const f: Array<{ pos: [number, number, number]; h: number }> = [];
    for (let i = 0; i < 8; i++) {
      // Deterministic pseudo-random from index
      const px = ((i * 7 + 3) % 15) / 15 * 1.5 - 0.75;
      const py = -0.2 + ((i * 11 + 5) % 10) / 10 * 0.3;
      const pz = ((i * 13 + 7) % 8) / 8 * 0.8 - 0.4;
      const h = 0.15 + ((i * 17 + 2) % 10) / 10 * 0.2;
      f.push({ pos: [px, py, pz], h });
    }
    return f;
  }, []);

  return (
    <group position={position}>
      <mesh position={[0, -0.42, 0]} receiveShadow>
        <boxGeometry args={[1.8, 0.12, 1]} />
        <meshStandardMaterial color="#3d2b1f" roughness={1} />
      </mesh>
      {flowers.map((f, i) => {
        const flowerContent = (
          <group position={f.pos}>
            <mesh>
              <cylinderGeometry args={[0.01, 0.01, f.h, 4]} />
              <meshStandardMaterial color="#2d5016" />
            </mesh>
            <mesh position={[0, f.h / 2 + 0.03, 0]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
            </mesh>
          </group>
        );
        // Only animate every other flower to reduce GPU load
        return i % 2 === 0 ? (
          <Float key={i} speed={2} floatIntensity={0.05} rotationIntensity={0.02}>
            {flowerContent}
          </Float>
        ) : (
          <group key={i}>{flowerContent}</group>
        );
      })}
    </group>
  );
}

// Garden bench
function GardenBench({ position }: { position: [number, number, number] }) {
  const woodColor = useMemo(() => new THREE.Color("#6b4226"), []);
  const legPositions = useMemo<[number, number, number][]>(() => [
    [-0.5, -0.25, 0.15], [0.5, -0.25, 0.15],
    [-0.5, -0.25, -0.15], [0.5, -0.25, -0.15],
  ], []);

  return (
    <group position={position} rotation={[0, Math.PI / 6, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.35, -0.18]} castShadow>
        <boxGeometry args={[1.2, 0.5, 0.04]} />
        <meshStandardMaterial color={woodColor} roughness={0.8} />
      </mesh>
      {legPositions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
          <meshStandardMaterial color="#333" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Water feature with memoized stones
function Pond({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null);

  const pondStones = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const r = 1.15 + ((i * 7 + 3) % 10) / 10 * 0.15;
      const size = 0.08 + ((i * 13 + 5) % 10) / 10 * 0.06;
      return {
        pos: [Math.cos(angle) * r, -0.42, Math.sin(angle) * r] as [number, number, number],
        size,
      };
    });
  }, []);

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = -0.48 + Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, -0.48, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.0, 0.15, 24]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.9} />
      </mesh>
      <mesh ref={waterRef} position={[0, -0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 24]} />
        <meshStandardMaterial color="#1a4a6b" roughness={0.1} metalness={0.3} transparent opacity={0.85} />
      </mesh>
      {pondStones.map((stone, i) => (
        <mesh key={i} position={stone.pos} castShadow>
          <sphereGeometry args={[stone.size, 6, 6]} />
          <meshStandardMaterial color="#7a7a72" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// Scroll-driven camera + slow auto-rotate
function CameraController() {
  const groupRef = useRef<THREE.Group>(null);
  const ORBIT_SPEED = 0.02;
  const SWAY_SPEED = 0.1;
  const SWAY_AMOUNT = 0.3;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * SWAY_SPEED) * SWAY_AMOUNT +
        state.clock.elapsedTime * ORBIT_SPEED;
    }
  });

  return <group ref={groupRef} />;
}

// Complete procedural garden scene
function ProceduralGarden() {
  const groupRef = useRef<THREE.Group>(null);
  const ORBIT_SPEED = 0.02;
  const SWAY_SPEED = 0.1;
  const SWAY_AMOUNT = 0.3;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * SWAY_SPEED) * SWAY_AMOUNT +
        state.clock.elapsedTime * ORBIT_SPEED;
    }
  });

  return (
    <group ref={groupRef}>
      <GrassPlane />
      <StonePath />
      <Tree position={[-3, 0, -2]} scale={1.2} seed={1} />
      <Tree position={[3.5, 0, -1]} scale={0.9} seed={2} />
      <Tree position={[-2, 0, 3]} scale={1.0} seed={3} />
      <Tree position={[4, 0, 3.5]} scale={0.7} seed={4} />
      <Tree position={[-4.5, 0, -4]} scale={1.4} seed={5} />
      <FlowerBed position={[1.5, 0, 1]} color="#e84393" />
      <FlowerBed position={[-1.5, 0, -1.5]} color="#fdcb6e" />
      <FlowerBed position={[2, 0, -3]} color="#a29bfe" />
      <GardenBench position={[2, 0, 0.5]} />
      <Pond position={[-1.5, 0, 2.5]} />
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-accent)",
        fontSize: "0.875rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
    >
      Loading 3D Garden...
    </div>
  );
}

export default function GardenScene3D() {
  return (
    <section
      aria-label="Interactive 3D garden preview. Drag to rotate, scroll to zoom."
      style={{
        position: "relative",
        height: "100vh",
        background: "linear-gradient(180deg, #1a1a1a 0%, #0a1a0a 50%, #1a1a1a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: "var(--color-accent)",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Interactive Garden Preview
        </p>
        <h2
          style={{
            color: "white",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Explore Your Future Garden
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.8rem",
            marginTop: "8px",
          }}
        >
          Drag to rotate · Scroll to zoom · Pinch on mobile
        </p>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          camera={{ position: [6, 4, 6], fov: 45 }}
          style={{ position: "absolute", inset: 0 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          {/* Lighting — key + fill + ambient */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[8, 12, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={30}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#ffd4a3" />
          {/* Bounce light from below */}
          <hemisphereLight args={["#87ceeb", "#2d5016", 0.3]} />

          {/* Atmospheric fog */}
          <fog attach="fog" args={["#0a1a0a", 12, 25]} />

          {/* Scene */}
          <ProceduralGarden />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={12}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(transparent, #1a1a1a)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </section>
  );
}
