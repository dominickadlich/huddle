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
                  className="w-full p-2 text-white bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                />
              )
            : (
                <p className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                    {value ?? 'No Data'}
                </p>
              )
            }
        </div>
      </div>
    </>
    )
}