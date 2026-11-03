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
