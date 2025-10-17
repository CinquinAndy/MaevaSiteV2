import type { CollectionConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const Realisations: CollectionConfig = {
	slug: 'realisations',
	labels: {
		singular: 'Réalisation',
		plural: 'Réalisations',
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'location', 'category', 'date'],
	},
	access: {
		read: () => true,
	},
	fields: [
		...seoFields,
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Titre du projet',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'Identifiant URL (slug)',
			admin: {
				description: "Utilisé dans l'URL de la page (ex : jardin-monnieres). Ne modifier que si nécessaire.",
			},
			validate: (val: unknown) => {
				if (!val || typeof val !== 'string') return 'Le slug est obligatoire'
				if (!/^[a-z0-9-]+$/.test(val)) {
					return 'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets'
				}
				return true
			},
		},
		{
			name: 'location',
			type: 'text',
			label: 'Ville / Commune',
			admin: {
				description: 'Par exemple : Monnières, Vallet, Clisson...',
			},
		},
		{
			name: 'date',
			type: 'date',
			label: 'Date du projet',
			admin: {
				description: 'Date de réalisation ou de fin du projet',
			},
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
			label: 'Image principale',
		},
		{
			name: 'shortDescription',
			type: 'textarea',
			required: true,
			label: 'Description courte',
			admin: {
				description: 'Brève description pour les cartes et aperçus (2-3 phrases)',
			},
		},
		{
			name: 'description',
			type: 'richText',
			required: true,
			label: 'Description complète',
			admin: {
				description: 'Description détaillée du projet et des travaux réalisés',
			},
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Entretien', value: 'entretien' },
				{ label: 'Aménagement', value: 'amenagement' },
				{ label: 'Potager', value: 'potager' },
				{ label: 'Taille', value: 'taille' },
			],
			defaultValue: 'entretien',
		},
		{
			name: 'features',
			type: 'array',
			label: 'Caractéristiques principales',
			admin: {
				description: 'Points forts et aspects remarquables du projet',
			},
			fields: [
				{
					name: 'feature',
					type: 'text',
					required: true,
					label: 'Caractéristique',
				},
			],
		},
		{
			name: 'images',
			type: 'upload',
			label: "Galerie d'images",
			admin: {
				description:
					"Galerie d'images additionnelles de la réalisation, tout ce qui sera afficher dans le bouton 'voir la galerie'",
			},
			hasMany: true,
			relationTo: 'media',
			required: true,
		},
		{
			name: 'testimonial',
			type: 'group',
			label: 'Témoignage client',
			fields: [
				{
					name: 'quote',
					type: 'textarea',
					label: 'Citation du client',
				},
				{
					name: 'author',
					type: 'text',
					label: 'Nom du client',
				},
				{
					name: 'location',
					type: 'text',
					label: 'Ville du client',
				},
			],
		},
		{
			name: 'ctaSection',
			type: 'group',
			label: "Section Appel à l'Action",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Un projet similaire ?',
					label: 'Titre',
				},
				{
					name: 'description',
					type: 'textarea',
					defaultValue:
						"Discutons de votre jardin et créons ensemble un espace écologique qui vous ressemble. Bénéficiez de 50% de crédit d'impôt sur toutes mes prestations.",
					label: 'Description',
				},
				{
					name: 'buttonText',
					type: 'text',
					defaultValue: 'Demander un devis gratuit',
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
}
