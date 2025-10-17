import type { Metadata } from 'next'
import { FaqShortSection } from '@/components/sections/home/faq-short-section'
import { FinalCtaSection } from '@/components/sections/home/final-cta-section'
import { HeroSection } from '@/components/sections/home/hero-section'
import { InterventionZoneSection } from '@/components/sections/home/intervention-zone-section'
import { PhilosophySection } from '@/components/sections/home/philosophy-section'
import { RealisationsPreviewSection } from '@/components/sections/home/realisations-preview-section'
import { ServicesPreviewSection } from '@/components/sections/home/services-preview-section'
import { TaxCreditSection } from '@/components/sections/home/tax-credit-section'
import { ValuesSection } from '@/components/sections/home/values-section'
import { getFeaturedServices, getHomepageData, getHomepageFaq, getLatestRealisations } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const homepage = await getHomepageData()

	return generateSEOMetadata(homepage, '/')
}

export default async function HomePage() {
	// Fetch all data from Payload CMS
	const [homepage, services, realisations, faqItems] = await Promise.all([
		getHomepageData(),
		getFeaturedServices(6),
		getLatestRealisations(6),
		getHomepageFaq(4),
	])

	return (
		<>
			<div className="">
				<HeroSection data={homepage.hero!} />
			</div>
			<div className="transform translate-y-[-75px]">
				<ValuesSection data={homepage.values!} />
				<ServicesPreviewSection data={homepage.servicesPreview!} services={services} />
				<PhilosophySection data={homepage.philosophy!} />
				<InterventionZoneSection data={homepage.interventionZone!} />
				<RealisationsPreviewSection data={homepage.realisationsPreview!} realisations={realisations} />
				<FaqShortSection data={homepage.faqShort!} faqItems={faqItems} />
				<TaxCreditSection data={homepage.taxCredit!} />
				<FinalCtaSection data={homepage.finalCta!} />
			</div>
		</>
	)
}
