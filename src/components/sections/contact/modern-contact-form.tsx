'use client'

import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { type ContactFormData, submitContactForm } from '@/actions/contact'
import { AddressAutocomplete } from '@/components/ui/address-autocomplete'
import { Button } from '@/components/ui/button'
import type { ContactPage, SiteSetting } from '@/payload-types'

// Animation pour le titre et sous-titre
const headerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
}

// Container pour stagger les champs du formulaire
const formContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.12, // Plus espacé
			delayChildren: 0.2, // Délai avant de commencer
		},
	},
}

// Animation pour chaque champ du formulaire
const fieldVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
}

// Animation pour la sidebar (arrive depuis la droite)
const sidebarContainerVariants = {
	hidden: { opacity: 0, x: 30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1] as const,
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
}

// Animation pour chaque item de la sidebar
const sidebarItemVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
}

// Viewport config pour déclencher l'animation quand visible
const viewportConfig = {
	once: true,
	margin: '-50px', // Trigger un peu avant que l'élément soit visible
	amount: 0.1,
}

interface ModernContactFormProps {
	formSection?: ContactPage['formSection']
	contactInfo: SiteSetting['contact']
	benefits?:
		| {
				benefit?: string | null
				id?: string | null
		  }[]
		| null
}

export function ModernContactForm({ formSection, contactInfo, benefits }: ModernContactFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		message: '',
		gardenSize: '',
	})

	const [focusedField, setFocusedField] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const result = await submitContactForm(formData as ContactFormData)

			if (result.success) {
				toast.success('Message envoyé !', {
					description: 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.',
					duration: 5000,
				})
				// Réinitialiser le formulaire
				setFormData({
					name: '',
					email: '',
					phone: '',
					address: '',
					city: '',
					postalCode: '',
					message: '',
					gardenSize: '',
				})
			} else {
				toast.error('Erreur', {
					description: result.message,
					duration: 5000,
				})
			}
		} catch (_error) {
			toast.error('Erreur', {
				description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
				duration: 5000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	// Format phone for href
	const phoneHref = contactInfo.phone.replace(/\s/g, '')

	// Format full address
	const fullAddress = [contactInfo.address?.postalCode, contactInfo.address?.city, contactInfo.address?.region]
		.filter(Boolean)
		.join(' ')

	return (
		<div className="relative isolate bg-background px-6 py-24 sm:py-32 lg:px-8">
			{/* Background Pattern */}
			<svg
				aria-hidden="true"
				className="absolute inset-0 -z-10 size-full stroke-border/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
			>
				<defs>
					<pattern x="50%" y={-64} id="contact-pattern" width={200} height={200} patternUnits="userSpaceOnUse">
						<path d="M100 200V.5M.5 .5H200" fill="none" />
					</pattern>
				</defs>
				<svg x="50%" y={-64} className="overflow-visible fill-muted/20" aria-hidden="true">
					<path
						d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
						strokeWidth={0}
					/>
				</svg>
				<rect fill="url(#contact-pattern)" width="100%" height="100%" strokeWidth={0} />
			</svg>

			<div className="mx-auto max-w-xl lg:max-w-6xl">
				{/* Header avec animation */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportConfig}
					variants={headerVariants}
					className="text-center lg:text-left"
				>
					<h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
						{formSection?.title || 'Parlons de Votre Jardin'}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{formSection?.subtitle ||
							"Demandez votre devis gratuit et bénéficiez de 50% de crédit d'impôt sur vos prestations."}
					</p>
				</motion.div>

				<div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
					{/* Form avec stagger animation */}
					<motion.form
						onSubmit={handleSubmit}
						className="lg:flex-auto"
						initial="hidden"
						whileInView="visible"
						viewport={viewportConfig}
						variants={formContainerVariants}
					>
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							{/* Name */}
							<motion.div variants={fieldVariants} className="sm:col-span-2">
								<label htmlFor="name" className="block text-sm font-semibold text-foreground">
									Nom complet *
								</label>
								<div className="mt-2.5">
									<input
										id="name"
										name="name"
										type="text"
										required
										value={formData.name}
										onChange={e => setFormData({ ...formData, name: e.target.value })}
										onFocus={() => setFocusedField('name')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'name'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="Jean Dupont"
									/>
								</div>
							</motion.div>

							{/* Email */}
							<motion.div variants={fieldVariants}>
								<label htmlFor="email" className="block text-sm font-semibold text-foreground">
									Email *
								</label>
								<div className="mt-2.5">
									<input
										id="email"
										name="email"
										type="email"
										required
										value={formData.email}
										onChange={e => setFormData({ ...formData, email: e.target.value })}
										onFocus={() => setFocusedField('email')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'email'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="jean.dupont@email.com"
									/>
								</div>
							</motion.div>

							{/* Phone */}
							<motion.div variants={fieldVariants}>
								<label htmlFor="phone" className="block text-sm font-semibold text-foreground">
									Téléphone *
								</label>
								<div className="mt-2.5">
									<input
										id="phone"
										name="phone"
										type="tel"
										required
										value={formData.phone}
										onChange={e => setFormData({ ...formData, phone: e.target.value })}
										onFocus={() => setFocusedField('phone')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'phone'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="06 12 34 56 78"
									/>
								</div>
							</motion.div>

							{/* Address */}
							<motion.div variants={fieldVariants}>
								<label htmlFor="address" className="block text-sm font-semibold text-foreground">
									Adresse du jardin
								</label>
								<div className="mt-2.5">
									<AddressAutocomplete
										value={formData.address}
										onChange={value => setFormData({ ...formData, address: value })}
										onSelect={address => {
											setFormData({
												...formData,
												address: address.properties.label,
												city: address.properties.city,
												postalCode: address.properties.postcode,
											})
										}}
										onFocus={() => setFocusedField('address')}
										onBlur={() => setFocusedField(null)}
										placeholder="Commencez à taper une adresse..."
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'address'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
									/>
								</div>
							</motion.div>

							{/* Garden Size */}
							<motion.div variants={fieldVariants}>
								<label htmlFor="gardenSize" className="block text-sm font-semibold text-foreground">
									Surface du jardin
								</label>
								<div className="mt-2.5">
									<select
										id="gardenSize"
										name="gardenSize"
										value={formData.gardenSize}
										onChange={e => setFormData({ ...formData, gardenSize: e.target.value })}
										onFocus={() => setFocusedField('gardenSize')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 focus:outline-none ${
											focusedField === 'gardenSize'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
									>
										<option value="">Sélectionnez...</option>
										{formSection?.gardenSizeOptions?.map(option => (
											<option key={option.id || option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
							</motion.div>

							{/* Message */}
							<motion.div variants={fieldVariants} className="sm:col-span-2">
								<label htmlFor="message" className="block text-sm font-semibold text-foreground">
									Votre message *
								</label>
								<div className="mt-2.5">
									<textarea
										id="message"
										name="message"
										rows={6}
										required
										value={formData.message}
										onChange={e => setFormData({ ...formData, message: e.target.value })}
										onFocus={() => setFocusedField('message')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none resize-none ${
											focusedField === 'message'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="Décrivez votre projet, vos besoins, vos attentes..."
									/>
								</div>
							</motion.div>
						</div>

						<motion.div variants={fieldVariants} className="mt-10">
							<Button
								type="submit"
								size="lg"
								disabled={isSubmitting}
								className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Envoi en cours...
									</>
								) : (
									'Envoyer ma demande'
								)}
							</Button>
						</motion.div>

						<motion.p variants={fieldVariants} className="mt-4 text-sm text-muted-foreground">
							{formSection?.privacyText ||
								'En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre demande. Réponse sous 48h maximum.'}
						</motion.p>
					</motion.form>

					{/* Sidebar Info avec animation séparée */}
					<motion.div
						className="lg:mt-6 lg:w-80 lg:flex-none"
						initial="hidden"
						whileInView="visible"
						viewport={viewportConfig}
						variants={sidebarContainerVariants}
					>
						{/* Contact Info Card */}
						<motion.div
							className="rounded-2xl bg-card border border-border p-8 shadow-lg"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<div className="space-y-6">
								<motion.div variants={sidebarItemVariants} className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<motion.div
											className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.2 }}
										>
											<Phone className="h-6 w-6 text-primary" />
										</motion.div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Téléphone</p>
										<Link
											href={`tel:${phoneHref}`}
											className="text-base text-muted-foreground hover:text-primary transition-colors"
										>
											{contactInfo.phone}
										</Link>
										<p className="text-xs text-muted-foreground mt-1">Le moyen le plus rapide</p>
									</div>
								</motion.div>

								<motion.div variants={sidebarItemVariants} className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<motion.div
											className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.2 }}
										>
											<Mail className="h-6 w-6 text-primary" />
										</motion.div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Email</p>
										<Link
											href={`mailto:${contactInfo.email}`}
											className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
										>
											{contactInfo.email}
										</Link>
										<p className="text-xs text-muted-foreground mt-1">Réponse sous 48h</p>
									</div>
								</motion.div>

								<motion.div variants={sidebarItemVariants} className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<motion.div
											className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.2 }}
										>
											<MapPin className="h-6 w-6 text-primary" />
										</motion.div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Adresse</p>
										<p className="text-sm text-muted-foreground">{fullAddress}</p>
									</div>
								</motion.div>

								<motion.div variants={sidebarItemVariants} className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<motion.div
											className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.2 }}
										>
											<Clock className="h-6 w-6 text-primary" />
										</motion.div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Horaires</p>
										<p className="text-sm text-muted-foreground">Lundi - Vendredi</p>
										<p className="text-sm text-muted-foreground">{contactInfo.hours?.weekday}</p>
									</div>
								</motion.div>
							</div>

							{/* Benefits */}
							<div className="mt-8 space-y-3 pt-8 border-t border-border">
								{benefits?.map((item, index) =>
									item.benefit ? (
										<motion.div
											key={item.id}
											variants={sidebarItemVariants}
											custom={index}
											className="flex items-center gap-3"
										>
											<CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
											<span className="text-sm text-muted-foreground">{item.benefit}</span>
										</motion.div>
									) : null
								)}
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
