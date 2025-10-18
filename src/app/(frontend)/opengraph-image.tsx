import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Maeva Cinquin - Maquilleuse Professionnelle'
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				fontSize: 64,
				background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			<div
				style={{
					fontSize: 80,
					fontWeight: 'bold',
					background: 'linear-gradient(90deg, #d4a5a5 0%, #a47878 100%)',
					backgroundClip: 'text',
					color: 'transparent',
					marginBottom: 20,
				}}
			>
				Maeva Cinquin
			</div>
			<div
				style={{
					fontSize: 40,
					color: '#666',
				}}
			>
				Maquilleuse Professionnelle
			</div>
		</div>,
		{
			...size,
		}
	)
}
