import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const RealisationsPage: GlobalConfig = {
	slug: 'realisations-page',
	label: 'Page Réalisations',
	access: {
		read: () => true,
	},
	fields: [
		...seoFields,
		// ===========================
		// SECTION HERO
		// ===========================
		{
			name: 'hero',
			type: 'group',
			label: 'Section Hero (En-tête)',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Mes Réalisations en Loire-Atlantique',
					label: 'Titre de la page',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: "Image d'en-tête",
				},
			],
		},

		// ===========================
		// SECTION INTRODUCTION
		// ===========================
		{
			name: 'introduction',
			type: 'group',
			label: 'Section Introduction',
			fields: [
				{
					name: 'paragraph1',
					type: 'textarea',
					label: 'Premier paragraphe',
				},
				{
					name: 'paragraph2',
					type: 'textarea',
					label: 'Deuxième paragraphe',
				},
			],
		},

		// ===========================
		// SECTION APPEL À L'ACTION
		// ===========================
		{
			name: 'ctaSection',
			type: 'group',
			label: "Section Appel à l'Action",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Envie du Même Résultat Pour Votre Jardin ?',
					label: 'Titre',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
				{
					name: 'buttonText',
					type: 'text',
					label: 'Texte du bouton',
				},
				{
					name: 'buttonUrl',
					type: 'text',
					defaultValue: '/contact',
					label: 'Lien du bouton',
				},
				{
					name: 'benefits',
					type: 'array',
					label: 'Liste des avantages',
					fields: [
						{
							name: 'benefit',
							type: 'text',
							label: 'Avantage',
						},
					],
				},
			],
		},
	],
	admin: {
		description:
			'Configuration de la page /realisations. Les réalisations proviennent de la collection "Réalisations".',
	},
}
