import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import TOC from '@/app/ui/docs/table-of-contents'
import rehypeSlug from 'rehype-slug'
import DocsPageLayout from '@/app/ui/docs/docs-page-layout'

export default async function Page(props: {
  params: Promise<{ category: string, slug: string }>
}) {
  const params = await props.params

  // Build the full file path
  const filePath = path.join(
    process.cwd(),
    'content',
    'docs',
    params.category,
    `${params.slug}.mdx`
  )

  // Read the file
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  // Parse frontmatter
  const { data, content } = matter(fileContent)

  // Process markdown to HTML
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)

  const htmlContent = await processor.process(content)

  // Extract headings from the current pages markdown
  const headings = content.match(/^## (.+)$/gm)?.map(h => h.replace('## ', ''))

  // Generate ID's for each heading
  const headingList = headings?.map((heading) => {
    const headingId = heading
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters including parentheses
      .replace(/\s+/g, '-') // Replace spaces with hyphens

    return {
      text: heading,
      id: headingId
    }
  })

  return (
    <DocsPageLayout
      headings={headingList}
      slug={params.slug}
    >
      <div className="prose max-w-none prose-invert">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent.value }}
        />
      </div>
    </DocsPageLayout>
  )
}