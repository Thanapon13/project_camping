import { fetchFavorits } from "@/actions/favorite";
import LoadingCard from "@/components/card/LoadingCard";
import Landmarklist from "@/components/home/Landmarklist";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

const FavoritsPage = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchFavorits();

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        <Suspense fallback={<LoadingCard count={initialLandmarks.length} />}>
          <Landmarklist
            initialLandmarks={initialLandmarks}
            userId={userId}
            fromPage="favorites"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default FavoritsPage;
