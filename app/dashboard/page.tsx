import { Metadata } from "next";
import { Suspense } from "react";
import DailySummaryCardWrapper from "../ui/dashboard/daily-summary/daily-summary-cards-wrapper";
import { DailySummaryCardsSkeleton } from "../ui/dashboard/daily-summary/daily-summary-card-skeleton";
import { HuddleUpdateCardsSkeleton } from "../ui/dashboard/huddle-updates/huddle-update-card-skeleton";
import HuddleUpdateCardWrapper from "../ui/dashboard/huddle-updates/huddle-update-cards-wrapper";
import { DateCard } from "../ui/global/header";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <div className="mt-20">
      <div className="flex justify-between items-center pb-6 mb-8 border-b-2 border-indigo-500/30">
          {/* Left */}
          <h1 className="text-4xl font-bold">Huddle Dashboard</h1>
          
          {/* Right */}
          <DateCard />
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-6">
        {/* Left panel - Daily Summary */}
        <div className="flex flex-col">
          <div className="grid gap-6 flex-1">
            {/* Cards stacked vertically */}
            <Suspense fallback={<DailySummaryCardsSkeleton />}>
              <DailySummaryCardWrapper />
            </Suspense>
          </div>
        </div>

        {/* Right panel - Huddle Updates */}
        <div className="flex flex-col">
          <div className="grid gap-6 flex-1">
            {/* Cards in 2 columns */}
            <Suspense fallback={<HuddleUpdateCardsSkeleton />}>
              <HuddleUpdateCardWrapper />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
