import { Skeleton } from "@/components/ui/skeleton";

const ContactLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
          <Skeleton className="h-10 w-36 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Contact info grid skeleton — 2 columns × 2 rows */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4"
            >
              <Skeleton className="shrink-0 w-10 h-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ))}
        </div>

        {/* Note skeleton */}
        <div className="bg-card border border-border rounded-2xl p-6 flex justify-center">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </main>
  );
};

export default ContactLoading;
