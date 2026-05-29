import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchProfile, fetchUserLandmarks } from "@/actions/profile";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import LandmarkCard from "@/components/card/LandmarkCard";

const ProfilePage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const [profile, landmarks] = await Promise.all([
    fetchProfile(),
    fetchUserLandmarks(),
  ]);

  return (
    <section className="min-h-screen bg-background">
      <div className="container max-w-7xl sm:px-6 lg:px-8 py-24">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-primary/20 to-primary/5" />

          {/* Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4 w-fit">
              <Image
                src={profile.profileImage}
                alt={profile.firstName}
                width={88}
                height={88}
                className="rounded-full object-cover ring-4 ring-background"
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-muted-foreground text-sm">
                  @{profile.userName}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.email}</span>
                </div>
              </div>

              <EditProfileDialog
                profile={{
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  userName: profile.userName,
                }}
              />
            </div>

            {/* Stats Navbar */}
            <div className="flex gap-6 mt-5 pt-5 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold">{landmarks.length}</span>
                <span className="text-muted-foreground">Landmarks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Landmarks Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            My Landmarks
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({landmarks.length})
            </span>
          </h2>

          {landmarks.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No landmarks yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {landmarks.map((landmark, index) => (
                <LandmarkCard
                  key={landmark.id}
                  landmark={{
                    id: landmark.id,
                    name: landmark.name,
                    description: landmark.description,
                    image: landmark.image,
                    category: landmark.category,
                    province: landmark.province,
                    profileId: landmark.profileId,
                    favoriteId: null,
                  }}
                  userId={user.id}
                  favoriteId={null}
                  fromPage="profile"
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
