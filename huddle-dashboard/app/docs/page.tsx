import { Metadata } from "next";
import DocsNav from "../ui/docs/docs-nav";
import TOC from "../ui/docs/table-of-contents";

export const metadata: Metadata = {
  title: "Docs",
};

export default async function Page() {
  const homeHeadings = [
    { text: 'Getting Started', id: 'getting-started' },
    { text: 'Categories', id: 'categories' },
    { text: 'Purpose & Outcomes', id: 'purpose-outcomes' }
  ]

  return (
    <div className="flex gap-8">
      <div className="prose prose-invert max-w-none">
        <h1>Pharmacy Operations Documentation</h1>
          <p className="text-xl text-gray-300">
            Quick access to protocols, procedures, and guidelines for pharmacy operations.
          </p>
        
        <div className="mt-8">
          <h2 id="getting-started">Getting Started</h2>
            <p>
              Use the navigation panel on the left to browse documentation by department. 
              All protocols are searchable and include step-by-step procedures.
            </p>
        </div>

        <div className="mt-8">
          <h2 id="categories">Categories</h2>
            <ul>
              <li><strong>IV Room:</strong> Aseptic technique, compounding procedures, and NICU protocols</li>
              <li><strong>Central Pharmacy:</strong> Medication verification and controlled substances (coming soon)</li>
            </ul>
        </div>
        
        <div>
          <h2 id="purpose-outcomes">Purpose & Outcomes</h2>
          <ul>
            <li>Help practitioners provide excellent pharmaceutical care, ensure patient safety, and standardize sterile compounding practices.</li>
            <li>Promote positive patient outcomes, by ensuring consistent services and continuity between pharmacists and technicians.</li>
          </ul>
        </div>
      </div>

      <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-96 shrink-0 overflow-y-auto xl:block">
        <TOC headings={homeHeadings} slug="" />
      </aside>
    </div>
  );
}
