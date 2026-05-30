import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="rounded-2xl bg-card border border-border/50 shadow-sm">
      <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
        <Skeleton className="absolute top-4 left-4 h-6 w-20 rounded-full" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-10" />
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3.5 w-24" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>
      </div>
    </div>
  );
};

type LoadingCardProps = {
  count?: number;
};

const LoadingCard = ({ count = 8 }: LoadingCardProps) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingCard;
