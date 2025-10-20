import { AboutSection } from '@/components/home/about-section'
import { CtaSection } from '@/components/home/cta-section'
import HeroAltSection from '@/components/home/heroAlt'
import { LatestBlogSection } from '@/components/home/latest-blog-section'
import { LatestGallerySection } from '@/components/home/latest-gallery-section'
import { ServicesSection } from '@/components/home/services-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'

export const metadata = {
	title: 'Maeva Cinquin - Maquilleuse Professionnelle & Prothésiste Ongulaire',
	description:
		'Maquilleuse professionnelle diplômée Make Up For Ever Academy et prothésiste ongulaire en Haute-Savoie. Mariages, événements, maquillage artistique, nail art. Interventions à Thonon, Annecy, Genève, Lausanne.',
}

export default async function HomePage() {
	return (
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
	)
}
