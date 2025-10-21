import config from '@payload-config'
import { getPayload } from 'payload'
import Hero from '@/components/home/hero'
import { BlogCard } from '@/components/ui/blog-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Blog } from '@/payload-types'

export const metadata = {
	title: 'Blog - Maeva Cinquin',
	description:
		'Découvrez mes conseils et astuces en maquillage, nail art et beauté. Articles, tutoriels et actualités du monde de la beauté.',
}

export default async function BlogPage() {
	const payload = await getPayload({ config })

	const { docs: posts } = await payload.find({
		collection: 'blog',
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
			<Hero title="Blog" fontSize={700} lineHeight={0.5} />

			{/* Articles Section */}
			<Section className="py-12 md:py-16 lg:py-20">
				<Container>
					<div className="space-y-12">
						{/* En-tête de section */}
						<div className="max-w-2xl mx-auto text-center space-y-4">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground">Derniers Articles</h2>
							<p className="text-muted-foreground text-lg">
								Découvrez mes conseils, astuces et actualités dans le monde du maquillage et du nail art
							</p>
						</div>

						{/* Catégories - Pour future implémentation de filtrage client-side */}
						{/* <div className="flex flex-wrap gap-2 justify-center">
							{categories.map((cat) => (
								<button
									key={cat.value}
									className="px-4 py-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
								>
									{cat.label}
								</button>
							))}
						</div> */}

						{/* Articles Grid avec effet glowing */}
						{posts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
								{posts.map(post => (
									<BlogCard key={post.id} post={post as Blog} />
								))}
							</div>
						) : (
							<div className="text-center py-16">
								<p className="text-muted-foreground text-lg">Aucun article publié pour le moment.</p>
								<p className="text-muted-foreground text-sm mt-2">Revenez bientôt pour découvrir nos contenus !</p>
							</div>
						)}
					</div>
				</Container>
			</Section>
		</>
	)
}
