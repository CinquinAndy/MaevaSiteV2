'use client'

import { motion } from 'motion/react'
import type React from 'react'
import { heroText, imageReveal } from '@/lib/animation/variants'

interface AnimatedHeroContentProps {
	imageElement: React.ReactNode
	textElement: React.ReactNode
}

/**
 * Composant spécifique pour animer le contenu du Hero
 * Sépare l'animation de l'image et du texte avec des délais appropriés
 */
export function AnimatedHeroContent({ imageElement, textElement }: AnimatedHeroContentProps) {
	return (
		<div className="relative z-10">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={imageReveal}
				style={{
					willChange: 'opacity, transform',
				}}
			>
				{imageElement}
			</motion.div>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={heroText}
				transition={{
					delay: 0.3,
				}}
				style={{
					willChange: 'opacity, transform',
				}}
			>
				{textElement}
			</motion.div>
		</div>
	)
}
