'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { submitContactForm } from '@/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	async function handleSubmit(formData: FormData) {
		setIsSubmitting(true)

		try {
			// Convert FormData to ContactFormData object
			const data = {
				name: formData.get('name') as string,
				email: formData.get('email') as string,
				phone: formData.get('phone') as string,
				city: formData.get('city') as string,
				postalCode: formData.get('postalCode') as string,
				message: formData.get('message') as string,
			}

			const result = await submitContactForm(data)

			if (result.success) {
				toast.success('Message envoyé !', {
					description: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
				})
				// Reset form
				const form = document.querySelector('form') as HTMLFormElement
				form?.reset()
			} else {
				toast.error('Erreur', {
					description: result.message || 'Une erreur est survenue. Veuillez réessayer.',
				})
			}
		} catch (_error) {
			toast.error('Erreur', {
				description: 'Une erreur est survenue. Veuillez réessayer.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form action={handleSubmit} className="space-y-6" id="contact">
			{/* Nom */}
			<div className="space-y-2">
				<Label htmlFor="name">
					Nom complet <span className="text-destructive text-xl font-bold">*</span>
				</Label>
				<Input id="name" name="name" type="text" required placeholder="Votre nom" disabled={isSubmitting} />
			</div>

			{/* Email */}
			<div className="space-y-2">
				<Label htmlFor="email">
					Email <span className="text-destructive text-xl font-bold">*</span>
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					required
					placeholder="votre.email@exemple.com"
					disabled={isSubmitting}
				/>
			</div>

			{/* Téléphone */}
			<div className="space-y-2">
				<Label htmlFor="phone">Téléphone</Label>
				<Input id="phone" name="phone" type="tel" placeholder="06 12 34 56 78" disabled={isSubmitting} />
			</div>

			{/* Ville */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="city">Ville</Label>
					<Input id="city" name="city" type="text" placeholder="Annecy" disabled={isSubmitting} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="postalCode">Code postal</Label>
					<Input id="postalCode" name="postalCode" type="text" placeholder="74000" disabled={isSubmitting} />
				</div>
			</div>

			{/* Message */}
			<div className="space-y-2">
				<Label htmlFor="message">
					Votre message <span className="text-destructive text-xl font-bold">*</span>
				</Label>
				<Textarea
					id="message"
					name="message"
					required
					rows={6}
					placeholder="Décrivez votre projet, la date de votre événement, vos besoins..."
					disabled={isSubmitting}
				/>
			</div>

			{/* Submit Button */}
			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
			</Button>

			<p className="text-sm text-muted-foreground text-center">
				Les champs marqués d'un <span className="text-destructive">*</span> sont obligatoires
			</p>
			<p className="text-xs text-muted-foreground text-left">
				Aucune donnée personnelle n’est conservée par notre site via ce formulaire, les données de contact seront
				utilisées uniquement pour vous re-contacter. En raison d'une récente recrudescence de désistements, des frais de
				réservations vous seront demandés afin de valider la prise en charge de la prestation.
			</p>
		</form>
	)
}
