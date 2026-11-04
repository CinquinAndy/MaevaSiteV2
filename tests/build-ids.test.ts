import { describe, expect, test } from 'bun:test'
import { createDeploymentId, deriveServerActionsKey, isValidDeploymentId } from '../src/scripts/build-ids.mjs'

describe('deriveServerActionsKey', () => {
	test('même secret : même clé (identifiants d’actions stables d’un build à l’autre)', () => {
		expect(deriveServerActionsKey('secret-a')).toBe(deriveServerActionsKey('secret-a'))
		expect(deriveServerActionsKey('secret-a')).not.toBe(deriveServerActionsKey('secret-b'))
	})

	test('clé AES-256 valide pour Next (base64 de 32 octets), sans recopier le secret', () => {
		const cle = deriveServerActionsKey('secret-a')
		expect(Buffer.from(cle, 'base64')).toHaveLength(32)
		expect(cle).not.toContain('secret-a')
	})

	test('secret absent : rien (Next reprend une clé aléatoire)', () => {
		expect(deriveServerActionsKey(undefined)).toBe('')
		expect(deriveServerActionsKey('')).toBe('')
	})
})

describe('createDeploymentId', () => {
	test('commit fourni : ses 12 premiers caractères', () => {
		expect(createDeploymentId('98b2dfe92ec41df72fdfa8638ec298332b05c198')).toBe('98b2dfe92ec4')
	})

	test('commit absent ou invalide : identifiant aléatoire valide', () => {
		for (const valeur of [undefined, '', '  ', 'pas valide !']) {
			const id = createDeploymentId(valeur)
			expect(id).toMatch(/^[0-9a-f]{16}$/)
			expect(isValidDeploymentId(id)).toBe(true)
		}
		expect(createDeploymentId(undefined)).not.toBe(createDeploymentId(undefined))
	})
})
