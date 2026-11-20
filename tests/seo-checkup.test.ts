import { describe, expect, test } from 'bun:test'
import { getCityNamesForSEO, SERVICE_RADIUS_KM } from '@/lib/cities-data'
import { normalizeSlug, slugMatches } from '@/lib/payload/find-page-by-slug'
import { generateLocalBusinessSchema, optimizedImageUrl } from '@/lib/seo'

describe('optimizedImageUrl', () => {
	test('images du site : passées par l’optimiseur de Next en 1200 px', () => {
		expect(optimizedImageUrl('https://cinquin-maeva.com/api/media/file/IMG_0029.jpeg')).toBe(
			'https://cinquin-maeva.com/_next/image?url=%2Fapi%2Fmedia%2Ffile%2FIMG_0029.jpeg&w=1200&q=75'
		)
		expect(optimizedImageUrl('/image00002.jpeg')).toBe(
			'https://cinquin-maeva.com/_next/image?url=%2Fimage00002.jpeg&w=1200&q=75'
		)
	})

	test('images d’autres domaines et URL déjà optimisées : inchangées', () => {
		expect(optimizedImageUrl('https://example.com/a.jpg')).toBe('https://example.com/a.jpg')
		const done = 'https://cinquin-maeva.com/_next/image?url=%2Fa.jpg&w=1200&q=75'
		expect(optimizedImageUrl(done)).toBe(done)
	})
})

describe('anciennes adresses et casse des slugs', () => {
	test('normalizeSlug', () => {
		expect(normalizeSlug('Conseils-beaute-peau-rayonnante-mariage')).toBe('conseils-beaute-peau-rayonnante-mariage')
		expect(normalizeSlug('Maquillage%20Mariée')).toBe('maquillage-mariee')
	})

	test('slugMatches : casse, accents et préfixe de migration', () => {
		expect(slugMatches('Maquillage-Halloween-shootingphotos', 'maquillage-halloween-shootingphotos')).toBe(true)
		expect(slugMatches('collection-mi-ange-mi-demon', 'mi-ange-mi-demon')).toBe(true)
		expect(slugMatches('maquillage-mariage', 'maquillage')).toBe(false)
		expect(slugMatches('a', '')).toBe(false)
	})
})

describe('SEO local', () => {
	const schema = generateLocalBusinessSchema() as Record<string, unknown> & {
		areaServed: { name: string; addressCountry: string }[]
		address: { addressLocality: string; postalCode: string }
	}

	test('Genève et les communes genevoises sont en Suisse, Évian en France', () => {
		const country = (name: string) => schema.areaServed.find(city => city.name === name)?.addressCountry
		expect(country('Genève')).toBe('CH')
		expect(country('Carouge')).toBe('CH')
		expect(country('Évian-les-Bains')).toBe('FR')
		expect(country('Annecy')).toBe('FR')
	})

	test('zone limitée à 60 km : plus de Lyon ni de Grenoble', () => {
		const names = getCityNamesForSEO().all
		expect(SERVICE_RADIUS_KM).toBe(60)
		expect(names).toContain('Lausanne')
		expect(names).not.toContain('Lyon')
		expect(names).not.toContain('Grenoble')
	})

	test('adresse des mentions légales, pas d’horaires (sur rendez-vous)', () => {
		expect(schema.address.addressLocality).toBe('Sciez')
		expect(schema.address.postalCode).toBe('74140')
		expect(schema.openingHoursSpecification).toBeUndefined()
	})
})

describe('pages fixes et données structurées', () => {
	test('pages de liste : nom du site dans le titre, og:url et image de partage', async () => {
		const { generateBlogListingMetadata, generateMentionsLegalesMetadata } = await import('@/lib/seo')
		const blog = generateBlogListingMetadata()
		expect(String(blog.title)).toEndWith('| Maeva Cinquin')
		expect(blog.openGraph?.url).toBe('https://cinquin-maeva.com/blog')
		expect(blog.alternates?.canonical).toBe('https://cinquin-maeva.com/blog')
		expect(String(generateMentionsLegalesMetadata().title)).toBe('Mentions légales | Maeva Cinquin')
	})

	test('fil d’Ariane : Accueil puis la section puis la page', async () => {
		const { generateBreadcrumbJsonLd } = await import('@/lib/seo')
		const crumbs = generateBreadcrumbJsonLd([
			{ name: 'Blog', path: '/blog' },
			{ name: 'Mon article', path: '/blog/mon-article' },
		])
		expect(crumbs.itemListElement.map(item => [item.position, item.name, item.item])).toEqual([
			[1, 'Accueil', 'https://cinquin-maeva.com'],
			[2, 'Blog', 'https://cinquin-maeva.com/blog'],
			[3, 'Mon article', 'https://cinquin-maeva.com/blog/mon-article'],
		])
	})

	test('prestation : rattachée à l’entreprise de la page d’accueil', async () => {
		const { generateLocalBusinessSchema, generateServiceJsonLd } = await import('@/lib/seo')
		const service = generateServiceJsonLd({ title: 'Nail art', slug: 'nail-art' })
		expect(service.provider['@id']).toBe((generateLocalBusinessSchema() as { '@id': string })['@id'])
		expect(service.url).toBe('https://cinquin-maeva.com/prestations/nail-art')
	})
})
