import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
	label: string
	href: string
}

interface BreadcrumbProps {
	items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav aria-label="Breadcrumb" className="flex">
			<ol className="flex items-center space-x-2">
				{items.map((item, index) => (
					<li key={item.href} className="flex items-center">
						{index > 0 && <ChevronRight aria-hidden="true" className="size-4 flex-shrink-0 text-gray-400 mx-2" />}
						{index === items.length - 1 ? (
							<span className="text-sm font-medium text-gray-500" aria-current="page">
								{item.label}
							</span>
						) : (
							<Link
								href={item.href}
								className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors duration-200"
							>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}
