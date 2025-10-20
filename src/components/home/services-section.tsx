import Image from 'next/image'
import Link from 'next/link'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Container } from '@/components/ui/container'
import { GradientButton } from '@/components/ui/gradient-button'
import { Section } from '@/components/ui/section'

const services = [
	{
		id: 'mariages',
		title: 'Mariages',
		description:
			'Maquillage de la mariée et de ses proches. Un look qui dure toute la journée et sublime votre beauté naturelle.',
		image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-2',
	},
	{
		id: 'artistique',
		title: 'Maquillage Artistique',
		description: 'Créations uniques et audacieuses pour vos projets artistiques, spectacles, et événements spéciaux.',
		image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-1',
	},
	{
		id: 'photo',
		title: 'Séances Photo',
		description:
			'Maquillage professionnel pour shootings photo, books, mode et portraits. Résultat impeccable en haute définition.',
		image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-1',
	},
	{
		id: 'nail-art',
		title: 'Nail Art',
		description: 'Prothésie ongulaire professionnelle : pose de gel, vernis semi-permanent, nail art personnalisé.',
		image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-1',
	},
	{
		id: 'evenements',
		title: 'Événements',
		description: "Soirées, galas, défilés de mode, événements professionnels. Je m'adapte à tous vos besoins.",
		image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-1',
	},
	{
		id: 'beaute',
		title: 'Maquillage Beauté',
		description:
			'Mise en beauté pour toutes occasions : soirées, rendez-vous importants, ou simplement pour vous faire plaisir.',
		image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-1',
	},
	{
		id: 'enfants',
		title: 'Maquillage Enfants',
		description:
			'Maquillage pour les enfants de tous âges. Un look qui dure toute la journée et sublime leur beauté naturelle.',
		image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&auto=format&fit=crop&q=80',
		className: 'md:col-span-2',
	},
]

export function ServicesSection() {
	return (
		<Section>
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<div className="space-y-3">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground">Mes Prestations</h2>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Des services personnalisés pour sublimer votre beauté à chaque occasion
						</p>
					</div>

					{/* Services Bento Grid */}
					<BentoGrid>
						{services.map(service => (
							<BentoGridItem
								key={service.id}
								title={service.title}
								description={service.description}
								header={
									<Image
										src={service.image}
										alt={service.title}
										width={900}
										height={600}
										className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
									/>
								}
								className={service.className}
							/>
						))}
					</BentoGrid>

					{/* CTA */}
					<div className="pt-4">
						<GradientButton asChild>
							<Link href="/prestations" className="z-20 text-foreground">
								Découvrir toutes mes prestations
							</Link>
						</GradientButton>
					</div>
				</div>
			</Container>
		</Section>
	)
}
