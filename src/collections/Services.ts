import type { CollectionConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const Services: CollectionConfig = {
	slug: 'services',
	labels: {
		singular: 'Prestation',
		plural: 'Prestations',
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'eligibleTaxCredit', 'order'],
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
			label: 'Nom de la prestation',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'Identifiant URL (slug)',
			admin: {
				description: "Utilisé dans l'URL de la page (ex : tonte-pelouse). Ne modifier que si nécessaire.",
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
			name: 'shortDescription',
			type: 'textarea',
			required: true,
			label: 'Description courte',
			admin: {
				description: 'Utilisée dans les cartes et aperçus (2-3 phrases maximum)',
			},
		},
		{
			name: 'fullDescription',
			type: 'richText',
			required: true,
			label: 'Description complète',
			admin: {
				description: 'Description détaillée affichée sur la page de la prestation',
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
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Entretien', value: 'entretien' },
				{ label: 'Création', value: 'creation' },
				{ label: 'Accompagnement', value: 'accompagnement' },
			],
			defaultValue: 'entretien',
		},
		{
			name: 'features',
			type: 'array',
			required: true,
			label: 'Points clés',
			admin: {
				description: 'Liste des avantages et caractéristiques (4 à 6 éléments)',
			},
			fields: [
				{
					name: 'feature',
					type: 'text',
					required: true,
					label: 'Point clé',
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
			name: 'eligibleTaxCredit',
			type: 'checkbox',
			defaultValue: true,
			label: "Éligible au crédit d'impôt",
			admin: {
				description: "Cette prestation est-elle éligible au crédit d'impôt de 50% ?",
			},
		},
		{
			name: 'price',
			type: 'text',
			defaultValue: 'Sur devis personnalisé',
			label: 'Affichage du tarif',
			admin: {
				description: 'Comment le tarif est affiché aux clients (généralement "Sur devis personnalisé")',
			},
		},
		{
			name: 'order',
			type: 'number',
			defaultValue: 0,
			label: "Ordre d'affichage",
			admin: {
				description: "Ordre d'apparition des prestations (plus petit numéro = apparaît en premier)",
			},
		},
		{
			name: 'ctaSection',
			type: 'group',
			label: "Section Appel à l'Action",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Intéressé par cette prestation ?',
					label: 'Titre',
				},
				{
					name: 'description',
					type: 'textarea',
					defaultValue:
						"Demandez votre devis gratuit et bénéficiez de 50% de crédit d'impôt sur toutes mes prestations.",
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
