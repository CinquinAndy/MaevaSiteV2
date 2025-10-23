import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { ContactForm } from '@/components/global/contact-form'
import { CtaSection } from '@/components/home/cta-section'
import Hero from '@/components/home/hero'
import { ContactCard } from '@/components/ui/contact-card'
import { Container } from '@/components/ui/container'
import { InteractiveMap } from '@/components/ui/interactive-map'
import { Section } from '@/components/ui/section'
import { generateContactMetadata } from '@/lib/seo'

export const metadata = generateContactMetadata()

// ISR - Revalidate toutes les heures
export const revalidate = 3600

export default function ContactPage() {
	return (
		<>
			<Hero title="Contact" backgroundImage="/image00003.jpeg" fontSize={600} lineHeight={0.5} />

			{/* Contact Card Section */}
			<Section>
				<Container>
					<ContactCard
						title="Contactez-moi"
						description="Que ce soit pour un mariage, un événement, une séance photo ou tout autre projet artistique, je suis à votre écoute. Remplissez le formulaire et je vous répondrai dans les plus brefs délais."
						contactInfo={[
							{
								icon: Mail,
								label: 'Email',
								value: (
									<Link
										href="mailto:maevacinquin1@gmail.com"
										className="text-muted-foreground hover:text-primary transition-colors text-xs"
									>
										maevacinquin1@gmail.com
									</Link>
								),
							},
							{
								icon: Phone,
								label: 'Téléphone',
								value: (
									<Link
										href="tel:+33616625137"
										className="text-muted-foreground hover:text-primary transition-colors text-xs"
									>
										+33 6 16 62 51 37
									</Link>
								),
							},
							{
								icon: MapPin,
								label: "Zone d'intervention",
								value: (
									<span className="text-muted-foreground text-xs">Haute-Savoie, Genève, Lausanne et environs</span>
								),
								className: 'col-span-2',
							},
						]}
					>
						<ContactForm />
					</ContactCard>
				</Container>
			</Section>

			{/* Additional Info Section */}
			<Section className="py-12">
				<Container>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Réseaux sociaux */}
						<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
							<h3 className="text-2xl font-bold text-foreground mb-6 font-libre-caslon-display">
								Suivez mon actualité
							</h3>
							<div className="space-y-4">
								<Link
									href="https://www.instagram.com/makeup.artist.dream"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-4 px-6 py-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-[1.02] group"
								>
									<Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
									<div className="flex-1">
										<span className="font-semibold block">Instagram</span>
										<span className="text-xs text-muted-foreground">@makeup.artist.dream</span>
									</div>
								</Link>
								<Link
									href="https://www.facebook.com/Cinquin-maeva"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-4 px-6 py-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-[1.02] group"
								>
									<Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
									<div className="flex-1">
										<span className="font-semibold block">Facebook</span>
										<span className="text-xs text-muted-foreground">Cinquin-maeva</span>
									</div>
								</Link>
							</div>
							<div className="mt-8 p-6 rounded-xl bg-muted/40 border border-border/50">
								<h4 className="font-semibold text-foreground mb-2 font-libre-caslon-display">Disponibilité</h4>
								<p className="text-muted-foreground text-sm leading-relaxed">
									Je travaille sur rendez-vous uniquement. N'hésitez pas à me contacter pour vérifier mes disponibilités
									et discuter de votre projet.
								</p>
							</div>
						</div>

						{/* Carte Interactive */}
						<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
							<h3 className="text-2xl font-bold text-foreground mb-6 font-libre-caslon-display">Zone d'intervention</h3>
							<div className="rounded-xl overflow-hidden border-2 border-border/50 shadow-md h-[400px]">
								<InteractiveMap className="h-full w-full" />
							</div>
							<div className="mt-6 space-y-3 text-sm text-muted-foreground">
								<p className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
									Studio principal à Thonon-les-Bains
								</p>
								<p className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
									Déplacements en Haute-Savoie (Annecy et environs)
								</p>
								<p className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
									Interventions en Suisse (Genève, Lausanne)
								</p>
								<p className="flex items-center gap-2 pt-2 border-t border-border/50">
									<MapPin className="w-4 h-4 text-primary" />
									<span className="text-xs">Zone de couverture : rayon de 50km autour de Thonon-les-Bains</span>
								</p>
							</div>
						</div>
					</div>
				</Container>
			</Section>

			{/* Section CTA */}
			<CtaSection />
		</>
	)
}
