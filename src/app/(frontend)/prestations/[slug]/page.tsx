import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { FadeIn, FadeInWhenVisible, ScaleIn, SlideInFromBottom, SlideInFromRight } from '@/components/animations'
import { Blob2, Blob3, Blob4 } from '@/components/blobs/blobs'
import { CtaSection } from '@/components/home/cta-section'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'
import { generateServiceItemMetadata } from '@/lib/seo'
import type { Media, Service } from '@/payload-types'

const categoryLabels: Record<string, string> = {
	maquillage: 'Maquillage',
	'nail-art': 'Nail Art',
	evenementiel: 'Événementiel',
	formation: 'Formation',
}

// ISR - Revalidate toutes les heures
export const revalidate = 3600

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: services } = await payload.find({
		collection: 'services',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return services.map(service => ({
		slug: service.slug,
	}))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'services',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const service = docs[0] as Service | undefined

	if (!service) {
		return {
			title: 'Service non trouvé',
		}
	}

	const featuredImage = service.featuredImage as Media | undefined

	return generateServiceItemMetadata({
		title: service.title,
		shortDescription: service.shortDescription ?? undefined,
		featuredImage: featuredImage?.url ?? undefined,
		slug: service.slug,
		seoTitle: service.seo_title ?? undefined,
		seoDescription: service.seo_description ?? undefined,
	})
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'services',
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

	const service = docs[0] as Service | undefined

	if (!service) {
		notFound()
	}

	const featuredImage = service.featuredImage as Media | undefined

	return (
		<>
			{/* Hero Banner */}
			<FadeIn>
				<div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
				{/* Background Image */}
				{featuredImage?.url && (
					<Image
						src={featuredImage.url}
						alt={featuredImage.alt || service.title}
						fill
						className="object-cover brightness-75"
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
				<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-20" />

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
									<Link href="/prestations" className="hover:text-foreground transition-colors">
										Prestations
									</Link>
								</li>
								<li>/</li>
								<li className="text-foreground">{service.title}</li>
							</ol>
							</nav>
						</SlideInFromBottom>

						{/* Category */}
						<ScaleIn delay={0.3}>
							<div className="mb-4">
								<Badge variant="primary">{categoryLabels[service.category] || service.category}</Badge>
							</div>
						</ScaleIn>

						{/* Title */}
						<SlideInFromBottom delay={0.4}>
							<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground font-corinthia mb-4">
								{service.title}
							</h1>
						</SlideInFromBottom>

						{/* Short Description */}
						{service.shortDescription && (
							<FadeInWhenVisible>
								<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
									{service.shortDescription}
								</p>
							</FadeInWhenVisible>
						)}
					</div>
				</div>
				</div>
			</FadeIn>

			{/* Main Content Section */}
			<Section>
				<Container>
					<div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
						{/* Left Column - Main Content (2 cols) */}
						<FadeInWhenVisible className="lg:col-span-2">
							{/* Description - Lexical RichText */}
							<article className="prose prose-blog prose-lg max-w-none prose-headings:font-corinthia prose-h2:text-5xl prose-h3:text-4xl prose-h4:text-3xl prose-p:font-kalam prose-img:rounded-xl prose-img:shadow-lg">
								{service.description && typeof service.description === 'object' && 'root' in service.description ? (
									<RichText data={service.description} />
								) : (
									<div className="text-muted-foreground">
										<p>Description du service non disponible.</p>
									</div>
								)}
							</article>
						</FadeInWhenVisible>

						{/* Right Column - Sidebar */}
						<SlideInFromRight className="lg:col-span-1">
							<div className="sticky top-24 space-y-6">
								{/* Pricing Card */}
								{service.pricing?.displayPricing && (
									<div className="p-6 rounded-xl bg-card border border-border shadow-lg">
										<h3 className="text-2xl font-bold font-libre-caslon-display mb-4 text-card-foreground">Tarif</h3>

										{service.pricing.priceType === 'fixed' && service.pricing.price && (
											<div className="mb-4">
												<div className="text-4xl font-bold text-primary">{service.pricing.price}€</div>
												<p className="text-sm text-muted-foreground mt-1">Tarif fixe</p>
											</div>
										)}

										{service.pricing.priceType === 'from' && service.pricing.price && (
											<div className="mb-4">
												<div className="flex items-baseline gap-2">
													<span className="text-lg text-muted-foreground">À partir de</span>
													<span className="text-4xl font-bold text-primary">{service.pricing.price}€</span>
												</div>
											</div>
										)}

										{service.pricing.priceType === 'quote' && (
											<div className="mb-4">
												<div className="text-2xl font-bold text-primary">Sur devis</div>
												<p className="text-sm text-muted-foreground mt-1">Contactez-moi pour un devis personnalisé</p>
											</div>
										)}

										{/* Price Details */}
										{service.pricing.priceDetails &&
											typeof service.pricing.priceDetails === 'object' &&
											'root' in service.pricing.priceDetails && (
												<div className="mt-4 pt-4 border-t border-border prose prose-blog prose-sm max-w-none">
													<RichText data={service.pricing.priceDetails} />
												</div>
											)}
									</div>
								)}

								{/* CTA Button */}
								<GradientButton asChild className="w-full">
									<Link href="/contact">Prendre rendez-vous</Link>
								</GradientButton>

								{/* Contact Info */}
								<div className="p-6 rounded-xl bg-muted/50 border border-border">
									<h3 className="text-xl font-bold font-libre-caslon-display mb-3 text-foreground">Une question ?</h3>
									<p className="text-sm text-muted-foreground mb-4">
										N'hésitez pas à me contacter pour toute information complémentaire.
									</p>
									<div className="space-y-2 text-sm">
										<p className="font-medium text-foreground">
											<a href="tel:+33616625137" className="hover:text-primary transition-colors">
												+33 6 16 62 51 37
											</a>
										</p>
										<p className="font-medium text-foreground">
											<a href="mailto:maevacinquin1@gmail.com" className="hover:text-primary transition-colors">
												maevacinquin1@gmail.com
											</a>
										</p>
									</div>
								</div>
							</div>
						</SlideInFromRight>
					</div>

					{/* Back to Prestations */}
					<SlideInFromBottom>
						<div className="mt-12 pt-8 border-t border-border">
						<Link
							href="/prestations"
							className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
						>
							← Retour aux prestations
						</Link>
						</div>
					</SlideInFromBottom>
				</Container>
			</Section>

			{/* Blobs décoratifs */}
			<div className="absolute left-4 top-[800px] z-0 animate-float-slow delay-500 opacity-40 hidden lg:block pointer-events-none">
				<Blob3 />
			</div>
			<div className="absolute right-8 top-[1000px] z-0 animate-float-medium delay-1000 opacity-40 hidden lg:block pointer-events-none">
				<Blob2 />
			</div>

			{/* CTA Section */}
			<CtaSection />
		</>
	)
}
