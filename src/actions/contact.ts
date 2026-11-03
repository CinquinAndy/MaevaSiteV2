'use server'

import { Resend } from 'resend'
import { ContactFormEmail } from '@/emails/contact-form-email'
import { type ContactFormData, validateContactForm } from '@/lib/contact-validation'

export type { ContactFormData } from '@/lib/contact-validation'

// Expéditeur sur un domaine vérifié dans le compte Resend (andy-cinquin.com).
// L'ancien expéditeur contact@email.andy-cinquin.fr n'est plus vérifié : Resend répondait 403.
const FROM = 'Cinquin Maeva - Website <contact@andy-cinquin.com>'
const TO = ['maevacinquin1@gmail.com']

const SEND_ERROR_MESSAGE = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."

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

		const resend = getResend()
		if (!resend) {
			console.error('Formulaire de contact : RESEND_TOKEN absent, envoi impossible.')
			return { success: false, message: SEND_ERROR_MESSAGE, error: 'CONFIG_ERROR' }
		}

		const { data, error } = await resend.emails.send({
			from: FROM,
			to: TO,
			replyTo: formData.email.trim(),
			subject: `Nouvelle demande de contact de ${formData.name.trim()}`,
			react: ContactFormEmail({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				address: formData.address,
				city: formData.city,
				postalCode: formData.postalCode,
				message: formData.message,
			}),
		})

		if (error) {
			// Pas de données du visiteur dans les journaux : seulement le retour de Resend.
			console.error('Erreur Resend:', { name: error.name, statusCode: error.statusCode, message: error.message })
			return { success: false, message: SEND_ERROR_MESSAGE, error: 'RESEND_ERROR' }
		}

		console.info('Formulaire de contact envoyé, id Resend :', data?.id)
		return {
			success: true,
			message: 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.',
		}
	} catch (error) {
		console.error('Erreur lors de la soumission du formulaire:', error instanceof Error ? error.message : error)
		return {
			success: false,
			message: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
			error: 'UNKNOWN_ERROR',
		}
	}
}
