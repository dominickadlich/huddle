export function CardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon - Skeleton */}
        <div className="flex justify-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
          {/* Icon skeleton */}
          <div className="h-6 w-6 rounded-md bg-gray-700/50 animate-pulse" />
          {/* Title skeleton */}
          <div className="h-6 w-20 rounded-md bg-gray-700/50 animate-pulse" />
        </div>

        {/* Value Display - Skeleton */}
        <div className="flex justify-center items-center min-h-[2rem]">
          <div className="h-10 w-16 rounded-md bg-gray-700/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Wrapper for all 4 skeletons
export function DailySummaryCardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}