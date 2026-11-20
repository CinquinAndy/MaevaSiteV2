'use client'

import dynamic from 'next/dynamic'

interface InteractiveMapProps {
	className?: string
}

/**
 * Carte affichée seulement dans le navigateur : rendue aussi côté serveur, elle différait du premier rendu
 * du navigateur et provoquait une erreur d'hydratation React (#418) sur /contact.
 */
const InteractiveMapContent = dynamic(() => import('./interactive-map-content'), { ssr: false })

export function InteractiveMap({ className }: InteractiveMapProps) {
	return (
		<div className={className}>
			<InteractiveMapContent />
		</div>
	)
}
