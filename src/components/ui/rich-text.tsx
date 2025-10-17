import { serializeLexicalContent } from '@/lib/lexical/serializer'

interface RichTextProps {
	content: {
		root: {
			type: string
			children: unknown[]
			direction: ('ltr' | 'rtl') | null
			format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
			indent: number
			version: number
		}
		[k: string]: unknown
	}
	className?: string
}

/**
 * RichText component for rendering Payload CMS Lexical content
 * Uses a custom serializer for full control over HTML output and styling
 */
export function RichText({ content, className = '' }: RichTextProps) {
	if (!content) return null

	return <div className={`rich-text-content ${className}`}>{serializeLexicalContent(content)}</div>
}
