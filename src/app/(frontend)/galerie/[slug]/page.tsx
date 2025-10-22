import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Blob3, Blob5, Blob6, Blob7, Blob8, Blob9 } from '@/components/blobs/blobs'
import { Badge } from '@/components/ui/badge'
import { BentoGalery } from '@/components/ui/bento-galery'
import { generateGaleryItemMetadata, generateGaleryJsonLd } from '@/lib/seo'
import type { Galery, Media } from '@/payload-types'

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
		collection: 'galery',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return galleries.map(galery => ({
		slug: galery.slug,
	}))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'galery',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const galery = docs[0] as Galery | undefined

	if (!galery) {
		return {
			title: 'Galerie non trouvée',
		}
	}

	const coverImage = galery.coverImage as Media | undefined

	return generateGaleryItemMetadata({
		title: galery.title,
		description: galery.description ?? undefined,
		coverImage: coverImage?.url ?? undefined,
		slug: galery.slug,
		publishedDate: galery.publishedDate ?? undefined,
		seoTitle: galery.seo_title ?? undefined,
		seoDescription: galery.seo_description ?? undefined,
	})
}

export default async function GaleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'galery',
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

	const galery = docs[0] as Galery | undefined

	if (!galery) {
		notFound()
	}

	const coverImage = galery.coverImage as Media | undefined
	const publishedDate = new Date(galery.publishedDate).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	const imageCount = galery.images?.length || 0

	const jsonLd = generateGaleryJsonLd({
		title: galery.title,
		description: galery.description ?? undefined,
		slug: galery.slug,
		images:
			galery.images?.map(item => {
				const img = item.image as Media
				return img.url || ''
			}) || [],
	})

	return (
		<>
			{/* JSON-LD Schema pour SEO */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{/* Hero Banner */}
			<div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
				{/* Background Image */}
				{coverImage?.url && (
					<Image
						src={coverImage.url}
						alt={coverImage.alt || galery.title}
						fill
						className="object-cover grayscale brightness-75"
						priority
					/>
				)}

				{/* Blobs décoratifs dans le hero */}
				<div className="absolute left-8 top-16 z-10 animate-float-slow opacity-50 hidden md:block">
					<Blob5 />
				</div>
				<div className="absolute right-12 bottom-20 z-10 animate-float-medium delay-1000 opacity-60 hidden md:block">
					<Blob7 />
				</div>

				{/* Content Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-20" />

				{/* Title & Metadata */}
				<div className="absolute bottom-0 left-0 right-0 z-30 pb-8 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto">
						{/* Breadcrumb */}
						<nav className="mb-4">
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
								<li className="text-foreground">{galery.title}</li>
							</ol>
						</nav>

						{/* Category & Metadata */}
						<div className="flex flex-wrap items-center gap-3 mb-4">
							<Badge variant="primary">{categoryLabels[galery.category] || galery.category}</Badge>
							<span className="text-sm text-muted-foreground">
								{imageCount} {imageCount === 1 ? 'photo' : 'photos'}
							</span>
							<time className="text-sm text-muted-foreground">• {publishedDate}</time>
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground font-corinthia mb-4">
							{galery.title}
						</h1>

						{/* Description */}
						{galery.description && (
							<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{galery.description}</p>
						)}
					</div>
				</div>
			</div>

			{/* Galery Content Section */}
			<div className="relative isolate bg-background">
				{/* Background Pattern SVG - Couleurs adaptées pour la galerie */}
				<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
					<svg
						aria-hidden="true"
						className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-accent/15"
					>
						<defs>
							<pattern x="50%" y={-1} id="galery-pattern" width={200} height={200} patternUnits="userSpaceOnUse">
								<path d="M100 200V.5M.5 .5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-accent/10">
							<path
								d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect fill="url(#galery-pattern)" width="100%" height="100%" strokeWidth={0} />
					</svg>
				</div>

				{/* Blobs décoratifs dans le contenu - Gauche */}
				<div className="absolute left-6 top-32 z-0 animate-float-slow delay-500 opacity-35 hidden lg:block">
					<Blob6 />
				</div>
				<div className="absolute left-10 top-96 z-0 animate-float-medium delay-1500 opacity-45 hidden lg:block">
					<Blob8 />
				</div>
				<div className="absolute left-4 top-[800px] z-0 animate-float-slow delay-2500 opacity-40 hidden lg:block">
					<Blob3 />
				</div>

				{/* Blobs décoratifs dans le contenu - Droite */}
				<div className="absolute right-10 top-64 z-0 animate-float-medium delay-1000 opacity-35 hidden lg:block">
					<Blob9 />
				</div>
				<div className="absolute right-6 top-[600px] z-0 animate-float-slow delay-2000 opacity-45 hidden lg:block">
					<Blob5 />
				</div>
				<div className="absolute right-8 top-[1000px] z-0 animate-float-medium delay-3000 opacity-40 hidden lg:block">
					<Blob7 />
				</div>

				{/* Main Grid Layout */}
				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative">
					<div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
						{/* Left Column - Galery Information */}
						<div className="lg:pr-8">
							<div className="space-y-8">
								{/* Extended Description if available */}
								<div className="prose prose-lg max-w-none">
									{galery.description && (
										<div className="text-lg text-foreground/90 leading-relaxed font-kalam">
											<p>{galery.description}</p>
										</div>
									)}
								</div>

								{/* Additional Information */}
								<div className="space-y-6 pt-8 border-t border-border">
									<div className="flex flex-col gap-4">
										{/* Category */}
										<div>
											<h3 className="text-sm font-medium text-muted-foreground font-libre-caslon-display mb-2">
												Catégorie
											</h3>
											<Badge variant="secondary" className="text-base">
												{categoryLabels[galery.category] || galery.category}
											</Badge>
										</div>

										{/* Image Count */}
										<div>
											<h3 className="text-sm font-medium text-muted-foreground font-libre-caslon-display mb-2">
												Collection
											</h3>
											<p className="text-base text-foreground">
												{imageCount} {imageCount === 1 ? 'photographie' : 'photographies'}
											</p>
										</div>

										{/* Published Date */}
										<div>
											<h3 className="text-sm font-medium text-muted-foreground font-libre-caslon-display mb-2">
												Date de publication
											</h3>
											<p className="text-base text-foreground">{publishedDate}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Sticky Cover Image */}
						{coverImage?.url && (
							<div>
								<div className="sticky top-24 h-auto w-full rounded-xl bg-card shadow-2xl ring-1 ring-border overflow-hidden">
									<div className="relative aspect-[4/3] w-full">
										<Image
											src={coverImage.url}
											alt={coverImage.alt || galery.title}
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 50vw"
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Galery Images Section */}
					<div className="mt-24">
						<div className="mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground font-corinthia mb-4">
								Découvrez la collection
							</h2>
						</div>

						{/* Bento Galery */}
						{galery.images && galery.images.length > 0 && (
							<BentoGalery
								images={galery.images.map(item => ({
									image: item.image as Media,
									caption: item.caption,
									id: item.id,
								}))}
							/>
						)}
					</div>

					{/* Back to Galery */}
					<div className="mt-16 pt-8 border-t border-border">
						<Link href="/galerie" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
							← Retour à la galerie
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
