"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchLandmarks } from "@/actions/action";
import LandmarkCard from "../card/LandmarkCard";
import LoadingCard from "../card/LoadingCard";
import { FromPageType } from "@/utils/types";

type LandmarkWithFav = any;

const Landmarklist = ({
  initialLandmarks,
  userId,
  fromPage = "home",
}: {
  initialLandmarks: LandmarkWithFav[];
  userId: string | null;
  fromPage?: FromPageType;
}) => {
  const [landmarks, setLandmarks] =
    useState<LandmarkWithFav[]>(initialLandmarks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialLandmarks.length === 8);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (!inView || !hasMore || isLoadingRef.current) return;

    const loadMore = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      const nextPage = page + 1;

      try {
        const newLandmarksWithFav = await fetchLandmarks({
          page: nextPage,
          limit: 8,
          userId,
        });

        if (newLandmarksWithFav.length < 8) setHasMore(false);

        setLandmarks(prev => [...prev, ...newLandmarksWithFav]);
        setPage(nextPage);
      } catch (error) {
        console.error("Error loading more landmarks:", error);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    };

    loadMore();
  }, [inView, hasMore, page, userId]);

  useEffect(() => {
    setLandmarks(initialLandmarks);
    setPage(1);
    setHasMore(initialLandmarks.length === 8);
  }, [initialLandmarks]);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {landmarks?.map((landmark, idx) => (
          <LandmarkCard
            key={`${landmark.id}-${idx}`}
            landmark={landmark}
            userId={userId}
            favoriteId={landmark.favoriteId}
            fromPage={fromPage}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="mt-4">
          {isLoading && <LoadingCard />}
        </div>
      )}
    </section>
  );
};

export default Landmarklist;
