import Image from "next/image";
import { UpdateExtension, DeleteExtension } from "./buttons";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredExtensions } from "@/app/lib/data";

export default async function ExtensionsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const extensions = await fetchFilteredExtensions(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {extensions?.map((extension) => {
                            <div
                                key={extension.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p>{extension.name}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}