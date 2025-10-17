import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PrestationsPage } from '@/payload-types'

export async function getPrestationsPageData(): Promise<PrestationsPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const prestationsPage = await payload.findGlobal({
		slug: 'prestations-page',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!prestationsPage.hero?.title) {
		throw new Error('Prestations Page: Missing hero.title in Payload CMS')
	}
	if (!prestationsPage.hero?.image) {
		throw new Error('Prestations Page: Missing hero.image in Payload CMS')
	}
	if (!prestationsPage.taxCreditEligibility) {
		throw new Error('Prestations Page: Missing taxCreditEligibility in Payload CMS')
	}
	if (!prestationsPage.ctaSection) {
		throw new Error('Prestations Page: Missing ctaSection in Payload CMS')
	}

	return prestationsPage as PrestationsPage
}
