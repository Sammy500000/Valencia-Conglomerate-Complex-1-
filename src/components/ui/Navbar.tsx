'use client'

import { Search, Map, Play, Mail, X } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

export function Navbar() {
  const { divisions } = useAppStore()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center pointer-events-auto">
      <div className="flex items-center space-x-4">
        <img src="/logo" alt="Valencia Nutrition Logo" className="h-12 w-auto object-contain" />
      </div>
    </nav>
  )
}
