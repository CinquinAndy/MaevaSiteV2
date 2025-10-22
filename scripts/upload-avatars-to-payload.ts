/**
 * Script pour uploader les avatars dans Payload Media et lier aux témoignages
 * Les images seront automatiquement envoyées sur S3
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createReadStream } from 'node:fs'

interface AvatarMapping {
	author: string
	originalUrl: string
	localPath: string
}

interface AvatarMappingData {
	generatedAt: string
	totalReviews: number
	mapping: AvatarMapping[]
}

/**
 * Uploader les avatars dans Payload Media et lier aux témoignages
 */
async function uploadAvatarsToPayload() {
	console.log('📤 Upload des avatars dans Payload CMS (S3)\n')

	// 1. Charger le mapping
	const mappingPath = join(process.cwd(), 'reviews-data', 'avatars-mapping.json')
	const rawData = readFileSync(mappingPath, 'utf-8')
	const data: AvatarMappingData = JSON.parse(rawData)

	console.log(`📊 ${data.totalReviews} avatars à uploader\n`)

	// 2. Se connecter à Payload
	console.log('🔌 Connexion à Payload CMS...')
	const payload = await getPayload({ config })
	console.log('✅ Connecté à Payload CMS\n')

	// 3. Uploader et lier chaque avatar
	let uploaded = 0
	let linked = 0
	let skipped = 0
	let errors = 0

	for (let i = 0; i < data.mapping.length; i++) {
		const mapping = data.mapping[i]
		const num = i + 1

		try {
			console.log(`[${num}/${data.totalReviews}] 📤 ${mapping.author}`)

			// Trouver le témoignage par nom
			const testimonialResult = await payload.find({
				collection: 'testimonials',
				where: {
					name: { equals: mapping.author },
				},
				limit: 1,
			})

			if (testimonialResult.docs.length === 0) {
				console.log(`   ⚠️  Témoignage non trouvé dans Payload, skip`)
				skipped++
				continue
			}

			const testimonial = testimonialResult.docs[0]

			// Vérifier si l'avatar existe déjà dans Media
			const filename = mapping.localPath.split('/').pop() || 'avatar.jpg'
			const existingMedia = await payload.find({
				collection: 'media',
				where: {
					filename: { equals: filename },
				},
				limit: 1,
			})

			let mediaId: string | number

			if (existingMedia.docs.length > 0) {
				// Media existe déjà, réutiliser
				mediaId = existingMedia.docs[0].id
				console.log(`   ♻️  Media déjà existant (ID: ${mediaId})`)
			} else {
				// Upload le fichier dans Payload Media (sera envoyé sur S3)
				const filepath = join(process.cwd(), 'public', mapping.localPath)
				const fileBuffer = readFileSync(filepath)

				const media = await payload.create({
					collection: 'media',
					data: {
						alt: `Photo de profil de ${mapping.author}`,
					},
					file: {
						data: fileBuffer,
						mimetype: 'image/jpeg',
						name: filename,
						size: fileBuffer.length,
					},
				})

				mediaId = media.id
				console.log(`   ✅ Uploadé sur S3 (Media ID: ${mediaId})`)
				uploaded++
			}

			// Lier le media au témoignage
			await payload.update({
				collection: 'testimonials',
				id: testimonial.id,
				data: {
					avatar: mediaId, // Relation vers Media
				},
			})

			console.log(`   🔗 Lié au témoignage (ID: ${testimonial.id})`)
			linked++
		} catch (error) {
			console.log(`   ❌ Erreur: ${error}`)
			errors++
		}
	}

	// 4. Résumé
	console.log('\n═══════════════════════════════════════════════════')
	console.log('📊 RÉSUMÉ DE L\'UPLOAD')
	console.log('')
	console.log(`   📤 Uploadés sur S3: ${uploaded}`)
	console.log(`   ♻️  Réutilisés (déjà en S3): ${linked - uploaded}`)
	console.log(`   🔗 Liés aux témoignages: ${linked}`)
	console.log(`   ⏭️  Ignorés: ${skipped}`)
	console.log(`   ❌ Erreurs: ${errors}`)
	console.log(`   📝 Total: ${data.totalReviews}`)
	console.log('═══════════════════════════════════════════════════')
	console.log('')
	console.log('✅ Upload terminé ! Les avatars sont maintenant sur S3.')
}

// Exécuter le script
uploadAvatarsToPayload().catch((error) => {
	console.error('❌ Erreur fatale:', error)
	process.exit(1)
})
