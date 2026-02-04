// huddle-update-skeleton.tsx
export function HuddleUpdateCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon - Skeleton */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
          <div className="flex items-center justify-center gap-2 flex-1">
            {/* Icon skeleton */}
            <div className="h-8 w-8 rounded-md bg-gray-700/50 animate-pulse" />
            {/* Title skeleton */}
            <div className="h-8 w-32 rounded-md bg-gray-700/50 animate-pulse" />
          </div>
        </div>

        {/* Value Display - Skeleton (wider for text content) */}
        <div className="flex justify-center items-center min-h-[2rem]">
          <div className="h-10 w-full max-w-md rounded-md bg-gray-700/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Wrapper for all 5 skeletons
export function HuddleUpdateCardsSkeleton() {
  return (
    <>
      <HuddleUpdateCardSkeleton />
      <HuddleUpdateCardSkeleton />
      <HuddleUpdateCardSkeleton />
      <HuddleUpdateCardSkeleton />
      <HuddleUpdateCardSkeleton />
    </>
  );
}