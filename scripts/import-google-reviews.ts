/**
 * Script to bulk import testimonials from a JSON file
 * 
 * Usage:
 * 1. Create a file called 'google-reviews.json' with this format:
 * [
 *   {
 *     "name": "Sophie L.",
 *     "content": "Excellent service...",
 *     "rating": 5,
 *     "source": "google"
 *   }
 * ]
 * 
 * 2. Run: pnpm tsx scripts/import-google-reviews.ts
 * 
 * This is useful when you've manually collected Google Reviews
 * and want to import them all at once.
 */

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import * as fs from 'node:fs'
import * as path from 'node:path'

interface ReviewImport {
	name: string
	content: string
	rating: number
	source?: string
	sourceUrl?: string
	featured?: boolean
	order?: number
}

async function main() {
	const filePath = path.join(process.cwd(), 'google-reviews.json')

	if (!fs.existsSync(filePath)) {
		console.error('\n❌ Error: google-reviews.json not found in project root')
		console.log('\n📝 Create a file called "google-reviews.json" with this format:')
		console.log(`
[
  {
    "name": "Sophie L.",
    "content": "Excellent service...",
    "rating": 5,
    "source": "google"
  },
  {
    "name": "Marie D.",
    "content": "Très professionnelle...",
    "rating": 5,
    "source": "google"
  }
]
    `)
		process.exit(1)
	}

	console.log('\n📂 Reading google-reviews.json...')
	const fileContent = fs.readFileSync(filePath, 'utf-8')
	const reviews: ReviewImport[] = JSON.parse(fileContent)

	console.log(`✅ Found ${reviews.length} reviews to import\n`)

	console.log('⏳ Connecting to Payload CMS...')
	const payload = await getPayload({
		config: configPromise,
	})
	console.log('✅ Connected to Payload CMS\n')

	let successCount = 0
	let errorCount = 0

	for (const review of reviews) {
		try {
			console.log(`📤 Importing: ${review.name}`)
			
			await payload.create({
				collection: 'testimonials',
				data: {
					name: review.name,
					content: review.content,
					rating: Math.max(1, Math.min(5, review.rating)),
					source: review.source || 'google',
					sourceUrl: review.sourceUrl,
					featured: review.featured || false,
					order: review.order || 0,
					status: 'published',
				},
			})

			console.log(`   ✅ Success\n`)
			successCount++
		} catch (error) {
			console.error(`   ❌ Error: ${error}\n`)
			errorCount++
		}
	}

	console.log('\n🎉 Import complete!')
	console.log(`   ✅ Successful: ${successCount}`)
	if (errorCount > 0) {
		console.log(`   ❌ Failed: ${errorCount}`)
	}

	process.exit(0)
}

main()

