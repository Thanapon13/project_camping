import FavoriteToggleForm from "./FavoriteToggleForm";
import { SignInCardButton } from "../buttons/Buttons";

const FavoriteToggleButton = ({
  landmarkId,
  userId,
  favoriteId,
  className,
}: {
  landmarkId: string;
  userId: string | null;
  favoriteId: string | null;
  className?: string;
}) => {
  if (!userId) {
    return (
      <div className={`${className ? "" : "absolute top-2.5 right-2.5"}`}>
        <SignInCardButton className={className} />
      </div>
    );
  }

  return (
    <FavoriteToggleForm
      landmarkId={landmarkId}
      favoriteId={favoriteId}
      className={className}
    />
  );
};

export default FavoriteToggleButton;
