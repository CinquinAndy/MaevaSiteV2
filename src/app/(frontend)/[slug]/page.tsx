import { redirectToPageOrNotFound } from '@/lib/payload/find-page-by-slug'

/**
 * Adresses à la racine de l'ancien site WordPress (`/mi-ange-mi-demon/`, `/maquillage-mariage/`…) :
 * redirection permanente vers l'article, la galerie ou la prestation correspondante, sinon page 404.
 * Les pages du site (blog, galerie, contact…) sont des routes fixes et passent avant celle-ci.
 */
export default async function LegacyPathPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	return redirectToPageOrNotFound(slug, `/${slug}`)
}
