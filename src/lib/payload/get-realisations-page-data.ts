import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { RealisationsPage } from '@/payload-types'

export async function getRealisationsPageData(): Promise<RealisationsPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const realisationsPage = await payload.findGlobal({
		slug: 'realisations-page',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!realisationsPage.hero?.title) {
		throw new Error('Realisations Page: Missing hero.title in Payload CMS')
	}
	if (!realisationsPage.hero?.image) {
		throw new Error('Realisations Page: Missing hero.image in Payload CMS')
	}
	if (!realisationsPage.introduction) {
		throw new Error('Realisations Page: Missing introduction in Payload CMS')
	}
	if (!realisationsPage.ctaSection) {
		throw new Error('Realisations Page: Missing ctaSection in Payload CMS')
	}

	return realisationsPage as RealisationsPage
}
