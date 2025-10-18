import type { Metadata } from 'next'
import { Satisfy } from 'next/font/google'
import type React from 'react'
import '@/app/(frontend)/global.css'
import Script from 'next/script'

// Satisfy font for titles (from Google Fonts - matches old site)
const satisfy = Satisfy({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-satisfy',
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://cinquin-maeva.com'),
	appleWebApp: {
		title: 'Maeva Cinquin',
	},
	manifest: '/manifest.json',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="fr" className={satisfy.variable}>
			<head>
				{/* Adobe Fonts (Typekit) - urw-form font */}
				<link rel="preconnect" href="https://use.typekit.net" />
				<link rel="stylesheet" href="https://use.typekit.net/ayg0khv.css" />
				{/* Preconnect for third-party domains */}
				<link rel="preconnect" href="https://umami.wadefade.fr" />
				{/* DNS Prefetch for better performance */}
				<link rel="dns-prefetch" href="https://umami.wadefade.fr" />
			</head>
			<body>
				<Script
					src="https://umami.wadefade.fr/script.js"
					data-website-id="e8f25e84-b2f1-43c6-b574-5d9d3a65c75b"
					strategy="afterInteractive"
				/>
				<main>{children}</main>
			</body>
		</html>
	)
}
