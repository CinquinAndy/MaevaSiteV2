'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const gradientButtonVariants = cva(
	[
		'gradient-button',
		'inline-flex items-center justify-center gap-2',
		'rounded-lg min-w-[132px] px-8 py-4',
		'text-base leading-[19px] font-medium text-white',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'transition-all duration-300',
	],
	{
		variants: {
			variant: {
				default: '',
				secondary: 'gradient-button-secondary',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export interface GradientButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof gradientButtonVariants> {
	asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
	({ className, variant, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp className={cn(gradientButtonVariants({ variant, className }))} ref={ref} {...props}>
				<span className="relative z-20 text-white flex items-center justify-center gap-2">{children}</span>
			</Comp>
		)
	}
)
GradientButton.displayName = 'GradientButton'

export { GradientButton, gradientButtonVariants }
