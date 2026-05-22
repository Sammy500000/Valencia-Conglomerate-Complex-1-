'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, BakeShadows, Sky, Environment, Bounds } from '@react-three/drei'
import { CampusModel } from '../CampusModel'
import { useState, Suspense } from 'react'
import * as THREE from 'three'
import { Division, useAppStore } from '@/store/useAppStore'

function AdminClickCapture({ onPosUpdate }: { onPosUpdate: (pos: [number, number, number]) => void }) {
  return (
    <mesh 
      onPointerDown={(e) => {
        e.stopPropagation()
        onPosUpdate([e.point.x, e.point.y, e.point.z])
      }}
      visible={false}
    >
      <boxGeometry args={[1000, 1000, 1000]} />
      <meshBasicMaterial side={THREE.BackSide} />
    </mesh>
  )
}

export function ZoningTool() {
  const { divisions, setDivisions } = useAppStore()
  const [currentPos, setCurrentPos] = useState<[number, number, number]>([0, 0, 0])
  const [formData, setFormData] = useState<Partial<Division> & { sizeWidth?: number; sizeDepth?: number }>({ sizeWidth: 20, sizeDepth: 20 })

  const handleSave = () => {
    if (!formData.name || !formData.id) {
      alert("ID and Name are required.")
      return
    }

    const newDiv: Division = {
      id: formData.id,
      name: formData.name,
      overview: formData.overview || '',
      description: formData.description || '',
      website: formData.website || '',
      images: [],
      position: currentPos,
      size: [formData.sizeWidth || 20, formData.sizeDepth || 20],
      category: formData.category || 'General',
    }

    setDivisions([...divisions, newDiv])
    setFormData({ sizeWidth: 20, sizeDepth: 20 }) // reset
  }

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ divisions }, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "divisions.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <>
      <div className="flex-1 relative">
        <Canvas shadows camera={{ position: [50, 50, 50], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[100, 200, 50]} intensity={1.5} />
            <Environment preset="city" />
            
            {/* The model */}
            <Bounds fit clip observe margin={1.2}>
              <group onPointerDown={(e) => {
                  e.stopPropagation()
                  setCurrentPos([e.point.x, e.point.y, e.point.z])
                }}>
                <CampusModel />
              </group>
            </Bounds>

            {/* Click visualizer */}
            <mesh position={currentPos}>
              <boxGeometry args={[formData.sizeWidth || 20, 10, formData.sizeDepth || 20]} />
              <meshBasicMaterial color="#ff0000" wireframe />
            </mesh>
            
            {/* Existing divisions visualizer */}
            {divisions.map((d) => (
              <mesh key={d.id} position={d.position}>
                <boxGeometry args={[d.size[0], 10, d.size[1]]} />
                <meshBasicMaterial color="#00ff00" wireframe opacity={0.5} transparent />
              </mesh>
            ))}

            <ContactShadows resolution={1024} scale={200} blur={2} opacity={0.5} far={100} />
            <BakeShadows />
            <OrbitControls makeDefault />
          </Suspense>
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/80 p-4 rounded-xl text-sm border border-white/20">
          <div>X: {currentPos[0].toFixed(2)}</div>
          <div>Y: {currentPos[1].toFixed(2)}</div>
          <div>Z: {currentPos[2].toFixed(2)}</div>
        </div>
      </div>

      <div className="w-[400px] bg-[#111] border-l border-white/10 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Zoning Tool</h1>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/60 mb-1 block">ID</label>
            <input type="text" className="w-full bg-black border border-white/20 rounded p-2 text-white" 
              value={formData.id || ''} onChange={(e) => setFormData({...formData, id: e.target.value})} />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1 block">Name</label>
            <input type="text" className="w-full bg-black border border-white/20 rounded p-2 text-white" 
              value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1 block">Category</label>
            <input type="text" className="w-full bg-black border border-white/20 rounded p-2 text-white" 
              value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1 block">Overview</label>
            <textarea className="w-full bg-black border border-white/20 rounded p-2 text-white h-20" 
              value={formData.overview || ''} onChange={(e) => setFormData({...formData, overview: e.target.value})} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-white/60 mb-1 block">Width (X)</label>
              <input type="number" className="w-full bg-black border border-white/20 rounded p-2 text-white" 
                value={formData.sizeWidth || 20} onChange={(e) => setFormData({...formData, sizeWidth: Number(e.target.value)})} />
            </div>
            <div className="flex-1">
              <label className="text-sm text-white/60 mb-1 block">Depth (Z)</label>
              <input type="number" className="w-full bg-black border border-white/20 rounded p-2 text-white" 
                value={formData.sizeDepth || 20} onChange={(e) => setFormData({...formData, sizeDepth: Number(e.target.value)})} />
            </div>
          </div>
          
          <button onClick={handleSave} className="w-full bg-white text-black font-bold py-3 rounded hover:bg-white/90 transition">
            Save Hotspot
          </button>

          <div className="pt-8 border-t border-white/10 mt-8">
            <h2 className="text-xl font-bold mb-4">Export Data</h2>
            <button onClick={exportJSON} className="w-full bg-transparent border border-white text-white font-bold py-3 rounded hover:bg-white/10 transition">
              Download JSON
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
