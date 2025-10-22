import config from '@payload-config'
import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import { loadFont, loadLogo, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import type { Blog } from '@/payload-types'

export const runtime = 'edge'
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const payload = await getPayload({ config })

	const { docs: posts } = await payload.find({
		collection: 'blog',
		where: {
			status: {
				equals: 'published',
			},
		},
		limit: 1000,
	})

	return posts.map(post => ({
		slug: post.slug,
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'blog',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const post = docs[0] as Blog | undefined

	if (!post) {
		const font = await loadFont()
		const logo = await loadLogo()
		return new ImageResponse(<OGImageTemplate title="Article non trouvé" logoSrc={logo} />, {
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
	const title = post.seo_title || post.title

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
		collection: 'blog',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	const post = docs[0] as Blog | undefined

	return {
		alt: post ? post.seo_title || post.title : 'Article non trouvé',
	}
}
