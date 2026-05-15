import { fetchLandmarks } from "@/actions/action";
import Landmarklist from "./Landmarklist";

const LandmarkContainer = async () => {
  const landmarks = await fetchLandmarks();

  return (
    <div className="mb-10">
      <Landmarklist landmarks={landmarks} />
    </div>
  );
};

export default LandmarkContainer;
