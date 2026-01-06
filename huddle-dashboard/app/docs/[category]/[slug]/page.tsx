import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

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
    .use(rehypeStringify)
  
  const htmlContent = await processor.process(content)
  
  return (
    <div className="prose max-w-none prose-invert">
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent.value }} 
      />
    </div>
  )
}