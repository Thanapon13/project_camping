"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchLandmarks, fetchFavoriteId } from "@/actions/action";
import LandmarkCard from "../card/LandmarkCard";
import { Loader2 } from "lucide-react";

type LandmarkWithFav = any;

const Landmarklist = ({
  initialLandmarks,
  userId,
}: {
  initialLandmarks: LandmarkWithFav[];
  userId: string | null;
}) => {
  const [landmarks, setLandmarks] =
    useState<LandmarkWithFav[]>(initialLandmarks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialLandmarks.length === 8);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      const loadMoreLandmarks = async () => {
        setIsLoading(true);
        const nextPage = page + 1;

        try {
          const newLandmarks = await fetchLandmarks({
            page: nextPage,
            limit: 8,
          });

          // ตรวจสอบ favoriteId ของหน้าใหม่แบบ Client-side call ไปที่ Server Action
          const newLandmarksWithFav = await Promise.all(
            newLandmarks.map(async landmark => {
              const favoriteId = userId
                ? await fetchFavoriteId({ landmarkId: landmark.id })
                : null;
              return { ...landmark, favoriteId };
            }),
          );

          if (newLandmarks.length < 8) {
            setHasMore(false);
          }

          setLandmarks(prev => [...prev, ...newLandmarksWithFav]);
          setPage(nextPage);
        } catch (error) {
          console.error("Error loading more landmarks:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadMoreLandmarks();
    }
  }, [inView, hasMore, isLoading, page, userId]);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {landmarks?.map((landmark, idx) => (
          <LandmarkCard
            key={`${landmark.id}-${idx}`}
            landmark={landmark}
            userId={userId}
            favoriteId={landmark.favoriteId}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center items-center p-6 mt-4">
          {isLoading && (
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </section>
  );
};

export default Landmarklist;
