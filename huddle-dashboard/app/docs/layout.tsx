import DocsNav from "@/app/ui/docs/docs-nav";
import StaticSearch from "../ui/static-search";
import DocsSearch from "../ui/docs/docs-search";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-20">
        <div className="flex">
          <div className="text-4xl font-bold pr-4">Documentation</div>
          <div className="flex-3 justify-center">
            <DocsSearch />
          </div>
        </div>

        <div className="flex min-h-full flex-col mt-10">
          <div className="flex w-full items-start gap-x-8">
            {/* Left sidebar - Navigation */}
            <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-96 shrink-0 overflow-y-auto lg:block">
              <DocsNav />
            </aside>

            {/* Main content - The page content */}
            <main className="flex-1">
              {children} {/* This is your page.tsx content */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
