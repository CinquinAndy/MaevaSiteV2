export interface FaqItem {
	id: string
	question: string
	answer: string
	category: 'general' | 'services' | 'tarifs' | 'ecologie'
}

export const FAQ_CATEGORIES = {
	general: 'Questions Générales',
	services: 'Prestations & Services',
	tarifs: "Tarifs & Crédit d'Impôt",

	ecologie: 'Approche Écologique',
}

export const FAQ_ITEMS: FaqItem[] = [
	// Questions Générales
	{
		id: 'zone-intervention',
		question: 'Dans quelle zone intervenez-vous ?',
		answer:
			"J'interviens dans un rayon de 15 km autour de Monnières (44690). Cela inclut notamment : Vallet, Clisson, Le Pallet, La Haie-Fouassière, Gorges, Saint-Fiacre-sur-Maine, Mouzillon, et les communes environnantes. Pour vérifier si votre commune est couverte, n'hésitez pas à me contacter.",
		category: 'general',
	},
	{
		id: 'horaires',
		question: "Quels sont vos horaires d'intervention ?",
		answer:
			"J'interviens du lundi au vendredi, de 8h à 18h. Je peux également organiser des rendez-vous le samedi matin sur demande pour les visites et devis. Je respecte la réglementation locale concernant les horaires de tonte et travaux bruyants.",
		category: 'general',
	},
	{
		id: 'urgences',
		question: 'Intervenez-vous en urgence ?',
		answer:
			"Oui, selon les disponibilités. En cas d'urgence (arbre tombé, haie dangereuse, dégâts après tempête), contactez-moi par téléphone au 06 31 04 34 45. Je m'efforce de trouver une solution rapide, généralement sous 48h.",
		category: 'general',
	},
	{
		id: 'contrat-regulier',
		question: "Proposez-vous des contrats d'entretien régulier ?",
		answer:
			"Oui, je propose des contrats d'entretien saisonniers ou annuels pour un suivi personnalisé de votre jardin. Cela permet de planifier les interventions selon les besoins réels de votre espace vert et de bénéficier de tarifs préférentiels. Contactez-moi pour étudier ensemble la formule adaptée.",
		category: 'general',
	},

	// Prestations & Services
	{
		id: 'services-proposes',
		question: 'Quels services proposez-vous exactement ?',
		answer:
			"Je propose : tonte écologique, taille de haies et arbustes, désherbage manuel, débroussaillage, ramassage de feuilles, entretien de massifs, accompagnement potager, petite maçonnerie paysagère, plantation et aménagements simples. Tous mes services sont réalisés avec des méthodes respectueuses de l'environnement.",
		category: 'services',
	},
	{
		id: 'produits-chimiques',
		question: 'Utilisez-vous des produits chimiques ?',
		answer:
			"Non, jamais. Je refuse catégoriquement l'usage de produits phytosanitaires de synthèse ou de désherbants chimiques. Je privilégie le désherbage manuel, les engrais organiques, le paillage végétal et les techniques inspirées de la permaculture. C'est un engagement ferme pour la santé de votre jardin et de l'environnement.",
		category: 'services',
	},
	{
		id: 'dechets-verts',
		question: 'Que faites-vous des déchets verts ?',
		answer:
			"Je valorise au maximum les déchets verts : compostage sur place si vous avez un compost, broyage pour paillage, ou évacuation en déchetterie agréée. Je peux également vous conseiller pour créer votre propre système de compostage et profiter d'un amendement naturel gratuit pour votre jardin.",
		category: 'services',
	},
	{
		id: 'creation-jardin',
		question: 'Faites-vous de la création de jardin ?',
		answer:
			"Je réalise principalement de l'entretien et des aménagements simples (plantation, petite maçonnerie paysagère, bordures). Pour les créations paysagères complexes, je peux vous orienter vers des confrères spécialisés. Mon expertise se concentre sur l'entretien écologique et l'accompagnement potager.",
		category: 'services',
	},

	// Tarifs & Crédit d\'Impôt
	{
		id: 'credit-impot',
		question: "Comment fonctionne le crédit d'impôt de 50% ?",
		answer:
			"Tous mes services d'entretien de jardin sont éligibles au crédit d'impôt de 50%. En tant que membre de la coopérative Unipros, je vous établis une attestation fiscale annuelle. Vous déclarez la somme payée, et l'État vous rembourse 50% l'année suivante (dans la limite du plafond annuel de 12 000€). Exemple : 100€ de prestations = 50€ de crédit d'impôt.",
		category: 'tarifs',
	},
	{
		id: 'devis',
		question: 'Comment obtenir un devis ?',
		answer:
			'Le devis est gratuit et sans engagement. Je me déplace chez vous pour évaluer précisément vos besoins. Vous pouvez me contacter par téléphone (06 31 04 34 45), email (nature.paysage.laheux@gmail.com) ou via le formulaire de contact. Je vous réponds généralement sous 24h.',
		category: 'tarifs',
	},
	{
		id: 'tarifs-horaires',
		question: 'Quels sont vos tarifs ?',
		answer:
			"Mes tarifs varient selon la nature et la complexité de l'intervention. Je privilégie une tarification au forfait après visite, pour plus de transparence. Comptez généralement entre 25€ et 35€ de l'heure (avant crédit d'impôt), soit 12,50€ à 17,50€ après réduction fiscale. Chaque devis est personnalisé.",
		category: 'tarifs',
	},
	{
		id: 'paiement',
		question: 'Quels moyens de paiement acceptez-vous ?',
		answer:
			"J'accepte les chèques, virements bancaires et CESU préfinancés (Chèque Emploi Service Universel). Le paiement s'effectue après la prestation. Pour les contrats réguliers, je peux convenir avec vous d'un échéancier de paiement mensuel.",
		category: 'tarifs',
	},

	// Approche Écologique
	{
		id: 'pourquoi-ecologique',
		question: 'Pourquoi choisir une approche écologique ?',
		answer:
			"Une approche écologique crée un jardin plus vivant, résilient et autonome. Elle respecte la biodiversité, améliore la qualité du sol, réduit les besoins en eau et en entretien à long terme. C'est aussi meilleur pour votre santé, celle de vos enfants, de vos animaux et de l'environnement. Un jardin écologique est un investissement durable.",
		category: 'ecologie',
	},
	{
		id: 'permaculture',
		question: "Qu'est-ce que la permaculture appliquée au jardin ?",
		answer:
			"La permaculture est une approche qui s'inspire des écosystèmes naturels. Au jardin, cela signifie : observer les cycles naturels, favoriser la diversité, recycler les matières organiques, économiser l'eau, créer des associations bénéfiques entre plantes. Je vous accompagne pour appliquer ces principes de manière simple et pratique.",
		category: 'ecologie',
	},
	{
		id: 'biodiversite',
		question: 'Comment favorisez-vous la biodiversité ?',
		answer:
			'Je préserve les zones refuges (tas de bois, pierres), plante des espèces mellifères pour les pollinisateurs, évite les tontes trop fréquentes, maintiens des zones sauvages, favorise le paillage organique qui abrite la micro-faune. Chaque intervention respecte la faune auxiliaire : hérissons, oiseaux, insectes utiles, vers de terre.',
		category: 'ecologie',
	},
	{
		id: 'conseil-ecologique',
		question: 'Donnez-vous des conseils pour un jardin plus écologique ?',
		answer:
			"Oui, absolument ! Je partage volontiers mes connaissances : choix de plantes adaptées au climat local, techniques de paillage, création de compost, économie d'eau, lutte biologique contre les ravageurs. Mon objectif est de vous rendre autonome et de vous transmettre les bonnes pratiques pour un jardin naturellement sain.",
		category: 'ecologie',
	},
]

// Short version for homepage (top 4 questions)
export const FAQ_SHORT = FAQ_ITEMS.slice(0, 4)
