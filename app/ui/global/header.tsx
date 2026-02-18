import { format } from "date-fns";

export function DateCard() {
    const formatDate = format(new Date(), 'MM/dd/yy')

    return (
        <h1 className="text-4xl font-bold text-white bg-transparent focus:outline-none">
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
        <span className="text-gray-400 text-4xl">Shift Lead:</span>
        <span className="text-3xl text-white">
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
        <span className="text-gray-400 text-4xl">Census:</span>
        <span className="text-3xl text-white">
            {census ?? 'N/A'}
        </span>
        </div>
    )
}

export default function Header({
    title,
    census,
    shiftlead
}: {
    title: string;
    census: number | null;
    shiftlead: string | null;
}) {
    return (
  <div className="flex justify-between items-center pb-6 mb-8 border-b-2 border-indigo-500/30">
    {/* Left */}
    <h1 className="text-4xl font-bold">{title}</h1>
    
    {/* Center - grouped metrics with divider */}
    <div className="flex gap-8">
      <CensusCard census={census} />
      <div className="pl-8">  {/* Padding on second item */}
        <ShiftLeadCard shiftlead={shiftlead} />
      </div>
    </div>
    
    {/* Right */}
    <DateCard />
  </div>
);
}