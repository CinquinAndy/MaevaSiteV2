import type { Metadata } from 'next'
import localFont from 'next/font/local'
import type React from 'react'
import '@/app/(frontend)/global.css'
import Script from 'next/script'

// Apple Garamond pour les titres
const appleGaramond = localFont({
	src: [
		{
			path: '../../../public/font/AppleGaramond-Light.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../../public/font/AppleGaramond-LightItalic.ttf',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../../public/font/AppleGaramond.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../../public/font/AppleGaramond-Italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../../public/font/AppleGaramond-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../../public/font/AppleGaramond-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
	variable: '--font-garamond',
	display: 'swap',
})

// Baskerville pour les textes
const baskerville = localFont({
	src: [
		{
			path: '../../../public/font/Baskervville-VariableFont_wght.ttf',
			style: 'normal',
		},
		{
			path: '../../../public/font/Baskervville-Italic-VariableFont_wght.ttf',
			style: 'italic',
		},
	],
	variable: '--font-baskerville',
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
		<html lang="fr" className={`${appleGaramond.variable} ${baskerville.variable}`}>
			<head>
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
