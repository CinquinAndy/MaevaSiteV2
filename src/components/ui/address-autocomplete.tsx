'use client'

import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface AddressFeature {
	properties: {
		label: string
		name: string
		postcode: string
		city: string
		street?: string
		housenumber?: string
	}
	geometry: {
		coordinates: [number, number]
	}
}

interface AddressAutocompleteProps {
	value: string
	onChange: (value: string) => void
	onSelect?: (address: AddressFeature) => void
	placeholder?: string
	className?: string
	onFocus?: () => void
	onBlur?: () => void
}

export function AddressAutocomplete({
	value,
	onChange,
	onSelect,
	placeholder,
	className,
	onFocus,
	onBlur,
}: AddressAutocompleteProps) {
	const [suggestions, setSuggestions] = useState<AddressFeature[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [debouncedValue] = useDebounce(value, 300)
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (!debouncedValue || debouncedValue.length < 3) {
				setSuggestions([])
				return
			}

			try {
				const response = await fetch(
					`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(debouncedValue)}&limit=5`
				)
				const data = await response.json()
				setSuggestions(data.features || [])
				setIsOpen(true)
			} catch (error) {
				console.error("Erreur lors de la recherche d'adresse:", error)
				setSuggestions([])
			}
		}

		fetchSuggestions()
	}, [debouncedValue])

	// Fermer le dropdown au clic extérieur
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = (suggestion: AddressFeature) => {
		onChange(suggestion.properties.label)
		setIsOpen(false)
		onSelect?.(suggestion)
	}

	return (
		<div ref={wrapperRef} className="relative">
			<input
				type="text"
				value={value}
				onChange={e => onChange(e.target.value)}
				onFocus={() => {
					onFocus?.()
					if (suggestions.length > 0) setIsOpen(true)
				}}
				onBlur={onBlur}
				placeholder={placeholder}
				className={className}
				autoComplete="off"
			/>

			{isOpen && suggestions.length > 0 && (
				<div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
					{suggestions.map(suggestion => (
						<button
							key={suggestion.properties.label}
							type="button"
							onClick={() => handleSelect(suggestion)}
							className="w-full text-left px-4 py-3 hover:bg-muted transition-colors focus:outline-none focus:bg-muted"
						>
							<div className="text-sm font-medium text-foreground">{suggestion.properties.name}</div>
							<div className="text-xs text-muted-foreground">
								{suggestion.properties.postcode} {suggestion.properties.city}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
