/**
 * Script to manually add a testimonial to Payload CMS
 * 
 * Usage:
 * pnpm tsx scripts/add-testimonial.ts
 * 
 * This will prompt you to enter the testimonial details interactively.
 * Perfect for manually copying Google Reviews into the database.
 */

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import * as readline from 'node:readline'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function question(prompt: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(prompt, resolve)
	})
}

async function main() {
	console.log('\n📝 Add a new testimonial to Payload CMS\n')

	const name = await question('Client name (e.g., Sophie L.): ')
	const content = await question('Testimonial content: ')
	const ratingStr = await question('Rating (1-5): ')
	const rating = Number.parseInt(ratingStr) || 5
	const source = await question('Source (google/facebook/instagram/email/other) [google]: ')
	const sourceUrl = await question('Source URL (optional, press Enter to skip): ')
	const featuredStr = await question('Featured? (y/n) [n]: ')
	const featured = featuredStr.toLowerCase() === 'y'
	const orderStr = await question('Display order (0 = first) [0]: ')
	const order = Number.parseInt(orderStr) || 0

	rl.close()

	console.log('\n⏳ Connecting to Payload CMS...')

	const payload = await getPayload({
		config: configPromise,
	})

	console.log('✅ Connected to Payload CMS')
	console.log('\n📤 Creating testimonial...')

	try {
		const result = await payload.create({
			collection: 'testimonials',
			data: {
				name: name.trim(),
				content: content.trim(),
				rating: Math.max(1, Math.min(5, rating)),
				source: source.trim() || 'google',
				sourceUrl: sourceUrl.trim() || undefined,
				featured,
				order,
				status: 'published',
			},
		})

		console.log('\n✅ Testimonial created successfully!')
		console.log(`   ID: ${result.id}`)
		console.log(`   Name: ${result.name}`)
		console.log(`   Rating: ${result.rating}/5`)
		console.log(`   Source: ${result.source}`)
		console.log(`   Featured: ${result.featured ? 'Yes' : 'No'}`)
		console.log('\n🎉 Done! The testimonial will appear on the website.')
	} catch (error) {
		console.error('\n❌ Error creating testimonial:', error)
		process.exit(1)
	}

	process.exit(0)
}

main()

