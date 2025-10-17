import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface TaxCreditBannerProps {
	variant?: 'default' | 'compact' | 'detailed'
	className?: string
}

export function TaxCreditBanner({ variant = 'default', className = '' }: TaxCreditBannerProps) {
	if (variant === 'compact') {
		return (
			<Badge variant="success" className={`text-sm px-4 py-2 ${className}`}>
				<Sparkles className="h-4 w-4 mr-1" />
				50% de crédit d'impôt
			</Badge>
		)
	}

	if (variant === 'detailed') {
		return (
			<div
				className={`rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6 ${className}`}
			>
				<div className="flex items-start gap-4">
					<div className="rounded-full bg-green-100 p-3">
						<Sparkles className="h-6 w-6 text-green-600" />
					</div>
					<div className="flex-1">
						<h3 className="text-xl font-bold text-green-900 mb-2">50% DE CRÉDIT D'IMPÔT</h3>
						<p className="text-sm text-green-800 mb-3">Services à la Personne</p>
						<div className="space-y-1 text-sm text-green-700">
							<p>
								<strong>Exemple :</strong> Votre prestation de 200€
							</p>
							<p>Ne vous coûte réellement que 100€</p>
							<p className="text-xs mt-2 text-green-600">Jusqu'à 2 500€ d'économie par an</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// Default variant
	return (
		<div
			className={`inline-flex items-center gap-3 rounded-lg bg-green-100 border border-green-200 px-6 py-3 ${className}`}
		>
			<Sparkles className="h-5 w-5 text-green-600" />
			<div className="text-sm">
				<span className="font-bold text-green-900">50% de crédit d'impôt</span>
				<span className="text-green-700 ml-2">sur toutes les prestations</span>
			</div>
		</div>
	)
}
