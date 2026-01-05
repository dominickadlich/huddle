export default function DocsLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">{/* Left column area */}</aside>

        <main className="flex-1">{/* Main area */}</main>

        <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">{/* Right column area */}</aside>
      </div>
    </div>
  )
}
