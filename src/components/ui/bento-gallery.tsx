'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'

interface GalleryImage {
	image: Media
	caption?: string | null
	id?: string | null
}

interface BentoGalleryProps {
	images: GalleryImage[]
}

// Génère automatiquement les spans pour le layout bento
const generateBentoLayout = (totalImages: number): string[] => {
	const layouts: string[] = []

	for (let i = 0; i < totalImages; i++) {
		// Alterne les patterns pour créer un effet bento varié
		if (i % 7 === 0) {
			layouts.push('md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2') // Grand
		} else if (i % 5 === 0) {
			layouts.push('md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2') // Vertical
		} else if (i % 3 === 0) {
			layouts.push('md:col-span-2 md:row-span-1 sm:col-span-2 sm:row-span-1') // Horizontal
		} else {
			layouts.push('md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1') // Petit
		}
	}

	return layouts
}

// Modal pour afficher l'image en grand
interface ImageModalProps {
	image: GalleryImage
	isOpen: boolean
	onClose: () => void
	onNext: () => void
	onPrev: () => void
	currentIndex: number
	totalImages: number
}

function ImageModal({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }: ImageModalProps) {
	if (!isOpen) return null

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
			onClick={onClose}
		>
			<div className="relative w-full max-w-7xl h-full max-h-[90vh] flex items-center justify-center">
				{/* Image principale */}
				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.95, opacity: 0 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					className="relative w-full h-full flex items-center justify-center"
					onClick={e => e.stopPropagation()}
				>
					<div className="relative w-full h-full">
						<Image
							src={image.image.url || ''}
							alt={image.image.alt || image.caption || 'Image'}
							fill
							className="object-contain"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
							priority
						/>
					</div>

					{/* Caption */}
					{image.caption && (
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
						>
							<p className="text-white text-lg text-center">{image.caption}</p>
						</motion.div>
					)}
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
								onPrev()
							}}
							className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							type="button"
							onClick={e => {
								e.stopPropagation()
								onNext()
							}}
							className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
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

export function BentoGallery({ images }: BentoGalleryProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const validImages = images.filter(item => item.image?.url)
	const layouts = generateBentoLayout(validImages.length)

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
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: { staggerChildren: 0.05 },
					},
				}}
			>
				{validImages.map((item, index) => (
					<motion.div
						key={item.id || index}
						className={cn(
							'group relative overflow-hidden rounded-xl cursor-pointer bg-muted',
							'transition-all hover:shadow-2xl hover:z-10',
							layouts[index] || 'md:col-span-1 md:row-span-1'
						)}
						variants={{
							hidden: { y: 20, scale: 0.95, opacity: 0 },
							visible: {
								y: 0,
								scale: 1,
								opacity: 1,
								transition: {
									type: 'spring',
									stiffness: 300,
									damping: 25,
								},
							},
						}}
						whileHover={{ scale: 1.02 }}
						onClick={() => setSelectedIndex(index)}
					>
						{/* Image */}
						<div className="absolute inset-0">
							<Image
								src={item.image.url || ''}
								alt={item.image.alt || item.caption || `Image ${index + 1}`}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-110"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
							/>
						</div>

						{/* Overlay avec caption */}
						{item.caption && (
							<motion.div
								className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
							>
								<p className="text-white text-sm md:text-base font-medium line-clamp-2">{item.caption}</p>
							</motion.div>
						)}

						{/* Effet de brillance au survol */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</motion.div>
				))}
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
