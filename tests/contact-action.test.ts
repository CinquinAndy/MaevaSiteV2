import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from 'bun:test'

// Resend simulé : chaque test choisit la réponse de l'API.
type Reponse = { data: { id: string } | null; error: { name: string; statusCode: number; message: string } | null }
let reponse: Reponse = { data: { id: 'test-id' }, error: null }
const envois: Record<string, unknown>[] = []
const clesUtilisees: (string | undefined)[] = []
const optionsEnvois: ({ idempotencyKey?: string } | undefined)[] = []

mock.module('resend', () => ({
	Resend: class {
		constructor(cle?: string) {
			clesUtilisees.push(cle)
		}
		emails = {
			send: async (payload: Record<string, unknown>, options?: { idempotencyKey?: string }) => {
				envois.push(payload)
				optionsEnvois.push(options)
				return reponse
			},
		}
	},
}))

const { submitContactForm } = await import('@/actions/contact')

const formulaire = {
	name: 'Jeanne Test',
	email: 'jeanne@example.com',
	phone: '0600000000',
	city: 'Annecy',
	postalCode: '74000',
	message: 'Bonjour, je voudrais un devis.',
}

const MESSAGE_ERREUR = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."

describe('submitContactForm', () => {
	const cleAvant = process.env.RESEND_TOKEN
	let consoleError: ReturnType<typeof spyOn>
	let consoleInfo: ReturnType<typeof spyOn>

	beforeEach(() => {
		process.env.RESEND_TOKEN = 're_test_factice'
		reponse = { data: { id: 'test-id' }, error: null }
		envois.length = 0
		clesUtilisees.length = 0
		optionsEnvois.length = 0
		consoleError = spyOn(console, 'error').mockImplementation(() => {})
		consoleInfo = spyOn(console, 'info').mockImplementation(() => {})
	})

	afterEach(() => {
		process.env.RESEND_TOKEN = cleAvant
		consoleError.mockRestore()
		consoleInfo.mockRestore()
	})

	test('envoi réussi : même destinataire qu’avant, expéditeur vérifié, réponse au visiteur', async () => {
		const resultat = await submitContactForm(formulaire)
		expect(resultat.success).toBe(true)
		expect(envois).toHaveLength(1)
		expect(envois[0].to).toEqual(['maevacinquin1@gmail.com'])
		expect(envois[0].from).toBe('Cinquin Maeva - Website <contact@andy-cinquin.com>')
		expect(envois[0].replyTo).toBe('jeanne@example.com')
		expect(envois[0].subject).toBe('Nouvelle demande de contact de Jeanne Test')
		expect(clesUtilisees).toEqual(['re_test_factice'])
	})

	test.each([
		[401, 'validation_error', 'API key is invalid'],
		[403, 'validation_error', 'The email.andy-cinquin.fr domain is not verified'],
	])('Resend répond %i : message clair et RESEND_ERROR', async (statusCode, name, message) => {
		reponse = { data: null, error: { name, statusCode, message } }
		const resultat = await submitContactForm(formulaire)
		expect(resultat).toEqual({ success: false, message: MESSAGE_ERREUR, error: 'RESEND_ERROR' })
		// Le journal garde le code de Resend, sans les données du visiteur.
		const journal = JSON.stringify(consoleError.mock.calls)
		expect(journal).toContain(String(statusCode))
		expect(journal).not.toContain('jeanne@example.com')
		expect(journal).not.toContain('0600000000')
	})

	test('clé absente : pas d’envoi, CONFIG_ERROR journalisé', async () => {
		delete process.env.RESEND_TOKEN
		const resultat = await submitContactForm(formulaire)
		expect(resultat).toEqual({ success: false, message: MESSAGE_ERREUR, error: 'CONFIG_ERROR' })
		expect(envois).toHaveLength(0)
		expect(consoleError).toHaveBeenCalled()
	})

	test('formulaire invalide : rien n’est envoyé', async () => {
		const resultat = await submitContactForm({ ...formulaire, email: 'pas-un-email' })
		expect(resultat.error).toBe('INVALID_EMAIL')
		expect(envois).toHaveLength(0)
	})

	test('exception du client : UNKNOWN_ERROR', async () => {
		reponse = undefined as unknown as Reponse
		const resultat = await submitContactForm(formulaire)
		expect(resultat.error).toBe('UNKNOWN_ERROR')
	})

	test('identifiant d’envoi valide : clé d’idempotence Resend (pas de double envoi au renvoi)', async () => {
		const submissionId = '3f2b8c1e-9a4d-4e6f-8b7a-1c2d3e4f5a6b'
		const premier = await submitContactForm({ ...formulaire, submissionId })
		const renvoi = await submitContactForm({ ...formulaire, submissionId })
		expect(premier.success).toBe(true)
		expect(renvoi.success).toBe(true)
		expect(optionsEnvois).toEqual([
			{ idempotencyKey: `contact-form/${submissionId}` },
			{ idempotencyKey: `contact-form/${submissionId}` },
		])
	})

	test('identifiant d’envoi absent ou mal formé : envoi sans clé d’idempotence', async () => {
		await submitContactForm(formulaire)
		await submitContactForm({ ...formulaire, submissionId: 'pas-un-uuid' })
		await submitContactForm({ ...formulaire, submissionId: { $ne: 1 } as unknown as string })
		expect(envois).toHaveLength(3)
		expect(optionsEnvois).toEqual([undefined, undefined, undefined])
	})
})
