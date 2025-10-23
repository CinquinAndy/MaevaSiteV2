import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * API Route pour la revalidation on-demand des pages
 *
 * Cette route permet à Payload CMS de déclencher la revalidation des pages
 * via un webhook lorsqu'un contenu est publié ou modifié.
 *
 * Usage:
 * POST /api/revalidate
 * Body: {
 *   secret: string,        // Secret de sécurité (doit correspondre à REVALIDATE_SECRET)
 *   collection?: string,   // Collection Payload (blog, galery, services)
 *   slug?: string,         // Slug du document
 *   path?: string,         // Path direct à revalider
 *   paths?: string[],      // Plusieurs paths à revalider
 * }
 *
 * Exemples:
 * 1. Revalider un article de blog spécifique:
 *    { secret: "...", collection: "blog", slug: "mon-article" }
 *
 * 2. Revalider un path spécifique:
 *    { secret: "...", path: "/blog" }
 *
 * 3. Revalider plusieurs paths:
 *    { secret: "...", paths: ["/", "/blog", "/galerie"] }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { secret, collection, slug, path, paths } = body

		// Vérifier le secret de sécurité
		const revalidateSecret = process.env.REVALIDATE_SECRET
		if (!revalidateSecret) {
			console.error('[Revalidate] REVALIDATE_SECRET not configured in environment variables')
			return NextResponse.json(
				{ error: 'Revalidation not configured' },
				{ status: 500 }
			)
		}

		if (secret !== revalidateSecret) {
			console.error('[Revalidate] Invalid secret provided')
			return NextResponse.json(
				{ error: 'Invalid secret' },
				{ status: 401 }
			)
		}

		const revalidatedPaths: string[] = []

		// Cas 1: Revalidation par collection + slug
		if (collection && slug) {
			const pathsToRevalidate = getPathsForCollection(collection, slug)
			for (const p of pathsToRevalidate) {
				revalidatePath(p)
				revalidatedPaths.push(p)
			}
		}

		// Cas 2: Revalidation d'un path spécifique
		if (path) {
			revalidatePath(path)
			revalidatedPaths.push(path)
		}

		// Cas 3: Revalidation de plusieurs paths
		if (paths && Array.isArray(paths)) {
			for (const p of paths) {
				revalidatePath(p)
				revalidatedPaths.push(p)
			}
		}

		// Si aucun path n'a été revalidé, retourner une erreur
		if (revalidatedPaths.length === 0) {
			return NextResponse.json(
				{ error: 'No paths to revalidate. Provide collection+slug, path, or paths.' },
				{ status: 400 }
			)
		}

		console.log('[Revalidate] Successfully revalidated paths:', revalidatedPaths)

		return NextResponse.json({
			revalidated: true,
			paths: revalidatedPaths,
			timestamp: new Date().toISOString(),
		})
	} catch (error) {
		console.error('[Revalidate] Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		)
	}
}

/**
 * Détermine quels paths doivent être revalidés en fonction de la collection et du slug
 */
function getPathsForCollection(collection: string, slug: string): string[] {
	const paths: string[] = []

	switch (collection) {
		case 'blog':
			// Revalider la page du post, la liste des posts et la homepage
			paths.push(`/blog/${slug}`)
			paths.push('/blog')
			paths.push('/') // Homepage affiche les derniers posts
			break

		case 'galery':
			// Revalider la page de la galerie, la liste des galeries et la homepage
			paths.push(`/galerie/${slug}`)
			paths.push('/galerie')
			paths.push('/') // Homepage affiche les dernières galeries
			break

		case 'services':
			// Revalider la page du service, la liste des services et la homepage
			paths.push(`/prestations/${slug}`)
			paths.push('/prestations')
			paths.push('/') // Homepage affiche les services
			break

		default:
			console.warn(`[Revalidate] Unknown collection: ${collection}`)
			break
	}

	return paths
}
