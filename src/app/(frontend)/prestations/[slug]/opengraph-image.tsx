import config from '@payload-config'
import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import { loadFont, loadLogo, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import type { Service } from '@/payload-types'

export const runtime = 'edge'
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: services } = await payload.find({
		collection: 'services',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return services.map(service => ({
		slug: service.slug,
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'services',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const service = docs[0] as Service | undefined

	if (!service) {
		const font = await loadFont()
		const logo = await loadLogo()
		return new ImageResponse(<OGImageTemplate title="Service non trouvé" logoSrc={logo} />, {
			...size,
			fonts: [
				{
					name: 'Corinthia',
					data: font,
					style: 'normal',
					weight: 700,
				},
			],
		})
	}

	const font = await loadFont()
	const logo = await loadLogo()
	const title = service.seo_title || service.title

	return new ImageResponse(<OGImageTemplate title={title} logoSrc={logo} />, {
		...size,
		fonts: [
			{
				name: 'Corinthia',
				data: font,
				style: 'normal',
				weight: 700,
			},
		],
	})
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'services',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const service = docs[0] as Service | undefined

	return {
		alt: service ? service.seo_title || service.title : 'Service non trouvé',
	}
}
