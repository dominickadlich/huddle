import Card from "./cards";
import { fetchSections } from "@/app/lib/data";

interface CardsGridProps {
    query: string;
}

export default async function CardsGrid({ query }: CardsGridProps) {
    const sections = await fetchSections(query)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {sections.map((section) => (
                <Card
                    key={section.id}
                    title={section.title}
                    description={section.description}
                    icon={section.icon}
                    category={section.category}
                    content={section.cont}
                    slug={section.slug}
                />
            ))}
            
            {sections.length === 0 && query && (
                <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No documentation found for "{query}"</p>
                </div>
            )}
        </div>
    );
}