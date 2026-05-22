"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchLandmarks } from "@/actions/action";
import LandmarkCard from "../card/LandmarkCard";
import LoadingCard from "../card/LoadingCard";
import { FromPageType, LandmarkCardProps } from "@/utils/types";
import { motion } from "framer-motion";

const Landmarklist = ({
  initialLandmarks,
  userId,
  fromPage = "home",
}: {
  initialLandmarks: LandmarkCardProps[];
  userId: string | null;
  fromPage?: FromPageType;
}) => {
  const [landmarks, setLandmarks] =
    useState<LandmarkCardProps[]>(initialLandmarks);
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

  if (landmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No landmarks found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Be the first to add a landmark and share your favorite places with the
          community.
        </p>
      </motion.div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {landmarks?.map((landmark, idx) => (
          <LandmarkCard
            key={`${landmark.id}-${idx}`}
            landmark={landmark}
            userId={userId}
            favoriteId={landmark.favoriteId}
            fromPage={fromPage}
            index={idx}
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
