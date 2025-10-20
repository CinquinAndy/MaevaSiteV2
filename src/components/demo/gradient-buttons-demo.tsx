import { IconMail, IconPhone, IconSparkles } from '@tabler/icons-react'
import Link from 'next/link'
import { GradientButton } from '@/components/ui/gradient-button'

/**
 * Composant de démonstration pour les boutons gradient.
 * Affiche toutes les variantes et cas d'usage possibles.
 *
 * Pour utiliser ce composant, importez-le dans une page :
 * import { GradientButtonsDemo } from '@/components/demo/gradient-buttons-demo'
 *
 * Et ajoutez-le au JSX :
 * <GradientButtonsDemo />
 */
export function GradientButtonsDemo() {
	return (
		<div className="w-full py-24 px-4 bg-background">
			<div className="max-w-5xl mx-auto space-y-16">
				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold">Boutons Gradient</h1>
					<p className="text-lg text-muted-foreground">Démonstration des différentes variantes et utilisations</p>
				</div>

				{/* Variantes de base */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">Variantes de base</h2>
					<div className="flex flex-wrap gap-4 items-center">
						<GradientButton>Bouton Default</GradientButton>
						<GradientButton variant="secondary">Bouton Secondary</GradientButton>
					</div>
				</div>

				{/* Avec icônes */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">Avec icônes</h2>
					<div className="flex flex-wrap gap-4 items-center">
						<GradientButton>
							<IconMail className="w-5 h-5" />
							Envoyer un email
						</GradientButton>
						<GradientButton variant="secondary">
							<IconPhone className="w-5 h-5" />
							Appeler
						</GradientButton>
						<GradientButton>
							<IconSparkles className="w-5 h-5" />
							Découvrir
						</GradientButton>
					</div>
				</div>

				{/* Avec liens */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">Avec liens (asChild)</h2>
					<div className="flex flex-wrap gap-4 items-center">
						<GradientButton asChild>
							<Link href="/contact">Page Contact</Link>
						</GradientButton>
						<GradientButton asChild variant="secondary">
							<Link href="/prestations">Nos Services</Link>
						</GradientButton>
						<GradientButton asChild>
							<a href="tel:+33616625137">
								<IconPhone className="w-5 h-5" />
								06 16 62 51 37
							</a>
						</GradientButton>
					</div>
				</div>

				{/* Tailles */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">Avec classes personnalisées</h2>
					<div className="flex flex-wrap gap-4 items-center">
						<GradientButton className="px-4 py-2 text-sm">Petit</GradientButton>
						<GradientButton>Normal</GradientButton>
						<GradientButton className="px-12 py-6 text-lg">Large</GradientButton>
					</div>
				</div>

				{/* État désactivé */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">État désactivé</h2>
					<div className="flex flex-wrap gap-4 items-center">
						<GradientButton disabled>Bouton désactivé</GradientButton>
						<GradientButton variant="secondary" disabled>
							Bouton désactivé
						</GradientButton>
					</div>
				</div>

				{/* Exemple de groupe */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">Groupe de boutons (CTA)</h2>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<GradientButton asChild>
							<Link href="/contact">
								<IconMail className="w-5 h-5" />
								Demander un devis
							</Link>
						</GradientButton>
						<GradientButton asChild variant="secondary">
							<a href="tel:+33616625137">
								<IconPhone className="w-5 h-5" />
								06 16 62 51 37
							</a>
						</GradientButton>
					</div>
				</div>

				{/* Code d'exemple */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold">Exemples de code</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="p-4 bg-muted rounded-lg">
							<p className="text-sm font-medium mb-2">Bouton simple</p>
							<code className="text-xs bg-background p-2 rounded block overflow-x-auto">
								{'<GradientButton>Texte</GradientButton>'}
							</code>
						</div>
						<div className="p-4 bg-muted rounded-lg">
							<p className="text-sm font-medium mb-2">Avec variante</p>
							<code className="text-xs bg-background p-2 rounded block overflow-x-auto">
								{'<GradientButton variant="secondary">Texte</GradientButton>'}
							</code>
						</div>
						<div className="p-4 bg-muted rounded-lg">
							<p className="text-sm font-medium mb-2">Avec lien</p>
							<code className="text-xs bg-background p-2 rounded block overflow-x-auto">
								{'<GradientButton asChild>\n  <Link href="/page">Lien</Link>\n</GradientButton>'}
							</code>
						</div>
						<div className="p-4 bg-muted rounded-lg">
							<p className="text-sm font-medium mb-2">Avec icône</p>
							<code className="text-xs bg-background p-2 rounded block overflow-x-auto">
								{'<GradientButton>\n  <Icon />\n  Texte\n</GradientButton>'}
							</code>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
