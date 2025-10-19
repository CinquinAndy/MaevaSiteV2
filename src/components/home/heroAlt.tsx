import Image from 'next/image'
import GlitterBackground from '@/components/ui/glitter-background'

export default function HeroAltSection() {
	return (
		<div className="w-full h-full grid grid-cols-2 relative -translate-y-20">
			{/* Glitter/Sparkles overlay - positioned above everything */}
			<div className="absolute inset-0 z-50 pointer-events-none">
				<GlitterBackground speed={1.5} blur={0} opacity={0.8} />
			</div>

			<div className="ml-10 absolute top-10 left-0 text-left z-20 opacity-100 h-full flex items-center">
				<h1 className="text-[285px]/55 uppercase text-white">Makeup Artist</h1>
			</div>
			<div className="ml-10 absolute bottom-30 left-0 text-left z-20 opacity-100  flex items-center">
				<h2 className="text-4xl font-bold text-white uppercase">Maeva Cinquin - Maquilleuse Professionnelle</h2>
			</div>
			<div className="w-full h-full col-span-1 col-start-2 relative">
				<Image
					src="/image00001.jpeg"
					alt="Hero Section"
					width={1920}
					height={1080}
					className="w-full h-full object-contain z-15 -scale-x-100"
				/>
				{/* Gradient overlay pour transition smooth vers la gauche */}
				<div className="absolute inset-0 bg-gradient-to-r from-background via-background/15 via-background/25 to-transparent pointer-events-none" />
			</div>
		</div>
	)
}
