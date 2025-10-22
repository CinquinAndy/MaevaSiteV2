import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import { SITE_CONFIG } from '@/lib/seo'
import type { Blog, Galery, Service } from '@/payload-types'

/**
 * Génère automatiquement le sitemap.xml du site
 * Inclut toutes les pages statiques et dynamiques (blog, galerie, services)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const siteUrl = SITE_CONFIG.url
	const payload = await getPayload({ config })

	// Récupérer toutes les données dynamiques depuis Payload CMS
	const [blogPosts, galeries, services] = await Promise.all([
		// Articles de blog publiés
		payload.find({
			collection: 'blog',
			where: {
				status: {
					equals: 'published',
				},
			},
			limit: 1000,
			sort: '-publishedDate',
		}),
		// Galeries publiées
		payload.find({
			collection: 'galery',
			where: {
				status: {
					equals: 'published',
				},
			},
			limit: 1000,
			sort: '-publishedDate',
		}),
		// Services publiés
		payload.find({
			collection: 'services',
			where: {
				status: {
					equals: 'published',
				},
			},
			limit: 1000,
			sort: 'order',
		}),
	])

	// Pages statiques
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: siteUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		{
			url: `${siteUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${siteUrl}/galerie`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${siteUrl}/prestations`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${siteUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${siteUrl}/mentions-legales`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	]

	// Pages de blog dynamiques
	const blogPages: MetadataRoute.Sitemap = blogPosts.docs.map((post: Blog) => ({
		url: `${siteUrl}/blog/${post.slug}`,
		lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedDate),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}))

	// Pages de galerie dynamiques
	const galeryPages: MetadataRoute.Sitemap = galeries.docs.map((galery: Galery) => ({
		url: `${siteUrl}/galerie/${galery.slug}`,
		lastModified: galery.updatedAt ? new Date(galery.updatedAt) : new Date(galery.publishedDate),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}))

	// Pages de services dynamiques
	const servicePages: MetadataRoute.Sitemap = services.docs.map((service: Service) => ({
		url: `${siteUrl}/prestations/${service.slug}`,
		lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	}))

	// Combiner toutes les pages
	return [...staticPages, ...blogPages, ...galeryPages, ...servicePages]
}
