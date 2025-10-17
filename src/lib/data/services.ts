export interface Service {
	id: string
	title: string
	shortDescription: string
	fullDescription: string
	features: string[]
	eligibleTaxCredit: boolean
	price: string
	category: 'entretien' | 'creation' | 'accompagnement'
	icon?: string
	image?: string
}

export const SERVICES: Service[] = [
	{
		id: 'tonte-pelouse',
		title: 'Tonte & Entretien de Pelouse Écologique',
		shortDescription: 'Entretien régulier et naturel de votre pelouse pour un gazon dense, sain et résistant.',
		fullDescription:
			'Une pelouse saine commence par un entretien respectueux. Je pratique une tonte raisonnée, adaptée aux saisons et aux besoins réels de votre gazon, sans forcer la nature. Oubliez les gazons "parfaits" qui nécessitent arrosage intensif et produits chimiques. Je vous accompagne vers une pelouse naturellement résistante et belle.',
		features: [
			'Tonte adaptée aux saisons',
			'Scarification naturelle',
			'Aération du sol',
			"Conseils d'entretien écologique",
		],
		eligibleTaxCredit: true,
		price: 'Sur devis personnalisé',
		category: 'entretien',
		image: 'ex1.webp',
	},
	{
		id: 'desherbage-ecologique',
		title: 'Désherbage Manuel & Naturel',
		shortDescription: "Désherbage respectueux de l'environnement, sans aucun produit chimique.",
		fullDescription:
			"Le désherbage manuel est plus long, certes, mais infiniment meilleur pour votre sol, votre santé et l'environnement. Je pratique exclusivement des méthodes naturelles qui préservent la vie microbienne du sol et la biodiversité de votre jardin.",
		features: [
			'Désherbage manuel complet',
			'Bêchage et binage naturel',
			'Paillage organique',
			'Préservation de la vie du sol',
		],
		eligibleTaxCredit: true,
		price: 'Sur devis personnalisé',
		category: 'entretien',
		image: 'ex2.webp',
	},
	{
		id: 'taille-haies-arbustes',
		title: 'Taille Raisonnée de Haies & Arbustes',
		shortDescription: 'Taille respectueuse de la biologie des végétaux pour leur santé et leur esthétique.',
		fullDescription:
			"La taille n'est pas qu'une question d'esthétique : c'est un acte qui influence profondément la santé et la longévité de vos végétaux. Je pratique une taille raisonnée, respectueuse de la biologie de chaque plante et des périodes optimales d'intervention.",
		features: [
			'Taille de haies et arbustes',
			'Taille de fruitiers',
			'Respect des périodes de taille',
			'Évacuation des déchets',
		],
		eligibleTaxCredit: true,
		price: 'Sur devis personnalisé',
		category: 'entretien',
		image: 'ex3.webp',
	},
	{
		id: 'potager-permaculture',
		title: 'Potager Écologique & Permaculture',
		shortDescription: 'Création et entretien de potagers productifs en harmonie avec la nature.',
		fullDescription:
			"Cultiver ses propres légumes sains, savoureux et sans pesticides : c'est possible et plus simple qu'on ne le pense ! Je vous accompagne dans la création et l'entretien d'un potager productif inspiré des principes de la permaculture.",
		features: [
			'Conception en permaculture',
			'Installation et plantation',
			'Entretien naturel',
			'Transmission de savoirs',
		],
		eligibleTaxCredit: true,
		price: 'Sur devis personnalisé',
		category: 'creation',
		image: 'ex4.webp',
	},
	{
		id: 'entretien-massifs',
		title: 'Entretien Naturel des Massifs',
		shortDescription: 'Soins attentifs de vos espaces fleuris avec des méthodes douces.',
		fullDescription:
			"Vos massifs méritent des soins attentifs et respectueux qui leur permettront de s'épanouir dans la durée.",
		features: ['Désherbage manuel', 'Paillage naturel', 'Arrosage raisonné', 'Amendements organiques'],
		eligibleTaxCredit: true,
		price: 'Sur devis personnalisé',
		category: 'entretien',
		image: 'ex5.webp',
	},
	{
		id: 'accompagnement-annuel',
		title: 'Accompagnement Sur-Mesure',
		shortDescription: "Un suivi personnalisé de votre jardin tout au long de l'année.",
		fullDescription:
			"Pour ceux qui souhaitent un jardin impeccable toute l'année sans y penser, je propose un accompagnement personnalisé avec interventions planifiées selon les saisons.",
		features: ['Interventions planifiées', 'Suivi régulier adapté', 'Conseil continu', 'Tarif préférentiel'],
		eligibleTaxCredit: true,
		price: 'Sur devis personnalisé',
		category: 'accompagnement',
		image: 'ex6.webp',
	},
]

export const TAX_CREDIT_INFO = {
	percentage: 50,
	maxAnnualExpense: 5000,
	maxAnnualCredit: 2500,
	steps: [
		{
			number: 1,
			title: 'Demandez un Devis',
			description: 'Contactez-moi pour une visite gratuite et un devis personnalisé.',
		},
		{
			number: 2,
			title: 'Réalisation des Travaux',
			description: "J'interviens avec soin et dans le respect de l'environnement.",
		},
		{
			number: 3,
			title: 'Attestation Fiscale',
			description: "Je vous fournis l'attestation Services à la Personne pour votre déclaration.",
		},
		{
			number: 4,
			title: 'Récupérez 50%',
			description: "L'État vous rembourse la moitié du montant (crédit d'impôt ou virement).",
		},
	],
	example: {
		serviceCost: 200,
		taxCredit: 100,
		realCost: 100,
	},
} as const
