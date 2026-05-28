"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LandmarkCardProps } from "@/utils/types";
import { fetchLandmarks } from "@/actions/landmark";

const LIMIT = 8;

type UseInfiniteScrollOptions = {
  initialLandmarks: LandmarkCardProps[];
  userId: string | null;
};

export const useInfiniteScroll = ({
  initialLandmarks,
  userId,
}: UseInfiniteScrollOptions) => {
  const [landmarks, setLandmarks] =
    useState<LandmarkCardProps[]>(initialLandmarks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialLandmarks.length === LIMIT);
  const [isLoading, setIsLoading] = useState(false);

  // useRef ป้องกัน loadMore ยิงซ้ำใน strict mode / rapid scroll
  const isLoadingRef = useRef(false);

  const { ref, inView } = useInView({ threshold: 0 });

  // reset เมื่อ initialLandmarks เปลี่ยน (เช่น filter category)
  useEffect(() => {
    setLandmarks(initialLandmarks);
    setPage(1);
    setHasMore(initialLandmarks.length === LIMIT);
  }, [initialLandmarks]);

  // load more เมื่อ scroll ถึงด้านล่าง
  useEffect(() => {
    if (!inView || !hasMore || isLoadingRef.current) return;

    const loadMore = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);

      const nextPage = page + 1;

      try {
        const next = await fetchLandmarks({
          page: nextPage,
          limit: LIMIT,
          userId,
        });

        if (next.length < LIMIT) setHasMore(false);

        setLandmarks(prev => [...prev, ...next]);
        setPage(nextPage);
      } catch (error) {
        console.error("Failed to load more landmarks:", error);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    };

    loadMore();
  }, [inView, hasMore, page, userId]);

  return { landmarks, hasMore, isLoading, loaderRef: ref };
};
