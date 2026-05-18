import { LandmarkCardProps } from "@/utils/types";
import LandmarkCard from "../card/LandmarkCard";

const Landmarklist = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {landmarks?.map((landmark, idx) => (
        <LandmarkCard key={`${landmark.id}-${idx}`} landmark={landmark} />
      ))}
    </section>
  );
};

export default Landmarklist;
