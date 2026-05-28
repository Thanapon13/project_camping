import { auth } from "@clerk/nextjs/server";
import Landmarklist from "./Landmarklist";
import LandmarkHeader from "./LandmarkHeader";
import CategoryFilter from "./CategoryFilter";
import { fetchLandmarks } from "@/actions/landmark";

const LandmarkContainer = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchLandmarks({ page: 1, limit: 8, userId });

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryFilter />
        <LandmarkHeader userId={userId} />
        <Landmarklist initialLandmarks={initialLandmarks} userId={userId} />
      </div>
    </section>
  );
};

export default LandmarkContainer;
