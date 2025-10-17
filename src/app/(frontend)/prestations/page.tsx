import { CheckCircle2, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedGrid } from '@/components/animation/animated-grid'
import { PageHero } from '@/components/sections/shared/page-hero'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { TaxCreditEligibility } from '@/components/sections/shared/tax-credit-eligibility'
import { CtaShader } from '@/components/ui/cta-shader'
import { getMediaUrl, getMediaUrlOptional, getPrestationsPageData, getServices } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const prestationsPage = await getPrestationsPageData()

	return generateSEOMetadata(prestationsPage, '/prestations')
}

export default async function PrestationsPage() {
	// Fetch all data from Payload CMS
	const [prestationsPage, services] = await Promise.all([getPrestationsPageData(), getServices()])

	// Transform taxCreditEligibility data to tabs format
	const taxCredit = prestationsPage.taxCreditEligibility!
	const eligibleImageUrl = getMediaUrlOptional(taxCredit.eligibleImage) || ''
	const nonEligibleImageUrl = getMediaUrlOptional(taxCredit.nonEligibleImage) || ''

	const tabs = [
		{
			value: 'eligible',
			icon: <CheckCircle2 className="h-auto w-4 shrink-0" />,
			label: "Éligible au crédit d'impôt",
			content: {
				title: taxCredit.eligibleTitle!,
				description: taxCredit.eligibleDescription!,
				items: taxCredit.eligibleItems!.map(item => ({
					text: item.title!,
					description: item.description || undefined,
				})),
				imageSrc: eligibleImageUrl,
				imageAlt: "Prestations éligibles au crédit d'impôt",
			},
		},
		{
			value: 'non-eligible',
			icon: <XCircle className="h-auto w-4 shrink-0" />,
			label: 'Non éligible',
			content: {
				title: taxCredit.nonEligibleTitle!,
				description: taxCredit.nonEligibleDescription!,
				items: taxCredit.nonEligibleItems!.map(item => ({
					text: item.title!,
					description: item.description || undefined,
				})),
				imageSrc: nonEligibleImageUrl,
				imageAlt: "Prestations non éligibles au crédit d'impôt",
			},
		},
	]

	const heroImageUrl = getMediaUrl(prestationsPage.hero!.image!)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={prestationsPage.hero!.title!}
				imageSrc={heroImageUrl}
				imageAlt="Prestations paysagistes écologiques"
			/>

			{/* Services Grid */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{services.map(service => (
							<Link key={service.id} href={`/prestations/${service.slug}`} className="cursor-pointer">
								<ServiceCard service={service} showImage={true} />
							</Link>
						))}
					</AnimatedGrid>
				</div>
			</section>

			{/* Tax Credit Eligibility Section with Tabs */}
			<TaxCreditEligibility
				heading={taxCredit.title!}
				description={taxCredit.description!}
				tabs={tabs}
				importantNote={taxCredit.importantNote || undefined}
			/>

			{/* CTA Section with Shader */}
			<CtaShader
				title={prestationsPage.ctaSection!.title!}
				description={prestationsPage.ctaSection!.description!}
				buttonText={prestationsPage.ctaSection!.buttonText!}
				buttonUrl={prestationsPage.ctaSection!.buttonUrl!}
				items={prestationsPage.ctaSection!.benefits!.map(item => item.benefit).filter((item): item is string => !!item)}
			/>
		</div>
	)
}
