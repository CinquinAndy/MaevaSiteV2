import { CtaShader } from '@/components/ui/cta-shader'
import type { Homepage } from '@/payload-types'

interface Props {
	data?: Homepage['finalCta']
}

export function FinalCtaSection({ data }: Props) {
	// Extraire les bénéfices de Payload ou utiliser les valeurs par défaut
	const benefits = data?.benefits?.map(b => b.benefit) || [
		'Réponse sous 48h',
		'Devis gratuit et sans engagement',
		'Visite et conseil gratuits',
		"50% de crédit d'impôt garanti",
	]

	return (
		<CtaShader
			title={data?.title || 'Prêt à Redonner Vie à Votre Jardin ?'}
			description={
				data?.description ||
				"Demandez votre devis gratuit et profitez de 50% de réduction d'impôt. Intervention dans le Vignoble Nantais et la Vallée de la Loire."
			}
			buttonText={data?.buttonText || 'Demander un Devis Gratuit'}
			buttonUrl={data?.buttonUrl || '/contact'}
			items={benefits}
		/>
	)
}
