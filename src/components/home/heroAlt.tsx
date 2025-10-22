import { MoveDown } from 'lucide-react'
import Image from 'next/image'

export default function HeroAltSection() {
	return (
		<div className="min-w-screen h-screen min-h-screen grid grid-cols-1 xl:grid-cols-2 relative 2xl:-translate-y-20 z-10">
			<div className="lg:ml-10 absolute top-20 left-0 text-center xl:text-left z-10 opacity-100 h-full flex flex-col justify-center items-center xl:items-start gap-4 xl:gap-10">
				<h1 className="text-[75px]/20 sm:text-[125px]/30 lg:text-[180px]/40 xl:text-[210px]/45 2xl:text-[285px]/55 3xl:text-[380px]/70 uppercase text-foreground max-w-7xl">
					Makeup Artist
				</h1>
				<h2 className="lg:text-5xl 2xl:text-6xl 3xl:text-7xl text-4xl font-bold text-foreground">
					Maeva Cinquin - Maquilleuse Professionnelle
				</h2>
			</div>
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center z-40">
				<MoveDown />
			</div>
			<div className="w-full h-full col-span-1 lg:col-start-2 relative z-5">
				<Image
					src="/image00001.jpeg"
					alt="Hero Section"
					width={1920}
					height={1080}
					className="w-full h-full object-cover z-5 -scale-x-100 "
				/>
				{/* Gradient overlay pour transition smooth vers la gauche */}
				<div className="absolute z-5 inset-0 bg-gradient-to-r from-background via-background/15 via-background/25 to-transparent pointer-events-none" />
			</div>
		</div>
	)
}
