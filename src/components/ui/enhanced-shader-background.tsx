'use client'

import { MeshGradient, Warp } from '@paper-design/shaders-react'
import { useEffect, useState } from 'react'

interface EnhancedShaderBackgroundProps {
	colors?: string[]
	variant?: 'nature' | 'energy' | 'calm'
}

const shaderPresets = {
	nature: {
		warpColors: [
			'hsl(140, 60%, 35%)', // Vert nature foncé
			'hsl(120, 70%, 45%)', // Vert paysage
			'hsl(160, 50%, 40%)', // Vert-bleu
			'hsl(100, 65%, 50%)', // Vert clair
		],
		meshColors: ['#1a4d2e', '#2d5f3f', '#4a7c59', '#83b271'],
	},
	energy: {
		warpColors: ['hsl(160, 70%, 30%)', 'hsl(140, 80%, 40%)', 'hsl(120, 75%, 35%)', 'hsl(100, 70%, 45%)'],
		meshColors: ['#0f3d2e', '#1a5c3f', '#2d7a52', '#4a9868'],
	},
	calm: {
		warpColors: ['hsl(150, 50%, 40%)', 'hsl(130, 60%, 45%)', 'hsl(170, 45%, 38%)', 'hsl(110, 55%, 48%)'],
		meshColors: ['#1e4d3a', '#2f6347', '#3f7a52', '#5a9164'],
	},
}

export function EnhancedShaderBackground({ variant = 'nature', colors }: EnhancedShaderBackgroundProps) {
	const [isMounted, setIsMounted] = useState(false)
	const preset = shaderPresets[variant]
	const warpColors = colors || preset.warpColors

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<div className="absolute inset-0">
			{/* Base Mesh Gradient Layer */}
			{isMounted && (
				<div className="absolute inset-0 opacity-40">
					<MeshGradient style={{ height: '100%', width: '100%' }} colors={preset.meshColors} speed={0.3} />
				</div>
			)}

			{/* Primary Warp Layer */}
			{isMounted && (
				<div className="absolute inset-0">
					<Warp
						style={{ height: '100%', width: '100%' }}
						proportion={0.45}
						softness={1.2}
						distortion={0.3}
						swirl={1}
						swirlIterations={12}
						shape="checks"
						shapeScale={0.08}
						scale={1.2}
						rotation={0}
						speed={0.4}
						colors={warpColors}
					/>
				</div>
			)}

			{/* Secondary Warp Layer with different pattern */}
			{isMounted && (
				<div className="absolute inset-0 opacity-30">
					<Warp
						style={{ height: '100%', width: '100%' }}
						proportion={0.5}
						softness={0.8}
						distortion={0.2}
						swirl={0.6}
						swirlIterations={8}
						shape="stripes"
						shapeScale={0.15}
						scale={0.8}
						rotation={45}
						speed={0.6}
						colors={warpColors.map(c => c)}
					/>
				</div>
			)}

			{/* Ambient glow effects overlay */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDuration: '4s' }}
				/>
				<div
					className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl animate-pulse"
					style={{ animationDuration: '5s', animationDelay: '1s' }}
				/>
				<div
					className="absolute top-1/2 right-1/3 w-64 h-64 bg-lime-500/6 rounded-full blur-2xl animate-pulse"
					style={{ animationDuration: '6s', animationDelay: '0.5s' }}
				/>
			</div>

			{/* Vignette overlay for depth */}
			<div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
		</div>
	)
}
