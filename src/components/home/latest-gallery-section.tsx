import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import { CircularGalleries } from '@/components/ui/circular-galleries'
import { Container } from '@/components/ui/container'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'
import type { Gallery, Media } from '@/payload-types'

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
		limit: 5,
	})

	if (galleries.length === 0) {
		return null
	}

	// Transform galleries for CircularGalleries component
	const galleryItems = galleries
		.map(gallery => {
			const typedGallery = gallery as Gallery
			const coverImage = typedGallery.coverImage as Media | undefined
			if (!coverImage?.url) return null

			return {
				title: typedGallery.title,
				category: typedGallery.category || 'Maquillage',
				image: coverImage.url,
				href: `/galerie/${typedGallery.slug}`,
			}
		})
		.filter((item): item is NonNullable<typeof item> => item !== null)

	if (galleryItems.length === 0) {
		return null
	}

	return (
		<Section variant="muted">
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div className="space-y-3">
							<h2 className="text-4xl md:text-5xl font-bold text-foreground">Mes Dernières Créations</h2>
							<p className="text-lg text-muted-foreground max-w-2xl">
								Découvrez mes réalisations récentes en maquillage et nail art
							</p>
						</div>
						<GradientButton asChild className="md:shrink-0">
							<Link href="/galerie" className="z-20 text-foreground">
								Voir toute la galerie
							</Link>
						</GradientButton>
					</div>

					{/* Circular Galleries */}
					<div className="flex items-center justify-center py-8">
						<CircularGalleries galleries={galleryItems} autoplay={true} />
					</div>
				</div>
			</Container>
		</Section>
	)
}
