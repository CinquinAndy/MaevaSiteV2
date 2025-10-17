import { ImageResponse } from 'next/og'
import { loadFont, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import { getServiceBySlug, getServices } from '@/lib/payload'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const services = await getServices()
	return services.map(service => ({
		slug: service.slug,
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const service = await getServiceBySlug(slug)
	const font = await loadFont()

	// Extract title (validated in getServiceBySlug)
	const title = service.seo_title || service.title!

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
