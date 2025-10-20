import { IconQuote, IconStar } from '@tabler/icons-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

const testimonials = [
	{
		name: 'Sophie L.',
		role: 'Mariée 2024',
		content:
			"Maeva a sublimé mon maquillage de mariée ! J'étais radieuse toute la journée. Elle a su m'écouter et créer un look qui me correspondait parfaitement. Un grand merci !",
		rating: 5,
	},
	{
		name: 'Julie M.',
		role: 'Shooting photo',
		content:
			"Professionnalisme et talent au rendez-vous. Maeva a su créer un maquillage parfait pour ma séance photo. Le résultat était impeccable, je recommande à 100% !",
		rating: 5,
	},
	{
		name: 'Camille R.',
		role: 'Événement professionnel',
		content:
			"Grâce à Maeva, je me suis sentie belle et confiante pour mon événement important. Son expertise et sa douceur font toute la différence. Je ferai de nouveau appel à elle sans hésiter !",
		rating: 5,
	},
]

export function TestimonialsSection() {
	return (
		<Section variant="muted">
			<Container>
				<div className="space-y-12">
					{/* Header */}
					<div className="text-center space-y-4">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground">Elles me font confiance</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Découvrez les témoignages de mes clientes satisfaites
						</p>
					</div>

					{/* Testimonials Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="relative overflow-hidden rounded-xl border border-border bg-card p-6 space-y-4 hover:shadow-lg transition-shadow"
							>
								{/* Quote icon */}
								<div className="absolute top-4 right-4 opacity-10">
									<IconQuote className="w-16 h-16 text-primary" />
								</div>

								{/* Rating */}
								<div className="flex gap-1">
									{Array.from({ length: testimonial.rating }).map((_, i) => (
										<IconStar key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
									))}
								</div>

								{/* Content */}
								<p className="text-muted-foreground leading-relaxed relative z-10">{testimonial.content}</p>

								{/* Author */}
								<div className="border-t border-border pt-4">
									<p className="font-semibold text-foreground">{testimonial.name}</p>
									<p className="text-sm text-muted-foreground">{testimonial.role}</p>
								</div>
							</div>
						))}
					</div>

					{/* Social proof */}
					<div className="text-center pt-4">
						<div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
							<div className="flex -space-x-2">
								{[1, 2, 3, 4].map(i => (
									<div
										key={i}
										className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-background flex items-center justify-center text-xs font-semibold text-foreground"
									>
										{String.fromCharCode(64 + i)}
									</div>
								))}
							</div>
							<span className="text-sm font-medium text-foreground">
								Plus de <strong className="text-primary">50 clientes</strong> satisfaites
							</span>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	)
}
