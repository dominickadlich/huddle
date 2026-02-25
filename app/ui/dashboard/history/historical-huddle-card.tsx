import {
  ArrowsPointingOutIcon,
  LockClosedIcon,
  BeakerIcon,
  EyeDropperIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";


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
}: {
  title: string;
  value: number | string | null | undefined;
  type: "distribution" | "csr" | "ivr" | "nonsterile" | "rx_leadership";
}) {
  const Icon = iconMap[type];

  return (
    <>
    <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
        {/* Content */}
        <div className="relative z-10">
          {/* Header with Icon */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <Icon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
            <p className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
              {value}
            </p>
        </div>
      </div>
    </>
  );
}
