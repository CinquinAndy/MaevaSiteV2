/**
 * Script pour importer les galeries dans Payload CMS
 * Utilise galleries-config.json pour créer les galeries avec les images correspondantes
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'node:fs'
import path from 'node:path'

interface GalleryConfig {
	title: string
	slug: string
	description: string
	category: string
	keywords: string[]
}

interface MediaItem {
	id: string
	filename: string
	alt?: string
	title?: string
}

// Charger la configuration des galeries
function loadGalleriesConfig(): GalleryConfig[] {
	const configPath = path.join(process.cwd(), 'scripts', 'galleries-config.json')
	const configData = fs.readFileSync(configPath, 'utf-8')
	return JSON.parse(configData)
}

// Trouver les images correspondantes aux keywords
async function findMatchingImages(
	payload: any,
	keywords: string[]
): Promise<Array<{ image: string; caption: string }>> {
	console.log(`   🔍 Recherche d'images avec keywords: ${keywords.join(', ')}`)

	// Récupérer tous les médias
	const { docs: allMedia } = await payload.find({
		collection: 'media',
		limit: 1000,
		pagination: false,
	})

	const matchedImages: Array<{ image: string; caption: string }> = []
	const matchedIds = new Set<string>()

	// Pour chaque keyword, chercher les images correspondantes
	for (const keyword of keywords) {
		const lowerKeyword = keyword.toLowerCase()

		for (const media of allMedia as MediaItem[]) {
			// Éviter les doublons
			if (matchedIds.has(media.id)) continue

			const filename = media.filename?.toLowerCase() || ''
			const alt = media.alt?.toLowerCase() || ''
			const title = media.title?.toLowerCase() || ''

			// Vérifier si le keyword correspond
			if (filename.includes(lowerKeyword) || alt.includes(lowerKeyword) || title.includes(lowerKeyword)) {
				matchedImages.push({
					image: media.id,
					caption: media.alt || media.title || '',
				})
				matchedIds.add(media.id)
				console.log(`      ✓ Trouvé: ${media.filename}`)
			}
		}
	}

	console.log(`   📊 Total: ${matchedImages.length} images trouvées`)
	return matchedImages
}

// Créer ou mettre à jour une galerie
async function createOrUpdateGallery(payload: any, config: GalleryConfig) {
	console.log(`\n📁 Traitement: ${config.title}`)
	console.log(`   Slug: ${config.slug}`)
	console.log(`   Catégorie: ${config.category}`)

	// Trouver les images correspondantes
	const images = await findMatchingImages(payload, config.keywords)

	if (images.length === 0) {
		console.log(`   ⚠️  Aucune image trouvée pour cette galerie, création ignorée`)
		return null
	}

	// Vérifier si la galerie existe déjà
	const existing = await payload.find({
		collection: 'gallery',
		where: {
			slug: {
				equals: config.slug,
			},
		},
		limit: 1,
	})

	// Utiliser la première image comme cover
	const coverImage = images[0]?.image

	const galleryData = {
		title: config.title,
		slug: config.slug,
		description: config.description,
		category: config.category,
		coverImage,
		images,
		publishedDate: new Date().toISOString(),
		status: 'published',
	}

	if (existing.docs.length > 0) {
		// Mettre à jour la galerie existante
		console.log(`   🔄 Mise à jour de la galerie existante...`)
		const result = await payload.update({
			collection: 'gallery',
			id: existing.docs[0].id,
			data: galleryData,
		})
		console.log(`   ✅ Galerie mise à jour: ${result.id}`)
		return result
	}

	// Créer une nouvelle galerie
	console.log(`   ➕ Création de la nouvelle galerie...`)
	const result = await payload.create({
		collection: 'gallery',
		data: galleryData,
	})
	console.log(`   ✅ Galerie créée: ${result.id}`)
	return result
}

// Fonction principale
async function main() {
	console.log('🚀 Import des galeries dans Payload CMS\n')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// Initialiser Payload
	console.log('⚙️  Initialisation de Payload...')
	const payload = await getPayload({ config })
	console.log('✓ Payload initialisé\n')

	// Charger la configuration des galeries
	const galleriesConfig = loadGalleriesConfig()
	console.log(`📚 ${galleriesConfig.length} galeries à importer\n`)

	let created = 0
	let updated = 0
	let skipped = 0

	// Traiter chaque galerie
	for (const config of galleriesConfig) {
		try {
			const result = await createOrUpdateGallery(payload, config)
			if (!result) {
				skipped++
			} else if ('updatedAt' in result) {
				updated++
			} else {
				created++
			}
		} catch (error) {
			console.error(`   ❌ Erreur lors du traitement de ${config.title}:`, error)
			skipped++
		}
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('✅ IMPORT TERMINÉ !')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log(`\n📊 Résumé:`)
	console.log(`   ✓ Créées: ${created}`)
	console.log(`   🔄 Mises à jour: ${updated}`)
	console.log(`   ⊘ Ignorées: ${skipped}`)
	console.log(`   📁 Total: ${galleriesConfig.length}`)

	process.exit(0)
}

main().catch((error) => {
	console.error('\n❌ Erreur fatale:', error)
	process.exit(1)
})
