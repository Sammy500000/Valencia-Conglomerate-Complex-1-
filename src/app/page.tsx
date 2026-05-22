'use client'

import { Scene } from '@/components/Scene'
import { Navbar } from '@/components/ui/Navbar'
import { HeroSection } from '@/components/ui/HeroSection'
import { Sidebar } from '@/components/ui/Sidebar'
import { BottomHUD } from '@/components/ui/BottomHUD'
import { useAppStore } from '@/store/useAppStore'
import { Map, MousePointer2, Keyboard, Menu, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const { isExploring, selectedDivision } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [instructionsOpen, setInstructionsOpen] = useState(false)

  // Auto-close mobile menu when a division is selected
  useEffect(() => {
    if (selectedDivision) {
      setMobileMenuOpen(false)
    }
  }, [selectedDivision])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background text-foreground flex">
      {/* 3D Environment & Main Overlays */}
      <div className="flex-1 relative">
        <Scene />

        <div className="absolute inset-0 pointer-events-none z-10">
          <Navbar />
          <HeroSection />
          <BottomHUD />
        </div>
      </div>

      {/* UI Elements that only appear when exploring */}
      {isExploring && (
        <>
          {/* Mobile Toggle Buttons (Only visible on small screens) */}
          <div className="md:hidden absolute top-20 left-0 right-0 px-4 flex justify-between z-50 pointer-events-none">
            <button
              className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center space-x-2 text-white hover:bg-black/70 transition-colors shadow-lg"
              onClick={() => {
                setInstructionsOpen(!instructionsOpen)
                if (mobileMenuOpen) setMobileMenuOpen(false)
              }}
            >
              <Info size={16} />
              <span className="text-sm font-medium">Instructions</span>
            </button>

            <button
              className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-xl text-white hover:bg-black/70 transition-colors shadow-lg"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                if (instructionsOpen) setInstructionsOpen(false)
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Sidebar on the right */}
          <div className={`
            absolute md:relative top-0 right-0 bottom-0 z-40 transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            h-full
          `}>
            <Sidebar />
          </div>

          {/* Instructions Overlay */}
          <div className={`
            absolute top-36 md:top-24 left-4 md:left-6 z-40 glass-panel p-5 rounded-xl border-white/10 shadow-2xl w-72 transition-all duration-300
            ${instructionsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0 pointer-events-none md:pointer-events-auto'}
          `}>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest border-b border-white/20 pb-3 mb-4 flex items-center space-x-2">
              <Map size={16} />
              <span>Campus Controls</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MousePointer2 size={16} className="text-primary mt-0.5 shrink-0" />
                <div className="text-xs text-white/80 leading-relaxed space-y-1">
                  <p><span className="font-bold text-white">Left Click + Drag:</span> Rotate View</p>
                  <p><span className="font-bold text-white">Right Click + Drag:</span> Pan View</p>
                  <p><span className="font-bold text-white">Scroll Wheel:</span> Zoom In/Out</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Keyboard size={16} className="text-primary mt-0.5 shrink-0" />
                <div className="text-xs text-white/80 leading-relaxed space-y-1">
                  <p><span className="font-bold text-white">W / S:</span> Move Forward / Back</p>
                  <p><span className="font-bold text-white">A / D:</span> Move Left / Right</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
