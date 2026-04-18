"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMouse } from "@/hooks/useMouse";

// ── Config ─────────────────────────────────────────────────────

const PARTICLE_COUNT = 1500;
const SPHERE_RADIUS = 1.3;
const REPEL_RADIUS = 1.8;
const REPEL_STRENGTH = 2.0;

// ── Shaders ────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aRandom;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uHover;
  uniform vec3 uHoverPoint;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Distance to hover point → heat factor for color/size shift
    float hDist = length(position - uHoverPoint);
    float heat = uHover * (1.0 - smoothstep(0.0, 1.8, hDist));

    // Shift color toward hot white/orange near cursor
    vColor = mix(aColor, vec3(1.0, 0.4, 0.15), heat * 0.9);

    // Subtle per-particle alpha flicker
    vAlpha = 0.7 + 0.3 * sin(uTime * 1.0 + aRandom * 6.2831);

    // Depth fade — back-hemisphere particles are dimmer
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depthFade = smoothstep(-7.0, -3.5, mvPosition.z);
    vAlpha *= mix(0.35, 1.0, depthFade);

    // Boost alpha for heated particles so they glow bright
    vAlpha = mix(vAlpha, 1.0, heat * 0.6);

    // Point size with heat boost — particles near cursor grow larger
    float pulse = 1.0 + 0.1 * sin(uTime * 1.5 + aRandom * 6.2831);
    float hoverBoost = 1.0 + uHover * 0.15;
    float sizeBoost = 1.0 + heat * 1.5;
    gl_PointSize = aSize * pulse * hoverBoost * sizeBoost * (20.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Hard circular dot with a thin soft edge
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.25, 0.5, dist);

    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

// ── Component ──────────────────────────────────────────────────

export default function Shield() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const isHovered = useRef(false);
  const hoverPoint = useRef(new THREE.Vector3());
  const hoverVal = useRef(0);

  const mouse = useMouse();
  const { size } = useThree();
  const mobileScale = size.width < 768 ? 0.65 : 1;

  // Disable raycasting on rings so they don't block hover on the sphere
  useEffect(() => {
    if (ring1Ref.current) ring1Ref.current.raycast = (() => {}) as any;
    if (ring2Ref.current) ring2Ref.current.raycast = (() => {}) as any;
  }, []);

  // ── Particle data (fibonacci sphere) ──

  const { geometry, basePositions, randoms } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const rnd = new Float32Array(PARTICLE_COUNT);

    const deepRed = new THREE.Color("#dc2626");
    const vermilion = new THREE.Color("#ea580c");
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);

      // Organic radius variation (±8%)
      const r = SPHERE_RADIUS * (0.92 + Math.random() * 0.16);
      const x = Math.cos(theta) * Math.sin(phi) * r;
      const y = Math.cos(phi) * r;
      const z = Math.sin(theta) * Math.sin(phi) * r;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      // Size: small dots (1.0–2.5 shader units → ~4–10px)
      sizes[i] = 1.0 + Math.random() * 1.5;

      // Color: 75% deep red, 25% vermilion, with slight variation
      const baseColor = Math.random() < 0.25 ? vermilion : deepRed;
      colors[i * 3] = baseColor.r + (Math.random() - 0.5) * 0.08;
      colors[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * 0.08;
      colors[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * 0.08;

      rnd[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(rnd, 1));

    return { geometry: geo, basePositions: base, randoms: rnd };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  // ── Uniforms ──

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uHoverPoint: { value: new THREE.Vector3() },
    }),
    []
  );

  // Reusable temp vectors
  const _localHover = useMemo(() => new THREE.Vector3(), []);
  const _dir = useMemo(() => new THREE.Vector3(), []);

  // ── Frame loop ──

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // ── Mouse tilt + slow idle spin ──
    if (mouse) {
      const targetY = mouse.x * 0.5 + elapsed * 0.08;
      const targetX = -mouse.y * 0.3;
      groupRef.current.rotation.y +=
        (targetY - groupRef.current.rotation.y) * 0.15;
      groupRef.current.rotation.x +=
        (targetX - groupRef.current.rotation.x) * 0.15;
    } else {
      groupRef.current.rotation.y = elapsed * 0.15;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
    }

    // ── Floating ──
    groupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.12;

    // ── Hover lerp ──
    const targetHover = isHovered.current ? 1.0 : 0.0;
    hoverVal.current += (targetHover - hoverVal.current) * 0.08;

    // ── Local hover position (computed before uniforms + particle loop) ──
    if (isHovered.current) {
      _localHover.copy(hoverPoint.current);
      groupRef.current.worldToLocal(_localHover);
    }

    // ── Uniforms ──
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uHover.value = hoverVal.current;
      materialRef.current.uniforms.uHoverPoint.value.copy(_localHover);
    }

    // ── Particle positions: noise drift + dramatic repulsion ──
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const rnd = randoms[i];

      // Subtle noise drift
      const noiseX = Math.sin(elapsed * 0.5 + rnd * 6.28) * 0.025;
      const noiseY = Math.cos(elapsed * 0.4 + rnd * 4.0) * 0.025;
      const noiseZ = Math.sin(elapsed * 0.6 + rnd * 5.0) * 0.025;

      let tX = basePositions[i3] + noiseX;
      let tY = basePositions[i3 + 1] + noiseY;
      let tZ = basePositions[i3 + 2] + noiseZ;

      // Repulsion — particles explode outward from cursor
      if (isHovered.current) {
        _dir.set(tX, tY, tZ).sub(_localHover);
        const dist = _dir.length();

        if (dist < REPEL_RADIUS && dist > 0.001) {
          const force =
            (1 - dist / REPEL_RADIUS) *
            (1 - dist / REPEL_RADIUS) *
            REPEL_STRENGTH;
          _dir.normalize().multiplyScalar(force);
          tX += _dir.x;
          tY += _dir.y;
          tZ += _dir.z;
        }
      }

      // Fast lerp → instant, responsive feel
      posArr[i3] += (tX - posArr[i3]) * 0.25;
      posArr[i3 + 1] += (tY - posArr[i3 + 1]) * 0.25;
      posArr[i3 + 2] += (tZ - posArr[i3 + 2]) * 0.25;
    }

    posAttr.needsUpdate = true;

    // ── Ring rotation ──
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = elapsed * 0.4;
      ring1Ref.current.rotation.y = elapsed * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -elapsed * 0.3;
      ring2Ref.current.rotation.x = elapsed * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={mobileScale}>
      {/* Particle sphere */}
      <points geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>

      {/* Invisible sphere for hover detection — larger for easy triggering */}
      <mesh
        onPointerEnter={() => {
          isHovered.current = true;
        }}
        onPointerLeave={() => {
          isHovered.current = false;
        }}
        onPointerMove={(e) => {
          if (e.point) hoverPoint.current.copy(e.point);
        }}
      >
        <sphereGeometry args={[SPHERE_RADIUS * 1.3, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Orbiting ring 1 — deep red */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.015, 8, 64, Math.PI * 1.4]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbiting ring 2 — vermilion */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[2.0, 0.012, 8, 64, Math.PI * 1.2]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#ea580c"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
