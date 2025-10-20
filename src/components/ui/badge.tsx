import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline'
	children: React.ReactNode
}

export function Badge({ variant = 'default', children, className, ...props }: BadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
				{
					'bg-primary/10 text-primary': variant === 'default' || variant === 'primary',
					'bg-secondary/10 text-secondary': variant === 'secondary',
					'bg-accent/10 text-accent-foreground': variant === 'accent',
					'border border-border bg-transparent text-foreground': variant === 'outline',
				},
				className
			)}
			{...props}
		>
			{children}
		</span>
	)
}
