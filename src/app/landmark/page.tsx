import { auth } from "@clerk/nextjs/server";
import { fetchLandmarks } from "@/actions/landmark";
import LandmarkSearchContainer from "@/components/home/LandmarkSearchContainer";
import CreateLandmarkModal from "@/components/landmark/CreateLandmarkModal";
import ScrollToTop from "@/components/ui/ScrollToTop";

const LandmarksPage = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchLandmarks({ page: 1, limit: 8, userId });

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              All Landmarks
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover amazing places across Thailand
            </p>
          </div>
          <CreateLandmarkModal userId={userId} />
        </div>

        <LandmarkSearchContainer initialLandmarks={initialLandmarks} userId={userId} />
      </div>

      <ScrollToTop />
    </section>
  );
};

export default LandmarksPage;
