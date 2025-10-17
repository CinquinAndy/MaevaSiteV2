import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Homepage } from '@/payload-types'

export async function getHomepageData(): Promise<Homepage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const homepage = await payload.findGlobal({
		slug: 'homepage',
		depth: 2, // Include related media
	})

	// Validate critical fields
	if (!homepage.hero?.title) {
		throw new Error('Homepage: Missing hero.title in Payload CMS')
	}
	if (!homepage.values) {
		throw new Error('Homepage: Missing values section in Payload CMS')
	}
	if (!homepage.servicesPreview) {
		throw new Error('Homepage: Missing servicesPreview section in Payload CMS')
	}
	if (!homepage.philosophy) {
		throw new Error('Homepage: Missing philosophy section in Payload CMS')
	}
	if (!homepage.interventionZone) {
		throw new Error('Homepage: Missing interventionZone section in Payload CMS')
	}
	if (!homepage.realisationsPreview) {
		throw new Error('Homepage: Missing realisationsPreview section in Payload CMS')
	}
	if (!homepage.faqShort) {
		throw new Error('Homepage: Missing faqShort section in Payload CMS')
	}
	if (!homepage.taxCredit) {
		throw new Error('Homepage: Missing taxCredit section in Payload CMS')
	}
	if (!homepage.finalCta) {
		throw new Error('Homepage: Missing finalCta section in Payload CMS')
	}

	return homepage as Homepage
}
