'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface GalleryImage {
	src: string
	alt: string
}

interface ImageGalleryModalProps {
	images: GalleryImage[]
}

export default function ImageGalleryModal({ images }: ImageGalleryModalProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button
					type="button"
					className="inline-flex items-center gap-x-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors duration-200"
				>
					<ImageIcon className="size-5" aria-hidden="true" />
					Voir la galerie photos
				</button>
			</Dialog.Trigger>

			<Dialog.Portal>
				{/* Backdrop overlay */}
				<Dialog.Overlay className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

				{/* Modal content */}
				<Dialog.Content className="fixed left-[50%] top-[50%] z-[501] max-h-[90vh] w-[95vw] max-w-7xl translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-2xl bg-sidebar-accent p-6 shadow-2xl sm:p-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<Dialog.Title className="text-2xl font-semibold text-white">Galerie Photos</Dialog.Title>
						<Dialog.Close asChild>
							<button
								type="button"
								className="rounded-lg p-2 text-white hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
								aria-label="Fermer"
							>
								<X className="size-6" aria-hidden="true" />
							</button>
						</Dialog.Close>
					</div>

					{/* Gallery Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{images.map(image => (
							<div key={image.src} className="relative group aspect-square overflow-hidden rounded-lg bg-gray-100">
								<Image
									src={image.src}
									alt={image.alt}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="object-cover transition-transform duration-300 group-hover:scale-110"
									loading="lazy"
								/>
								{/* Overlay on hover */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
							</div>
						))}
					</div>

					{/* Footer */}
					<div className="mt-6 flex justify-end">
						<Dialog.Close asChild>
							<button
								type="button"
								className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors duration-200"
							>
								Fermer
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
