import {
	IconBrush,
	IconCamera,
	IconCrown,
	IconDiamond,
	IconHeart,
	IconPaint,
	IconPalette,
	IconSparkles,
	IconStar,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Media, Service } from '@/payload-types'

interface ServiceCardProps {
	service: Service
	className?: string
}

const categoryLabels: Record<string, string> = {
	maquillage: 'Maquillage',
	'nail-art': 'Nail Art',
	evenementiel: 'Événementiel',
	formation: 'Formation',
}

const iconMap = {
	sparkles: IconSparkles,
	heart: IconHeart,
	camera: IconCamera,
	paint: IconPaint,
	palette: IconPalette,
	star: IconStar,
	crown: IconCrown,
	diamond: IconDiamond,
	brush: IconBrush,
}

export function ServiceCard({ service, className }: ServiceCardProps) {
	const Icon = service.icon ? iconMap[service.icon as keyof typeof iconMap] || IconSparkles : IconSparkles
	const featuredImage = service.featuredImage as Media | undefined

	return (
		<Link href={`/prestations#${service.slug}`} className={cn('group block', className)}>
			<article className="h-full flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-primary/50">
				{featuredImage?.url ? (
					<div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
						<Image
							src={featuredImage.url}
							alt={featuredImage.alt || service.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
					</div>
				) : (
					<div className="flex items-center justify-center aspect-[16/9] w-full bg-gradient-to-br from-primary/20 to-accent/20">
						<Icon className="w-16 h-16 text-primary" stroke={1.5} />
					</div>
				)}

				<div className="p-6 space-y-4 flex-1 flex flex-col">
					<div className="flex items-center gap-2">
						<Badge variant="primary">{categoryLabels[service.category] || service.category}</Badge>
					</div>

					<h3 className="text-2xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
						{service.title}
					</h3>

					<p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.shortDescription}</p>

					{service.pricing?.displayPricing && (
						<div className="pt-4 border-t border-border">
							{service.pricing.priceType === 'quote' && <p className="text-sm font-medium text-primary">Sur devis</p>}
							{service.pricing.priceType === 'fixed' && service.pricing.price && (
								<p className="text-lg font-semibold text-primary">{service.pricing.price} €</p>
							)}
							{service.pricing.priceType === 'from' && service.pricing.price && (
								<p className="text-lg font-semibold text-primary">À partir de {service.pricing.price} €</p>
							)}
						</div>
					)}

					<div className="pt-2">
						<span className="text-sm font-medium text-primary group-hover:underline">En savoir plus →</span>
					</div>
				</div>
			</article>
		</Link>
	)
}
