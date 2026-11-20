/**
 * Données des villes de la zone d'intervention
 * Générées automatiquement par scripts/fetch-cities.ts
 */

export interface City {
	rank: number
	name: string
	country: string
	population: number
	distance: number
	coordinates: {
		lat: number
		lon: number
	}
	score: number
}

export interface CitiesData {
	generatedAt: string
	baseLocation: {
		name: string
		lat: number
		lon: number
	}
	searchRadius: number
	totalCitiesFound: number
	topCities: City[]
	statistics: {
		frenchCities: number
		swissCities: number
		averageDistance: number
		averagePopulation: number
	}
}

// Import des données générées
import citiesDataJson from '../../scripts/cities-data.json'
import { SERVICE_RADIUS_KM } from './service-area'

export const citiesData: CitiesData = citiesDataJson as CitiesData

export { SERVICE_RADIUS_KM }

/**
 * Villes de la zone d'intervention, par pays. Le fichier contient des villes jusqu'à 150 km (Lyon, Grenoble),
 * bien au-delà de la zone réelle : seules celles de la zone sont annoncées.
 */
function citiesInZone(country: 'France' | 'Suisse'): City[] {
	return citiesData.topCities.filter(city => city.country === country && city.distance <= SERVICE_RADIUS_KM)
}

/**
 * Retourne les villes françaises (Haute-Savoie)
 */
export function getFrenchCities(): City[] {
	return citiesInZone('France')
}

/**
 * Retourne les villes suisses
 */
export function getSwissCities(): City[] {
	return citiesInZone('Suisse')
}

/**
 * Retourne une liste de noms de villes pour le SEO
 */
export function getCityNamesForSEO(): {
	french: string[]
	swiss: string[]
	all: string[]
} {
	const frenchCities = getFrenchCities().map(c => c.name)
	const swissCities = getSwissCities().map(c => c.name)

	return {
		french: frenchCities,
		swiss: swissCities,
		all: citiesData.topCities
			.filter(c => (c.country === 'France' || c.country === 'Suisse') && c.distance <= SERVICE_RADIUS_KM)
			.map(c => c.name),
	}
}

/**
 * Génère une description SEO avec les villes
 */
export function generateSEODescription(): string {
	const cities = getCityNamesForSEO()
	const mainCities = cities.all.slice(0, 8).join(', ')

	return `Maquilleuse professionnelle diplômée intervenant en Haute-Savoie et Suisse. Services de maquillage beauté, mariages, artistique et nail art à ${mainCities} et alentours.`
}

/**
 * Génère une liste de mots-clés pour le SEO
 */
export function generateSEOKeywords(): string[] {
	const cities = getCityNamesForSEO()
	const keywords: string[] = []

	// Mots-clés généraux
	const services = [
		'maquilleuse professionnelle',
		'makeup artist',
		'maquillage mariage',
		'nail art',
		'prothésiste ongulaire',
	]

	// Combiner services avec villes principales
	const mainCities = cities.all.slice(0, 10)

	for (const service of services) {
		for (const city of mainCities) {
			keywords.push(`${service} ${city}`)
		}
	}

	return keywords
}
