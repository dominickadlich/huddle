import { UpdateExtension, DeleteExtension } from "./buttons";
import { fetchExtensions } from "@/app/lib/data";
import { ClockIcon } from "@heroicons/react/24/outline";

export default async function ExtensionsTable({ query }: { query: string }) {
  const extensions = await fetchExtensions(query);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {extensions.map((extension) => (
        <div 
          key={extension.id} 
          className="group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
        >

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10 flex items-center p-4 gap-4">

            {/* Name Section */}
            <div className="flex items-center justify-start w-60 px-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 truncate">
                {extension.name}
              </h3>
            </div>


            {/* Divider */}
             <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />

            {/* Extension Number */}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                {extension.extension}
              </p>
            </div>


            {/* Divider */}
             <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />


            {/* Hours Section */}
            <div className="flex-1 flex items-center justify-center gap-2">
              {/* <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300"> */}
                <ClockIcon className="h-4 w-4 text-white" />
              {/* </div> */}
              <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                {extension.hours}
              </p>
            </div>


            {/* Divider */}
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />

            {/* Action Buttons */}
            <div className="flex gap-2 pl-2">
              <UpdateExtension id={extension.id} />
              <DeleteExtension id={extension.id} />
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}
