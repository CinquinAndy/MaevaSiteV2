import config from '@payload-config'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload } from 'payload'

/**
 * Retrouve une page publiée à partir d'un slug mal écrit ou d'une ancienne adresse.
 *
 * - Ancien site WordPress : les articles et pages étaient à la racine (`/mi-ange-mi-demon/`). Ils sont
 *   maintenant sous `/blog`, `/galerie` ou `/prestations`.
 * - Slugs avec majuscules (`/blog/Conseils-beaute-…`) : la version en minuscules doit mener au même article.
 *
 * La comparaison ignore la casse et les tirets en trop ; la recherche se fait aussi sur le slug précédé d'un
 * préfixe connu (« collection-mi-ange-mi-demon » pour « mi-ange-mi-demon »).
 */

const SECTIONS = [
	{ collection: 'blog', path: '/blog' },
	{ collection: 'galery', path: '/galerie' },
	{ collection: 'services', path: '/prestations' },
] as const

type Section = (typeof SECTIONS)[number]

/** Slug ramené à une forme comparable : minuscules, sans accents, tirets simples. */
export function normalizeSlug(slug: string): string {
	return decodeURIComponent(slug)
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

/** Préfixes ajoutés aux slugs lors de la migration depuis WordPress. */
const MIGRATION_PREFIXES = ['collection-']

/** true si `candidate` (slug du CMS) correspond à l'adresse demandée. */
export function slugMatches(candidate: string, requested: string): boolean {
	const a = normalizeSlug(candidate)
	const b = normalizeSlug(requested)
	if (!a || !b) return false
	return a === b || MIGRATION_PREFIXES.some(prefix => a === `${prefix}${b}`)
}

/**
 * Adresse actuelle de la page correspondant à `slug`, ou null. `only` limite la recherche à une section
 * (pour corriger la casse d'un slug dans sa propre section).
 */
export async function findPagePathBySlug(slug: string, only?: Section['collection']): Promise<string | null> {
	const requested = normalizeSlug(slug)
	if (!requested || requested.length > 200) return null

	const payload = await getPayload({ config })
	const sections = only ? SECTIONS.filter(section => section.collection === only) : SECTIONS
	// Le slug normalisé sert de filtre large (ILIKE en base), la correspondance exacte est vérifiée ensuite.
	const needle = requested.split('-').sort((x, y) => y.length - x.length)[0]!

	for (const section of sections) {
		const { docs } = await payload.find({
			collection: section.collection,
			where: { and: [{ slug: { like: needle } }, { status: { equals: 'published' } }] },
			limit: 50,
			depth: 0,
			select: { slug: true },
		})
		const match = docs.find(doc => typeof doc.slug === 'string' && slugMatches(doc.slug, slug))
		if (match) return `${section.path}/${match.slug}`
	}
	return null
}

/**
 * À appeler quand une page n'est pas trouvée : redirige (308, permanente) vers la bonne adresse si elle existe,
 * sinon affiche la page 404. `currentPath` évite une boucle si la page trouvée est celle qui a échoué.
 */
export async function redirectToPageOrNotFound(
	slug: string,
	currentPath: string,
	only?: Section['collection']
): Promise<never> {
	const path = await findPagePathBySlug(slug, only)
	if (path && path !== currentPath) permanentRedirect(path)
	notFound()
}
