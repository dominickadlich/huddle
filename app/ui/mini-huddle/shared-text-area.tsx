import {
  ArrowTrendingDownIcon,
  ExclamationCircleIcon,
    LightBulbIcon,
    MegaphoneIcon,
    TrophyIcon,
    WrenchScrewdriverIcon,

} from "@heroicons/react/24/outline";


const iconMap = {
  barriers: WrenchScrewdriverIcon,
  safety: ExclamationCircleIcon,
  wins: TrophyIcon,
  opportunities: ArrowTrendingDownIcon, // TODO: Remove opportunities from DB
  inventory: ArrowTrendingDownIcon
};

export function AnnouncementTextArea({
  value,
  isEditMode,
  onChange,
}: {
  value: string | null | undefined;
  isEditMode: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <>
    <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <MegaphoneIcon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                Announcements
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
            {isEditMode
            ? (
                <textarea
                  name="announcements"
                  value={value ?? ''}
                  onChange={(e) => onChange?.(e.target.value)}
                  rows={25}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white text-gray-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              )
            : (
                <p className="whitespace-pre-wrap text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                    {value ?? 'No Data'}
                </p>
              )
            }
        </div>
      </div>
    </>
  )
}

export default function SharedTextArea({
  title,
  value,
  name,
  isEditMode,
  onChange
}: {
  title: string;
  value: number | string | null | undefined;
  name: 'barriers' | 'safety' | 'wins' | 'opportunities' | 'inventory'
  isEditMode: boolean
  onChange?: (value: string) => void;
}) {
  const Icon = iconMap[name];

  return (
    <>
    <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
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
            {isEditMode
            ? (
                <textarea
                  name={name}
                  value={value ?? ''}
                  onChange={(e) => onChange?.(e.target.value)}
                  rows={2}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white text-gray-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              )
            : (
                <p className="text-base text-white whitespace-pre-wrap"> 
                    {value ?? 'No Data'}
                </p>
              )
            }
        </div>
      </div>
    </>
  );
}