'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
	MobileNavToggle,
	NavBody,
	Navbar,
	NavbarButton,
	NavbarLogo,
	NavItems,
} from '@/components/ui/resizable-navbar'

export const NavigationBar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const navItems = [
		{ name: 'Accueil', link: '/' },
		{ name: 'Ce que je propose', link: '/prestations' },
		{ name: 'Mes réalisations', link: '/realisations' },
		{ name: 'FAQ', link: '/faq' },
	]

	return (
		<Navbar>
			{/* Desktop Navigation */}
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					<NavbarButton variant="primary" href="/contact">
						Me contacter
					</NavbarButton>
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
				</MobileNavHeader>

				<MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
					{navItems.map(item => (
						<Link
							key={`mobile-link-${item.name}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-foreground  font-semibold text-lg hover:text-primary transition-colors"
						>
							<span className="block">{item.name}</span>
						</Link>
					))}
					<div className="flex w-full flex-col gap-4">
						<NavbarButton
							variant="primary"
							className="w-full"
							href="/contact"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Me contacter
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	)
}
