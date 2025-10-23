import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { FadeInWhenVisible, SlideInFromBottom, StaggerContainer, StaggerItem } from '@/components/animations'
import { CtaSection } from '@/components/home/cta-section'
import Hero from '@/components/home/hero'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { generateServicesListingMetadata } from '@/lib/seo'
import type { Media, Service } from '@/payload-types'

export const metadata = generateServicesListingMetadata()

// ISR - Revalidate toutes les heures
export const revalidate = 3600

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
			<Hero
				title="Prestations"
				backgroundImage="/Maquillage_Artistique_Cirque_Shooting_4.jpg"
				fontSize={480}
				lineHeight={0.5}
			/>

			{/* Introduction */}
			<Section className="py-12">
				<Container>
					<FadeInWhenVisible>
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
					</FadeInWhenVisible>
				</Container>
			</Section>

			{/* Services par catégorie avec Bento Grid */}
			{categoryOrder.map(category => {
				const categoryServices = servicesByCategory[category]
				if (!categoryServices || categoryServices.length === 0) return null

				return (
					<Section key={category} variant={category === 'maquillage' ? 'default' : 'muted'}>
						<Container>
							<SlideInFromBottom>
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
									{categoryLabels[category]}
								</h2>
							</SlideInFromBottom>
							<StaggerContainer staggerDelay={0.15}>
								<BentoGrid>
									{categoryServices.map(service => {
										const typedService = service as Service
										const featuredImage = typedService.featuredImage as Media | undefined
										const gridClass = typedService.gridSize === 'large' ? 'md:col-span-2' : 'md:col-span-1'

										return (
											<StaggerItem key={service.id} className={gridClass}>
												<Link href={`/prestations/${typedService.slug}`} className="block h-full">
													<BentoGridItem
														title={typedService.title}
														description={typedService.shortDescription}
														header={
															featuredImage?.url ? (
																<Image
																	src={featuredImage.url}
																	alt={featuredImage.alt || typedService.title}
																	width={900}
																	height={600}
																	className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
																/>
															) : (
																<div className="h-full w-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800" />
															)
														}
														className="h-full"
													/>
												</Link>
											</StaggerItem>
										)
									})}
								</BentoGrid>
							</StaggerContainer>
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

			{/* Section CTA */}
			<CtaSection />
		</>
	)
}
