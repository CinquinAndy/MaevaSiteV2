import { ImageResponse } from 'next/og'
import {
	loadFont,
	loadLogo,
	OG_IMAGE_CONTENT_TYPE,
	OG_IMAGE_SIZE,
	OGImageTemplate,
} from '@/lib/og-image'

export const runtime = 'edge'
export const alt = 'Contact - Maeva Cinquin'
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export default async function Image() {
	const font = await loadFont()
	const logo = await loadLogo()

	return new ImageResponse(<OGImageTemplate title="Contact - Maeva Cinquin" logoSrc={logo} />, {
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

