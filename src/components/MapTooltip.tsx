'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Location {
  name: string
  image: string
  real: string
}

interface MapTooltipProps {
  location: Location | null
  x: number
  y: number
}

export default function MapTooltip({ location, x, y }: MapTooltipProps) {
  if (!location) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -100%)',
        pointerEvents: 'none',
        zIndex: 1000,
        marginBottom: '10px',
      }}
      className="bg-white rounded-lg shadow-2xl max-w-xs overflow-hidden"
    >
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-decorative text-sm font-bold text-fantasy-forest mb-1">
          {location.name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {location.real}
        </p>
      </div>
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>
  )
}

