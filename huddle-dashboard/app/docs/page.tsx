import Search from "../ui/search";
import Card from "../ui/docs/cards";
import { fetchSections } from "../lib/data";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const sections = await fetchSections(query);

    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search documentation..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  header={section.title}
                  body={section.content}
                  icon={section.icon}
                  category={section.category}
                  href={section.slug}
                />
              ))}
            </div>
        </div>
    );
}