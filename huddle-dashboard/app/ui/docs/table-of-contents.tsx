'use client'

import { usePathname } from "next/navigation"

export type HeadingType = {
    text: string,
    id: string
}

export default function TOC({
    headings,
    slug
}: {
    headings?: HeadingType[]
    slug: string
}) {
    const pathname = usePathname()

    if (!headings || headings.length === 0) {
        return null
    }

    return (
        <nav>
            <ul className="list-none space-y-4">
            {headings.map((heading) => (
                <li key={heading.id}>
                <a 
                    href={`#${heading.id}`}
                    className={ pathname === `/docs/iv-room/${slug}#${heading.id}`
                        ? 'bg-gray-50 text-indigo-600 bg-white/5 text-white'
                        : 'text-gray-100 hover:bg-gray-50 hover:text-indigo-600 text-gray-400 hover:bg-white/5 hover:text-white'
                    }
                    >
                    {heading.text}
                </a>
                </li>
            ))}
            </ul>
        </nav>
    )
}