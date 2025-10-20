import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Blog, Media } from '@/payload-types'

const categoryLabels: Record<string, string> = {
	'conseils-maquillage': 'Conseils Maquillage',
	'nail-art': 'Nail Art',
	tutoriels: 'Tutoriels',
	actualites: 'Actualités',
	collections: 'Collections',
	'mariages-evenements': 'Mariages & Événements',
}

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: posts } = await payload.find({
		collection: 'blog',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return posts.map(post => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'blog',
		where: {
			slug: {
				equals: params.slug,
			},
		},
		limit: 1,
	})

	const post = docs[0] as Blog | undefined

	if (!post) {
		return {
			title: 'Article non trouvé',
		}
	}

	return {
		title: post.seo_title || `${post.title} - Blog Maeva Cinquin`,
		description:
			post.seo_description || post.excerpt || `Découvrez l'article ${post.title} sur le blog de Maeva Cinquin`,
	}
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'blog',
		where: {
			slug: {
				equals: params.slug,
			},
			status: {
				equals: 'published',
			},
		},
		limit: 1,
	})

	const post = docs[0] as Blog | undefined

	if (!post) {
		notFound()
	}

	const featuredImage = post.featuredImage as Media | undefined
	const publishedDate = new Date(post.publishedDate).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<>
			{/* Article Header */}
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
									<Link href="/blog" className="hover:text-foreground transition-colors">
										Blog
									</Link>
								</li>
								<li>/</li>
								<li className="text-foreground">{post.title}</li>
							</ol>
						</nav>

						{/* Metadata */}
						<div className="flex flex-wrap items-center gap-3 mb-6">
							<Badge variant="primary">{categoryLabels[post.category] || post.category}</Badge>
							<time className="text-sm text-muted-foreground">{publishedDate}</time>
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{post.title}</h1>

						{/* Excerpt */}
						{post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>}
					</div>
				</Container>
			</Section>

			{/* Featured Image */}
			{featuredImage?.url && (
				<Section className="py-0">
					<Container>
						<div className="max-w-5xl mx-auto">
							<div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
								<Image
									src={featuredImage.url}
									alt={featuredImage.alt || post.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>
					</Container>
				</Section>
			)}

			{/* Article Content */}
			<Section>
				<Container>
					<article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-corinthia prose-h2:text-4xl prose-h3:text-3xl prose-p:font-kalam prose-p:leading-relaxed prose-a:text-primary hover:prose-a:underline">
						{/* TODO: Render Lexical richText content */}
						{/* For now, displaying a placeholder */}
						<div className="text-muted-foreground">
							<p>Contenu de l'article à rendre ici avec le composant Lexical.</p>
							<p className="text-sm italic mt-4">
								Note technique : Le contenu richText de Payload CMS nécessite un composant de rendu Lexical approprié.
							</p>
						</div>
					</article>

					{/* Tags */}
					{post.tags && post.tags.length > 0 && (
						<div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
							<div className="flex flex-wrap gap-2">
								<span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
								{post.tags.map((item, index) => (
									<Badge key={index} variant="outline">
										{item.tag}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Back to Blog */}
					<div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
						<Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
							← Retour au blog
						</Link>
					</div>
				</Container>
			</Section>
		</>
	)
}
