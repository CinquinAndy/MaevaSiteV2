import config from '@payload-config'
import { getPayload } from 'payload'
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

	// Grouper les posts par catégorie pour affichage
	const categories = [
		{ value: 'all', label: 'Tous les articles' },
		{ value: 'conseils-maquillage', label: 'Conseils Maquillage' },
		{ value: 'nail-art', label: 'Nail Art' },
		{ value: 'tutoriels', label: 'Tutoriels' },
		{ value: 'actualites', label: 'Actualités' },
		{ value: 'collections', label: 'Collections' },
		{ value: 'mariages-evenements', label: 'Mariages & Événements' },
	]

	return (
		<>
			{/* Hero Section */}
			<Section variant="muted" className="py-16 md:py-24">
				<Container>
					<div className="max-w-3xl mx-auto text-center space-y-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Blog</h1>
						<p className="text-lg md:text-xl text-muted-foreground">
							Conseils, astuces et actualités sur le maquillage et le nail art
						</p>
					</div>
				</Container>
			</Section>

			{/* Articles Section */}
			<Section>
				<Container>
					<div className="space-y-8">
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

						{/* Articles Grid */}
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
