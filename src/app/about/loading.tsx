import { Skeleton } from "@/components/ui/skeleton";

const AboutLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="h-10 w-72 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-2" />
          <Skeleton className="h-5 w-4/5 mx-auto" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-3"
            >
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          ))}
        </div>

        {/* Mission skeleton */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-12 space-y-3">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Features skeleton */}
        <Skeleton className="h-7 w-36 mb-6" />
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 space-y-2"
            >
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutLoading;
