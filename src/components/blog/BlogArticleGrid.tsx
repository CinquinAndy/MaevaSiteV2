'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useRef } from 'react'
import type { Blog, Media } from '@/payload-types'
import { ScrollingImage } from './ScrollingImage'

interface BlogArticleGridProps {
	post: Blog
	featuredImage: Media | undefined
}

export function BlogArticleGrid({ post, featuredImage }: BlogArticleGridProps) {
	const articleRef = useRef<HTMLDivElement>(null)

	return (
		<div ref={articleRef} className="grid grid-cols-1">
			<div>
				{/* Main Content - Lexical RichText */}
				<article className="prose prose-blog prose-lg max-w-none prose-headings:font-corinthia prose-h2:text-5xl prose-h3:text-4xl prose-h4:text-3xl prose-p:font-kalam prose-img:rounded-xl prose-img:shadow-lg">
					{/* Render Lexical Content */}
					{post.content && typeof post.content === 'object' && 'root' in post.content ? (
						<RichText data={post.content} />
					) : (
						<div className="text-muted-foreground">
							<p>Contenu de l'article non disponible.</p>
						</div>
					)}
				</article>
			</div>
		</div>
	)
}
