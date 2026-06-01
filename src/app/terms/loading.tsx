import { Skeleton } from "@/components/ui/skeleton";

const TermsLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="h-10 w-52 mx-auto mb-3" />
          <Skeleton className="h-4 w-36 mx-auto" />
        </div>

        {/* Intro skeleton */}
        <div className="space-y-2 mb-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Section cards skeleton — 8 items */}
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 space-y-3"
            >
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>

        {/* Contact link skeleton */}
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
    </main>
  );
};

export default TermsLoading;
