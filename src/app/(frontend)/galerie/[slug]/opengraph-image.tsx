import config from '@payload-config'
import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import { loadFont, loadLogo, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import type { Gallery } from '@/payload-types'

export const runtime = 'edge'
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: galleries } = await payload.find({
		collection: 'gallery',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return galleries.map(gallery => ({
		slug: gallery.slug,
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'gallery',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const gallery = docs[0] as Gallery | undefined

	if (!gallery) {
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
	const title = gallery.seo_title || gallery.title

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
		collection: 'gallery',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const gallery = docs[0] as Gallery | undefined

	return {
		alt: gallery ? gallery.seo_title || gallery.title : 'Galerie non trouvée',
	}
}
