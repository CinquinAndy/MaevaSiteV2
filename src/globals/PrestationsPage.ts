import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const PrestationsPage: GlobalConfig = {
	slug: 'prestations-page',
	label: 'Page Prestations',
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
					defaultValue: 'Mes Prestations Écologiques',
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
		// SECTION ÉLIGIBILITÉ CRÉDIT D'IMPÔT
		// ===========================
		{
			name: 'taxCreditEligibility',
			type: 'group',
			label: "Section Éligibilité Crédit d'Impôt",
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description de la section',
				},
				{
					name: 'eligibleTitle',
					type: 'text',
					label: "Titre de l'onglet éligible",
				},
				{
					name: 'eligibleDescription',
					type: 'textarea',
					label: "Description de l'onglet éligible",
				},
				{
					name: 'eligibleItems',
					type: 'array',
					label: 'Services éligibles',
					admin: {
						description: "Services qui bénéficient du crédit d'impôt de 50%",
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description',
						},
					],
				},
				{
					name: 'eligibleImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image services éligibles',
				},
				{
					name: 'nonEligibleTitle',
					type: 'text',
					label: "Titre de l'onglet non éligible",
				},
				{
					name: 'nonEligibleDescription',
					type: 'textarea',
					label: "Description de l'onglet non éligible",
				},
				{
					name: 'nonEligibleItems',
					type: 'array',
					label: 'Services non éligibles',
					admin: {
						description: "Services qui NE bénéficient PAS du crédit d'impôt",
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description',
						},
					],
				},
				{
					name: 'nonEligibleImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image services non éligibles',
				},
				{
					name: 'importantNote',
					type: 'textarea',
					label: 'Note importante',
					admin: {
						description:
							"Note affichée en bas de la section (ex: L'entretien ultérieur de créations non-éligibles reste éligible au crédit d'impôt)",
					},
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
		description: 'Configuration de la page /prestations. Les prestations proviennent de la collection "Prestations".',
	},
}
