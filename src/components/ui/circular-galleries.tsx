'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface GaleryItem {
	title: string
	category: string
	image: string
	href: string
}

interface CircularGalleriesProps {
	galleries: GaleryItem[]
	autoplay?: boolean
}

function calculateGap(width: number) {
	const minWidth = 1024
	const maxWidth = 1456
	const minGap = 60
	const maxGap = 86
	if (width <= minWidth) return minGap
	if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
	return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth)
}

export function CircularGalleries({ galleries, autoplay = true }: CircularGalleriesProps) {
	const [activeIndex, setActiveIndex] = useState(0)
	const [containerWidth, setContainerWidth] = useState(1200)

	const imageContainerRef = useRef<HTMLDivElement>(null)
	const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const galleriesLength = useMemo(() => galleries.length, [galleries])
	const activeGalery = useMemo(() => galleries[activeIndex], [activeIndex, galleries])

	// Responsive gap calculation
	useEffect(() => {
		function handleResize() {
			if (imageContainerRef.current) {
				setContainerWidth(imageContainerRef.current.offsetWidth)
			}
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Autoplay
	useEffect(() => {
		if (autoplay) {
			autoplayIntervalRef.current = setInterval(() => {
				setActiveIndex(prev => (prev + 1) % galleriesLength)
			}, 5000)
		}
		return () => {
			if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
		}
	}, [autoplay, galleriesLength])

	// Keyboard navigation
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') handlePrev()
			if (e.key === 'ArrowRight') handleNext()
		}
		window.addEventListener('keydown', handleKey)
		return () => window.removeEventListener('keydown', handleKey)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex, galleriesLength])

	// Navigation handlers
	const handleNext = useCallback(() => {
		setActiveIndex(prev => (prev + 1) % galleriesLength)
		if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
	}, [galleriesLength])

	const handlePrev = useCallback(() => {
		setActiveIndex(prev => (prev - 1 + galleriesLength) % galleriesLength)
		if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
	}, [galleriesLength])

	// Compute transforms for each image
	function getImageStyle(index: number): React.CSSProperties {
		const gap = calculateGap(containerWidth)
		const maxStickUp = gap * 0.8
		const isActive = index === activeIndex
		const isLeft = (activeIndex - 1 + galleriesLength) % galleriesLength === index
		const isRight = (activeIndex + 1) % galleriesLength === index

		if (isActive) {
			return {
				zIndex: 3,
				opacity: 1,
				pointerEvents: 'auto',
				transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
				transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
			}
		}
		if (isLeft) {
			return {
				zIndex: 2,
				opacity: 1,
				pointerEvents: 'auto',
				transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
				transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
			}
		}
		if (isRight) {
			return {
				zIndex: 2,
				opacity: 1,
				pointerEvents: 'auto',
				transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
				transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
			}
		}
		return {
			zIndex: 1,
			opacity: 0,
			pointerEvents: 'none',
			transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
		}
	}

	const textVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	}

	return (
		<div className="w-full max-w-5xl px-4 md:px-8">
			<div className="grid gap-12 md:gap-20 md:grid-cols-2">
				{/* Images */}
				<div ref={imageContainerRef} className="relative w-full h-96" style={{ perspective: '1000px' }}>
					{galleries.map((galery, index) => {
						const isActive = index === activeIndex
						return (
							<div key={galery.image} className="absolute w-full h-full" style={getImageStyle(index)}>
								<Image
									src={galery.image}
									alt={galery.title}
									fill
									className="object-cover rounded-3xl shadow-2xl"
									data-index={index}
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
								{/* Glassy badge with number */}
								{isActive && (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3 }}
										className="absolute top-4 right-4 z-10 backdrop-blur-md bg-background/30 border border-white/20 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
									>
										<span className="text-foreground font-bold text-lg">{index + 1}</span>
									</motion.div>
								)}
							</div>
						)
					})}
				</div>

				{/* Content */}
				<div className="flex flex-col justify-between">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeIndex}
							variants={textVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="space-y-4"
						>
							<h3 className="text-4xl font-bold text-foreground">{activeGalery.title}</h3>
							<p className="text-lg text-muted-foreground">{activeGalery.category}</p>
							<motion.div className="pt-4">
								<a
									href={activeGalery.href}
									className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
								>
									Voir la galerie
									<FaArrowRight className="w-4 h-4" />
								</a>
							</motion.div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation */}
					<div className="flex gap-6 pt-12 md:pt-0">
						<button
							type="button"
							className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-primary hover:bg-primary hover:text-primary-foreground text-primary"
							onClick={handlePrev}
							aria-label="Previous galery"
						>
							<FaArrowLeft size={20} />
						</button>
						<button
							type="button"
							className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-primary hover:bg-primary hover:text-primary-foreground text-primary"
							onClick={handleNext}
							aria-label="Next galery"
						>
							<FaArrowRight size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
