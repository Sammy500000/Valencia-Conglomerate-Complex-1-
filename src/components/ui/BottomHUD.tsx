'use client'

import { useAppStore } from '@/store/useAppStore'
import { Home } from 'lucide-react'

export function BottomHUD() {
  const triggerReset = useAppStore((state) => state.triggerReset)

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center pointer-events-auto z-40 gap-8">
      
      {/* Home Reset Button */}
      <button 
        onClick={() => triggerReset()}
        className="glass-panel w-12 h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:scale-105 transition-transform"
        title="Reset View"
      >
        <Home size={20} />
      </button>

      {/* Total Area Display */}
      <div className="glass-panel px-6 py-3 rounded-full flex items-center shadow-xl">
        <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mr-2">
          Total Area Required:
        </span>
        <span className="text-white font-bold text-sm tracking-wide">
          75 ACRES
        </span>
      </div>

    </div>
  )
}
