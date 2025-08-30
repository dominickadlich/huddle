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
        <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                       Site 
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Extension
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {extensions?.map((extension) => (
                    <tr 
                        key={extension.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                                <p>{extension.name}</p>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            {extension.extension}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <div className="flex justify-end gap-3">
                                <UpdateExtension id={extension.id}/>
                                <DeleteExtension id={extension.id}/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}