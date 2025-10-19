import HeroAltSection from '@/components/home/heroAlt'

export default async function HomePage() {
	return (
		<div className="h-screen w-screen">
			<HeroAltSection />
			<div className="h-screen w-screen z-30 relative bg-card">
				<h1>Hello</h1>
			</div>
			<div className="h-screen w-screen z-30 relative bg-background">
				<h1>Hello</h1>
			</div>
		</div>
	)
}
