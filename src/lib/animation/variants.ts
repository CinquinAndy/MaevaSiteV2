import type { Variants } from 'motion/react'

/**
 * Animation variants optimisés pour les performances
 * Utilisent uniquement opacity et transform pour le GPU acceleration
 */

// Fade in simple
export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1], // Ease out expo
		},
	},
}

// Fade in depuis le bas (le plus commun)
export const fadeInUp: Variants = {
	hidden: {
		opacity: 0,
		y: 40,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Fade in depuis le haut
export const fadeInDown: Variants = {
	hidden: {
		opacity: 0,
		y: -40,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Fade in depuis la gauche
export const fadeInLeft: Variants = {
	hidden: {
		opacity: 0,
		x: -40,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Fade in depuis la droite
export const fadeInRight: Variants = {
	hidden: {
		opacity: 0,
		x: 40,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Scale in avec fade
export const scaleIn: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Scale in plus prononcé (pour les modales, cartes importantes)
export const scaleInLarge: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Container pour stagger les enfants
export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
}

// Container pour stagger rapide
export const staggerContainerFast: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.05,
		},
	},
}

// Container pour stagger lent (plus élégant)
export const staggerContainerSlow: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
}

// Item pour stagger (combiné avec fadeInUp)
export const staggerItem: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Hover pour cartes
export const cardHover: Variants = {
	rest: {
		scale: 1,
	},
	hover: {
		scale: 1.03,
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Hover pour boutons
export const buttonHover: Variants = {
	rest: {
		scale: 1,
	},
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	tap: {
		scale: 0.95,
	},
}

// Animation pour les images (slight zoom on reveal)
export const imageReveal: Variants = {
	hidden: {
		opacity: 0,
		scale: 1.1,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 1.2,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Animation pour le hero avec parallax subtil
export const heroText: Variants = {
	hidden: {
		opacity: 0,
		y: 60,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.9,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Slide pour les panneaux latéraux
export const slidePanel: Variants = {
	hidden: {
		x: '100%',
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: {
		x: '100%',
		transition: {
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Transitions de page
export const pageTransition: Variants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

// Configuration viewport par défaut pour whileInView
export const defaultViewportConfig = {
	once: true,
	margin: '0px', // Déclencher dès que visible (meilleur pour mobile)
	amount: 0.1 as const, // Seulement 10% visible nécessaire (meilleur pour mobile)
}

// Configuration viewport pour les éléments en bas de page
export const bottomViewportConfig = {
	once: true,
	margin: '0px',
	amount: 0.05 as const, // Encore plus permissif pour les éléments en bas
}
