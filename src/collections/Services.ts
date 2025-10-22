import type { CollectionConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const Services: CollectionConfig = {
	slug: 'services',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'order', 'updatedAt'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Titre',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'Slug (URL)',
			admin: {
				description: 'URL du service (ex: maquillage-mariage)',
			},
		},
		{
			name: 'shortDescription',
			type: 'textarea',
			required: true,
			label: 'Description courte',
			admin: {
				description: 'Résumé du service (affiché dans les cards)',
			},
			maxLength: 200,
		},
		{
			name: 'description',
			type: 'richText',
			required: true,
			label: 'Description complète',
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Maquillage', value: 'maquillage' },
				{ label: 'Nail Art', value: 'nail-art' },
				{ label: 'Événementiel', value: 'evenementiel' },
				{ label: 'Formation', value: 'formation' },
			],
			defaultValue: 'maquillage',
		},
		{
			name: 'icon',
			type: 'select',
			required: false,
			label: 'Icône',
			admin: {
				description: 'Icône Tabler à afficher (ex: Sparkles, Heart, Camera)',
			},
			options: [
				{ label: 'Sparkles (paillettes)', value: 'sparkles' },
				{ label: 'Heart (coeur)', value: 'heart' },
				{ label: 'Camera (appareil photo)', value: 'camera' },
				{ label: 'Paint (pinceau)', value: 'paint' },
				{ label: 'Palette', value: 'palette' },
				{ label: 'Star (étoile)', value: 'star' },
				{ label: 'Crown (couronne)', value: 'crown' },
				{ label: 'Diamond (diamant)', value: 'diamond' },
				{ label: 'Brush', value: 'brush' },
			],
			defaultValue: 'sparkles',
		},
		{
			name: 'featuredImage',
			type: 'upload',
			relationTo: 'media',
			required: false,
			label: 'Image illustrative',
		},
		{
			name: 'pricing',
			type: 'group',
			label: 'Tarification',
			fields: [
				{
					name: 'displayPricing',
					type: 'checkbox',
					label: 'Afficher les tarifs',
					defaultValue: false,
				},
				{
					name: 'priceType',
					type: 'select',
					label: 'Type de tarif',
					options: [
						{ label: 'Prix fixe', value: 'fixed' },
						{ label: 'À partir de', value: 'from' },
						{ label: 'Sur devis', value: 'quote' },
					],
					defaultValue: 'quote',
					admin: {
						condition: data => data.pricing?.displayPricing === true,
					},
				},
				{
					name: 'price',
					type: 'number',
					label: 'Prix (en €)',
					required: false,
					admin: {
						condition: data =>
							data.pricing?.displayPricing === true &&
							(data.pricing?.priceType === 'fixed' || data.pricing?.priceType === 'from'),
					},
				},
				{
					name: 'priceDetails',
					type: 'richText',
					label: 'Détails des tarifs',
					required: false,
					admin: {
						description: 'Détails supplémentaires sur la tarification',
					},
				},
			],
		},
		{
			name: 'features',
			type: 'array',
			label: 'Points forts',
			required: false,
			fields: [
				{
					name: 'feature',
					type: 'text',
					required: true,
					label: 'Point fort',
				},
			],
		},
		{
			name: 'duration',
			type: 'text',
			required: false,
			label: 'Durée',
			admin: {
				description: 'Durée estimée de la prestation (ex: 1h30, 2-3h)',
			},
		},
		{
			name: 'gridSize',
			type: 'select',
			required: true,
			label: 'Taille dans la grille',
			options: [
				{ label: 'Normal (1 colonne)', value: 'normal' },
				{ label: 'Large (2 colonnes)', value: 'large' },
			],
			defaultValue: 'normal',
			admin: {
				description: 'Taille de la card dans la grille bento (desktop uniquement)',
				position: 'sidebar',
			},
		},
		{
			name: 'order',
			type: 'number',
			required: true,
			label: "Ordre d'affichage",
			defaultValue: 0,
			admin: {
				description: "Ordre d'affichage dans la liste (0 = premier)",
				position: 'sidebar',
			},
		},
		{
			name: 'status',
			type: 'select',
			required: true,
			label: 'Statut',
			options: [
				{ label: 'Brouillon', value: 'draft' },
				{ label: 'Publié', value: 'published' },
			],
			defaultValue: 'draft',
			admin: {
				position: 'sidebar',
			},
		},
		...seoFields,
	],
}
