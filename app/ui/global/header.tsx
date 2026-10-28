import { getLocalDateFormatted } from "@/app/lib/utils/utils";
import Search, { SearchAction } from "./search";
import InfoPopover from "./info-popover";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export function DateCard({ calendar }: { calendar?: ReactNode }) {
    const formatDate = getLocalDateFormatted()

    // Pages that don't pass a calendar keep the plain date
    if (!calendar) {
        return (
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
                {formatDate}
            </h1>
        )
    }

    return (
        <InfoPopover
            panelWidth="w-[26rem]"
            buttonClassName="inline-flex items-center gap-3 rounded-lg px-2 py-1 text-2xl lg:text-4xl font-bold text-white transition hover:bg-gray-700/40 focus:outline-none data-focus:ring-2 data-focus:ring-indigo-500 data-open:bg-gray-700/40"
            trigger={
                <>
                    <span>{formatDate}</span>
                    <CalendarDaysIcon className="size-6 lg:size-8 text-indigo-300" aria-hidden="true" />
                </>
            }
        >
            {calendar}
        </InfoPopover>
    )
}

export function ShiftLeadCard({
    shiftlead
}: {
    shiftlead: string | null
}) {
    return (
        <div className="flex items-center gap-2">
        <span className="text-gray-400 text-xl lg:text-3xl">Shift Lead:</span>
        <span className="text-xl lg:text-3xl text-white">
            {shiftlead ?? 'N/A'}
        </span>
        </div>
    )
}

export function CensusCard({
    census
}: {
    census: number | null
}) {
    return (
        <div className="flex items-center gap-2">
        <span className="text-gray-400 text-xl lg:text-3xl">Census:</span>
        <span className="text-xl lg:text-3xl text-white">
            {census ?? 'N/A'}
        </span>
        </div>
    )
}

export default function Header({
    title,
    // census,
    // shiftlead,
    searchAction,
    placeholder,
    calendar,
}: {
    title: string;
    // census: number | null;
    // shiftlead: string | null;
    searchAction: SearchAction;
    placeholder?: string;
    calendar?: ReactNode;
}) {
    return (
  <div className="lg:flex justify-between items-center pb-6 mb-8 border-b-2 border-indigo-500/30">
    {/* Left */}
    <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>
    
    {/* Center - grouped metrics with divider */}
    {/* <div className="flex flex-col lg:flex-row gap-2 mt-2 mb-2 lg:gap-8">
      <CensusCard census={census} />
      <ShiftLeadCard shiftlead={shiftlead} />
    </div> */}

    <Search searchAction={searchAction} placeholder={placeholder}/>
    
    {/* Right */}
    <DateCard calendar={calendar} />
  </div>
);
}