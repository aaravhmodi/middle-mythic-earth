'use client'

import React from 'react'
import { useOverlay } from '@/contexts/OverlayContext'

export default function OverlayToggle() {
  const { isFantasyMode, toggleFantasyMode } = useOverlay()

  return (
    <button
      onClick={toggleFantasyMode}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleFantasyMode()
        }
      }}
      aria-pressed={isFantasyMode}
      aria-label={isFantasyMode ? 'Switch to Real Mode' : 'Switch to Fantasy Mode'}
      className="px-4 py-2 bg-fantasy-forest text-fantasy-gold rounded-lg font-decorative text-sm hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-fantasy-gold focus:ring-offset-2"
    >
      {isFantasyMode ? '🌍 Real Mode' : '✨ Fantasy Mode'}
    </button>
  )
}

