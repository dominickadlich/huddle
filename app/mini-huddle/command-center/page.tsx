import { fetchLatestCommandCenter } from "@/app/lib/data/command-center";
import { fetchLatestDailySummary } from "@/app/lib/data";
import CommandCenterPageClient from "./command-center-page-client";
import { CommandCenter } from "@/app/lib/types/database";

export default async function Page() {
    const commandCenterData = await fetchLatestCommandCenter();
    const dailySummary = await fetchLatestDailySummary();

    // Handle null case - show empty state or use defaults
    if (!commandCenterData) {
        return (
            <CommandCenterPageClient 
                initialData={{} as CommandCenter}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
            />
        );
    }

    return (
        <CommandCenterPageClient 
            initialData={commandCenterData} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
        />
    )
}