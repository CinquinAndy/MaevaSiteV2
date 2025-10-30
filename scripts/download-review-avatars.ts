/**
 * Script pour télécharger les avatars des avis Google
 * Télécharge toutes les images de profil et les sauvegarde dans /public/avatars/
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface GoogleReview {
	author: string
	authorImage: string | null
	rating: number
	date: string
	text: string
}

interface ReviewsData {
	businessName: string
	averageRating: number
	totalReviews: number
	extractedAt: string
	reviews: GoogleReview[]
}

/**
 * Crée un nom de fichier valide à partir du nom d'auteur
 */
function sanitizeFilename(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

/**
 * Télécharge une image depuis une URL
 */
async function downloadImage(url: string, filepath: string): Promise<boolean> {
	try {
		// Modifier l'URL pour avoir une meilleure résolution (s200 au lieu de w36-h36)
		const highResUrl = url.replace(/=w\d+-h\d+/, '=s200')

		const response = await fetch(highResUrl)
		if (!response.ok) {
			console.error(`   ❌ Erreur HTTP ${response.status} pour ${url}`)
			return false
		}

		const arrayBuffer = await response.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		writeFileSync(filepath, buffer)
		return true
	} catch (error) {
		console.error(`   ❌ Erreur lors du téléchargement: ${error}`)
		return false
	}
}

/**
 * Télécharge tous les avatars des avis
 */
async function downloadAllAvatars() {
	console.log('📥 Téléchargement des avatars des avis Google\n')

	// 1. Lire le fichier de reviews
	const reviewsPath = join(process.cwd(), 'reviews-data', 'google-reviews.json')
	const rawData = readFileSync(reviewsPath, 'utf-8')
	const data: ReviewsData = JSON.parse(rawData)

	console.log(`📊 ${data.totalReviews} avis trouvés\n`)

	// 2. Créer le dossier public/avatars s'il n'existe pas
	const avatarsDir = join(process.cwd(), 'public', 'avatars')
	if (!existsSync(avatarsDir)) {
		mkdirSync(avatarsDir, { recursive: true })
		console.log(`📁 Dossier créé: ${avatarsDir}\n`)
	}

	// 3. Télécharger chaque avatar
	let downloaded = 0
	let skipped = 0
	let errors = 0

	const mapping: Array<{ author: string; originalUrl: string; localPath: string }> = []

	for (let i = 0; i < data.reviews.length; i++) {
		const review = data.reviews[i]
		const num = i + 1

		if (!review.authorImage) {
			console.log(`[${num}/${data.totalReviews}] ⏭️  ${review.author} - Pas d'image`)
			skipped++
			continue
		}

		const filename = `${sanitizeFilename(review.author)}.jpg`
		const filepath = join(avatarsDir, filename)
		const localPath = `/avatars/${filename}`

		// Skip si déjà téléchargé
		if (existsSync(filepath)) {
			console.log(`[${num}/${data.totalReviews}] ✓ ${review.author} - Déjà téléchargé`)
			mapping.push({
				author: review.author,
				originalUrl: review.authorImage,
				localPath,
			})
			skipped++
			continue
		}

		console.log(`[${num}/${data.totalReviews}] 📥 ${review.author}...`)
		const success = await downloadImage(review.authorImage, filepath)

		if (success) {
			console.log(`   ✅ Sauvegardé: ${localPath}`)
			downloaded++
			mapping.push({
				author: review.author,
				originalUrl: review.authorImage,
				localPath,
			})
		} else {
			errors++
		}

		// Petite pause pour éviter de surcharger Google
		await new Promise(resolve => setTimeout(resolve, 200))
	}

	// 4. Sauvegarder le mapping
	const mappingPath = join(process.cwd(), 'reviews-data', 'avatars-mapping.json')
	writeFileSync(
		mappingPath,
		JSON.stringify(
			{
				generatedAt: new Date().toISOString(),
				totalReviews: data.totalReviews,
				mapping,
			},
			null,
			2
		),
		'utf-8'
	)

	// 5. Résumé
	console.log('\n═══════════════════════════════════════════════════')
	console.log('📊 RÉSUMÉ DU TÉLÉCHARGEMENT')
	console.log('')
	console.log(`   ✅ Téléchargés: ${downloaded}`)
	console.log(`   ⏭️  Ignorés (déjà présents): ${skipped}`)
	console.log(`   ❌ Erreurs: ${errors}`)
	console.log(`   📝 Total: ${data.totalReviews}`)
	console.log('═══════════════════════════════════════════════════')
	console.log('')
	console.log(`💾 Mapping sauvegardé: ${mappingPath}`)
	console.log(`📁 Images sauvegardées dans: ${avatarsDir}`)
	console.log('')
	console.log('✅ Téléchargement terminé !')
}

// Exécuter le script
downloadAllAvatars().catch(error => {
	console.error('❌ Erreur fatale:', error)
	process.exit(1)
})
