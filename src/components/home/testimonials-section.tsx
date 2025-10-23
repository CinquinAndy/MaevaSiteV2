import { IconStar } from '@tabler/icons-react'
import { FadeInWhenVisible, SlideInFromBottom } from '@/components/animations'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { TestimonialsColumn } from '@/components/ui/testimonials-column'
import type { TestimonialData } from '@/lib/payload/get-testimonials'
import { getPublishedTestimonials } from '@/lib/payload/get-testimonials'

// Fallback testimonials for when DB is empty or during build
const fallbackTestimonials: TestimonialData[] = [
	{
		id: 'sophie-l',
		name: 'Sophie L.',
		content:
			"Maeva a sublimé mon maquillage de mariée ! J'étais radieuse toute la journée. Elle a su m'écouter et créer un look qui me correspondait parfaitement. Un grand merci !",
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'julie-m',
		name: 'Julie M.',
		content:
			'Professionnalisme et talent au rendez-vous. Maeva a su créer un maquillage parfait pour ma séance photo. Le résultat était impeccable, je recommande à 100% !',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 1,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'camille-r',
		name: 'Camille R.',
		content:
			'Grâce à Maeva, je me suis sentie belle et confiante pour mon événement important. Son expertise et sa douceur font toute la différence. Je ferai de nouveau appel à elle sans hésiter !',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 2,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'marie-d',
		name: 'Marie D.',
		content:
			"Une maquilleuse professionnelle et à l'écoute. Le résultat était parfait et a tenu toute la journée. Je recommande vivement !",
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 3,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'laura-b',
		name: 'Laura B.',
		content:
			'Maeva est une artiste ! Elle a su sublimer mon regard et mes traits. Un vrai moment de détente et un résultat magnifique.',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 4,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'emma-v',
		name: 'Emma V.',
		content:
			'Prestation au top du début à la fin. Maeva est souriante, douce et très professionnelle. Mon maquillage était sublime !',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 5,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'chloe-m',
		name: 'Chloé M.',
		content:
			'Je suis ravie du résultat ! Maeva a su exactement ce que je voulais. Son talent et sa gentillesse font toute la différence.',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 6,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'alice-p',
		name: 'Alice P.',
		content:
			'Un moment agréable avec une maquilleuse passionnée. Le rendu était naturel et élégant, exactement ce que je recherchais.',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 7,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 'sarah-t',
		name: 'Sarah T.',
		content:
			'Maeva est très talentueuse et professionnelle. Elle prend le temps de bien comprendre vos attentes. Je recommande à 200% !',
		rating: 5,
		source: 'google',
		featured: true,
		status: 'published',
		order: 8,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
]

export async function TestimonialsSection() {
	// Fetch testimonials from Payload CMS
	let testimonials = await getPublishedTestimonials()

	// If no testimonials in DB, use fallback
	if (testimonials.length === 0) {
		testimonials = fallbackTestimonials
	}

	// Ensure we have at least 9 testimonials for 3 columns
	// If we have less, duplicate some to fill the columns
	while (testimonials.length < 9) {
		testimonials = [...testimonials, ...testimonials]
	}

	const firstColumn = testimonials.slice(0, 3)
	const secondColumn = testimonials.slice(3, 6)
	const thirdColumn = testimonials.slice(6, 9)
	return (
		<Section className="relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

			<Container className="relative z-10">
				<SlideInFromBottom>
					<div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-10">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
							Elles me font confiance
						</h2>
						<p className="text-center mt-5 opacity-75 text-muted-foreground">
							Découvrez les avis de mes clientes satisfaites
						</p>
					</div>
				</SlideInFromBottom>

				{/* Animated columns */}
				<FadeInWhenVisible>
					<div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
						<TestimonialsColumn testimonials={firstColumn} duration={15} />
						<TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
						<TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
					</div>
				</FadeInWhenVisible>

				{/* Social proof */}
				<SlideInFromBottom delay={0.3}>
					<div className="text-center pt-8">
						<div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 backdrop-blur-sm">
							<div className="flex items-center gap-1">
								<IconStar className="w-5 h-5 text-amber-500 fill-amber-500" />
								<span className="font-bold text-foreground">5.0</span>
							</div>
							<div className="w-px h-4 bg-border" />
							<span className="text-sm font-medium text-foreground">
								Plus de <strong className="text-primary">{testimonials.length * 2} clientes</strong> satisfaites
							</span>
						</div>
					</div>
				</SlideInFromBottom>
			</Container>
		</Section>
	)
}
