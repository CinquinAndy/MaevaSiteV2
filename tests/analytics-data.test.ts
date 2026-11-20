import { describe, expect, test } from 'bun:test'
import { isContactLink, READ_TRACKED_PATH, UMAMI_EVENTS } from '@/lib/analytics/track'
import { fieldsFromFormData } from '@/lib/contact-draft'
import { normalizeOption, optionLabel, PRESTATION_OPTIONS, SOURCE_OPTIONS } from '@/lib/contact-options'
import { INDEXNOW_KEY, pagePathFor } from '@/lib/seo/indexnow'

describe('liens vers le contact', () => {
	const host = 'cinquin-maeva.com'
	test('page contact et ancre #contact du site', () => {
		expect(isContactLink('https://cinquin-maeva.com/contact', host)).toBe(true)
		expect(isContactLink('https://cinquin-maeva.com/contact/', host)).toBe(true)
		expect(isContactLink('https://cinquin-maeva.com/#contact', host)).toBe(true)
		expect(isContactLink('https://www.cinquin-maeva.com/contact', host)).toBe(true)
	})
	test('autres liens', () => {
		expect(isContactLink('https://cinquin-maeva.com/prestations', host)).toBe(false)
		expect(isContactLink('https://example.com/contact', host)).toBe(false)
		expect(isContactLink('mailto:maevacinquin1@gmail.com', host)).toBe(false)
	})
})

test('lecture mesurée sur les articles, prestations et galeries seulement', () => {
	expect(READ_TRACKED_PATH.test('/blog/mon-article')).toBe(true)
	expect(READ_TRACKED_PATH.test('/prestations/nail-art')).toBe(true)
	expect(READ_TRACKED_PATH.test('/galerie/salon-du-mariage')).toBe(true)
	expect(READ_TRACKED_PATH.test('/blog')).toBe(false)
	expect(READ_TRACKED_PATH.test('/contact')).toBe(false)
})

test('noms d’événements de 50 caractères au plus', () => {
	for (const name of Object.values(UMAMI_EVENTS)) expect(name.length).toBeLessThanOrEqual(50)
})

describe('choix du formulaire', () => {
	test('seules les valeurs de la liste passent', () => {
		expect(normalizeOption(SOURCE_OPTIONS, 'ia')).toBe('ia')
		expect(normalizeOption(SOURCE_OPTIONS, '<script>')).toBe('')
		expect(normalizeOption(PRESTATION_OPTIONS, undefined)).toBe('')
		expect(optionLabel(PRESTATION_OPTIONS, 'mariage')).toBe('Maquillage de mariage')
		expect(optionLabel(PRESTATION_OPTIONS, '')).toBeNull()
	})
	test('les choix sont lus avec les autres champs (brouillon, renvoi automatique)', () => {
		const data = new FormData()
		data.set('prestation', 'nail-art')
		data.set('source', 'instagram')
		const fields = fieldsFromFormData(data)
		expect(fields.prestation).toBe('nail-art')
		expect(fields.source).toBe('instagram')
	})
})

test('IndexNow : adresses publiques et clé valide', () => {
	expect(pagePathFor('blog', 'mon-article')).toBe('/blog/mon-article')
	expect(pagePathFor('galery', 'salon')).toBe('/galerie/salon')
	expect(pagePathFor('services', 'nail-art')).toBe('/prestations/nail-art')
	expect(pagePathFor('media', 'x')).toBeNull()
	expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{32}$/)
})
