import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Realisation } from '@/payload-types'

export async function getRealisations(limit?: number): Promise<Realisation[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const realisations = await payload.find({
		collection: 'realisations',
		depth: 2, // Include related media
		sort: '-date', // Most recent first by project date
		limit: limit || 100,
	})

	return realisations.docs as Realisation[]
}

export async function getLatestRealisations(count: number = 6): Promise<Realisation[]> {
	return getRealisations(count)
}

export async function getRealisationBySlug(slug: string): Promise<Realisation> {
	const payload = await getPayload({
		config: configPromise,
	})

	const result = await payload.find({
		collection: 'realisations',
		where: {
			slug: {
				equals: slug,
			},
		},
		depth: 2, // Include related media
		limit: 1,
	})

	if (result.docs.length === 0) {
		throw new Error(`Realisation not found: ${slug}. Please check the slug or create the realisation in Payload CMS.`)
	}

	const realisation = result.docs[0] as Realisation

	// Validate critical fields
	if (!realisation.title) {
		throw new Error(`Realisation ${slug}: Missing title in Payload CMS`)
	}
	if (!realisation.image) {
		throw new Error(`Realisation ${slug}: Missing image in Payload CMS`)
	}
	if (!realisation.ctaSection) {
		throw new Error(`Realisation ${slug}: Missing ctaSection in Payload CMS`)
	}

	return realisation
}
