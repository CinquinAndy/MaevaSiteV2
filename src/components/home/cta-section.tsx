import { IconMail, IconPhone } from '@tabler/icons-react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export function CtaSection() {
	return (
		<Section>
			<Container>
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-8 md:p-12 lg:p-16">
					{/* Background decoration */}
					<div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />

					<div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
							Prête à révéler votre beauté ?
						</h2>

						<p className="text-lg md:text-xl text-muted-foreground">
							Que ce soit pour votre mariage, un événement spécial ou simplement pour vous faire plaisir, je suis là
							pour sublimer votre beauté naturelle.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
							<Link
								href="/contact"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium shadow-lg"
							>
								<IconMail className="w-5 h-5" />
								Demander un devis
							</Link>

							<a
								href="tel:+33616625137"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all hover:scale-105 font-medium shadow-lg"
							>
								<IconPhone className="w-5 h-5" />
								06 16 62 51 37
							</a>
						</div>

						<div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Diplômée MUFE Academy</span>
							</div>
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Prestations personnalisées</span>
							</div>
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Haute-Savoie & Suisse</span>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	)
}
