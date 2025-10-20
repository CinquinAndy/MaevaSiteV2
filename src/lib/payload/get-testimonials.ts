import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export interface Testimonial {
	id: string
	name: string
	content: string
	rating: number
	avatar?: {
		url?: string | null
		alt?: string | null
	} | null
	source?: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const { docs } = await payload.find({
		collection: 'testimonials',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: '-order',
		limit: 50,
	})

	return docs.map(testimonial => {
		const avatar = testimonial.avatar && typeof testimonial.avatar === 'object' ? testimonial.avatar : null

		return {
			id: testimonial.id,
			name: testimonial.name,
			content: testimonial.content,
			rating: testimonial.rating,
			avatar: avatar
				? {
						url: avatar.url || null,
						alt: avatar.alt || null,
					}
				: null,
			source: testimonial.source,
		}
	})
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const { docs } = await payload.find({
		collection: 'testimonials',
		where: {
			and: [
				{
					status: {
						equals: 'published',
					},
				},
				{
					featured: {
						equals: true,
					},
				},
			],
		},
		sort: '-order',
		limit: 20,
	})

	return docs.map(testimonial => {
		const avatar = testimonial.avatar && typeof testimonial.avatar === 'object' ? testimonial.avatar : null

		return {
			id: testimonial.id,
			name: testimonial.name,
			content: testimonial.content,
			rating: testimonial.rating,
			avatar: avatar
				? {
						url: avatar.url || null,
						alt: avatar.alt || null,
					}
				: null,
			source: testimonial.source,
		}
	})
}
