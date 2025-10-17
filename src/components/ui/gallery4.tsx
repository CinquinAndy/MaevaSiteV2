'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export interface Gallery4Item {
	id: string
	title: string
	description: string
	href: string
	image: string
}

export interface Gallery4Props {
	title?: string
	description?: string
	items: Gallery4Item[]
}

const Gallery4 = ({
	title = 'Mes Réalisations',
	description = "Découvrez mes travaux de jardinage et d'aménagement paysager réalisés avec passion et respect de la nature.",
	items,
}: Gallery4Props) => {
	const [carouselApi, setCarouselApi] = useState<CarouselApi>()
	const [canScrollPrev, setCanScrollPrev] = useState(false)
	const [canScrollNext, setCanScrollNext] = useState(false)
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		if (!carouselApi) {
			return
		}
		const updateSelection = () => {
			setCanScrollPrev(carouselApi.canScrollPrev())
			setCanScrollNext(carouselApi.canScrollNext())
			setCurrentSlide(carouselApi.selectedScrollSnap())
		}
		updateSelection()
		carouselApi.on('select', updateSelection)
		return () => {
			carouselApi.off('select', updateSelection)
		}
	}, [carouselApi])

	return (
		<section className="py-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h2>
						<p className="max-w-lg text-muted-foreground">{description}</p>
					</div>
					<div className="hidden shrink-0 gap-2 md:flex">
						<Button
							size="icon"
							variant="ghost"
							onClick={() => {
								carouselApi?.scrollPrev()
							}}
							disabled={!canScrollPrev}
							className="disabled:pointer-events-auto"
						>
							<ArrowLeft className="size-5" />
						</Button>
						<Button
							size="icon"
							variant="ghost"
							onClick={() => {
								carouselApi?.scrollNext()
							}}
							disabled={!canScrollNext}
							className="disabled:pointer-events-auto"
						>
							<ArrowRight className="size-5" />
						</Button>
					</div>
				</div>

				<Carousel
					setApi={setCarouselApi}
					opts={{
						align: 'start',
						breakpoints: {
							'(max-width: 768px)': {
								dragFree: true,
							},
						},
					}}
				>
					<CarouselContent className="-ml-4">
						{items.map(item => (
							<CarouselItem key={item.id} className="basis-auto pl-4">
								<Link href={item.href} className="group rounded-xl block">
									<div className="group relative h-full min-h-[27rem] w-[320px] lg:w-[360px] overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
										<Image
											width={400}
											height={800}
											src={item.image}
											alt={item.title}
											className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 brightness-75"
										/>
										<div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
										<div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
											<div className="mb-2 pt-4 text-xl font-black md:mb-3 md:pt-4 lg:pt-4">{item.title}</div>
											<div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9 font-semibold">{item.description}</div>
											<div className="flex items-center text-sm font-semibold italic">
												En savoir plus{' '}
												<ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				<div className="mt-8 flex justify-center gap-2">
					{items.map((item, index) => (
						<button
							type="button"
							key={item.id}
							className={`h-2 w-2 rounded-full transition-colors ${
								currentSlide === index ? 'bg-primary' : 'bg-primary/20'
							}`}
							onClick={() => carouselApi?.scrollTo(index)}
							aria-label={`Aller à la diapositive ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export { Gallery4 }
