'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

// Radix UI Accordion components
const AccordionRoot = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
				className
			)}
			{...props}
		>
			{children}
			<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn('pb-4 pt-0', className)}>{children}</div>
	</AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Legacy wrapper for backwards compatibility
interface LegacyAccordionItemProps {
	value: string
	title: string
	children: React.ReactNode
}

interface LegacyAccordionProps {
	items: LegacyAccordionItemProps[]
	type?: 'single' | 'multiple'
	className?: string
}

function Accordion({ items, type = 'single', className }: LegacyAccordionProps) {
	return (
		<AccordionRoot type={type} collapsible className={cn('divide-y divide-border rounded-lg border', className)}>
			{items.map(item => (
				<AccordionItem key={item.value} value={item.value} className="border-b-0 px-6">
					<AccordionTrigger className="text-base font-semibold">{item.title}</AccordionTrigger>
					<AccordionContent className="text-sm text-muted-foreground whitespace-pre-wrap">
						{item.children}
					</AccordionContent>
				</AccordionItem>
			))}
		</AccordionRoot>
	)
}

export { Accordion, AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent }
