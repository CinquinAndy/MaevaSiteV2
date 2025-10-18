'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface GooeyNavItem {
	label: string
	href: string
	isLogo?: boolean
}

export interface GooeyNavProps {
	items: GooeyNavItem[]
	animationTime?: number
	particleCount?: number
	particleDistances?: [number, number]
	particleR?: number
	timeVariance?: number
	initialActiveIndex?: number
}

export const Gooey: React.FC<GooeyNavProps> = ({
	items,
	animationTime = 600,
	particleCount = 15,
	particleDistances = [90, 10],
	particleR = 100,
	timeVariance = 300,
	initialActiveIndex = 0,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const navRef = useRef<HTMLUListElement>(null)
	const filterRef = useRef<HTMLSpanElement>(null)
	const textRef = useRef<HTMLSpanElement>(null)
	const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex)
	const pathname = usePathname()

	// Mettre à jour l'index actif basé sur le pathname
	useEffect(() => {
		const index = items.findIndex(item => item.href === pathname)
		if (index >= 0 && index !== activeIndex) {
			setActiveIndex(index)
		}
	}, [pathname, items, activeIndex])

	const noise = (n = 1) => n / 2 - Math.random() * n

	const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
		const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
		return [distance * Math.cos(angle), distance * Math.sin(angle)]
	}

	const createParticle = (i: number, t: number, d: [number, number], r: number) => {
		const rotate = noise(r / 10)
		return {
			start: getXY(d[0], particleCount - i, particleCount),
			end: getXY(d[1] + noise(7), particleCount - i, particleCount),
			time: t,
			scale: 1 + noise(0.2),
			rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
		}
	}

	const makeParticles = (element: HTMLElement) => {
		const d: [number, number] = particleDistances
		const r = particleR
		const bubbleTime = animationTime * 2 + timeVariance
		element.style.setProperty('--time', `${bubbleTime}ms`)

		const existingParticles = element.querySelectorAll('.particle')
		existingParticles.forEach(p => p.remove())

		element.classList.remove('active')

		for (let i = 0; i < particleCount; i++) {
			const t = animationTime * 2 + noise(timeVariance * 2)
			const p = createParticle(i, t, d, r)

			setTimeout(() => {
				const particle = document.createElement('span')
				const point = document.createElement('span')
				particle.classList.add('particle')
				particle.style.setProperty('--start-x', `${p.start[0]}px`)
				particle.style.setProperty('--start-y', `${p.start[1]}px`)
				particle.style.setProperty('--end-x', `${p.end[0]}px`)
				particle.style.setProperty('--end-y', `${p.end[1]}px`)
				particle.style.setProperty('--time', `${p.time}ms`)
				particle.style.setProperty('--scale', `${p.scale}`)
				particle.style.setProperty('--rotate', `${p.rotate}deg`)
				point.classList.add('point')
				particle.appendChild(point)
				element.appendChild(particle)

				if (i === particleCount - 1) {
					requestAnimationFrame(() => {
						element.classList.add('active')
					})
				}

				setTimeout(() => {
					try {
						if (particle.parentElement === element) {
							element.removeChild(particle)
						}
					} catch {}
				}, t)
			}, i * 10)
		}
	}

	const updateEffectPosition = (element: HTMLElement) => {
		if (!containerRef.current || !filterRef.current || !textRef.current) return
		const containerRect = containerRef.current.getBoundingClientRect()
		const pos = element.getBoundingClientRect()
		const styles = {
			left: `${pos.left - containerRect.left}px`,
			top: `${pos.top - containerRect.top}px`,
			width: `${pos.width}px`,
			height: `${pos.height}px`,
		}
		Object.assign(filterRef.current.style, styles)
		Object.assign(textRef.current.style, styles)

		// Clone le contenu (texte ou image du Link)
		textRef.current.innerHTML = ''
		const linkElement = element.querySelector('a')
		if (linkElement) {
			const clone = linkElement.cloneNode(true) as HTMLElement
			textRef.current.appendChild(clone)
		}
	}

	const handleClick = (e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>, index: number) => {
		const liEl = e.currentTarget
		if (activeIndex === index) return

		setActiveIndex(index)
		updateEffectPosition(liEl)

		if (textRef.current) {
			textRef.current.classList.remove('active')
			void textRef.current.offsetWidth
			textRef.current.classList.add('active')
		}
		if (filterRef.current) {
			makeParticles(filterRef.current)
		}
	}

	useEffect(() => {
		if (!navRef.current || !containerRef.current || !textRef.current || !filterRef.current) return

		const listItems = navRef.current.querySelectorAll('li')
		if (listItems.length === 0) return

		const activeLi = listItems[activeIndex] as HTMLElement
		if (activeLi) {
			updateEffectPosition(activeLi)
			if (textRef.current && !textRef.current.classList.contains('active')) {
				textRef.current.classList.add('active')
			}
			if (filterRef.current && filterRef.current.children.length === 0) {
				makeParticles(filterRef.current)
			}
		}

		const resizeObserver = new ResizeObserver(() => {
			if (navRef.current) {
				const currentActiveLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement
				if (currentActiveLi) {
					updateEffectPosition(currentActiveLi)
				}
			}
		})

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current)
		}

		return () => {
			if (containerRef.current) {
				resizeObserver.unobserve(containerRef.current)
			}
		}
	}, [activeIndex, items])

	return (
		<div className="gooey-nav-container relative" ref={containerRef}>
			<nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>
				<ul
					ref={navRef}
					className={cn('flex gap-x-1 sm:gap-x-2 lg:gap-x-4 list-none p-0 px-2 sm:px-3 lg:px-4 m-0 relative z-[3]')}
					aria-label="Main navigation"
				>
					{items.map((item, index) => (
						<li
							key={index}
							className={cn(
								`py-1.5 my-1 px-2.5 sm:py-2 sm:my-2 sm:px-3 lg:py-3 lg:px-5 rounded-full relative cursor-pointer`,
								activeIndex === index ? 'active' : ''
							)}
							onClick={e => handleClick(e, index)}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault()
									handleClick(e, index)
								}
							}}
							aria-current={activeIndex === index ? 'page' : undefined}
						>
							<Link
								href={item.href}
								className="outline-none no-underline flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base"
								tabIndex={-1}
							>
								{item.isLogo ? (
									<Image
										src="/icons/logo.png"
										alt="Logo"
										width={150}
										height={150}
										className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 scale-125"
									/>
								) : (
									item.label
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<span className="effect filter" ref={filterRef} />
			<span className="effect text" ref={textRef} />
		</div>
	)
}
