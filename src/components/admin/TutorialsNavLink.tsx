'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

export default function TutorialsNavLink(): React.JSX.Element {
	const [isLoading, setIsLoading] = useState(true)
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		if (typeof document === 'undefined') return 'light'
		const attr = document.documentElement.getAttribute('data-theme')
		return (attr as 'light' | 'dark') || 'light'
	})

	useEffect(() => {
		if (typeof document === 'undefined') return
		const el = document.documentElement
		const update = () => {
			const attr = el.getAttribute('data-theme')
			setTheme((attr as 'light' | 'dark') || 'light')
		}
		const observer = new MutationObserver(update)
		observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
		// initialize in case current value differs
		update()
		setIsLoading(false)
		return () => observer.disconnect()
	}, [])

	const linkClassName =
		theme === 'dark' ? 'text-base text-white hover:underline' : 'text-base text-black hover:underline'

	return (
		<div>
			{isLoading ? (
				<div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
			) : (
				<a href="/tuto" className={linkClassName}>
					Tutorials
				</a>
			)}
		</div>
	)
}
