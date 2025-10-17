import { Award, Heart, Leaf, type LucideIcon, MapPin, Shield, TrendingDown, Wrench } from 'lucide-react'
import Image from 'next/image'
import { AnimatedGrid } from '@/components/animation/animated-grid'
import { AnimatedSection } from '@/components/animation/animated-section'
import { fadeInLeft, fadeInUp } from '@/lib/animation/variants'
import { getMediaUrl } from '@/lib/payload'
import type { Homepage } from '@/payload-types'

interface ValuesSectionProps {
	data: Homepage['values']
}

const iconMap: Record<string, LucideIcon> = {
	leaf: Leaf,
	wrench: Wrench,
	'map-pin': MapPin,
	'trending-down': TrendingDown,
	heart: Heart,
	award: Award,
	shield: Shield,
}

export function ValuesSection({ data }: ValuesSectionProps) {
	// Parse title to extract bold text (text between **) and handle line breaks
	const parseTitleWithBold = (title: string) => {
		const parts = title.split(/(\*\*.*?\*\*)/)
		return parts.map((part, partIndex) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const text = part.slice(2, -2)
				// Handle \n inside bold text
				const textParts = text.split('\\n')
				return (
					<strong key={`strong-${part.slice(0, 30)}-${partIndex}`}>
						{textParts.map((textPart, i) => (
							<span key={`${textPart.slice(0, 30)}-${i}`}>
								{textPart}
								{i < textParts.length - 1 && <br />}
							</span>
						))}
					</strong>
				)
			}
			// Handle \n in regular text
			const textParts = part.split('\\n')
			return (
				<span key={`text-${part.slice(0, 30)}-${partIndex}`}>
					{textParts.map((textPart, i) => (
						<span key={`${textPart.slice(0, 30)}-${i}`}>
							{textPart}
							{i < textParts.length - 1 && <br />}
						</span>
					))}
				</span>
			)
		})
	}

	const imageUrl = getMediaUrl(data.image) || '/usable/bg.jpg'
	const values = data.valuesList || []

	return (
		<section className="py-16 md:py-24 bg-sidebar-accent text-white rounded-t-4xl">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Left Side - Image */}
					<AnimatedSection variants={fadeInLeft} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
						<Image
							src={imageUrl}
							alt="Jardin paysager écologique"
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</AnimatedSection>

					{/* Right Side - Content */}
					<div className="space-y-8">
						{/* Header */}
						<AnimatedSection variants={fadeInUp}>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
								{parseTitleWithBold(data.sectionTitle)}
							</h2>
						</AnimatedSection>

						{/* Values Grid */}
						<AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{values.map(value => {
								const Icon = iconMap[value.icon] || Leaf
								return (
									<div
										key={value.title}
										className="space-y-3 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
									>
										<div className="flex items-start justify-between">
											<div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
												<Icon className="h-5 w-5 text-white" />
											</div>
											<span className="text-sm font-mono text-white/60">{value.number}</span>
										</div>
										<h3 className="text-lg font-semibold">{value.title}</h3>
										<p className="text-sm text-white/80 leading-relaxed">{value.description}</p>
									</div>
								)
							})}
						</AnimatedGrid>
					</div>
				</div>
			</div>
		</section>
	)
}
