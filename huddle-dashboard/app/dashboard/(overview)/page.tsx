import CardWrapper from "../../ui/dashboard/cards";
import CensusChart from "../../ui/dashboard/census-chart";
import LatestOpportunities from "../../ui/dashboard/latest-opportunities";
import { Suspense } from "react";
import { 
    CensusChartSkeleton,
    LatestOpportunitiesSkeleton,
    CardSkeleton
 } from "../../ui/skeletons";
import { Metadata } from "next"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TextWrapper from "@/app/ui/dashboard/text-box";
import { CreateExtension } from "@/app/ui/dashboard/buttons";

export const metadata: Metadata = {
    title: 'Dashboard'
}


export default async function Page() {
    const session = await auth()
  
    if (!session?.user) {
        redirect('/login')
    }

    return (
        <main className="px-6">
            <div className="flex justify-between items-center mt-10">
                <h1 className="text-2xl font-bold">Huddle Dashboard</h1>
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        <CreateExtension />
                    </div>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg">
                        Update Current
                    </button>
                </div>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <TextWrapper />
                </Suspense>
            </div>
        </main>
    );
}