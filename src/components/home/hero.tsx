import Image from 'next/image'

import { Blob1, Blob5, Blob7 } from '../blobs/blobs'
import CurvedText from './curved-text'

interface HeroProps {
	title: string
	backgroundImage?: string
	fontSize?: number
	lineHeight?: number
}

export default function Hero({
	title,
	fontSize = 700,
	backgroundImage = '/Maquilleuse_Professionnelle_Maeva-scaled.jpg',
	lineHeight = 0.5,
}: HeroProps) {
	return (
		<div className="h-screen w-screen relative overflow-hidden">
			<Image src={backgroundImage} alt="Hero" fill className="object-cover grayscale brightness-75" />
			<h1
				className="font-bold absolute top-20 -left-20 z-10 font-corinthia text-foreground hero-title"
				style={
					{
						'--font-size-base': `${fontSize}px`,
						lineHeight: `${lineHeight}`,
					} as React.CSSProperties
				}
			>
				{title}
			</h1>

			{/* Blobs on the left side */}
			<div className="absolute left-1/2 bottom-0 m-20 z-0 animate-float-slow opacity-70">
				<Blob1 />
			</div>
			<div className="absolute hidden md:block left-14 bottom-28 z-0 animate-float-medium delay-1500 opacity-80">
				<Blob5 />
			</div>

			<div className="absolute hidden md:block right-8 top-1/2 m-8 -translate-y-1/2 z-0 animate-float-slow delay-2500 opacity-70">
				<Blob7 />
			</div>

			{/* Texte courbé */}
			<div className="absolute rotate-45 scale-200 md:scale-100 md:rotate-0 inset-0 z-20 pointer-events-none">
				<CurvedText />
			</div>
		</div>
	)
}
