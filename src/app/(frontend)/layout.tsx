import type { Metadata } from 'next'
import { Satisfy } from 'next/font/google'
import type React from 'react'
import '@/app/(frontend)/global.css'
import { Libre_Caslon_Display } from 'next/font/google'
import Script from 'next/script'
import GlitterFinal from '@/components/ui/glitter-final'
import { Gooey } from '@/components/ui/gooey'
import { ScrollProgress } from '@/components/ui/scroll-progress'

// Satisfy font for titles (from Google Fonts - matches old site)
const satisfy = Satisfy({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-satisfy',
	display: 'swap',
})

const libreCaslonDisplay = Libre_Caslon_Display({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-libre-caslon-display',
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
	{ title: 'Blog', url: '/blog' },
	{ title: 'Prestations', url: '/prestations' },
	{ title: 'Galerie', url: '/galerie' },
	{ title: 'Contact', url: '/contact' },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="fr" className={`${satisfy.variable} ${libreCaslonDisplay.variable}`}>
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
				<div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] h-[40vh] w-1 pointer-events-none">
					{/* Background track */}
					<div className="absolute inset-0 bg-neutral-200/30 dark:bg-neutral-800/30 rounded-full" />
					{/* Progress indicator */}
					<ScrollProgress
						orientation="vertical"
						className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-pink-400/80 via-rose-500/80 to-pink-600/80 backdrop-blur-sm shadow-lg shadow-pink-500/20"
						springOptions={{
							stiffness: 280,
							damping: 18,
							mass: 0.3,
						}}
					/>
				</div>

				<nav className="fixed top-10 w-full h-full z-[100]">
					<div className="container mx-auto px-2 sm:px-4 lg:px-8">
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
					</div>
				</nav>
				<main>{children}</main>
				<div className="">
					<GlitterFinal speed={0.75} />
				</div>
			</body>
		</html>
	)
}
