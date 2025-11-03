'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Location {
  name: string
  coords: [number, number]
  image: string
  real: string
  mythic: string
}

interface LocationCardProps {
  location: Location | null
  onClose: () => void
}

export default function LocationCard({ location, onClose }: LocationCardProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!location) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-70"
        onClick={onClose}
        aria-modal="true"
        aria-labelledby="location-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <div className="p-6">
            <h2 id="location-title" className="text-3xl font-decorative text-fantasy-forest mb-4">
              {location.name}
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-fantasy-forest pl-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">REAL WORLD</h3>
                <p className="text-gray-800">{location.real}</p>
              </div>
              
              <div className="border-l-4 border-fantasy-gold pl-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">MYTHIC EARTH</h3>
                <p className="text-gray-800">{location.mythic}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

