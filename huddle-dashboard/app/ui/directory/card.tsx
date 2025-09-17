import { UpdateExtension, DeleteExtension } from "./buttons";
import { fetchExtensions } from "@/app/lib/data";
import { ClockIcon } from "@heroicons/react/24/outline";

export default async function ExtensionsTable({ query }: { query: string }) {
  const extensions = await fetchExtensions(query);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {extensions.map((extension) => (
        <div key={extension.id} className="rounded-xl bg-indigo-500 p-1">
          <div className="flex justify-between items-center rounded-xl bg-gray-200 text-black p-3 text-center text-lg">
            <div className="flex justify-center items-center w-42 px-1">
              <h3 className="text-xl text-black">{extension.name}</h3>
            </div>
            <div className="flex-1 p-4 text-center border-l-2">
              <p className="text-xl text-black">{extension.extension}</p>
            </div>
            <div className="flex-1 p-4 text-center border-l-2">
              <p className="text-xl text-black">{extension.hours}</p>
            </div>
            <div className="flex gap-2 px-4">
              <UpdateExtension id={extension.id} />
              <DeleteExtension id={extension.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
