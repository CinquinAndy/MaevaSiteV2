import type * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
	const variants = {
		default: 'border-transparent bg-primary text-primary-foreground shadow',
		secondary: 'border-transparent bg-secondary text-secondary-foreground',
		destructive: 'border-transparent bg-destructive text-destructive-foreground shadow',
		outline: 'text-foreground border-border',
		success: 'border-transparent bg-green-100 text-green-800',
	}

	return (
		<div
			className={cn(
				'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
				variants[variant],
				className
			)}
			{...props}
		/>
	)
}

export { Badge }
