'use client'

import { Phone } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animation/animated-section'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RichText } from '@/components/ui/rich-text'
import { fadeInLeft, fadeInRight } from '@/lib/animation/variants'
import type { Faq } from '@/payload-types'

interface FaqSectionProps {
	title?: string
	description?: string
	categoryLabel?: string
	items: Faq[]
	showCta?: boolean
}

export function FaqSection({
	title = 'Questions Fréquentes',
	description = "Tout ce que vous devez savoir sur mes services d'entretien de jardin écologique et le crédit d'impôt de 50%",
	categoryLabel = 'FAQ',
	items,
	showCta = true,
}: FaqSectionProps) {
	return (
		<div className="w-full py-10 lg:py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
					{/* Left Column - Intro */}
					<AnimatedSection variants={fadeInLeft}>
						<div className="flex gap-10 flex-col">
							<div className="flex gap-4 flex-col">
								<div>
									<Badge variant="outline">{categoryLabel}</Badge>
								</div>
								<div className="flex gap-2 flex-col">
									<h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">{title}</h2>
									<p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
										{description}
									</p>
								</div>
								{showCta && (
									<div className="mt-4">
										<Button className="gap-4" variant="outline" asChild>
											<Link href="/contact">
												Une autre question ? Contactez-moi <Phone className="w-4 h-4" />
											</Link>
										</Button>
									</div>
								)}
							</div>
						</div>
					</AnimatedSection>

					{/* Right Column - Accordion */}
					<AnimatedSection variants={fadeInRight} delay={0.1}>
						<AccordionRoot type="single" collapsible className="w-full">
							{items.map(item => (
								<AccordionItem key={item.id} value={item.id.toString()}>
									<AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
									<AccordionContent>
										<RichText content={item.answer} className="text-muted-foreground" />
									</AccordionContent>
								</AccordionItem>
							))}
						</AccordionRoot>
					</AnimatedSection>
				</div>
			</div>
		</div>
	)
}
