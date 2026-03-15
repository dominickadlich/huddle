import { fetchLatestCommandCenter } from "@/app/lib/data/command-center";
import { fetchLatestDailySummary } from "@/app/lib/data";
import { CommandCenter } from "@/app/lib/types/database";
import CommandCenterClient from "./command-center-page-client";

export default async function Page() {
    const commandCenterData = await fetchLatestCommandCenter();
    const dailySummary = await fetchLatestDailySummary();

    // Handle null case - show empty state or use defaults
    if (!commandCenterData) {
        return (
            <CommandCenterClient 
                initialData={{} as CommandCenter} // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}        
            />
        );
    }

    return (
        <CommandCenterClient 
            initialData={commandCenterData}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}      
        />
    )
}