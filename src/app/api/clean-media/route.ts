import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(_request: NextRequest) {
	try {
		// Only allow in development/local environment
		if (process.env.NODE_ENV === 'production') {
			return NextResponse.json({ error: 'This endpoint is disabled in production' }, { status: 403 })
		}

		const payload = await getPayload({ config })

		const deletionLog = {
			services: 0,
			realisations: 0,
			media: 0,
		}

		// Step 1: Delete all Services (they have required media references)
		const services = await payload.find({ collection: 'services', limit: 1000, pagination: false })
		for (const service of services.docs) {
			try {
				await payload.delete({ collection: 'services', id: service.id })
				deletionLog.services++
			} catch (error) {
				console.error(`Failed to delete service ${service.id}:`, error)
			}
		}

		// Step 2: Delete all Realisations (they have required media references)
		const realisations = await payload.find({ collection: 'realisations', limit: 1000, pagination: false })
		for (const realisation of realisations.docs) {
			try {
				await payload.delete({ collection: 'realisations', id: realisation.id })
				deletionLog.realisations++
			} catch (error) {
				console.error(`Failed to delete realisation ${realisation.id}:`, error)
			}
		}

		// Step 3: Get all media
		const mediaItems = await payload.find({
			collection: 'media',
			limit: 1000,
			pagination: false,
		})

		// Step 4: Delete all media items
		for (const media of mediaItems.docs) {
			try {
				await payload.delete({ collection: 'media', id: media.id })
				deletionLog.media++
			} catch (error) {
				console.error(`Failed to delete media ${media.id}:`, error)
			}
		}

		return NextResponse.json({
			success: true,
			message: `Reset complete: deleted ${deletionLog.services} services, ${deletionLog.realisations} realisations, and ${deletionLog.media} media items`,
			deleted: deletionLog,
		})
	} catch (error) {
		console.error('Error cleaning media:', error)
		return NextResponse.json(
			{ error: 'Failed to clean media', details: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		)
	}
}
