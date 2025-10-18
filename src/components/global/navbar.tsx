'use client'

import { Tabs } from '@/components/ui/vercel-tabs'
import Image from 'next/image'
import Link from 'next/link'

const navigationTabs = [
	{ id: 'accueil', label: 'Accueil' },
	{ id: 'mariages', label: 'Mariages' },
	{ id: 'beaute', label: 'Beauté' },
	{ id: 'artistique', label: 'Artistique' },
	{ id: 'enfants', label: 'Enfants' },
	{ id: 'cours', label: 'Cours' },
	{ id: 'contact', label: 'Contact' },
]

export function Navbar() {
	const handleTabChange = (tabId: string) => {
		// For now, just log - you can implement routing later
		console.log(`Navigating to: ${tabId}`)
		// Future implementation: router.push(`/${tabId}`)
	}

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Image
							src="/icons/logo.svg"
							alt="Maeva Cinquin - Maquilleuse Professionnelle"
							width={40}
							height={40}
							className="h-10 w-10"
						/>
						<span className="font-satisfy text-xl font-normal">Maeva Cinquin</span>
					</Link>

					{/* Navigation Tabs */}
					<div className="hidden md:flex">
						<Tabs tabs={navigationTabs} onTabChange={handleTabChange} />
					</div>

					{/* Mobile menu button - placeholder for future mobile menu */}
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
						aria-label="Menu"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<title>Menu</title>
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					</button>
				</div>
			</div>
		</nav>
	)
}
