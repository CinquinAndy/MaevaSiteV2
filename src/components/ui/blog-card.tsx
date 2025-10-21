import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { GlowingEffect } from '@/components/ui/glowing-effect'
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
		<Link href={`/blog/${post.slug}`} className={cn('group block min-h-[28rem]', className)}>
			<div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
				<GlowingEffect
					spread={40}
					glow={true}
					disabled={false}
					proximity={64}
					inactiveZone={0.01}
					borderWidth={3}
					variant="burgundy"
				/>
				<article className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
					{featuredImage?.url && (
						<div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
							<Image
								src={featuredImage.url}
								alt={featuredImage.alt || post.title}
								fill
								className="object-cover transition-transform group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
							{/* Badge catégorie sur l'image */}
							<div className="absolute top-4 left-4">
								<Badge
									variant="secondary"
									className="bg-background/80 backdrop-blur-sm border-border/50 text-foreground"
								>
									{categoryLabels[post.category] || post.category}
								</Badge>
							</div>
						</div>
					)}

					<div className="flex flex-1 flex-col justify-between gap-4 p-6">
						<div className="space-y-4">
							{/* Date et temps de lecture */}
							<div className="flex items-center gap-4 text-xs text-muted-foreground">
								<span className="flex items-center gap-1.5">
									<Calendar className="h-3.5 w-3.5" />
									{publishedDate}
								</span>
								<span className="flex items-center gap-1.5">
									<Clock className="h-3.5 w-3.5" />5 min
								</span>
							</div>

							{/* Titre */}
							<h3 className="text-xl font-libre-caslon-display font-semibold leading-[1.375rem] tracking-[-0.04em] text-balance text-foreground group-hover:text-pink-700 transition-colors md:text-2xl md:leading-[1.875rem] line-clamp-2">
								{post.title}
							</h3>

							{/* Extrait */}
							{post.excerpt && (
								<p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground line-clamp-3">
									{post.excerpt}
								</p>
							)}
						</div>

						{/* CTA */}
						<div className="pt-2 border-t border-border/50">
							<span className="text-sm font-medium text-pink-700 group-hover:text-pink-800 transition-colors flex items-center gap-2">
								Lire l'article
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</span>
						</div>
					</div>
				</article>
			</div>
		</Link>
	)
}
