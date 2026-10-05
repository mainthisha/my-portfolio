"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, Float } from "@react-three/drei";

const GOLD = "#d8be8c";

function hash(v: THREE.Vector3) {
  const s = Math.sin(+v.x.toFixed(3) * 127.1 + +v.y.toFixed(3) * 311.7 + +v.z.toFixed(3) * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Faceted, irregular, elongated crystal built from a displaced icosahedron. */
function useCrystal(radius: number, detail: number, stretch: number, seed = 0) {
  return useMemo(() => {
    const g = new THREE.IcosahedronGeometry(radius, detail);
    const p = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const k = 0.72 + hash(v.clone().addScalar(seed)) * 0.55;
      v.multiplyScalar(k);
      v.y *= stretch;
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return { geo: g, edges: new THREE.EdgesGeometry(g, 1) };
  }, [radius, detail, stretch, seed]);
}

function Sculpture({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const main = useCrystal(1.25, 1, 1.5);
  const shardA = useCrystal(0.3, 0, 1.6, 3);
  const shardB = useCrystal(0.22, 0, 1.4, 7);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 0.12 + px * 0.55 + s * 1.6, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.3 + s * 0.35, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, s * 1.4, 3, dt);
    if (ring.current) { ring.current.rotation.z = t * 0.15; ring.current.rotation.x = 1.15 + px * 0.15; }
    if (ring2.current) { ring2.current.rotation.z = -t * 0.1; ring2.current.rotation.y = 0.5 + py * 0.15; }
  });

  return (
    <group ref={group}>
      <mesh geometry={main.geo}>
        <meshStandardMaterial color="#1a1714" metalness={1} roughness={0.22} flatShading envMapIntensity={1.6} />
      </mesh>
      <lineSegments geometry={main.edges}>
        <lineBasicMaterial color={GOLD} transparent opacity={0.55} />
      </lineSegments>
      {/* inner ember */}
      <pointLight color={GOLD} intensity={9} distance={4} position={[0, 0, 0]} />

      <mesh ref={ring} scale={[2.6, 2.6, 2.6]}>
        <torusGeometry args={[1, 0.004, 8, 200]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring2} scale={[3.3, 3.3, 3.3]}>
        <torusGeometry args={[1, 0.0025, 8, 200]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.35} />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <group position={[1.9, 0.9, 0.6]}>
          <mesh geometry={shardA.geo}><meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} flatShading /></mesh>
        </group>
      </Float>
      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.4}>
        <group position={[-1.9, -1.1, 0.3]}>
          <mesh geometry={shardB.geo}><meshStandardMaterial color="#2a2621" metalness={1} roughness={0.2} flatShading /></mesh>
          <lineSegments geometry={shardB.edges}><lineBasicMaterial color={GOLD} transparent opacity={0.6} /></lineSegments>
        </group>
      </Float>
    </group>
  );
}

export default function CrystalScene({ scrollRef, active }: { scrollRef: React.MutableRefObject<number>; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.15} />
      <spotLight position={[5, 6, 5]} angle={0.4} penumbra={1} intensity={90} color="#ffdca0" />
      <spotLight position={[-6, -2, -3]} angle={0.6} penumbra={1} intensity={45} color="#b98a4a" />
      <Environment resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={3.2} color="#ffd9a0" position={[4, 3, 2]} scale={[5, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#fff1dc" position={[-5, 1, 3]} scale={[2, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#d8be8c" position={[0, -4, -4]} scale={4} />
      </Environment>
      <Sculpture scrollRef={scrollRef} />
      <Sparkles count={45} scale={[8, 6, 4]} size={2.2} speed={0.25} color={GOLD} opacity={0.7} />
    </Canvas>
  );
}
