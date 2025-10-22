'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Shader original de Shadertoy adapté
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iChannel0;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    // Échantillonner la texture de noise à différentes échelles et vitesses
    // Exactement comme dans le shader Shadertoy
    result += texture2D(iChannel0, uv * 1.1 + vec2(iTime * -0.005)).r;
    result *= texture2D(iChannel0, uv * 0.9 + vec2(iTime * 0.005)).g;

    // Fonction de puissance pour créer des paillettes nettes
    result = pow(result, 12.0);

    // Amplifier le résultat
    gl_FragColor = vec4(vec3(5.0) * result, 1.0);
  }
`

// Générer une texture de noise aléatoire
function generateNoiseTexture(size = 512): THREE.DataTexture {
	const data = new Uint8Array(size * size * 4)

	for (let i = 0; i < size * size; i++) {
		const stride = i * 4

		// Générer du bruit aléatoire pour chaque canal
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
	intensity?: number
}

function SparklesPlane({ speed = 1, intensity: _intensity = 5.0 }: SparklesPlaneProps) {
	const meshRef = useRef<THREE.Mesh>(null!)

	// Générer la texture de noise une seule fois
	const noiseTexture = useMemo(() => generateNoiseTexture(512), [])

	// Créer le matériau shader
	const material = useMemo(() => {
		return new THREE.ShaderMaterial({
			uniforms: {
				iTime: { value: 0 },
				iResolution: {
					value: new THREE.Vector2(
						typeof window !== 'undefined' ? window.innerWidth : 1920,
						typeof window !== 'undefined' ? window.innerHeight : 1080
					),
				},
				iChannel0: { value: noiseTexture },
			},
			vertexShader,
			fragmentShader,
			transparent: false,
			side: THREE.DoubleSide,
		})
	}, [noiseTexture])

	useFrame(state => {
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

interface GlitterFinalProps {
	speed?: number
	intensity?: number
	className?: string
}

export default function GlitterFinal({ speed = 1, intensity = 5.0, className = '' }: GlitterFinalProps) {
	return (
		<div
			className={`fixed z-[60] scale-125 custom-bg inset-0 w-full h-full opacity-50 mix-blend-lighten ${className}`}
			style={{ width: '100vw', height: '100vh' }}
		>
			<Canvas
				camera={{ position: [0, 0, 8], fov: 35 }}
				style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
				gl={{ powerPreference: 'high-performance' }}
			>
				<color attach="background" args={['#111111']} />
				<SparklesPlane speed={speed} intensity={intensity} />
			</Canvas>
		</div>
	)
}
