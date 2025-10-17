import type { Metadata } from 'next'
import { ModernContactForm } from '@/components/sections/contact/modern-contact-form'
import { PageHero } from '@/components/sections/shared/page-hero'
import { getContactPageData, getMediaUrl, getSiteSettings } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const contactPage = await getContactPageData()

	return generateSEOMetadata(contactPage, '/contact')
}

export default async function ContactPage() {
	// Fetch data from Payload CMS
	const [contactPage, siteSettings] = await Promise.all([getContactPageData(), getSiteSettings()])

	const heroImageUrl = getMediaUrl(contactPage.hero!.image!)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={contactPage.hero!.title!}
				imageSrc={heroImageUrl}
				imageAlt="Contact Jean-Luc Laheux Eco-Paysagiste"
			/>

			{/* Modern Contact Form */}
			<ModernContactForm
				formSection={contactPage.formSection!}
				contactInfo={siteSettings.contact!}
				benefits={contactPage.contactInfoSidebar!.benefits!}
			/>
		</div>
	)
}
