import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="py-10 w-full">
      {/* Skeleton for the title */}
      <div className="flex justify-center mb-8">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-8">
        {/* Skeletons for search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Skeleton className="h-10 w-full md:w-3/4" />
          <Skeleton className="h-10 w-full md:w-1/4" />
        </div>

        {/* Skeletons for post cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="pt-2">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Skeleton for pagination */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </main>
  );
}
