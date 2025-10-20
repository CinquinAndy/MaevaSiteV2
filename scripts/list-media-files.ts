/**
 * Script pour lister tous les fichiers média dans Payload
 * avec filtrage par pattern pour identifier les galeries
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'node:fs'
import path from 'node:path'

async function main() {
	console.log('🚀 Liste des fichiers média dans Payload\n')

	const payload = await getPayload({ config })
	console.log('✓ Payload initialisé\n')

	// Récupérer tous les médias
	const { docs: allMedia } = await payload.find({
		collection: 'media',
		limit: 1000,
		pagination: false,
	})

	console.log(`📊 Total: ${allMedia.length} fichiers média\n`)

	// Grouper par patterns de noms
	const groups: Record<string, any[]> = {
		'Mi-ange Mi-démon': [],
		Cirque: [],
		Naturel: [],
		Halloween: [],
		'Beauté/Bokeh': [],
		'Salon Mariage': [],
		'Nail Art': [],
		Autres: [],
	}

	for (const media of allMedia) {
		const filename = media.filename?.toLowerCase() || ''

		if (filename.includes('img_97')) {
			groups['Mi-ange Mi-démon'].push(media)
		} else if (filename.includes('cirque')) {
			groups.Cirque.push(media)
		} else if (filename.includes('maquillage_naturel_')) {
			groups.Naturel.push(media)
		} else if (filename.includes('halloween')) {
			groups.Halloween.push(media)
		} else if (
			filename.includes('beauté') ||
			filename.includes('beaute') ||
			filename.includes('bokeh')
		) {
			groups['Beauté/Bokeh'].push(media)
		} else if (filename.includes('salon_mariage')) {
			groups['Salon Mariage'].push(media)
		} else if (
			filename.includes('image000') ||
			filename.includes('imgp6') ||
			filename.includes('img_04') ||
			filename.includes('img_03')
		) {
			groups['Nail Art'].push(media)
		} else {
			groups.Autres.push(media)
		}
	}

	// Afficher les résultats
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	for (const [groupName, files] of Object.entries(groups)) {
		if (files.length === 0) continue

		console.log(`\n📁 ${groupName} (${files.length} fichiers)`)
		console.log('─'.repeat(50))

		// Afficher les premiers fichiers
		const displayCount = Math.min(10, files.length)
		for (let i = 0; i < displayCount; i++) {
			console.log(`   ${i + 1}. ${files[i].filename}`)
		}

		if (files.length > displayCount) {
			console.log(`   ... et ${files.length - displayCount} autres`)
		}
	}

	// Sauvegarder dans un fichier
	const output = Object.entries(groups).map(([groupName, files]) => ({
		group: groupName,
		count: files.length,
		files: files.map((f) => ({
			id: f.id,
			filename: f.filename,
			alt: f.alt || '',
		})),
	}))

	const outputPath = path.join(process.cwd(), 'save', 'media-groups.json')
	fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))

	console.log(`\n\n📁 Résultats sauvegardés: ${outputPath}`)

	process.exit(0)
}

main().catch((error) => {
	console.error('❌ Erreur:', error)
	process.exit(1)
})
