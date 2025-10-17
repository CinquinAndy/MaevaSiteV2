'use client'

import { Warp } from '@paper-design/shaders-react'
import { useEffect, useState } from 'react'

interface WarpShaderProps {
	colors?: string[]
	proportion?: number
	softness?: number
	distortion?: number
	swirl?: number
	swirlIterations?: number
	shape?: 'edge' | 'checks' | 'stripes'
	shapeScale?: number
	scale?: number
	rotation?: number
	speed?: number
}

export function WarpShader({
	colors = ['hsl(140, 60%, 35%)', 'hsl(120, 70%, 45%)', 'hsl(160, 50%, 40%)', 'hsl(100, 65%, 50%)'],
	proportion = 0.45,
	softness = 1,
	distortion = 0.25,
	swirl = 0.8,
	swirlIterations = 10,
	shape = 'checks',
	shapeScale = 0.1,
	scale = 1,
	rotation = 0,
	speed = 1,
}: WarpShaderProps) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<div className="absolute inset-0">
			{isMounted && (
				<Warp
					style={{ height: '100%', width: '100%' }}
					proportion={proportion}
					softness={softness}
					distortion={distortion}
					swirl={swirl}
					swirlIterations={swirlIterations}
					shape={shape}
					shapeScale={shapeScale}
					scale={scale}
					rotation={rotation}
					speed={speed}
					colors={colors}
				/>
			)}
		</div>
	)
}
