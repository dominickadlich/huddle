import Search from "../ui/search";
import { CreateExtension } from "../ui/directory/buttons";
import { DirectorySkeleton } from "../ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Card from "../ui/directory/card";


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

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="px-6">
      <div className="flex mt-10">
        <div className="flex justify-between items-center w-full items-center">
          <h1 className="text-2xl font-bold"> Directory </h1>
          <div className="flex gap-2">
            <CreateExtension />
          </div>
        </div>
      </div>
      <div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Extensions..." />
        </div>
        <Suspense key={query} fallback={<DirectorySkeleton />}>
          <Card query={query} />
        </Suspense>
      </div>
    </main>
  );
}
