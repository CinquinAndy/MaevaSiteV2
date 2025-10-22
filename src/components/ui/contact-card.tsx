import type { LucideIcon } from 'lucide-react'
import { Plus } from 'lucide-react'
import type React from 'react'
import { AnimatedBlobs } from '@/components/ui/animated-blobs'
import { cn } from '@/lib/utils'

type ContactInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon
	label: string
	value: string | React.ReactNode
}

type ContactCardProps = React.ComponentProps<'div'> & {
	// Content props
	title?: string
	description?: string
	contactInfo?: ContactInfoProps[]
	formSectionClassName?: string
}

export function ContactCard({
	title = 'Contactez-moi',
	description = 'Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.',
	contactInfo,
	className,
	formSectionClassName,
	children,
	...props
}: ContactCardProps) {
	return (
		<div
			className={cn(
				'bg-card border relative grid h-full w-full shadow-xl md:grid-cols-2 lg:grid-cols-3 p-10',
				className
			)}
			{...props}
		>
			{/* Icônes Plus décoratives aux coins */}
			<Plus className="absolute -top-3 -left-3 h-6 w-6 text-primary z-10" />
			<Plus className="absolute -top-3 -right-3 h-6 w-6 text-primary z-10" />
			<Plus className="absolute -bottom-3 -left-3 h-6 w-6 text-primary z-10" />
			<Plus className="absolute -right-3 -bottom-3 h-6 w-6 text-primary z-10" />

			<div className="flex flex-col justify-between lg:col-span-2 relative">
				{/* Blobs animés en arrière-plan */}
				<AnimatedBlobs className="absolute inset-0 pointer-events-none opacity-80" />

				<div className="relative h-full space-y-4 px-4 py-8 md:p-8 z-10">
					<h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">{title}</h1>
					<p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">{description}</p>
					<div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
						{contactInfo?.map(info => (
							<ContactInfo key={info.label} {...info} />
						))}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'bg-muted/40 rounded-lg flex h-full w-full items-center border-t p-8 md:col-span-1 md:border-t-0 md:border-l',
					formSectionClassName
				)}
			>
				{children}
			</div>
		</div>
	)
}

function ContactInfo({ icon: Icon, label, value, className, ...props }: ContactInfoProps) {
	return (
		<div className={cn('flex items-center gap-3 py-3', className)} {...props}>
			<div className="bg-muted/40 rounded-lg p-3">
				<Icon className="h-5 w-5 text-foreground" />
			</div>
			<div>
				<p className="font-medium text-foreground">{label}</p>
				{typeof value === 'string' ? <p className="text-muted-foreground text-xs">{value}</p> : value}
			</div>
		</div>
	)
}
