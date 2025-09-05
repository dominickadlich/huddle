import Pagination from "../ui/directory/pagination"
import Search from "../ui/search"
import Table from "../ui/directory/table"
import { CreateExtension } from "../ui/directory/buttons"
import { ExtensionsTableSkeleton } from "../ui/skeletons"
import { fetchExtensionsPages } from "../lib/data"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Directory'
}



export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchExtensionsPages(query);

    return (
        <>
        <div className="w-full">
            <div className="flex w-full items-center jusify-between">
                <h1>
                    Extensions
                </h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Extensions..." />
                <CreateExtension />
            </div>
            <Suspense key={ query + currentPage} fallback={<ExtensionsTableSkeleton />}>
                <Table 
                    query={query}
                    currentPage={currentPage}
                />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                { <Pagination totalPages={totalPages}/>}
            </div>
        </div>
        </>
    )
}