import { MapPin } from 'lucide-react'
import { citiesData, generateInterventionZoneText } from '@/lib/cities-data'

export default function InterventionZoneSection() {
	const zoneData = generateInterventionZoneText()

	return (
		<section className="w-full py-20 relative z-30 bg-card">
			<div className="container mx-auto px-4">
				{/* En-tête */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 mb-4 text-primary">
						<MapPin className="w-8 h-8" />
					</div>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{zoneData.title}</h2>
					<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{zoneData.description}</p>
				</div>

				{/* Grille des régions */}
				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{zoneData.regions.map(region => (
						<div key={region.name} className="bg-background rounded-lg p-6 border border-border shadow-sm">
							<h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5 text-primary" />
								{region.name}
							</h3>
							<ul className="space-y-2">
								{region.cities.map(city => (
									<li key={city} className="flex items-center gap-2 text-muted-foreground">
										<span className="w-1.5 h-1.5 rounded-full bg-primary" />
										{city}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Statistiques */}
				<div className="mt-12 text-center">
					<div className="inline-flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<span className="font-semibold text-foreground">{citiesData.searchRadius} km</span>
							<span>de rayon d'intervention</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-semibold text-foreground">{citiesData.topCities.length}</span>
							<span>villes desservies</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-semibold text-foreground">7j/7</span>
							<span>disponible</span>
						</div>
					</div>
				</div>

				{/* Call-to-action */}
				<div className="mt-12 text-center">
					<p className="text-muted-foreground mb-6">
						Vous êtes en dehors de ces zones ? Contactez-moi, je peux me déplacer sur demande.
					</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
					>
						Me contacter
					</a>
				</div>
			</div>
		</section>
	)
}
