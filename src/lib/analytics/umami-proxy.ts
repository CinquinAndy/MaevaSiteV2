/**
 * Relais Umami servi depuis le domaine du site (doc : https://docs.umami.is/docs/bypass-ad-blockers).
 *
 * Les bloqueurs de pub coupent les requêtes vers un domaine d'analytics connu (umami.wadefade.fr) et les noms
 * habituels (« script.js », « /api/send »). Le site sert donc le script de suivi sous `/v/s.js`, et ses envois
 * partent vers `/v/…`, que la route `src/app/v/[...path]/route.ts` relaie au serveur Umami en gardant
 * l'adresse IP et le navigateur du visiteur (sinon toutes les visites viendraient du serveur du site).
 */

/** Serveur Umami (modifiable par `UMAMI_HOST_URL` si le serveur change d'adresse). */
export const UMAMI_UPSTREAM = (process.env.UMAMI_HOST_URL || 'https://umami.wadefade.fr').replace(/\/$/, '')

/** Site « cinquin-maeva.com » dans Umami. */
export const UMAMI_WEBSITE_ID = 'e8f25e84-b2f1-43c6-b574-5d9d3a65c75b'

/** Préfixe des chemins du relais sur le site. */
export const UMAMI_PROXY_PREFIX = '/v'

/** Chemins Umami d'origine → chemins neutres sur le site. Remplacés dans le code des scripts relayés. */
const RENAMED_ENDPOINTS: ReadonlyArray<readonly [upstream: string, local: string]> = [
	['/api/send', '/e'],
	['/api/record', '/r'],
	['/api/websites/', '/w/'],
]

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type UpstreamTarget = { kind: 'script'; path: string } | { kind: 'api'; path: string }

/**
 * Chemin Umami correspondant à un chemin du relais (sans le préfixe `/v`), ou null s'il n'est pas autorisé.
 * Seule une liste fermée de chemins est relayée : le relais ne peut pas servir à joindre autre chose.
 */
export function resolveUpstream(method: string, segments: readonly string[]): UpstreamTarget | null {
	const path = segments.join('/')
	if (method === 'GET') {
		if (path === 's.js') return { kind: 'script', path: '/script.js' }
		if (path === 'r.js') return { kind: 'script', path: '/recorder.js' }
		// Réglages des replays lus par recorder.js : /v/w/<id du site>/recorder
		if (segments.length === 3 && segments[0] === 'w' && UUID.test(segments[1]!) && segments[2] === 'recorder') {
			return { kind: 'api', path: `/api/websites/${segments[1]}/recorder` }
		}
		return null
	}
	if (method === 'POST') {
		// Les anciens chemins restent acceptés si une mise à jour d'Umami empêchait le renommage.
		if (path === 'e' || path === 'api/send') return { kind: 'api', path: '/api/send' }
		if (path === 'r' || path === 'api/record') return { kind: 'api', path: '/api/record' }
	}
	return null
}

/** Remplace dans le code du script Umami les chemins d'envoi par les chemins neutres du relais. */
export function rewriteTrackerScript(source: string): string {
	let code = source
	for (const [upstream, local] of RENAMED_ENDPOINTS) code = code.split(upstream).join(local)
	return code
}

/**
 * Adresse IP du visiteur vue par le site. Le site est servi par Traefik (Coolify), qui pose X-Real-Ip ;
 * CF-Connecting-IP passe devant si le domaine est un jour proxifié par Cloudflare.
 */
export function clientIp(headers: Headers): string | null {
	const direct = headers.get('cf-connecting-ip') || headers.get('x-real-ip')
	if (direct?.trim()) return direct.trim()
	const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
	return forwarded || null
}

/** En-têtes du visiteur transmis à Umami (navigateur, langue, IP pour la géolocalisation, cache de session). */
const PASSED_HEADERS = [
	'user-agent',
	'accept-language',
	'content-type',
	'x-umami-cache',
	'cf-ipcountry',
	'cf-region-code',
	'cf-ipcity',
]

export function upstreamHeaders(incoming: Headers): Headers {
	const headers = new Headers()
	for (const name of PASSED_HEADERS) {
		const value = incoming.get(name)
		if (value) headers.set(name, value)
	}
	const ip = clientIp(incoming)
	if (ip) {
		// Umami lit l'IP dans le premier de ces en-têtes présent : true-client-ip, cf-connecting-ip, …, x-real-ip,
		// x-forwarded-for (src/lib/ip.ts d'Umami). Le nginx devant Umami remplace x-real-ip par l'adresse de notre
		// serveur : sans true-client-ip, toutes les visites étaient localisées à Vienne (serveur du site).
		headers.set('true-client-ip', ip)
		headers.set('x-forwarded-for', ip)
		headers.set('x-real-ip', ip)
	}
	return headers
}
