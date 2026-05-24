import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        {/* Breadcrumbs */}
        <Skeleton className="h-5 w-48" />

        {/* LandmarkHeader */}
        <div className="mt-6 space-y-3">
          <Skeleton className="h-10 w-80" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* ImageContainer */}
        <Skeleton className="mt-6 w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl" />

        {/* HostInfo */}
        <div className="mt-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>

        <div className="border-b border-border" />

        {/* LandmarkDescription */}
        <div className="py-6 space-y-3">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="border-b border-border" />

        {/* Map */}
        <Skeleton className="h-5 w-32 mt-4" />
        <Skeleton className="h-[400px] w-full rounded-lg mt-4" />

        {/* CommentContainer */}
        <div className="py-12 border-t border-border mt-8 space-y-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7" />
            <Skeleton className="h-7 w-32" />
          </div>

          <Skeleton className="h-24 w-full rounded-2xl" />

          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                {/* Like / Reply buttons */}
                <div className="flex gap-4 pt-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default loading;
