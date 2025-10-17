import { type ClassValue, clsx } from 'clsx'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Parse text and convert literal \n into React <br/> elements
 * Useful for textarea fields from Payload CMS that may contain line breaks
 */
export function parseLineBreaks(text: string): React.ReactNode[] {
	const parts = text.split('\\n')
	return parts.map((part, i) => (
		<span key={`${part.slice(0, 50)}-${i}`}>
			{part}
			{i < parts.length - 1 && <br />}
		</span>
	))
}
