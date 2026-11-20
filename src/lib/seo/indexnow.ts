/**
 * IndexNow : prévient Bing (et Yandex, Seznam, Naver) dès qu'une page est publiée ou modifiée, au lieu d'attendre
 * leur prochain passage. ChatGPT et Copilot s'appuient en partie sur l'index de Bing.
 * Doc : https://www.indexnow.org/documentation
 *
 * La clé n'est pas un secret : elle est publiée dans /<clé>.txt pour prouver que le site en est propriétaire.
 */

export const INDEXNOW_KEY = '19d8d3c691f161d2613c84942bd69065'

const SITE = 'https://cinquin-maeva.com'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

/** Adresse publique d'un document du CMS, ou null pour une collection sans page. */
export function pagePathFor(collection: string, slug: string): string | null {
	const base = { blog: '/blog', galery: '/galerie', services: '/prestations' }[collection]
	return base ? `${base}/${slug}` : null
}

/** Envoie les adresses à IndexNow. Seulement en production : les essais locaux ne doivent rien envoyer. */
export async function submitToIndexNow(paths: string[]): Promise<void> {
	if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_SERVER_URL?.includes('cinquin-maeva.com'))
		return
	if (paths.length === 0) return
	try {
		const res = await fetch(ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				host: 'cinquin-maeva.com',
				key: INDEXNOW_KEY,
				keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
				urlList: paths.map(path => `${SITE}${path}`),
			}),
			signal: AbortSignal.timeout(10_000),
		})
		// 200 et 202 : reçu. Le reste est journalisé sans bloquer la publication.
		if (res.status !== 200 && res.status !== 202) console.warn('[IndexNow] Réponse', res.status)
	} catch (error) {
		console.warn('[IndexNow] Envoi impossible :', error instanceof Error ? error.message : error)
	}
}
