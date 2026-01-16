import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type DocSearchItem = {
    title: string
    description: string
    category: string
    slug: string
    content: string
    headings: string[]
    url: string
}

function getAllMarkdownFiles(dir: string, category: string): DocSearchItem[] {
    const items: DocSearchItem[] = []
    const files = fs.readdirSync(dir)

    for (const file of files) {
        if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue

        const filePath = path.join(dir, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)

        // Extract headings from markdown
        const headings = content.match(/^##\s+(.+)$/gm)?.map(h => h.replace(/^##\s+/, '')) || []

        const slug = path.basename(file, path.extname(file))

        items.push({
            title: data.title || slug,
            description: data.description || '',
            category,
            slug,
            content,
            headings,
            url: `/docs/${category}/${slug}`
        })
    }

    return items
}


// Read all docs from all categories
const docsDir = path.join(process.cwd(), 'content', 'docs')
const categories = fs.readdirSync(docsDir)

const allDocs: DocSearchItem[] = []

for (const category of categories) {
    const categoryPath = path.join(docsDir, category)
    if (fs.statSync(categoryPath).isDirectory()) {
        const docs = getAllMarkdownFiles(categoryPath, category)
        allDocs.push(...docs)
    }
}


const tsContent = `
// Auto-generated from markdown files
// Do not edit manually - run pnpm run parse-docs-index to regenerate

export type DocSearchItem = {
    title: string
    description: string
    category: string
    slug: string
    content: string
    headings: string[]
    url: string
}

export const docSearchIndex: DocSearchItem[] = ${JSON.stringify(allDocs, null, 2)}
`

const outputPath = path.join(process.cwd(), 'app', 'lib', 'docs-search-index.ts')
fs.writeFileSync(outputPath, tsContent, 'utf-8')

console.log(`✅ Generated ${outputPath}`)
console.log(`📊 Total docs: ${allDocs.length}`)