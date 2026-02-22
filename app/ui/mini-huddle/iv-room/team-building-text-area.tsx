import { FaceSmileIcon } from "@heroicons/react/24/outline";

export default function TeamBuildingTextArea({
    value,
    isEditMode,
    onChange
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
              <FaceSmileIcon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                Team Building
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
            {isEditMode
            ? (
                <textarea
                  name="team_building"
                  value={value ?? ''}
                  onChange={(e) => onChange?.(e.target.value)}
                  rows={2}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
    )
}