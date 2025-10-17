import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/payload'
import type { Service } from '@/payload-types'

interface ServiceCardProps {
	service: Service
	showImage?: boolean
	ctaText?: string
	ctaHref?: string
}

export function ServiceCard({ service, showImage = true }: ServiceCardProps) {
	const imageUrl = getMediaUrl(service.image)

	return (
		<Card className="relative min-h-[500px] h-full flex flex-col overflow-hidden group hover:scale-[1.02] hover:shadow-lg transition-all duration-300 bg-transparent border-none z-20">
			{showImage && imageUrl && (
				<Image
					src={imageUrl}
					alt={service.title}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-300 h-full w-full z-10 brightness-75"
				/>
			)}
			<CardHeader className="z-20 flex gap-8 justify-between flex-row flex-nowrap w-full">
				<ul className="flex flex-wrap gap-2">
					{service.features.slice(0, 4).map(feature => (
						<li
							key={feature.feature}
							className="flex items-start gap-2 text-sm border border-white rounded-2xl p-2 px-3 bg-white/5 backdrop-blur-sm"
						>
							<span className="text-white font-semibold text-xs">{feature.feature}</span>
						</li>
					))}
				</ul>
				<div>
					<div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/25">
						<ArrowUpRight className="w-4 h-4 text-white" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 z-20 text-white h-full justify-end">
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-xl uppercase font-black">{service.title}</CardTitle>
				</div>
				<p className="text-sm text-white font-semibold mb-4">{service.shortDescription}</p>
			</CardContent>
		</Card>
	)
}
