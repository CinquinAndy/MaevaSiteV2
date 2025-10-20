import config from '@payload-config'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { BlogCard } from '@/components/ui/blog-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Blog } from '@/payload-types'

export async function LatestBlogSection() {
	const payload = await getPayload({ config })

	const { docs: posts } = await payload.find({
		collection: 'blog',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: '-publishedDate',
		limit: 3,
	})

	if (posts.length === 0) {
		return null
	}

	return (
		<Section>
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<div className="text-center space-y-4">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground">Derniers Articles</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Découvrez mes conseils, astuces et actualités sur le maquillage et le nail art
						</p>
					</div>

					{/* Articles Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{posts.map(post => (
							<BlogCard key={post.id} post={post as Blog} />
						))}
					</div>

					{/* CTA */}
					<div className="text-center pt-4">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium group"
						>
							Voir tous les articles
							<IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>
			</Container>
		</Section>
	)
}
