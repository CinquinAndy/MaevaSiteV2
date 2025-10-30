import type React from 'react'

export default function TutorialsPage(): React.JSX.Element {
	return (
		<div className="p-6">
			<h1 className="mb-2 mt-0 text-2xl font-semibold">Tutorials &amp; Guides</h1>
			<p className="m-0 text-sm text-neutral-500 dark:text-neutral-400">
				Learn how to use Payload, manage content, and operate the website efficiently.
			</p>

			<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
					<h3 className="mt-0 text-lg font-medium">Getting Started with Payload</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">Overview of collections, fields, and drafts.</p>
				</div>
				<div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
					<h3 className="mt-0 text-lg font-medium">Blog &amp; Media Workflow</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">
						Creating posts, uploading media, and alt text best practices.
					</p>
				</div>
				<div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
					<h3 className="mt-0 text-lg font-medium">Analytics (Umami)</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-300">Reading dashboards and key metrics to watch.</p>
					<a href="/admin" className="text-sm text-emerald-600 hover:underline">
						Back to Dashboard
					</a>
				</div>
			</div>
		</div>
	)
}
