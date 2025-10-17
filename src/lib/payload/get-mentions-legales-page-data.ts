import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { MentionsLegalesPage } from '@/payload-types'

export async function getMentionsLegalesPageData(): Promise<MentionsLegalesPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const mentionsLegalesPage = await payload.findGlobal({
		slug: 'mentions-legales-page',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!mentionsLegalesPage.hero?.title) {
		throw new Error('Mentions Legales Page: Missing hero.title in Payload CMS')
	}
	if (!mentionsLegalesPage.hero?.image) {
		throw new Error('Mentions Legales Page: Missing hero.image in Payload CMS')
	}
	if (!mentionsLegalesPage.content) {
		throw new Error('Mentions Legales Page: Missing content in Payload CMS')
	}

	return mentionsLegalesPage as MentionsLegalesPage
}
