export const CONTACT_INFO = {
	phone: '06 31 04 34 45',
	phoneFormatted: '06 31 04 34 45',
	email: 'nature.paysage.laheux@gmail.com',
	company: {
		name: 'SASU Nature et Paysage Laheux',
		representative: 'Jean-Luc Laheux',
		legalForm: 'SASU',
	},
	address: {
		postalCode: '44690',

		city: 'Monnières',
		region: 'Loire-Atlantique',
		country: 'France',
		full: '44690 Monnières, Loire-Atlantique',
	},
	social: {
		facebook: 'https://www.facebook.com/profile.php?id=61580058785232',
		linkedin: 'https://fr.linkedin.com/in/jean-luc-laheux-5387b6158',
	},
	hours: {
		weekday: '8h00 - 19h00',
		saturday: 'Fermé',
		sunday: 'Fermé',
		note: "Horaires d'intervention sur rendez-vous selon vos disponibilités",
	},
	interventionZone: {
		radius: '15 km autour de Monnières',
		communes: [
			'Monnières',
			'La Haie-Fouassière',
			'Haute-Goulaine',
			'Basse-Goulaine',
			'Gorges',
			'Clisson',
			'Vignoble Nantais',
			'Vallée de la Loire (sud)',
		],
	},
} as const
