import { AnimatedSection } from '@/components/animation/animated-section'
import { FeatureCarousel } from '@/components/ui/animated-feature-carousel'
import { fadeInUp } from '@/lib/animation/variants'
import { getMediaUrl } from '@/lib/payload/media-helpers'
import type { Homepage } from '@/payload-types'

interface Props {
	data?: Homepage['taxCredit']
}

export function TaxCreditSection({ data }: Props) {
	// Utiliser les données Payload ou les valeurs par défaut
	const title = data?.title || "Comment Profiter de 50% de Réduction d'Impôt ?"
	const subtitle = data?.subtitle || 'Un processus simple en 4 étapes pour économiser sur vos travaux de jardinage'

	// Images for the carousel - using Payload or fallback to local images
	const steps = data?.steps || []
	const images = {
		alt: "Processus de crédit d'impôt",
		step1img1: getMediaUrl(steps[0]?.image1) || '/usable/IMG_20231117_093237.jpg',
		step1img2: getMediaUrl(steps[0]?.image2) || '/usable/IMG_20240310_161440.jpg',
		step2img1: getMediaUrl(steps[1]?.image1) || '/usable/IMG_20250402_142527.jpg',
		step2img2: getMediaUrl(steps[1]?.image2) || '/usable/IMG_20250803_122326_1.jpg',
		step3img: getMediaUrl(steps[2]?.image1) || '/usable/IMG_20250803_123919.jpg',
		step4img: getMediaUrl(steps[3]?.image1) || '/usable/PXL_20251006_080220831.jpg',
	}

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<AnimatedSection variants={fadeInUp} className="text-left mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h2>
					<p className="text-lg text-muted-foreground max-w-3xl">{subtitle}</p>
				</AnimatedSection>

				{/* Animated Feature Carousel */}
				<AnimatedSection variants={fadeInUp} delay={0.2} className="mb-12">
					<FeatureCarousel image={images} />
				</AnimatedSection>
			</div>
		</section>
	)
}
