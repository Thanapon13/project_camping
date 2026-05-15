// loadig homepage
const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-[300px] bg-muted">
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3 h-6 w-20 rounded-full bg-muted-foreground/20" />
        {/* Favorite button skeleton */}
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-muted-foreground/20" />
      </div>

      {/* CardContent skeleton */}
      <div className="p-4">
        {/* Name + Price row */}
        <div className="flex justify-between items-start mb-1">
          <div className="h-4 w-36 rounded bg-muted-foreground/20" />
          <div className="h-4 w-16 rounded bg-muted-foreground/20" />
        </div>

        {/* Province + Rating row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
          </div>
          <div className="h-3 w-16 rounded bg-muted-foreground/20" />
        </div>

        {/* Description skeleton — 2 lines */}
        <div className="space-y-2 min-h-[40px]">
          <div className="h-3 w-full rounded bg-muted-foreground/20" />
          <div className="h-3 w-3/4 rounded bg-muted-foreground/20" />
        </div>
      </div>

      {/* CardFooter skeleton */}
      <div className="p-4 pt-0">
        <div className="h-9 w-full rounded-md bg-muted-foreground/20" />
      </div>
    </div>
  );
};

const Loading = () => {
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

export default Loading;
