export default function Header({ title }: {title: string}) {
    return (
        <div className="w-full">
        {/* Page Header with Gradient Title */}
        <div className="mt-20 flex w-full items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {title}
            </h1>
        </div>
      </div>
    )
}