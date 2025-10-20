import { IconBrandFacebook, IconBrandInstagram, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import { ContactForm } from '@/components/global/contact-form'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export const metadata = {
	title: 'Contact - Maeva Cinquin',
	description:
		'Contactez Maeva Cinquin pour vos projets de maquillage et nail art. Basée en Haute-Savoie, interventions à Thonon, Annecy, Genève et environs.',
}

export default function ContactPage() {
	return (
		<>
			{/* Hero Section */}
			<Section variant="muted" className="py-16 md:py-24">
				<Container>
					<div className="max-w-3xl mx-auto text-center space-y-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Me Contacter</h1>
						<p className="text-lg md:text-xl text-muted-foreground">
							Une question ? Un projet ? Je suis à votre écoute
						</p>
					</div>
				</Container>
			</Section>

			{/* Contact Section */}
			<Section>
				<Container>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
						{/* Colonne gauche - Formulaire */}
						<div className="order-2 lg:order-1">
							<div className="space-y-6">
								<div>
									<h2 className="text-3xl font-bold text-foreground mb-3">Envoyez-moi un message</h2>
									<p className="text-muted-foreground">
										Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.
									</p>
								</div>

								<ContactForm />
							</div>
						</div>

						{/* Colonne droite - Informations */}
						<div className="order-1 lg:order-2 space-y-8">
							<div>
								<h2 className="text-3xl font-bold text-foreground mb-6">Coordonnées</h2>

								<div className="space-y-6">
									{/* Email */}
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
											<IconMail className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-foreground mb-1">Email</h3>
											<a
												href="mailto:maevacinquin1@gmail.com"
												className="text-muted-foreground hover:text-primary transition-colors"
											>
												maevacinquin1@gmail.com
											</a>
										</div>
									</div>

									{/* Téléphone */}
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
											<IconPhone className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
											<a href="tel:+33616625137" className="text-muted-foreground hover:text-primary transition-colors">
												+33 6 16 62 51 37
											</a>
										</div>
									</div>

									{/* Localisation */}
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
											<IconMapPin className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-foreground mb-1">Zone d'intervention</h3>
											<p className="text-muted-foreground">
												Haute-Savoie et Suisse
												<br />
												Thonon-les-Bains, Annecy, Genève, Lausanne et environs
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Réseaux sociaux */}
							<div>
								<h3 className="text-xl font-semibold text-foreground mb-4">Suivez-moi</h3>
								<div className="flex gap-4">
									<a
										href="https://www.instagram.com/makeup.artist.dream"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
									>
										<IconBrandInstagram className="w-5 h-5" />
										<span className="font-medium">Instagram</span>
									</a>
									<a
										href="https://www.facebook.com/Cinquin-maeva"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
									>
										<IconBrandFacebook className="w-5 h-5" />
										<span className="font-medium">Facebook</span>
									</a>
								</div>
							</div>

							{/* Horaires */}
							<div className="bg-muted/30 p-6 rounded-lg">
								<h3 className="text-xl font-semibold text-foreground mb-3">Disponibilité</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									Je travaille sur rendez-vous uniquement. N'hésitez pas à me contacter pour vérifier mes disponibilités
									et discuter de votre projet.
								</p>
							</div>

							{/* Google Maps */}
							<div>
								<h3 className="text-xl font-semibold text-foreground mb-4">Localisation</h3>
								<a
									href="https://g.page/cinquin-maeva?share"
									target="_blank"
									rel="noopener noreferrer"
									className="block rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
								>
									<div className="aspect-video bg-muted flex items-center justify-center">
										<div className="text-center space-y-2">
											<IconMapPin className="w-12 h-12 text-primary mx-auto" />
											<p className="text-sm text-muted-foreground">Voir sur Google Maps</p>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</Container>
			</Section>

			{/* Section CTA */}
			<Section variant="muted">
				<Container>
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground">Pourquoi me choisir ?</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
							<div className="space-y-2">
								<div className="text-4xl">✨</div>
								<h3 className="font-semibold text-foreground">Expertise</h3>
								<p className="text-sm text-muted-foreground">
									Diplômée Make Up For Ever Academy et certifiée prothésiste ongulaire
								</p>
							</div>
							<div className="space-y-2">
								<div className="text-4xl">💎</div>
								<h3 className="font-semibold text-foreground">Personnalisé</h3>
								<p className="text-sm text-muted-foreground">
									Prestations sur-mesure adaptées à vos besoins et à votre style
								</p>
							</div>
							<div className="space-y-2">
								<div className="text-4xl">🌟</div>
								<h3 className="font-semibold text-foreground">Qualité</h3>
								<p className="text-sm text-muted-foreground">
									Produits professionnels haut de gamme et techniques éprouvées
								</p>
							</div>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
