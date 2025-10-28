import Search from "../ui/search";
import Link from "next/link";
import ExtensionsTable from "../ui/directory/card";
import { Suspense } from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { PlusIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Directory",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const session = await auth();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  return (
    <div className="w-full">
      {/* Page Header with Gradient Title */}
      <div className="mt-20 flex w-full items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Directory
        </h1>
      </div>

      {/* Search Bar + Create Button */}
      <div className="mt-10 flex items-center justify-between gap-4 mb-6">
        <Search placeholder="Search Extensions..." />

        {/* Create Extension Button */}
        <Link
          href="/directory/create"
          className="group flex items-center gap-2 px-3.5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105 whitespace-nowrap"
        >
          <PlusIcon className="h-5 w-5" />
        </Link>
      </div>

      {/* Extensions Table */}
      <Suspense
        key={query}
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
        <ExtensionsTable query={query} />
      </Suspense>
    </div>
  );
}
