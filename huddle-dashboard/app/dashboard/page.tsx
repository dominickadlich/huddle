import CardWrapper from "../ui/dashboard/cards";
import CensusChart from "../ui/dashboard/census-chart";
import LatestOpportunities from "../ui/dashboard/latest-opportunities";
import { Suspense } from "react";
import { 
    CensusChartSkeleton,
    LatestOpportunitiesSkeleton,
    CardSkeleton
 } from "../ui/skeletons";


export default async function Page() {

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<CensusChartSkeleton />}>
                    <CensusChart />
                </Suspense>
                <Suspense fallback={<LatestOpportunitiesSkeleton />}>
                    <LatestOpportunities />
                </Suspense>
            </div>
        </main>
    );
}