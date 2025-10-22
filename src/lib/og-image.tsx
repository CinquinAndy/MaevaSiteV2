import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Load Corinthia Bold font for OG images
 * Cached at module level to avoid re-reading on every image generation
 */
let fontCache: Buffer | null = null

export async function loadFont(): Promise<Buffer> {
	if (fontCache) return fontCache

	const fontPath = join(process.cwd(), 'public/fonts/Corinthia-Bold.ttf')
	fontCache = await readFile(fontPath)

	return fontCache
}

/**
 * Load logo.png for OG images as base64
 * Cached at module level to avoid re-reading on every image generation
 */
let logoCache: string | null = null

export async function loadLogo(): Promise<string> {
	if (logoCache) return logoCache

	const logoPath = join(process.cwd(), '/logo.png')
	const logoBuffer = await readFile(logoPath)
	logoCache = `data:image/png;base64,${logoBuffer.toString('base64')}`

	return logoCache
}

/**
 * OG Image Template Component
 * Dark background with pink accents, logo bottom-left, title centered, URL bottom-right
 */
export function OGImageTemplate({ title, logoSrc }: { title: string; logoSrc: string }) {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				position: 'relative',
				background: '#2d2528',
			}}
		>
			{/* Logo bottom-left */}
			{/* biome-ignore lint: Satori ImageResponse requires standard img tag, Next.js Image not supported */}
			<img
				src={logoSrc}
				alt="Logo"
				style={{
					position: 'absolute',
					bottom: 40,
					left: 40,
					height: 100,
					width: 'auto',
				}}
			/>

			{/* Title - centered with padding */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					padding: '80px 80px 80px 80px',
					width: '100%',
					height: '100%',
				}}
			>
				<div
					style={{
						fontSize: 80,
						fontWeight: 700,
						color: '#f5f3f0',
						lineHeight: 1.2,
						maxWidth: '900px',
						textAlign: 'left',
					}}
				>
					{title}
				</div>
			</div>

			{/* Site URL bottom-right */}
			<div
				style={{
					position: 'absolute',
					bottom: 50,
					right: 60,
					fontSize: 24,
					color: '#c9a8b4',
					fontWeight: 400,
				}}
			>
				cinquin-maeva.com
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

export const OG_IMAGE_ALT = 'Maeva Cinquin - Maquilleuse Professionnelle'
export const OG_IMAGE_CONTENT_TYPE = 'image/png'
