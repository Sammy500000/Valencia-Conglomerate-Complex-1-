'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export function HeroSection() {
  const { isExploring, setIsExploring } = useAppStore()

  return (
    <AnimatePresence>
      {!isExploring && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm z-40"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              Valencia Nutrition FMCG Conglomerate Complex
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-12">
              Site Plan for Valencia's Manufacturing Hub
            </p>

            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => setIsExploring(true)}
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform"
              >
                Explore Site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
