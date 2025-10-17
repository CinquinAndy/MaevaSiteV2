'use client'

import { motion, type Variants } from 'motion/react'
import React from 'react'
import { defaultViewportConfig, staggerContainer, staggerItem } from '@/lib/animation/variants'

interface AnimatedGridProps {
	children: React.ReactNode
	className?: string
	containerVariants?: Variants
	itemVariants?: Variants
	viewportConfig?: {
		once?: boolean
		margin?: string
		amount?: number | 'some' | 'all'
	}
	as?: keyof typeof motion
}

/**
 * Composant wrapper pour animer les grilles avec effet stagger
 * Les enfants directs seront animés séquentiellement avec un délai
 * Optimisé pour les performances
 */
export function AnimatedGrid({
	children,
	className = '',
	containerVariants = staggerContainer,
	itemVariants = staggerItem,
	viewportConfig = defaultViewportConfig,
	as = 'div',
}: AnimatedGridProps) {
	const Container = motion[as] as typeof motion.div

	return (
		<Container
			initial="hidden"
			whileInView="visible"
			viewport={viewportConfig}
			variants={containerVariants}
			className={className}
		>
			{React.Children.map(children, (child, index) => {
				// Create unique key using index as fallback
				const key = React.isValidElement(child) && child.key ? child.key : `grid-item-${index}`
				return (
					<motion.div
						key={key}
						variants={itemVariants}
						style={{
							willChange: 'opacity, transform',
						}}
					>
						{child}
					</motion.div>
				)
			})}
		</Container>
	)
}
