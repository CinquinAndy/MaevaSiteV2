import { ArrowRight, CheckCircle2, Mail, Phone, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export function CtaSection() {
	return (
		<Section>
			<Container>
				<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-y bg-[radial-gradient(35%_80%_at_25%_0%,hsl(var(--primary)/.08),transparent)] px-4 py-12 md:py-16">
					{/* Corner Plus Icons */}
					<Plus className="absolute top-[-12.5px] left-[-11.5px] z-10 size-6" strokeWidth={1} />
					<Plus className="absolute top-[-12.5px] right-[-11.5px] z-10 size-6" strokeWidth={1} />
					<Plus className="absolute bottom-[-12.5px] left-[-11.5px] z-10 size-6" strokeWidth={1} />
					<Plus className="absolute right-[-11.5px] bottom-[-12.5px] z-10 size-6" strokeWidth={1} />

					{/* Side Borders */}
					<div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l" />
					<div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r" />

					{/* Center Dashed Line */}
					<div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />

					<div className="space-y-3">
						<h2 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl">Prête à révéler votre beauté ?</h2>
						<p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Que ce soit pour votre mariage, un événement spécial ou simplement pour vous faire plaisir, je suis là
							pour sublimer votre beauté naturelle.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
						<Button asChild size="lg">
							<Link href="/contact" className="flex items-center gap-2">
								<Mail className="size-4" />
								Demander un devis
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="tel:+33616625137" className="flex items-center gap-2">
								<Phone className="size-4" />
								06 16 62 51 37
							</Link>
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	)
}
