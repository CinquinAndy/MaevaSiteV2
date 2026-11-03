import { describe, expect, test } from 'bun:test'
import { validateContactForm } from '@/lib/contact-validation'

const valide = {
	name: 'Jeanne Test',
	email: 'jeanne@example.com',
	phone: '0600000000',
	message: 'Bonjour, je voudrais un devis.',
}

describe('validateContactForm', () => {
	test('accepte un formulaire complet', () => {
		expect(validateContactForm(valide)).toBeNull()
	})

	test.each(['name', 'email', 'phone', 'message'] as const)('refuse un champ obligatoire vide : %s', champ => {
		expect(validateContactForm({ ...valide, [champ]: '' })?.error).toBe('VALIDATION_ERROR')
	})

	test('refuse un champ fait seulement d’espaces', () => {
		expect(validateContactForm({ ...valide, name: '   ' })?.error).toBe('VALIDATION_ERROR')
	})

	test.each(['jeanne', 'jeanne@', 'jeanne@example', 'jean ne@example.com'])('refuse l’email %s', email => {
		expect(validateContactForm({ ...valide, email })).toEqual({
			message: 'Veuillez entrer une adresse email valide.',
			error: 'INVALID_EMAIL',
		})
	})

	test('les champs facultatifs peuvent manquer', () => {
		expect(validateContactForm({ ...valide, city: undefined, postalCode: undefined })).toBeNull()
	})
})
