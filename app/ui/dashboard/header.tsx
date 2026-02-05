export default function Header({ title }: { title : string}) {
    return (
        <div className="mb-4 flex items-center gap-4">
        <h2 className="text-3xl font-bold text-indigo-400">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
        </div>
    )
}