import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Blog, Media } from '@/payload-types'

interface BlogCardProps {
	post: Blog
	className?: string
}

const categoryLabels: Record<string, string> = {
	'conseils-maquillage': 'Conseils Maquillage',
	'nail-art': 'Nail Art',
	tutoriels: 'Tutoriels',
	actualites: 'Actualités',
	collections: 'Collections',
	'mariages-evenements': 'Mariages & Événements',
}

export function BlogCard({ post, className }: BlogCardProps) {
	const featuredImage = post.featuredImage as Media | undefined
	const publishedDate = new Date(post.publishedDate).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<Link href={`/blog/${post.slug}`} className={cn('group block', className)}>
			<article className="h-full overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:scale-[1.02]">
				{featuredImage?.url && (
					<div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
						<Image
							src={featuredImage.url}
							alt={featuredImage.alt || post.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
					</div>
				)}

				<div className="p-6 space-y-4">
					<div className="flex items-center gap-2">
						<Badge variant="primary">{categoryLabels[post.category] || post.category}</Badge>
						<time className="text-sm text-muted-foreground">{publishedDate}</time>
					</div>

					<h3 className="text-2xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
						{post.title}
					</h3>

					{post.excerpt && <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>}

					<div className="pt-2">
						<span className="text-sm font-medium text-primary group-hover:underline">Lire la suite →</span>
					</div>
				</div>
			</article>
		</Link>
	)
}
