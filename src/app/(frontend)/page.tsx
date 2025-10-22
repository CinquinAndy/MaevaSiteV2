import { AboutSection } from '@/components/home/about-section'
import { CtaSection } from '@/components/home/cta-section'
import HeroAltSection from '@/components/home/heroAlt'
import { LatestBlogSection } from '@/components/home/latest-blog-section'
import { LatestGallerySection } from '@/components/home/latest-gallery-section'
import { ServicesSection } from '@/components/home/services-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { generateHomeJsonLd, generateHomeMetadata } from '@/lib/seo'

export const metadata = generateHomeMetadata()

export default async function HomePage() {
	const jsonLd = generateHomeJsonLd()

	return (
		<>
			{/* JSON-LD Schema pour SEO */}
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD schema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="w-full h-full">
				{/* Hero Section */}
				<HeroAltSection />

				{/* Section About */}
				<AboutSection />

				{/* Section Services */}
				<ServicesSection />

				{/* Section Latest Blog */}
				<LatestBlogSection />

				{/* Section Latest Gallery */}
				<LatestGallerySection />

				{/* Section Testimonials */}
				<TestimonialsSection />

				{/* Section CTA */}
				<CtaSection />
			</div>
		</>
	)
}
