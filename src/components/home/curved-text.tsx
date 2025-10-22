'use client'

export default function CurvedText() {
	// Base text content
	const textContent =
		'Cinquin Maeva · Maquilleuse professionnelle · Passionnée à votre service · Diplômée Makeup For Ever Nice · '

	// Repeat 6 times to make the loop longer and reduce visible jumps
	const repeatedText = textContent + textContent + textContent + textContent + textContent + textContent

	return (
		<>
			{/* First SVG - left to right animation */}
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 2000 1179"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 w-full h-full scale-200 md:scale-110 opacity-80"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Path definition */}
				<defs>
					<path
						id="curve"
						d="M17.5 1160C327.879 876.5 736.951 1052.59 1002.05 845C1156.61 723.963 1162.6 569.963 1327.04 462.5C1504.42 346.576 1722.53 485.799 1851.05 318C1909.45 241.759 1965.55 98.3516 1974.5 3"
					/>
				</defs>

				{/*
					Seamless infinite animation:
					- Starts at -16.66% (offscreen left)
					- Goes to 0% (travels exactly 1/6 of repeated content)
					- Since text is repeated 6x, when it loops back to -16.66%, it's visually identical
				*/}
				<text fill="white" fontSize="56" fontFamily="Corinthia, cursive" fontWeight="700">
					<textPath href="#curve" startOffset="-16.66%">
						{repeatedText}
						<animate attributeName="startOffset" from="-16.66%" to="0%" dur="15s" repeatCount="indefinite" />
					</textPath>
				</text>
			</svg>

			{/* Second SVG - right to left animation, offset vertically and horizontally */}
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 2000 1179"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 w-full h-full translate-y-4 translate-x-4 scale-200 md:translate-y-10 md:translate-x-10 md:scale-110 opacity-80"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Path definition */}
				<defs>
					<path
						id="curve2"
						d="M17.5 1160C327.879 876.5 736.951 1052.59 1002.05 845C1156.61 723.963 1162.6 569.963 1327.04 462.5C1504.42 346.576 1722.53 485.799 1851.05 318C1909.45 241.759 1965.55 98.3516 1974.5 3"
					/>
				</defs>

				{/*
					Reversed seamless infinite animation:
					- Starts at 0% (offscreen right)
					- Goes to -16.66% (travels in reverse direction)
					- Mirror effect of the first animation
				*/}
				<text fill="white" fontSize="56" fontFamily="Corinthia, cursive" fontWeight="700" opacity="0.8">
					<textPath href="#curve2" startOffset="0%">
						{repeatedText}
						<animate attributeName="startOffset" from="0%" to="-16.66%" dur="15s" repeatCount="indefinite" />
					</textPath>
				</text>
			</svg>
		</>
	)
}
