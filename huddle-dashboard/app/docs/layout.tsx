import DocsNav from "../ui/docs/docs-nav"

export default function DocsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-20 flex min-h-full flex-col border">
      <div className="mx-auto flex w-full items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Left sidebar - Navigation */}
        <aside className="sticky top-8 hidden w-96 shrink-0 lg:block border">
          <DocsNav />
        </aside>

        {/* Main content - The page content */}
        <main className="flex-1 border">
          {children}  {/* This is your page.tsx content */}
        </main>

        {/* Right sidebar - Table of Contents */}
        <aside className="sticky top-8 hidden w-44 shrink-0 xl:block">
          {/* TODO: TableOfContents component will go here */}
        </aside>
        
      </div>
    </div>
  )
}