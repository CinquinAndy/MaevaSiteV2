import { ImageResponse } from 'next/og'
import { loadFont, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import { getContactPageData } from '@/lib/payload'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export default async function Image() {
	const contactPage = await getContactPageData()
	const font = await loadFont()

	// Extract title (validated in getContactPageData)
	const title = contactPage.seo_title || contactPage.hero!.title!

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
