'use client'

import { Menu, Search } from 'lucide-react'
import * as React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import Image from 'next/image'
import Link from 'next/link'

interface MenuItem {
	title: string
	url: string
	items?: MenuItem[]
}

const navigationMenu: MenuItem[] = [
	{ title: 'Accueil', url: '/' },
	{
		title: 'Mariages',
		url: '/mariages',
		items: [
			{ title: 'Mariée', url: '/mariages/mariee' },
			{ title: 'Cortège', url: '/mariages/cortege' },
			{ title: 'Invitées', url: '/mariages/invitees' },
		],
	},
	{
		title: 'Beauté',
		url: '/beaute',
		items: [
			{ title: 'Maquillage Naturel', url: '/beaute/naturel' },
			{ title: 'Maquillage Sophistiqué', url: '/beaute/sophistique' },
		],
	},
	{ title: 'Artistique', url: '/artistique' },
	{ title: 'Enfants', url: '/enfants' },
	{ title: 'Cours', url: '/cours' },
	{ title: 'Contact', url: '/contact' },
]

export function Navbar() {
	const [openSearch, setOpenSearch] = React.useState(false)

	return (
		<nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Desktop Navbar */}
				<div className="hidden lg:flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/icons/logo.svg"
							alt="Maeva Cinquin - Maquilleuse Professionnelle"
							width={40}
							height={40}
							className="h-10 w-10"
						/>
						<span className="font-satisfy text-xl">Maeva Cinquin</span>
					</Link>

					{/* Navigation Links */}
					<div className="flex items-center gap-1">
						{navigationMenu.map(item => (
							<NavLink key={item.title} item={item} />
						))}
					</div>

					{/* Search Button */}
					<Button variant="ghost" size="icon" onClick={() => setOpenSearch(true)}>
						<Search className="size-4" />
					</Button>
				</div>

				{/* Mobile Navbar */}
				<div className="flex lg:hidden items-center justify-between h-16">
					<Link href="/" className="flex items-center gap-2">
						<Image src="/icons/logo.svg" alt="Maeva Cinquin" width={32} height={32} className="h-8 w-8" />
						<span className="font-satisfy text-lg">Maeva Cinquin</span>
					</Link>

					<div className="flex items-center gap-2">
						{/* Search button mobile */}
						<Button variant="ghost" size="icon" onClick={() => setOpenSearch(true)}>
							<Search className="size-4" />
						</Button>

						{/* Menu Sheet */}
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="overflow-y-auto">
								<SheetHeader>
									<SheetTitle>
										<Link href="/" className="flex items-center gap-2">
											<Image src="/icons/logo.svg" alt="Maeva Cinquin" width={32} height={32} className="h-8 w-8" />
										</Link>
									</SheetTitle>
								</SheetHeader>
								<div className="my-6 flex flex-col gap-4">
									<Accordion type="single" collapsible className="flex w-full flex-col gap-2">
										{navigationMenu.map(item => (
											<MobileNavItem key={item.title} item={item} />
										))}
									</Accordion>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>

			{/* Search Dialog */}
			<CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
				<CommandInput placeholder="Rechercher une prestation, un service..." />
				<CommandList>
					<CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
					<CommandGroup heading="Prestations">
						<CommandItem>Maquillage Mariée</CommandItem>
						<CommandItem>Maquillage Beauté</CommandItem>
						<CommandItem>Maquillage Artistique</CommandItem>
						<CommandItem>Maquillage Enfants</CommandItem>
						<CommandItem>Cours de Maquillage</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</nav>
	)
}

const NavLink = ({ item }: { item: MenuItem }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
	const containerRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleMouseEnter = () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			if (item.items) setIsOpen(true)
		}

		const handleMouseLeave = () => {
			timeoutRef.current = setTimeout(() => {
				setIsOpen(false)
			}, 150)
		}

		container.addEventListener('mouseenter', handleMouseEnter)
		container.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			container.removeEventListener('mouseenter', handleMouseEnter)
			container.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [item.items])

	if (item.items) {
		return (
			<div ref={containerRef} className="relative group">
				<Link
					href={item.url}
					className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
				>
					{item.title}
				</Link>

				{/* Dropdown Menu with smooth animation */}
				{isOpen && (
					<div className="absolute left-0 top-full pt-2 animate-in fade-in-0 zoom-in-95 duration-200">
						<div className="min-w-[200px] rounded-lg border bg-popover p-1 shadow-lg">
							{item.items.map(subItem => (
								<Link
									key={subItem.title}
									href={subItem.url}
									className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
								>
									{subItem.title}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<Link
			href={item.url}
			className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
		>
			{item.title}
		</Link>
	)
}

const MobileNavItem = ({ item }: { item: MenuItem }) => {
	if (item.items) {
		return (
			<AccordionItem value={item.title} className="border-b-0">
				<AccordionTrigger className="py-3 font-semibold hover:no-underline">{item.title}</AccordionTrigger>
				<AccordionContent className="mt-2 flex flex-col gap-2">
					{item.items.map(subItem => (
						<Link
							key={subItem.title}
							href={subItem.url}
							className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
						>
							{subItem.title}
						</Link>
					))}
				</AccordionContent>
			</AccordionItem>
		)
	}

	return (
		<Link href={item.url} className="py-3 font-semibold">
			{item.title}
		</Link>
	)
}
