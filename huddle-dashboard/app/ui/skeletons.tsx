// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-6`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-50" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon skeleton */}
        <div className="flex justify-center items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
          {/* Icon placeholder */}
          <div className="rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 p-2 w-9 h-9 animate-pulse" />
          {/* Title placeholder */}
          <div className="h-4 w-24 rounded-md bg-gray-700/70 animate-pulse" />
        </div>

        {/* Value placeholder */}
        <div className="flex justify-center items-center min-h-[3rem]">
          <div className="h-10 w-16 rounded-lg bg-gray-700/70 animate-pulse" />
        </div>
      </div>

      {/* Bottom accent line - subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
    </div>
  );
}

export function TextBoxSkeleton() {
  return (
    <div
      className={`${shimmer} group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm`}
    >

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity" />
      {/* Content */}
      <div className="relative z-10 p-6" >
        {/* Header with Icon skeleton */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-500/80" />
        {/* Icon placeholder */}
        <div className="rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 p-2.5 w-10 h-10 animate-pulse" />
        {/* Title placeholder */}
        <div className="h-5 w-28 rounded-md bg-gray-700/70 animate-pulse"/>
      </div>

      {/* Text box rows */}
      <div className="space-y-1">
        {/* Row 1 */}
        <div className="grid grid-cols[120px_1px_1fr] gap-4 p-3 items-center rounded-lg">
          <div className="h-4 w-20 rounded-md bg-gray-700/70 animate-pulse" />
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
          <div className="h-4 w-full rounded-md bg-gray-700/50 animate-pulse"/>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols[120px_1px_1fr] gap-4 p-3 items-center rounded-lg">
          <div className="h-4 w-20 rounded-md bg-gray-700/70 animate-pulse" />
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
          <div className="h-4 w-full rounded-md bg-gray-700/50 animate-pulse"/>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols[120px_1px_1fr] gap-4 p-3 items-center rounded-lg">
          <div className="h-4 w-20 rounded-md bg-gray-700/70 animate-pulse" />
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
          <div className="h-4 w-full rounded-md bg-gray-700/50 animate-pulse"/>
        </div>
      </div>

       {/* Bottom accent line - subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
    </div>
  );
}

export function DirectoryEntrySkeleton() {
  {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function CensusChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function CensusSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestOpportunitiesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <CensusSkeleton />
          <CensusSkeleton />
          <CensusSkeleton />
          <CensusSkeleton />
          <CensusSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <TextBoxSkeleton />
        <TextBoxSkeleton />
        <TextBoxSkeleton />
        <TextBoxSkeleton />
        <TextBoxSkeleton />
        <TextBoxSkeleton />
        <TextBoxSkeleton />
        <TextBoxSkeleton />
      </div>
    </>
  );
}

export function DirectorySkeleton() {
  return (
  <>
   <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
  <div className="mt-8 grid gap-6 grid-cols-2">
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    <DirectoryEntrySkeleton />
    </div>
  </> 
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      {/* <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td> */}
      {/* Site */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Extension */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      {/* <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td> */}
      {/* Status */}
      {/* <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td> */}
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function OpportinitiesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function ExtensionsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <OpportinitiesMobileSkeleton />
            <OpportinitiesMobileSkeleton />
            {/* <OpportinitiesMobileSkeleton />
            <OpportinitiesMobileSkeleton />
            <OpportinitiesMobileSkeleton />
            <OpportinitiesMobileSkeleton /> */}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Site
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Extension
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th> */}
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
