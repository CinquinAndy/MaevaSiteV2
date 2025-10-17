import Image from 'next/image'
import type { ReactNode } from 'react'
import { AnimatedPageHero } from '@/components/animation/animated-page-hero'
import { BlobMaskedImage } from '@/components/ui/blob-masked-image'

interface PageHeroProps {
	title: string
	imageSrc: string
	imageAlt: string
	action?: ReactNode
}

export function PageHero({ title, imageSrc, imageAlt, action }: PageHeroProps) {
	const imageElement = (
		<>
			<BlobMaskedImage src={imageSrc} alt={imageAlt} priority useVerticalOnMobile />

			{/* Overlay gradient for better text readability - responsive mask */}
			<div
				className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent blob-mask-responsive"
				style={
					{
						'--blob-mask-mobile': 'url(/blob_bg_vertical.svg)',
						'--blob-mask-desktop': 'url(/blob_bg.svg)',
						maskImage: 'var(--blob-mask-mobile)',
						WebkitMaskImage: 'var(--blob-mask-mobile)',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat',
						maskSize: 'contain',
						WebkitMaskSize: 'contain',
						maskPosition: 'center',
						WebkitMaskPosition: 'center',
					} as React.CSSProperties
				}
			/>
		</>
	)

	const titleElement = (
		<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center px-4 sm:px-8 leading-tight drop-shadow-2xl max-w-5xl">
			{title}
		</h1>
	)

	return (
		<section className="relative w-full h-full min-h-screen overflow-hidden bg-sidebar-accent rounded-b-2xl md:rounded-b-4xl z-0">
			<div className="absolute inset-0 -z-10 top-0 left-0  mix-blend-soft-light">
				<Image src="/bg_alt.webp" alt="Background" fill className="object-cover" />
			</div>
			<div className="px-4 sm:px-6 lg:px-8 h-full w-full flex items-center justify-center md:mt-16">
				<div className="relative w-full h-full flex items-center">
					<AnimatedPageHero imageElement={imageElement} titleElement={titleElement} actionElement={action} />
				</div>
			</div>
		</section>
	)
}
