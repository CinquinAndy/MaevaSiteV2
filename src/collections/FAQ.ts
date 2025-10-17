import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
	slug: 'faq',
	labels: {
		singular: 'Question FAQ',
		plural: 'Questions FAQ',
	},
	admin: {
		useAsTitle: 'question',
		defaultColumns: ['question', 'category', 'showOnHomepage', 'order'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'question',
			type: 'text',
			required: true,
			label: 'Question',
		},
		{
			name: 'answer',
			type: 'richText',
			required: true,
			label: 'Réponse',
			admin: {
				description: 'Réponse détaillée à la question',
			},
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Questions Générales', value: 'general' },
				{ label: 'Prestations & Services', value: 'services' },
				{ label: "Tarifs & Crédit d'Impôt", value: 'tarifs' },
				{ label: 'Approche Écologique', value: 'ecologie' },
			],
			defaultValue: 'general',
		},
		{
			name: 'showOnHomepage',
			type: 'checkbox',
			defaultValue: false,
			label: "Afficher sur la page d'accueil",
			admin: {
				description: "Cette question apparaîtra dans la section FAQ de la page d'accueil (4 questions maximum)",
			},
		},
		{
			name: 'order',
			type: 'number',
			defaultValue: 0,
			label: "Ordre d'affichage",
			admin: {
				description: "Ordre d'apparition dans la catégorie (plus petit numéro = apparaît en premier)",
			},
		},
	],
}
