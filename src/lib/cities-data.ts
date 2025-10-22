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

export const citiesData: CitiesData = citiesDataJson as CitiesData

/**
 * Retourne les villes françaises (Haute-Savoie)
 */
export function getFrenchCities(): City[] {
	return citiesData.topCities.filter(city => city.country === 'France')
}

/**
 * Retourne les villes suisses
 */
export function getSwissCities(): City[] {
	return citiesData.topCities.filter(city => city.country === 'Suisse')
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
		all: citiesData.topCities.map(c => c.name),
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
