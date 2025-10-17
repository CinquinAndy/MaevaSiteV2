'use client'

import {
	AnimatePresence,
	type MotionStyle,
	type MotionValue,
	motion,
	useMotionTemplate,
	useMotionValue,
	type Variants,
} from 'framer-motion'
import Image from 'next/image'
import { forwardRef, type MouseEvent, useCallback, useEffect, useState } from 'react'

// --- Helper Functions and Fallbacks ---

// A simple utility for class names, similar to cn/clsx
const cn = (...classes: (string | boolean | undefined)[]) => {
	return classes.filter(Boolean).join(' ')
}

// Placeholder for image assets if they are not found.
const placeholderImage = (text = 'Image') => `https://placehold.co/600x400/1a1a1a/ffffff?text=${text}`

// --- Types ---
type StaticImageData = string

type WrapperStyle = MotionStyle & {
	'--x': MotionValue<string>
	'--y': MotionValue<string>
}

interface CardProps {
	bgClass?: string
}

interface ImageSet {
	step1img1: StaticImageData
	step1img2: StaticImageData
	step2img1: StaticImageData
	step2img2: StaticImageData
	step3img: StaticImageData
	step4img: StaticImageData
	alt: string
}

interface FeatureCarouselProps extends CardProps {
	step1img1Class?: string
	step1img2Class?: string
	step2img1Class?: string
	step2img2Class?: string
	step3imgClass?: string
	step4imgClass?: string
	image: ImageSet
}

interface StepImageProps {
	src: StaticImageData
	alt: string
	className?: string
	style?: React.CSSProperties
	width?: number
	height?: number
}

interface Step {
	id: string
	name: string
	title: string
	description: string
}

// --- Constants ---
const TOTAL_STEPS = 4

const steps: readonly Step[] = [
	{
		id: '1',
		name: 'Étape 1',
		title: 'Vous réalisez vos travaux',
		description: "J'effectue vos travaux de jardinage à votre domicile avec mon expertise professionnelle.",
	},
	{
		id: '2',
		name: 'Étape 2',
		title: 'Vous recevez votre attestation fiscale',
		description: "En début d'année, je vous envoie automatiquement votre attestation fiscale pour votre déclaration.",
	},
	{
		id: '3',
		name: 'Étape 3',
		title: 'Vous déclarez vos dépenses',
		description: "Indiquez le montant sur votre déclaration d'impôts dans la case dédiée aux services à la personne.",
	},
	{
		id: '4',
		name: 'Étape 4',
		title: "Vous bénéficiez de 50% de crédit d'impôt",
		description: "L'administration fiscale vous rembourse 50% du montant des prestations sous forme de crédit d'impôt.",
	},
]

const ANIMATION_PRESETS = {
	fadeInScale: {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
		transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
	},
	slideInRight: {
		initial: { opacity: 0, x: 20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -20 },
		transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
	},
	slideInLeft: {
		initial: { opacity: 0, x: -20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 20 },
		transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
	},
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
	preset?: AnimationPreset
	delay?: number
	onAnimationComplete?: () => void
}

// --- Hooks ---
function useNumberCycler(totalSteps: number = TOTAL_STEPS, interval: number = 5000) {
	const [currentNumber, setCurrentNumber] = useState(0)

	// This effect handles the automatic cycling.
	// It depends on `currentNumber`, so every time the step changes,
	// it will clear the old timer and set a new one for the next step.
	useEffect(() => {
		const timerId = setTimeout(() => {
			setCurrentNumber(prev => (prev + 1) % totalSteps)
		}, interval)

		// Cleanup function to clear the timer if the component unmounts
		// or if the dependencies of the effect change (e.g., user clicks a step).
		return () => clearTimeout(timerId)
	}, [currentNumber, totalSteps, interval])

	// This function allows manual setting of the step.
	// When called, it updates `currentNumber`, which will trigger the useEffect
	// to reset the timer for the next cycle.
	const setStep = useCallback(
		(stepIndex: number) => {
			setCurrentNumber(stepIndex % totalSteps)
		},
		[totalSteps]
	)

	return { currentNumber, setStep }
}

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false)
	useEffect(() => {
		const checkDevice = () => {
			setIsMobile(window.matchMedia('(max-width: 768px)').matches)
		}
		checkDevice()
		window.addEventListener('resize', checkDevice)
		return () => window.removeEventListener('resize', checkDevice)
	}, [])
	return isMobile
}

// --- Components ---
function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('h-4 w-4', className)}
			{...props}
		>
			<title>Check</title>
			<path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
		</svg>
	)
}

const stepVariants: Variants = {
	inactive: { scale: 0.9, opacity: 0.7 },
	active: { scale: 1, opacity: 1 },
}

const StepImage = forwardRef<HTMLDivElement, StepImageProps>(({ src, alt, className, style, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn('relative aspect-[4/3]', className)}
			style={{ position: 'absolute', userSelect: 'none', ...style }}
		>
			<Image
				alt={alt}
				src={src}
				fill
				className="rounded-2xl"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				style={{ objectFit: 'cover' }}
				onError={e => {
					e.currentTarget.src = placeholderImage(alt)
				}}
				{...props}
			/>
		</div>
	)
})
StepImage.displayName = 'StepImage'

const MotionStepImage = motion(StepImage)

const AnimatedStepImage = ({ preset = 'fadeInScale', delay = 0, ...props }: AnimatedStepImageProps) => {
	const presetConfig = ANIMATION_PRESETS[preset]
	return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />
}

