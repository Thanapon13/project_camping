"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LandmarkCardProps } from "@/utils/types";
import { fetchLandmarks } from "@/actions/landmark";

const LIMIT = 8;

type UseInfiniteScrollOptions = {
  initialLandmarks: LandmarkCardProps[];
  userId: string | null;
  category?: string;
};

export const useInfiniteScroll = ({
  initialLandmarks,
  userId,
  category = "all",
}: UseInfiniteScrollOptions) => {
  const [landmarks, setLandmarks] = useState<LandmarkCardProps[]>(initialLandmarks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialLandmarks.length === LIMIT);
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingRef = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 400px 0px",
  });

  // reset + re-fetch เมื่อ category เปลี่ยน
  useEffect(() => {
    let cancelled = false;

    const refetch = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      setLandmarks([]);
      setPage(1);
      setHasMore(false);

      try {
        const result = await fetchLandmarks({ page: 1, limit: LIMIT, userId, category });
        if (!cancelled) {
          setLandmarks(result);
          setHasMore(result.length === LIMIT);
        }
      } catch (error) {
        console.error("Failed to fetch landmarks:", error);
      } finally {
        if (!cancelled) {
          isLoadingRef.current = false;
          setIsLoading(false);
        }
      }
    };

    refetch();

    return () => { cancelled = true; };
  }, [category, userId]);

  // load more เมื่อ scroll ถึงด้านล่าง
  useEffect(() => {
    if (!inView || !hasMore || isLoadingRef.current) return;

    const loadMore = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);

      const nextPage = page + 1;

      try {
        const next = await fetchLandmarks({ page: nextPage, limit: LIMIT, userId, category });
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
  }, [inView, hasMore, page, userId, category]);

  return { landmarks, hasMore, isLoading, loaderRef: ref };
};
