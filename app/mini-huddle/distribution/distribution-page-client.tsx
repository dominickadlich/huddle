'use client'

import { Distribution } from "@/app/lib/types/database";
import GenerateSummary from "@/app/ui/mini-huddle/generate-summary";
import Header from "@/app/ui/global/header";
import DistributionCard from "@/app/ui/mini-huddle/distribution/distribution-card";
import SharedTextArea, { AnnouncementTextArea } from "@/app/ui/mini-huddle/shared-text-area";
import { useState } from "react"
import { upsertDistribution } from "@/app/lib/actions/distribution";
import { useRouter } from "next/navigation";
import { getCurrentShift, getLocalDate } from "@/app/lib/utils";

const distributionCardFields = [
  { key: 'hot_spots', title: 'Hot Spots' },
  { key: 'ca_tpn', title: 'CA TPNs' },
  { key: 'hc_tpn', title: 'HC TPNs' },
] as const;

const ivRoomTextAreaFields = [
    { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
    { key: 'barriers', title: 'Barriers (Missing or Failing Equipment, Supplies, etc.)' },
    { key: 'wins', title: 'Team Wins & Recognition'},
    { key: 'opportunities', title: 'Opportunities'},
] as const;

export default function DistributionPageClient({ 
    initialData,
    census,
    shiftLead
}: {
    initialData: Distribution;
    census: number | null;
    shiftLead: string | null;
}) {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFields] = useState(initialData || {})
    const [showSummaryModal, setShowSummaryModal] = useState(false);

    return (
        <div className="mt-20">
        <Header title="Distribution Dashboard" census={census} shiftlead={shiftLead}/>
        <div className="mt-10 lg:grid grid-cols-[20%_1fr] gap-6">
            <div>
                <AnnouncementTextArea 
                    value={fields.announcements}
                    isEditMode={isEditMode}
                    onChange={(val) => setFields({...fields, announcements: val})}
                />
            </div>

            <div>
                
                   <div className="flex gap-4 mb-4">
                    <button onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </button>
                    <button onClick={() => setShowSummaryModal(true)}>
                        Submit
                    </button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {distributionCardFields.map(({ key, title }) => (
                        <DistributionCard 
                            key={key}
                            title={title}
                            value={fields[key]}
                            type={key}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({...fields, [key]: val})}       
                        />
                    ))}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {ivRoomTextAreaFields.map(({ key, title }) => (
                        <SharedTextArea 
                            key={key}
                            name={key}
                            title={title}
                            value={fields[key]}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({...fields, [key]: val})}  
                        />
                    ))}
                </div>
        

        <GenerateSummary 
            fields={fields}
            open={showSummaryModal}
            onClose={() => setShowSummaryModal(false)}
            onSave={async (summary) => {
                const localDate = getLocalDate()
                const currentShift = getCurrentShift(); // Make sure this is imported!
                
                const dataToSave = {
                    ...fields,
                    summary_text: summary,
                    date: localDate,
                    shift: currentShift,
                };

                const result = await upsertDistribution(dataToSave)

                if (result.success) {
                    setShowSummaryModal(false);
                    setIsEditMode(false);
                    router.push('/dashboard');  // ← Use router.push, not redirect
                    router.refresh();  // ← Refresh to see new data
                } else {
                    alert(result.message);  // ← Show error to user
                }
            }}
        />
        </div>
            </div>
        </div>
    )
}