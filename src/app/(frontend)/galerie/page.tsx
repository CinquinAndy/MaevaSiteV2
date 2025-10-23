import config from '@payload-config'
import { getPayload } from 'payload'
import { CtaSection } from '@/components/home/cta-section'
import Hero from '@/components/home/hero'
import { Container } from '@/components/ui/container'
import { GaleryCard } from '@/components/ui/galery-card'
import { Section } from '@/components/ui/section'
import { generateGaleryListingMetadata } from '@/lib/seo'
import type { Galery } from '@/payload-types'

export const metadata = generateGaleryListingMetadata()

// ISR - Revalidate toutes les heures
export const revalidate = 3600

export default async function GaleriePage() {
	const payload = await getPayload({ config })

	const { docs: galeries } = await payload.find({
		collection: 'galery',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: '-publishedDate',
		limit: 100,
	})

	return (
		<>
			<Hero title="Galerie" backgroundImage="/Fond_Mae.jpg" fontSize={600} lineHeight={0.5} />

			{/* Galleries Section */}
			<Section>
				<Container>
					<div className="space-y-8">
						{galeries.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
								{galeries.map(galery => (
									<GaleryCard key={galery.id} galery={galery as Galery} />
								))}
							</div>
						) : (
							<div className="text-center py-16">
								<p className="text-muted-foreground text-lg">Aucune galerie publiée pour le moment.</p>
								<p className="text-muted-foreground text-sm mt-2">Revenez bientôt pour découvrir mes créations !</p>
							</div>
						)}
					</div>
				</Container>
			</Section>

			{/* Section CTA */}
			<CtaSection />
		</>
	)
}
