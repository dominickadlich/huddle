
import { Metadata } from "next";
import DailySummaryCardWrapper from "../ui/dashboard/daily-summary/daily-summary-cards-wrapper";
import { DailySummaryCardsSkeleton } from "../ui/dashboard/daily-summary/daily-summary-card-skeleton";
import { Suspense } from "react";
import { HuddleUpdateCardsSkeleton } from "../ui/dashboard/huddle-updates/huddle-update-card-skeleton";
// import HuddleUpdateCardWrapper from "../ui/dashboard/huddle-updates/huddle-update-cards-wrapper";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <div className="mt-20 grid gap-6 lg:grid-cols-4">
        <Suspense fallback={<DailySummaryCardsSkeleton />}>
          <DailySummaryCardWrapper />
        </Suspense>
      </div>
        {/* <Suspense fallback={<HuddleUpdateCardsSkeleton />}>
          <HuddleUpdateCardWrapper />
        </Suspense> */}
    </>
  );
}

