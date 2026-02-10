export default function ShiftButtons() {
    const shifts = ['morning', 'afernoon', 'evening']
    return (
        <div className="flex gap-6">
            {shifts.map((shift) => (
                <button
                    key ={shift}
                    type="button"
                    className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                    {shift}
                </button>
            ))}
        </div>
    )
}