import Link from 'next/link'

export async function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-muted/30 border-t">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
					{/* Column 1: About */}
					<div className="space-y-4">a</div>

					{/* Column 2: Quick Links */}
					<div className="space-y-4">b</div>

					{/* Column 3: Services */}
					<div className="space-y-4">c</div>

					{/* Column 4: Recent Projects */}
					<div className="space-y-4">d</div>

					{/* Column 5: Contact */}
					<div className="space-y-4">e</div>
				</div>

				{/* <Separator className="my-8" /> */}

				{/* Bottom section */}
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
					<p>© {currentYear} Cinquin Maeva - Tous droits réservés</p>
					<p>
						Developed & Designed with ❤️ by{' '}
						<Link
							href="https://andy-cinquin.fr"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition-colors underline"
						>
							Andy Cinquin
						</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}
