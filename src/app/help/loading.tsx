import { Skeleton } from "@/components/ui/skeleton";

const HelpLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        {/* FAQ cards skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="shrink-0 w-10 h-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA skeleton */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    </main>
  );
};

export default HelpLoading;
