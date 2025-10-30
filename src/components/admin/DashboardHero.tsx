'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

const UMAMI_SHARE_URL = 'https://umami.wadefade.fr/share/nhMegXaFItQEV65T/cinquin-maeva.com'

export default function DashboardHero(): React.JSX.Element {
	const [iframeLoaded, setIframeLoaded] = useState(false)
	const [showFallback, setShowFallback] = useState(false)
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		// If iframe hasn't loaded after a short delay, assume it was blocked by X-Frame-Options/CSP
		timeoutRef.current = window.setTimeout(() => {
			if (!iframeLoaded) setShowFallback(true)
		}, 2500)

		return () => {
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
		}
	}, [iframeLoaded])

	return (
		<section className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
			<div className="mb-3 flex items-center justify-between gap-4">
				<h2 className="m-0 text-lg font-medium">Website overview</h2>
				<div className="flex gap-2">
				<a
					href="/cms/tutorials"
						className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
					>
						Tutorials
					</a>
          <a
            href={UMAMI_SHARE_URL}
						target="_blank"
						rel="noreferrer noopener"
						className="inline-flex items-center gap-2 rounded-md bg-neutral-700 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
					>
						Open Umami
					</a>
				</div>
			</div>

			<div className="h-[72vh] max-h-[900px] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
				{!showFallback && (
          <iframe
						title="Umami analytics"
            src={UMAMI_SHARE_URL}
						className="h-full w-full border-0"
						loading="lazy"
						referrerPolicy="no-referrer"
						onLoad={() => {
							setIframeLoaded(true)
							if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
						}}
					/>
				)}

				{showFallback && (
					<div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
						<h3 className="text-base font-medium">Analytics cannot be embedded</h3>
						<p className="max-w-md text-sm text-neutral-600 dark:text-neutral-300">
							Your browser or the analytics server is blocking embedding (X-Frame-Options / CSP). Open the dashboard in
							a new tab.
						</p>
						<div className="flex gap-2">
              <a
                href={UMAMI_SHARE_URL}
								target="_blank"
								rel="noreferrer noopener"
								className="inline-flex items-center gap-2 rounded-md bg-neutral-700 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
							>
								Open Umami
							</a>
						<a
							href="/cms/tutorials"
								className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
							>
								Tutorials
							</a>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
