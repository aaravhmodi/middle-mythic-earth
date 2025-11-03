'use client'

import React from 'react'
import OverlayToggle from './OverlayToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm border-b border-fantasy-gold border-opacity-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-decorative text-fantasy-gold font-bold">
          Mythic Earth
        </h1>
        <div className="flex items-center gap-4">
          <OverlayToggle />
          <a
            href="https://www.tolkienestate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fantasy-gold hover:text-white transition-colors text-sm"
          >
            Credits
          </a>
        </div>
      </div>
    </nav>
  )
}

