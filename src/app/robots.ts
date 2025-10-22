import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

/**
 * Génère automatiquement le fichier robots.txt
 * Autorise tous les bots et référence le sitemap
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/admin/', '/api/'],
			},
		],
		sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
	}
}
