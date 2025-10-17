import React from 'react'
import { cn } from '@/lib/utils'

type CityType = {
	name: string
}

type CityCardProps = React.ComponentProps<'div'> & {
	city: CityType
}

export function CityCard({ city, className, ...props }: CityCardProps) {
	const p = genRandomPattern()

	return (
		<div className={cn('relative overflow-hidden p-6', className)} {...props}>
			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			<h3 className="mt-4 text-sm md:text-base font-medium text-center">{city.name}</h3>
		</div>
	)
}

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId()

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible" aria-hidden="true">
					{squares.map(([squareX, squareY]) => (
						<rect
							strokeWidth="0"
							key={`${squareX}-${squareY}`}
							width={width + 1}
							height={height + 1}
							x={squareX * width}
							y={squareY * height}
						/>
					))}
				</svg>
			)}
		</svg>
	)
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5
	const pattern: number[][] = []
	const used = new Set<string>()

	while (pattern.length < length) {
		const x = Math.floor(Math.random() * 4) + 7 // random x between 7 and 10
		const y = Math.floor(Math.random() * 6) + 1 // random y between 1 and 6
		const key = `${x}-${y}`

		if (!used.has(key)) {
			used.add(key)
			pattern.push([x, y])
		}
	}

	return pattern
}
