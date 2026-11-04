import { describe, expect, test } from 'bun:test'
// Même classe que celle levée par Next quand le serveur répond « action introuvable » (en-tête x-nextjs-action-not-found).
import { UnrecognizedActionError } from 'next/dist/client/components/unrecognized-action-error'
import {
	CONTACT_DRAFT_KEY,
	type ContactDraftFields,
	classifySubmitError,
	clearContactDraft,
	type DraftStorage,
	fieldsFromFormData,
	loadContactDraft,
	planSubmitFailure,
	resumeContactDraft,
	SITE_UPDATED_MESSAGE,
	saveContactDraft,
	submissionIdFor,
} from '@/lib/contact-draft'

function memoire(): DraftStorage & { donnees: Map<string, string> } {
	const donnees = new Map<string, string>()
	return {
		donnees,
		getItem: cle => donnees.get(cle) ?? null,
		setItem: (cle, valeur) => {
			donnees.set(cle, valeur)
		},
		removeItem: cle => {
			donnees.delete(cle)
		},
	}
}

const stockagePlein: DraftStorage = {
	getItem: () => null,
	setItem: () => {
		throw new Error('QuotaExceededError')
	},
	removeItem: () => {},
}

const champs: ContactDraftFields = {
	name: 'Jeanne Test',
	email: 'jeanne@example.com',
	phone: '0600000000',
	city: 'Annecy',
	postalCode: '74000',
	message: 'Bonjour, je voudrais un devis pour un maquillage de mariée.',
}

const ID = '3f2b8c1e-9a4d-4e6f-8b7a-1c2d3e4f5a6b'

// Ce que Next lève quand la page vient d'un ancien déploiement (message repris de server-action-reducer).
const actionIntrouvable = () =>
	new UnrecognizedActionError(
		'Server Action "40038f6d3768ae1e5fab15d8d011a248a6d3f417bc" was not found on the server. \nRead more: https://nextjs.org/docs/messages/failed-to-find-server-action'
	)

describe('classifySubmitError', () => {
	test('action introuvable (ancien déploiement)', () => {
		expect(classifySubmitError(actionIntrouvable())).toBe('action-not-found')
	})

	test('requête qui n’aboutit pas (fetch rejeté)', () => {
		expect(classifySubmitError(new TypeError('Failed to fetch'))).toBe('network')
	})

	test('réponse non reconnue (pas un flux RSC)', () => {
		expect(classifySubmitError(new Error('An unexpected response was received from the server.'))).toBe(
			'unexpected-response'
		)
	})

	test('autres erreurs : traitement habituel', () => {
		expect(classifySubmitError(new Error('Body exceeded 1mb limit'))).toBeNull()
		expect(classifySubmitError('texte')).toBeNull()
		expect(classifySubmitError(undefined)).toBeNull()
	})
})

describe('brouillon (sessionStorage)', () => {
	test('aller-retour, sans autre champ que ceux du formulaire', () => {
		const stockage = memoire()
		const avecIntrus = { ...champs, website: 'http://spam', submissionId: 'jeton' } as ContactDraftFields
		expect(
			saveContactDraft(stockage, { fields: avecIntrus, submissionId: ID, retryPending: true, retried: false })
		).toBe(true)
		const brut = stockage.donnees.get(CONTACT_DRAFT_KEY) ?? ''
		expect(brut).not.toContain('spam')
		expect(brut).not.toContain('jeton')
		expect(loadContactDraft(stockage)).toEqual({ fields: champs, submissionId: ID, retryPending: true, retried: false })
	})

	test('illisible, incomplet ou stockage indisponible : null', () => {
		const stockage = memoire()
		stockage.donnees.set(CONTACT_DRAFT_KEY, '{pas du json')
		expect(loadContactDraft(stockage)).toBeNull()
		stockage.donnees.set(CONTACT_DRAFT_KEY, JSON.stringify({ fields: { name: 'x' }, submissionId: ID }))
		expect(loadContactDraft(stockage)).toBeNull()
		expect(loadContactDraft(null)).toBeNull()
		expect(
			loadContactDraft({
				...stockagePlein,
				getItem: () => {
					throw new Error('SecurityError')
				},
			})
		).toBeNull()
	})

	test('effacé après succès', () => {
		const stockage = memoire()
		saveContactDraft(stockage, { fields: champs, submissionId: ID, retryPending: false, retried: true })
		clearContactDraft(stockage)
		expect(loadContactDraft(stockage)).toBeNull()
		expect(() => clearContactDraft(null)).not.toThrow()
	})
})

