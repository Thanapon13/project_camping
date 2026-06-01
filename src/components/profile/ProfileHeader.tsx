import { Mail, MapPin } from "lucide-react";
import EditProfileDialog from "./EditProfileDialog";
import Avatar from "../user/Avatar";

type ProfileHeaderProps = {
  profile: {
    profileImage: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  };
  landmarksCount: number;
};

const ProfileHeader = ({ profile, landmarksCount }: ProfileHeaderProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Cover */}
      <div className="h-28 bg-gradient-to-r from-primary/20 to-primary/5" />

      {/* Info */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-12 mb-4 w-fit">
          <Avatar userImage={profile.profileImage} size={88} />
        </div>

        {/* Name + Edit */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-muted-foreground text-sm">@{profile.userName}</p>
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

        {/* Stats */}
        <div className="flex gap-6 mt-5 pt-5 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-semibold">{landmarksCount}</span>
            <span className="text-muted-foreground">Landmarks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
