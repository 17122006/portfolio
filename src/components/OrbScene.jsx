import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';

/**
 * The single 3D centerpiece: a faceted glass-like orb, a counter-rotating wireframe shell
 * and one thin ring. Decorative only — pointer events are disabled by the wrapper.
 * This file (and three.js) is lazy-loaded from OrbCanvas.jsx.
 */
function Orb({ simplified }) {
  const group = useRef(null);
  const core = useRef(null);
  const shell = useRef(null);
  const ring = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const viewport = useThree((state) => state.viewport);

  // Mouse-responsive tilt. Stored in a ref so moving the mouse never triggers a React re-render.
  useEffect(() => {
    if (simplified) return undefined;
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [simplified]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05); // avoids a jump after the loop was paused
    const t = state.clock.elapsedTime;

    group.current.position.y = Math.sin(t * 0.8) * 0.12;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.45, 3, dt);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, pointer.current.y * 0.3, 3, dt);

    core.current.rotation.y += dt * 0.12;
    core.current.rotation.x += dt * 0.05;
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.08;
      shell.current.rotation.z += dt * 0.04;
    }
    ring.current.rotation.z += dt * 0.1;
  });

  // Fit the whole composition (ring diameter ≈ 4.3 units) inside whatever box the canvas has.
  const scale = MathUtils.clamp(Math.min(viewport.width, viewport.height) / 4.7, 0.4, 1.15);

  return (
    <group ref={group} scale={scale}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.25, simplified ? 1 : 2]} />
        <meshPhysicalMaterial
          color="#9c97ff"
          roughness={0.16}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.12}
          flatShading
          transparent
          opacity={0.9}
        />
      </mesh>

      {!simplified && (
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#cfcbff" wireframe transparent opacity={0.2} />
        </mesh>
      )}

      <group rotation={[1.1, 0.25, 0]}>
        <mesh ref={ring}>
          <torusGeometry args={[2.15, 0.012, 8, simplified ? 64 : 128]} />
          <meshBasicMaterial color="#8fb4ff" transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

export default function OrbScene({ active, simplified, onFail }) {
  return (
    <Canvas
      style={{ animation: 'fadeIn 0.9s ease both' }}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, simplified ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 40 }}
      gl={{ antialias: !simplified, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          'webglcontextlost',
          (event) => {
            event.preventDefault();
            onFail?.();
          },
          { once: true },
        );
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#8fb4ff" />
      <pointLight position={[4, -3, -2]} intensity={18} color="#b4aefc" />
      <Orb simplified={simplified} />
    </Canvas>
  );
}
