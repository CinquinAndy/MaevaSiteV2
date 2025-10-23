'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Media } from '@/payload-types'

interface GaleryImage {
	image: Media
	caption?: string | null
	id?: string | null
}

interface BentoGaleryProps {
	images: GaleryImage[]
}

// Modal pour afficher l'image en grand
interface ImageModalProps {
	image: GaleryImage
	isOpen: boolean
	onClose: () => void
	onNext: () => void
	onPrev: () => void
	currentIndex: number
	totalImages: number
}

function ImageModal({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }: ImageModalProps) {
	const [direction, setDirection] = useState(0)

	// Gestion du clavier
	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			} else if (e.key === 'ArrowLeft') {
				setDirection(-1)
				onPrev()
			} else if (e.key === 'ArrowRight') {
				setDirection(1)
				onNext()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, onClose, onNext, onPrev])

	if (!isOpen) return null

	const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
		const swipeThreshold = 50 // Distance minimale pour déclencher un swipe
		const swipeOffset = info.offset.x

		if (Math.abs(swipeOffset) > swipeThreshold) {
			if (swipeOffset > 0) {
				// Swipe vers la droite - image précédente
				setDirection(-1)
				onPrev()
			} else {
				// Swipe vers la gauche - image suivante
				setDirection(1)
				onNext()
			}
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
			onClick={onClose}
		>
			<div className="relative w-full max-w-7xl h-full max-h-[90vh] flex items-center justify-center">
				{/* Image principale avec drag/swipe */}
				<motion.div
					key={currentIndex} // Force la ré-animation à chaque changement d'image
					initial={{ x: direction * 300, opacity: 0, scale: 0.95 }}
					animate={{ x: 0, opacity: 1, scale: 1 }}
					exit={{ x: direction * -300, opacity: 0, scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.2}
					onDragEnd={handleDragEnd}
					className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
					onClick={e => e.stopPropagation()}
				>
					<div className="relative w-full h-full pointer-events-none">
						<Image
							src={image.image.url || ''}
							alt={image.image.alt || image.caption || 'Image'}
							fill
							className="object-contain select-none"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
							priority
							draggable={false}
						/>
					</div>
				</motion.div>

				{/* Bouton fermer */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
				>
					<X className="w-6 h-6" />
				</button>

				{/* Navigation */}
				{totalImages > 1 && (
					<>
						<button
							type="button"
							onClick={e => {
								e.stopPropagation()
								setDirection(-1)
								onPrev()
							}}
							className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 z-10"
							aria-label="Image précédente"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							type="button"
							onClick={e => {
								e.stopPropagation()
								setDirection(1)
								onNext()
							}}
							className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 z-10"
							aria-label="Image suivante"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>

						{/* Compteur */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
							{currentIndex + 1} / {totalImages}
						</div>
					</>
				)}
			</div>
		</motion.div>
	)
}

export function BentoGalery({ images }: BentoGaleryProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const validImages = images.filter(item => item.image?.url)

	const handleNext = () => {
		if (selectedIndex === null) return
		setSelectedIndex((selectedIndex + 1) % validImages.length)
	}

	const handlePrev = () => {
		if (selectedIndex === null) return
		setSelectedIndex((selectedIndex - 1 + validImages.length) % validImages.length)
	}

	if (validImages.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">Aucune image disponible dans cette galerie.</p>
			</div>
		)
	}

	return (
		<>
			{/* Galerie masonry compacte avec CSS columns */}
			<motion.div
				className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.05 }}
				variants={{
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: { staggerChildren: 0.05 },
					},
				}}
			>
				{validImages.map((item, index) => {
					const width = item.image.width || 400
					const height = item.image.height || 600

					return (
						<motion.div
							key={item.id || index}
							className="break-inside-avoid mb-3"
							variants={{
								hidden: { y: 20, opacity: 0 },
								visible: {
									y: 0,
									opacity: 1,
									transition: {
										type: 'spring',
										stiffness: 300,
										damping: 25,
									},
								},
							}}
						>
							<button
								type="button"
								className="group relative w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl border-0 p-0 bg-transparent"
								onClick={() => setSelectedIndex(index)}
								style={{
									aspectRatio: `${width} / ${height}`,
								}}
							>
								<Image
									src={item.image.url || ''}
									alt={item.image.alt || item.caption || `Image ${index + 1}`}
									width={width}
									height={height}
									className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									quality={95}
								/>

								{/* Effet de brillance au survol */}
								<div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
							</button>
						</motion.div>
					)
				})}
			</motion.div>

			{/* Modal */}
			<AnimatePresence>
				{selectedIndex !== null && (
					<ImageModal
						image={validImages[selectedIndex]}
						isOpen={selectedIndex !== null}
						onClose={() => setSelectedIndex(null)}
						onNext={handleNext}
						onPrev={handlePrev}
						currentIndex={selectedIndex}
						totalImages={validImages.length}
					/>
				)}
			</AnimatePresence>
		</>
	)
}
