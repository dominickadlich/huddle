import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { FileData } from '@/app/lib/definitions'
import Link from "next/link"
import DocsNavClient from './docs-nav-client'

export default async function DocsNav() {
    const docs = await getDocsForCategory('iv-room')

    return (
        <DocsNavClient docs={docs}/>
    )
}

async function getDocsForCategory(category: string) {
    // Read files from content/docs/{category}
    const docsDir = path.join(
        process.cwd(),
        'content',
        'docs',
        `${category}`
    );

    const files = fs.readdirSync(docsDir);

    const fileData: FileData[] = files.map((file) => {
        const slug = path.basename(file, '.mdx')
        const filePath = path.join(docsDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const {data} = matter(fileContent)

        return {
            slug,
            title: data.title,
            category: data.category 
        }
    });

    return fileData
}