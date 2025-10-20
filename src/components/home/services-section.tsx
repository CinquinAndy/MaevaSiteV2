import {
	IconBrush,
	IconCamera,
	IconDiamond,
	IconHeart,
	IconSparkles,
	IconStar,
} from '@tabler/icons-react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

const services = [
	{
		icon: IconHeart,
		title: 'Mariages',
		description:
			"Maquillage de la mariée et de ses proches. Un look qui dure toute la journée et sublime votre beauté naturelle.",
		color: 'from-pink-500/20 to-rose-500/20',
	},
	{
		icon: IconSparkles,
		title: 'Maquillage Artistique',
		description:
			"Créations uniques et audacieuses pour vos projets artistiques, spectacles, et événements spéciaux.",
		color: 'from-purple-500/20 to-violet-500/20',
	},
	{
		icon: IconDiamond,
		title: 'Nail Art',
		description:
			"Prothésie ongulaire professionnelle : pose de gel, vernis semi-permanent, nail art personnalisé.",
		color: 'from-blue-500/20 to-cyan-500/20',
	},
	{
		icon: IconCamera,
		title: 'Séances Photo',
		description:
			"Maquillage professionnel pour shootings photo, books, mode et portraits. Résultat impeccable en haute définition.",
		color: 'from-amber-500/20 to-orange-500/20',
	},
	{
		icon: IconStar,
		title: 'Événements',
		description:
			"Soirées, galas, défilés de mode, événements professionnels. Je m'adapte à tous vos besoins.",
		color: 'from-indigo-500/20 to-blue-500/20',
	},
	{
		icon: IconBrush,
		title: 'Maquillage Beauté',
		description:
			"Mise en beauté pour toutes occasions : soirées, rendez-vous importants, ou simplement pour vous faire plaisir.",
		color: 'from-green-500/20 to-emerald-500/20',
	},
]

export function ServicesSection() {
	return (
		<Section>
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<div className="text-center space-y-4">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground">Mes Prestations</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Des services personnalisés pour sublimer votre beauté à chaque occasion
						</p>
					</div>

					{/* Services Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{services.map((service, index) => (
							<div
								key={index}
								className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:scale-105"
							>
								{/* Background gradient */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
								/>

								{/* Content */}
								<div className="relative z-10 space-y-4">
									{/* Icon */}
									<div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
										<service.icon className="w-7 h-7 text-primary" stroke={1.5} />
									</div>

									{/* Title */}
									<h3 className="text-xl font-semibold text-foreground">{service.title}</h3>

									{/* Description */}
									<p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
								</div>
							</div>
						))}
					</div>

					{/* CTA */}
					<div className="text-center pt-4">
						<Link
							href="/prestations"
							className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium shadow-lg"
						>
							Découvrir toutes mes prestations
						</Link>
					</div>
				</div>
			</Container>
		</Section>
	)
}
