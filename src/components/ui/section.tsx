import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
	children: React.ReactNode
	variant?: 'default' | 'muted' | 'dark'
}

export function Section({ children, variant = 'default', className, ...props }: SectionProps) {
	return (
		<section
			className={cn(
				'relative w-full py-16 md:py-24 lg:py-32',
				{
					'bg-background': variant === 'default',
					'bg-muted/20': variant === 'muted',
					'bg-card': variant === 'dark',
				},
				className
			)}
			{...props}
		>
			{children}
		</section>
	)
}
