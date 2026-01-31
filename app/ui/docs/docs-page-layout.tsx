"use client";

import TOC, { HeadingType } from "./table-of-contents";

export default function DocsPageLayout({
  children,
  headings,
  slug,
}: {
  children: React.ReactNode;
  headings?: HeadingType[];
  slug: string;
}) {
  return (
    <div className="flex gap-x-20 w-full">
      {/* Main content area with fixed width */}
      <div className="flex-1 max-w-4xl pb-[50vh]">{children}</div>

      {/* Right sidebar - Table of Contents */}
      <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-44 shrink-0 overflow-y-auto xl:block">
        <TOC headings={headings} slug={slug} />
      </aside>
    </div>
  );
}
