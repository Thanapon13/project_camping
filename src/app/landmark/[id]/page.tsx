import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import Breadcrumbs from "@/components/landmark/Breadcrumbs";
import MapLandmarkClient from "@/components/map/MapLandmarkClient";
import LandmarkHeader from "@/components/landmark/LandmarkHeader";
import ScrollToTop from "@/components/landmark/ScrollToTop";
import LandmarkDescription from "@/components/landmark/LandmarkDescription";
import ImageContainer from "@/components/landmark/ImageContainer";
import HostInfo from "@/components/landmark/HostInfo.tsx";
import CommentSkeleton from "@/components/comments/Commentskeleton";
import CommentContainerWrapper from "@/components/comments/Commentcontainerwrapper";
import { fetchLandmarkDetail } from "@/actions/landmark";
import { fetchFavoriteId } from "@/actions/favorite";

const LandmarkDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { from?: string };
}) => {
  const { userId } = await auth();
  const { id } = await params;

  const resolvedSearchParams = await searchParams;

  const [landmark, favoriteId] = await Promise.all([
    fetchLandmarkDetail({ id }),
    userId ? fetchFavoriteId({ landmarkId: id }) : Promise.resolve(null),
  ]);

  if (!landmark) redirect("/");

  const { name, description, image, province, category, lat, lng } = landmark;
  const fromPage = resolvedSearchParams.from || "home";

  return (
    <main className="min-h-screen bg-background">
      <ScrollToTop />

      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        <Breadcrumbs name={name} fromPage={fromPage} />
        <LandmarkHeader name={name} province={province} category={category} />
        <ImageContainer
          image={image}
          name={name}
          landmarkId={id}
          favoriteId={favoriteId}
          userId={userId}
        />

        <div className="mt-10">
          <HostInfo profile={landmark.profile} currentUserId={userId} />
          <hr className="border-border" />
          <LandmarkDescription description={description} />
          <hr className="border-border" />
        </div>

        <MapLandmarkClient location={{ lat, lng }} isViewOnly={true} />

        {/* Comments โหลดแยก */}
        <Suspense fallback={<CommentSkeleton />}>
          <CommentContainerWrapper landmarkId={id} />
        </Suspense>
      </div>
    </main>
  );
};

export default LandmarkDetailPage;
