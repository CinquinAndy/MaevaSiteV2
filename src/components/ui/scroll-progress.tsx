'use client'

import { motion, type SpringOptions, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import { useEffect, type RefObject } from 'react'

interface ScrollProgressProps {
	className?: string
	springOptions?: SpringOptions
	containerRef?: RefObject<HTMLElement>
	orientation?: 'horizontal' | 'vertical'
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
	stiffness: 200,
	damping: 50,
	restDelta: 0.001,
}

export function ScrollProgress({
	className,
	springOptions,
	containerRef,
	orientation = 'horizontal',
}: ScrollProgressProps) {
	// Si pas de containerRef, on track le scroll de la fenêtre
	const { scrollYProgress } = useScroll(
		containerRef
			? {
					container: containerRef,
					layoutEffect: false,
				}
			: {
					layoutEffect: false,
				}
	)

	const scale = useSpring(scrollYProgress, {
		...(springOptions ?? DEFAULT_SPRING_OPTIONS),
	})

	// DEBUG: Décommentez pour voir les valeurs dans la console
	// useEffect(() => {
	// 	const unsubscribe = scrollYProgress.on('change', latest => {
	// 		console.log('scrollYProgress:', latest)
	// 	})
	// 	return () => unsubscribe()
	// }, [scrollYProgress])

	// Configuration basée sur l'orientation
	const isVertical = orientation === 'vertical'
	const scaleProperty = isVertical ? { scaleY: scale } : { scaleX: scale }
	const originClass = isVertical ? 'origin-top' : 'origin-left'

	return <motion.div className={cn(originClass, className)} style={scaleProperty} />
}
