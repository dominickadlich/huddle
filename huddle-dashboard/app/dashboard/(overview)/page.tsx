import CardWrapper from "../../ui/dashboard/cards";
import CensusChart from "../../ui/dashboard/census-chart";
import LatestOpportunities from "../../ui/dashboard/latest-opportunities";
import { Suspense } from "react";
import {
  CensusChartSkeleton,
  LatestOpportunitiesSkeleton,
  CardSkeleton,
} from "../../ui/skeletons";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TextWrapper from "@/app/ui/dashboard/text-box";
import TrialTextWrapper from "@/app/ui/dashboard/trial-text-box";
import {
  CreateHuddleReport,
  UpdateHuddleReport,
} from "@/app/ui/dashboard/buttons";
import { fetchHuddleData, fetchLatestHuddleData } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Dashboard",
};



export default async function Page() {
  const huddleData = await fetchLatestHuddleData();
  const session = await auth();
  const reportDate = new Date(huddleData.date).toLocaleDateString()


  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="px-6">
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold">Huddle Dashboard - {reportDate}</h1>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <UpdateHuddleReport id={huddleData.id} />
          </div>
          <div className="flex gap-2">
            <CreateHuddleReport />
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <Suspense fallback={<p>Loading...</p>}>
          <TrialTextWrapper />
        </Suspense>
      </div>
    </main>
  );
}
