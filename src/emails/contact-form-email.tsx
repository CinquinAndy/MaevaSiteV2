import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'

interface ContactFormEmailProps {
	name: string
	email: string
	phone: string
	address?: string
	city?: string
	postalCode?: string
	message: string
}

export const ContactFormEmail = ({ name, email, phone, address, city, postalCode, message }: ContactFormEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Nouvelle demande de contact de {name}</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header with gradient background */}
					<Section style={header}>
						<Heading style={headerTitle}>Maeva Cinquin</Heading>
						<Text style={headerSubtitle}>Maquillage Artistique & Nail Art</Text>
					</Section>

					{/* Main content card */}
					<Section style={contentCard}>
						<Heading style={h1}>Nouvelle demande de contact</Heading>
						<Text style={introText}>Vous avez reçu un nouveau message depuis votre site web.</Text>

						<Hr style={divider} />

						{/* Contact Information Grid */}
						<Section style={infoGrid}>
							<Section style={infoItem}>
								<Text style={label}>Nom complet</Text>
								<Text style={value}>{name}</Text>
							</Section>

							<Section style={infoItem}>
								<Text style={label}>Adresse email</Text>
								<Text style={valueLink}>{email}</Text>
							</Section>

							<Section style={infoItem}>
								<Text style={label}>Téléphone</Text>
								<Text style={value}>{phone}</Text>
							</Section>

							{city && (
								<Section style={infoItem}>
									<Text style={label}>Ville</Text>
									<Text style={value}>
										{city}
										{postalCode && ` (${postalCode})`}
									</Text>
								</Section>
							)}

							{address && (
								<Section style={infoItem}>
									<Text style={label}>Adresse</Text>
									<Text style={value}>{address}</Text>
								</Section>
							)}
						</Section>

						<Hr style={divider} />

						{/* Message section with accent background */}
						<Section style={messageSection}>
							<Text style={label}>Message</Text>
							<Section style={messageBox}>
								<Text style={messageText}>{message}</Text>
							</Section>
						</Section>
					</Section>

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Maeva Cinquin - Maquillage Professionnel
							<br />
							Haute-Savoie, Genève, Lausanne et environs
						</Text>
						<Text style={footerLinks}>
							<a href="mailto:maevacinquin1@gmail.com" style={footerLink}>
								maevacinquin1@gmail.com
							</a>
							{' • '}
							<a href="tel:+33616625137" style={footerLink}>
								+33 6 16 62 51 37
							</a>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

export default ContactFormEmail

// Styles - Inspired by Maeva's brand colors (pink/mauve palette)
const main = {
	backgroundColor: '#1a1a1a', // Dark background matching site
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif, "Libre Caslon Display", serif',
	padding: '40px 20px',
}

const container = {
	margin: '0 auto',
	maxWidth: '600px',
}

const header = {
	background: 'linear-gradient(135deg, #D493A8 0%, #A86B84 100%)', // Primary to secondary gradient
	borderRadius: '16px 16px 0 0',
	padding: '40px 32px',
	textAlign: 'center' as const,
}

const headerTitle = {
	color: '#1a1a1a',
	fontSize: '32px',
	fontWeight: '700',
	margin: '0 0 8px 0',
	fontFamily: '"Libre Caslon Display", serif',
	letterSpacing: '0.5px',
}

const headerSubtitle = {
	color: 'rgba(26, 26, 26, 0.8)',
	fontSize: '14px',
	fontWeight: '500',
	margin: '0',
	textTransform: 'uppercase' as const,
	letterSpacing: '2px',
}

const contentCard = {
	backgroundColor: '#2a2a2a', // Card background
	borderRadius: '0 0 16px 16px',
	padding: '32px',
	border: '1px solid rgba(212, 147, 168, 0.2)', // Primary color border
}

const h1 = {
	color: '#f0f0f0', // Foreground color
	fontSize: '24px',
	fontWeight: '700',
	margin: '0 0 8px 0',
	fontFamily: '"Libre Caslon Display", serif',
}

const introText = {
	color: '#c4c4c4', // Muted foreground
	fontSize: '14px',
	lineHeight: '1.6',
	margin: '0 0 24px 0',
}

const divider = {
	borderColor: 'rgba(212, 147, 168, 0.15)',
	margin: '24px 0',
}

const infoGrid = {
	marginBottom: '0',
}

const infoItem = {
	marginBottom: '20px',
}

const label = {
	color: '#D493A8', // Primary color
	fontSize: '11px',
	fontWeight: '600',
	textTransform: 'uppercase' as const,
	letterSpacing: '1px',
	margin: '0 0 6px 0',
}

const value = {
	color: '#f0f0f0',
	fontSize: '16px',
	lineHeight: '1.5',
	margin: '0',
}

const valueLink = {
	color: '#E9B5C6', // Accent color
	fontSize: '16px',
	lineHeight: '1.5',
	margin: '0',
	textDecoration: 'none',
}

const messageSection = {
	marginTop: '8px',
}

const messageBox = {
	backgroundColor: 'rgba(212, 147, 168, 0.08)', // Primary with low opacity
	borderLeft: '3px solid #D493A8', // Primary color accent
	borderRadius: '8px',
	padding: '20px',
	marginTop: '12px',
}

const messageText = {
	color: '#f0f0f0',
	fontSize: '15px',
	lineHeight: '1.7',
	margin: '0',
	whiteSpace: 'pre-wrap' as const,
}

const footer = {
	marginTop: '32px',
	paddingTop: '24px',
	borderTop: '1px solid rgba(212, 147, 168, 0.15)',
	textAlign: 'center' as const,
}

const footerText = {
	color: '#8a8a8a',
	fontSize: '12px',
	lineHeight: '1.6',
	margin: '0 0 12px 0',
}

const footerLinks = {
	color: '#8a8a8a',
	fontSize: '12px',
	margin: '0',
}

const footerLink = {
	color: '#D493A8',
	textDecoration: 'none',
}
