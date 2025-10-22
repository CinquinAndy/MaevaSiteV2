import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface FooterLink {
	text: string
	url: string
}

interface FooterSection {
	title: string
	links: FooterLink[]
}

export async function Footer() {
	const currentYear = new Date().getFullYear()
	const payload = await getPayload({ config })

	// Fetch latest galleries (published only, limit 4)
	const galleriesResponse = await payload.find({
		collection: 'gallery',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: '-publishedDate',
		limit: 4,
	})

	// Fetch services (published only, limit 6)
	const servicesResponse = await payload.find({
		collection: 'services',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: 'order',
		limit: 6,
	})

	const navigationSections: FooterSection[] = [
		{
			title: 'Navigation',
			links: [
				{ text: 'Accueil', url: '/' },
				{ text: 'Blog', url: '/blog' },
				{ text: 'Prestations', url: '/prestations' },
				{ text: 'Galerie', url: '/galerie' },
				{ text: 'Contact', url: '/contact' },
			],
		},
		{
			title: 'Prestations',
			links: servicesResponse.docs.slice(0, 6).map(service => ({
				text: service.title,
				url: `/prestations/${service.slug}`,
			})),
		},
		{
			title: 'Galeries récentes',
			links: galleriesResponse.docs.map(gallery => ({
				text: gallery.title,
				url: `/galerie/${gallery.slug}`,
			})),
		},
	]

	return (
		<section className="py-16 lg:py-24">
			<div className="container px-4 lg:px-0 mx-auto">
				<footer>
					<div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
						{/* Brand Section */}
						<div className="col-span-2 mb-8 lg:mb-0">
							<Link href="/" className="flex items-center gap-3 lg:justify-start mb-4">
								<Image
									src="/icons/logo.png"
									alt="Maeva Cinquin - Maquilleuse Professionnelle"
									width={64}
									height={64}
									className="h-16 w-16"
								/>
								<div className="flex flex-col">
									<p className="text-lg font-semibold font-libre-caslon">Maeva Cinquin</p>
									<p className="text-xs text-muted-foreground">Maquilleuse Professionnelle</p>
								</div>
							</Link>
							<p className="font-medium text-sm text-muted-foreground mb-4">
								Sublimez votre beauté naturelle avec une maquilleuse diplômée Make Up For Ever Academy.
							</p>
							<div className="space-y-2 text-sm text-muted-foreground">
								<p className="font-medium">📍 Haute-Savoie, France (74) & Suisse (VD)</p>
								<p className="text-xs">Thonon-Les-Bains · Annecy · Genève · Lausanne</p>
							</div>
						</div>

						{/* Navigation Sections */}
						{navigationSections.map(section => (
							<div key={section.title} className="col-span-1">
								<h3 className="mb-4 font-bold text-sm font-kalam">{section.title}</h3>
								<ul className="space-y-3 text-sm text-muted-foreground">
									{section.links.map(link => (
										<li key={link.url} className="font-medium hover:text-primary transition-colors">
											<Link href={link.url}>{link.text}</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Bottom Section */}
					<div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
						<div className="flex flex-col gap-2">
							<p className="text-xs">© {currentYear} Maeva Cinquin - Tous droits réservés</p>
							<p className="text-xs">Maquilleuse professionnelle diplômée & Prothésiste ongulaire en Haute-Savoie</p>
						</div>
						<div className="flex flex-col md:items-end gap-2">
							<ul className="flex gap-4 text-xs">
								<li className="underline hover:text-primary transition-colors">
									<Link href="/mentions-legales">Mentions légales</Link>
								</li>
								<li className="underline hover:text-primary transition-colors">
									<Link href="/sitemap.xml">Plan du site</Link>
								</li>
							</ul>
							<p className="text-xs">
								Developed & Designed with ❤️ by{' '}
								<Link
									href="https://andy-cinquin.fr"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-primary transition-colors underline font-semibold"
								>
									Andy Cinquin
								</Link>
							</p>
						</div>
					</div>
				</footer>
			</div>
		</section>
	)
}
