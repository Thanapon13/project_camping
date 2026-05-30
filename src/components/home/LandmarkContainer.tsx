import { auth } from "@clerk/nextjs/server";
import Landmarklist from "./Landmarklist";
import LandmarkHeader from "./LandmarkHeader";
import { fetchLandmarks } from "@/actions/landmark";

const LandmarkContainer = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchLandmarks({ page: 1, limit: 8, userId });

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LandmarkHeader userId={userId} />
        <Landmarklist
          key={initialLandmarks
            .map(
              l =>
                `${l.id}|${l.name}|${l.category}|${l.province}|${l.image.slice(-30)}`,
            )
            .join(";")}
          initialLandmarks={initialLandmarks}
          userId={userId}
          infiniteScroll={false}
        />
      </div>
    </section>
  );
};

export default LandmarkContainer;
