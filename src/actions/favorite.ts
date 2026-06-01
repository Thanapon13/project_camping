"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import db from "@/utils/db";
import { getAuthUser } from "./auth";
import { renderError } from "./error";

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();

  try {
    const isValidId = favoriteId && !favoriteId.startsWith("pending");

    if (isValidId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({
        data: { landmarkId, profileId: user?.id },
      });
    }

    revalidateTag(`favorites-${user.id}`, "default");
    revalidatePath(pathname);
    revalidatePath("/favorits");
    return {
      code: 200,
      message: isValidId ? "Removed Favorite Success" : "Add Favorite Success",
    };
  } catch (error) {
    return renderError(error, 402);
  }
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: { landmarkId, profileId: user?.id },
    select: { id: true },
  });

  return favorite?.id || null;
};

export const fetchFavorits = async () => {
  const user = await getAuthUser();
  return fetchFavoritsDB(user.id);
};

async function fetchFavoritsDB(userId: string) {
  const fn = unstable_cache(
    async () => {
      const favorites = await db.favorite.findMany({
        where: { profileId: userId },
        select: {
          id: true,
          landmark: {
            select: {
              id: true,
              name: true,
              description: true,
              image: true,
              province: true,
              category: true,
              profileId: true,
            },
          },
        },
      });
      const seen = new Set<string>();
      return favorites
        .filter(f => {
          if (seen.has(f.landmark.id)) return false;
          seen.add(f.landmark.id);
          return true;
        })
        .map(f => ({ ...f.landmark, favoriteId: f.id }));
    },
    [`favorites-${userId}`],
    { tags: [`favorites-${userId}`], revalidate: false },
  );
  return fn();
}
