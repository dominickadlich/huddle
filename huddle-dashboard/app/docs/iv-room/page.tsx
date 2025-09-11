import { fetchSectionBySlug } from "../../lib/data";
import { notFound } from "next/navigation";

export default async function SectionPage({ params }: { params: { slug: string } }) {
  const section = await fetchSectionBySlug(params.slug);
  
  if (!section) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {section.icon && <span className="text-3xl">{section.icon}</span>}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{section.title}</h1>
            <p className="text-gray-500">{section.category}</p>
          </div>
        </div>
      </div>
      
      <div className="prose max-w-none">
        {section.content}
      </div>
    </div>
  );
}