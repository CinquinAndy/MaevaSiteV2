// biome-ignore-all lint/suspicious/noTemplateCurlyInString: chaînes copiées du code des scripts Umami
import { describe, expect, test } from 'bun:test'
import { eventForLink, UMAMI_EVENTS } from '@/lib/analytics/track'
import { clientIp, resolveUpstream, rewriteTrackerScript, upstreamHeaders } from '@/lib/analytics/umami-proxy'

describe('resolveUpstream', () => {
	test('scripts', () => {
		expect(resolveUpstream('GET', ['s.js'])).toEqual({ kind: 'script', path: '/script.js' })
		expect(resolveUpstream('GET', ['r.js'])).toEqual({ kind: 'script', path: '/recorder.js' })
	})

	test('envois (chemins renommés et anciens chemins)', () => {
		expect(resolveUpstream('POST', ['e'])).toEqual({ kind: 'api', path: '/api/send' })
		expect(resolveUpstream('POST', ['api', 'send'])).toEqual({ kind: 'api', path: '/api/send' })
		expect(resolveUpstream('POST', ['r'])).toEqual({ kind: 'api', path: '/api/record' })
	})

	test('réglages des replays : uniquement un identifiant de site valide', () => {
		const id = 'e8f25e84-b2f1-43c6-b574-5d9d3a65c75b'
		expect(resolveUpstream('GET', ['w', id, 'recorder'])).toEqual({ kind: 'api', path: `/api/websites/${id}/recorder` })
		expect(resolveUpstream('GET', ['w', '..', 'recorder'])).toBeNull()
		expect(resolveUpstream('GET', ['w', id, 'stats'])).toBeNull()
	})

	test('tout le reste est refusé (le relais ne joint pas d’autres pages Umami)', () => {
		expect(resolveUpstream('GET', ['api', 'websites'])).toBeNull()
		expect(resolveUpstream('GET', ['login'])).toBeNull()
		expect(resolveUpstream('POST', ['api', 'auth', 'login'])).toBeNull()
		expect(resolveUpstream('GET', ['e'])).toBeNull()
		expect(resolveUpstream('DELETE', ['e'])).toBeNull()
	})
})

describe('rewriteTrackerScript', () => {
	test('remplace les chemins d’envoi du script Umami', () => {
		// Extraits du script.js et du recorder.js d'Umami 3.x
		const tracker = 'const J=`${_.replace(/\\/$/,"")}/api/send`'
		const recorder = 'h=`${u}/api/record`,p=`${u}/api/websites/${a}/recorder`'
		expect(rewriteTrackerScript(tracker)).toBe('const J=`${_.replace(/\\/$/,"")}/e`')
		expect(rewriteTrackerScript(recorder)).toBe('h=`${u}/r`,p=`${u}/w/${a}/recorder`')
	})
})

describe('IP du visiteur', () => {
	test('X-Real-Ip posé par Traefik, puis X-Forwarded-For', () => {
		expect(clientIp(new Headers({ 'x-real-ip': '203.0.113.7', 'x-forwarded-for': '10.0.0.1' }))).toBe('203.0.113.7')
		expect(clientIp(new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }))).toBe('203.0.113.7')
		expect(clientIp(new Headers({ 'cf-connecting-ip': '198.51.100.2', 'x-real-ip': '172.68.0.1' }))).toBe(
			'198.51.100.2'
		)
		expect(clientIp(new Headers())).toBeNull()
	})

	test('seuls les en-têtes utiles partent vers Umami (pas les cookies du site)', () => {
		const headers = upstreamHeaders(
			new Headers({
				'user-agent': 'Mozilla/5.0',
				'accept-language': 'fr-FR',
				'x-umami-cache': 'abc',
				cookie: 'payload-token=secret',
				authorization: 'Bearer x',
				'x-real-ip': '203.0.113.7',
			})
		)
		expect(headers.get('user-agent')).toBe('Mozilla/5.0')
		expect(headers.get('x-umami-cache')).toBe('abc')
		expect(headers.get('x-forwarded-for')).toBe('203.0.113.7')
		expect(headers.get('cookie')).toBeNull()
		expect(headers.get('authorization')).toBeNull()
	})
})

describe('eventForLink', () => {
	const site = 'cinquin-maeva.com'
	test('contacts et réseaux', () => {
		expect(eventForLink('tel:+33616625137', site)?.name).toBe(UMAMI_EVENTS.phoneClick)
		expect(eventForLink('mailto:maevacinquin1@gmail.com', site)?.name).toBe(UMAMI_EVENTS.emailClick)
		expect(eventForLink('https://www.instagram.com/makeup.artist.dream', site)?.name).toBe(UMAMI_EVENTS.instagramClick)
		expect(eventForLink('https://www.facebook.com/Cinquin-maeva', site)?.name).toBe(UMAMI_EVENTS.facebookClick)
		expect(eventForLink('https://g.page/cinquin-maeva?share', site)?.name).toBe(UMAMI_EVENTS.mapsClick)
	})

	test('liens internes ignorés, liens sortants comptés sans paramètres', () => {
		expect(eventForLink('https://cinquin-maeva.com/galerie', site)).toBeNull()
		expect(eventForLink('https://www.cinquin-maeva.com/blog', 'www.cinquin-maeva.com')).toBeNull()
		expect(eventForLink('https://example.com/page?token=1', site)).toEqual({
			name: UMAMI_EVENTS.outboundClick,
			data: { url: 'example.com/page' },
		})
	})

	test('noms d’événements de 50 caractères au plus (limite Umami)', () => {
		for (const name of Object.values(UMAMI_EVENTS)) expect(name.length).toBeLessThanOrEqual(50)
	})
})
