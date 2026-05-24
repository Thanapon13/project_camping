import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/landmark/Breadcrumbs";
import { fetchComments, fetchLandmarkDetail } from "@/actions/action";
import MapLandmarkClient from "@/components/map/MapLandmarkClient";
import LandmarkHeader from "@/components/landmark/LandmarkHeader";
import ScrollToTop from "@/components/landmark/ScrollToTop";
import HostInfo from "@/components/landmark/HostInfo.tsx";
import LandmarkDescription from "@/components/landmark/LandmarkDescription";
import ImageContainer from "@/components/landmark/ImageContainer";
import { auth, currentUser } from "@clerk/nextjs/server";
import CommentContainer from "@/components/comments/CommentContainer";

const LandmarkDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { from?: string; favoriteId?: string };
}) => {
  const { userId } = await auth();
  const user = await currentUser();
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({ id });
  const comments = await fetchComments({ landmarkId: id });
  const resolvedSearchParams = await searchParams;

  const fromPage = resolvedSearchParams.from || "home";
  const favoriteId = resolvedSearchParams.favoriteId || null;

  if (!landmark) redirect("/");

  const { name, description, image, province, category, lat, lng } = landmark;

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

        {/* Content Grid */}
        <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="col-span-12">
            <HostInfo profile={landmark.profile} />
            <hr className="border-border" />

            <LandmarkDescription description={description} />
            <hr className="border-border" />
          </div>
        </div>

        <MapLandmarkClient location={{ lat, lng }} isViewOnly={true} />

        <CommentContainer
          landmarkId={id}
          userId={userId}
          comments={comments}
          userImage={user?.imageUrl ?? ""}
        />
      </div>
    </main>
  );
};

export default LandmarkDetailPage;
