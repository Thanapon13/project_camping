import { auth } from "@clerk/nextjs/server";
import FavoriteToggleForm from "./FavoriteToggleForm";
import { SignInCardButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/actions/action";

const FavoriteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="absolute top-2.5 right-2.5">
        <SignInCardButton />
      </div>
    );
  }

  const favoriteId = await fetchFavoriteId({ landmarkId });

  return <FavoriteToggleForm landmarkId={landmarkId} favoriteId={favoriteId} />;
};

export default FavoriteToggleButton;
