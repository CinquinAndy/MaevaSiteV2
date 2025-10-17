import Image from 'next/image'
import { AnimatedHeroContent } from '@/components/animation/animated-hero-content'
import { getMediaUrl } from '@/lib/payload'
import type { Homepage } from '@/payload-types'

interface HeroSectionProps {
	data: Homepage['hero']
}

export function HeroSection({ data }: HeroSectionProps) {
	// Parse title to extract bold text (text between **) and handle line breaks
	const parseTitleWithBlob = (title: string) => {
		const parts = title.split(/(\*\*.*?\*\*)/)
		return parts.map((part, partIndex) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const text = part.slice(2, -2)
				// Handle \n inside bold text
				const textParts = text.split('\\n')
				return (
					<span key={`blob-${part.slice(0, 30)}-${partIndex}`} className="relative overflow-visible">
						<span className="z-10">
							{textParts.map((textPart, i) => (
								<span key={`${textPart.slice(0, 30)}-${i}`}>
									{textPart}
									{i < textParts.length - 1 && <br />}
								</span>
							))}
						</span>
						<Image
							src="/blob.svg"
							alt="Blob"
							className="w-full scale-x-125 scale-y-175 overflow-visible -z-10 opacity-85"
							fill
						/>
					</span>
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

	const backgroundImageUrl = getMediaUrl(data.backgroundImage) || '/usable/bg.jpg'

	const imageElement = (
		<Image
			src={backgroundImageUrl}
			alt="Paysagiste background"
			width={1920}
			height={1080}
			className="w-full h-full object-cover min-h-[80vh] max-h-screen rounded-xl brightness-75 z-10"
		/>
	)

	const textElement = (
		<h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-7xl font-extrabold text-white absolute bottom-6 left-4 sm:bottom-12 sm:left-8 xl:bottom-20 xl:left-20 max-w-full sm:max-w-4xl xl:max-w-7xl leading-tight z-10">
			{parseTitleWithBlob(data.title)}{' '}
		</h1>
	)

	return (
		<section className="w-screen min-h-screen p-4 xl:p-8 rounded-4xl z-20">
			<AnimatedHeroContent imageElement={imageElement} textElement={textElement} />
		</section>
	)
}
