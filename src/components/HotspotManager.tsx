'use client'

import { useAppStore, Division } from '@/store/useAppStore'
import { Html } from '@react-three/drei'
import { useState, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

function Hotspot({ division }: { division: Division }) {
  const setSelectedDivision = useAppStore((state) => state.setSelectedDivision)
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // Animation for the hotspot (pulsing glow and pop on hover)
  useFrame((state, delta) => {
    if (meshRef.current) {
      const baseScale = hovered ? 1.4 : 1.0;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * (hovered ? 0.05 : 0.1);
      const targetScale = baseScale + pulse;

      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
    }
  })

  return (
    <group position={division.position}>
      {/* Interactive Invisible Box for pointer events */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          
          console.log(`\n=================================`)
          console.log(`Division: ${division.name}`)
          console.log(`To explicitly set the camera for this component, add these lines to its object in src/store/useAppStore.ts:`)
          console.log(`  cameraTarget: [${division.position.map(n => n.toFixed(2)).join(', ')}],`)
          console.log(`  cameraPosition: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}],`)
          // @ts-ignore
          console.log(`  cameraZoom: ${(camera.zoom || 1).toFixed(2)}`)
          console.log(`=================================\n`)

          setSelectedDivision(division)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry args={[division.size[0], 10, division.size[1]]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Ground Highlight Rectangular Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[division.size[0], division.size[1]]} />
        <meshBasicMaterial
          color="#0070f3"
          transparent
          opacity={hovered ? 0.3 : 0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edges geometry for the clear boundary */}
      <lineSegments position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(division.size[0], division.size[1])]} />
        <lineBasicMaterial attach="material" color="#0070f3" linewidth={2} opacity={hovered ? 1 : 0.4} transparent />
      </lineSegments>

      {/* Floating HTML Label (Only visible on hover) */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={25}
        occlude
        className={`transition-all duration-300 pointer-events-none origin-bottom ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      >
        <div className="relative flex flex-col items-center pb-1">
          <div className="bg-primary/90 backdrop-blur-md px-8 py-5 rounded-xl text-white text-3xl font-black whitespace-nowrap shadow-2xl border-2 border-white/20 mb-[-2px]">
            {division.name}
          </div>
          {/* Thin Line going down to the component */}
          <div className="w-[2px] h-32 bg-primary/90 shadow-[0_0_15px_rgba(0,112,243,0.8)]" />
          {/* Pin Dot */}
          <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(0,112,243,0.8)] -mt-2 border-2 border-white/50" />
        </div>
      </Html>
    </group>
  )
}

export function HotspotManager() {
  const divisions = useAppStore((state) => state.divisions)

  return (
    <group>
      {divisions.map((div) => (
        <Hotspot key={div.id} division={div} />
      ))}
    </group>
  )
}
