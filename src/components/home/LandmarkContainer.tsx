import { fetchLandmarks } from "@/actions/action";
import { auth } from "@clerk/nextjs/server";
import Landmarklist from "./Landmarklist";
import LandmarkModal from "../landmark/LandmarkModal";

const LandmarkContainer = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchLandmarks({ page: 1, limit: 8, userId });

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Landmarks</h2>
        <LandmarkModal />
      </div>

      <Landmarklist initialLandmarks={initialLandmarks} userId={userId} />
    </div>
  );
};

export default LandmarkContainer;
