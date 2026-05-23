import { fetchFavorits } from "@/actions/action";
import Landmarklist from "@/components/home/Landmarklist";
import { auth } from "@clerk/nextjs/server";

const FavoritsPage = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchFavorits();

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        <Landmarklist
          initialLandmarks={initialLandmarks}
          userId={userId}
          fromPage="favorites"
        />
      </div>
    </main>
  );
};
export default FavoritsPage;
