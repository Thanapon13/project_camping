import { fetchLandmarks } from "@/actions/action";
import Landmarklist from "./Landmarklist";
import LandmarkModal from "../landmark/LandmarkModal";

const LandmarkContainer = async () => {
  const landmarks = await fetchLandmarks();

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Landmarks</h2>

        <LandmarkModal />
      </div>

      <Landmarklist landmarks={landmarks} />
    </div>
  );
};

export default LandmarkContainer;
