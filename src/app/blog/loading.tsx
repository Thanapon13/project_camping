import { Skeleton } from "@/components/ui/skeleton";

const BlogLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="h-10 w-24 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        {/* Post cards skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 space-y-3"
            >
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-4 pt-1">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3.5 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon skeleton */}
        <div className="mt-10 bg-card border border-border rounded-2xl p-8 flex justify-center">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </main>
  );
};

export default BlogLoading;
