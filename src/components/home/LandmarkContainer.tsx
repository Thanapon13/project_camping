import { fetchLandmarks } from "@/actions/action";
import Landmarklist from "./Landmarklist";
import CreateLandmarkModal from "./CreateLandmarkModal";

const LandmarkContainer = async () => {
  const landmarks = await fetchLandmarks();

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Landmarks</h2>

        <CreateLandmarkModal />
      </div>

      <Landmarklist landmarks={landmarks} />
    </div>
  );
};

export default LandmarkContainer;
