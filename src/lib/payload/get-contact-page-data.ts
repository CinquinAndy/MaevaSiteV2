import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { ContactPage } from '@/payload-types'

export async function getContactPageData(): Promise<ContactPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const contactPage = await payload.findGlobal({
		slug: 'contact-page',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!contactPage.hero?.title) {
		throw new Error('Contact Page: Missing hero.title in Payload CMS')
	}
	if (!contactPage.hero?.image) {
		throw new Error('Contact Page: Missing hero.image in Payload CMS')
	}
	if (!contactPage.formSection) {
		throw new Error('Contact Page: Missing formSection in Payload CMS')
	}
	if (!contactPage.contactInfoSidebar) {
		throw new Error('Contact Page: Missing contactInfoSidebar in Payload CMS')
	}
	if (!contactPage.contactInfoSidebar.benefits || contactPage.contactInfoSidebar.benefits.length === 0) {
		throw new Error('Contact Page: Missing contactInfoSidebar.benefits in Payload CMS')
	}

	return contactPage as ContactPage
}
