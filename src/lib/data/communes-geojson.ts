// Polygones simplifiés des communes de la zone d'intervention
// Ces coordonnées sont approximatives et représentent les contours des communes
export const COMMUNES_GEOJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { name: 'Monnières' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.365, 47.115],
						[-1.325, 47.115],
						[-1.325, 47.15],
						[-1.365, 47.15],
						[-1.365, 47.115],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'La Haie-Fouassière' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.415, 47.125],
						[-1.375, 47.125],
						[-1.375, 47.16],
						[-1.415, 47.16],
						[-1.415, 47.125],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'Haute-Goulaine' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.445, 47.175],
						[-1.4, 47.175],
						[-1.4, 47.21],
						[-1.445, 47.21],
						[-1.445, 47.175],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'Basse-Goulaine' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.47, 47.185],
						[-1.425, 47.185],
						[-1.425, 47.22],
						[-1.47, 47.22],
						[-1.47, 47.185],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'Gorges' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.34, 47.085],
						[-1.295, 47.085],
						[-1.295, 47.12],
						[-1.34, 47.12],
						[-1.34, 47.085],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'Clisson' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.305, 47.065],
						[-1.255, 47.065],
						[-1.255, 47.105],
						[-1.305, 47.105],
						[-1.305, 47.065],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'Le Pallet' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.355, 47.115],
						[-1.31, 47.115],
						[-1.31, 47.15],
						[-1.355, 47.15],
						[-1.355, 47.115],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { name: 'Vertou' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-1.495, 47.15],
						[-1.445, 47.15],
						[-1.445, 47.185],
						[-1.495, 47.185],
						[-1.495, 47.15],
					],
				],
			},
		},
	],
}
