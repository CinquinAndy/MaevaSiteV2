import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { FaqPage } from '@/payload-types'

export async function getFaqPageData(): Promise<FaqPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const faqPage = await payload.findGlobal({
		slug: 'faq-page',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!faqPage.hero?.title) {
		throw new Error('FAQ Page: Missing hero.title in Payload CMS')
	}
	if (!faqPage.hero?.image) {
		throw new Error('FAQ Page: Missing hero.image in Payload CMS')
	}
	if (!faqPage.ctaSection) {
		throw new Error('FAQ Page: Missing ctaSection in Payload CMS')
	}

	return faqPage as FaqPage
}
