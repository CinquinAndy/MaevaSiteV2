import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

export const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	// Override the upload converter to use next/image
	upload: ({ node }) => {
		const uploadNode = node as SerializedUploadNode
		if (uploadNode.relationTo === 'media') {
			const uploadDoc = uploadNode.value as Media | undefined
			if (typeof uploadDoc !== 'object' || !uploadDoc?.url) {
				return null
			}

			return (
				<figure className="my-8 overflow-hidden rounded-xl">
					<Image
						alt={uploadDoc.alt || ''}
						height={uploadDoc.height || 800}
						src={uploadDoc.url}
						width={uploadDoc.width || 1200}
						className="w-full h-auto object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
					/>
					{uploadDoc.caption && (
						<figcaption className="mt-3 text-sm text-center text-muted-foreground italic">
							{uploadDoc.caption}
						</figcaption>
					)}
				</figure>
			)
		}

		return null
	},
})
