/**
 * Script pour récupérer les villes importantes autour de Thonon-les-Bains
 * Utilise l'API Overpass (OpenStreetMap) pour récupérer les données
 * Calcule un score basé sur la distance et la population
 */

interface City {
	name: string
	population: number
	distance: number // en km
	lat: number
	lon: number
	country: string
	score: number
}

// Coordonnées de Thonon-les-Bains
const THONON_LAT = 46.3708
const THONON_LON = 6.4792

// Rayon de recherche en km
const SEARCH_RADIUS_KM = 150

/**
 * Calcule la distance entre deux points GPS (formule de Haversine)
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371 // Rayon de la Terre en km
	const dLat = ((lat2 - lat1) * Math.PI) / 180
	const dLon = ((lon2 - lon1) * Math.PI) / 180
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return R * c
}

/**
 * Calcule le score d'une ville basé sur la distance et la population
 * Formule ajustée pour privilégier la DISTANCE (70%) sur la population (30%)
 * Score = [(distance_weight^2 * 0.7) + (population_weight * 0.3)] * 1000
 * Plus la ville est proche, plus le score est élevé
 */
function calculateScore(population: number, distance: number, maxDistance: number): number {
	// Distance: poids de 70% avec effet quadratique pour privilégier les villes très proches
	const distanceWeight = 1 - distance / maxDistance // Plus proche = meilleur score
	const distanceScore = distanceWeight ** 2 * 0.7 // Effet quadratique + 70%

	// Population: poids de seulement 30%
	const populationWeight = Math.min(population / 200000, 1) // Normaliser (cap à 200k pour éviter domination)
	const populationScore = populationWeight * 0.5

	return (distanceScore + populationScore) * 1000 // Multiplier par 1000 pour des scores lisibles
}

/**
 * Récupère les villes via l'API Overpass (OpenStreetMap)
 */
async function fetchCitiesFromOverpass(): Promise<City[]> {
	console.log('🔍 Recherche des villes autour de Thonon-les-Bains...')
	console.log(`📍 Coordonnées: ${THONON_LAT}, ${THONON_LON}`)
	console.log(`📏 Rayon: ${SEARCH_RADIUS_KM} km\n`)

	// Une requête par pays : la ville est cherchée dans la zone administrative du pays, ce qui donne son pays
	// réel (l'ancienne version le devinait d'après la longitude et classait Genève en France).
	const countries = [
		{ code: 'FR', label: 'France' },
		{ code: 'CH', label: 'Suisse' },
		{ code: 'IT', label: 'Italie' },
	]

	try {
		const elements: any[] = []
		for (const { code, label } of countries) {
			const query = `
				[out:json];
				area["ISO3166-1"="${code}"][admin_level=2]->.pays;
				node["place"~"city|town"]["name"]["population"](area.pays)(around:${SEARCH_RADIUS_KM * 1000},${THONON_LAT},${THONON_LON});
				out body;
			`
			const response = await fetch('https://overpass-api.de/api/interpreter', {
				method: 'POST',
				body: query,
			})

			if (!response.ok) {
				throw new Error(`Erreur API: ${response.status}`)
			}

			const data = await response.json()
			for (const element of data.elements) elements.push({ ...element, country: label })
		}

		console.log(`✅ ${elements.length} villes trouvées\n`)

		const cities: City[] = elements
			.map((element: any) => {
				const population = Number.parseInt(element.tags.population) || 0
				const distance = calculateDistance(THONON_LAT, THONON_LON, element.lat, element.lon)

				const country: string = element.country

				return {
					name: element.tags.name,
					population,
					distance: Math.round(distance * 10) / 10, // Arrondir à 1 décimale
					lat: element.lat,
					lon: element.lon,
					country,
					score: 0, // Sera calculé après
				}
			})
			.filter((city: City) => city.population > 1000) // Filtrer les très petites villes

		// Calculer les scores
		const maxDistance = Math.max(...cities.map(c => c.distance))
		cities.forEach(city => {
			city.score = Math.round(calculateScore(city.population, city.distance, maxDistance) * 10) / 10
		})

		// Trier par score décroissant
		return cities.sort((a, b) => b.score - a.score)
	} catch (error) {
		console.error('❌ Erreur lors de la récupération des villes:', error)
		throw error
	}
}

/**
 * Affiche les résultats de manière formatée
 */
