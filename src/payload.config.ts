// storage-adapter-import-placeholder

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { LinkFeature, lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Blog } from './collections/Blog'
import { Galery } from './collections/Galery'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
	admin: {
		meta: {
			title: 'Maeva Cinquin - Administration',
			description: 'Maeva Cinquin - Administration',
			icons: [{ rel: 'icon', url: '/web-app-manifest-192x192.png', type: 'image/png' }],
		},
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			beforeDashboard: ['@/components/admin/DashboardHero'],
			afterNavLinks: ['@/components/admin/TutorialsNavLink'],
		},
		// Note: Payload v3 `admin.routes` is for overriding built-in views (login, account, etc.).
		// Custom routes are not supported here; removed to satisfy types.
	},
	collections: [Users, Media, Blog, Galery, Services, Testimonials],
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures.filter(
				// Filter out default LinkFeature and UploadFeature to replace with customized versions
				feature =>
					!['link', 'upload'].includes(
						typeof feature === 'object' && feature !== null && 'key' in feature ? feature.key : ''
					)
			),
			// Customize LinkFeature to add rel attribute
			LinkFeature({
				fields: [
					{
						name: 'rel',
						label: 'Rel Attribute',
						type: 'select',
						hasMany: true,
						options: ['noopener', 'noreferrer', 'nofollow'],
						admin: {
							description:
								'The rel attribute defines the relationship between a linked resource and the current document.',
						},
					},
				],
			}),
			// Customize UploadFeature to add caption field for images
			UploadFeature({
				collections: {
					media: {
						fields: [
							{
								name: 'caption',
								type: 'text',
								label: 'Caption',
								admin: {
									description: 'Text displayed below the image',
								},
							},
						],
					},
				},
			}),
		],
	}),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
	}),
	sharp,
	plugins: [
		payloadCloudPlugin(),
		s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || '',
			config: {
				endpoint: process.env.S3_ENDPOINT || '',
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
				},
				region: process.env.S3_REGION || 'auto',
			},
		}),
	],
})
