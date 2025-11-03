'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm border-t border-fantasy-gold border-opacity-30">
      <div className="container mx-auto px-4 py-3 text-center">
        <p className="text-sm text-gray-300">
          Explore the real-world origins of Middle-earth through Tolkien's 1911 Swiss journey.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          © 2024 Mythic Earth | Inspired by J.R.R. Tolkien's travels
        </p>
      </div>
    </footer>
  )
}

