import config from '@payload-config'
import { getPayload } from 'payload'
import Hero from '@/components/home/hero'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ServiceCard } from '@/components/ui/service-card'
import type { Service } from '@/payload-types'

export const metadata = {
	title: 'Prestations - Maeva Cinquin',
	description:
		'Découvrez mes prestations en maquillage professionnel et nail art. Mariages, événements, photo/vidéo, maquillage artistique et formations.',
}

export default async function PrestationsPage() {
	const payload = await getPayload({ config })

	const { docs: services } = await payload.find({
		collection: 'services',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: 'order',
		limit: 100,
	})

	// Grouper les services par catégorie
	const servicesByCategory = services.reduce(
		(acc, service) => {
			const category = service.category
			if (!acc[category]) {
				acc[category] = []
			}
			acc[category].push(service as Service)
			return acc
		},
		{} as Record<string, Service[]>
	)

	const categoryLabels: Record<string, string> = {
		maquillage: 'Maquillage',
		'nail-art': 'Nail Art',
		evenementiel: 'Événementiel',
		formation: 'Formation',
	}

	const categoryOrder = ['maquillage', 'nail-art', 'evenementiel', 'formation']

	return (
		<>
			<Hero title="Prestations" backgroundImage="/Maquilleuse_Professionnelle_Maeva-scaled.jpg" />

			{/* Introduction */}
			<Section className="py-12">
				<Container>
					<div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
						<p className="text-muted-foreground leading-relaxed">
							Diplômée de Make Up For Ever Academy et certifiée prothésiste ongulaire, je mets mon expertise à votre
							service pour sublimer votre beauté lors de vos moments importants. Que ce soit pour un mariage, un
							événement professionnel, une séance photo ou simplement pour vous faire plaisir, je propose des
							prestations personnalisées adaptées à vos besoins.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							Basée en Haute-Savoie, j'interviens à Thonon-les-Bains, Annecy, Genève, Lausanne et leurs environs.
						</p>
					</div>
				</Container>
			</Section>

			{/* Services par catégorie */}
			{categoryOrder.map(category => {
				const categoryServices = servicesByCategory[category]
				if (!categoryServices || categoryServices.length === 0) return null

				return (
					<Section key={category} variant={category === 'maquillage' ? 'default' : 'muted'} className="py-16">
						<Container>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
								{categoryLabels[category]}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
								{categoryServices.map(service => (
									<ServiceCard key={service.id} service={service} />
								))}
							</div>
						</Container>
					</Section>
				)
			})}

			{/* Aucun service */}
			{services.length === 0 && (
				<Section>
					<Container>
						<div className="text-center py-16">
							<p className="text-muted-foreground text-lg">Aucune prestation publiée pour le moment.</p>
							<p className="text-muted-foreground text-sm mt-2">Revenez bientôt pour découvrir mes services !</p>
						</div>
					</Container>
				</Section>
			)}

			{/* Zone d'intervention */}
			<Section variant="muted">
				<Container>
					<div className="max-w-4xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground">Zone d'Intervention</h2>
						<p className="text-lg text-muted-foreground">J'interviens en Haute-Savoie et en Suisse, notamment à :</p>
						<div className="flex flex-wrap justify-center gap-4 text-foreground font-medium">
							<span className="px-4 py-2 bg-primary/10 rounded-full">Thonon-les-Bains</span>
							<span className="px-4 py-2 bg-primary/10 rounded-full">Annecy</span>
							<span className="px-4 py-2 bg-primary/10 rounded-full">Genève</span>
							<span className="px-4 py-2 bg-primary/10 rounded-full">Lausanne</span>
							<span className="px-4 py-2 bg-primary/10 rounded-full">Et environs</span>
						</div>
					</div>
				</Container>
			</Section>

			{/* Call to Action */}
			<Section>
				<Container>
					<div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-br from-primary/10 to-accent/10 p-12 rounded-lg">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground">Prête à vous sublimer ?</h2>
						<p className="text-lg text-muted-foreground">
							Contactez-moi pour discuter de votre projet et recevoir un devis personnalisé.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/contact"
								className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
							>
								Me contacter
							</a>
							<a
								href="tel:+33616625137"
								className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
							>
								Appeler : 06 16 62 51 37
							</a>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
