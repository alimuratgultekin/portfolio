"use client";

import { Canvas } from "@react-three/fiber";
import Shield from "./Shield";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true }}
      dpr={[1, 2]}
      aria-hidden="true"
    >
      {/* Ambient light — soft base illumination */}
      <ambientLight intensity={0.3} />

      {/* Red point light — front-right, cybersecurity accent */}
      <pointLight
        color="#dc2626"
        intensity={2}
        position={[3, 2, 4]}
        distance={12}
      />

      {/* Vermilion fill light — back-left for depth */}
      <pointLight
        color="#ea580c"
        intensity={1}
        position={[-3, -1, -2]}
        distance={10}
      />

      {/* White rim light — top, subtle edge highlight */}
      <pointLight
        color="#ffffff"
        intensity={0.8}
        position={[0, 5, 2]}
        distance={10}
      />

      <Shield />
    </Canvas>
  );
}
