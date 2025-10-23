import Image from 'next/image'
import Link from 'next/link'
import { Blob2, Blob3, Blob4, Blob6, Blob8, Blob9 } from '@/components/blobs/blobs'
import { generateMentionsLegalesMetadata } from '@/lib/seo'

export const metadata = generateMentionsLegalesMetadata()

// ISR - Revalidate toutes les heures (même si contenu statique, pour cohérence)
export const revalidate = 3600

export default function MentionsLegalesPage() {
	return (
		<>
			{/* Hero Banner */}
			<div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
				{/* Background Image */}
				<Image
					src="/Maquilleuse_Professionnelle_Maeva-scaled.jpg"
					alt="Mentions Légales - Maeva Cinquin"
					fill
					className="object-cover grayscale brightness-75"
					priority
				/>

				{/* Blobs décoratifs dans le hero */}
				<div className="absolute left-10 top-20 z-10 animate-float-slow opacity-60 hidden md:block">
					<Blob2 />
				</div>
				<div className="absolute right-16 bottom-24 z-10 animate-float-medium delay-1000 opacity-70 hidden md:block">
					<Blob4 />
				</div>

				{/* Content Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-20" />

				{/* Title & Metadata */}
				<div className="absolute bottom-0 left-0 right-0 z-30 pb-8 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto">
						{/* Breadcrumb */}
						<nav className="mb-4">
							<ol className="flex items-center gap-2 text-sm text-muted-foreground">
								<li>
									<Link href="/" className="hover:text-foreground transition-colors">
										Accueil
									</Link>
								</li>
								<li>/</li>
								<li className="text-foreground">Mentions Légales</li>
							</ol>
						</nav>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground font-corinthia mb-4">
							Mentions Légales
						</h1>

						{/* Description */}
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
							Informations légales et protection des données personnelles
						</p>
					</div>
				</div>
			</div>

			{/* Main Content Section */}
			<div className="relative isolate bg-background">
				{/* Background Pattern SVG */}
				<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
					<svg
						aria-hidden="true"
						className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-primary/20"
					>
						<defs>
							<pattern x="50%" y={-1} id="legal-pattern" width={200} height={200} patternUnits="userSpaceOnUse">
								<path d="M100 200V.5M.5 .5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-primary/5">
							<path
								d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect fill="url(#legal-pattern)" width="100%" height="100%" strokeWidth={0} />
					</svg>
				</div>

				{/* Blobs décoratifs dans le contenu - Gauche */}
				<div className="absolute left-4 top-32 z-0 animate-float-slow delay-500 opacity-40 hidden lg:block">
					<Blob3 />
				</div>
				<div className="absolute left-8 top-96 z-0 animate-float-medium delay-1500 opacity-50 hidden lg:block">
					<Blob6 />
				</div>
				<div className="absolute left-12 top-[800px] z-0 animate-float-slow delay-2500 opacity-45 hidden lg:block">
					<Blob8 />
				</div>

				{/* Blobs décoratifs dans le contenu - Droite */}
				<div className="absolute right-8 top-64 z-0 animate-float-medium delay-1000 opacity-40 hidden lg:block">
					<Blob9 />
				</div>
				<div className="absolute right-4 top-[600px] z-0 animate-float-slow delay-2000 opacity-50 hidden lg:block">
					<Blob2 />
				</div>
				<div className="absolute right-10 top-[1000px] z-0 animate-float-medium delay-3000 opacity-45 hidden lg:block">
					<Blob4 />
				</div>

				{/* Main Content */}
				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative">
					<article className="max-w-4xl mx-auto prose prose-blog prose-lg max-w-none prose-headings:font-corinthia prose-h2:text-5xl prose-h3:text-4xl prose-h4:text-3xl prose-p:font-kalam">
						{/* Qui sommes-nous */}
						<section>
							<h2>Qui sommes-nous ?</h2>
							<p>L'adresse de notre site est : https://cinquin-maeva.com/</p>
						</section>

						{/* Propriétaire et responsable */}
						<section>
							<h2>Propriétaire et Responsable de publication</h2>
							<p>
								<strong>Maeva Cinquin</strong>
								<br />
								Maquilleuse professionnelle et prothésiste ongulaire
								<br />
								SIRET : 881 829 873 00010
								<br />
								1250 chemin de la renouillère
								<br />
								74140 Sciez
								<br />
								France
							</p>
							<p>
								<strong>Contact :</strong>
								<br />
								Téléphone :{' '}
								<a href="tel:+33616625137" className="text-primary hover:underline">
									+33 6 16 62 51 37
								</a>
								<br />
								Email :{' '}
								<a href="mailto:maevacinquin1@gmail.com" className="text-primary hover:underline">
									maevacinquin1@gmail.com
								</a>
							</p>
						</section>

						{/* Hébergement */}
						<section>
							<h2>Hébergement du site</h2>
							<p>
								Ce site est hébergé par :
								<br />
								<strong>netcup GmbH</strong>
								<br />
								Daimlerstraße 25
								<br />
								76185 Karlsruhe
								<br />
								Allemagne
							</p>
						</section>

						{/* Droit d'auteur */}
						<section>
							<h2>Droit d'auteur et propriété intellectuelle</h2>
							<p>
								L'ensemble de ce site est soumis à une protection de droits d'auteur selon les Articles L335-2 et
								suivants du Code de la propriété intellectuelle.
							</p>
							<p>
								Toute reproduction ou représentation totale ou partielle de son contenu, images, textes, sons, par
								quelque procédé utilisé, sans l'autorisation préalable de la société 'Cinquin Andy' ou celle de 'Artist
								Make Up Dream – Maeva Cinquin', est strictement interdite.
							</p>
							<p>
								Toute violation constituera une sanction et fera l'objet de poursuites conformément aux dispositions des
								articles L.335-2 et suivants du Code de Propriété Intellectuelle.
							</p>
						</section>

						{/* Crédits */}
						<section>
							<h2>Crédits et conception du site</h2>
							<p>
								<strong>Conception, développement et design :</strong>
								<br />
								Cinquin Andy
								<br />
								SIRET : 880 505 276 00027
								<br />4 Impasse de la Marchaisière
								<br />
								44115 Haute-Goulaine
								<br />
								Téléphone : 06 21 58 26 84
								<br />
								Site web :{' '}
								<a href="https://andy-cinquin.fr" target="_blank" rel="noopener noreferrer">
									https://andy-cinquin.fr
								</a>
							</p>
							<p>
								Les photographies présentes sur ce site sont la propriété de Maeva Cinquin et Cinquin Andy. Toute
								utilisation sans autorisation est interdite et pourra faire l'objet de poursuites.
							</p>
						</section>

						{/* Droit applicable */}
						<section>
							<h2>Droit applicable</h2>
							<p>
								Le présent site et les présentes mentions légales sont régis par le droit français. En cas de litige,
								une solution amiable sera recherchée avant toute action judiciaire. Il est fait attribution exclusive de
								juridiction aux tribunaux compétents de France.
							</p>
						</section>
					</article>

					{/* Back to Home */}
					<div className="mt-12 pt-8 border-t border-border max-w-4xl mx-auto">
						<Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
							← Retour à l'accueil
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
