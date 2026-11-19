'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { submitContactForm } from '@/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	CONTACT_FIELD_NAMES,
	type ContactDraftFields,
	clearContactDraft,
	fieldsFingerprint,
	fieldsFromFormData,
	planSubmitFailure,
	resumeContactDraft,
	submissionIdFor,
} from '@/lib/contact-draft'
import { HONEYPOT_FIELD } from '@/lib/security/spam'

/**
 * Clé publique du widget Turnstile « cinquin-maeva.com contact » (compte Cloudflare d'Andy).
 * En développement : clé de test de Cloudflare, qui passe toujours (le serveur ignore alors la vérification).
 */
const TURNSTILE_SITE_KEY =
	process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
	(process.env.NODE_ENV === 'production' ? '0x4AAAAAAGI9fX7BRpZ15PDm' : '1x00000000000000000000AA')

interface TurnstileApi {
	render: (
		element: HTMLElement,
		options: {
			sitekey: string
			callback: (token: string) => void
			'expired-callback': () => void
			'error-callback': () => void
			language?: string
			theme?: 'auto' | 'light' | 'dark'
		}
	) => string
	reset: (widgetId?: string) => void
	remove: (widgetId?: string) => void
}

declare global {
	interface Window {
		turnstile?: TurnstileApi
	}
}

function getSessionStorage(): Storage | null {
	try {
		return window.sessionStorage
	} catch {
		return null
	}
}

/** Remet dans les champs (non contrôlés) ce que le visiteur avait tapé avant le rechargement. */
function fillForm(form: HTMLFormElement, fields: ContactDraftFields) {
	for (const name of CONTACT_FIELD_NAMES) {
		const field = form.elements.namedItem(name)
		if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.value = fields[name]
	}
}

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const formRef = useRef<HTMLFormElement>(null)
	// Identifiant de l'envoi en cours (clé d'idempotence côté serveur) et empreinte des champs envoyés.
	const submissionRef = useRef<{ submissionId: string; fingerprint: string } | null>(null)
	// true pendant l'envoi relancé automatiquement après rechargement.
	const autoRetryRef = useRef(false)
	// Renvoi automatique en attente du jeton Turnstile (le widget n'en a pas encore produit au chargement).
	const pendingAutoRetryRef = useRef(false)
	// Widget Turnstile : conteneur, identifiant et dernier jeton (à usage unique, valable environ 5 minutes).
	const turnstileContainerRef = useRef<HTMLDivElement>(null)
	const turnstileWidgetRef = useRef<string | null>(null)
	const turnstileTokenRef = useRef<string | null>(null)

	function submitAutoRetry() {
		const form = formRef.current
		if (!form) return
		pendingAutoRetryRef.current = false
		autoRetryRef.current = true
		// L'événement submit est traité tout de suite : handleSubmit a déjà lu le drapeau au retour.
		form.requestSubmit()
		autoRetryRef.current = false
	}

	/** Affiche le widget une fois le script chargé (aussi après une navigation côté client). */
	function renderTurnstile() {
		const container = turnstileContainerRef.current
		if (!window.turnstile || !container || turnstileWidgetRef.current) return
		turnstileWidgetRef.current = window.turnstile.render(container, {
			sitekey: TURNSTILE_SITE_KEY,
			language: 'fr',
			theme: 'auto',
			callback: token => {
				turnstileTokenRef.current = token
				if (pendingAutoRetryRef.current) submitAutoRetry()
			},
			'expired-callback': () => {
				turnstileTokenRef.current = null
			},
			'error-callback': () => {
				turnstileTokenRef.current = null
			},
		})
	}

	/** Un jeton ne sert qu'une fois : on en redemande un après chaque tentative. */
	function resetTurnstile() {
		turnstileTokenRef.current = null
		if (turnstileWidgetRef.current) window.turnstile?.reset(turnstileWidgetRef.current)
	}

	useEffect(() => {
		return () => {
			if (turnstileWidgetRef.current) window.turnstile?.remove(turnstileWidgetRef.current)
			turnstileWidgetRef.current = null
		}
	}, [])

	// Après une mise à jour du site : restaurer ce que le visiteur avait tapé et renvoyer une seule fois.
	useEffect(() => {
		const form = formRef.current
		const resumed = resumeContactDraft(getSessionStorage())
		if (!form || !resumed) return
		fillForm(form, resumed.draft.fields)
		submissionRef.current = {
			submissionId: resumed.draft.submissionId,
			fingerprint: fieldsFingerprint(resumed.draft.fields),
		}
		if (!resumed.autoRetry) return
		// Le renvoi part dès que Turnstile a produit un jeton (tout de suite s'il en a déjà un).
		pendingAutoRetryRef.current = true
		if (turnstileTokenRef.current) submitAutoRetry()
	}, [])

	// onSubmit plutôt que <form action> : React ne vide plus les champs après un échec.
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const form = event.currentTarget
		// Lu avant tout changement d'état : les champs désactivés pendant l'envoi ne sont pas dans FormData.
		const fields = fieldsFromFormData(new FormData(form))
		const isAutoRetry = autoRetryRef.current
		autoRetryRef.current = false
		const turnstileToken = turnstileTokenRef.current
		if (!turnstileToken) {
			toast.info('Vérification anti-robot en cours', {
				description:
					'Patientez quelques secondes puis renvoyez. Si le blocage persiste, écrivez directement par email.',
			})
			return
		}
		const honeypot = new FormData(form).get(HONEYPOT_FIELD)
		const submission = submissionIdFor(submissionRef.current, fields)
		submissionRef.current = submission

		setIsSubmitting(true)

		try {
			const result = await submitContactForm({
				...fields,
				submissionId: submission.submissionId,
				turnstileToken,
				website: typeof honeypot === 'string' ? honeypot : '',
			})

			if (result.success) {
				clearContactDraft(getSessionStorage())
				submissionRef.current = null
				toast.success('Message envoyé !', {
					description: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
				})
				// Reset form
				form.reset()
			} else {
				toast.error('Erreur', {
					description: result.message || 'Une erreur est survenue. Veuillez réessayer.',
				})
			}
		} catch (error) {
			// Site mis à jour pendant que la page était ouverte (action introuvable), coupure réseau ou réponse
			// non reconnue : on garde le message et on recharge la page pour le renvoyer une fois automatiquement.
			const plan = planSubmitFailure({
				error,
				fields,
				submissionId: submission.submissionId,
				isAutoRetry,
				storage: getSessionStorage(),
			})
			if (plan.action === 'reload') {
				window.location.reload()
				return
			}
			toast.error('Erreur', {
				description: plan.action === 'show-message' ? plan.message : 'Une erreur est survenue. Veuillez réessayer.',
				...(plan.action === 'show-message' ? { duration: 8000 } : {}),
			})
		} finally {
			resetTurnstile()
			setIsSubmitting(false)
		}
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="space-y-6" id="contact">
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
				<Label htmlFor="phone">
					Téléphone <span className="text-destructive text-xl font-bold">*</span>
				</Label>
				<Input id="phone" name="phone" type="tel" required placeholder="06 12 34 56 78" disabled={isSubmitting} />
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

			{/* Champ piège : invisible pour les visiteurs, rempli par les robots qui remplissent tout. */}
			<div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
				<label htmlFor={HONEYPOT_FIELD}>Ne pas remplir ce champ</label>
				<input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
			</div>

			{/* Cloudflare Turnstile : vérification anti-robot, le plus souvent invisible pour le visiteur. */}
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
				strategy="afterInteractive"
				onReady={renderTurnstile}
			/>
			<div ref={turnstileContainerRef} className="min-h-[65px]" />

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
