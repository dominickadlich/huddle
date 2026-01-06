'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { FileData } from '@/app/lib/definitions'

export default function DocsNavClient({ docs }: { docs: FileData[] }) {
   const pathname = usePathname()
   
   return (
    <ul className="list-none space-y-2">
            {docs.map((doc) => (
                <li key={`${doc.category}/${doc.slug}`}>
                <Link
                    href={`/docs/iv-room/${doc.slug}`}
                    className={ pathname === `/docs/iv-room/${doc.slug}`
                        ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                    }
                >
                    {doc.title}
                </Link>
                </li>
            ))}
        </ul>
   )
}