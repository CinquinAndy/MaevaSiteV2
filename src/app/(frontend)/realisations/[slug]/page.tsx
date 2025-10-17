import { Calendar, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { AnimatedSection } from '@/components/animation/animated-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CtaShader } from '@/components/ui/cta-shader'
import { RichText } from '@/components/ui/rich-text'
import { fadeInDown, fadeInLeft, fadeInUp, scaleIn } from '@/lib/animation/variants'
import { getMediaUrl, getRealisationBySlug, getRealisations } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'
import { parseLineBreaks } from '@/lib/utils'

// Lazy load the image gallery modal
const ImageGalleryModal = dynamic(() => import('@/components/ui/image-gallery-modal'))

interface RealisationPageProps {
	params: Promise<{
		slug: string
	}>
}

// Fonction pour formater la date en français
function formatDate(dateString: string | null | undefined): string {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

// Génération des métadonnées dynamiques
export async function generateMetadata({ params }: RealisationPageProps): Promise<Metadata> {
	const { slug } = await params
	const realisation = await getRealisationBySlug(slug)

	if (!realisation) {
		return {
			title: 'Réalisation non trouvée',
		}
	}

	return generateSEOMetadata(realisation, `/realisations/${slug}`)
}

// Génération des chemins statiques
export async function generateStaticParams() {
	const realisations = await getRealisations()
	return realisations.map(realisation => ({
		slug: realisation.slug || '',
	}))
}

export default async function RealisationPage({ params }: RealisationPageProps) {
	const { slug } = await params
	const realisation = await getRealisationBySlug(slug)

	if (!realisation) {
		notFound()
	}

	// Build gallery images from Payload media
	const mainImageUrl = getMediaUrl(realisation.image!)
	const galleryImages = [
		{ src: mainImageUrl, alt: realisation.title! },
		...(realisation.images?.map(imgItem => ({
			src: getMediaUrl(imgItem),
			alt: realisation.title!,
		})) || []),
	].filter(img => img.src) // Filter out images without valid URLs

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={realisation.title!}
				imageSrc={mainImageUrl}
				imageAlt={realisation.title!}
				action={galleryImages.length > 1 ? <ImageGalleryModal images={galleryImages} /> : undefined}
			/>

			{/* Breadcrumb Navigation */}
			<AnimatedSection variants={fadeInDown} className="bg-white border-b border-gray-200">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
					<Breadcrumb
						items={[
							{ label: 'Accueil', href: '/' },
							{ label: 'Réalisations', href: '/realisations' },
							{ label: realisation.title!, href: `/realisations/${realisation.slug}` },
						]}
					/>
				</div>
			</AnimatedSection>

			{/* Article Content in Prose Style */}
			<div className="bg-white px-6 py-16 lg:px-8">
				<div className="mx-auto max-w-3xl text-base/7 text-gray-700">
					{/* Category Badge */}
					{realisation.category && (
						<AnimatedSection variants={fadeInLeft}>
							<p className="text-base/7 font-semibold text-emerald-600 capitalize">{realisation.category}</p>
						</AnimatedSection>
					)}

					{/* Meta Info */}
					<AnimatedSection variants={fadeInLeft} delay={0.1}>
						<div className="mt-6 flex flex-wrap items-center gap-4">
							{realisation.date && (
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Calendar className="size-4" />
									<span>{formatDate(realisation.date)}</span>
								</div>
							)}
							{realisation.location && (
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<MapPin className="size-4" />
									<span>{realisation.location}</span>
								</div>
							)}
						</div>
					</AnimatedSection>

					{/* Short Description */}
					{realisation.shortDescription && (
						<AnimatedSection variants={fadeInUp} delay={0.2}>
							<p className="mt-6 text-xl/8">{parseLineBreaks(realisation.shortDescription)}</p>
						</AnimatedSection>
					)}

					{/* Main Content from Payload CMS */}
					{realisation.description && (
						<AnimatedSection variants={fadeInUp} delay={0.3}>
							<div className="mt-10">
								<RichText content={realisation.description} />
							</div>
						</AnimatedSection>
					)}

					{/* Client Testimonial (if available) */}
					{realisation.testimonial?.quote && (
						<AnimatedSection variants={scaleIn} delay={0.4}>
							<div className="mt-16">
								<h3 className="text-xl font-semibold text-foreground">Le mot du client</h3>
								<figure className="mt-6 border-l-4 border-emerald-600 pl-6">
									<blockquote className="text-gray-700 italic">
										<p>&quot;{realisation.testimonial.quote}&quot;</p>
									</blockquote>
									<figcaption className="mt-4 text-sm text-gray-600">
										— {realisation.testimonial.author || 'Client satisfait'}
										{realisation.testimonial.location && `, ${realisation.testimonial.location}`}
									</figcaption>
								</figure>
							</div>
						</AnimatedSection>
					)}
				</div>
			</div>

			{/* CTA Section from Payload CMS */}
			<CtaShader
				title={realisation.ctaSection!.title!}
				description={realisation.ctaSection!.description!}
				buttonText={realisation.ctaSection!.buttonText!}
				buttonUrl={realisation.ctaSection!.buttonUrl!}
				items={realisation.ctaSection!.benefits!.map(b => b.benefit).filter((item): item is string => !!item)}
			/>
		</div>
	)
}
