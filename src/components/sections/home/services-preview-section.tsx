import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedGrid } from '@/components/animation/animated-grid'
import { AnimatedSection } from '@/components/animation/animated-section'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { Button } from '@/components/ui/button'
import { fadeInRight, fadeInUp } from '@/lib/animation/variants'
import type { Homepage, Service } from '@/payload-types'

interface ServicesPreviewSectionProps {
	data?: Homepage['servicesPreview']
	services: Service[]
}

export function ServicesPreviewSection({ data, services }: ServicesPreviewSectionProps) {
	const title = data?.title
	const subtitle = data?.subtitle
	const ctaLabel = data?.ctaLabel
	const ctaUrl = data?.ctaUrl

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-10 md:mb-0">
					{/* Section Header */}
					<AnimatedSection variants={fadeInUp} className="text-left md:mb-16">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h2>
						<p className="text-lg text-muted-foreground mb-6 max-w-2xl">{subtitle}</p>
					</AnimatedSection>
					{/* CTA */}
					<AnimatedSection variants={fadeInRight} delay={0.2} className="text-center">
						<Button size="lg" variant="primary" asChild>
							<Link href={ctaUrl!} className="flex items-center">
								{ctaLabel}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</AnimatedSection>
				</div>

				{/* Services Grid */}
				<AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
					{services.map(service => (
						<Link key={service.id} href={`/prestations/${service.slug}`} className="cursor-pointer">
							<ServiceCard service={service} showImage={true} />
						</Link>
					))}
				</AnimatedGrid>
			</div>
		</section>
	)
}
