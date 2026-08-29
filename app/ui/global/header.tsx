import { getLocalDateFormatted } from "@/app/lib/utils/utils";
import Search, { SearchAction } from "./search";

export function DateCard() {
    const formatDate = getLocalDateFormatted()

    return (
        <h1 className="text-2xl lg:text-4xl font-bold text-white bg-transparent focus:outline-none">
            {formatDate}
        </h1>
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
}: {
    title: string;
    // census: number | null;
    // shiftlead: string | null;
    searchAction: SearchAction;
    placeholder?: string
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
    <DateCard />
  </div>
);
}