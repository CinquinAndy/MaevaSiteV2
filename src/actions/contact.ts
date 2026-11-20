'use server'

import { Resend } from 'resend'
import { ContactFormEmail } from '@/emails/contact-form-email'
import { normalizeOption, optionLabel, PRESTATION_OPTIONS, SOURCE_OPTIONS } from '@/lib/contact-options'
import { type ContactFormData, normalizeSubmissionId, validateContactForm } from '@/lib/contact-validation'
import { containsLink, isHoneypotFilled, looksLikeBotText } from '@/lib/security/spam'
import { verifyTurnstile } from '@/lib/security/turnstile'

// Expéditeur sur un domaine vérifié dans le compte Resend (andy-cinquin.com).
// L'ancien expéditeur contact@email.andy-cinquin.fr n'est plus vérifié : Resend répondait 403.
const FROM = 'Cinquin Maeva - Website <contact@andy-cinquin.com>'
const TO = ['maevacinquin1@gmail.com']

const SEND_ERROR_MESSAGE = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
const SUCCESS_MESSAGE = 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.'
const CAPTCHA_ERROR_MESSAGE =
	"La vérification anti-robot n'a pas abouti. Patientez quelques secondes puis renvoyez le message."

export interface ContactFormResponse {
	success: boolean
	message: string
	error?: string
}

// Client créé à l'appel : une clé absente ne fait plus planter le module au chargement.
function getResend(): Resend | null {
	const apiKey = process.env.RESEND_TOKEN
	return apiKey ? new Resend(apiKey) : null
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
	try {
		const invalid = validateContactForm(formData)
		if (invalid) {
			return { success: false, message: invalid.message, error: invalid.error }
		}

		// Robots : champ piège rempli ou texte au hasard. Réponse de succès habituelle, rien n'est envoyé.
		if (isHoneypotFilled(formData.website) || looksLikeBotText(formData)) {
			console.info('Formulaire de contact : envoi de robot écarté.')
			return { success: true, message: SUCCESS_MESSAGE }
		}

		// Cloudflare Turnstile : le jeton est vérifié ici, l'action pouvant être appelée sans passer par la page.
		const turnstile = await verifyTurnstile(formData.turnstileToken)
		if (!turnstile.success) {
			console.warn('Formulaire de contact : Turnstile refusé.', turnstile.errorCodes)
			return { success: false, message: CAPTCHA_ERROR_MESSAGE, error: 'CAPTCHA_FAILED' }
		}

		const resend = getResend()
		if (!resend) {
			console.error('Formulaire de contact : RESEND_TOKEN absent, envoi impossible.')
			return { success: false, message: SEND_ERROR_MESSAGE, error: 'CONFIG_ERROR' }
		}

		// Clé d'idempotence : un renvoi du même envoi (après une mise à jour du site ou une coupure réseau)
		// est reconnu par Resend pendant 24 h et ne crée pas un second email.
		const submissionId = normalizeSubmissionId(formData.submissionId)
		const sendOptions = submissionId ? { idempotencyKey: `contact-form/${submissionId}` } : undefined

		const { data, error } = await resend.emails.send(
			{
				from: FROM,
				to: TO,
				replyTo: formData.email.trim(),
				subject: `${containsLink(formData.message) ? '[Lien dans le message] ' : ''}Nouvelle demande de contact de ${formData.name.trim()}`,
				react: ContactFormEmail({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					address: formData.address,
					city: formData.city,
					postalCode: formData.postalCode,
					message: formData.message,
					prestation: optionLabel(PRESTATION_OPTIONS, normalizeOption(PRESTATION_OPTIONS, formData.prestation)),
					source: optionLabel(SOURCE_OPTIONS, normalizeOption(SOURCE_OPTIONS, formData.source)),
				}),
			},
			sendOptions
		)

		if (error) {
			// Pas de données du visiteur dans les journaux : seulement le retour de Resend.
			console.error('Erreur Resend:', { name: error.name, statusCode: error.statusCode, message: error.message })
			return { success: false, message: SEND_ERROR_MESSAGE, error: 'RESEND_ERROR' }
		}

		console.info('Formulaire de contact envoyé, id Resend :', data?.id)
		return { success: true, message: SUCCESS_MESSAGE }
	} catch (error) {
		console.error('Erreur lors de la soumission du formulaire:', error instanceof Error ? error.message : error)
		return {
			success: false,
			message: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
			error: 'UNKNOWN_ERROR',
		}
	}
}
