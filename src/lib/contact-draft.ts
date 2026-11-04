/**
 * Reprise du formulaire de contact quand le site vient d'être mis à jour.
 *
 * Une page ouverte avant un déploiement appelle la Server Action avec un identifiant de l'ancien build :
 * le serveur répond « action introuvable » (404, en-tête x-nextjs-action-not-found) et Next lève une
 * UnrecognizedActionError côté navigateur. On garde alors ce que le visiteur a tapé (sessionStorage),
 * on recharge la page pour obtenir le nouveau build, et on renvoie une seule fois automatiquement.
 *
 * Pas d'envoi en double : le même identifiant d'envoi est réutilisé pour le renvoi, et le serveur s'en
 * sert comme clé d'idempotence chez Resend.
 *
 * Module sans React ni DOM : le stockage est injecté, ce qui le rend testable.
 */
import { unstable_isUnrecognizedActionError } from 'next/navigation'

export const CONTACT_DRAFT_KEY = 'maeva-contact-draft'

/** Champs tapés par le visiteur (ceux du formulaire de /contact, rien d'autre). */
export interface ContactDraftFields {
	name: string
	email: string
	phone: string
	city: string
	postalCode: string
	message: string
}

export interface ContactDraft {
	fields: ContactDraftFields
	/** Identifiant de l'envoi, réutilisé tel quel par le renvoi automatique. */
	submissionId: string
	/** true : un renvoi automatique est attendu au prochain chargement de la page. */
	retryPending: boolean
	/** true : le renvoi automatique a déjà été tenté (jamais deux rechargements de suite). */
	retried: boolean
}

/** Sous-ensemble de Storage utilisé ici (sessionStorage dans le navigateur). */
export type DraftStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export const EMPTY_CONTACT_FIELDS: ContactDraftFields = {
	name: '',
	email: '',
	phone: '',
	city: '',
	postalCode: '',
	message: '',
}

/** Noms des champs, dans l'ordre (ce sont aussi les attributs `name` des champs du formulaire). */
export const CONTACT_FIELD_NAMES = Object.keys(EMPTY_CONTACT_FIELDS) as (keyof ContactDraftFields)[]

/** Lit les champs dans les données du formulaire (une valeur absente devient une chaîne vide). */
export function fieldsFromFormData(data: Pick<FormData, 'get'>): ContactDraftFields {
	return Object.fromEntries(
		CONTACT_FIELD_NAMES.map(name => {
			const value = data.get(name)
			return [name, typeof value === 'string' ? value : '']
		})
	) as unknown as ContactDraftFields
}

const FIELD_NAMES = CONTACT_FIELD_NAMES

export const SITE_UPDATED_MESSAGE = "Le site vient d'être mis à jour : rechargez la page, votre message est conservé."

/**
 * Pourquoi l'appel de la Server Action a échoué, quand ce n'est pas une réponse de l'action elle-même :
 * - 'action-not-found' : l'identifiant d'action vient d'un autre déploiement (cas observé en production) ;
 * - 'network' : la requête n'a pas abouti (coupure, conteneur en cours de remplacement) ;
 * - 'unexpected-response' : le serveur a répondu autre chose qu'une réponse d'action (page d'erreur du proxy…).
 * null : autre erreur, à traiter comme avant.
 */
export type SubmitFailureKind = 'action-not-found' | 'network' | 'unexpected-response'

// Message levé par Next (server-action-reducer) quand la réponse n'est pas un flux RSC.
const UNEXPECTED_RESPONSE_MESSAGE = 'An unexpected response was received from the server.'

export function classifySubmitError(error: unknown): SubmitFailureKind | null {
	if (unstable_isUnrecognizedActionError(error)) return 'action-not-found'
	// fetch() rejette avec un TypeError quand la requête n'aboutit pas (« Failed to fetch », « Load failed »…).
	if (error instanceof TypeError) return 'network'
	if (error instanceof Error && error.message === UNEXPECTED_RESPONSE_MESSAGE) return 'unexpected-response'
	return null
}

function isFields(value: unknown): value is ContactDraftFields {
	if (!value || typeof value !== 'object') return false
	return FIELD_NAMES.every(name => typeof (value as Record<string, unknown>)[name] === 'string')
}

/** Lit le brouillon ; null s'il n'y en a pas, s'il est illisible ou si le stockage est indisponible. */
export function loadContactDraft(storage: DraftStorage | null | undefined): ContactDraft | null {
	try {
		const raw = storage?.getItem(CONTACT_DRAFT_KEY)
		if (!raw) return null
		const parsed = JSON.parse(raw) as Partial<ContactDraft>
		if (!isFields(parsed.fields) || typeof parsed.submissionId !== 'string' || !parsed.submissionId) return null
		const fields = Object.fromEntries(
			FIELD_NAMES.map(name => [name, parsed.fields?.[name] ?? ''])
		) as unknown as ContactDraftFields
		return {
			fields,
			submissionId: parsed.submissionId,
			retryPending: parsed.retryPending === true,
			retried: parsed.retried === true,
		}
	} catch {
		return null
	}
}

