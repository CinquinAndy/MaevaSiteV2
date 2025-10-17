import type { Media } from '@/payload-types'

/**
 * Récupère l'URL d'un média depuis Payload
 * Throws an error if media is missing or not populated
 */
export function getMediaUrl(media: number | Media | null | undefined): string {
	if (!media) {
		throw new Error('Media is required but was not provided')
	}

	if (typeof media === 'number') {
		throw new Error('Media must be populated (depth >= 1) but received an ID')
	}

	if (!media.url) {
		throw new Error('Media object exists but has no URL')
	}

	return media.url
}

/**
 * Récupère l'URL d'un média depuis Payload (version optionnelle)
 * Returns null if media is missing
 */
export function getMediaUrlOptional(media: number | Media | null | undefined): string | null {
	if (!media) return null

	if (typeof media === 'number') {
		return null // Needs to be populated
	}

	return media.url || null
}

/**
 * Récupère l'alt text d'un média depuis Payload
 */
export function getMediaAlt(media: number | Media | null | undefined): string {
	if (!media) return ''

	if (typeof media === 'number') {
		return ''
	}

	return media.alt || ''
}

/**
 * Récupère les informations complètes d'un média
 */
export function getMediaInfo(media: number | Media | null | undefined): {
	url: string | null
	alt: string
	width?: number | null
	height?: number | null
} {
	return {
		url: getMediaUrl(media),
		alt: getMediaAlt(media),
		width: typeof media === 'object' ? media?.width : undefined,
		height: typeof media === 'object' ? media?.height : undefined,
	}
}

interface LexicalNode {
	text?: string
	children?: LexicalNode[]
	[key: string]: unknown
}

interface LexicalRoot {
	root?: {
		children?: LexicalNode[]
	}
}

/**
 * Convertit un champ Lexical en texte plain
 */
export function lexicalToPlainText(lexical: LexicalRoot): string {
	if (!lexical?.root?.children) return ''

	const extractText = (children: LexicalNode[]): string => {
		return children
			.map((child: LexicalNode) => {
				if (child.text) return child.text
				if (child.children) return extractText(child.children)
				return ''
			})
			.join('')
	}

	return extractText(lexical.root.children)
}
