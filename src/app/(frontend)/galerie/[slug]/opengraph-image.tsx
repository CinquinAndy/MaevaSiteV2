import config from '@payload-config'
import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import { loadFont, loadLogo, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import type { Galery } from '@/payload-types'

export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: galeries } = await payload.find({
		collection: 'galery',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return galeries.map(galery => ({
		slug: galery.slug,
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'galery',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const galery = docs[0] as Galery | undefined

	if (!galery) {
		const font = await loadFont()
		const logo = await loadLogo()
		return new ImageResponse(<OGImageTemplate title="Galerie non trouvée" logoSrc={logo} />, {
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
	const title = galery.seo_title || galery.title

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
		collection: 'galery',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const galery = docs[0] as Galery | undefined

	return {
		alt: galery ? galery.seo_title || galery.title : 'Galerie non trouvée',
	}
}