function FeatureCard({ children, step }: { children: React.ReactNode; step: number }) {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)
	const isMobile = useIsMobile()
	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		if (isMobile) return
		const { left, top } = currentTarget.getBoundingClientRect()
		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}
	return (
		<motion.div
			className="animated-cards group relative w-full rounded-2xl"
			onMouseMove={handleMouseMove}
			style={{ '--x': useMotionTemplate`${mouseX}px`, '--y': useMotionTemplate`${mouseY}px` } as WrapperStyle}
		>
			<div className="relative w-full overflow-hidden bg-white duration-300 rounded-2xl">
				<div className="m-6 md:m-10 min-h-[450px] md:min-h-[500px] w-full relative">
					<AnimatePresence mode="wait">
						<motion.div
							key={step}
							className="flex w-full flex-col gap-4 md:w-3/5 relative z-10"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							<motion.div
								className="text-sm font-semibold uppercase tracking-wider text-emerald-600"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							>
								{steps[step].name}
							</motion.div>
							<motion.h2
								className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							>
								{steps[step].title}
							</motion.h2>
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							>
								<p className="text-base leading-relaxed text-neutral-700">{steps[step].description}</p>
							</motion.div>
						</motion.div>
					</AnimatePresence>
					{children}
				</div>
			</div>
		</motion.div>
	)
}

function StepsNav({
	steps: stepItems,
	current,
	onChange,
}: {
	steps: readonly Step[]
	current: number
	onChange: (index: number) => void
}) {
	return (
		<nav aria-label="Progress" className="flex justify-center px-4">
			<ol className="flex w-full flex-wrap items-center justify-center gap-2">
				{stepItems.map((step, stepIdx) => {
					const isCompleted = current > stepIdx
					const isCurrent = current === stepIdx
					return (
						<motion.li
							key={step.name}
							initial="inactive"
							animate={isCurrent ? 'active' : 'inactive'}
							variants={stepVariants}
							transition={{ duration: 0.3 }}
							className="relative"
						>
							<button
								type="button"
								className={cn(
									'group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500',
									isCurrent ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
								)}
								onClick={() => onChange(stepIdx)}
							>
								<span
									className={cn(
										'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300',
										isCompleted
											? 'bg-emerald-600 text-white'
											: isCurrent
												? 'bg-emerald-400 text-emerald-900'
												: 'bg-neutral-200 text-neutral-700 group-hover:bg-neutral-300'
									)}
								>
									{isCompleted ? <IconCheck className="h-3.5 w-3.5" /> : <span>{stepIdx + 1}</span>}
								</span>
								<span className="hidden sm:inline-block">{step.name}</span>
							</button>
						</motion.li>
					)
				})}
			</ol>
		</nav>
	)
}

const defaultClasses = {
	img: 'shadow-black/10 border-2 border-green-500/10 rounded-2xl',
	step1img1: 'w-[45%] h-auto left-0 top-[10%]',
	step1img2: 'w-[50%] h-auto left-[45%] top-[25%]',
	step2img1: 'w-[45%] h-auto left-[5%] top-[7%]',
	step2img2: 'w-[40%] h-auto left-[50%] top-[15%]',
	step3img: 'w-[85%] h-auto left-[5%] top-[10%]',
	step4img: 'w-[85%] h-auto left-[5%] top-[5%]',
} as const

export function FeatureCarousel({
	image,
	step1img1Class = defaultClasses.step1img1,
	step1img2Class = defaultClasses.step1img2,
	step2img1Class = defaultClasses.step2img1,
	step2img2Class = defaultClasses.step2img2,
	step3imgClass = defaultClasses.step3img,
	step4imgClass = defaultClasses.step4img,
	...props
}: FeatureCarouselProps) {
	const { currentNumber: step, setStep } = useNumberCycler()
	const renderStepContent = () => {
		switch (step) {
			case 0:
				return (
					<div className="relative w-full h-full">
						<AnimatedStepImage
							alt={image.alt}
							className={cn(defaultClasses.img, step1img1Class)}
							src={image.step1img1}
							preset="slideInLeft"
						/>
						<AnimatedStepImage
							alt={image.alt}
							className={cn(defaultClasses.img, step1img2Class)}
							src={image.step1img2}
							preset="slideInRight"
							delay={0.1}
						/>
					</div>
				)
			case 1:
				return (
					<div className="relative w-full h-full">
						<AnimatedStepImage
							alt={image.alt}
							className={cn(defaultClasses.img, step2img1Class)}
							src={image.step2img1}
							preset="fadeInScale"
						/>
						<AnimatedStepImage
							alt={image.alt}
							className={cn(defaultClasses.img, step2img2Class)}
							src={image.step2img2}
							preset="fadeInScale"
							delay={0.1}
						/>
					</div>
				)
			case 2:
				return (
					<AnimatedStepImage
						alt={image.alt}
						className={cn(defaultClasses.img, step3imgClass)}
						src={image.step3img}
						preset="fadeInScale"
					/>
				)
			case 3:
				return (
					<AnimatedStepImage
						alt={image.alt}
						className={cn(defaultClasses.img, step4imgClass)}
						src={image.step4img}
						preset="fadeInScale"
					/>
				)
			default:
				return null
		}
	}
	return (
		<div className="flex flex-col gap-12 w-full max-w-4xl mx-auto p-4 rounded-2xl">
			<FeatureCard {...props} step={step}>
				<AnimatePresence mode="wait">
					<motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute">
						{renderStepContent()}
					</motion.div>
				</AnimatePresence>
			</FeatureCard>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
				<StepsNav current={step} onChange={setStep} steps={steps} />
			</motion.div>
		</div>
	)
}
