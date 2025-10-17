import React from 'react'

// Generic node type - Lexical nodes structure
// biome-ignore lint/suspicious/noExplicitAny: Lexical nodes are dynamic and can have any structure
type SerializedLexicalNode = any

// Type definitions for Lexical nodes
interface BaseNode {
	type: string
	version: number
}

interface TextNode extends BaseNode {
	type: 'text'
	text: string
	format?: number
	mode?: string
	style?: string
}

interface ParagraphNode extends BaseNode {
	type: 'paragraph'
	children: SerializedLexicalNode[]
	format?: string
	indent?: number
	direction?: 'ltr' | 'rtl' | null
}

interface HeadingNode extends BaseNode {
	type: 'heading'
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	children: SerializedLexicalNode[]
}

interface ListNode extends BaseNode {
	type: 'list'
	listType: 'bullet' | 'number'
	children: SerializedLexicalNode[]
}

interface ListItemNode extends BaseNode {
	type: 'listitem'
	children: SerializedLexicalNode[]
	value?: number
}

interface LinkNode extends BaseNode {
	type: 'link' | 'autolink'
	url: string
	children: SerializedLexicalNode[]
	rel?: string
	target?: string
}

interface QuoteNode extends BaseNode {
	type: 'quote'
	children: SerializedLexicalNode[]
}

interface LineBreakNode extends BaseNode {
	type: 'linebreak'
}

type LexicalNode =
	| TextNode
	| ParagraphNode
	| HeadingNode
	| ListNode
	| ListItemNode
	| LinkNode
	| QuoteNode
	| LineBreakNode

// Format flags for text nodes (same as Lexical)
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4

function serializeTextNode(node: TextNode): React.ReactNode {
	let text: React.ReactNode = node.text
	const format = node.format || 0

	if (format & IS_BOLD) {
		text = <strong className="font-semibold text-foreground">{text}</strong>
	}
	if (format & IS_ITALIC) {
		text = <em className="italic">{text}</em>
	}
	if (format & IS_STRIKETHROUGH) {
		text = <s className="line-through">{text}</s>
	}
	if (format & IS_UNDERLINE) {
		text = <u className="underline">{text}</u>
	}
	if (format & IS_CODE) {
		text = <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-sm font-mono">{text}</code>
	}

	return text
}

function serializeChildren(children: SerializedLexicalNode[]): React.ReactNode[] {
	return children.map((child, index) => {
		// Use a combination of type, index and a hash for more unique keys
		const nodeType = (child as { type?: string }).type || 'unknown'
		const childText = nodeType === 'text' ? (child as TextNode).text?.substring(0, 10) : nodeType
		const key = `${nodeType}-${index}-${childText}`
		return <React.Fragment key={key}>{serializeLexicalNode(child)}</React.Fragment>
	})
}

export function serializeLexicalNode(node: SerializedLexicalNode): React.ReactNode {
	if (!node) return null

	const lexicalNode = node as LexicalNode

	switch (lexicalNode.type) {
		case 'text':
			return serializeTextNode(lexicalNode)

		case 'linebreak':
			return <br />

		case 'paragraph': {
			const paragraphNode = lexicalNode as ParagraphNode
			if (!paragraphNode.children || paragraphNode.children.length === 0) {
				return <p className="text-gray-600 leading-7 my-4">&nbsp;</p>
			}
			return <p className="text-gray-600 leading-7 my-4">{serializeChildren(paragraphNode.children)}</p>
		}

		case 'heading': {
			const headingNode = lexicalNode as HeadingNode
			const HeadingTag = headingNode.tag
			const headingClasses = {
				h1: 'text-4xl font-semibold tracking-tight text-foreground mt-12 mb-6',
				h2: 'text-3xl font-semibold tracking-tight text-foreground mt-16 mb-6',
				h3: 'text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4',
				h4: 'text-xl font-semibold tracking-tight text-foreground mt-8 mb-3',
				h5: 'text-lg font-semibold tracking-tight text-foreground mt-6 mb-2',
				h6: 'text-base font-semibold tracking-tight text-foreground mt-4 mb-2',
			}
			return <HeadingTag className={headingClasses[HeadingTag]}>{serializeChildren(headingNode.children)}</HeadingTag>
		}

		case 'list': {
			const listNode = lexicalNode as ListNode
			const ListTag = listNode.listType === 'number' ? 'ol' : 'ul'
			const listClasses =
				listNode.listType === 'number' ? 'list-decimal pl-6 my-6 space-y-2' : 'list-disc pl-6 my-6 space-y-2'
			return <ListTag className={listClasses}>{serializeChildren(listNode.children)}</ListTag>
		}

		case 'listitem': {
			const listItemNode = lexicalNode as ListItemNode
			return <li className="text-gray-600 leading-7">{serializeChildren(listItemNode.children)}</li>
		}

		case 'link':
		case 'autolink': {
			const linkNode = lexicalNode as LinkNode
			return (
				<a
					href={linkNode.url}
					className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline transition-colors"
					target={linkNode.target || '_self'}
					rel={linkNode.rel || (linkNode.target === '_blank' ? 'noopener noreferrer' : undefined)}
				>
					{serializeChildren(linkNode.children)}
				</a>
			)
		}

		case 'quote': {
			const quoteNode = lexicalNode as QuoteNode
			return (
				<blockquote className="border-l-4 border-emerald-600 pl-6 my-6 italic text-gray-700">
					{serializeChildren(quoteNode.children)}
				</blockquote>
			)
		}

		default:
			// For unknown node types, try to render children if they exist
			if ('children' in lexicalNode && Array.isArray((lexicalNode as { children: unknown }).children)) {
				return <>{serializeChildren((lexicalNode as { children: SerializedLexicalNode[] }).children)}</>
			}
			return null
	}
}

export function serializeLexicalContent(content: {
	root: {
		type: string
		children: SerializedLexicalNode[]
		direction: ('ltr' | 'rtl') | null
		format: string
		indent: number
		version: number
	}
	[k: string]: unknown
}): React.ReactNode {
	if (!content?.root?.children) return null

	return (
		<div className="lexical-content">
			{content.root.children.map((node, index) => {
				const nodeType = (node as { type?: string }).type || 'unknown'
				const key = `root-${nodeType}-${index}`
				return <React.Fragment key={key}>{serializeLexicalNode(node)}</React.Fragment>
			})}
		</div>
	)
}
