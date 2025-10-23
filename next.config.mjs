import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	outputFileTracingRoot: import.meta.dirname,
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
	// Configure serverless function timeout for Payload API routes (especially media from S3)
	serverRuntimeConfig: {
		apiTimeout: 60000, // 60 seconds
	},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
