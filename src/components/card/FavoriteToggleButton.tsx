import FavoriteToggleForm from "./FavoriteToggleForm";
import { SignInCardButton } from "../buttons/Buttons";

const FavoriteToggleButton = ({
  landmarkId,
  userId,
  favoriteId,
}: {
  landmarkId: string;
  userId: string | null;
  favoriteId: string | null;
}) => {
  if (!userId) {
    return (
      <div className="absolute top-2.5 right-2.5">
        <SignInCardButton />
      </div>
    );
  }

  return <FavoriteToggleForm landmarkId={landmarkId} favoriteId={favoriteId} />;
};

export default FavoriteToggleButton;
