/**
 * Exemple de composant React pour afficher les avis Google
 * avec les images de profil des auteurs
 *
 * Utilisation:
 * import { GoogleReviews } from '@/components/reviews/GoogleReviews'
 * <GoogleReviews />
 */

import reviewsData from '@/reviews-data/google-reviews.json'
import Image from 'next/image'

export function GoogleReviews() {
	return (
		<section className="reviews-section py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				{/* En-tête */}
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4">Ce que disent nos clients</h2>

					<div className="flex items-center justify-center gap-2 mb-2">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<svg
									key={i}
									className={`w-6 h-6 ${
										i < Math.round(reviewsData.averageRating) ? 'text-yellow-400' : 'text-gray-300'
									}`}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							))}
						</div>
						<span className="text-2xl font-bold">{reviewsData.averageRating}/5</span>
					</div>

					<p className="text-gray-600">
						Basé sur <strong>{reviewsData.totalReviews} avis Google</strong> vérifiés
					</p>
				</div>

				{/* Grille des avis */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{reviewsData.reviews.slice(0, 6).map((review, index) => (
						<article
							key={index}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
						>
							{/* En-tête de l'avis */}
							<div className="flex items-start gap-4 mb-4">
								{/* Image de profil */}
								{review.authorImage ? (
									<Image
										src={review.authorImage}
										alt={review.author}
										width={48}
										height={48}
										className="rounded-full"
									/>
								) : (
									<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
										<svg
											className="w-6 h-6 text-gray-400"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								)}

								<div className="flex-1">
									<h3 className="font-semibold text-gray-900">{review.author}</h3>

									{/* Étoiles */}
									<div className="flex gap-1 my-1">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										))}
									</div>

									<p className="text-sm text-gray-500">{review.date}</p>
								</div>
							</div>

							{/* Texte de l'avis */}
							<p className="text-gray-700 leading-relaxed">{review.text}</p>
						</article>
					))}
				</div>

				{/* Lien vers tous les avis */}
				<div className="text-center mt-12">
					<a
						href="https://www.google.com/maps/search/cinquin+maeva"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
						</svg>
						Voir tous les avis sur Google
					</a>
				</div>
			</div>
		</section>
	)
}

/**
 * Version compacte pour la page d'accueil (3 meilleurs avis)
 */
export function GoogleReviewsCompact() {
	const topReviews = reviewsData.reviews.filter(r => r.rating === 5).slice(0, 3)

	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-8">Témoignages clients</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{topReviews.map((review, index) => (
						<blockquote key={index} className="bg-white p-6 rounded-lg shadow">
							<div className="flex items-center gap-3 mb-4">
								{review.authorImage && (
									<Image
										src={review.authorImage}
										alt={review.author}
										width={40}
										height={40}
										className="rounded-full"
									/>
								)}
								<div>
									<cite className="font-semibold not-italic">{review.author}</cite>
									<div className="text-yellow-400">{'⭐'.repeat(review.rating)}</div>
								</div>
							</div>
							<p className="text-gray-700 italic">"{review.text.substring(0, 150)}..."</p>
						</blockquote>
					))}
				</div>

				<p className="text-center mt-6 text-gray-600">
					⭐ {reviewsData.averageRating}/5 sur {reviewsData.totalReviews} avis Google
				</p>
			</div>
		</section>
	)
}

/**
 * Données structurées JSON-LD pour le SEO
 */
export function GoogleReviewsSchema() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"name": reviewsData.businessName,
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": reviewsData.averageRating,
			"reviewCount": reviewsData.totalReviews,
			"bestRating": "5",
			"worstRating": "1"
		},
		"review": reviewsData.reviews.slice(0, 10).map(review => ({
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": review.author,
				...(review.authorImage && { "image": review.authorImage })
			},
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": review.rating,
				"bestRating": "5"
			},
			"reviewBody": review.text,
			"datePublished": review.date
		}))
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
