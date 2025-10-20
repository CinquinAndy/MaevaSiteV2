import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
	return (
		<div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)} {...props}>
			{children}
		</div>
	)
}
