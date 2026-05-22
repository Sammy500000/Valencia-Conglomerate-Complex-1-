'use client'

import { useAppStore } from '@/store/useAppStore'
import { motion } from 'framer-motion'
import { Navigation } from 'lucide-react'

export function Minimap() {
  const { divisions, selectedDivision, setSelectedDivision } = useAppStore()

  // Simplified minimap approach for now - a glassmorphic box with abstract representation
  return (
    <div className="absolute bottom-8 right-8 z-30 pointer-events-auto hidden md:block">
      <div className="glass-panel w-48 h-48 rounded-2xl relative overflow-hidden border-white/20 p-2">
        {/* Radar/Grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* Center coordinate / Player pos */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Navigation size={12} className="text-white/50" />
        </div>

        {/* Abstract representation of divisions on map */}
        {divisions.map((div) => {
          // Normalize position for minimap (assuming campus bounds roughly -100 to 100)
          const left = `${(div.position[0] / 200 + 0.5) * 100}%`
          const top = `${(div.position[2] / 200 + 0.5) * 100}%`
          
          return (
            <button
              key={div.id}
              onClick={() => setSelectedDivision(div)}
              className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors ${selectedDivision?.id === div.id ? 'bg-primary scale-125' : 'bg-white/40 hover:bg-white/80'}`}
              style={{ left, top }}
              title={div.name}
            />
          )
        })}
        
        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/40 uppercase tracking-widest font-medium">
          Campus Map
        </div>
      </div>
    </div>
  )
}
