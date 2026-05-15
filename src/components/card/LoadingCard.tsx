import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Image */}
      <div className="relative h-[300px]">
        <Skeleton className="h-full w-full rounded-none" />
        <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full" />
        <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />
      </div>

      {/* CardContent */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>

        <div className="space-y-2 min-h-[40px]">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>

      {/* CardFooter */}
      <div className="p-4 pt-0">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default LoadingCard;
