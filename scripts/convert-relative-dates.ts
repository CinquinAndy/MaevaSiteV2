/**
 * Convertit les dates relatives françaises en dates absolues
 */

/**
 * Convertit une date relative française ("il y a 3 mois") en date ISO
 * @param relativeDate - Date relative en français (ex: "il y a 3 mois", "il y a 1 an")
 * @param referenceDate - Date de référence (par défaut: maintenant)
 * @returns Date ISO string ou la date relative si conversion impossible
 */
export function convertRelativeDate(relativeDate: string, referenceDate: Date = new Date()): string {
	if (!relativeDate || typeof relativeDate !== 'string') {
		return relativeDate
	}

	// Nettoyer la chaîne
	const cleaned = relativeDate.toLowerCase().trim()

	// Patterns pour extraire le nombre et l'unité
	const patterns = [
		// "il y a X mois/ans/semaines/jours"
		/il y a (\d+)\s*(mois|an|ans|semaine|semaines|jour|jours)/,
		// "il y a un/une mois/an/semaine/jour"
		/il y a (?:un|une)\s*(mois|an|semaine|jour)/,
	]

	for (const pattern of patterns) {
		const match = cleaned.match(pattern)
		if (match) {
			let amount = 1
			const unit = match[2] || match[1]

			// Si on a capturé un nombre
			if (match[1] && /^\d+$/.test(match[1])) {
				amount = Number.parseInt(match[1], 10)
			}

			// Calculer la date
			const date = new Date(referenceDate)

			switch (unit) {
				case 'jour':
				case 'jours':
					date.setDate(date.getDate() - amount)
					break
				case 'semaine':
				case 'semaines':
					date.setDate(date.getDate() - amount * 7)
					break
				case 'mois':
					date.setMonth(date.getMonth() - amount)
					break
				case 'an':
				case 'ans':
					date.setFullYear(date.getFullYear() - amount)
					break
			}

			return date.toISOString()
		}
	}

	// Si pas de conversion possible, retourner la chaîne originale
	return relativeDate
}

/**
 * Formate une date ISO en format français lisible
 * @param isoDate - Date au format ISO
 * @returns Date formatée (ex: "12 janvier 2024")
 */
export function formatDateFrench(isoDate: string): string {
	try {
		const date = new Date(isoDate)
		const months = [
			'janvier',
			'février',
			'mars',
			'avril',
			'mai',
			'juin',
			'juillet',
			'août',
			'septembre',
			'octobre',
			'novembre',
			'décembre',
		]

		const day = date.getDate()
		const month = months[date.getMonth()]
		const year = date.getFullYear()

		return `${day} ${month} ${year}`
	} catch {
		return isoDate
	}
}

/**
 * Teste les conversions de dates
 */
function testConversions() {
	const tests = [
		'il y a 3 mois',
		'il y a 1 an',
		'il y a 9 mois',
		'il y a 2 ans',
		'il y a une semaine',
		'il y a un jour',
		'Invalid date',
	]

	console.log('🧪 Test de conversion de dates relatives:\n')

	for (const test of tests) {
		const converted = convertRelativeDate(test)
		const formatted = formatDateFrench(converted)
		console.log(`"${test}" → ${converted.substring(0, 10)} → "${formatted}"`)
	}
}

// Exécuter les tests si le script est lancé directement
if (import.meta.url === `file://${process.argv[1]}`) {
	testConversions()
}
