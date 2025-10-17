import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Load Apple Garamond Bold font for OG images
 * Cached at module level to avoid re-reading on every image generation
 */
let fontCache: Buffer | null = null

export async function loadFont(): Promise<Buffer> {
	if (fontCache) return fontCache

	const fontPath = join(process.cwd(), 'public/font/AppleGaramond-Bold.ttf')
	fontCache = await readFile(fontPath)

	return fontCache
}

/**
 * OG Image Template Component
 * Simple design with centered title on #F5F1EC background
 */
export function OGImageTemplate({ title }: { title: string }) {
	return (
		<div tw="h-full w-full flex bg-[#F5F1EC] relative">
			{/* biome-ignore lint: it's for og image, not really important to set the classic nextjs image */}
			<img
				src="https://r2-andycinquin.andy-cinquin.fr/og_de5f87a262.svg"
				alt="Blob"
				tw="absolute top-0 left-0 w-full h-full"
			/>
			<div tw="p-10 w-[700px] h-full flex justify-center items-center text-7xl font-bold text-[#3e2723] text-left">
				{title}
			</div>
			<div tw="absolute bottom-0 left-0 p-10 w-[700px] flex text-3xl underline text-[#806560] text-left italic">
				https://nature-paysage-laheux.fr
			</div>
		</div>
	)
}

/**
 * Common OG image metadata
 */
export const OG_IMAGE_SIZE = {
	width: 1200,
	height: 630,
}

export const OG_IMAGE_ALT = 'Nature Paysage Laheux - Éco-Paysagiste Loire-Atlantique'
export const OG_IMAGE_CONTENT_TYPE = 'image/png'
