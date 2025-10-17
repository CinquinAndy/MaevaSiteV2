import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { AnimatedSection } from '@/components/animation/animated-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CtaShader } from '@/components/ui/cta-shader'
import { RichText } from '@/components/ui/rich-text'
import { fadeInDown, fadeInLeft, fadeInUp } from '@/lib/animation/variants'
import { getMediaUrl, getServiceBySlug, getServices } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'
import { parseLineBreaks } from '@/lib/utils'

// Lazy load the image gallery modal
const ImageGalleryModal = dynamic(() => import('@/components/ui/image-gallery-modal'))

interface PrestationPageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateStaticParams() {
	const services = await getServices()
	return services.map(service => ({
		slug: service.slug,
	}))
}

export async function generateMetadata({ params }: PrestationPageProps): Promise<Metadata> {
	const { slug } = await params
	const service = await getServiceBySlug(slug)

	if (!service) {
		return {
			title: 'Prestation non trouvée',
		}
	}

	return generateSEOMetadata(service, `/prestations/${slug}`)
}

export default async function PrestationPage({ params }: PrestationPageProps) {
	const { slug } = await params
	const service = await getServiceBySlug(slug)

	if (!service) {
		notFound()
	}

	// Build gallery images from Payload media
	const mainImageUrl = getMediaUrl(service.image!)
	const galleryImages = [
		{ src: mainImageUrl, alt: service.title! },
		...(service.images?.map(imgItem => ({
			src: getMediaUrl(imgItem),
			alt: service.title!,
		})) || []),
	].filter(img => img.src) // Filter out images without valid URLs

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={service.title!}
				imageSrc={mainImageUrl}
				imageAlt={service.title!}
				action={galleryImages.length > 1 ? <ImageGalleryModal images={galleryImages} /> : undefined}
			/>

			{/* Breadcrumb Navigation */}
			<AnimatedSection variants={fadeInDown} className="bg-white border-b border-gray-200">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
					<Breadcrumb
						items={[
							{ label: 'Accueil', href: '/' },
							{ label: 'Prestations', href: '/prestations' },
							{ label: service.title, href: `/prestations/${service.slug}` },
						]}
					/>
				</div>
			</AnimatedSection>

			{/* Article Content in Prose Style */}
			<div className="bg-white px-6 py-16 lg:px-8">
				<div className="mx-auto max-w-3xl text-base/7 text-gray-700">
					{/* Category Badge */}
					{service.category && (
						<AnimatedSection variants={fadeInLeft}>
							<p className="text-base/7 font-semibold text-emerald-600 capitalize">{service.category}</p>
						</AnimatedSection>
					)}

					{/* Short Description */}
					{service.shortDescription && (
						<AnimatedSection variants={fadeInUp} delay={0.1}>
							<p className="mt-6 text-xl/8">{parseLineBreaks(service.shortDescription)}</p>
						</AnimatedSection>
					)}

					{/* Main Content from Payload CMS */}
					{service.fullDescription && (
						<AnimatedSection variants={fadeInUp} delay={0.2}>
							<div className="mt-10">
								<RichText content={service.fullDescription} />
							</div>
						</AnimatedSection>
					)}
				</div>
			</div>

			{/* CTA Section from Payload CMS */}
			<CtaShader
				title={service.ctaSection!.title!}
				description={service.ctaSection!.description!}
				buttonText={service.ctaSection!.buttonText!}
				buttonUrl={service.ctaSection!.buttonUrl!}
				items={service.ctaSection!.benefits!.map(b => b.benefit).filter((item): item is string => !!item)}
			/>
		</div>
	)
}
