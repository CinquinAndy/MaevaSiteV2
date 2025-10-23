'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

// Types pour les locations
interface Location {
	name: string
	coordinates: [number, number] // [latitude, longitude]
	description?: string
	isMainStudio?: boolean
}

interface InteractiveMapProps {
	className?: string
}

// Import dynamique de react-leaflet pour éviter les problèmes SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false })

// Locations principales
const locations: Location[] = [
	{
		name: 'Thonon-les-Bains',
		coordinates: [46.3719, 6.4779],
		description: 'Studio principal - Maquillage & Nail Art',
		isMainStudio: true,
	},
	{
		name: 'Annecy',
		coordinates: [45.8992, 6.1294],
		description: 'Déplacements pour mariages et événements',
	},
	{
		name: 'Genève',
		coordinates: [46.2044, 6.1432],
		description: 'Interventions en Suisse',
	},
	{
		name: 'Lausanne',
		coordinates: [46.5197, 6.6323],
		description: 'Interventions en Suisse',
	},
]

function InteractiveMapContent() {
	// Import de Leaflet côté client uniquement
	const L = useMemo(() => {
		if (typeof window !== 'undefined') {
			return require('leaflet')
		}
		return null
	}, [])

	// Icône personnalisée pour le marqueur principal
	const mainIcon = useMemo(() => {
		if (!L) return null
		return L.divIcon({
			className: 'custom-marker-main',
			html: `
        <div class="relative flex items-center justify-center w-10 h-10">
          <div class="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
          <div class="relative bg-primary rounded-full p-2 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      `,
			iconSize: [40, 40],
			iconAnchor: [20, 40],
			popupAnchor: [0, -40],
		})
	}, [L])

	// Icône pour les autres locations
	const locationIcon = useMemo(() => {
		if (!L) return null
		return L.divIcon({
			className: 'custom-marker-location',
			html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <div class="relative bg-primary/80 rounded-full p-1.5 shadow-md">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      `,
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
		})
	}, [L])

	if (!L) return null

	return (
		<MapContainer
			center={[46.2, 6.3]} // Centré entre Thonon et Genève
			zoom={9}
			scrollWheelZoom={false}
			className="h-full w-full rounded-xl"
			style={{ zIndex: 0 }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
			/>

			{/* Zone de couverture autour de Thonon */}
			<Circle
				center={locations[0].coordinates}
				radius={50000} // 50km de rayon
				pathOptions={{
					color: 'hsl(var(--primary))',
					fillColor: 'hsl(var(--primary))',
					fillOpacity: 0.1,
					weight: 2,
					opacity: 0.4,
				}}
			/>

			{/* Marqueurs pour chaque location */}
			{locations.map(location => (
				<Marker
					key={location.name}
					position={location.coordinates}
					icon={location.isMainStudio ? mainIcon : locationIcon}
				/>
			))}
		</MapContainer>
	)
}

export function InteractiveMap({ className }: InteractiveMapProps) {
	return (
		<div className={className}>
			<InteractiveMapContent />
		</div>
	)
}