describe('fieldsFromFormData', () => {
	test('lit les six champs du formulaire, et seulement eux', () => {
		const donnees = new FormData()
		for (const [nom, valeur] of Object.entries(champs)) donnees.set(nom, valeur)
		donnees.set('intrus', 'à ignorer')
		expect(fieldsFromFormData(donnees)).toEqual(champs)
	})

	test('champ absent : chaîne vide', () => {
		const donnees = new FormData()
		donnees.set('name', 'Jeanne Test')
		expect(fieldsFromFormData(donnees)).toEqual({
			name: 'Jeanne Test',
			email: '',
			phone: '',
			city: '',
			postalCode: '',
			message: '',
		})
	})
})

describe('submissionIdFor', () => {
	test('mêmes champs : même identifiant ; champs modifiés : nouvel identifiant', () => {
		let n = 0
		const creer = () => `id-${++n}`
		const premier = submissionIdFor(null, champs, creer)
		expect(premier.submissionId).toBe('id-1')
		expect(submissionIdFor(premier, { ...champs }, creer).submissionId).toBe('id-1')
		expect(submissionIdFor(premier, { ...champs, message: 'Autre message' }, creer).submissionId).toBe('id-2')
	})

	test('identifiant par défaut au format UUID (accepté par le serveur)', () => {
		expect(submissionIdFor(null, champs).submissionId).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
		)
	})
})

describe('scénario : page ouverte avant un déploiement, puis envoi', () => {
	test('1er échec « action introuvable » : brouillon gardé puis rechargement ; au chargement, un seul renvoi', () => {
		const stockage = memoire()
		const plan = planSubmitFailure({
			error: actionIntrouvable(),
			fields: champs,
			submissionId: ID,
			isAutoRetry: false,
			storage: stockage,
		})
		expect(plan.action).toBe('reload')

		// Page rechargée (nouveau build) : champs restaurés, renvoi automatique avec le MÊME identifiant.
		const reprise = resumeContactDraft(stockage)
		expect(reprise).toEqual({
			draft: { fields: champs, submissionId: ID, retryPending: true, retried: false },
			autoRetry: true,
		})

		// Un second chargement (rechargement manuel, StrictMode…) ne relance pas d'envoi.
		expect(resumeContactDraft(stockage)?.autoRetry).toBe(false)
		expect(resumeContactDraft(stockage)?.draft.fields).toEqual(champs)
	})

	test('le renvoi automatique échoue encore : pas de second rechargement, message clair, brouillon conservé', () => {
		const stockage = memoire()
		const plan = planSubmitFailure({
			error: new TypeError('Failed to fetch'),
			fields: champs,
			submissionId: ID,
			isAutoRetry: true,
			storage: stockage,
		})
		expect(plan).toEqual({
			action: 'show-message',
			message: SITE_UPDATED_MESSAGE,
			draft: { fields: champs, submissionId: ID, retryPending: false, retried: true },
		})
		expect(resumeContactDraft(stockage)?.autoRetry).toBe(false)
	})

	test('envoi manuel après un renvoi déjà tenté : un nouveau rechargement est permis', () => {
		const stockage = memoire()
		saveContactDraft(stockage, { fields: champs, submissionId: ID, retryPending: false, retried: true })
		const plan = planSubmitFailure({
			error: actionIntrouvable(),
			fields: champs,
			submissionId: ID,
			isAutoRetry: false,
			storage: stockage,
		})
		expect(plan.action).toBe('reload')
		expect(resumeContactDraft(stockage)?.autoRetry).toBe(true)
	})

	test('stockage indisponible : pas de rechargement (le message serait perdu)', () => {
		const plan = planSubmitFailure({
			error: actionIntrouvable(),
			fields: champs,
			submissionId: ID,
			isAutoRetry: false,
			storage: stockagePlein,
		})
		expect(plan.action).toBe('show-message')
	})

	test('erreur sans rapport avec une mise à jour : message générique, rien n’est stocké', () => {
		const stockage = memoire()
		const plan = planSubmitFailure({
			error: new Error('autre'),
			fields: champs,
			submissionId: ID,
			isAutoRetry: false,
			storage: stockage,
		})
		expect(plan).toEqual({ action: 'generic' })
		expect(stockage.donnees.size).toBe(0)
	})
})
