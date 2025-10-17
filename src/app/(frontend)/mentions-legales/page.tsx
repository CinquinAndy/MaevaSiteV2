import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/animation/animated-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RichText } from '@/components/ui/rich-text'
import { fadeInDown, fadeInLeft, fadeInUp } from '@/lib/animation/variants'
import { getMediaUrl, getMentionsLegalesPageData } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const mentionsLegalesPage = await getMentionsLegalesPageData()

	return generateSEOMetadata(mentionsLegalesPage, '/mentions-legales', {
		robots: 'noindex, follow',
	})
}

export default async function MentionsLegalesPage() {
	const pageData = await getMentionsLegalesPageData()

	const heroImageUrl = getMediaUrl(pageData.hero!.image!)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={pageData.hero!.title!}
				imageSrc={heroImageUrl}
				imageAlt="Mentions légales Nature et Paysage Laheux"
			/>

			{/* Breadcrumb Navigation */}
			<AnimatedSection variants={fadeInDown} className="bg-white border-b border-gray-200">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
					<Breadcrumb
						items={[
							{ label: 'Accueil', href: '/' },
							{ label: 'Mentions Légales', href: '/mentions-legales' },
						]}
					/>
				</div>
			</AnimatedSection>

			{/* Article Content in Prose Style */}
			<div className="bg-white px-6 py-16 lg:px-8">
				<div className="mx-auto max-w-3xl">
					{/* Category Badge */}
					<AnimatedSection variants={fadeInLeft}>
						<p className="text-base/7 font-semibold text-emerald-600">Informations Légales</p>
					</AnimatedSection>

					{/* Main Content from Payload CMS */}
					<AnimatedSection variants={fadeInUp} delay={0.1}>
						<div className="mt-10">{pageData.content && <RichText content={pageData.content} />}</div>
					</AnimatedSection>
				</div>
			</div>
		</div>
	)
}
