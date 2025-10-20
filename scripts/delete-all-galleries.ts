/**
 * Script pour supprimer toutes les galeries existantes dans Payload
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
	console.log('🗑️  Suppression de toutes les galeries\n')

	const payload = await getPayload({ config })
	console.log('✓ Payload initialisé\n')

	// Récupérer toutes les galeries
	const { docs: galleries } = await payload.find({
		collection: 'gallery',
		limit: 1000,
		pagination: false,
	})

	console.log(`📊 ${galleries.length} galeries trouvées\n`)

	if (galleries.length === 0) {
		console.log('✓ Aucune galerie à supprimer')
		process.exit(0)
	}

	// Supprimer chaque galerie
	for (const gallery of galleries) {
		console.log(`🗑️  Suppression: ${gallery.title}`)
		await payload.delete({
			collection: 'gallery',
			id: gallery.id,
		})
	}

	console.log('\n✅ Toutes les galeries ont été supprimées')
	process.exit(0)
}

main().catch((error) => {
	console.error('❌ Erreur:', error)
	process.exit(1)
})
