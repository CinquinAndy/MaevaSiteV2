'use client'

import type { LatLngExpression } from 'leaflet'
import { type ReactNode, useEffect } from 'react'
import { Circle, GeoJSON, MapContainer, Polygon, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'

interface MapProps {
	center: LatLngExpression
	zoom?: number
	className?: string
	children?: ReactNode
	minZoom?: number
	maxZoom?: number
	scrollWheelZoom?: boolean
	dragging?: boolean
	doubleClickZoom?: boolean
	zoomControl?: boolean
}

function MapBounds({ minZoom, maxZoom }: { minZoom?: number; maxZoom?: number }) {
	const map = useMap()

	useEffect(() => {
		if (minZoom !== undefined) map.setMinZoom(minZoom)
		if (maxZoom !== undefined) map.setMaxZoom(maxZoom)
	}, [map, minZoom, maxZoom])

	return null
}

export function LeafletMap({
	center,
	zoom = 10,
	className,
	children,
	minZoom,
	maxZoom,
	scrollWheelZoom = true,
	dragging = true,
	doubleClickZoom = true,
	zoomControl = true,
}: MapProps) {
	return (
		<MapContainer
			center={center}
			zoom={zoom}
			scrollWheelZoom={scrollWheelZoom}
			dragging={dragging}
			doubleClickZoom={doubleClickZoom}
			zoomControl={zoomControl}
			className={cn('h-[500px] w-full rounded-xl overflow-hidden', className)}
		>
			<MapBounds minZoom={minZoom} maxZoom={maxZoom} />
			{children}
		</MapContainer>
	)
}

interface MapTileLayerProps {
	variant?: 'default' | 'minimal' | 'dark'
}

export function MapTileLayer({ variant = 'default' }: MapTileLayerProps) {
	const tileUrls = {
		default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		minimal: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
		dark: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
	}

	const attributions = {
		default: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minimal:
			'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	}

	return (
		<TileLayer
			attribution={attributions[variant]}
			url={tileUrls[variant]}
			className={variant === 'minimal' ? 'map-minimal-style' : ''}
		/>
	)
}

interface MapCircleProps {
	center: LatLngExpression
	radius: number
	color?: string
	fillColor?: string
	fillOpacity?: number
	weight?: number
	glow?: boolean
}

export function MapCircle({
	center,
	radius,
	color = '#22c55e',
	fillColor = '#22c55e',
	fillOpacity = 0.15,
	weight = 2,
	glow = false,
}: MapCircleProps) {
	return (
		<Circle
			center={center}
			radius={radius}
			pathOptions={{
				color,
				fillColor,
				fillOpacity,
				weight,
			}}
			className={glow ? 'map-circle-glow' : ''}
		/>
	)
}

interface MapMarkerProps {
	position: LatLngExpression
	glow?: boolean
}

export function MapMarker({ position, glow = false }: MapMarkerProps) {
	return (
		<Circle
			center={position}
			radius={3000}
			pathOptions={{
				color: 'hsl(var(--primary))',
				fillColor: 'hsl(var(--primary))',
				fillOpacity: glow ? 0.4 : 0.3,
				weight: 0,
			}}
			className={glow ? 'map-marker-glow' : ''}
		/>
	)
}

interface MapPolygonProps {
	positions: [number, number][]
	glow?: boolean
	fillOpacity?: number
}

export function MapPolygon({ positions, glow = false, fillOpacity = 0.3 }: MapPolygonProps) {
	return (
		<Polygon
			positions={positions}
			pathOptions={{
				color: 'hsl(var(--primary) / 0.6)',
				fillColor: 'hsl(var(--primary))',
				fillOpacity,
				weight: 1,
			}}
			className={glow ? 'map-polygon-glow' : ''}
		/>
	)
}

interface MapGeoJSONProps {
	data: GeoJSON.GeoJsonObject
	colorMap?: Record<string, string>
	showLabels?: boolean
}

export function MapGeoJSON({ data, colorMap, showLabels = false }: MapGeoJSONProps) {
	return (
		<GeoJSON
			data={data}
			style={feature => {
				const code = feature?.properties?.code
				const color = colorMap && code ? colorMap[code] : 'hsl(var(--primary))'

				return {
					color: color,
					fillColor: color,
					fillOpacity: 0.6,
					weight: 1,
					opacity: 0.4,
				}
			}}
			onEachFeature={(feature, layer) => {
				if (feature.properties?.nom) {
					layer.bindTooltip(feature.properties.nom, {
						permanent: showLabels,
						direction: 'center',
						className: 'commune-tooltip',
					})
				}
			}}
		/>
	)
}
