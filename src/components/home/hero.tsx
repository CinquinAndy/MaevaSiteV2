import Image from 'next/image'

import { Blob1, Blob3, Blob5, Blob7, Blob9 } from '../blobs/blobs'
import CurvedText from './curved-text'

export default function Hero({ title }: { title: string }) {
	return (
		<div className="h-screen w-screen relative overflow-hidden">
			<Image
				src="/Maquilleuse_Professionnelle_Maeva-scaled.jpg"
				alt="Hero"
				fill
				className="object-cover grayscale brightness-75"
			/>
			<h1 className="text-[700px]/50 font-bold absolute top-40 -left-20 z-10 font-corinthia text-foreground">
				{title}
			</h1>

			{/* Blobs on the left side */}
			<div className="absolute left-1/2 bottom-0 m-20 z-0 animate-float-slow opacity-70">
				<Blob1 />
			</div>
			<div className="absolute left-14 bottom-28 z-0 animate-float-medium delay-1500 opacity-80">
				<Blob5 />
			</div>

			<div className="absolute right-8 top-1/2 m-8 -translate-y-1/2 z-0 animate-float-slow delay-2500 opacity-70">
				<Blob7 />
			</div>

			{/* Texte courbé */}
			<div className="absolute inset-0 z-20 pointer-events-none">
				<CurvedText />
			</div>
		</div>
	)
}
