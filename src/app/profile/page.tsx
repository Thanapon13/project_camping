import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  fetchProfile,
  fetchProfileLandmarks,
  fetchProfileLandmarksCount,
} from "@/actions/profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileLandmarks from "@/components/profile/ProfileLandmarks";

const ProfilePage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const [profile, initialLandmarks, totalCount] = await Promise.all([
    fetchProfile(),
    fetchProfileLandmarks({ page: 1, limit: 8 }),
    fetchProfileLandmarksCount(),
  ]);

  return (
    <section className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24 space-y-8">
        <ProfileHeader profile={profile} landmarksCount={totalCount} />
        <ProfileLandmarks
          initialLandmarks={initialLandmarks}
          totalCount={totalCount}
          userId={user.id}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
