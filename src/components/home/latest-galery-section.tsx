'use client'

import config from '@payload-config'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { SlideInFromBottom, StaggerContainer, StaggerItem } from '@/components/animations'
import { Container } from '@/components/ui/container'
import { GaleryCard } from '@/components/ui/galery-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'
import type { Galery } from '@/payload-types'

export async function LatestGalerySection() {
	const payload = await getPayload({ config })

	const { docs: galeries } = await payload.find({
		collection: 'galery',
		where: {
			status: {
				equals: 'published',
			},
		},
		sort: '-publishedDate',
		limit: 3,
	})

	if (galeries.length === 0) {
		return null
	}

	return (
		<Section>
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<SlideInFromBottom>
						<div className="space-y-3">
							<h2 className="text-4xl md:text-5xl font-bold text-foreground">Mes Dernières Créations</h2>
							<p className="text-lg text-muted-foreground max-w-2xl">
								Découvrez mes réalisations récentes en maquillage et nail art
							</p>
						</div>
					</SlideInFromBottom>

					{/* Galleries Grid */}
					<StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{galeries.map(galery => (
							<StaggerItem key={galery.id}>
								<GaleryCard galery={galery as Galery} />
							</StaggerItem>
						))}
					</StaggerContainer>

					{/* CTA */}
					<SlideInFromBottom delay={0.3}>
						<div className="pt-4">
						<GradientButton asChild>
							<Link href="/galerie" className="z-20 text-foreground flex items-center gap-2">
								Voir toutes les galeries
								<IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
							</Link>
						</GradientButton>
						</div>
					</SlideInFromBottom>
				</div>
			</Container>
		</Section>
	)
}
