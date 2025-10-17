'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { fadeIn, heroText } from '@/lib/animation/variants'

interface AnimatedPageHeroProps {
	imageElement: ReactNode
	titleElement: ReactNode
	actionElement?: ReactNode
}

/**
 * Composant spécifique pour animer le PageHero
 * Anime l'image, le titre et le bouton d'action avec des délais appropriés
 * Note: On utilise fadeIn au lieu de imageReveal pour éviter le scale qui casse le blob mask
 */
export function AnimatedPageHero({ imageElement, titleElement, actionElement }: AnimatedPageHeroProps) {
	return (
		<div className="relative w-screen h-screen">
			<motion.div
				className="absolute inset-0 z-0"
				initial="hidden"
				animate="visible"
				variants={fadeIn}
				style={{
					willChange: 'opacity',
				}}
			>
				{imageElement}
			</motion.div>

			{/* Title overlay */}
			<div className="absolute inset-0 flex items-center justify-center px-4">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={heroText}
					transition={{
						delay: 0.4,
					}}
					style={{
						willChange: 'opacity, transform',
					}}
				>
					{titleElement}
				</motion.div>
			</div>

			{/* Action button */}
			{actionElement && (
				<motion.div
					className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10"
					initial="hidden"
					animate="visible"
					variants={heroText}
					transition={{
						delay: 0.6,
					}}
					style={{
						willChange: 'opacity, transform',
					}}
				>
					{actionElement}
				</motion.div>
			)}
		</div>
	)
}
