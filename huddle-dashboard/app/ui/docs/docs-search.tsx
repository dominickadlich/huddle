"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { docSearchIndex } from "@/app/lib/docs-search-index";
import Fuse from "fuse.js";
import Link from "next/link";

export default function DocsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(docSearchIndex, {
        keys: [
          { name: "title", weight: 3 }, // Title most important
          { name: "headings", weight: 2 }, // Headings second
          { name: "description", weight: 1.5 },
          { name: "content", weight: 1 }, // Full content least weight
        ],
        threshold: 0.3,
        includeMatches: true, // For highlighting
      }),
    [],
  );

  const results = searchQuery
    ? fuse.search(searchQuery).slice(0, 5) // Top 5 results
    : [];

  return (
    <div className="relative">
      <div className="relative flex flex-1 flex-shrink-0">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
        <input
          type="text"
          placeholder="Search documentation"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(searchQuery.length > 0)}
          className="w-full rounded-2xl border border-gray-400/50 bg-gray-800/30 py-2 pl-16 pr-4 text-white placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-gray-800/50 hover:border-gray-600/50"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-400/50 bg-gray-800 shadow-xl">
          {results.map((result) => (
            <Link
              key={result.item.url}
              href={result.item.url}
              onClick={() => {
                setSearchQuery("");
                setIsOpen(false);
              }}
              className="block border-b border-gray-700 px-4 py-3 hover:bg-gray-700/50 last:border-0"
            >
              <div className="font-medium text-white">{result.item.title}</div>
              <div className="text-sm text-gray-400">
                {result.item.description}
              </div>
              <div>
                {result.item.category} • {result.item.headings.length} sections
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
