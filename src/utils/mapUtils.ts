import mapboxgl from 'mapbox-gl'

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export const initialViewState = {
  longitude: 7.9,
  latitude: 46.6,
  zoom: 7,
  pitch: 60,
  bearing: 0,
}

// Using Mapbox default styles for proper 3D globe rendering
// Fantasy mode uses dark style for more mythical feel
export const fantasyStyle = 'mapbox://styles/mapbox/dark-v11'
export const realStyle = 'mapbox://styles/mapbox/satellite-v9'

export function flyToLocation(
  map: mapboxgl.Map,
  coords: [number, number],
  zoom: number = 12
) {
  map.flyTo({
    center: coords,
    zoom,
    pitch: 60,
    bearing: 0,
    duration: 4000,
    essential: true,
  })
}

