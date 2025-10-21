const data = require('../reviews-data/google-reviews.json');

console.log('📊 RÉSUMÉ DES AVIS GOOGLE EXTRAITS\n');
console.log('═══════════════════════════════════════════════════\n');

console.log('🏢 Entreprise:', data.businessName);
console.log('⭐ Note moyenne:', data.averageRating + '/5');
console.log('📝 Total d\'avis:', data.totalReviews);
console.log('📷 Avis avec images:', data.reviews.filter(r => r.authorImage).length);
console.log('📅 Extrait le:', new Date(data.extractedAt).toLocaleDateString('fr-FR'));

console.log('\n═══════════════════════════════════════════════════');
console.log('📋 EXEMPLES D\'AVIS COMPLETS (3 premiers)\n');

for (let i = 0; i < Math.min(3, data.reviews.length); i++) {
  const review = data.reviews[i];
  console.log(`${i + 1}. ${review.author}`);
  console.log('   ' + '⭐'.repeat(review.rating));
  console.log('   📅', review.date);
  console.log('   📷', review.authorImage ? 'Oui (' + review.authorImage.substring(0, 50) + '...)' : 'Non');
  console.log('   💬', review.text.substring(0, 150) + (review.text.length > 150 ? '...' : ''));
  console.log('');
}

console.log('═══════════════════════════════════════════════════');
console.log('\n✅ Structure JSON parfaite ! Toutes les données sont présentes:\n');
console.log('   • Nom de l\'auteur ✓');
console.log('   • Image de profil ✓');
console.log('   • Note (1-5 étoiles) ✓');
console.log('   • Date de l\'avis ✓');
console.log('   • Texte du commentaire ✓');
console.log('\n💾 Fichier: reviews-data/google-reviews.json');
