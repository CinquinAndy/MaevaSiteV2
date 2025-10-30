/**
 * Script pour nettoyer les avis Google extraits
 * - Supprime les doublons
 * - Corrige le nom de l'entreprise
 * - Calcule la note moyenne réelle
 * - Convertit les dates relatives en dates absolues
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { convertRelativeDate } from './convert-relative-dates'

interface Review {
	author: string
	authorImage?: string | null
	rating: number
	date: string
	text: string
	response?: {
		text: string
		date: string
	}
}

interface ReviewsData {
	businessName: string
	averageRating: number
	totalReviews: number
	placeId?: string
	extractedAt: string
	reviews: Review[]
}

function cleanReviews() {
	console.log('🧹 Nettoyage des avis Google...\n')

	// 1. Lire le fichier
	const filePath = join(process.cwd(), 'reviews-data', 'google-reviews.json')
	const rawData = readFileSync(filePath, 'utf-8')
	const data: ReviewsData = JSON.parse(rawData)

	console.log(`📊 Données initiales:`)
	console.log(`   - Total d'avis: ${data.reviews.length}`)
	console.log(`   - Nom entreprise: ${data.businessName}`)
	console.log(`   - Note moyenne: ${data.averageRating}`)

	// 2. Supprimer les doublons (basé sur author + text)
	const uniqueReviews = new Map<string, Review>()

	for (const review of data.reviews) {
		const key = `${review.author}|${review.text}`
		if (!uniqueReviews.has(key)) {
			uniqueReviews.set(key, review)
		}
	}

	const cleanedReviews = Array.from(uniqueReviews.values())

	console.log(`\n🔍 Après suppression des doublons:`)
	console.log(`   - Avis avant: ${data.reviews.length}`)
	console.log(`   - Avis après: ${cleanedReviews.length}`)
	console.log(`   - Doublons supprimés: ${data.reviews.length - cleanedReviews.length}`)

	// 3. Nettoyer les noms d'auteurs (enlever "Photo de ") et convertir les dates
	console.log(`\n📅 Conversion des dates relatives en dates absolues...`)
	const referenceDate = data.extractedAt ? new Date(data.extractedAt) : new Date()

	for (const review of cleanedReviews) {
		review.author = review.author.replace(/^Photo de /, '').trim()

		// Convertir la date relative en date ISO
		const originalDate = review.date
		review.date = convertRelativeDate(review.date, referenceDate)

		// Log si conversion réussie
		if (review.date !== originalDate && review.date.includes('T')) {
			// Date convertie avec succès (format ISO)
		}
	}

	// 3b. Statistiques sur les images
	const withImages = cleanedReviews.filter(r => r.authorImage).length
	console.log(`\n📸 Images de profil:`)
	console.log(`   - Avis avec image: ${withImages}`)
	console.log(`   - Avis sans image: ${cleanedReviews.length - withImages}`)

	// 4. Calculer la vraie note moyenne
	const totalRating = cleanedReviews.reduce((sum, review) => sum + review.rating, 0)
	const averageRating = cleanedReviews.length > 0 ? totalRating / cleanedReviews.length : 0

	console.log(`\n⭐ Note moyenne calculée:`)
	console.log(`   - Avant: ${data.averageRating}`)
	console.log(`   - Après: ${averageRating.toFixed(2)}`)

	// 5. Distribution des notes
	const distribution = cleanedReviews.reduce(
		(acc, review) => {
			acc[review.rating] = (acc[review.rating] || 0) + 1
			return acc
		},
		{} as Record<number, number>
	)

	console.log(`\n📈 Distribution des notes:`)
	for (let i = 5; i >= 1; i--) {
		const count = distribution[i] || 0
		const percentage = ((count / cleanedReviews.length) * 100).toFixed(1)
		console.log(`   - ${i} étoile${i > 1 ? 's' : ''}: ${count} (${percentage}%)`)
	}

	// 6. Trier par date (les plus récents en premier)
	cleanedReviews.sort((a, b) => {
		// Essayer de parser les dates ISO, sinon fallback sur tri texte
		try {
			const dateA = new Date(a.date).getTime()
			const dateB = new Date(b.date).getTime()

			// Si les deux dates sont valides, comparer (plus récent en premier)
			if (!isNaN(dateA) && !isNaN(dateB)) {
				return dateB - dateA
			}
		} catch {
			// Fallback sur ancien système si erreur
		}

		// Fallback: tri par texte de date (pour dates non converties)
		const getMonths = (dateText: string): number => {
			if (dateText.includes('semaine')) return 0.25
			if (dateText.includes('mois')) {
				const match = dateText.match(/(\d+)/)
				return match ? parseInt(match[1], 10) : 1
			}
			if (dateText.includes('an')) {
				const match = dateText.match(/(\d+)/)
				return match ? parseInt(match[1], 10) * 12 : 12
			}
			return 0
		}

		return getMonths(a.date) - getMonths(b.date)
	})

	// 7. Créer les données nettoyées
	const cleanedData: ReviewsData = {
		businessName: 'Maquilleuse professionnelle freelance - Makeup.Artist.Dream',
		averageRating: parseFloat(averageRating.toFixed(2)),
		totalReviews: cleanedReviews.length,
		extractedAt: data.extractedAt,
		reviews: cleanedReviews,
	}

	// 8. Sauvegarder
	writeFileSync(filePath, JSON.stringify(cleanedData, null, 2), 'utf-8')

	console.log(`\n💾 Fichier nettoyé sauvegardé:`)
	console.log(`   - ${filePath}`)

	// 9. Afficher quelques exemples
	console.log(`\n📝 Exemples d'avis (3 plus récents):`)
	for (let i = 0; i < Math.min(3, cleanedReviews.length); i++) {
		const review = cleanedReviews[i]
		const hasImage = review.authorImage ? '📷' : '👤'
		console.log(`\n   ${i + 1}. ${hasImage} ${review.author} - ${review.rating}★ - ${review.date}`)
		const preview = review.text.length > 100 ? `${review.text.substring(0, 100)}...` : review.text
		console.log(`      "${preview}"`)
		if (review.authorImage) {
			console.log(`      Image: ${review.authorImage.substring(0, 60)}...`)
		}
	}

	console.log(`\n✅ Nettoyage terminé avec succès!`)

	return cleanedData
}

cleanReviews()
