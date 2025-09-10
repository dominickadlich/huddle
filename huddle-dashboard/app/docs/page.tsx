import Search from "../ui/search";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || '';

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1>Documentation</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search documentation..." />
            </div>
        </div>
    );
}