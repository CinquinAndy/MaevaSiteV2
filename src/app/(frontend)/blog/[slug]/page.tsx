import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { FadeIn, FadeInWhenVisible, ScaleIn, SlideInFromBottom } from '@/components/animations'
import { Blob2, Blob3, Blob4, Blob6, Blob8, Blob9 } from '@/components/blobs/blobs'
import { BlogArticleGrid } from '@/components/blog/BlogArticleGrid'
import { Badge } from '@/components/ui/badge'
import { generateBlogPostJsonLd, generateBlogPostMetadata } from '@/lib/seo'
import type { Blog, Media } from '@/payload-types'

const categoryLabels: Record<string, string> = {
	'conseils-maquillage': 'Conseils Maquillage',
	'nail-art': 'Nail Art',
	tutoriels: 'Tutoriels',
	actualites: 'Actualités',
	collections: 'Collections',
	'mariages-evenements': 'Mariages & Événements',
}

// ISR - Revalidate toutes les heures
export const revalidate = 3600

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'blog',
		where: {
			slug: {
				equals: slug,
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

	const featuredImage = post.featuredImage as Media | undefined

	return generateBlogPostMetadata({
		title: post.title,
		excerpt: post.excerpt ?? undefined,
		featuredImage: featuredImage?.url ?? undefined,
		slug: post.slug,
		publishedDate: post.publishedDate ?? undefined,
		seoTitle: post.seo_title ?? undefined,
		seoDescription: post.seo_description ?? undefined,
	})
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'blog',
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

	const jsonLd = generateBlogPostJsonLd({
		title: post.title,
		excerpt: post.excerpt ?? undefined,
		featuredImage: featuredImage?.url ?? undefined,
		slug: post.slug,
		publishedDate: post.publishedDate ?? undefined,
	})

	return (
		<>
			{/* JSON-LD Schema pour SEO */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{/* Hero Banner */}
			<FadeIn>
				<div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
					{/* Background Image */}
					{featuredImage?.url && (
						<Image
							src={featuredImage.url}
							alt={featuredImage.alt || post.title}
							fill
							className="object-cover grayscale brightness-75"
							priority
						/>
					)}

					{/* Blobs décoratifs dans le hero */}
					<div className="absolute left-10 top-20 z-10 animate-float-slow opacity-60 hidden md:block">
						<Blob2 />
					</div>
					<div className="absolute right-16 bottom-24 z-10 animate-float-medium delay-1000 opacity-70 hidden md:block">
						<Blob4 />
					</div>

					{/* Content Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-20" />

					{/* Title & Metadata */}
					<div className="absolute bottom-0 left-0 right-0 z-30 pb-8 px-6 lg:px-12">
						<div className="max-w-7xl mx-auto">
							{/* Breadcrumb */}
							<SlideInFromBottom delay={0.2}>
								<nav className="mb-4">
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
							</SlideInFromBottom>

							{/* Category & Date */}
							<ScaleIn delay={0.3}>
								<div className="flex flex-wrap items-center gap-3 mb-4">
									<Badge variant="primary">{categoryLabels[post.category] || post.category}</Badge>
									<time className="text-sm text-muted-foreground">{publishedDate}</time>
								</div>
							</ScaleIn>

							{/* Title */}
							<SlideInFromBottom delay={0.4}>
								<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground font-corinthia mb-4">
									{post.title}
								</h1>
							</SlideInFromBottom>

							{/* Excerpt */}
							{post.excerpt && (
								<FadeInWhenVisible>
									<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{post.excerpt}</p>
								</FadeInWhenVisible>
							)}
						</div>
					</div>
				</div>
			</FadeIn>

			{/* Article Content Section */}
			<div className="relative isolate bg-background">
				{/* Blobs décoratifs dans le contenu - Gauche */}
				<div className="absolute  left-4 top-32 z-0 animate-float-slow delay-500 opacity-40 hidden lg:block">
					<Blob3 />
				</div>
				<div className="absolute left-8 top-96 z-0 animate-float-medium delay-1500 opacity-50 hidden lg:block">
					<Blob6 />
				</div>
				<div className="absolute left-12 top-[800px] z-0 animate-float-slow delay-2500 opacity-45 hidden lg:block">
					<Blob8 />
				</div>

				{/* Blobs décoratifs dans le contenu - Droite */}
				<div className="absolute right-8 top-64 z-0 animate-float-medium delay-1000 opacity-40 hidden lg:block">
					<Blob9 />
				</div>
				<div className="absolute right-4 top-[600px] z-0 animate-float-slow delay-2000 opacity-50 hidden lg:block">
					<Blob2 />
				</div>
				<div className="absolute right-10 top-[1000px] z-0 animate-float-medium delay-3000 opacity-45 hidden lg:block">
					<Blob4 />
				</div>

				{/* Main Grid Layout */}
				<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 relative">
					<FadeInWhenVisible>
						<BlogArticleGrid post={post} featuredImage={featuredImage} />
					</FadeInWhenVisible>

					{/* Bottom Section - Navigation */}
					<SlideInFromBottom>
						<div className="mt-12">
							{/* Back to Blog */}
							<div className="pt-8 border-t border-border">
								<Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
									← Retour au blog
								</Link>
							</div>
						</div>
					</SlideInFromBottom>
				</div>
			</div>
		</>
	)
}
