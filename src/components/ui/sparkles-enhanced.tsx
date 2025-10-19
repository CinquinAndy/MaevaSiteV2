'use client'

import { OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'

const sparklesVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const sparklesFragmentShader = `
  uniform float time;
  uniform sampler2D noiseTexture;
  uniform vec2 resolution;
  uniform float intensity;
  uniform float scale1;
  uniform float scale2;
  uniform float speed1;
  uniform float speed2;
  uniform float power;
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    // Sample noise texture at different scales and speeds (customizable)
    result += texture2D(noiseTexture, uv * scale1 + vec2(time * speed1)).r;
    result *= texture2D(noiseTexture, uv * scale2 + vec2(time * speed2)).g;

    // Power function to create sharp sparkles (customizable)
    result = pow(result, power);

    // Apply color and intensity
    vec3 sparkleColor = color * intensity * result;
    gl_FragColor = vec4(sparkleColor, result);
  }
`

// Generate a smoother noise texture with better distribution
const generateNoiseTexture = (size = 512): THREE.DataTexture => {
	const data = new Uint8Array(size * size * 4)

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const i = (y * size + x) * 4

			// Create multiple octaves of noise for better detail
			const noise1 = Math.random()
			const noise2 = Math.random()
			const noise3 = Math.random()

			const value = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2) * 255

			data[i] = value
			data[i + 1] = value
			data[i + 2] = value
			data[i + 3] = 255
		}
	}

	const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping
	texture.minFilter = THREE.LinearFilter
	texture.magFilter = THREE.LinearFilter
	texture.needsUpdate = true

	return texture
}

interface SparklesPlaneProps {
	speed?: number
	intensity?: number
	scale1?: number
	scale2?: number
	speed1?: number
	speed2?: number
	power?: number
	color?: string
}

const SparklesPlane = ({
	speed = 1,
	intensity = 5.0,
	scale1 = 1.1,
	scale2 = 0.9,
	speed1 = -0.005,
	speed2 = 0.005,
	power = 12.0,
	color = '#ffffff',
}: SparklesPlaneProps) => {
	const meshRef = useRef<THREE.Mesh>(null!)

	const noiseTexture = useMemo(() => generateNoiseTexture(512), [])

	const colorRGB = useMemo(() => {
		const col = new THREE.Color(color)
		return new THREE.Vector3(col.r, col.g, col.b)
	}, [color])

	const shaderMaterial = useMemo(
		() =>
			new THREE.ShaderMaterial({
				uniforms: {
					time: { value: 0 },
					noiseTexture: { value: noiseTexture },
					resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
					intensity: { value: intensity },
					scale1: { value: scale1 },
					scale2: { value: scale2 },
					speed1: { value: speed1 },
					speed2: { value: speed2 },
					power: { value: power },
					color: { value: colorRGB },
				},
				vertexShader: sparklesVertexShader,
				fragmentShader: sparklesFragmentShader,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
			}),
		[noiseTexture, intensity, scale1, scale2, speed1, speed2, power, colorRGB]
	)

	useFrame((_, delta) => {
		if (meshRef.current) {
			shaderMaterial.uniforms.time.value += delta * speed
		}
	})

	return (
		<mesh ref={meshRef} material={shaderMaterial}>
			<planeGeometry args={[2, 2]} />
		</mesh>
	)
}

interface SparklesEnhancedProps {
	speed?: number
	intensity?: number
	scale1?: number
	scale2?: number
	speed1?: number
	speed2?: number
	power?: number
	color?: string
	className?: string
}

const SparklesEnhanced = ({
	speed = 1,
	intensity = 5.0,
	scale1 = 1.1,
	scale2 = 0.9,
	speed1 = -0.005,
	speed2 = 0.005,
	power = 12.0,
	color = '#ffffff',
	className = '',
}: SparklesEnhancedProps) => {
	return (
		<div className={`w-full h-full ${className}`}>
			<Canvas
				className="w-full h-full"
				gl={{
					alpha: true,
					antialias: false,
					powerPreference: 'high-performance',
				}}
			>
				<OrthographicCamera makeDefault position={[0, 0, 1]} zoom={1} />
				<SparklesPlane
					speed={speed}
					intensity={intensity}
					scale1={scale1}
					scale2={scale2}
					speed1={speed1}
					speed2={speed2}
					power={power}
					color={color}
				/>
			</Canvas>
		</div>
	)
}

export default SparklesEnhanced
