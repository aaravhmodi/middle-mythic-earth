'use client'

import React, { useState } from 'react'
import { OverlayProvider } from '@/contexts/OverlayContext'
import MapContainer from '@/components/Map'
import LocationCard from '@/components/LocationCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Location {
  name: string
  coords: [number, number]
  image: string
  real: string
  mythic: string
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <OverlayProvider>
      <div className="relative w-full h-screen overflow-hidden">
        <Navbar />
        <MapContainer onLocationSelect={setSelectedLocation} />
        <LocationCard location={selectedLocation} onClose={() => setSelectedLocation(null)} />
        <Footer />
      </div>
    </OverlayProvider>
  )
}

