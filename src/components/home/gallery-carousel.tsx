'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export interface GalleryCarouselItem {
	id: string
	title: string
	description: string
	href: string
	image: string
	category: string
}

export interface GalleryCarouselProps {
	title?: string
	description?: string
	items: GalleryCarouselItem[]
}

const GalleryCarousel = ({
	title = 'Mes Dernières Créations',
	description = 'Découvrez mes réalisations récentes en maquillage et nail art',
	items,
}: GalleryCarouselProps) => {
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

	if (items.length === 0) {
		return null
	}

	return (
		<section className="py-16 md:py-24 lg:py-32">
			<div className="container mx-auto">
				<div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{title}</h2>
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
			</div>
			<div className="w-full">
				<Carousel
					setApi={setCarouselApi}
					opts={{
						breakpoints: {
							'(max-width: 768px)': {
								dragFree: true,
							},
						},
					}}
				>
					<CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
						{items.map(item => (
							<CarouselItem key={item.id} className="max-w-[320px] pl-[20px] lg:max-w-[360px]">
								<Link
									href={item.href}
									className="group relative block h-full min-h-[27rem] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_60px_-15px_hsl(var(--primary)/0.6)] md:aspect-[5/4] lg:aspect-[16/9]"
									style={{
										boxShadow: '0 0 40px -15px hsl(var(--primary) / 0.5)',
									}}
								>
									{/* Background Image with Parallax Zoom */}
									<div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110">
										<Image
											src={item.image}
											alt={item.title}
											fill
											sizes="(max-width: 768px) 320px, 360px"
											className="object-cover object-center"
										/>
									</div>

									{/* Themed Gradient Overlay */}
									<div
										className="absolute inset-0"
										style={{
											background:
												'linear-gradient(to top, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.6) 30%, transparent 60%)',
										}}
									/>

									{/* Content */}
									<div className="relative flex h-full flex-col justify-end p-6 text-primary-foreground md:p-8">
										<div className="mb-2 text-sm font-medium uppercase tracking-wider opacity-90">{item.category}</div>
										<h3 className="mb-2 pt-2 text-xl font-bold tracking-tight md:mb-3 md:pt-2 lg:pt-2 font-kalam">
											{item.title}
										</h3>
										<p className="mb-8 line-clamp-2 text-sm text-white/90 md:mb-12 lg:mb-9">{item.description}</p>

										{/* Explore Button */}
										<div className="flex items-center justify-between rounded-lg border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.2)] px-4 py-3 backdrop-blur-md transition-all duration-300 group-hover:border-[hsl(var(--primary)/0.5)] group-hover:bg-[hsl(var(--primary)/0.4)]">
											<span className="text-sm font-semibold tracking-wide">Voir la galerie</span>
											<ArrowRight className="size-4 transform transition-transform duration-300 group-hover:translate-x-1" />
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
							key={item.id}
							type="button"
							className={`h-2 w-2 rounded-full transition-colors ${
								currentSlide === index ? 'bg-primary' : 'bg-primary/20'
							}`}
							onClick={() => carouselApi?.scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export { GalleryCarousel }
