import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const Homepage: GlobalConfig = {
	slug: 'homepage',
	label: "Page d'Accueil",
	access: {
		read: () => true,
	},
	fields: [
		...seoFields,
		// ===========================
		// SECTION HERO (EN-TÊTE)
		// ===========================
		{
			name: 'hero',
			type: 'group',
			label: 'Section Hero (En-tête principal)',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titre principal',
				},
			],
		},
	],
}
