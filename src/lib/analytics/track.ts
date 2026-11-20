/**
 * Événements Umami du site. Les noms sont ceux qui apparaissent dans Umami (Événements, Objectifs, Entonnoirs) :
 * ne pas les renommer sans prévenir, les objectifs et entonnoirs déjà créés ne les retrouveraient plus.
 */
export const UMAMI_EVENTS = {
	phoneClick: 'Clic téléphone',
	emailClick: 'Clic email',
	instagramClick: 'Clic Instagram',
	facebookClick: 'Clic Facebook',
	mapsClick: 'Clic Google Maps',
	outboundClick: 'Lien sortant',
	contactFormStarted: 'Formulaire contact commencé',
	contactFormSent: 'Formulaire contact envoyé',
	contactFormError: 'Formulaire contact erreur',
	contactLinkClick: 'Clic vers contact',
	photoOpened: 'Photo ouverte',
	read50: 'Lecture 50 %',
	read90: 'Lecture 90 %',
} as const

/** Pages dont on mesure la lecture : un article, une prestation, une galerie. */
export const READ_TRACKED_PATH = /^\/(blog|prestations|galerie)\/[^/]+\/?$/

/** true si le lien mène à la page ou au formulaire de contact du site (bouton « Contact », « Prendre rendez-vous »…). */
export function isContactLink(href: string, siteHost: string): boolean {
	let url: URL
	try {
		url = new URL(href)
	} catch {
		return false
	}
	if (url.hostname.replace(/^www\./, '') !== siteHost.replace(/^www\./, '')) return false
	return url.pathname.replace(/\/$/, '') === '/contact' || url.hash === '#contact'
}

export type UmamiEventName = (typeof UMAMI_EVENTS)[keyof typeof UMAMI_EVENTS]
type EventData = Record<string, string | number | boolean>

declare global {
	interface Window {
		umami?: { track: (name: string, data?: EventData) => void }
	}
}

/** Envoie un événement à Umami. Sans effet si le script n'est pas (encore) chargé : jamais d'erreur côté visiteur. */
export function trackEvent(name: UmamiEventName, data?: EventData): void {
	try {
		window.umami?.track(name, data)
	} catch {
		// Le suivi ne doit jamais casser la page.
	}
}

/** Événement à envoyer pour un clic sur un lien, ou null si le lien ne nous intéresse pas (lien interne). */
export function eventForLink(href: string, siteHost: string): { name: UmamiEventName; data?: EventData } | null {
	if (href.startsWith('tel:')) return { name: UMAMI_EVENTS.phoneClick }
	if (href.startsWith('mailto:')) return { name: UMAMI_EVENTS.emailClick }
	let url: URL
	try {
		url = new URL(href)
	} catch {
		return null
	}
	if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
	const host = url.hostname.replace(/^www\./, '')
	if (host === siteHost.replace(/^www\./, '')) return null
	if (host === 'instagram.com') return { name: UMAMI_EVENTS.instagramClick }
	if (host === 'facebook.com' || host === 'fb.com') return { name: UMAMI_EVENTS.facebookClick }
	if (
		host === 'g.page' ||
		host === 'maps.app.goo.gl' ||
		(host.endsWith('google.com') && url.pathname.startsWith('/maps'))
	) {
		return { name: UMAMI_EVENTS.mapsClick }
	}
	return { name: UMAMI_EVENTS.outboundClick, data: { url: `${url.hostname}${url.pathname}`.slice(0, 200) } }
}
