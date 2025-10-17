import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedGrid } from '@/components/animation/animated-grid'
import { AnimatedSection } from '@/components/animation/animated-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { RealisationCard } from '@/components/sections/shared/realisation-card'
import { CtaShader } from '@/components/ui/cta-shader'
import { scaleIn } from '@/lib/animation/variants'
import { getMediaUrl, getRealisations, getRealisationsPageData } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const realisationsPage = await getRealisationsPageData()

	return generateSEOMetadata(realisationsPage, '/realisations')
}

export default async function RealisationsListPage() {
	// Fetch all data from Payload CMS
	const [pageData, realisations] = await Promise.all([getRealisationsPageData(), getRealisations()])

	const heroImageUrl = getMediaUrl(pageData.hero!.image!)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={pageData.hero!.title!}
				imageSrc={heroImageUrl}
				imageAlt="Réalisations de jardins écologiques en Loire-Atlantique"
			/>

			{/* Introduction */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedSection variants={scaleIn} className="max-w-3xl mx-auto text-center">
						{pageData.introduction!.paragraph1 && (
							<p className="text-lg text-muted-foreground leading-relaxed">{pageData.introduction!.paragraph1}</p>
						)}
						{pageData.introduction!.paragraph2 && (
							<p className="text-base text-muted-foreground mt-4">{pageData.introduction!.paragraph2}</p>
						)}
					</AnimatedSection>
				</div>
			</section>

			{/* Gallery */}
			<section className="py-8 md:py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{realisations.map(realisation => (
							<Link key={realisation.id} href={`/realisations/${realisation.slug}`} className="cursor-pointer">
								<RealisationCard realisation={realisation} />
							</Link>
						))}
					</AnimatedGrid>
				</div>
			</section>

			{/* CTA Section with Shader */}
			<CtaShader
				title={pageData.ctaSection!.title!}
				description={pageData.ctaSection!.description!}
				buttonText={pageData.ctaSection!.buttonText!}
				buttonUrl={pageData.ctaSection!.buttonUrl!}
				items={pageData.ctaSection!.benefits!.map(b => b.benefit).filter((item): item is string => !!item)}
			/>
		</div>
	)
}
