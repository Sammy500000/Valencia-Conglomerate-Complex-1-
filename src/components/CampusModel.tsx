'use client'

import { useGLTF, Center, Resize } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export function CampusModel() {
  const { scene } = useGLTF('/Shed_Layout_Itn_2(1).glb')

  useEffect(() => {
    if (!scene) return

    // Traverse the scene to enable shadows and update materials for a premium look
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true

        // Enhance materials
        if (child.material) {
          child.material.envMapIntensity = 3
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene])

  return (
    <Center top>
      <Resize scale={190}>
        <primitive object={scene} />
      </Resize>
    </Center>
  )
}

useGLTF.preload('/Shed_Layout_Itn_2(1).glb')
