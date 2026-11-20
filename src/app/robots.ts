import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

/**
 * Génère automatiquement le fichier robots.txt
 * Autorise tous les bots (sauf l'admin et l'API, images du CMS exceptées) et référence le sitemap
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				// Les images du CMS (partages, JSON-LD, articles) sont servies sous /api/media/file/ : elles doivent
				// rester lisibles par Google, Facebook et X, le reste de /api/ non.
				allow: ['/', '/api/media/file/'],
				disallow: ['/admin/', '/api/'],
			},
		],
		sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
	}
}
