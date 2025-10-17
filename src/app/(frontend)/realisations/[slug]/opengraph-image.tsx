import { ImageResponse } from 'next/og'
import { loadFont, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import { getRealisationBySlug, getRealisations } from '@/lib/payload'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const realisations = await getRealisations()
	return realisations.map(realisation => ({
		slug: realisation.slug || '',
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const realisation = await getRealisationBySlug(slug)
	const font = await loadFont()

	// Extract title (validated in getRealisationBySlug, include location if available)
	let title = realisation.seo_title || realisation.title!

	if (!realisation.seo_title && realisation.location) {
		title = `${realisation.title!} - ${realisation.location}`
	}

	return new ImageResponse(<OGImageTemplate title={title} />, {
		...size,
		fonts: [
			{
				name: 'Apple Garamond',
				data: font,
				style: 'normal',
				weight: 700,
			},
		],
	})
}
