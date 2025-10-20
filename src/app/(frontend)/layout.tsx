import type { Metadata } from 'next'
import type React from 'react'
import '@/app/(frontend)/global.css'
import { Corinthia, Kalam, Libre_Caslon_Display } from 'next/font/google'
import Script from 'next/script'
import GlitterFinal from '@/components/ui/glitter-final'
import { Gooey } from '@/components/ui/gooey'
import { ScrollProgress } from '@/components/ui/scroll-progress'

const libreCaslonDisplay = Libre_Caslon_Display({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-libre-caslon-display',
})

const corinthia = Corinthia({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-corinthia',
})

const kalam = Kalam({
	weight: ['300', '400', '700'],
	subsets: ['latin'],
	variable: '--font-kalam',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://cinquin-maeva.com'),
	appleWebApp: {
		title: 'Maeva Cinquin',
	},
	manifest: '/manifest.json',
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'none',
			'max-snippet': -1,
		},
	},
}

interface MenuItem {
	title: string
	url: string
}

const navigationMenu: MenuItem[] = [
	{ title: 'Blog', url: '/blog' },
	{ title: 'Prestations', url: '/prestations' },
	{ title: 'Galerie', url: '/galerie' },
	{ title: 'Contact', url: '/contact' },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="fr" className={`${corinthia.variable} ${libreCaslonDisplay.variable} ${kalam.variable}`}>
			<head>
				<script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
				{/* Adobe Fonts (Typekit) - urw-form font */}
				<link rel="preconnect" href="https://use.typekit.net" />
				<link rel="stylesheet" href="https://use.typekit.net/ayg0khv.css" />
				{/* Preconnect for third-party domains */}
				<link rel="preconnect" href="https://umami.wadefade.fr" />
				{/* DNS Prefetch for better performance */}
				<link rel="dns-prefetch" href="https://umami.wadefade.fr" />
			</head>
			<body className={`relative bg-background`}>
				{/* <PatternBackground /> */}
				<Script
					src="https://umami.wadefade.fr/script.js"
					data-website-id="e8f25e84-b2f1-43c6-b574-5d9d3a65c75b"
					strategy="afterInteractive"
				/>

				{/* Vertical Scroll Progress Indicator - Positioned Right Center */}
				<div className="fixed left-6 sm:left-auto sm:right-6 top-1/2 -translate-y-1/2 z-[200] h-[45vh] w-1 pointer-events-none">
					{/* Background track */}
					<div className="absolute inset-0 bg-border/40 rounded-full" />

					{/* Progress indicator */}
					<ScrollProgress
						orientation="vertical"
						className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-primary via-secondary to-accent"
						springOptions={{
							stiffness: 100,
							damping: 30,
							mass: 0.5,
						}}
					/>
				</div>

				<nav className="fixed w-screen top-10 z-50">
					{/* Mobile + Desktop Navbar - Centré */}
					<div className="flex items-center justify-center h-12 sm:h-14 lg:h-16">
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
				</nav>
				<main className="w-full h-full relative">{children}</main>
				<div className="">
					<GlitterFinal speed={0.75} />
				</div>
			</body>
		</html>
	)
}
