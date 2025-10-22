import { ImageResponse } from 'next/og'
import { loadFont, loadLogo, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'

export const alt = 'Blog - Conseils & Actualités - Maeva Cinquin'
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export default async function Image() {
	const font = await loadFont()
	const logo = await loadLogo()

	return new ImageResponse(<OGImageTemplate title="Blog - Conseils & Actualités" logoSrc={logo} />, {
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
