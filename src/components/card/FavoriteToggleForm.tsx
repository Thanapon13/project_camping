"use client";

import { toggleFavoriteAction } from "@/actions/action";
import { FavoriteButton } from "../buttons/Buttons";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";

const FavoriteToggleForm = ({
  favoriteId,
  landmarkId,
}: {
  favoriteId: string | null;
  landmarkId: string;
}) => {
  const pathname = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    favoriteId,
    landmarkId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction} className="absolute top-2.5 right-2.5">
      <FavoriteButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};
export default FavoriteToggleForm;
