import config from '@payload-config'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Container } from '@/components/ui/container'
import { GalleryCard } from '@/components/ui/gallery-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'
import type { Gallery } from '@/payload-types'

export async function LatestGallerySection() {
	const payload = await getPayload({ config })

	const { docs: galleries } = await payload.find({
		collection: 'gallery',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: '-publishedDate',
		limit: 4,
	})

	if (galleries.length === 0) {
		return null
	}

	return (
		<Section variant="muted">
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<div className="space-y-3">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground">Mes Dernières Créations</h2>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Découvrez mes réalisations récentes en maquillage et nail art
						</p>
					</div>

					{/* Gallery Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
						{galleries.map(gallery => (
							<GalleryCard key={gallery.id} gallery={gallery as Gallery} />
						))}
					</div>

					{/* CTA */}
					<div className="pt-4">
						<GradientButton asChild>
							<Link href="/galerie" className="z-20 text-foreground">
								Voir toute la galerie
								<IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
							</Link>
						</GradientButton>
					</div>
				</div>
			</Container>
		</Section>
	)
}
