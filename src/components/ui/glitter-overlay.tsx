'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iChannel0;
  uniform float opacity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    // Multiplier deux textures ensemble (technique sparkle simple)
    result += texture2D(iChannel0, uv * 1.1 + vec2(iTime * -0.005)).r;
    result *= texture2D(iChannel0, uv * 0.9 + vec2(iTime * 0.005)).g;

    // Créer des paillettes nettes
    result = pow(result, 12.0);

    // Amplifier
    vec3 color = vec3(5.0) * result;

    // Avec transparence pour overlay
    gl_FragColor = vec4(color, result * opacity);
  }
`

function generateNoiseTexture(size = 512): THREE.DataTexture {
	const data = new Uint8Array(size * size * 4)

	for (let i = 0; i < size * size; i++) {
		const stride = i * 4
		const r = Math.random() * 255
		const g = Math.random() * 255
		const b = Math.random() * 255

		data[stride] = r
		data[stride + 1] = g
		data[stride + 2] = b
		data[stride + 3] = 255
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
	opacity?: number
}

function SparklesPlane({ speed = 1, opacity = 1.0 }: SparklesPlaneProps) {
	const meshRef = useRef<THREE.Mesh>(null!)

	const noiseTexture = useMemo(() => generateNoiseTexture(512), [])

	const material = useMemo(() => {
		return new THREE.ShaderMaterial({
			uniforms: {
				iTime: { value: 0 },
				iResolution: {
					value: new THREE.Vector2(
						typeof window !== 'undefined' ? window.innerWidth : 1920,
						typeof window !== 'undefined' ? window.innerHeight : 1080,
					),
				},
				iChannel0: { value: noiseTexture },
				opacity: { value: opacity },
			},
			vertexShader,
			fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			side: THREE.DoubleSide,
		})
	}, [noiseTexture, opacity])

	useFrame((state) => {
		// Accéder directement au material de la mesh
		if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
			meshRef.current.material.uniforms.iTime.value = state.clock.elapsedTime * speed
			meshRef.current.material.uniforms.iResolution.value.set(state.size.width, state.size.height)
		}
	})

	return (
		<mesh ref={meshRef} material={material}>
			<planeGeometry args={[10, 10]} />
		</mesh>
	)
}

interface GlitterOverlayProps {
	speed?: number
	opacity?: number
	className?: string
}

export default function GlitterOverlay({ speed = 1, opacity = 0.8, className = '' }: GlitterOverlayProps) {
	return (
		<div className={`fixed inset-0 w-full h-full ${className}`} style={{ width: '100vw', height: '100vh' }}>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 75 }}
				gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
				style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
			>
				<SparklesPlane speed={speed} opacity={opacity} />
			</Canvas>
		</div>
	)
}
