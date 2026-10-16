import { displayValue } from "./shared-text-area";

export type HeroIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function TeamHuddleCard({
  title,
  value,
  type,
  iconMap,
  isEditMode,
  onChange,
  rows,
}: {
  title: string;
  value: number | string | null | undefined;
  type: string;
  iconMap: Record<string, HeroIcon>;
  isEditMode: boolean
  onChange?: (value: string) => void;
  rows?: number;
}) {
  const Icon = iconMap[type];
  const inputClasses = "block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6";


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
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
            {isEditMode ? (
              rows ? (
                <textarea
                  spellCheck="true"
                  rows={rows}
                  value={value ?? ''}
                  onChange={(e) => onChange?.(e.target.value)}
                  className={inputClasses}
                />
              ) : (
                <input
                    spellCheck="true"
                    type="text"
                    value={value ?? ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={inputClasses}
                />
              )
            ) : (
                <p className={rows
                  ? "flex items-center justify-center w-full whitespace-pre-line text-base font-medium text-white"
                  : "text-xl font-bold text-white"}
                  style={rows ? { minHeight: `${rows}lh` } : undefined}
                >
                    {displayValue(value)}
                </p>
              )
            }
        </div>
      </div>
    </>
  );
}