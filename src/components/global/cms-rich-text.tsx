import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

/** Champs d'un média du CMS utilisés pour l'affichage. */
interface UploadDoc {
	url?: string | null
	alt?: string | null
	mimeType?: string | null
	filename?: string | null
	width?: number | null
	height?: number | null
}

/**
 * Images insérées dans un texte du CMS. Le rendu par défaut de Payload pose un <img> sur l'original (jusqu'à
 * plusieurs Mo, préchargé par React dès que la page est préchargée) : ici, l'image passe par next/image,
 * redimensionnée à la largeur affichée et chargée seulement à l'approche de l'écran.
 */
function CmsUpload({ node }: { node: SerializedUploadNode }) {
	const doc = node.value as UploadDoc | string | number
	if (!doc || typeof doc !== 'object' || !doc.url) return null
	const alt = (node.fields?.alt as string | undefined) || doc.alt || ''

	if (!doc.mimeType?.startsWith('image')) {
		return (
			<a href={doc.url} rel="noopener noreferrer">
				{doc.filename}
			</a>
		)
	}

	if (!doc.width || !doc.height) {
		// biome-ignore lint/performance/noImgElement: dimensions inconnues, next/image ne peut pas réserver la place
		return <img src={doc.url} alt={alt} loading="lazy" decoding="async" />
	}

	return (
		<Image
			src={doc.url}
			alt={alt}
			width={doc.width}
			height={doc.height}
			// Colonne de texte : 2/3 de la page sur grand écran, toute la largeur sur mobile.
			sizes="(min-width: 1024px) 66vw, 100vw"
			className="h-auto w-full"
		/>
	)
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
	...defaultConverters,
	upload: ({ node }) => <CmsUpload node={node as SerializedUploadNode} />,
})

/** Texte riche du CMS (articles, prestations) avec des images optimisées. */
export function CmsRichText({ data }: { data: SerializedEditorState }) {
	return <RichText data={data} converters={converters} />
}
