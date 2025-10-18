import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'

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
					<Heading style={h1}>Nouvelle demande de contact</Heading>

					<Section style={section}>
						<Text style={label}>Nom :</Text>
						<Text style={value}>{name}</Text>
					</Section>

					<Section style={section}>
						<Text style={label}>Email :</Text>
						<Text style={value}>{email}</Text>
					</Section>

					<Section style={section}>
						<Text style={label}>Téléphone :</Text>
						<Text style={value}>{phone}</Text>
					</Section>

					{address && (
						<Section style={section}>
							<Text style={label}>Adresse :</Text>
							<Text style={value}>{address}</Text>
						</Section>
					)}

					{city && (
						<Section style={section}>
							<Text style={label}>Ville :</Text>
							<Text style={value}>{city}</Text>
						</Section>
					)}

					{postalCode && (
						<Section style={section}>
							<Text style={label}>Code postal :</Text>
							<Text style={value}>{postalCode}</Text>
						</Section>
					)}

					<Section style={section}>
						<Text style={label}>Message :</Text>
						<Text style={messageStyle}>{message}</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

export default ContactFormEmail

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	padding: '20px 0 48px',
	marginBottom: '64px',
	maxWidth: '600px',
}

const h1 = {
	color: '#333',
	fontSize: '24px',
	fontWeight: 'bold',
	margin: '40px 0',
	padding: '0 40px',
}

const section = {
	padding: '0 40px',
	marginBottom: '16px',
}

const label = {
	color: '#666',
	fontSize: '12px',
	fontWeight: 'bold',
	textTransform: 'uppercase' as const,
	margin: '0 0 4px',
}

const value = {
	color: '#333',
	fontSize: '16px',
	margin: '0 0 8px',
}

const messageStyle = {
	color: '#333',
	fontSize: '16px',
	lineHeight: '24px',
	margin: '0',
	whiteSpace: 'pre-wrap' as const,
}
