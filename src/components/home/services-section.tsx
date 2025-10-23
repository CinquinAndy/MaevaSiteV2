import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { SlideInFromBottom, StaggerContainer, StaggerItem } from '@/components/animations'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Container } from '@/components/ui/container'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'
import type { Media, Service } from '@/payload-types'

export async function ServicesSection() {
	const payload = await getPayload({ config })

	const { docs: services } = await payload.find({
		collection: 'services',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: 'order',
		limit: 10,
	})

	if (services.length === 0) {
		return null
	}

	return (
		<Section>
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<SlideInFromBottom>
						<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
							<div className="space-y-3">
								<h2 className="text-4xl md:text-5xl font-bold text-foreground">Mes Prestations</h2>
								<p className="text-lg text-muted-foreground max-w-2xl">
									Des services personnalisés pour sublimer votre beauté à chaque occasion
								</p>
							</div>
							<GradientButton asChild className="md:shrink-0">
								<Link href="/prestations" className="z-20 text-foreground flex items-center gap-2">
									Voir toutes mes prestations
								</Link>
							</GradientButton>
						</div>
					</SlideInFromBottom>

					{/* Services Bento Grid */}
					<StaggerContainer staggerDelay={0.15}>
						<BentoGrid>
						{services.map(service => {
							const typedService = service as Service
							const featuredImage = typedService.featuredImage as Media | undefined
							const gridClass = typedService.gridSize === 'large' ? 'md:col-span-2' : 'md:col-span-1'

							return (
								<StaggerItem key={service.id} className={gridClass}>
									<Link href={`/prestations/${typedService.slug}`} className="block h-full">
										<BentoGridItem
										title={typedService.title}
										description={typedService.shortDescription}
										header={
											featuredImage?.url ? (
												<Image
													src={featuredImage.url}
													alt={featuredImage.alt || typedService.title}
													width={900}
													height={600}
													className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
												/>
											) : (
												<div className="h-full w-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800" />
											)
										}
										className="h-full"
										/>
									</Link>
								</StaggerItem>
							)
						})}
						</BentoGrid>
					</StaggerContainer>
				</div>
			</Container>
		</Section>
	)
}
