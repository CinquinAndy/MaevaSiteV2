import type { Metadata } from 'next'
import { Satisfy } from 'next/font/google'
import type React from 'react'
import '@/app/(frontend)/global.css'
import Script from 'next/script'
import { Gooey } from '@/components/ui/gooey'

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

interface MenuItem {
	title: string
	url: string
}

const navigationMenu: MenuItem[] = [
	{ title: 'Accueil', url: '/' },
	{ title: 'Blog', url: '/blog' },
	{ title: 'Prestations', url: '/prestations' },
	{ title: 'Galerie', url: '/galerie' },
	{ title: 'Contact', url: '/contact' },
]

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
				<nav className="sticky top-10 z-0">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						{/* Desktop Navbar - Centré */}
						<div className="hidden lg:flex items-center justify-center h-16">
							<Gooey
								items={[
									{ label: 'Logo', href: '/', isLogo: true },
									...navigationMenu.map(item => ({
										label: item.title,
										href: item.url,
									})),
								]}
								particleCount={15}
								particleDistances={[90, 10]}
								particleR={100}
								initialActiveIndex={0}
								animationTime={600}
								timeVariance={300}
							/>
						</div>
					</div>
				</nav>
				<main className="z-10 bg-background h-screen">{children}</main>
			</body>
		</html>
	)
}
