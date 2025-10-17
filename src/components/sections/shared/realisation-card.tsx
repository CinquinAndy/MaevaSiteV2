import { ArrowUpRight, Calendar } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/payload'
import type { Realisation } from '@/payload-types'

interface RealisationCardProps {
	realisation: Realisation
}

// Fonction pour formater la date en français
function formatDate(dateString: string | null | undefined): string {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
	})
}

export function RealisationCard({ realisation }: RealisationCardProps) {
	const imageUrl = getMediaUrl(realisation.image)
	const features = realisation.features || []

	return (
		<Card className="relative min-h-[500px] h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-transparent border-none z-20">
			{imageUrl && (
				<Image
					src={imageUrl}
					alt={realisation.title || 'Réalisation'}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-300 h-full w-full z-10 brightness-75"
				/>
			)}
			<CardHeader className="z-20 flex gap-8 justify-between flex-row flex-nowrap w-full">
				<ul className="flex flex-wrap gap-2">
					{/* Badge de date */}
					{realisation.date && (
						<li className="flex items-center gap-2 text-sm border border-white rounded-2xl p-2 px-3 bg-white/5 backdrop-blur-sm">
							<Calendar className="w-3 h-3 text-white" />
							<span className="text-white font-semibold text-xs">{formatDate(realisation.date)}</span>
						</li>
					)}
					{/* Features (limité à 3 pour laisser de la place à la date) */}
					{features.slice(0, 3).map((featureItem, index) => {
						const featureText = typeof featureItem === 'object' && 'feature' in featureItem ? featureItem.feature : ''
						return (
							<li
								key={featureText || index}
								className="flex items-start gap-2 text-sm border border-white rounded-2xl p-2 px-3 bg-white/5 backdrop-blur-sm"
							>
								<span className="text-white font-semibold text-xs">{featureText}</span>
							</li>
						)
					})}
				</ul>
				<div>
					<div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/25">
						<ArrowUpRight className="w-4 h-4 text-white" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 z-20 text-white h-full justify-end">
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-xl uppercase font-black">{realisation.title}</CardTitle>
				</div>
				<p className="text-sm text-white font-semibold mb-2">{realisation.shortDescription}</p>
				{realisation.location && (
					<div className="flex items-center gap-2 text-xs text-white/80">
						<span>📍 {realisation.location}</span>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
