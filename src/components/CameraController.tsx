'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useBounds } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import gsap from 'gsap'
import * as THREE from 'three'

export function CameraController() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const selectedDivision = useAppStore((state) => state.selectedDivision)
  const resetSignal = useAppStore((state) => state.resetSignal)
  const bounds = useBounds()

  // Custom WASD controls
  const keys = useRef({ w: false, a: false, s: false, d: false })

  // Developer tool & Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'C' && e.shiftKey && controlsRef.current) {
        console.log(`\n=== CAMERA ANGLE SAVED ===`)
        console.log(`Copy this into the division object in src/store/useAppStore.ts:`)
        console.log(`  cameraTarget: [${controlsRef.current.target.x.toFixed(2)}, ${controlsRef.current.target.y.toFixed(2)}, ${controlsRef.current.target.z.toFixed(2)}],`)
        console.log(`  cameraPosition: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}],`)
        // @ts-ignore
        console.log(`  cameraZoom: ${(camera.zoom || 1).toFixed(2)}`)
        console.log(`==========================\n`)
      }
      
      const key = e.key.toLowerCase()
      if (key in keys.current) {
        keys.current[key as keyof typeof keys.current] = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) {
        keys.current[key as keyof typeof keys.current] = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [camera])

  useFrame((_, delta) => {
    if (!controlsRef.current || !controlsRef.current.enabled || selectedDivision) return

    const speed = 100 * delta
    let moved = false

    const forward = new THREE.Vector3()
    const right = new THREE.Vector3()

    camera.getWorldDirection(forward)
    forward.y = 0
    if (forward.lengthSq() > 0) forward.normalize()

    right.crossVectors(forward, camera.up).normalize()

    if (keys.current.w) {
      controlsRef.current.target.addScaledVector(forward, speed)
      camera.position.addScaledVector(forward, speed)
      moved = true
    }
    if (keys.current.s) {
      controlsRef.current.target.addScaledVector(forward, -speed)
      camera.position.addScaledVector(forward, -speed)
      moved = true
    }
    if (keys.current.a) {
      controlsRef.current.target.addScaledVector(right, -speed)
      camera.position.addScaledVector(right, -speed)
      moved = true
    }
    if (keys.current.d) {
      controlsRef.current.target.addScaledVector(right, speed)
      camera.position.addScaledVector(right, speed)
      moved = true
    }

    if (moved) {
      controlsRef.current.update()
    }
  })

  useEffect(() => {
    if (!controlsRef.current) return

    if (selectedDivision) {
      // Prevent OrbitControls from fighting GSAP during animation
      controlsRef.current.enabled = false
      
      // Kill any ongoing tweens
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(controlsRef.current.target)
      gsap.killTweensOf(camera)

      // Calculate offset based on size for a nice framing or use explicit values
      const targetPos = selectedDivision.cameraTarget 
        ? new THREE.Vector3(...selectedDivision.cameraTarget)
        : new THREE.Vector3(...selectedDivision.position)
        
      let camPos: THREE.Vector3
      if (selectedDivision.cameraPosition) {
        camPos = new THREE.Vector3(...selectedDivision.cameraPosition)
      } else {
        const maxDim = Math.max(selectedDivision.size[0], selectedDivision.size[1])
        const dist = Math.max(maxDim * 1.5, 20)
        camPos = targetPos.clone().add(new THREE.Vector3(dist, dist * 0.8, dist))
      }

      gsap.to(camera.position, {
        x: camPos.x,
        y: camPos.y,
        z: camPos.z,
        duration: 2,
        ease: 'power3.inOut',
      })

      gsap.to(camera, {
        zoom: selectedDivision.cameraZoom || 1,
        duration: 2,
        ease: 'power3.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      })

      gsap.to(controlsRef.current.target, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 2,
        ease: 'power3.inOut',
        onUpdate: () => {
          camera.lookAt(controlsRef.current.target)
        },
        onComplete: () => {
          controlsRef.current.update() // Force OrbitControls to recalculate from new position
          controlsRef.current.enabled = true
        }
      })
    } else {
      // Use Bounds API to reset to overview
      if (bounds) {
        bounds.refresh().fit().clip()
      }
    }
  }, [selectedDivision, resetSignal, camera, bounds])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={1}
      maxDistance={2000}
      maxPolarAngle={Math.PI / 2 - 0.05}
      makeDefault
    />
  )
}
