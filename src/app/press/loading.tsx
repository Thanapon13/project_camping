import { Skeleton } from "@/components/ui/skeleton";

const PressLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="h-10 w-24 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        {/* Company overview skeleton */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-10 space-y-3">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Media contact skeleton */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-10 flex items-start gap-4">
          <Skeleton className="shrink-0 w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Press kit skeleton */}
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-4 h-4 shrink-0" />
            </div>
          ))}
        </div>

        {/* Coverage skeleton */}
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-5 flex items-start justify-between gap-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="w-4 h-4 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PressLoading;
