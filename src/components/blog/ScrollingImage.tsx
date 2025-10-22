'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ScrollingImageProps {
	src: string
	alt: string
	className?: string
}

export function ScrollingImage({ src, alt, className = '' }: ScrollingImageProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isDesktop, setIsDesktop] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	// Wait for client-side hydration to complete
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Detect desktop viewport (lg breakpoint: 1024px)
	useEffect(() => {
		if (!isMounted) return

		const checkDesktop = () => {
			setIsDesktop(window.innerWidth >= 1024)
		}

		checkDesktop()
		window.addEventListener('resize', checkDesktop)
		return () => window.removeEventListener('resize', checkDesktop)
	}, [isMounted])

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	})

	// Transform scroll progress to Y position
	// The image will move down as we scroll through the article
	const y = useTransform(scrollYProgress, [0, 1], [0, 300])

	// Only apply animation on desktop after hydration
	if (!isMounted || !isDesktop) {
		return (
			<div ref={containerRef} className={className}>
				<div className="relative aspect-[4/3] w-full">
					<Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
				</div>
			</div>
		)
	}

	return (
		<div ref={containerRef} className={className}>
			<motion.div style={{ y }} className="will-change-transform">
				<div className="relative aspect-[4/3] w-full">
					<Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
				</div>
			</motion.div>
		</div>
	)
}
