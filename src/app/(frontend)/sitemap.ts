import type { MetadataRoute } from 'next'
import { getRealisations, getServices } from '@/lib/payload'
import { getSiteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const siteUrl = getSiteUrl()

	// Fetch dynamic content from Payload
	const [services, realisations] = await Promise.all([getServices(), getRealisations()])

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: siteUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		{
			url: `${siteUrl}/prestations`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${siteUrl}/realisations`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${siteUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${siteUrl}/faq`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${siteUrl}/mentions-legales`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	]

	// Service detail pages
	const servicePages: MetadataRoute.Sitemap = services.map(service => ({
		url: `${siteUrl}/prestations/${service.slug}`,
		lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}))

	// Realisation detail pages
	const realisationPages: MetadataRoute.Sitemap = realisations.map(realisation => ({
		url: `${siteUrl}/realisations/${realisation.slug}`,
		lastModified: realisation.updatedAt ? new Date(realisation.updatedAt) : new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}))

	// Combine all pages
	return [...staticPages, ...servicePages, ...realisationPages]
}
