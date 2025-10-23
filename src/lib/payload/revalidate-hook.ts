import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Hook Payload pour déclencher la revalidation ISR après modification/suppression de contenu
 *
 * Ce hook appelle l'API route /api/revalidate pour invalider le cache Next.js
 * et forcer la régénération des pages statiques.
 */

/**
 * Fonction utilitaire pour appeler l'API de revalidation
 */
async function triggerRevalidation(collection: string, slug: string) {
	const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate`
	const revalidateSecret = process.env.REVALIDATE_SECRET

	if (!revalidateUrl || !revalidateSecret) {
		console.warn('[Revalidate Hook] Missing NEXT_PUBLIC_SERVER_URL or REVALIDATE_SECRET')
		return
	}

	try {
		const response = await fetch(revalidateUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				secret: revalidateSecret,
				collection,
				slug,
			}),
		})

		if (!response.ok) {
			const error = await response.json()
			console.error('[Revalidate Hook] Failed to revalidate:', error)
			return
		}

		const data = await response.json()
		console.log('[Revalidate Hook] Successfully revalidated:', data)
	} catch (error) {
		console.error('[Revalidate Hook] Error calling revalidate API:', error)
	}
}

/**
 * Hook afterChange - Déclenché après création ou modification d'un document
 */
export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, collection }) => {
	// Vérifier que le document a un slug et est publié
	if (!doc.slug || doc.status !== 'published') {
		return doc
	}

	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation(collection.slug, doc.slug).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}

/**
 * Hook afterDelete - Déclenché après suppression d'un document
 */
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
	// Vérifier que le document a un slug
	if (!doc.slug) {
		return doc
	}

	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation(collection.slug, doc.slug).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}
