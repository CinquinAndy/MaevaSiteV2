const config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/collections/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/globals/**/*.{js,ts,jsx,tsx,mdx}',
	],
	safelist: [
		// Grid columns - pour la grille bento dynamique
		'md:col-span-1',
		'md:col-span-2',
		'md:col-span-3',
		'lg:col-span-1',
		'lg:col-span-2',
		'lg:col-span-3',
		'col-span-1',
		'col-span-2',
		'col-span-3',

		// Grid rows - si besoin
		'md:row-span-1',
		'md:row-span-2',
		'lg:row-span-1',
		'lg:row-span-2',
		'row-span-1',
		'row-span-2',

		// Tailles d'auto-rows pour bento
		'auto-rows-[18rem]',
		'auto-rows-[20rem]',
		'auto-rows-[22rem]',
		'auto-rows-[24rem]',

		// Classes de grille courantes
		'grid-cols-1',
		'grid-cols-2',
		'grid-cols-3',
		'md:grid-cols-1',
		'md:grid-cols-2',
		'md:grid-cols-3',
		'lg:grid-cols-1',
		'lg:grid-cols-2',
		'lg:grid-cols-3',

		// Gaps dynamiques
		'gap-4',
		'gap-6',
		'gap-8',
		'md:gap-4',
		'md:gap-6',
		'md:gap-8',
		'lg:gap-4',
		'lg:gap-6',
		'lg:gap-8',
	],
}

export default config
