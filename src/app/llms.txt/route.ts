import config from '@payload-config'
import { getPayload } from 'payload'
import { getCityNamesForSEO } from '@/lib/cities-data'
import { SITE_CONFIG } from '@/lib/seo'

/**
 * /llms.txt : résumé du site en Markdown pour les IA (ChatGPT, Claude, Gemini, Perplexity…), selon la proposition
 * https://llmstxt.org : qui est Maeva, ce qu'elle propose, où, comment la contacter, et les pages à lire.
 * Généré depuis le CMS (prestations, galeries, articles publiés) et régénéré au plus toutes les heures.
 */

export const revalidate = 3600

const PRICE_LABEL: Record<string, string> = { fixed: '', from: 'à partir de ', quote: '' }

/** Section Markdown, omise si elle n'a aucune ligne. */
function section(title: string, lines: string[]) {
	return lines.length ? `## ${title}\n\n${lines.join('\n')}\n\n` : ''
}

function line(title: string, path: string, text?: string | null) {
	const description = text?.replace(/\s+/g, ' ').trim()
	return `- [${title}](${SITE_CONFIG.url}${path})${description ? ` : ${description}` : ''}`
}

export async function GET() {
	const payload = await getPayload({ config })
	const published = { status: { equals: 'published' } } as const
	const [services, galeries, posts] = await Promise.all([
		payload.find({ collection: 'services', where: published, sort: 'order', limit: 50, depth: 0 }),
		payload.find({ collection: 'galery', where: published, sort: '-publishedDate', limit: 100, depth: 0 }),
		payload.find({ collection: 'blog', where: published, sort: '-publishedDate', limit: 100, depth: 0 }),
	])
	const cities = getCityNamesForSEO()

	const serviceLines = services.docs.map(service => {
		const pricing = service.pricing
		const price =
			pricing?.displayPricing && pricing.priceType === 'quote'
				? ' (sur devis)'
				: pricing?.displayPricing && typeof pricing.price === 'number'
					? ` (${PRICE_LABEL[pricing.priceType ?? 'fixed'] ?? ''}${pricing.price} €)`
					: ''
		return line(`${service.title}${price}`, `/prestations/${service.slug}`, service.shortDescription)
	})

	const body = `# Maeva Cinquin, maquilleuse professionnelle et prothésiste ongulaire

> Maquilleuse professionnelle diplômée de la Make Up For Ever Academy (Nice) et prothésiste ongulaire, basée à Sciez (Haute-Savoie, entre Thonon-les-Bains et Genève). Maquillage de mariée, beauté et événements, maquillage artistique (shooting photo, scène, body painting, enfants) et nail art. Se déplace en Haute-Savoie et en Suisse romande, sur rendez-vous.

## Informations pratiques

- Zone d'intervention : environ 60 km autour de Thonon-les-Bains. France : ${cities.french.slice(0, 12).join(', ')}. Suisse : ${cities.swiss.slice(0, 8).join(', ')}.
- Contact : ${SITE_CONFIG.url}/contact, maevacinquin1@gmail.com, +33 6 16 62 51 37
- Instagram : https://www.instagram.com/makeup.artist.dream
- Fonctionnement : uniquement sur rendez-vous, déplacement à domicile, sur le lieu du mariage ou de l'événement. Devis gratuit.

${section('Prestations', serviceLines)}${section(
	'Galeries (réalisations)',
	galeries.docs.map(galery => line(galery.title, `/galerie/${galery.slug}`, galery.description))
)}${section(
	'Articles et conseils',
	posts.docs.map(post => line(post.title, `/blog/${post.slug}`, post.excerpt))
)}## Optional

- [Mentions légales](${SITE_CONFIG.url}/mentions-legales)
- [Plan du site (XML)](${SITE_CONFIG.url}/sitemap.xml)
`

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		},
	})
}
