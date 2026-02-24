export function EditButton({ 
    children,
    onClick
}: {
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className="rounded-md bg-indigo-500/20 px-2.5 py-1.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30"
            onClick={onClick}
        >
            {children}
        </button>
    )
}


export function SubmitButton({
    onClick
}: {
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={onClick}
        >
            Submit
        </button>
    )
}