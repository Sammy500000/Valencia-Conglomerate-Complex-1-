'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { X, ExternalLink, Building2 } from 'lucide-react'

export function DivisionPanel() {
  const { selectedDivision, setSelectedDivision } = useAppStore()

  return (
    <AnimatePresence>
      {selectedDivision && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] glass-panel rounded-none border-r-0 pointer-events-auto z-40 overflow-y-auto"
        >
          <div className="p-8">
            <button 
              onClick={() => setSelectedDivision(null)}
              className="absolute top-6 right-6 w-10 h-10 glass-button rounded-full flex items-center justify-center text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6">
              <Building2 size={32} className="text-primary" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">{selectedDivision.name}</h2>
            <div className="inline-block px-3 py-1 rounded-full border border-white/20 text-white/60 text-xs uppercase tracking-wider mb-8">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
