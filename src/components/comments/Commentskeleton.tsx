import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="py-12 border-t border-border mt-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-32" />
      </div>

      {/* Comment input area */}
      <Skeleton className="h-24 w-full rounded-2xl" />

      {/* Comment items */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4">
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-4 pt-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