/** Enregistre le brouillon ; false si le stockage est indisponible (navigation privée stricte, quota…). */
export function saveContactDraft(storage: DraftStorage | null | undefined, draft: ContactDraft): boolean {
	if (!storage) return false
	try {
		const fields = Object.fromEntries(FIELD_NAMES.map(name => [name, draft.fields[name] ?? '']))
		storage.setItem(CONTACT_DRAFT_KEY, JSON.stringify({ ...draft, fields }))
		return true
	} catch {
		return false
	}
}

export function clearContactDraft(storage: DraftStorage | null | undefined): void {
	try {
		storage?.removeItem(CONTACT_DRAFT_KEY)
	} catch {
		// Stockage indisponible : rien à effacer.
	}
}

/** Empreinte des champs : un même contenu garde le même identifiant d'envoi. */
export function fieldsFingerprint(fields: ContactDraftFields): string {
	return JSON.stringify(FIELD_NAMES.map(name => fields[name]))
}

export function createSubmissionId(): string {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
	// Repli (contexte non sécurisé) : UUID v4 à partir de getRandomValues.
	const bytes = new Uint8Array(16)
	crypto.getRandomValues(bytes)
	bytes[6] = (bytes[6] & 0x0f) | 0x40
	bytes[8] = (bytes[8] & 0x3f) | 0x80
	const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/**
 * Identifiant à utiliser pour cet envoi : le précédent si les champs n'ont pas changé (un renvoi du même
 * message reste reconnu comme tel), un nouveau sinon.
 */
export function submissionIdFor(
	previous: { submissionId: string; fingerprint: string } | null,
	fields: ContactDraftFields,
	create: () => string = createSubmissionId
): { submissionId: string; fingerprint: string } {
	const fingerprint = fieldsFingerprint(fields)
	if (previous && previous.fingerprint === fingerprint) return previous
	return { submissionId: create(), fingerprint }
}

export type SubmitFailurePlan =
	/** Garder le brouillon et recharger la page : le renvoi partira du nouveau build. */
	| { action: 'reload'; draft: ContactDraft }
	/** Ne pas recharger (déjà tenté, ou stockage indisponible) : message clair, brouillon conservé si possible. */
	| { action: 'show-message'; message: string; draft: ContactDraft | null }
	/** Erreur sans rapport avec une mise à jour : traitement habituel. */
	| { action: 'generic' }

/**
 * Que faire après un échec d'appel de l'action.
 * Un seul rechargement automatique par envoi : si le renvoi échoue encore, on affiche le message.
 */
export function planSubmitFailure(params: {
	error: unknown
	fields: ContactDraftFields
	submissionId: string
	isAutoRetry: boolean
	storage: DraftStorage | null | undefined
}): SubmitFailurePlan {
	const kind = classifySubmitError(params.error)
	if (!kind) return { action: 'generic' }

	if (params.isAutoRetry) {
		const draft: ContactDraft = {
			fields: params.fields,
			submissionId: params.submissionId,
			retryPending: false,
			retried: true,
		}
		return {
			action: 'show-message',
			message: SITE_UPDATED_MESSAGE,
			draft: saveContactDraft(params.storage, draft) ? draft : null,
		}
	}

	const draft: ContactDraft = {
		fields: params.fields,
		submissionId: params.submissionId,
		retryPending: true,
		retried: false,
	}
	if (saveContactDraft(params.storage, draft)) return { action: 'reload', draft }
	// Sans stockage, recharger ferait perdre le message : on demande au visiteur de renvoyer lui-même.
	return {
		action: 'show-message',
		message: "Le site vient d'être mis à jour : merci de renvoyer votre message.",
		draft: null,
	}
}

/**
 * Au chargement de la page : brouillon à restaurer et renvoi automatique éventuel.
 * Le drapeau de renvoi est consommé tout de suite (avant l'envoi) : un nouvel échec ne relance pas de rechargement.
 */
export function resumeContactDraft(storage: DraftStorage | null | undefined): {
	draft: ContactDraft
	autoRetry: boolean
} | null {
	const draft = loadContactDraft(storage)
	if (!draft) return null
	const autoRetry = draft.retryPending && !draft.retried
	if (autoRetry) saveContactDraft(storage, { ...draft, retryPending: false, retried: true })
	return { draft, autoRetry }
}
