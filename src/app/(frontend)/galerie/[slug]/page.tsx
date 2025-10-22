import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Badge } from '@/components/ui/badge'
import { BentoGallery } from '@/components/ui/bento-gallery'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Gallery, Media } from '@/payload-types'

const categoryLabels: Record<string, string> = {
	mariage: 'Mariage',
	artistique: 'Maquillage Artistique',
	'nail-art': 'Nail Art',
	evenementiel: 'Événementiel',
	'photo-video': 'Photo/Vidéo',
	collections: 'Collections',
}

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: galleries } = await payload.find({
		collection: 'gallery',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return galleries.map(gallery => ({
		slug: gallery.slug,
	}))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'gallery',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const gallery = docs[0] as Gallery | undefined

	if (!gallery) {
		return {
			title: 'Galerie non trouvée',
		}
	}

	return {
		title: gallery.seo_title || `${gallery.title} - Galerie Maeva Cinquin`,
		description:
			gallery.seo_description || gallery.description || `Découvrez la galerie ${gallery.title} de Maeva Cinquin`,
	}
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'gallery',
		where: {
			slug: {
				equals: slug,
			},
			status: {
				equals: 'published',
			},
		},
		limit: 1,
	})

	const gallery = docs[0] as Gallery | undefined

	if (!gallery) {
		notFound()
	}

	const coverImage = gallery.coverImage as Media | undefined
	const publishedDate = new Date(gallery.publishedDate).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	const imageCount = gallery.images?.length || 0

	return (
		<>
			{/* Gallery Header */}
			<Section variant="muted" className="py-12 md:py-16">
				<Container>
					<div className="max-w-4xl mx-auto">
						{/* Breadcrumb */}
						<nav className="mb-6">
							<ol className="flex items-center gap-2 text-sm text-muted-foreground">
								<li>
									<Link href="/" className="hover:text-foreground transition-colors">
										Accueil
									</Link>
								</li>
								<li>/</li>
								<li>
									<Link href="/galerie" className="hover:text-foreground transition-colors">
										Galerie
									</Link>
								</li>
								<li>/</li>
								<li className="text-foreground">{gallery.title}</li>
							</ol>
						</nav>

						{/* Metadata */}
						<div className="flex flex-wrap items-center gap-3 mb-6">
							<Badge variant="primary">{categoryLabels[gallery.category] || gallery.category}</Badge>
							<span className="text-sm text-muted-foreground">
								{imageCount} {imageCount === 1 ? 'photo' : 'photos'}
							</span>
							{gallery.location && <span className="text-sm text-muted-foreground">• {gallery.location}</span>}
							<time className="text-sm text-muted-foreground">• {publishedDate}</time>
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{gallery.title}</h1>

						{/* Description */}
						{gallery.description && (
							<p className="text-xl text-muted-foreground leading-relaxed">{gallery.description}</p>
						)}
					</div>
				</Container>
			</Section>

			{/* Gallery Images */}
			<Section>
				<Container>
					<div className="max-w-7xl mx-auto">
						{/* Cover Image en hero si disponible */}
						{coverImage?.url && (
							<div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted mb-12 shadow-2xl">
								<Image
									src={coverImage.url}
									alt={coverImage.alt || gallery.title}
									fill
									className="object-cover"
									priority
								/>
								{/* Gradient overlay pour un effet élégant */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
							</div>
						)}

						{/* Bento Gallery */}
						{gallery.images && gallery.images.length > 0 && (
							<BentoGallery
								images={gallery.images.map(item => ({
									image: item.image as Media,
									caption: item.caption,
									id: item.id,
								}))}
							/>
						)}

						{/* Back to Gallery */}
						<div className="mt-16 pt-8 border-t border-border/50">
							<Link
								href="/galerie"
								className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
							>
								<svg
									className="w-5 h-5 transition-transform group-hover:-translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
								Retour à la galerie
							</Link>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
