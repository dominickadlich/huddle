import Search from "../ui/search";
import CardsGrid from "../ui/docs/cards-grid";
import { auth } from "../auth.config";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs Home",
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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Documentation</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search documentation..." />
      </div>
      <Suspense key={query} fallback={<div>Loading...</div>}>
        <CardsGrid query={query} />
      </Suspense>
    </div>
  );
}
