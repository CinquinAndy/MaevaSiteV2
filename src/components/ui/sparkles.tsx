'use client'

import { OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
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
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    // Sample noise texture at different scales and speeds
    result += texture2D(noiseTexture, uv * 1.1 + vec2(time * -0.005)).r;
    result *= texture2D(noiseTexture, uv * 0.9 + vec2(time * 0.005)).g;

    // Power function to create sharp sparkles
    result = pow(result, 12.0);

    // Amplify the result
    gl_FragColor = vec4(vec3(5.0 * result), result);
  }
`

// Generate a noise texture
const generateNoiseTexture = (size = 512): THREE.DataTexture => {
	const data = new Uint8Array(size * size * 4)

	for (let i = 0; i < size * size; i++) {
		const stride = i * 4
		const value = Math.random() * 255
		data[stride] = value
		data[stride + 1] = value
		data[stride + 2] = value
		data[stride + 3] = 255
	}

	const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping
	texture.needsUpdate = true

	return texture
}

interface SparklesPlaneProps {
	speed?: number
}

const SparklesPlane = ({ speed = 1 }: SparklesPlaneProps) => {
	const meshRef = useRef<THREE.Mesh>(null!)

	const noiseTexture = useMemo(() => generateNoiseTexture(512), [])

	const shaderMaterial = useMemo(
		() =>
			new THREE.ShaderMaterial({
				uniforms: {
					time: { value: 0 },
					noiseTexture: { value: noiseTexture },
					resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
				},
				vertexShader: sparklesVertexShader,
				fragmentShader: sparklesFragmentShader,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
			}),
		[noiseTexture]
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

interface SparklesProps {
	speed?: number
	className?: string
}

const Sparkles = ({ speed = 1, className = '' }: SparklesProps) => {
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
				<SparklesPlane speed={speed} />
			</Canvas>
		</div>
	)
}

export default Sparkles
