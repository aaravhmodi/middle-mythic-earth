'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface OverlayContextType {
  isFantasyMode: boolean
  toggleFantasyMode: () => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [isFantasyMode, setIsFantasyMode] = useState(false)

  const toggleFantasyMode = () => {
    setIsFantasyMode(prev => !prev)
  }

  return (
    <OverlayContext.Provider value={{ isFantasyMode, toggleFantasyMode }}>
      {children}
    </OverlayContext.Provider>
  )
}

export function useOverlay() {
  const context = useContext(OverlayContext)
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider')
  }
  return context
}

