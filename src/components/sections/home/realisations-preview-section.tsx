import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animation/animated-section'
import { Button } from '@/components/ui/button'
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4'
import { scaleIn } from '@/lib/animation/variants'
import { getMediaUrl } from '@/lib/payload/media-helpers'
import type { Homepage, Realisation } from '@/payload-types'

interface Props {
	data?: Homepage['realisationsPreview']
	realisations: Realisation[]
}

export function RealisationsPreviewSection({ data, realisations }: Props) {
	// Convertir les réalisations Payload en Gallery4Items
	const galleryItems: Gallery4Item[] = realisations.map(realisation => ({
		id: realisation.slug,
		title: realisation.title,
		description: realisation.shortDescription,
		href: `/realisations/${realisation.slug}`,
		image: getMediaUrl(realisation.image) || '/placeholder-image.jpg',
	}))

	return (
		<section className="py-16 md:pb-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<Gallery4
					title={data?.title || 'Découvrez Mes Réalisations'}
					description={
						data?.description ||
						"Exemples de travaux de jardinage et d'aménagement paysager réalisés avec passion et respect de la nature dans la région de Monnières"
					}
					items={galleryItems}
				/>

				{/* CTA */}
				<AnimatedSection variants={scaleIn} className="text-center ">
					<Button size="lg" variant="outline" asChild>
						<Link href={data?.ctaUrl || '/realisations'}>
							{data?.ctaLabel || 'Voir Toutes Mes Réalisations'}
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</AnimatedSection>
			</div>
		</section>
	)
}
