import { StarIcon } from "@heroicons/react/24/outline"

export function ActivitiesCheckbox({ 
    area
}: {
    area: string
}) {
    return (
        <fieldset>
            <legend className="sr-only">Activities</legend>
            <div className="space-y-5">
                <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                    <input
                        id={area}
                        name={area}
                        type="checkbox"
                        aria-describedby={`${area}-description`}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
                    />
                    <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25"
                    >
                        <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                    </svg>
                    </div>
                </div>
                <div className="text-sm/6">
                    <label htmlFor={area} className="font-medium text-white">
                            <p> {area} </p>
                    </label>
                </div>
                </div>
            </div>
        </fieldset>
    )
}

export default function ActivitiesChecklist() {
    const areas = [
        "Bell IVRM",
        "Bell DP",
        "TPN",
        "SC",
        "CHM"
    ]

  return (
    <>
    <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <StarIcon className="h-6 w-6 text-md font-semibold text-gray-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300 transition-colors duration-300">
                PK Activities
              </h3>
            </div>
          </div>
        </div>
    
    <div className="mt-4 grid grid-cols-5 justify-items-center">
        {areas.map((area) => (
            <ActivitiesCheckbox 
                key={area} 
                area={area}
            />
        ))}
    </div>
    </div>
    </>
  )
}
