import {
  ArrowsPointingOutIcon,
  LockClosedIcon,
  BeakerIcon,
  EyeDropperIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { highlightMatch } from "@/app/lib/utils/highlight";


const iconMap = {
  distribution: ArrowsPointingOutIcon,
  csr: LockClosedIcon,
  ivr: BeakerIcon,
  nonsterile: EyeDropperIcon,
  rx_leadership: PresentationChartLineIcon,
};

export default function HistoricalHuddleCard({
  title,
  value,
  type,
  query
}: {
  title: string;
  value: number | string | null | undefined;
  type: "distribution" | "csr" | "ivr" | "nonsterile" | "rx_leadership";
  query: string
}) {
  const Icon = iconMap[type];

  return (
    <>
    <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6 transition-all duration-300">
        {/* Content */}
        <div className="relative z-10">
          {/* Header with Icon */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <Icon className="h-6 w-6 text-md font-semibold text-gray-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300 transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="text-gray-200 w-full">
                  {value
                    ? String(value).split('\n').map((line, i) => {
                        const colonIndex = line.indexOf(':');
                        return (
                          <p key={i} className={i > 0 ? 'mt-4' : ''}>
                            {colonIndex !== -1 ? (
                              <>
                                <span className="font-bold underline underline-offset-2 text-gray-100">{line.slice(0, colonIndex + 1)}</span>
                                {highlightMatch(line.slice(colonIndex + 1), query)}
                              </>
                            ) : highlightMatch(line, query)}
                          </p>
                        );
                      })
                    : <p>No Data</p>
                  }
                </div>
      </div>
    </>
  );
}
