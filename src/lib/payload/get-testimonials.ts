/**
 * Fonctions utilitaires pour récupérer les témoignages depuis Payload CMS
 */

import config from '@payload-config'
import { getPayload } from 'payload'

export interface TestimonialData {
	id: string
	name: string
	content: string
	publishedDate?: string
	rating: number
	source: 'google' | 'facebook' | 'instagram' | 'email' | 'other'
	sourceUrl?: string
	avatarUrl?: string
	avatar?: {
		url: string
		alt?: string
	}
	featured: boolean
	status: 'draft' | 'published'
	order: number
	createdAt: string
	updatedAt: string
}

/**
 * Récupérer tous les témoignages publiés
 */
export async function getPublishedTestimonials(): Promise<TestimonialData[]> {
	const payload = await getPayload({ config })

	const result = await payload.find({
		collection: 'testimonials',
		where: {
			status: { equals: 'published' },
		},
		sort: '-order', // Trier par ordre décroissant (plus récents en premier)
		limit: 100,
	})

	return result.docs as unknown as TestimonialData[]
}

/**
 * Récupérer les témoignages mis en avant
 */
export async function getFeaturedTestimonials(limit = 3): Promise<TestimonialData[]> {
	const payload = await getPayload({ config })

	const result = await payload.find({
		collection: 'testimonials',
		where: {
			and: [{ status: { equals: 'published' } }, { featured: { equals: true } }],
		},
		sort: '-order',
		limit,
	})

	return result.docs as unknown as TestimonialData[]
}

/**
 * Récupérer les témoignages par source (ex: Google)
 */
export async function getTestimonialsBySource(
	source: 'google' | 'facebook' | 'instagram' | 'email' | 'other',
	limit = 50
): Promise<TestimonialData[]> {
	const payload = await getPayload({ config })

	const result = await payload.find({
		collection: 'testimonials',
		where: {
			and: [{ status: { equals: 'published' } }, { source: { equals: source } }],
		},
		sort: '-order',
		limit,
	})

	return result.docs as unknown as TestimonialData[]
}

/**
 * Récupérer les témoignages avec une note spécifique
 */
export async function getTestimonialsByRating(rating: number, limit = 20): Promise<TestimonialData[]> {
	const payload = await getPayload({ config })

	const result = await payload.find({
		collection: 'testimonials',
		where: {
			and: [{ status: { equals: 'published' } }, { rating: { equals: rating } }],
		},
		sort: '-order',
		limit,
	})

	return result.docs as unknown as TestimonialData[]
}

/**
 * Récupérer les statistiques des témoignages
 */
export async function getTestimonialsStats() {
	const payload = await getPayload({ config })

	// Total de témoignages publiés
	const totalPublished = await payload.find({
		collection: 'testimonials',
		where: {
			status: { equals: 'published' },
		},
		limit: 0, // Juste pour avoir le count
	})

	// Témoignages Google
	const googleReviews = await payload.find({
		collection: 'testimonials',
		where: {
			and: [{ status: { equals: 'published' } }, { source: { equals: 'google' } }],
		},
		limit: 0,
	})

	// Témoignages mis en avant
	const featured = await payload.find({
		collection: 'testimonials',
		where: {
			and: [{ status: { equals: 'published' } }, { featured: { equals: true } }],
		},
		limit: 0,
	})

	// Calculer la note moyenne
	const allPublished = await payload.find({
		collection: 'testimonials',
		where: {
			status: { equals: 'published' },
		},
		limit: 1000, // Limite raisonnable
	})

	const averageRating =
		allPublished.docs.length > 0
			? allPublished.docs.reduce((sum, doc) => sum + (doc.rating || 0), 0) / allPublished.docs.length
			: 0

	// Distribution des notes
	const ratingDistribution = allPublished.docs.reduce(
		(acc, doc) => {
			const rating = doc.rating || 0
			acc[rating] = (acc[rating] || 0) + 1
			return acc
		},
		{} as Record<number, number>
	)

	return {
		total: totalPublished.totalDocs,
		google: googleReviews.totalDocs,
		featured: featured.totalDocs,
		averageRating: parseFloat(averageRating.toFixed(2)),
		ratingDistribution,
	}
}
