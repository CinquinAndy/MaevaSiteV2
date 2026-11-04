import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { withPayload } from '@payloadcms/next/withPayload'

/**
 * Identifiant du déploiement (protection contre le décalage de version, voir la doc Next « deploymentId »).
 * Écrit dans `.deployment-id` par le Dockerfile avant le build, et relu ici au build comme au démarrage
 * (`next start` réévalue ce fichier) : build et serveur ont toujours la même valeur. Absent en local : pas d'id.
 */
function readDeploymentId() {
	const file = path.join(import.meta.dirname, '.deployment-id')
	if (!existsSync(file)) return undefined
	const id = readFileSync(file, 'utf8').trim()
	return /^[A-Za-z0-9_-]{1,64}$/.test(id) ? id : undefined
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	outputFileTracingRoot: import.meta.dirname,
	deploymentId: readDeploymentId(),
	webpack: webpackConfig => {
		webpackConfig.resolve.extensionAlias = {
			'.cjs': ['.cts', '.cjs'],
			'.js': ['.ts', '.tsx', '.js', '.jsx'],
			'.mjs': ['.mts', '.mjs'],
		}

		return webpackConfig
	},
	async headers() {
		// Phase 1: Basic security headers that shouldn't interfere with PayPal
		await Promise.resolve() // Satisfy async requirement
		return [
			{
				source: '/(.*)',
				headers: [
					{
						value: 'nosniff',
						key: 'X-Content-Type-Options',
					},
					{
						value: 'strict-origin-when-cross-origin',
						key: 'Referrer-Policy',
					},
					{
						value: '1; mode=block',
						key: 'X-XSS-Protection',
					},
				],
			},
		]
	},
	trailingSlash: false,
	images: {
		remotePatterns: [
			{ protocol: 'http', hostname: 'localhost' },
			{ protocol: 'https', hostname: '*.cinquin-maeva.com' },
			{ protocol: 'https', hostname: 'cinquin-maeva.com' },
			{ protocol: 'https', hostname: '*.andy-cinquin.fr' },
			{ protocol: 'https', hostname: 'cdnjs.cloudflare.com' },
			{ protocol: 'https', hostname: '*.unsplash.com' },
		],
		qualities: [75, 90, 95, 100], // Add quality configurations
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
