"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import db from "@/utils/db";
import { renderError } from "./error";

export const fetchProfile = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });

  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  _prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in");

    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      userName: formData.get("userName") as string,
    };

    await db.profile.update({
      where: { clerkId: user.id },
      data: rawData,
    });

    revalidatePath("/profile");
    revalidateTag(`user-landmarks-${user.id}`, "default");
    revalidateTag("landmarks", "default");
    return { message: "Profile updated successfully", code: 200 };
  } catch (error) {
    return renderError(error, 400);
  }
};

export const fetchUserLandmarks = async () => {
  const user = await currentUser();
  if (!user) return [];
  return fetchUserLandmarksDB(user.id);
};

async function fetchUserLandmarksDB(userId: string) {
  const fn = unstable_cache(
    async () => {
      return db.landmark.findMany({
        where: { profileId: userId },
        orderBy: { createdAt: "desc" },
      });
    },
    [`user-landmarks-${userId}`],
    { tags: [`user-landmarks-${userId}`, "landmarks"], revalidate: 3600 },
  );
  return fn();
};
