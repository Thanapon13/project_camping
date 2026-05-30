import { auth } from "@clerk/nextjs/server";
import { fetchFavorits } from "@/actions/favorite";
import LandmarkCard from "@/components/card/LandmarkCard";
import EmptyLandmarks from "@/components/card/Emptylandmarks";

const FavoritsPage = async () => {
  const { userId } = await auth();
  const favorites = await fetchFavorits();

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground mt-1">
            {favorites.length} saved landmark{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>

        {favorites.length === 0 ? (
          <EmptyLandmarks />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((landmark, index) => (
              <LandmarkCard
                key={landmark.id}
                landmark={landmark}
                userId={userId}
                favoriteId={landmark.favoriteId}
                fromPage="favorites"
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritsPage;
