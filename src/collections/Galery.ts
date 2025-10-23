import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/lib/payload/revalidate-hook'
import { seoFields } from '@/lib/payload/seo-fields'

export const Galery: CollectionConfig = {
	slug: 'galery',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
	},
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [revalidateAfterChange],
		afterDelete: [revalidateAfterDelete],
	},
	fields: [
		...seoFields,
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
				description: 'URL de la galerie (ex: mariage-alice-tom)',
			},
		},
		{
			name: 'description',
			type: 'textarea',
			required: false,
			label: 'Description',
			admin: {
				description: 'Description de la galerie',
			},
			maxLength: 500,
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Mariage', value: 'mariage' },
				{ label: 'Maquillage Artistique', value: 'artistique' },
				{ label: 'Nail Art', value: 'nail-art' },
				{ label: 'Événementiel', value: 'evenementiel' },
				{ label: 'Photo/Vidéo', value: 'photo-video' },
				{ label: 'Collections', value: 'collections' },
			],
			defaultValue: 'mariage',
		},
		{
			name: 'coverImage',
			type: 'upload',
			relationTo: 'media',
			required: true,
			label: 'Image de couverture',
			admin: {
				description: 'Image principale affichée dans la liste des galeries',
			},
		},
		{
			name: 'images',
			type: 'array',
			label: 'Images de la galerie',
			required: true,
			minRows: 1,
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
					label: 'Image',
				},
			],
		},
		{
			name: 'publishedDate',
			type: 'date',
			required: true,
			label: 'Date de publication',
			admin: {
				date: {
					pickerAppearance: 'dayOnly',
				},
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
	],
}
