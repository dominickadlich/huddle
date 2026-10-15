import { StarIcon } from "@heroicons/react/24/outline";

export type ChecklistConfig = {
    title: string;
    items: readonly { label: string; column: string }[];
};

const colsMap: Record<number, string> = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5' };

export function ActivitiesCheckbox({ 
    id,
    label,
    checked,
    onChange
}: {
    id: string,
    label: string,
    checked: boolean,
    onChange: () => void,
}) {
    return (
        <fieldset>
            <legend className="sr-only">Activities</legend>
            <div className="space-y-5">
                <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                    <input
                        id={id}
                        name={id}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onChange()}
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
                    <label htmlFor={id} className="font-medium text-white">
                            <p> {label} </p>
                    </label>
                </div>
                </div>
            </div>
        </fieldset>
    )
}

export default function HuddleChecklist({
    title,
    items,
    isEditMode,
    values,
    onChange,
}: {
    title: string;
    items: readonly { label: string; column: string }[];
    isEditMode: boolean;
    values: Record<string, string | number | boolean | null | undefined>;
    onChange: (column: string, value: boolean) => void;
}) {
    return (
        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
             <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
                <StarIcon className="h-6 w-6 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
            </div>
            <div className={`mt-4 grid ${colsMap[items.length] ?? 'grid-cols-3'} justify-items-center`}>
                {items.map(({ label, column }) => {
                    const checked = !!values[column];
                    return isEditMode
                        ? <ActivitiesCheckbox key={column} id={column} label={label} checked={checked}
                              onChange={() => onChange(column, !checked)} />
                        : <div key={column} className="flex items-center gap-4">
                            <span className="relative inline-flex size-3">
                                <span className={`absolute -inset-0.5 rounded-full blur opacity-40 ${checked ? 'bg-teal-400' : 'bg-orange-400'}`} />
                                <span className={`relative inline-flex size-3 rounded-full ${checked ? 'bg-teal-500' : 'bg-orange-500'}`} />
                            </span>
                                <p className="font-medium text-white">{label}</p>
                            </div>
                })}
            </div>
        </div>
    );
}