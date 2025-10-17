'use client'

import { motion, type Variants } from 'motion/react'
import type React from 'react'
import { defaultViewportConfig, fadeInUp } from '@/lib/animation/variants'

interface AnimatedSectionProps {
	children: React.ReactNode
	className?: string
	variants?: Variants
	delay?: number
	viewportConfig?: {
		once?: boolean
		margin?: string
		amount?: number | 'some' | 'all'
	}
	as?: keyof typeof motion
}

/**
 * Composant wrapper pour animer les sections au scroll
 * Utilise whileInView pour déclencher l'animation quand l'élément entre dans le viewport
 * Optimisé pour les performances avec GPU acceleration
 */
export function AnimatedSection({
	children,
	className = '',
	variants = fadeInUp,
	delay = 0,
	viewportConfig = defaultViewportConfig,
	as = 'div',
}: AnimatedSectionProps) {
	const Component = motion[as] as typeof motion.div

	return (
		<Component
			initial="hidden"
			whileInView="visible"
			viewport={viewportConfig}
			variants={variants}
			transition={{
				delay,
			}}
			className={className}
			style={{
				willChange: 'opacity, transform',
			}}
		>
			{children}
		</Component>
	)
}
