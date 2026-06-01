import { LandmarkCardProps } from "@/utils/types";
import ProfileLandmarksList from "./ProfileLandmarksList";

type ProfileLandmarksProps = {
  initialLandmarks: LandmarkCardProps[];
  totalCount: number;
  userId: string;
};

const ProfileLandmarks = ({
  initialLandmarks,
  totalCount,
  userId,
}: ProfileLandmarksProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        My Landmarks
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({totalCount})
        </span>
      </h2>

      <ProfileLandmarksList
        initialLandmarks={initialLandmarks}
        totalCount={totalCount}
        userId={userId}
      />
    </div>
  );
};

export default ProfileLandmarks;
