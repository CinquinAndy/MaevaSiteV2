export interface ContactFormData {
	name: string
	email: string
	phone: string
	address?: string
	city?: string
	postalCode?: string
	message: string
	gardenSize?: string
	/**
	 * Identifiant de l'envoi (UUID créé par le navigateur), repris tel quel quand le formulaire est renvoyé
	 * après une mise à jour du site : sert de clé d'idempotence chez Resend pour ne jamais envoyer deux fois.
	 */
	submissionId?: string
}

const SUBMISSION_ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Renvoie l'identifiant d'envoi s'il a la forme d'un UUID, sinon undefined (valeur ignorée). */
export function normalizeSubmissionId(value: unknown): string | undefined {
	return typeof value === 'string' && SUBMISSION_ID_REGEX.test(value) ? value.toLowerCase() : undefined
}

export type ContactValidationError = {
	message: string
	error: 'VALIDATION_ERROR' | 'INVALID_EMAIL'
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Renvoie l'erreur à afficher, ou null si le formulaire est valide. */
export function validateContactForm(formData: Partial<ContactFormData>): ContactValidationError | null {
	const name = formData.name?.trim()
	const email = formData.email?.trim()
	const phone = formData.phone?.trim()
	const message = formData.message?.trim()

	if (!name || !email || !phone || !message) {
		return { message: 'Veuillez remplir tous les champs obligatoires.', error: 'VALIDATION_ERROR' }
	}

	if (!emailRegex.test(email)) {
		return { message: 'Veuillez entrer une adresse email valide.', error: 'INVALID_EMAIL' }
	}

	return null
}
