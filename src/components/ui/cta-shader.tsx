'use client'

import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animation/animated-section'
import { Button } from '@/components/ui/button'
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from '@/lib/animation/variants'
import { parseLineBreaks } from '@/lib/utils'

interface CtaShaderProps {
	title?: string
	description?: string
	buttonText?: string
	buttonUrl?: string
	items?: string[]
}

const defaultItems = [
	'Réponse sous 48h',
	'Devis gratuit et sans engagement',
	'Visite et conseil gratuits',
	"50% de crédit d'impôt garanti",
]

export function CtaShader({
	title = 'Prêt à Redonner Vie à Votre Jardin ?',
	description = "Demandez votre devis gratuit et profitez de 50% de réduction d'impôt. Intervention dans le Vignoble Nantais et la Vallée de la Loire.",
	buttonText = 'Demander un Devis Gratuit',
	buttonUrl = '/contact',
	items = defaultItems,
}: CtaShaderProps) {
	return (
		<section className="relative px-4 md:px-0 py-32 overflow-hidden bg-sidebar-accent z-0">
			<div className="absolute inset-0 -z-10 top-0 left-0  mix-blend-soft-light">
				<Image src="/bg_alt_2.webp" alt="Background" fill className="object-cover" />
			</div>
			{/* Enhanced Multi-Layer Shader Background */}
			{/* <EnhancedShaderBackground variant={shaderVariant} colors={shaderColors} /> */}

			{/* Content */}
			<div className="relative z-10 container mx-auto ">
				<div className="flex justify-center ">
					<AnimatedSection variants={scaleIn} className="max-w-5xl">
						<div
							className="flex flex-col items-start justify-between gap-8 rounded-lg bg-background backdrop-blur-md
						 border border-white/20 px-6 py-10 md:flex-row lg:px-20 lg:py-16 shadow-2xl h-full"
						>
							<motion.div
								className="md:w-1/2 h-full"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								variants={fadeInUp}
							>
								<h4 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
									{parseLineBreaks(title)}
								</h4>
								<p className="text-foreground/90 text-lg mb-6">{parseLineBreaks(description)}</p>
							</motion.div>
							<motion.div
								className="md:w-1/3 h-full flex flex-col justify-between gap-8 md:gap-0"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								variants={staggerContainer}
								transition={{ delay: 0.2 }}
							>
								<ul className="flex flex-col space-y-3 text-sm font-medium">
									{items.map(item => (
										<motion.li className="flex items-center text-foreground" key={item} variants={staggerItem}>
											<Check className="mr-4 size-5 flex-shrink-0 text-foreground" />
											{item}
										</motion.li>
									))}
								</ul>
								<motion.div className="flex flex-col w-full h-full justify-end" variants={staggerItem}>
									<Button className="bg-white hover:bg-white/90 text-primary font-semibold " size="lg" asChild>
										<Link href={buttonUrl}>{buttonText}</Link>
									</Button>
								</motion.div>
							</motion.div>
						</div>
					</AnimatedSection>
				</div>
			</div>
		</section>
	)
}
