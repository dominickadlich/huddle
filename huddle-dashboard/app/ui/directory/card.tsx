import { UpdateExtension, DeleteExtension } from "./buttons";
import { fetchExtensions } from "@/app/lib/data";

export default async function ExtensionsTable({ query }: { query: string }) {
    const extensions = await fetchExtensions(query);

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {extensions.map((extension) => (
                <div key={extension.id} className="rounded-xl bg-indigo-500 p-1">
                    <div className="flex justify-between items-center rounded-xl bg-gray-100 text-black p-2 text-center text-lg">
                        <div className="flex items-center">
                            <h3 className="text-lg font-bold text-black">{extension.name}</h3>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-lg font-bold text-black">{extension.extension}</p>
                        </div>
                        <div className="flex gap-2">
                            <UpdateExtension id={extension.id} />
                            <DeleteExtension id={extension.id} />
                        </div>                   
                    </div>
                </div>
            ))}
        </div>
    );
}