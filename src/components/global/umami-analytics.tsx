'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { eventForLink, trackEvent } from '@/lib/analytics/track'
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
			const tracked = eventForLink(link.href, window.location.hostname)
			if (tracked) trackEvent(tracked.name, { ...tracked.data, page: window.location.pathname })
		}
		// Phase de capture : le clic est compté même si un composant arrête sa propagation.
		document.addEventListener('click', onClick, { capture: true })
		return () => document.removeEventListener('click', onClick, { capture: true })
	}, [])

	return (
		<>
			<Script
				src={`${UMAMI_PROXY_PREFIX}/s.js`}
				data-website-id={UMAMI_WEBSITE_ID}
				data-domains={TRACKED_DOMAINS}
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
