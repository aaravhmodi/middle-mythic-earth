'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { useOverlay } from '@/contexts/OverlayContext'
import { MAPBOX_TOKEN, initialViewState, flyToLocation, realStyle, fantasyStyle } from '@/utils/mapUtils'
import locationsData from '@/data/locations.json'
import MapTooltip from './MapTooltip'

interface Location {
  name: string
  coords: [number, number]
  image: string
  real: string
  mythic: string
}

interface MapProps {
  onLocationSelect?: (location: Location | null) => void
}

interface HoverState {
  location: Location | null
  x: number
  y: number
}

export default function MapContainer(props: MapProps) {
  const { onLocationSelect } = props || {}
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapboxMap = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const markerElementsMap = useRef<globalThis.Map<Location, HTMLDivElement>>(new globalThis.Map<Location, HTMLDivElement>())
  const [hoverState, setHoverState] = useState<HoverState>({ location: null, x: 0, y: 0 })
  const { isFantasyMode } = useOverlay()

  useEffect(() => {
    if (!mapContainer.current || mapboxMap.current) return

    if (!MAPBOX_TOKEN) {
      console.error('Mapbox token is missing. Please set NEXT_PUBLIC_MAPBOX_TOKEN')
      return
    }

    mapboxgl.accessToken = MAPBOX_TOKEN

    mapboxMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isFantasyMode ? fantasyStyle : realStyle,
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      pitch: initialViewState.pitch,
      bearing: initialViewState.bearing,
      projection: 'globe',
    })

    mapboxMap.current.on('load', () => {
      if (!mapboxMap.current) return

      // Set globe atmosphere
      mapboxMap.current.setFog({
        color: isFantasyMode ? '#123524' : 'rgb(186, 210, 235)',
        'high-color': isFantasyMode ? '#6dc2e8' : 'rgb(36, 92, 223)',
        'space-color': isFantasyMode ? '#000000' : 'rgb(11, 11, 25)',
        'star-intensity': isFantasyMode ? 0.6 : 0.35,
      })

      // Apply fantasy styling - darker, more mystical appearance
      if (isFantasyMode) {
        const layers = ['land', 'landcover', 'national-park', 'park']
        layers.forEach((layerId) => {
          if (mapboxMap.current.getLayer(layerId)) {
            try {
              mapboxMap.current.setPaintProperty(layerId, 'fill-color', '#1a4d3a')
            } catch (e) {
              // Layer might not support this property
            }
          }
        })
      }

      // Create markers for each location
      locationsData.forEach((location) => {
        const el = document.createElement('div')
        el.className = 'marker'
        el.setAttribute('tabindex', '0')
        el.setAttribute('role', 'button')
        el.setAttribute('aria-label', `View ${location.name}`)

        // Store element reference for hover events
        const locationData = location as Location
        markerElementsMap.current.set(locationData, el)

        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.coords as [number, number])
          .addTo(mapboxMap.current!)

        // Click handler
        el.addEventListener('click', () => {
          if (onLocationSelect) {
            onLocationSelect(locationData)
          }
          flyToLocation(mapboxMap.current!, location.coords as [number, number])
        })

        // Keyboard handler
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (onLocationSelect) {
              onLocationSelect(locationData)
            }
            flyToLocation(mapboxMap.current!, location.coords as [number, number])
          }
        })

        // Hover handlers
        el.addEventListener('mouseenter', () => {
          if (!mapboxMap.current) return
          const rect = el.getBoundingClientRect()
          const mapRect = mapContainer.current!.getBoundingClientRect()
          setHoverState({
            location: locationData,
            x: rect.left - mapRect.left + rect.width / 2,
            y: rect.top - mapRect.top,
          })
        })

        el.addEventListener('mouseleave', () => {
          setHoverState({ location: null, x: 0, y: 0 })
        })

        // Update tooltip position on map move/zoom
        const updateTooltipPosition = () => {
          const rect = el.getBoundingClientRect()
          const mapRect = mapContainer.current!.getBoundingClientRect()
          setHoverState((prev) => {
            if (prev.location === locationData) {
              return {
                location: locationData,
                x: rect.left - mapRect.left + rect.width / 2,
                y: rect.top - mapRect.top,
              }
            }
            return prev
          })
        }

        mapboxMap.current.on('move', updateTooltipPosition)
        mapboxMap.current.on('zoom', updateTooltipPosition)

        markers.current.push(marker)
      })
    })

    return () => {
      markers.current.forEach((marker) => marker.remove())
      markers.current = []
      if (mapboxMap.current) {
        mapboxMap.current.remove()
        mapboxMap.current = null
      }
    }
  }, [])

  // Update map style when fantasy mode changes
  useEffect(() => {
    if (!mapboxMap.current) return

    const newStyle = isFantasyMode ? fantasyStyle : realStyle
    mapboxMap.current.setStyle(newStyle)

    mapboxMap.current.once('style.load', () => {
      if (!mapboxMap.current) return

      mapboxMap.current.setFog({
        color: isFantasyMode ? '#123524' : 'rgb(186, 210, 235)',
        'high-color': isFantasyMode ? '#6dc2e8' : 'rgb(36, 92, 223)',
        'space-color': isFantasyMode ? '#000000' : 'rgb(11, 11, 25)',
        'star-intensity': isFantasyMode ? 0.6 : 0.35,
      })

      // Apply fantasy styling - darker, more mystical appearance
      if (isFantasyMode) {
        const layers = ['land', 'landcover', 'national-park', 'park']
        layers.forEach((layerId) => {
          if (mapboxMap.current.getLayer(layerId)) {
            try {
              mapboxMap.current.setPaintProperty(layerId, 'fill-color', '#1a4d3a')
            } catch (e) {
              // Layer might not support this property
            }
          }
        })
      }
    })
  }, [isFantasyMode])

  return (
    <div ref={mapContainer} id="map" className="w-full h-screen relative">
      <MapTooltip
        location={hoverState.location}
        x={hoverState.x}
        y={hoverState.y}
      />
    </div>
  )
}

