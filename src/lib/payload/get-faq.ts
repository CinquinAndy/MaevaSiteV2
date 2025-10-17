import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Faq } from '@/payload-types'

export async function getFaq(limit?: number): Promise<Faq[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const faq = await payload.find({
		collection: 'faq',
		depth: 1,
		sort: 'order',
		limit: limit || 100,
	})

	return faq.docs as Faq[]
}

export async function getFaqByCategory(category: 'general' | 'services' | 'tarifs' | 'ecologie'): Promise<Faq[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const faq = await payload.find({
		collection: 'faq',
		depth: 1,
		where: {
			category: {
				equals: category,
			},
		},
		sort: 'order',
		limit: 100,
	})

	return faq.docs as Faq[]
}

export async function getHomepageFaq(count: number = 4): Promise<Faq[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const faq = await payload.find({
		collection: 'faq',
		depth: 1,
		where: {
			showOnHomepage: {
				equals: true,
			},
		},
		sort: 'order',
		limit: count,
	})

	return faq.docs as Faq[]
}
