'use server'

import { Resend } from 'resend'
import { ContactFormEmail } from '@/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_TOKEN)

export interface ContactFormData {
	name: string
	email: string
	phone: string
	address?: string
	city?: string
	postalCode?: string
	message: string
	gardenSize?: string
}

export interface ContactFormResponse {
	success: boolean
	message: string
	error?: string
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
	try {
		// Validation basique
		if (!formData.name || !formData.email || !formData.phone || !formData.message) {
			return {
				success: false,
				message: 'Veuillez remplir tous les champs obligatoires.',
				error: 'VALIDATION_ERROR',
			}
		}

		// Validation de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			return {
				success: false,
				message: 'Veuillez entrer une adresse email valide.',
				error: 'INVALID_EMAIL',
			}
		}

		// Envoyer l'email via Resend avec React Email
		const { error } = await resend.emails.send({
			from: 'Nature Paysage Laheux <contact@email.andy-cinquin.fr>',
			to: ['cinquin.andy@gmail.com'], // Email de test
			// to: ['nature.paysage.laheux@gmail.com'], // À activer quand tout sera fonctionnel
			replyTo: formData.email, // Le client pourra vous répondre directement
			subject: `Nouvelle demande de contact de ${formData.name}`,
			react: ContactFormEmail({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				address: formData.address,
				city: formData.city,
				postalCode: formData.postalCode,
				message: formData.message,
				gardenSize: formData.gardenSize,
			}),
		})

		if (error) {
			console.error('Erreur Resend:', error)
			return {
				success: false,
				message: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
				error: 'RESEND_ERROR',
			}
		}

		return {
			success: true,
			message: 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.',
		}
	} catch (error) {
		console.error('Erreur lors de la soumission du formulaire:', error)
		return {
			success: false,
			message: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
			error: 'UNKNOWN_ERROR',
		}
	}
}
