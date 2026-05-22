'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Environment, ContactShadows, BakeShadows, Sky, Bounds, Loader } from '@react-three/drei'
import { Suspense } from 'react'
import { CampusModel } from './CampusModel'
import { CameraController } from './CameraController'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { HotspotManager } from './HotspotManager'

function DynamicLighting() {
  const { camera } = useThree()
  const lightRef = useRef<THREE.DirectionalLight>(null)

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position).add(new THREE.Vector3(50, 80, 50))
    }
  })

  return (
    <directionalLight
      ref={lightRef}
      castShadow
      intensity={1.5}
      shadow-mapSize={[1024, 1024]}
    />
  )
}

export function Scene() {
  return (
    <>
      <div className="w-full h-screen absolute inset-0 z-0 bg-transparent">
        <Canvas shadows camera={{ position: [50, 50, 50], fov: 45 }}>
          <Suspense fallback={null}>
            {/* Lighting & Environment */}
            <ambientLight intensity={0.5} />
            <DynamicLighting />


            <Environment preset="city" />

            {/* Bounds context for manual camera fitting */}
            <Bounds margin={1.2}>



              {/* Model */}
              <CampusModel />

              {/* Interactive Hotspots */}
              <HotspotManager />
            </Bounds>

            {/* Contact Shadows for realism */}
            <ContactShadows resolution={1024} scale={200} blur={2} opacity={0.5} far={100} color="#000000" />
            <BakeShadows />

            {/* Controls */}
            <CameraController />

            {/* Post-processing (Premium effects) */}
            <EffectComposer>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={0.8} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <Loader
        containerStyles={{
          background: 'rgba(0, 0, 0, 0.85)',
          zIndex: 100,
          backdropFilter: 'blur(10px)'
        }}
        innerStyles={{ width: 'min(80vw, 300px)' }}
        barStyles={{ height: '4px', background: '#0070f3' }}
        dataStyles={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit', marginTop: '10px' }}
        dataInterpolation={(p) => `Loading Conglomerate Complex... ${p.toFixed(0)}%`}
      />
    </>
  )
}
