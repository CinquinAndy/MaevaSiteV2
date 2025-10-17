import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteSetting } from '@/payload-types'

export async function getSiteSettings(): Promise<SiteSetting> {
	const payload = await getPayload({
		config: configPromise,
	})

	const siteSettings = await payload.findGlobal({
		slug: 'site-settings',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!siteSettings.contact) {
		throw new Error('Site Settings: Missing contact information in Payload CMS')
	}
	if (!siteSettings.contact.phone) {
		throw new Error('Site Settings: Missing contact.phone in Payload CMS')
	}
	if (!siteSettings.contact.email) {
		throw new Error('Site Settings: Missing contact.email in Payload CMS')
	}

	return siteSettings as SiteSetting
}
