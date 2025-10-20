import { IconAward, IconBriefcase, IconHeart, IconMapPin } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'

export function AboutSection() {
	return (
		<Section variant="muted" className="relative">
			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Colonne gauche - Image */}
					<div className="order-2 lg:order-1 rotate-6">
						<div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
							{/* Placeholder pour l'image de Maeva */}
							{/* <div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center space-y-4">
									<div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
										<IconHeart className="w-16 h-16 text-primary" stroke={1.5} />
									</div>
									<p className="text-sm text-muted-foreground">Photo de profil à venir</p>
								</div>
							</div> */}
							<Image
								src="/image00002.jpeg"
								alt="Maeva Cinquin"
								width={1200}
								height={1600}
								className="w-full h-full object-cover -rotate-6 scale-115"
							/>
						</div>
					</div>

					{/* Colonne droite - Contenu */}
					<div className="order-1 lg:order-2 space-y-6">
						<div className="space-y-3">
							<h2 className="text-4xl md:text-5xl font-bold text-foreground">Qui suis-je ?</h2>
							<div className="h-1 w-20 bg-primary rounded-full" />
						</div>

						<div className="space-y-4 text-muted-foreground leading-relaxed">
							<p>
								Passionnée par le monde de la beauté, je suis{' '}
								<strong className="text-foreground">maquilleuse professionnelle</strong> et{' '}
								<strong className="text-foreground">prothésiste ongulaire</strong> diplômée.
							</p>
							<p>
								Formée à la prestigieuse <strong className="text-foreground">Make Up For Ever Academy</strong> à Nice
								pendant 10 mois intensifs, j'ai acquis une expertise complète en maquillage beauté, artistique et
								événementiel.
							</p>
							<p>
								Mon objectif ? <strong className="text-foreground">Sublimer votre beauté naturelle</strong> et créer des
								looks qui vous ressemblent, que ce soit pour votre mariage, un événement spécial, une séance photo ou
								simplement pour vous faire plaisir.
							</p>
						</div>

						{/* Points forts */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
									<IconAward className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground text-sm font-kalam">Formation d'excellence</h3>
									<p className="text-sm text-muted-foreground">Make Up For Ever Academy</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
									<IconBriefcase className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground text-sm font-kalam">Double expertise</h3>
									<p className="text-sm text-muted-foreground">Maquillage & Nail Art</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
									<IconMapPin className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground text-sm font-kalam">Zone d'intervention</h3>
									<p className="text-sm text-muted-foreground">Haute-Savoie & Suisse</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
									<IconHeart className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground text-sm font-kalam">Approche personnalisée</h3>
									<p className="text-sm text-muted-foreground">À votre écoute</p>
								</div>
							</div>
						</div>

						{/* CTA */}
						<div className="flex flex-col sm:flex-row gap-4 pt-4">
							<GradientButton asChild>
								<Link href="/prestations" className="z-20 text-white">
									Découvrir mes prestations
								</Link>
							</GradientButton>
							<GradientButton asChild variant="secondary">
								<Link href="/contact" className="z-20 text-white">
									Me contacter
								</Link>
							</GradientButton>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	)
}
