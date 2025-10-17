import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'

interface ContactFormEmailProps {
	name: string
	email: string
	phone: string
	address?: string
	city?: string
	postalCode?: string
	message: string
	gardenSize?: string
}

export const ContactFormEmail = ({
	name = 'Jean Dupont',
	email = 'jean.dupont@email.com',
	phone = '06 12 34 56 78',
	address,
	city,
	postalCode,
	message = 'Message de test',
	gardenSize,
}: ContactFormEmailProps) => {
	const previewText = `Nouvelle demande de contact de ${name}`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header avec logo/nom */}
					<Section style={header}>
						<Heading style={headerTitle}>Nature Paysage Laheux</Heading>
						<Text style={headerSubtitle}>Éco-Paysagiste</Text>
					</Section>

					{/* Badge "Nouvelle demande" */}
					<Section style={badgeSection}>
						<div style={badge}>
							<span style={badgeText}>✉️ Nouvelle demande de contact</span>
						</div>
					</Section>

					{/* Contenu principal */}
					<Section style={content}>
						<Heading style={title}>Demande de {name}</Heading>

						{/* Informations de contact */}
						<Section style={infoSection}>
							<div style={infoRow}>
								<span style={infoLabel}>👤 Nom complet</span>
								<Text style={infoValue}>{name}</Text>
							</div>

							<div style={infoRow}>
								<span style={infoLabel}>📧 Email</span>
								<Text style={infoValue}>
									<a href={`mailto:${email}`} style={link}>
										{email}
									</a>
								</Text>
							</div>

							<div style={infoRow}>
								<span style={infoLabel}>📱 Téléphone</span>
								<Text style={infoValue}>
									<a href={`tel:${phone.replace(/\s/g, '')}`} style={link}>
										{phone}
									</a>
								</Text>
							</div>

							{address && (
								<div style={infoRow}>
									<span style={infoLabel}>📍 Adresse du jardin</span>
									<Text style={infoValue}>
										{address}
										{city && postalCode && (
											<>
												<br />
												{postalCode} {city}
											</>
										)}
									</Text>
								</div>
							)}

							{gardenSize && (
								<div style={infoRow}>
									<span style={infoLabel}>🌿 Surface du jardin</span>
									<Text style={infoValue}>{gardenSize}</Text>
								</div>
							)}
						</Section>

						<Hr style={divider} />

						{/* Message */}
						<Section style={messageSection}>
							<Text style={messageLabel}>💬 Message</Text>
							<div style={messageBox}>
								<Text style={messageText}>{message}</Text>
							</div>
						</Section>

						{/* Call to action */}
						<Section style={ctaSection}>
							<table style={ctaTable}>
								<tr>
									<td style={ctaCell}>
										<a href={`mailto:${email}`} style={ctaButton}>
											Répondre par email
										</a>
									</td>
									<td style={ctaCell}>
										<a href={`tel:${phone.replace(/\s/g, '')}`} style={ctaButtonSecondary}>
											Appeler
										</a>
									</td>
								</tr>
							</table>
						</Section>
					</Section>

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Ce message a été envoyé depuis le formulaire de contact de votre site web
							<br />
							Nature Paysage Laheux - Éco-Paysagiste
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

export default ContactFormEmail

// Charte graphique: #000000, #344E41, #90A955, #ADC178, #DB222A
const colors = {
	primary: '#90A955', // Vert moyen
	secondary: '#ADC178', // Vert clair
	accent: '#344E41', // Vert foncé
	destructive: '#DB222A', // Rouge coquelicot
	background: '#FAFAF8',
	foreground: '#1A1A1A',
	border: '#E5E5E2',
	muted: '#F5F5F2',
}

const main = {
	backgroundColor: colors.background,
	fontFamily: 'Georgia, "Times New Roman", serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
	margin: '0 auto',
	padding: '40px 20px',
	maxWidth: '600px',
}

