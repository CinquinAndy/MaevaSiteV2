'use client'

import { motion } from 'motion/react'
import type React from 'react'
import { pageTransition } from '@/lib/animation/variants'

/**
 * Template component for page transitions
 * Wraps all pages in the frontend group with smooth animations
 * Preserves SSG while adding client-side animations
 */
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			style={{
				willChange: 'opacity, transform',
			}}
		>
			{children}
		</motion.div>
	)
}
