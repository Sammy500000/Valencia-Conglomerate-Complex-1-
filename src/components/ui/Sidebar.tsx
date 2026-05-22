'use client'

import { useAppStore } from '@/store/useAppStore'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Building2, ChevronLeft, ExternalLink } from 'lucide-react'

export function Sidebar() {
  const { divisions, selectedDivision, setSelectedDivision } = useAppStore()

  return (
    <div className="relative w-80 md:w-96 h-full glass-panel border-r-0 border-y-0 rounded-none pointer-events-auto z-40 flex flex-col shrink-0 shadow-2xl">
      <AnimatePresence mode="wait">
        {!selectedDivision ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full pt-24 pb-8 w-full"
          >
            <div className="px-6 mb-6">
              <h2 className="text-white font-bold text-xl uppercase tracking-widest mb-1">Campus Layout</h2>
              <p className="text-white/60 text-xs">Select a division to navigate</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
              {divisions.map((div) => (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-start space-x-3 group bg-white/5 border border-transparent hover:bg-white/10"
                >
                  <div className="mt-0.5 transition-colors text-white/40 group-hover:text-white/80">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm transition-colors text-white/70 group-hover:text-white">
                      {div.name}
                    </h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{div.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full pt-24 pb-8 px-8 w-full overflow-y-auto custom-scrollbar"
          >
            <button 
              onClick={() => setSelectedDivision(null)}
              className="group flex items-center space-x-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Layout</span>
            </button>

            <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 shrink-0">
              <Building2 size={32} className="text-primary" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">{selectedDivision.name}</h2>
            <div className="inline-block self-start px-3 py-1 rounded-full border border-white/20 text-white/60 text-xs uppercase tracking-wider mb-8">
              {selectedDivision.category}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white/40 text-sm uppercase tracking-widest mb-2 font-medium">Overview</h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  {selectedDivision.overview || "A core component of the JLB ecosystem, focusing on innovation and sustainable growth."}
                </p>
              </div>

              <div>
                <h3 className="text-white/40 text-sm uppercase tracking-widest mb-2 font-medium">Description</h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  {selectedDivision.description || "Detailed information about this division will be available here, showcasing its capabilities, scale, and integration into the broader campus operations."}
                </p>
              </div>

              {selectedDivision.website && (
                <a 
                  href={selectedDivision.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-8 py-4 glass-button rounded-xl flex items-center justify-center space-x-2 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <span>Visit Division Website</span>
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
