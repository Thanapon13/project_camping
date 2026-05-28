"use client";

import { FromPageType, LandmarkCardProps } from "@/utils/types";
import LandmarkCard from "../card/LandmarkCard";
import LoadingCard from "../card/LoadingCard";
import EmptyLandmarks from "../card/Emptylandmarks";
import { useInfiniteScroll } from "@/hooks/Useinfinitescroll";

type LandmarklistProps = {
  initialLandmarks: LandmarkCardProps[];
  userId: string | null;
  fromPage?: FromPageType;
};

const Landmarklist = ({
  initialLandmarks,
  userId,
  fromPage = "home",
}: LandmarklistProps) => {
  const { landmarks, hasMore, isLoading, loaderRef } = useInfiniteScroll({
    initialLandmarks,
    userId,
  });

  if (landmarks.length === 0) return <EmptyLandmarks />;

  return (
    <section>
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
      </div>

      {hasMore && (
        <div ref={loaderRef} className="mt-4">
          {isLoading && <LoadingCard />}
        </div>
      )}
    </section>
  );
};

export default Landmarklist;
