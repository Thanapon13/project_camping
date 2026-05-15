"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must logged!!!");
  }

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (
  error: unknown,
  code: number,
): { message: string; code: number } => {
  return {
    message: error instanceof Error ? error.message : "An Error!!!",
    code: code,
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const validatedField = validateWithZod(profileSchema, rawData);
    console.log("validatedField:", validatedField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0]?.emailAddress,
        profileImage: user.imageUrl,
        ...validatedField,
      },
    });

    const client = await clerkClient();

    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return { message: "Create Profile successfully", code: 200 };
  } catch (error) {
    return renderError(error, 402);
  }
  redirect("/");
};

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
    console.log("user:", user.id);

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );
    console.log("rawData:", rawData);

    const file = formData.get("image") as File;

    // Step1 : Validate rawData
    const validatedFile = validateWithZod(imageSchema, {
      image: file,
    });
    console.log("validatedFile", validatedFile);

    const validatedField = validateWithZod(landmarkSchema, rawData);
    console.log("validatedField", validatedField);

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

    return { code: 0, message: "create Landmark Success!!!" };
  } catch (error) {
    return renderError(error, 402);
  }
};

export const fetchLandmarks = async () => {
  const data = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId,
      profileId: user?.id,
    },

    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();

  try {
    // delete
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      // create
      await db.favorite.create({
        data: {
          landmarkId,
          profileId: user?.id,
        },
      });
    }

    revalidatePath(pathname);

    return {
      message: favoriteId ? "Removed Favorite Success" : "Add Favorite Success",
    };
  } catch (error) {
    return renderError(error, 200);
  }
};

export const fetchFavorits = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });

  return favorites.map(favorite => favorite.landmark);
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
