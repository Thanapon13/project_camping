"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MapPin } from "lucide-react";
import LandmarkCard from "@/components/card/LandmarkCard";
import { SkeletonCard } from "@/components/card/LoadingCard";
import { fetchProfileLandmarks } from "@/actions/profile";
import { LandmarkCardProps } from "@/utils/types";

const LIMIT = 8;

type ProfileLandmarksListProps = {
  initialLandmarks: LandmarkCardProps[];
  totalCount: number;
  userId: string;
};

const ProfileLandmarksList = ({
  initialLandmarks,
  totalCount,
  userId,
}: ProfileLandmarksListProps) => {
  const [landmarks, setLandmarks] = useState<LandmarkCardProps[]>(initialLandmarks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    initialLandmarks.length === LIMIT && totalCount > LIMIT,
  );
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 400px 0px",
  });

  // Sync เมื่อ server re-render ด้วยข้อมูลใหม่ (create/edit/delete)
  useEffect(() => {
    setLandmarks(initialLandmarks);
    setPage(1);
    setHasMore(initialLandmarks.length === LIMIT && totalCount > LIMIT);
  }, [initialLandmarks, totalCount]);

  // Load more เมื่อ scroll ถึงด้านล่าง
  useEffect(() => {
    if (!inView || !hasMore || isLoadingRef.current) return;

    const loadMore = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      const nextPage = page + 1;

      try {
        const more = await fetchProfileLandmarks({ page: nextPage, limit: LIMIT });
        if (more.length < LIMIT) setHasMore(false);
        setLandmarks(prev => [...prev, ...more]);
        setPage(nextPage);
      } catch {
        // silently fail — user can scroll again to retry
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    };

    loadMore();
  }, [inView, hasMore, page]);

  if (landmarks.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
        <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p>No landmarks yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {landmarks.map((landmark, index) => (
          <LandmarkCard
            key={landmark.id}
            landmark={landmark}
            userId={userId}
            favoriteId={landmark.favoriteId}
            fromPage="profile"
            index={index}
          />
        ))}

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && <div ref={ref} className="h-1" />}
    </>
  );
};

export default ProfileLandmarksList;
