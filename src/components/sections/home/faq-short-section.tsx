'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animation/animated-section'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { RichText } from '@/components/ui/rich-text'
import { fadeInLeft, fadeInRight } from '@/lib/animation/variants'
import type { Faq, Homepage } from '@/payload-types'

interface Props {
	data?: Homepage['faqShort']
	faqItems: Faq[]
}

export function FaqShortSection({ data, faqItems }: Props) {
	return (
		<section className="py-20 lg:py-40 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
					{/* Left Column - Intro */}
					<AnimatedSection variants={fadeInLeft} className="flex gap-10 flex-col">
						<div className="flex gap-4 flex-col">
							<div className="flex gap-2 flex-col">
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-xl text-left">
									{data?.title || 'Questions Fréquentes'}
								</h2>
								<p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
									{data?.description ||
										"Réponses aux questions les plus courantes sur mes services d'entretien de jardin écologique"}
								</p>
							</div>
							<div className="mt-4">
								<Button className="gap-4" variant="outline" asChild>
									<Link href={data?.ctaUrl || '/faq'}>
										{data?.ctaLabel || 'Voir Toutes les Questions'} <ArrowRight className="w-4 h-4" />
									</Link>
								</Button>
							</div>
						</div>
					</AnimatedSection>

					{/* Right Column - Accordion */}
					<AnimatedSection variants={fadeInRight} delay={0.2} className="w-full">
						<AccordionRoot type="single" collapsible className="w-full">
							{faqItems.map(item => (
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
		</section>
	)
}
