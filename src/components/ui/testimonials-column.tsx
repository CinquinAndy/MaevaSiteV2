'use client'
import { IconStar } from '@tabler/icons-react'
import { motion } from 'motion/react'
import React from 'react'

export interface Testimonial {
	id: string
	name: string
	content: string
	rating: number
	avatar?: {
		url?: string | null
		alt?: string | null
	} | null
	source?: string
}

interface TestimonialsColumnProps {
	className?: string
	testimonials: Testimonial[]
	duration?: number
}

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }: TestimonialsColumnProps) => {
	return (
		<div className={className}>
			<motion.div
				animate={{
					translateY: '-50%',
				}}
				transition={{
					duration: duration,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'linear',
					repeatType: 'loop',
				}}
				className="flex flex-col gap-6 pb-6"
			>
				{[...new Array(2).fill(0)].map((_, repeatIndex) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Intentional duplicate for infinite scroll effect
					<React.Fragment key={`column-repeat-${repeatIndex}`}>
						{testimonials.map(testimonial => (
							<div
								key={`${testimonial.id}-${repeatIndex}`}
								className="p-8 rounded-2xl border border-border/50 max-w-xs w-full
                  bg-gradient-to-br from-card via-card to-card/80
                  hover:shadow-xl hover:shadow-primary/5 transition-all duration-300
                  backdrop-blur-sm relative overflow-hidden group"
							>
								{/* Subtle gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								{/* Rating */}
								<div className="flex gap-1 mb-4 relative z-10">
									{Array.from({ length: testimonial.rating }).map((_, starIndex) => (
										<IconStar
											key={`${testimonial.id}-star-${starIndex}-${repeatIndex}`}
											className="w-4 h-4 text-amber-500 fill-amber-500"
										/>
									))}
								</div>

								{/* Content */}
								<p className="text-sm text-muted-foreground leading-relaxed relative z-10 mb-5">
									{testimonial.content}
								</p>

								{/* Author */}
								<div className="flex items-center gap-3 relative z-10">
									{testimonial.avatar?.url ? (
										<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
											{/* biome-ignore lint/performance/noImgElement: External URL from CMS */}
											<img
												src={testimonial.avatar.url}
												alt={testimonial.avatar.alt || testimonial.name}
												className="w-full h-full object-cover"
											/>
										</div>
									) : (
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border-2 border-primary/20">
											<span className="text-sm font-semibold text-foreground">{testimonial.name.charAt(0)}</span>
										</div>
									)}
									<div className="flex flex-col">
										<div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
										{testimonial.source && (
											<div className="text-xs leading-5 opacity-60 tracking-tight">
												{testimonial.source === 'google' && 'Google Reviews'}
												{testimonial.source === 'facebook' && 'Facebook'}
												{testimonial.source === 'instagram' && 'Instagram'}
												{testimonial.source === 'email' && 'Email'}
												{testimonial.source === 'other' && 'Client'}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</React.Fragment>
				))}
			</motion.div>
		</div>
	)
}
