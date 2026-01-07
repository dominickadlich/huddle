import DocsNav from "../ui/docs/docs-nav"

export default function DocsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Left sidebar - Navigation */}
        <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-96 shrink-0 overflow-y-auto lg:block">
          <DocsNav />
        </aside>

        {/* Main content - The page content */}
        <main className="flex-1 mt-14">
          {children}  {/* This is your page.tsx content */}
        </main>

      </div>
    </div>
  )
}