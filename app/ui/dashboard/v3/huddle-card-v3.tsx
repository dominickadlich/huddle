import { ArrowTrendingDownIcon, ExclamationCircleIcon, TrophyIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

interface HuddleRow {
    department: string;
    safety: string;
    barriers: string;
    inventory: string;
    wins: string
}

export interface TransposedOutput {
    safety: { department: string; text: string}[];
    barriers: { department: string; text: string}[];
    inventory: { department: string; text: string}[];
    wins: { department: string; text: string}[];
}

const iconMap: Record<string, HeroIcon> = {
  barriers: WrenchScrewdriverIcon,
  safety: ExclamationCircleIcon,
  inventory: ArrowTrendingDownIcon,
  wins: TrophyIcon,
};

export const CATEGORIES = ['safety', 'barriers', 'inventory', 'wins'] as const

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
 
export function transposeLoop({ 
    data
}: {
    data: HuddleRow[] 
}) {
    const result: Partial<TransposedOutput> = {}

    data.forEach((row) => {
        CATEGORIES.forEach((category) => {
            if (row[category]) {
                result[category] ??= []
                result[category].push({ department: row.department, text: row[category] })
            }
        })
    })
    
    return result;
}


export type HeroIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function CategoryCard({
  title,
  findings,
//   name
}: {
  title: string;
  findings: {department: string, text: string}[],
//   name: string
}) {
  const Icon = iconMap[title];

  return (
    <>
    <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <Icon className="h-6 w-6 text-md font-semibold text-gray-300  transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300  transition-colors duration-300">
                {capitalize(title)}
              </h3>
            </div>
          </div>
        </div>

         {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
            <div className="text-gray-200 w-full">
                {findings.length !== 0
                    ? findings.map((finding) => (
                        <p key={finding.department} className="leading-relaxed whitespace-pre-wrap mb-4">
                            <span className="font-bold underline underline-offset-2 text-gray-100">{`${finding.department}:`}</span>
                            {' '}
                            {finding.text}
                        </p>
                    ))
                    : <p>Nothing reported today!</p>}
                </div>
            </div>
        </div>
    </>
  );
}