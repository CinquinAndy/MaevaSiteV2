'use client'

export default function CurvedText() {
	return (
		<>
			<style jsx>{`
				@keyframes travel {
					from {
						offset-distance: 0%;
					}
					to {
						offset-distance: 100%;
					}
				}

				.text-travel-1 {
					animation: travel 30s linear infinite;
				}

				.text-travel-2 {
					animation: travel 30s linear infinite;
					animation-delay: -15s;
				}

				.text-travel-3 {
					animation: travel 30s linear infinite;
					animation-delay: -10s;
				}
			`}</style>

			<svg
				width="100%"
				height="100%"
				viewBox="0 0 2000 1179"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 w-full h-full"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Définition du chemin */}
				<defs>
					<path
						id="curve"
						d="M17.5 1160C327.879 876.5 736.951 1052.59 1002.05 845C1156.61 723.963 1162.6 569.963 1327.04 462.5C1504.42 346.576 1722.53 485.799 1851.05 318C1909.45 241.759 1965.55 98.3516 1974.5 3"
					/>
				</defs>

				{/* Texte qui suit le chemin - Instance 1 */}
				<text fill="white" fontSize="48" fontFamily="Corinthia, cursive" fontWeight="400" className="text-travel-1">
					<textPath href="#curve" startOffset="0%" textAnchor="start" spacing="auto">
						Cinquin Maeva · Maquilleuse professionnelle · Passionnée à votre service · Diplômée Makeup For
						Ever Nice ·{' '}
					</textPath>
					<animate attributeName="startOffset" from="0%" to="100%" dur="30s" repeatCount="indefinite" />
				</text>

				{/* Texte qui suit le chemin - Instance 2 */}
				<text fill="white" fontSize="48" fontFamily="Corinthia, cursive" fontWeight="400" className="text-travel-2">
					<textPath href="#curve" startOffset="0%" textAnchor="start" spacing="auto">
						Cinquin Maeva · Maquilleuse professionnelle · Passionnée à votre service · Diplômée Makeup For
						Ever Nice ·{' '}
					</textPath>
					<animate attributeName="startOffset" from="0%" to="100%" dur="30s" repeatCount="indefinite" />
				</text>

				{/* Texte qui suit le chemin - Instance 3 */}
				<text fill="white" fontSize="48" fontFamily="Corinthia, cursive" fontWeight="400" className="text-travel-3">
					<textPath href="#curve" startOffset="0%" textAnchor="start" spacing="auto">
						Cinquin Maeva · Maquilleuse professionnelle · Passionnée à votre service · Diplômée Makeup For
						Ever Nice ·{' '}
					</textPath>
					<animate attributeName="startOffset" from="0%" to="100%" dur="30s" repeatCount="indefinite" />
				</text>
			</svg>
		</>
	)
}