const header = {
	textAlign: 'center' as const,
	padding: '32px 20px',
	backgroundColor: colors.accent,
	borderRadius: '12px 12px 0 0',
}

const headerTitle = {
	color: '#FFFFFF',
	fontSize: '32px',
	fontWeight: '700',
	margin: '0 0 8px 0',
	fontFamily: 'Georgia, "Times New Roman", serif',
	letterSpacing: '0.01em',
}

const headerSubtitle = {
	color: colors.secondary,
	fontSize: '16px',
	fontWeight: '400',
	margin: '0',
	letterSpacing: '0.05em',
	textTransform: 'uppercase' as const,
}

const badgeSection = {
	textAlign: 'center' as const,
	padding: '20px 0 0 0',
	marginBottom: '24px',
}

const badge = {
	display: 'inline-block',
	backgroundColor: colors.primary,
	padding: '8px 20px',
	borderRadius: '20px',
}

const badgeText = {
	color: '#FFFFFF',
	fontSize: '14px',
	fontWeight: '600',
	margin: '0',
}

const content = {
	backgroundColor: '#FFFFFF',
	padding: '40px 32px',
	borderRadius: '0 0 12px 12px',
	border: `1px solid ${colors.border}`,
	borderTop: 'none',
}

const title = {
	color: colors.accent,
	fontSize: '24px',
	fontWeight: '600',
	margin: '0 0 24px 0',
	fontFamily: 'Georgia, "Times New Roman", serif',
}

const infoSection = {
	marginBottom: '24px',
}

const infoRow = {
	marginBottom: '16px',
}

const infoLabel = {
	display: 'block',
	color: colors.primary,
	fontSize: '12px',
	fontWeight: '700',
	textTransform: 'uppercase' as const,
	letterSpacing: '0.05em',
	marginBottom: '4px',
}

const infoValue = {
	color: colors.foreground,
	fontSize: '16px',
	margin: '0',
	lineHeight: '1.5',
}

const link = {
	color: colors.primary,
	textDecoration: 'underline',
}

const divider = {
	borderColor: colors.border,
	margin: '24px 0',
}

const messageSection = {
	marginBottom: '32px',
}

const messageLabel = {
	color: colors.primary,
	fontSize: '12px',
	fontWeight: '700',
	textTransform: 'uppercase' as const,
	letterSpacing: '0.05em',
	marginBottom: '8px',
}

const messageBox = {
	backgroundColor: colors.muted,
	padding: '20px',
	borderRadius: '8px',
	borderLeft: `4px solid ${colors.primary}`,
}

const messageText = {
	color: colors.foreground,
	fontSize: '15px',
	lineHeight: '1.6',
	margin: '0',
	whiteSpace: 'pre-wrap' as const,
}

const ctaSection = {
	marginTop: '32px',
	textAlign: 'center' as const,
}

const ctaTable = {
	width: '100%',
	borderCollapse: 'collapse' as const,
}

const ctaCell = {
	padding: '0 8px',
}

const ctaButton = {
	display: 'inline-block',
	backgroundColor: colors.primary,
	color: '#FFFFFF',
	fontSize: '16px',
	fontWeight: '600',
	textDecoration: 'none',
	padding: '14px 28px',
	borderRadius: '8px',
	textAlign: 'center' as const,
	width: '100%',
	boxSizing: 'border-box' as const,
}

const ctaButtonSecondary = {
	display: 'inline-block',
	backgroundColor: '#FFFFFF',
	color: colors.primary,
	fontSize: '16px',
	fontWeight: '600',
	textDecoration: 'none',
	padding: '14px 28px',
	borderRadius: '8px',
	textAlign: 'center' as const,
	border: `2px solid ${colors.primary}`,
	width: '100%',
	boxSizing: 'border-box' as const,
}

const footer = {
	textAlign: 'center' as const,
	padding: '32px 20px 0 20px',
}

const footerText = {
	color: '#6B6B6B',
	fontSize: '13px',
	lineHeight: '1.6',
	margin: '0 0 12px 0',
}
