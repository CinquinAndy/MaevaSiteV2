import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type React from 'react'
import { FadeIn, FadeInWhenVisible, ScaleIn, SlideInFromBottom } from '@/components/animations'
import { Blob2, Blob3, Blob4, Blob6, Blob8, Blob9 } from '@/components/blobs/blobs'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
	title: "Guide d'Utilisation - Maeva Cinquin CMS",
	description:
		"Apprends à gérer ton site avec Payload CMS : créer des articles, optimiser le SEO, utiliser l'IA Gemini et gérer tes médias.",
}

export default async function Page(): Promise<React.JSX.Element> {
	// Verify Payload auth by checking session cookie
	const cookieStore = await cookies()

	// Check if Payload session cookie exists
	const payloadToken = cookieStore.get('payload-token')

	// If no session cookie, redirect to admin (which shows login if not authenticated)
	if (!payloadToken || !payloadToken.value) {
		redirect('/admin')
	}

	const publishedDate = new Date().toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<>
			{/* Hero Banner */}
			<FadeIn>
				<div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
					{/* Background gradient */}
					<div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/30 to-accent/20" />

					{/* Blobs décoratifs dans le hero */}
					<div className="absolute left-10 top-20 z-10 animate-float-slow opacity-60 hidden md:block">
						<Blob2 />
					</div>
					<div className="absolute right-16 bottom-24 z-10 animate-float-medium delay-1000 opacity-70 hidden md:block">
						<Blob4 />
					</div>

					{/* Content Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/40 to-transparent z-20" />

					{/* Title & Metadata */}
					<div className="absolute bottom-0 left-0 right-0 z-30 pb-8 px-6 lg:px-12">
						<div className="max-w-7xl mx-auto">
							{/* Breadcrumb */}
							<SlideInFromBottom delay={0.2}>
								<nav className="mb-4">
									<ol className="flex items-center gap-2 text-sm text-muted-foreground">
										<li>
											<Link href="/" className="hover:text-foreground transition-colors">
												Accueil
											</Link>
										</li>
										<li>/</li>
										<li>
											<Link href="/admin" className="hover:text-foreground transition-colors">
												Admin
											</Link>
										</li>
										<li>/</li>
										<li className="text-foreground">Guide d'Utilisation</li>
									</ol>
								</nav>
							</SlideInFromBottom>

							{/* Category & Date */}
							<ScaleIn delay={0.3}>
								<div className="flex flex-wrap items-center gap-3 mb-4">
									<Badge variant="primary">Documentation CMS</Badge>
									<time className="text-sm text-muted-foreground">{publishedDate}</time>
								</div>
							</ScaleIn>

							{/* Title */}
							<SlideInFromBottom delay={0.4}>
								<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground font-corinthia mb-4">
									Guide d'Utilisation du Site
								</h1>
							</SlideInFromBottom>

							{/* Excerpt */}
							<FadeInWhenVisible>
								<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
									Apprends à gérer ton site : créer des articles de blog, optimiser le référencement, et gérer les
									photos etc.
								</p>
							</FadeInWhenVisible>
						</div>
					</div>
				</div>
			</FadeIn>

			{/* Article Content Section */}
			<div className="relative isolate bg-background">
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

				{/* Main Grid Layout */}
				<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 relative ">
					<div>
						<article className="prose prose-blog prose-lg max-w-none **:font-kalam prose-h2:text-5xl prose-h3:text-4xl prose-h4:text-3xl prose-p:font-kalam prose-img:rounded-xl prose-img:shadow-lg">
							<h2>📖 Table des matières</h2>
							<ol>
								<li>
									<a href="#concepts-importants">Concepts Importants</a>
								</li>
								<li>
									<a href="#connexion">Connexion à Payload</a>
								</li>
								<li>
									<a href="#blog">Gestion du Blog</a>
								</li>
								<li>
									<a href="#medias">Médias (Images)</a>
								</li>
								<li>
									<a href="#services">Services & Prestations</a>
								</li>
								<li>
									<a href="#galerie">Galerie Photos</a>
								</li>
								<li>
									<a href="#temoignages">Témoignages Clients</a>
								</li>
								<li>
									<a href="#bonnes-pratiques">Astuces et Bonnes Pratiques</a>
								</li>
							</ol>

							<hr />

							<h2 id="concepts-importants">Concepts Importants</h2>

							<h3>🎯 Qu'est-ce que le SEO ?</h3>
							<p>
								<strong>SEO</strong> signifie "Search Engine Optimization" (Optimisation pour les Moteurs de Recherche).
							</p>
							<p>
								<strong>En simple :</strong> C'est ce qui permet de rendre ton site visible sur Google.
							</p>
							<p>Deux éléments clés :</p>
							<ul>
								<li>
									<strong>Titre SEO :</strong> Le titre qui apparaît dans les résultats Google{' '}
									<strong>(maximum 60 caractères)</strong>
								</li>
								<li>
									<strong>Description SEO :</strong> Le texte sous le titre dans Google{' '}
									<strong>(maximum 155 caractères)</strong>
								</li>
							</ul>

							<p>
								<strong>Exemple :</strong>
							</p>
							<pre>
								<code>
									{`Titre : Maquilleuse Professionnelle Bordeaux | Maeva Cinquin
Description : Maquilleuse pro à Bordeaux. Mariages, shooting photo, événements. 
15 ans d'expérience. Devis gratuit.`}
								</code>
							</pre>

							<hr />

							<h3>🖼️ Qu'est-ce que l'Alt Text (Texte Alternatif) ?</h3>
							<p>
								<strong>Alt Text</strong> est une description textuelle d'une image.
							</p>
							<p>
								<strong>Pourquoi c'est important ?</strong>
							</p>
							<ol>
								<li>
									<strong>Accessibilité :</strong> Les personnes malvoyantes utilisent des lecteurs d'écran qui lisent
									cette description
								</li>
								<li>
									<strong>SEO :</strong> Google ne "voit" pas les images, il lit l'alt text pour comprendre ce qu'elles
									représentent
								</li>
							</ol>

							<p>
								<strong>Bon exemple :</strong>
							</p>
							<ul>
								<li>❌ Mauvais : "image1.jpg" ou "photo"</li>
								<li>✅ Bon : "Maquillage artistique de mariée avec fard à paupières doré et gloss nude à Bordeaux"</li>
							</ul>

							<hr />

							<h3>🤖 Les Outils IA de l'Application</h3>

							<h4>Forvoyez - Génération automatique d'Alt Text</h4>
							<p>
								<strong>Qu'est-ce que c'est ?</strong>
							</p>
							<p>
								Forvoyez est un service (écrit pas Bré & moi) d'intelligence artificielle qui analyse tes images et
								génère automatiquement une description en français.
							</p>

							<p>
								<strong>Comment l'utiliser ?</strong>
							</p>
							<ol>
								<li>Télécharge ton image dans la bibliothèque Médias</li>
								<li>
									Clique sur le bouton <strong>"✨ Générer alt text"</strong>
								</li>
								<li>Attends quelques secondes</li>
								<li>L'IA génère une description automatique</li>
								<li>
									<strong>Important :</strong> Vérifie toujours le résultat et ajuste si nécessaire
								</li>
							</ol>

							<p>
								<strong>Note :</strong> La génération d'alt text se lance automatiquement en arrière-plan lors du
								téléchargement. Si après 10 minutes tu n'as toujours rien, tu peux réessayer manuellement ou remplir le
								champ toi-même.
							</p>

							<hr />

							<h4>Gemini - Génération automatique de SEO</h4>
							<p>
								<strong>Qu'est-ce que c'est ?</strong>
							</p>
							<p>
								Gemini est l'IA de Google, utilisée ici pour générer automatiquement les titres et descriptions SEO.
							</p>

							<p>
								<strong>Comment l'utiliser ?</strong>
							</p>
							<ol>
								<li>Ouvre n'importe quel article de blog, service ou galerie dans Payload</li>
								<li>
									Cherchez le bouton <strong>"🤖 Générer SEO avec Gemini"</strong> (en haut de la section SEO)
								</li>
								<li>Clique dessus</li>
								<li>
									L'IA analyse le contenu de ta page et génère :
									<ul>
										<li>Un titre SEO optimisé (max 60 caractères)</li>
										<li>Une description SEO optimisée (max 155 caractères)</li>
									</ul>
								</li>
								<li>
									<strong>Important :</strong> Vérifie et personnalise si besoin
								</li>
							</ol>

							<p>
								<strong>
									Gemini et Forvoyez t'évitent de te prendre la tête avec le côté "SEO" du site - tout est automatique
									et simple !
								</strong>
							</p>

							<hr />

							<h2 id="connexion">Connexion à Payload</h2>

							<h3>🔐 Accéder à l'interface d'administration</h3>
							<p>
								<strong>URL :</strong>
							</p>
							<pre>
								<code>https://cinquin-maeva.com/admin</code>
							</pre>

							<h3>📝 Connexion</h3>
							<ol>
								<li>Ouvre l'URL d'administration dans ton navigateur</li>
								<li>Tu verras un écran de connexion</li>
								<li>
									Entre ton <strong>email</strong> et ton <strong>mot de passe</strong>
								</li>
								<li>
									Clique sur <strong>"Se connecter"</strong>
								</li>
							</ol>

							<h3>🗂️ Interface principale</h3>
							<p>Une fois connecté, tu verras le tableau de bord avec :</p>
							<ul>
								<li>
									<strong>Collections</strong> (à gauche) : Blog, Médias, Services, Galerie, Témoignages, Utilisateurs
								</li>
								<li>
									<strong>Dashboard :</strong> Vue d'ensemble avec statistiques Umami et accès rapide aux tutoriels
								</li>
							</ul>

							<p>
								<strong>Qu'est-ce qu'une Collection ?</strong>
							</p>
							<p>
								Une collection est une liste d'éléments multiples : plusieurs articles de blog, plusieurs images,
								plusieurs services, etc.
							</p>

							<hr />

							<h2 id="blog">Gestion du Blog</h2>
							<p>
								<strong>Où le trouver ?</strong>
							</p>
							<p>
								Menu de gauche → <strong>Collections</strong> → <strong>Blog</strong>
							</p>

							<h3>Créer un nouvel article</h3>
							<ol>
								<li>
									Clique sur <strong>"Create New"</strong> (en haut à droite)
								</li>
								<li>Remplis tous les champs (voir ci-dessous)</li>
								<li>
									Clique sur <strong>"Save"</strong> en haut à droite
								</li>
							</ol>

							<hr />

							<h3>Champs d'un article de blog</h3>

							<h4>Titre de l'article</h4>
							<ul>
								<li>Le titre principal de ton article</li>
								<li>
									<strong>Exemple :</strong> "Comment réussir un maquillage de mariée naturel"
								</li>
								<li>Doit être accrocheur et descriptif</li>
							</ul>

							<h4>Identifiant URL (slug)</h4>
							<ul>
								<li>Utilisé dans l'adresse web</li>
								<li>
									<strong>Règles :</strong> Lettres minuscules, chiffres, tirets uniquement
								</li>
								<li>
									<strong>Exemple :</strong> <code>maquillage-mariee-naturel</code>
								</li>
								<li>
									<strong>URL résultante :</strong>{' '}
									<code>https://cinquin-maeva.com/blog/maquillage-mariee-naturel</code>
								</li>
								<li>
									<strong>Important :</strong> Ne modifiez pas le slug après la création, car cela casserait les liens
									existants
								</li>
							</ul>

							<h4>Extrait (Excerpt)</h4>
							<ul>
								<li>Résumé court de l'article (2-3 phrases maximum)</li>
								<li>Apparaît dans les listes d'articles et sur les réseaux sociaux</li>
								<li>Doit donner envie de lire l'article complet</li>
								<li>
									<strong>Exemple :</strong> "Découvre mes conseils pour un maquillage de mariée qui sublimera ta beauté
									naturelle. Technique, produits et astuces d'une pro."
								</li>
							</ul>

							<h4>Image principale (Featured Image)</h4>
							<ul>
								<li>L'image qui représente ton article</li>
								<li>Apparaît en haut de l'article et dans les listes</li>
								<li>
									<strong>Recommandation :</strong> Photo de haute qualité (1920x1080 minimum)
								</li>
								<li>Doit illustrer le sujet de l'article</li>
							</ul>

							<h4>Catégorie</h4>
							<p>Choisis parmi :</p>
							<ul>
								<li>
									<strong>Conseils Maquillage :</strong> Tutoriels et astuces beauté
								</li>
								<li>
									<strong>Nail Art :</strong> Articles sur les ongles et manucure
								</li>
								<li>
									<strong>Tutoriels :</strong> Guides pas-à-pas détaillés
								</li>
								<li>
									<strong>Actualités :</strong> Nouveautés, événements, annonces
								</li>
								<li>
									<strong>Collections :</strong> Présentation de collections de produits
								</li>
								<li>
									<strong>Mariages & Événements :</strong> Conseils spécifiques pour les mariages
								</li>
							</ul>

							<h4>Contenu de l'article</h4>
							<p>C'est ici que tu rédiges ton article avec l'éditeur de texte enrichi. Tu peux utiliser :</p>
							<ul>
								<li>
									<strong>Titres (H2, H3, H4) :</strong> Structure ton contenu
								</li>
								<li>
									<strong>Gras & Italique :</strong> Mets en avant les points importants
								</li>
								<li>
									<strong>Listes :</strong> À puces ou numérotées
								</li>
								<li>
									<strong>Liens :</strong> Ajoute des liens internes ou externes
								</li>
								<li>
									<strong>Images :</strong> Insère des photos dans ton contenu
								</li>
								<li>
									<strong>Citations :</strong> Mets en avant des phrases clés
								</li>
							</ul>

							<p>
								<strong>Astuce :</strong> Structure ton article avec des titres clairs pour faciliter la lecture.
							</p>

							<h4>Statut</h4>
							<p>Deux options :</p>
							<ul>
								<li>
									<strong>Draft (Brouillon) :</strong> L'article n'est pas publié, toi seul peux le voir
								</li>
								<li>
									<strong>Published (Publié) :</strong> L'article est visible par tous sur le site
								</li>
							</ul>
							<p>
								<strong>Conseil :</strong> Travaille en mode Draft, puis publie quand tu es satisfait du résultat.
							</p>

							<h4>Date de publication</h4>
							<ul>
								<li>Date à laquelle l'article sera considéré comme publié</li>
								<li>Par défaut : aujourd'hui</li>
								<li>Tu peux planifier une publication future en choisissant une date ultérieure</li>
							</ul>

							<hr />

							<h3>SEO d'un article de blog</h3>

							<h4>Méthode automatique (recommandée)</h4>
							<ol>
								<li>Remplis d'abord le titre, l'extrait et le contenu de l'article</li>
								<li>
									Clique sur <strong>"🤖 Générer SEO avec Gemini"</strong>
								</li>
								<li>L'IA analyse ton article et génère un SEO optimisé</li>
								<li>Vérifie et ajuste si besoin</li>
							</ol>

							<h4>Méthode manuelle</h4>
							<ul>
								<li>
									<strong>Titre SEO :</strong> Ex: "Maquillage de Mariée Naturel : Guide Complet 2024 | Maeva Cinquin"
								</li>
								<li>
									<strong>Description SEO :</strong> Ex: "Apprenez à créer un maquillage de mariée naturel et lumineux.
									Techniques pro, produits recommandés et astuces d'une maquilleuse expérimentée."
								</li>
							</ul>

							<p>
								<strong>Conseil :</strong> Gemini est parfait pour le SEO. Utilise-le, puis personnalise selon ton style
								si besoin.
							</p>

							<hr />

							<h3>Modifier un article existant</h3>
							<ol>
								<li>
									Allez dans <strong>Collections</strong> → <strong>Blog</strong>
								</li>
								<li>Clique sur l'article à modifier</li>
								<li>Modifiez les champs nécessaires</li>
								<li>
									Clique sur <strong>"Save"</strong>
								</li>
							</ol>

							<hr />

							<h3>Supprimer un article</h3>
							<ol>
								<li>
									Allez dans <strong>Collections</strong> → <strong>Blog</strong>
								</li>
								<li>Cochez la case à côté de l'article à supprimer</li>
								<li>
									Clique sur <strong>"Delete"</strong> en haut
								</li>
								<li>Confirmez la suppression</li>
							</ol>
							<p>
								<strong>Attention :</strong> La suppression est définitive. Assure-toi de ne plus avoir besoin de cet
								article.
							</p>

							<hr />

							<h2 id="medias">Médias (Images)</h2>
							<p>
								<strong>Où les trouver ?</strong>
							</p>
							<p>
								Menu de gauche → <strong>Collections</strong> → <strong>Media</strong>
							</p>
							<p>La bibliothèque de médias stocke toutes tes images utilisées sur le site.</p>

							<hr />

							<h3>Télécharger une nouvelle image</h3>
							<ol>
								<li>
									Clique sur <strong>"Upload New"</strong>
								</li>
								<li>Sélectionne ton image (ou glisse-dépose)</li>
								<li>Attends le téléchargement</li>
							</ol>
							<p>
								<strong>Formats acceptés :</strong> JPG, PNG, WebP
							</p>
							<p>
								<strong>Taille recommandée :</strong> Maximum 5 Mo par image (compressez tes images avant si nécessaire)
							</p>

							<hr />

							<h3>Gérer une image</h3>
							<p>Une fois l'image téléchargée, tu peux :</p>

							<h4>Modifier l'Alt Text</h4>
							<p>
								<strong>Méthode automatique (avec Forvoyez) :</strong>
							</p>
							<ol>
								<li>Ouvre l'image dans la bibliothèque</li>
								<li>
									Clique sur <strong>"✨ Générer alt text"</strong>
								</li>
								<li>Attends quelques secondes</li>
								<li>L'IA analyse l'image et génère une description</li>
								<li>
									<strong>Vérifie le résultat</strong> et ajuste si nécessaire
								</li>
								<li>
									Clique sur <strong>"Save"</strong>
								</li>
							</ol>

							<p>
								<strong>Note importante :</strong> Lors de l'envoi de l'image, la génération automatique d'alt text se
								lance en arrière-plan. Si après 10 minutes et un rafraîchissement de page (F5) tu n'as toujours rien
								dans le champ "alt", tu peux le remplir à la main ou réessayer avec le bouton Forvoyez.
							</p>

							<p>
								<strong>Méthode manuelle :</strong>
							</p>
							<ol>
								<li>Ouvre l'image</li>
								<li>
									Remplis le champ <strong>"Alt Text"</strong>
								</li>
								<li>
									Clique sur <strong>"Save"</strong>
								</li>
							</ol>

							<h4>Renommer l'image</h4>
							<ul>
								<li>Tu peux changer le nom du fichier pour mieux l'organiser</li>
								<li>
									<strong>Conseil :</strong> Utilise des noms descriptifs (ex:{' '}
									<code>maquillage-mariee-bordeaux.jpg</code> au lieu de <code>IMG_1234.jpg</code>)
								</li>
							</ul>

							<hr />

							<h3>Bonnes pratiques pour les images</h3>

							<h4>Avant de télécharger</h4>
							<ol>
								<li>
									<strong>Optimise la taille :</strong> Si ta photo fait 10 Mo, compresse-la avant avec un outil en
									ligne gratuit comme{' '}
									<a href="https://tinypng.com/" target="_blank" rel="noopener noreferrer">
										TinyPNG
									</a>{' '}
									(ça économise de la place sur nos serveurs !)
								</li>
								<li>
									<strong>Nomme correctement :</strong> Utilise des noms clairs (ex:{' '}
									<code>maquillage-naturel-mariee.jpg</code>)
								</li>
								<li>
									<strong>Vérifie la qualité :</strong> L'image doit être nette et bien cadrée
								</li>
								<li>
									<strong>Désactive les filigranes :</strong> Si tu prends des photos avec ton téléphone, désactive les
									filigranes automatiques (ex: "Shot on Redmi") dans les paramètres de l'appareil photo
								</li>
							</ol>

							<h4>Après téléchargement</h4>
							<ol>
								<li>
									<strong>Ajoute toujours un Alt Text :</strong> Soit avec Forvoyez, soit manuellement
								</li>
								<li>
									<strong>Soyez descriptif :</strong> "Maquillage artistique de mariée avec smokey eyes et lèvres nude à
									Bordeaux" plutôt que "maquillage"
								</li>
								<li>
									<strong>Ajoute le lieu si pertinent :</strong> Aide le référencement local
								</li>
							</ol>

							<hr />

							<h3>Génération d'Alt Text en masse</h3>
							<p>Dans la collection Media, tu peux générer l'alt text pour plusieurs images à la fois :</p>
							<ol>
								<li>Coche les cases des images concernées</li>
								<li>
									Clique sur le bouton <strong>"Bulk Alt Text"</strong> en haut
								</li>
								<li>Attends que toutes les descriptions soient générées</li>
								<li>Vérifie et ajuste individuellement si besoin</li>
							</ol>
							<p>
								<strong>Astuce :</strong> Pratique quand tu télécharges beaucoup d'images d'un coup !
							</p>

							<hr />

							<h3>Supprimer une image</h3>
							<p>
								<strong>Attention :</strong> Si tu supprimes une image utilisée quelque part sur le site, elle
								disparaîtra de cette page.
							</p>
							<ol>
								<li>Coche la case à côté de l'image</li>
								<li>
									Clique sur <strong>"Delete"</strong>
								</li>
								<li>Confirmez</li>
							</ol>
							<p>
								<strong>Avant de supprimer :</strong> Vérifie que l'image n'est utilisée nulle part (articles de blog,
								services, galerie, etc.).
							</p>

							<hr />

							<h2 id="services">Services & Prestations</h2>
							<p>
								<strong>Où les trouver ?</strong>
							</p>
							<p>
								Menu de gauche → <strong>Collections</strong> → <strong>Services</strong>
							</p>
							<p>Les services sont tes prestations professionnelles : maquillage de mariée, shooting, etc.</p>

							<hr />

							<h3>Créer un nouveau service</h3>
							<ol>
								<li>
									Clique sur <strong>"Create New"</strong>
								</li>
								<li>Remplis tous les champs</li>
								<li>
									Clique sur <strong>"Save"</strong>
								</li>
							</ol>

							<hr />

							<h3>Champs d'un service</h3>

							<h4>Titre du service</h4>
							<ul>
								<li>Le nom de ta prestation</li>
								<li>
									<strong>Exemple :</strong> "Maquillage de Mariée"
								</li>
							</ul>

							<h4>Identifiant URL (slug)</h4>
							<ul>
								<li>
									<strong>Exemple :</strong> <code>maquillage-mariee</code>
								</li>
								<li>
									<strong>URL résultante :</strong> <code>https://cinquin-maeva.com/prestations/maquillage-mariee</code>
								</li>
								<li>
									<strong>Important :</strong> Ne modifie pas après création
								</li>
							</ul>

							<h4>Description courte (Short Description)</h4>
							<ul>
								<li>2-3 phrases maximum</li>
								<li>Utilisée dans les cartes d'aperçu</li>
								<li>Doit donner envie d'en savoir plus</li>
								<li>
									<strong>Exemple :</strong> "Un maquillage de mariée élégant et naturel qui sublimera ta beauté le jour
									J. Essai maquillage offert."
								</li>
							</ul>

							<h4>Description complète</h4>
							<ul>
								<li>Texte enrichi avec mise en forme</li>
								<li>Décris le service en détail</li>
								<li>Inclue les tarifs, durée, ce qui est inclus</li>
								<li>Tu es libre d'organiser cette section comme tu le souhaites</li>
							</ul>

							<h4>Image principale</h4>
							<ul>
								<li>Photo représentant ce service</li>
								<li>Apparaît dans les cartes et en haut de la page du service</li>
								<li>
									<strong>Recommandation :</strong> Photo professionnelle montrant le résultat du service
								</li>
							</ul>

							<h4>Catégorie</h4>
							<p>Choisis parmi :</p>
							<ul>
								<li>
									<strong>Maquillage :</strong> Tous les services de maquillage
								</li>
								<li>
									<strong>Coiffure :</strong> Services de coiffure
								</li>
								<li>
									<strong>Ongles :</strong> Manucure, nail art
								</li>
								<li>
									<strong>Formation :</strong> Cours et ateliers
								</li>
							</ul>

							<hr />

							<h3>SEO d'un service</h3>
							<ol>
								<li>Remplis tous les champs du service</li>
								<li>
									Clique sur <strong>"🤖 Générer SEO avec Gemini"</strong>
								</li>
								<li>Vérifie et ajuste</li>
								<li>Save</li>
							</ol>

							<hr />

							<h2 id="galerie">Galerie Photos</h2>
							<p>
								<strong>Où la trouver ?</strong>
							</p>
							<p>
								Menu de gauche → <strong>Collections</strong> → <strong>Galery</strong>
							</p>
							<p>La galerie permet de créer des albums photo de tes réalisations.</p>

							<hr />

							<h3>Créer un nouvel album</h3>
							<ol>
								<li>
									Clique sur <strong>"Create New"</strong>
								</li>
								<li>Donnez un titre à l'album</li>
								<li>Ajoute une description</li>
								<li>Sélectionnez une catégorie</li>
								<li>Téléchargez ou sélectionnez des images</li>
								<li>
									Clique sur <strong>"Save"</strong>
								</li>
							</ol>

							<hr />

							<h3>Champs d'un album galerie</h3>

							<h4>Titre de l'album</h4>
							<ul>
								<li>
									<strong>Exemple :</strong> "Shooting Halloween 2024"
								</li>
							</ul>

							<h4>Description</h4>
							<ul>
								<li>Contexte de la séance photo</li>
								<li>Thème, produits utilisés, collaboration éventuelle</li>
							</ul>

							<h4>Catégorie</h4>
							<p>Choisis parmi :</p>
							<ul>
								<li>
									<strong>Mariages :</strong> Photos de mariées
								</li>
								<li>
									<strong>Shooting :</strong> Séances photo artistiques
								</li>
								<li>
									<strong>Événements :</strong> Maquillages pour événements spéciaux
								</li>
								<li>
									<strong>Formation :</strong> Photos d'ateliers et formations
								</li>
							</ul>

							<h4>Images</h4>
							<ul>
								<li>Ajoute autant d'images que tu veux</li>
								<li>Vérifie que chaque image a un alt text</li>
								<li>Organise l'ordre si besoin</li>
							</ul>

							<hr />

							<h2 id="temoignages">Témoignages Clients</h2>
							<p>
								<strong>Où les trouver ?</strong>
							</p>
							<p>
								Menu de gauche → <strong>Collections</strong> → <strong>Testimonials</strong>
							</p>
							<p>Les témoignages renforcent ta crédibilité et rassurent les futurs clients.</p>

							<hr />

							<h3>Créer un nouveau témoignage</h3>
							<ol>
								<li>
									Clique sur <strong>"Create New"</strong>
								</li>
								<li>Remplis les champs</li>
								<li>
									Clique sur <strong>"Save"</strong>
								</li>
							</ol>

							<hr />

							<h3>Champs d'un témoignage</h3>

							<h4>Nom du client</h4>
							<ul>
								<li>Prénom ou Prénom + initiale</li>
								<li>
									<strong>Exemple :</strong> "Sophie L." ou "Marie-Claire"
								</li>
							</ul>

							<h4>Témoignage</h4>
							<ul>
								<li>Le contenu du témoignage entre guillemets</li>
								<li>Court et percutant (2-4 phrases)</li>
								<li>
									<strong>Exemple :</strong> "Maeva a su créer un maquillage parfait pour mon mariage. Naturel, lumineux
									et qui a tenu toute la journée ! Professionnelle et à l'écoute, je recommande les yeux fermés."
								</li>
							</ul>

							<h4>Note (facultatif)</h4>
							<ul>
								<li>Note sur 5 étoiles</li>
								<li>Si le client a laissé une note, ajoute-la ici</li>
							</ul>

							<h4>Photo du client (facultatif)</h4>
							<ul>
								<li>Photo du client (avec son accord)</li>
								<li>Ou une photo de la prestation réalisée</li>
							</ul>

							<hr />

							<h2 id="bonnes-pratiques">Astuces et Bonnes Pratiques</h2>

							<h3>Pour un meilleur référencement</h3>

							<h4>1. Utilise Gemini pour gagner du temps</h4>
							<ul>
								<li>Génère d'abord automatiquement</li>
								<li>Puis personnalise selon ton style</li>
							</ul>

							<h4>2. Inclue toujours ta localisation</h4>
							<ul>
								<li>Mentionne Bordeaux, Nouvelle-Aquitaine, ou les villes où tu interviens</li>
								<li>Améliore ton référencement local</li>
							</ul>

							<h4>3. Mets à jour régulièrement</h4>
							<ul>
								<li>Publie de nouveaux articles de blog</li>
								<li>Ajoute de nouvelles photos à la galerie</li>
								<li>Collecte et publie des témoignages</li>
							</ul>

							<p>
								<strong>Plus tu auras de contenu, de photos et d'éléments, meilleur sera ton référencement !</strong>
							</p>

							<hr />

							<h3>📸 Pour des images parfaites</h3>

							<h4>1. Qualité avant tout</h4>
							<ul>
								<li>Photos nettes et bien exposées</li>
								<li>Résolution minimum : 1920x1080 pour les grandes images</li>
							</ul>

							<h4>2. Optimise le poids</h4>
							<ul>
								<li>Compresse avant téléchargement avec TinyPNG</li>
								<li>Cible : 200-500 Ko par image</li>
							</ul>

							<h4>3. Alt Text systématique</h4>
							<ul>
								<li>Utilise Forvoyez pour gagner du temps</li>
								<li>Relis et ajuste toujours (c'est mieux, mais pas grave si tu ne le fais pas)</li>
							</ul>

							<h4>4. Nommage cohérent</h4>
							<ul>
								<li>
									<code>maquillage-mariee-bordeaux.jpg</code> au lieu de <code>IMG_1234.jpg</code>
								</li>
								<li>Facilite la gestion</li>
							</ul>

							<hr />

							<h3>✍️ Pour un contenu engageant</h3>

							<h4>1. Soyez authentique</h4>
							<ul>
								<li>Parle naturellement de ton travail</li>
								<li>Partage ta passion et ton expertise</li>
							</ul>

							<h4>2. Pense à tes clients</h4>
							<ul>
								<li>Répondez à leurs questions</li>
								<li>Donnez des conseils pratiques</li>
								<li>Rassurez sur les tarifs, le déroulement</li>
							</ul>

							<h4>3. Structure tes articles</h4>
							<ul>
								<li>Utilise des titres et sous-titres clairs</li>
								<li>Ajoute des listes à puces</li>
								<li>Insère des images pour illustrer</li>
							</ul>

							<h4>4. Ajoute des appels à l'action</h4>
							<ul>
								<li>"Prends rendez-vous pour un essai"</li>
								<li>"Découvrez mes autres prestations"</li>
								<li>"Contactez-moi pour un devis"</li>
							</ul>

							<hr />

							<h3>🔄 Routine de mise à jour</h3>

							<h4>Chaque mois :</h4>
							<ul>
								<li>Publiez 1-2 nouveaux articles de blog</li>
								<li>Ajoute de nouvelles photos à la galerie</li>
								<li>Collecte et ajoute des témoignages clients</li>
							</ul>

							<h4>Tous les 3 mois :</h4>
							<ul>
								<li>Relis tes services (tarifs, descriptions)</li>
								<li>Vérifie les liens</li>
								<li>Actualise les anciennes photos si besoin</li>
							</ul>

							<h4>Annuellement :</h4>
							<ul>
								<li>Fais le tri dans tes images non utilisées</li>
								<li>Relis l'ensemble de ton contenu</li>
								<li>Mets à jour tes coordonnées si changement</li>
							</ul>

							<hr />

							<h3>🛟 En cas de problème</h3>

							<h4>Tu ne vois pas tes modifications sur le site</h4>
							<ol>
								<li>
									Assure-toi d'avoir cliqué sur <strong>"Save"</strong>
								</li>
								<li>
									Attends 2-3 minutes (le site met à jour le cache). Pour des raisons de performance, le design se met à
									jour au bout d'1h environ
								</li>
								<li>Rafraîchis la page (Ctrl+F5 ou Cmd+Shift+R)</li>
							</ol>

							<h4>Une image ne s'affiche pas</h4>
							<ol>
								<li>
									Vérifie que l'image est bien téléchargée dans <strong>Media</strong>
								</li>
								<li>Vérifie que tu as bien sélectionné cette image dans le champ</li>
								<li>Assure-toi que l'image n'a pas été supprimée</li>
							</ol>

							<h4>Forvoyez ou Gemini ne fonctionne pas</h4>
							<ol>
								<li>Vérifie que tu as une connexion internet</li>
								<li>Réessaie dans quelques minutes</li>
								<li>Si le problème persiste, utilise la méthode manuelle</li>
								<li>Contacte-moi si le problème continue</li>
							</ol>

							<h4>Tu as supprimé quelque chose par erreur</h4>
							<p>
								<strong>Contactez-moi immédiatement</strong> pour éviter de perdre trop de données. Des sauvegardes sont
								effectuées régulièrement (toutes les 24h).
							</p>

							<hr />

							<h2>🎉 Félicitations !</h2>
							<p>Tu sais maintenant comment gérer l'intégralité du contenu de ton site web.</p>

							<p>
								<strong>Rappelle-toi :</strong>
							</p>
							<ul>
								<li>Sois régulier dans les mises à jour</li>
								<li>Ajoute du contenu au fil du temps</li>
								<li>Reste authentique et naturel</li>
								<li>Utilise Gemini et Forvoyez pour gagner du temps</li>
							</ul>

							<p>
								<strong>Ton site est un outil vivant.</strong> Plus tu l'alimentes avec de nouveaux articles, des photos
								de qualité et du contenu pertinent, plus il attirera de clients.
							</p>

							<p>Bon courage ! 💄</p>
						</article>
					</div>

					{/* Bottom Section - Navigation */}
					<SlideInFromBottom>
						<div className="mt-12">
							{/* Back to Admin */}
							<div className="pt-8 border-t border-border">
								<Link href="/admin" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
									← Retour au dashboard
								</Link>
							</div>
						</div>
					</SlideInFromBottom>
				</div>
			</div>
		</>
	)
}