function displayResults(cities: City[], topN = 20) {
	console.log(`\n🏆 TOP ${topN} VILLES PAR SCORE:\n`)
	console.log('='.repeat(100))
	console.log(
		`${'Rang'.padEnd(6)} ${'Ville'.padEnd(25)} ${'Pays'.padEnd(10)} ${'Population'.padEnd(12)} ${'Distance'.padEnd(12)} ${'Score'.padEnd(10)}`
	)
	console.log('='.repeat(100))

	cities.slice(0, topN).forEach((city, index) => {
		const rank = `${index + 1}.`.padEnd(6)
		const name = city.name.padEnd(25)
		const country = city.country.padEnd(10)
		const population = city.population.toLocaleString('fr-FR').padEnd(12)
		const distance = `${city.distance} km`.padEnd(12)
		const score = city.score.toFixed(1).padEnd(10)

		console.log(`${rank} ${name} ${country} ${population} ${distance} ${score}`)
	})

	console.log('='.repeat(100))

	// Statistiques
	const topCities = cities.slice(0, topN)
	const frenchCities = topCities.filter(c => c.country === 'France').length
	const swissCities = topCities.filter(c => c.country === 'Suisse').length

	console.log(`\n📊 STATISTIQUES:`)
	console.log(`   - Villes françaises: ${frenchCities}`)
	console.log(`   - Villes suisses: ${swissCities}`)
	console.log(`   - Distance moyenne: ${(topCities.reduce((sum, c) => sum + c.distance, 0) / topN).toFixed(1)} km`)
	console.log(
		`   - Population moyenne: ${Math.round(topCities.reduce((sum, c) => sum + c.population, 0) / topN).toLocaleString('fr-FR')}`
	)
}

/**
 * Génère un fichier JSON avec les résultats
 */
async function saveToFile(cities: City[], topN = 20) {
	const topCities = cities.slice(0, topN)

	const output = {
		generatedAt: new Date().toISOString(),
		baseLocation: {
			name: 'Thonon-les-Bains',
			lat: THONON_LAT,
			lon: THONON_LON,
		},
		searchRadius: SEARCH_RADIUS_KM,
		totalCitiesFound: cities.length,
		topCities: topCities.map((city, index) => ({
			rank: index + 1,
			name: city.name,
			country: city.country,
			population: city.population,
			distance: city.distance,
			coordinates: {
				lat: city.lat,
				lon: city.lon,
			},
			score: city.score,
		})),
		statistics: {
			frenchCities: topCities.filter(c => c.country === 'France').length,
			swissCities: topCities.filter(c => c.country === 'Suisse').length,
			averageDistance: Math.round((topCities.reduce((sum, c) => sum + c.distance, 0) / topN) * 10) / 10,
			averagePopulation: Math.round(topCities.reduce((sum, c) => sum + c.population, 0) / topN),
		},
	}

	const fs = await import('node:fs/promises')
	await fs.writeFile('./scripts/cities-data.json', JSON.stringify(output, null, 2))

	console.log(`\n💾 Résultats sauvegardés dans: scripts/cities-data.json`)
}

/**
 * Génère la liste formatée pour le SEO (à intégrer dans le site)
 */
function generateSEOList(cities: City[], topN = 150): string {
	const topCities = cities.slice(0, topN)

	const frenchCities = topCities.filter(c => c.country === 'France').map(c => c.name)
	const swissCities = topCities.filter(c => c.country === 'Suisse').map(c => c.name)

	let seoText = '\n📝 TEXTE POUR LE SEO:\n\n'
	seoText += "Zone d'intervention:\n"
	seoText += `Haute-Savoie: ${frenchCities.join(', ')}\n`
	seoText += `Suisse: ${swissCities.join(', ')}\n`

	console.log(seoText)

	return seoText
}

/**
 * Fonction principale
 */
async function main() {
	try {
		console.log('🚀 Démarrage du script de géolocalisation\n')

		// Récupérer les villes via API
		const cities = await fetchCitiesFromOverpass()

		// Afficher les résultats
		displayResults(cities, 150) // Afficher top 30 pour avoir une vue d'ensemble

		// Générer le texte SEO
		generateSEOList(cities, 150)

		// Sauvegarder dans un fichier
		await saveToFile(cities, 150)

		console.log('\n✅ Script terminé avec succès!')
	} catch (error) {
		console.error('\n❌ Erreur:', error)
		process.exit(1)
	}
}

// Exécuter le script
main()
