"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SetStateAction } from "react";

export default function StaticSearch({ 
    placeholder,
    onChange,
    value,
}: { 
    placeholder: string,
    onChange: (e: { target: { value: SetStateAction<string>; }; }) => void
    value: string,
}) {

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {/* Search Icon */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
      </div>

      {/* Search Input */}
      <input
        id="search"
        className="peer block w-full rounded-2xl border border-gray-400/50 bg-gray-800/30 py-2 pl-16 pr-4 text-white placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-gray-800/50 hover:border-gray-600/50"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
