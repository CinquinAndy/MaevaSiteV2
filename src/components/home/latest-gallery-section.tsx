import config from '@payload-config'
import { getPayload } from 'payload'
import { GalleryCarousel } from '@/components/home/gallery-carousel'
import type { Gallery, Media } from '@/payload-types'

// Category display names mapping
const categoryLabels: Record<string, string> = {
	mariage: 'Mariage',
	artistique: 'Maquillage Artistique',
	'nail-art': 'Nail Art',
	evenementiel: 'Événementiel',
	'photo-video': 'Photo/Vidéo',
	collections: 'Collections',
}

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
		limit: 6,
	})

	if (galleries.length === 0) {
		return null
	}

	// Transform galleries for GalleryCarousel component
	const galleryItems = galleries
		.map(gallery => {
			const typedGallery = gallery as Gallery
			const coverImage = typedGallery.coverImage as Media | undefined
			if (!coverImage?.url) return null

			return {
				id: String(typedGallery.id),
				title: typedGallery.title,
				description: typedGallery.description || 'Découvrez cette création',
				category: categoryLabels[typedGallery.category] || typedGallery.category,
				image: coverImage.url,
				href: `/galerie/${typedGallery.slug}`,
			}
		})
		.filter((item): item is NonNullable<typeof item> => item !== null)

	if (galleryItems.length === 0) {
		return null
	}

	return <GalleryCarousel items={galleryItems} />
}
