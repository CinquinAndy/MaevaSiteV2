import Image from 'next/image'
import React from 'react'

interface BlobMaskedImageProps {
	src: string
	alt: string
	className?: string
	priority?: boolean
	useVerticalOnMobile?: boolean
}

export const BlobMaskedImage = React.forwardRef<HTMLDivElement, BlobMaskedImageProps>(
	({ src, alt, className = '', priority = false, useVerticalOnMobile = true }, ref) => {
		return (
			<div
				ref={ref}
				className={`relative w-full h-full blob-mask-responsive ${className}`}
				style={
					{
						'--blob-mask-mobile': useVerticalOnMobile ? 'url(/blob_bg_vertical.svg)' : 'url(/blob_bg.svg)',
						'--blob-mask-desktop': 'url(/blob_bg.svg)',
						maskImage: 'var(--blob-mask-mobile)',
						WebkitMaskImage: 'var(--blob-mask-mobile)',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat',
						maskSize: 'contain',
						WebkitMaskSize: 'contain',
						maskPosition: 'center',
						WebkitMaskPosition: 'center',
					} as React.CSSProperties
				}
			>
				<Image
					src={src}
					alt={alt}
					fill
					className="object-cover transition-transform duration-300 hover:scale-105"
					priority={priority}
				/>
			</div>
		)
	}
)

BlobMaskedImage.displayName = 'BlobMaskedImage'
