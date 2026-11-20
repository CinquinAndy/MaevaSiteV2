'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import { eventForLink, isContactLink, READ_TRACKED_PATH, trackEvent, UMAMI_EVENTS } from '@/lib/analytics/track'
import { UMAMI_PROXY_PREFIX, UMAMI_WEBSITE_ID } from '@/lib/analytics/umami-proxy'

/** Seuls les domaines de production comptent : le développement local et les essais ne polluent pas les stats. */
const TRACKED_DOMAINS = 'cinquin-maeva.com,www.cinquin-maeva.com'

/**
 * Enregistrement des sessions (replays) d'Umami. Désactivé par défaut : en France, la CNIL demande le
 * consentement du visiteur pour ce type d'enregistrement. À activer avec NEXT_PUBLIC_UMAMI_REPLAYS=true
 * une fois le consentement prévu, puis régler l'échantillonnage dans Umami (Réglages du site, Replays).
 */
const REPLAYS_ENABLED = process.env.NEXT_PUBLIC_UMAMI_REPLAYS === 'true'

/**
 * Script Umami servi par le site (relais `/v`, voir src/lib/analytics/umami-proxy.ts) et suivi des clics sur les
 * liens de contact et les liens sortants, pour toutes les pages, contenu du CMS compris.
 */
export function UmamiAnalytics() {
	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			const link = (event.target as Element | null)?.closest?.('a[href]')
			if (!(link instanceof HTMLAnchorElement)) return
			const page = window.location.pathname
			if (isContactLink(link.href, window.location.hostname)) {
				// Quel bouton mène au contact, et où il est : menu, bas de page ou contenu de la page.
				const zone = link.closest('header, nav') ? 'menu' : link.closest('footer') ? 'pied de page' : 'page'
				const label = (link.textContent || link.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
				trackEvent(UMAMI_EVENTS.contactLinkClick, { page, zone, bouton: label.slice(0, 60) || 'sans texte' })
				return
			}
			const tracked = eventForLink(link.href, window.location.hostname)
			if (tracked) trackEvent(tracked.name, { ...tracked.data, page })
		}
		// Phase de capture : le clic est compté même si un composant arrête sa propagation.
		document.addEventListener('click', onClick, { capture: true })
		return () => document.removeEventListener('click', onClick, { capture: true })
	}, [])

	// Lecture des articles, prestations et galeries : la page a-t-elle été lue à moitié, presque en entier ?
	const pathname = usePathname()
	useEffect(() => {
		if (!READ_TRACKED_PATH.test(pathname)) return
		const reached = new Set<number>()
		let frame = 0
		const measure = () => {
			frame = 0
			const scrollable = document.documentElement.scrollHeight - window.innerHeight
			if (scrollable <= 0) return
			const ratio = window.scrollY / scrollable
			for (const [threshold, name] of [
				[0.5, UMAMI_EVENTS.read50],
				[0.9, UMAMI_EVENTS.read90],
			] as const) {
				if (ratio >= threshold && !reached.has(threshold)) {
					reached.add(threshold)
					trackEvent(name, { page: pathname })
				}
			}
		}
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(measure)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			if (frame) cancelAnimationFrame(frame)
		}
	}, [pathname])

	return (
		<>
			<Script
				src={`${UMAMI_PROXY_PREFIX}/s.js`}
				data-website-id={UMAMI_WEBSITE_ID}
				data-domains={TRACKED_DOMAINS}
				// Vitesse ressentie par les vrais visiteurs (LCP, INP, CLS) et erreurs JavaScript, dans Umami.
				data-performance="true"
				data-errors="true"
				strategy="afterInteractive"
			/>
			{REPLAYS_ENABLED && (
				<Script
					src={`${UMAMI_PROXY_PREFIX}/r.js`}
					data-website-id={UMAMI_WEBSITE_ID}
					data-domains={TRACKED_DOMAINS}
					strategy="lazyOnload"
				/>
			)}
		</>
	)
}
