"use client";

import { useState } from "react";
import { FromPageType, LandmarkCardProps } from "@/utils/types";
import LandmarkCard from "../card/LandmarkCard";
import { SkeletonCard } from "../card/LoadingCard";
import EmptyLandmarks from "../card/Emptylandmarks";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import CategoryFilter from "./CategoryFilter";

type LandmarklistProps = {
  initialLandmarks: LandmarkCardProps[];
  userId: string | null;
  fromPage?: FromPageType;
  infiniteScroll?: boolean;
  search?: string;
  province?: string;
};

const SKELETON_COUNT = 8;

const Landmarklist = ({
  initialLandmarks,
  userId,
  fromPage = "home",
  infiniteScroll = true,
  search = "",
  province = "",
}: LandmarklistProps) => {
  const [category, setCategory] = useState("all");

  const { landmarks, hasMore, isLoading, loaderRef } = useInfiniteScroll({
    initialLandmarks,
    userId,
    category,
    search,
    province,
  });

  return (
    <section>
      <CategoryFilter onCategoryChange={setCategory} />

      {landmarks.length === 0 && !isLoading ? (
        <EmptyLandmarks />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {landmarks.map((landmark, idx) => (
            <LandmarkCard
              key={`${landmark.id}-${idx}`}
              landmark={landmark}
              userId={userId}
              favoriteId={landmark.favoriteId}
              fromPage={fromPage}
              index={idx}
            />
          ))}

          {isLoading &&
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
        </div>
      )}

      {infiniteScroll && hasMore && <div ref={loaderRef} className="h-1" />}
    </section>
  );
};

export default Landmarklist;
