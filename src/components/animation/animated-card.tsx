'use client'

import { motion } from 'motion/react'
import type React from 'react'
import { scaleIn } from '@/lib/animation/variants'

interface AnimatedCardProps {
	children: React.ReactNode
	className?: string
	enableHover?: boolean
	as?: keyof typeof motion
	onClick?: () => void
}

/**
 * Composant wrapper pour animer les cartes
 * Inclut des animations de hover et tap par défaut
 * Peut être désactivé si nécessaire
 */
export function AnimatedCard({ children, className = '', enableHover = true, as = 'div', onClick }: AnimatedCardProps) {
	const Component = motion[as] as typeof motion.div

	return (
		<Component
			variants={scaleIn}
			initial={enableHover ? 'rest' : undefined}
			whileHover={enableHover ? 'hover' : undefined}
			whileTap={enableHover ? { scale: 0.98 } : undefined}
			className={className}
			onClick={onClick}
			style={{
				willChange: enableHover ? 'transform' : undefined,
			}}
		>
			{children}
		</Component>
	)
}
