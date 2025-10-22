'use client'

import { useState } from 'react'
import { submitContactForm } from '@/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	async function handleSubmit(formData: FormData) {
		setIsSubmitting(true)
		setMessage(null)

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
				setMessage({
					type: 'success',
					text: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
				})
				// Reset form
				const form = document.querySelector('form') as HTMLFormElement
				form?.reset()
			} else {
				setMessage({
					type: 'error',
					text: result.error || 'Une erreur est survenue. Veuillez réessayer.',
				})
			}
		} catch (_error) {
			setMessage({
				type: 'error',
				text: 'Une erreur est survenue. Veuillez réessayer.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form action={handleSubmit} className="space-y-6">
			{/* Message de retour */}
			{message && (
				<div
					className={`p-4 rounded-lg ${
						message.type === 'success'
							? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
							: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
					}`}
				>
					{message.text}
				</div>
			)}

			{/* Nom */}
			<div className="space-y-2">
				<Label htmlFor="name">
					Nom complet <span className="text-destructive">*</span>
				</Label>
				<Input id="name" name="name" type="text" required placeholder="Votre nom" disabled={isSubmitting} />
			</div>

			{/* Email */}
			<div className="space-y-2">
				<Label htmlFor="email">
					Email <span className="text-destructive">*</span>
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
					Votre message <span className="text-destructive">*</span>
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
		</form>
	)
}
