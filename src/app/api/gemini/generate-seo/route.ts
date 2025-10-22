import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import type { PageContext } from '@/lib/gemini/generate-seo'
import { generateSeoContent } from '@/lib/gemini/generate-seo'
import config from '@/payload.config'

type CollectionSlug = 'users' | 'media' | 'blog' | 'galery' | 'services' | 'testimonials'

export async function POST(req: NextRequest) {
	try {
		const { documentId, collectionSlug } = await req.json()

		const payload = await getPayload({ config })

		// Determine the page type and get context
		let pageContext: PageContext = { pageType: 'homepage' }

		if (collectionSlug && documentId) {
			switch (collectionSlug) {
				case 'blog': {
					const doc = await payload.findByID({ collection: 'blog', id: documentId })
					pageContext = {
						pageType: 'blog-post',
						title: doc.title || '',
						description: doc.excerpt || '',
						category: doc.category || '',
					}
					break
				}
				case 'galery': {
					const doc = await payload.findByID({ collection: 'galery', id: documentId })
					pageContext = {
						pageType: 'galery-item',
						title: doc.title || '',
						description: doc.description || '',
						category: doc.category || '',
					}
					break
				}
				case 'services': {
					const doc = await payload.findByID({ collection: 'services', id: documentId })
					pageContext = {
						pageType: 'service',
						title: doc.title || '',
						description: doc.shortDescription || '',
						category: doc.category || '',
					}
					break
				}
			}

			// Generate SEO content with Gemini
			const seoContent = await generateSeoContent(pageContext)

			if (!seoContent) {
				return NextResponse.json({ error: 'Failed to generate SEO content' }, { status: 500 })
			}

			// Update the document with generated SEO
			await payload.update({
				collection: collectionSlug as CollectionSlug,
				id: documentId,
				data: {
					seo_title: seoContent.title,
					seo_description: seoContent.description,
				},
			})

			return NextResponse.json({
				success: true,
				title: seoContent.title,
				description: seoContent.description,
			})
		}

		return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
	} catch (error) {
		console.error('Error generating SEO:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
