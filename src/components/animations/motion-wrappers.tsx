'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimationWrapperProps {
	children: ReactNode
	className?: string
	delay?: number
	duration?: number
}

// Variants pour FadeIn
const fadeInVariants: Variants = {
	hidden: { opacity: 0 },
	visible: (custom: number) => ({
		opacity: 1,
		transition: {
			duration: custom || 0.6,
			ease: 'easeOut',
		},
	}),
}

// Variants pour SlideInFromBottom
const slideInFromBottomVariants: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: (custom: { delay?: number; duration?: number }) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: custom?.duration || 0.6,
			delay: custom?.delay || 0,
			ease: 'easeOut',
		},
	}),
}

// Variants pour SlideInFromLeft
const slideInFromLeftVariants: Variants = {
	hidden: { opacity: 0, x: -50 },
	visible: (custom: { delay?: number; duration?: number }) => ({
		opacity: 1,
		x: 0,
		transition: {
			duration: custom?.duration || 0.6,
			delay: custom?.delay || 0,
			ease: 'easeOut',
		},
	}),
}

// Variants pour SlideInFromRight
const slideInFromRightVariants: Variants = {
	hidden: { opacity: 0, x: 50 },
	visible: (custom: { delay?: number; duration?: number }) => ({
		opacity: 1,
		x: 0,
		transition: {
			duration: custom?.duration || 0.6,
			delay: custom?.delay || 0,
			ease: 'easeOut',
		},
	}),
}

// Variants pour ScaleIn
const scaleInVariants: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: (custom: { delay?: number; duration?: number }) => ({
		opacity: 1,
		scale: 1,
		transition: {
			duration: custom?.duration || 0.6,
			delay: custom?.delay || 0,
			ease: 'easeOut',
		},
	}),
}

/**
 * FadeInWhenVisible - Animation de fade in au scroll
 */
export function FadeInWhenVisible({ children, className, delay = 0, duration = 0.6 }: AnimationWrapperProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={fadeInVariants}
			custom={duration}
			className={className}
			style={{ willChange: 'opacity' }}
		>
			{children}
		</motion.div>
	)
}

/**
 * FadeIn - Animation de fade in au montage (sans scroll detection)
 */
export function FadeIn({ children, className, delay = 0, duration = 0.6 }: AnimationWrapperProps) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={fadeInVariants}
			custom={duration}
			className={className}
			style={{ willChange: 'opacity' }}
		>
			{children}
		</motion.div>
	)
}

/**
 * SlideInFromBottom - Slide depuis le bas au scroll
 */
export function SlideInFromBottom({ children, className, delay = 0, duration = 0.6 }: AnimationWrapperProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={slideInFromBottomVariants}
			custom={{ delay, duration }}
			className={className}
			style={{ willChange: 'transform, opacity' }}
		>
			{children}
		</motion.div>
	)
}

/**
 * SlideInFromLeft - Slide depuis la gauche au scroll
 */
export function SlideInFromLeft({ children, className, delay = 0, duration = 0.6 }: AnimationWrapperProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={slideInFromLeftVariants}
			custom={{ delay, duration }}
			className={className}
			style={{ willChange: 'transform, opacity' }}
		>
			{children}
		</motion.div>
	)
}

/**
 * SlideInFromRight - Slide depuis la droite au scroll
 */
export function SlideInFromRight({ children, className, delay = 0, duration = 0.6 }: AnimationWrapperProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={slideInFromRightVariants}
			custom={{ delay, duration }}
			className={className}
			style={{ willChange: 'transform, opacity' }}
		>
			{children}
		</motion.div>
	)
}

/**
 * ScaleIn - Scale in au scroll
 */
export function ScaleIn({ children, className, delay = 0, duration = 0.6 }: AnimationWrapperProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={scaleInVariants}
			custom={{ delay, duration }}
			className={className}
			style={{ willChange: 'transform, opacity' }}
		>
			{children}
		</motion.div>
	)
}

/**
 * StaggerContainer - Container pour animations staggered
 */
interface StaggerContainerProps {
	children: ReactNode
	className?: string
	staggerDelay?: number
	initialDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.1, initialDelay = 0 }: StaggerContainerProps) {
	const containerVariants: Variants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: initialDelay,
				staggerChildren: staggerDelay,
			},
		},
	}

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={containerVariants}
			className={className}
		>
			{children}
		</motion.div>
	)
}

/**
 * StaggerItem - Item individuel dans un StaggerContainer
 */
interface StaggerItemProps {
	children: ReactNode
	className?: string
	duration?: number
}

export function StaggerItem({ children, className, duration = 0.5 }: StaggerItemProps) {
	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration,
				ease: 'easeOut',
			},
		},
	}

	return (
		<motion.div variants={itemVariants} className={className} style={{ willChange: 'transform, opacity' }}>
			{children}
		</motion.div>
	)
}
