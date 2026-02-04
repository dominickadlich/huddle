"use client";

import { directory } from "@/app/lib/script-docs/phone-directory";
import { SetStateAction, Suspense, useMemo, useState } from "react";
import Fuse from "fuse.js";
import StaticSearch from "../static-search";

export default function DirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(directory, {
        keys: ["location", "phone", "category"],
        threshold: 0.3,
      }),
    [directory],
  );

  function handleSearchQuery(e: { target: { value: SetStateAction<string> } }) {
    setSearchQuery(e.target.value);
  }

  const displayedNumber = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : directory;

  const groupedExtensions = useMemo(() => {
    const grouped = displayedNumber.reduce(
      (acc, extension) => {
        const category = extension.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(extension);
        return acc;
      },
      {} as Record<string, typeof directory>,
    );

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [displayedNumber]);

  return (
    <>
      <div className="mt-20">
        <div className="flex">
          <div className="flex justify-start text-4xl font-bold pr-4">
            Directory
          </div>
          <div className="flex-3 justify-center">
            <StaticSearch
              placeholder={"Enter a location, phone number, or category"}
              onChange={handleSearchQuery}
              value={searchQuery}
            />
          </div>
        </div>

        <Suspense
          key={searchQuery}
          fallback={
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loading skeleton */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-4 h-20 animate-pulse"
                >
                  <div className="h-full bg-gray-700/30 rounded-lg" />
                </div>
              ))}
            </div>
          }
        >
          <div className="mt-6 space-y-10">
            {groupedExtensions.map(([category, extensions]) => (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-4 flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-indigo-400">
                    {category}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
                  <span>
                    {extensions.length}{" "}
                    {extensions.length === 1 ? "extension" : "extensions"}
                  </span>
                </div>

                {/* Extensions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {extensions.map((extension) => (
                    <div
                      key={extension.phone + extension.category}
                      className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10 flex items-center pl-2">
                        {/* Name Section */}
                        <div className="flex items-center justify-start w-90 px-3">
                          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 truncate">
                            {extension.location}
                          </h3>
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />

                        {/* Extension Number */}
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                            {extension.phone}
                          </p>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
}
