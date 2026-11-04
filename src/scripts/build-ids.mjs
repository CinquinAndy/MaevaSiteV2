/**
 * Identifiants du build de production, calculés dans le Dockerfile juste avant `bun run build`.
 *
 * Pourquoi (version skew) : une page ouverte avant un déploiement appelle les Server Actions avec les
 * identifiants de son build. Next calcule ces identifiants avec la clé NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
 * comme sel ; sans clé fournie, il en tire une au hasard à chaque build, donc chaque déploiement (Renovate
 * compris) change l'identifiant de submitContactForm et l'ancienne page reçoit « Failed to find Server Action ».
 *
 * - `server-actions-key` : clé stable dérivée de PAYLOAD_SECRET (déjà secret, déjà passé au build).
 *   Même clé à chaque build = même identifiant tant que l'action ne change pas de fichier ni de nom.
 *   Rien n'est affiché si PAYLOAD_SECRET manque (Next reprend alors une clé aléatoire, comme avant).
 *   Une variable NEXT_SERVER_ACTIONS_ENCRYPTION_KEY posée dans Coolify reste prioritaire (voir le Dockerfile).
 * - `deployment-id` : identifiant du déploiement pour `deploymentId` (next.config.mjs) : le commit si
 *   Coolify le fournit (SOURCE_COMMIT), sinon une valeur aléatoire. Écrit dans `.deployment-id` par le
 *   Dockerfile, relu par next.config.mjs au build ET au démarrage (`next start` réévalue la config) :
 *   les deux voient forcément la même valeur.
 *
 * Usage : node src/scripts/build-ids.mjs server-actions-key|deployment-id
 */
import { createHash, randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const KEY_LABEL = 'cinquin-maeva/next-server-actions-key/v1'

/** Clé AES-256 en base64 (32 octets), dérivée du secret Payload. Chaîne vide si le secret manque. */
export function deriveServerActionsKey(payloadSecret) {
	if (!payloadSecret) return ''
	return createHash('sha256').update(`${KEY_LABEL}:${payloadSecret}`).digest('base64')
}

const DEPLOYMENT_ID_REGEX = /^[A-Za-z0-9_-]{1,64}$/

export function isValidDeploymentId(value) {
	return typeof value === 'string' && DEPLOYMENT_ID_REGEX.test(value)
}

/** Le commit (12 premiers caractères) si fourni et valide, sinon 16 caractères hexadécimaux aléatoires. */
export function createDeploymentId(sourceCommit) {
	const commit = typeof sourceCommit === 'string' ? sourceCommit.trim().slice(0, 12) : ''
	return isValidDeploymentId(commit) ? commit : randomBytes(8).toString('hex')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const command = process.argv[2]
	if (command === 'server-actions-key') {
		process.stdout.write(deriveServerActionsKey(process.env.PAYLOAD_SECRET))
	} else if (command === 'deployment-id') {
		process.stdout.write(createDeploymentId(process.env.SOURCE_COMMIT))
	} else {
		console.error('Usage : node src/scripts/build-ids.mjs server-actions-key|deployment-id')
		process.exit(1)
	}
}
