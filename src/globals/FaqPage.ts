import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const FaqPage: GlobalConfig = {
	slug: 'faq-page',
	label: 'Page FAQ',
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
					defaultValue: 'Questions Fréquentes',
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
		// DESCRIPTIONS DES CATÉGORIES
		// ===========================
		{
			name: 'categoryDescriptions',
			type: 'array',
			label: 'Descriptions des catégories',
			admin: {
				description: 'Descriptions optionnelles pour chaque catégorie de FAQ',
			},
			fields: [
				{
					name: 'category',
					type: 'select',
					label: 'Catégorie',
					options: [
						{ label: 'Questions Générales', value: 'general' },
						{ label: 'Prestations & Services', value: 'services' },
						{ label: "Tarifs & Crédit d'Impôt", value: 'tarifs' },
						{ label: 'Approche Écologique', value: 'ecologie' },
					],
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
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
					defaultValue: 'Une Autre Question ?',
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
					defaultValue: 'Me Contacter',
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
		description: 'Configuration de la page /faq. Les questions proviennent de la collection "Questions FAQ".',
	},
}
