import { fetchFavorits } from "@/actions/action";
import Landmarklist from "@/components/home/Landmarklist";
import { auth } from "@clerk/nextjs/server";

const FavoritsPage = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchFavorits();

  return (
    <div className="mb-10">
      <Landmarklist
        initialLandmarks={initialLandmarks}
        userId={userId}
        fromPage="favorites"
      />
    </div>
  );
};
export default FavoritsPage;
