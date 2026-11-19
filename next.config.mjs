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
	// Pas d'en-tête « X-Powered-By: Next.js » : inutile d'annoncer la pile aux scanners.
	poweredByHeader: false,
	webpack: webpackConfig => {
		webpackConfig.resolve.extensionAlias = {
			'.cjs': ['.cts', '.cjs'],
			'.js': ['.ts', '.tsx', '.js', '.jsx'],
			'.mjs': ['.mts', '.mjs'],
		}

		return webpackConfig
	},
	async headers() {
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
						// Filtre XSS des anciens navigateurs : désactivé, il créait plus de failles qu'il n'en bouchait.
						value: '0',
						key: 'X-XSS-Protection',
					},
					{
						// HTTPS imposé pendant un an (le site est déjà servi en HTTPS par Coolify).
						value: 'max-age=31536000',
						key: 'Strict-Transport-Security',
					},
					{
						// Le site (et la page de connexion de l'admin) ne peut pas être affiché dans un cadre
						// d'un autre site : protège contre le détournement de clic.
						value: 'SAMEORIGIN',
						key: 'X-Frame-Options',
					},
					{
						value: "frame-ancestors 'self'",
						key: 'Content-Security-Policy',
					},
					{
						value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
						key: 'Permissions-Policy',
					},
				],
			},
		]
	},
	trailingSlash: false,
	images: {
		remotePatterns: [
			// localhost seulement en développement : en production, l'optimiseur d'images ne doit rien aller
			// chercher sur le serveur lui-même.
			...(process.env.NODE_ENV === 'production' ? [] : [{ protocol: 'http', hostname: 'localhost' }]),
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
