import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/faq/faq-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { CtaShader } from '@/components/ui/cta-shader'
import { getFaq, getFaqPageData, getMediaUrl } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const faqPage = await getFaqPageData()

	return generateSEOMetadata(faqPage, '/faq')
}

/**
 * Category labels matching the FAQ collection schema
 */
const FAQ_CATEGORIES = {
	general: 'Questions Générales',
	services: 'Prestations & Services',
	tarifs: "Tarifs & Crédit d'Impôt",
	ecologie: 'Approche Écologique',
} as const

export default async function Page() {
	// Fetch data from Payload CMS
	const [faqPage, allFaqItems] = await Promise.all([getFaqPageData(), getFaq()])

	// Group FAQ items by category
	const faqByCategory = Object.entries(FAQ_CATEGORIES).map(([key, label]) => {
		const categoryKey = key as 'general' | 'services' | 'tarifs' | 'ecologie'

		// Find custom description from Payload if provided
		const customDesc = faqPage.categoryDescriptions?.find(desc => desc.category === categoryKey)

		return {
			category: categoryKey,
			label,
			description: customDesc?.description || `Découvrez toutes les informations concernant ${label.toLowerCase()}`,
			items: allFaqItems.filter(item => item.category === categoryKey),
		}
	})

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={faqPage.hero!.title!}
				imageSrc={getMediaUrl(faqPage.hero!.image!)}
				imageAlt="Questions fréquentes sur les services d'éco-paysagisme"
			/>

			{/* FAQ Sections by Category */}
			{faqByCategory.map(({ category, label, description, items }) => (
				<FaqSection
					key={category}
					title={label}
					description={description}
					categoryLabel={label}
					items={items}
					showCta={false}
				/>
			))}

			{/* CTA Section with Shader */}
			<CtaShader
				title={faqPage.ctaSection!.title!}
				description={faqPage.ctaSection!.description!}
				buttonText={faqPage.ctaSection!.buttonText!}
				buttonUrl={faqPage.ctaSection!.buttonUrl!}
				items={faqPage.ctaSection!.benefits!.map(b => b.benefit).filter((item): item is string => !!item)}
			/>
		</div>
	)
}
