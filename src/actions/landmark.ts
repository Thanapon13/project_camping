"use server";

import db from "@/utils/db";
import { getAuthUser } from "./auth";
import { imageSchema, landmarkSchema, validateWithZod } from "@/utils/schemas";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { renderError } from "./error";

// --- Cached DB Queries (unstable_cache — persists across requests) ---

const fetchLandmarksDB = unstable_cache(
  async (page: number, limit: number, category: string) => {
    const skip = (page - 1) * limit;
    return db.landmark.findMany({
      skip,
      take: limit,
      where: category !== "all" ? { category } : undefined,
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        province: true,
        category: true,
        profileId: true,
        price: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  },
  ["landmarks-list"],
  { tags: ["landmarks"], revalidate: 3600 },
);

const fetchLandmarkDetailDB = unstable_cache(
  async (id: string) => {
    return db.landmark.findUnique({
      where: { id },
      include: { profile: true },
    });
  },
  ["landmark-detail"],
  { tags: ["landmarks"], revalidate: 3600 },
);

// --- Mutations ---

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData,
): Promise<{
  message: string;
  errors?: Record<string, string>;
  code?: number;
}> => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const file = formData.get("image") as File;

    const validatedFile = validateWithZod(imageSchema, { image: file });
    const validatedField = validateWithZod(landmarkSchema, rawData);

    const fullPath = await uploadFile(validatedFile.image);

    await db.landmark.create({
      data: {
        ...validatedField,
        image: fullPath,
        profileId: user.id,
      },
    });

    revalidateTag("landmarks", "default");
    revalidatePath("/");
    return { code: 0, message: "create Landmark Success!!!" };
  } catch (error) {
    return renderError(error, 402);
  }
};

export const editLandmarkAction = async (
  prevState: any,
  formData: FormData,
): Promise<{
  message: string;
  errors?: Record<string, string>;
  code?: number;
}> => {
  try {
    const user = await getAuthUser();
    const id = formData.get("id") as string;
    const pathname = formData.get("pathname") as string | null;

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(
        ([key]) =>
          !key.startsWith("$") &&
          key !== "id" &&
          key !== "image" &&
          key !== "pathname",
      ),
    );

    const validatedField = validateWithZod(landmarkSchema, rawData);

    const file = formData.get("image") as File;

    let imagePath: string | undefined;
    if (file && file.size > 0) {
      const validatedFile = validateWithZod(imageSchema, { image: file });
      imagePath = await uploadFile(validatedFile.image);
    }

    await db.landmark.update({
      where: { id, profileId: user.id },
      data: {
        ...validatedField,
        ...(imagePath && { image: imagePath }),
      },
    });

    revalidateTag("landmarks", "default");
    revalidatePath("/");
    revalidatePath(`/landmark/${id}`);
    if (pathname && pathname !== "/") revalidatePath(pathname);
    return { code: 0, message: "Update Landmark Success!!!" };
  } catch (error) {
    return renderError(error, 402);
  }
};

export const deleteLandmarkAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await getAuthUser();
    const id = formData.get("id") as string;
    const pathname = formData.get("pathname") as string | null;

    if (!id) {
      throw new Error("No landmark ID information was found.");
    }

    await db.landmark.delete({
      where: { id, profileId: user.id },
    });

    revalidateTag("landmarks", "default");
    revalidatePath("/");
    if (pathname && pathname !== "/") revalidatePath(pathname);

    return {
      code: 200,
      message: "Landmark information has been successfully deleted.!",
    };
  } catch (err) {
    return renderError(err, 402);
  }
};

// --- Reads ---

export const fetchLandmarks = async ({
  page = 1,
  limit = 8,
  userId = null,
  category = "all",
  search = "",
  province = "",
}: {
  page?: number;
  limit?: number;
  userId?: string | null;
  category?: string;
  search?: string;
  province?: string;
} = {}) => {
  const skip = (page - 1) * limit;
  const hasSearch = search.trim() !== "" || province.trim() !== "";

  // ถ้าไม่มี search → ใช้ cache | ถ้ามี search → query ตรงจาก DB
  let landmarks;
  if (!hasSearch) {
    landmarks = await fetchLandmarksDB(page, limit, category);
  } else {
    landmarks = await db.landmark.findMany({
      skip,
      take: limit,
      where: {
        ...(category !== "all" ? { category } : {}),
        ...(search.trim()
          ? { name: { contains: search.trim(), mode: "insensitive" } }
          : {}),
        ...(province.trim()
          ? { province: { contains: province.trim(), mode: "insensitive" } }
          : {}),
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        province: true,
        category: true,
        profileId: true,
        price: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  if (!userId) {
    return landmarks.map(l => ({ ...l, favoriteId: null }));
  }

  // Favorites are user-specific — fetched fresh per request
  const favorites = await db.favorite.findMany({
    where: {
      profileId: userId,
      landmarkId: { in: landmarks.map(l => l.id) },
    },
    select: { id: true, landmarkId: true },
  });

  const favoriteMap = new Map(favorites.map(f => [f.landmarkId, f.id]));

  return landmarks.map(l => ({
    ...l,
    favoriteId: favoriteMap.get(l.id) ?? null,
  }));
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  return fetchLandmarkDetailDB(id);
};
