'use client'

import { motion } from 'framer-motion'
import { Blob1, Blob2, Blob3, Blob5, Blob8 } from '@/components/blobs/blobs'

interface AnimatedBlobsProps {
	className?: string
}

export function AnimatedBlobs({ className }: AnimatedBlobsProps) {
	return (
		<div className={className}>
			{/* Blob 1 - Top Left */}
			<motion.div
				className="absolute -top-16 -left-16 w-48 h-48 opacity-30"
				animate={{
					x: [0, 30, 0],
					y: [0, 50, 0],
					rotate: [0, 45, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{
					duration: 15,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
				}}
			>
				<Blob1 />
			</motion.div>

			{/* Blob 2 - Middle Right */}
			<motion.div
				className="absolute top-1/4 -right-24 w-64 h-64 opacity-25"
				animate={{
					x: [0, -40, 0],
					y: [0, 30, 0],
					rotate: [0, -60, 0],
					scale: [1, 1.15, 1],
				}}
				transition={{
					duration: 18,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 1,
				}}
			>
				<Blob2 />
			</motion.div>

			{/* Blob 3 - Bottom Left */}
			<motion.div
				className="absolute -bottom-20 left-8 w-56 h-56 opacity-35"
				animate={{
					x: [0, 40, 0],
					y: [0, -30, 0],
					rotate: [0, 30, 0],
					scale: [1, 1.2, 1],
				}}
				transition={{
					duration: 20,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 2,
				}}
			>
				<Blob3 />
			</motion.div>

			{/* Blob 5 - Top Right */}
			<motion.div
				className="absolute top-8 right-16 w-40 h-40 opacity-20"
				animate={{
					x: [0, -20, 0],
					y: [0, 40, 0],
					rotate: [0, 90, 0],
					scale: [1, 1.25, 1],
				}}
				transition={{
					duration: 16,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 1.5,
				}}
			>
				<Blob5 />
			</motion.div>

			{/* Blob 8 - Center */}
			<motion.div
				className="absolute top-1/2 left-1/3 w-52 h-52 opacity-15"
				animate={{
					x: [0, 35, 0],
					y: [0, -40, 0],
					rotate: [0, -45, 0],
					scale: [1, 1.3, 1],
				}}
				transition={{
					duration: 22,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 0.5,
				}}
			>
				<Blob8 />
			</motion.div>
		</div>
	)
}
