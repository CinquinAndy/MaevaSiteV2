import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Gallery, Media } from '@/payload-types'

interface GalleryCardProps {
	gallery: Gallery
	className?: string
}

const categoryLabels: Record<string, string> = {
	mariage: 'Mariage',
	artistique: 'Maquillage Artistique',
	'nail-art': 'Nail Art',
	evenementiel: 'Événementiel',
	'photo-video': 'Photo/Vidéo',
	collections: 'Collections',
}

export function GalleryCard({ gallery, className }: GalleryCardProps) {
	const coverImage = gallery.coverImage as Media | undefined
	const imageCount = gallery.images?.length || 0

	return (
		<Link href={`/galerie/${gallery.slug}`} className={cn('group block', className)}>
			<article className="h-full overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:scale-[1.02]">
				{coverImage?.url && (
					<div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
						<Image
							src={coverImage.url}
							alt={coverImage.alt || gallery.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

						<div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
							<Badge variant="accent" className="mb-2">
								{categoryLabels[gallery.category] || gallery.category}
							</Badge>
							<h3 className="text-xl font-semibold line-clamp-2">{gallery.title}</h3>
						</div>
					</div>
				)}

				<div className="p-4 space-y-2">
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>
							{imageCount} {imageCount === 1 ? 'photo' : 'photos'}
						</span>
						{gallery.location && <span>{gallery.location}</span>}
					</div>

					{gallery.description && (
						<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{gallery.description}</p>
					)}
				</div>
			</article>
		</Link>
	)
}
