import config from '@payload-config'
import { getPayload } from 'payload'
import Hero from '@/components/home/hero'
import { Container } from '@/components/ui/container'
import { GalleryCard } from '@/components/ui/gallery-card'
import { Section } from '@/components/ui/section'
import type { Gallery } from '@/payload-types'

export const metadata = {
	title: 'Galerie - Maeva Cinquin',
	description:
		'Découvrez mes réalisations en maquillage et nail art. Mariages, événements, maquillage artistique et plus encore.',
}

export default async function GaleriePage() {
	const payload = await getPayload({ config })

	const { docs: galleries } = await payload.find({
		collection: 'gallery',
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
			<Hero title="Galerie" backgroundImage="/Maquilleuse_Professionnelle_Maeva-scaled.jpg" />

			{/* Galleries Section */}
			<Section>
				<Container>
					<div className="space-y-8">
						{galleries.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
								{galleries.map(gallery => (
									<GalleryCard key={gallery.id} gallery={gallery as Gallery} />
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
		</>
	)
}
