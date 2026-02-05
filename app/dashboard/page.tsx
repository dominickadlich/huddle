import { Metadata } from "next";
import { Suspense } from "react";
import DailySummaryCardWrapper from "../ui/dashboard/daily-summary/daily-summary-cards-wrapper";
import { DailySummaryCardsSkeleton } from "../ui/dashboard/daily-summary/daily-summary-card-skeleton";
import { HuddleUpdateCardsSkeleton } from "../ui/dashboard/huddle-updates/huddle-update-card-skeleton";
import HuddleUpdateCardWrapper from "../ui/dashboard/huddle-updates/huddle-update-cards-wrapper";
import Header from "../ui/dashboard/header";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
    <div className="mt-15 grid grid-cols-1 lg:grid-cols-[20%_80%] gap-6">
      {/* Left panel - Daily Summary */}
      <div className="flex flex-col">
        <Header title='Daily Summary'/>
        <div className="grid gap-6 flex-1">
          {/* Cards stacked vertically */}
          <Suspense fallback={<DailySummaryCardsSkeleton />}>
            <DailySummaryCardWrapper />
          </Suspense>
        </div>
      </div>
      
      {/* Right panel - Huddle Updates */}
      <div className="flex flex-col">
        <Header title='Huddle Updates'/>
        <div className="grid gap-6 flex-1">
          {/* Cards in 2 columns */}
          <Suspense fallback={<HuddleUpdateCardsSkeleton />}>
            <HuddleUpdateCardWrapper />
          </Suspense>
        </div>
      </div>
    </div>
    </>
  );
}

