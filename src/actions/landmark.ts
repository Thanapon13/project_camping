"use server";

import db from "@/utils/db";
import { getAuthUser } from "./auth";
import { imageSchema, landmarkSchema, validateWithZod } from "@/utils/schemas";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { renderError } from "./error";

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

    // Step1 : Validate rawData
    const validatedFile = validateWithZod(imageSchema, { image: file });
    const validatedField = validateWithZod(landmarkSchema, rawData);

    // Step2 : Upload  Image to Supabase
    const fullPath = await uploadFile(validatedFile.image);

    // Step3 : Inser to DB
    await db.landmark.create({
      data: {
        ...validatedField,
        image: fullPath,
        profileId: user.id,
      },
    });

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

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(
        ([key]) => !key.startsWith("$") && key !== "id" && key !== "image",
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

    revalidatePath("/");
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

    if (!id) {
      throw new Error("No landmark ID information was found.");
    }

    await db.landmark.delete({
      where: {
        id: id,
        profileId: user.id,
      },
    });

    revalidatePath("/");

    return {
      code: 200,
      message: "Landmark information has been successfully deleted.!",
    };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const fetchLandmarks = async ({
  page = 1,
  limit = 8,
  userId = null,
}: { page?: number; limit?: number; userId?: string | null } = {}) => {
  const skip = (page - 1) * limit;

  const landmarks = await db.landmark.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      province: true,
      category: true,
      profileId: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  if (!userId) {
    return landmarks.map(l => ({ ...l, favoriteId: null }));
  }

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
  return db.landmark.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};
