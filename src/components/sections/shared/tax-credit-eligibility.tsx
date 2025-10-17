'use client'

import { CheckCircle2, XCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animation/animated-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animation/variants'

interface EligibilityItem {
	text: string
	description?: string
}

interface TabContent {
	title: string
	description: string
	items: EligibilityItem[]
	imageSrc: string
	imageAlt: string
}

interface Tab {
	value: string
	icon: React.ReactNode
	label: string
	content: TabContent
}

interface TaxCreditEligibilityProps {
	heading: string
	description: string
	tabs: Tab[]
	importantNote?: string
}

const TaxCreditEligibility = (props: TaxCreditEligibilityProps) => {
	const { heading, description, tabs, importantNote } = props

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Animated Header */}
				<AnimatedSection variants={fadeInUp} className="flex flex-col items-center gap-4 text-center mb-12">
					<h2 className="max-w-2xl text-3xl font-bold md:text-4xl">{heading}</h2>
					<p className="text-muted-foreground max-w-2xl">{description}</p>
				</AnimatedSection>

				<Tabs defaultValue={tabs[0].value} className="mt-8">
					{/* Animated Tabs List */}
					<AnimatedSection variants={fadeInUp} delay={0.1}>
						<TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent h-auto p-0">
							{tabs.map(tab => (
								<TabsTrigger
									key={tab.value}
									value={tab.value}
									className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg border border-transparent data-[state=active]:border-primary/20 transition-all duration-300"
								>
									{tab.icon} {tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</AnimatedSection>

					{/* Animated Tab Content Container */}
					<AnimatedSection variants={fadeInUp} delay={0.2}>
						<div className="mx-auto mt-8 container rounded-2xl bg-background border border-border p-6 lg:p-12">
							{tabs.map(tab => (
								<TabsContent
									key={tab.value}
									value={tab.value}
									className="grid place-items-start gap-12 lg:grid-cols-2 lg:gap-10 mt-0"
								>
									<AnimatePresence mode="wait">
										<motion.div
											key={`content-${tab.value}`}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 20 }}
											transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
											className="flex flex-col gap-6 order-2 lg:order-1"
										>
											<motion.h3
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.1, duration: 0.4 }}
												className="text-2xl font-bold lg:text-3xl"
											>
												{tab.content.title}
											</motion.h3>
											<motion.p
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.2, duration: 0.4 }}
												className="text-muted-foreground lg:text-lg"
											>
												{tab.content.description}
											</motion.p>
											<motion.ul
												variants={staggerContainer}
												initial="hidden"
												animate="visible"
												className="space-y-4 mt-4"
											>
												{tab.content.items.map((item, index) => (
													<motion.li
														key={item.text}
														variants={staggerItem}
														custom={index}
														className="flex items-start gap-3"
													>
														{tab.value === 'eligible' ? (
															<CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
														) : (
															<XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
														)}
														<div>
															<span className="font-medium">{item.text}</span>
															{item.description && (
																<p className="text-sm text-muted-foreground mt-1">{item.description}</p>
															)}
														</div>
													</motion.li>
												))}
											</motion.ul>
										</motion.div>
									</AnimatePresence>

									<AnimatePresence mode="wait">
										{tab.content.imageSrc && (
											<motion.div
												key={`image-${tab.value}`}
												initial={{ opacity: 0, scale: 0.95 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.95 }}
												transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
												className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden order-1 lg:order-2"
											>
												<Image src={tab.content.imageSrc} alt={tab.content.imageAlt} fill className="object-cover" />
											</motion.div>
										)}
									</AnimatePresence>
								</TabsContent>
							))}
						</div>
					</AnimatedSection>
				</Tabs>

				{/* Animated Important Note */}
				{importantNote && (
					<AnimatedSection variants={fadeInUp} delay={0.3}>
						<div className="mt-8 text-center">
							<p className="text-sm text-muted-foreground">
								<strong>Note importante :</strong> {importantNote}
							</p>
						</div>
					</AnimatedSection>
				)}
			</div>
		</section>
	)
}

export { TaxCreditEligibility }
