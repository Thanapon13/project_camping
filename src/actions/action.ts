"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateComment,
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
): { message: string; code: number; errors?: Record<string, string> } => {
  if (error instanceof Error && "errors" in error) {
    return {
      message: "กรุณากรอกข้อมูลให้ถูกต้องตามเงื่อนไข",
      code: code,
      errors: (error as any).errors,
    };
  }

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

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );
    console.log("rawData:", rawData);

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

export const fetchLandmarks = async ({
  page = 1,
  limit = 8,
  userId = null,
}: { page?: number; limit?: number; userId?: string | null } = {}) => {
  const skip = (page - 1) * limit;

  const landmarks = await db.landmark.findMany({
    skip,
    take: limit,
    orderBy: { updatedAt: "desc" },
  });

  if (!userId) {
    return landmarks.map(l => ({ ...l, favoriteId: null }));
  }

  // login แล้ว → ดึง favorites ทั้งหมดใน 1 query
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

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();

  try {
    // ถ้า favoriteId ไม่ใช่ UUID จริง ให้ถือว่าเป็น create
    const isValidId = favoriteId && !favoriteId.startsWith("pending");

    if (isValidId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({
        data: { landmarkId, profileId: user?.id },
      });
    }

    revalidatePath(pathname);

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

export const fetchFavorits = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: { profileId: user.id },
    select: {
      id: true,
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
          profileId: true,
        },
      },
    },
  });

  return favorites.map(f => ({
    ...f.landmark,
    favoriteId: f.id,
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

export const createCommentAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const validatedComment = validateWithZod(validateComment, rawData);

    await db.comment.create({
      data: {
        comment: validatedComment.comment,
        rating: validatedComment.rating,
        profileId: user.id,
        landmarkId: validatedComment.landmarkId,
      },
    });

    revalidatePath(`/landmark/${validatedComment.landmarkId}`);
    return { message: "Comment posted successfully.!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};

export const fetchComments = async ({ landmarkId }: { landmarkId: string }) => {
  const comments = await db.comment.findMany({
    where: { landmarkId, parentId: null },
    include: {
      profile: {
        select: { firstName: true, lastName: true, profileImage: true },
      },
      replies: {
        include: {
          profile: {
            select: { firstName: true, lastName: true, profileImage: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return comments;
};

export const createReplyAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const reply = rawData.reply as string;
    const parentId = rawData.parentId as string;
    const landmarkId = rawData.landmarkId as string;

    if (!reply?.trim()) throw new Error("Please enter your reply");
    if (!parentId) throw new Error("Invalid comment");

    await db.comment.create({
      data: {
        comment: reply,
        rating: 0,
        profileId: user.id,
        landmarkId,
        parentId,
      },
    });

    revalidatePath(`/landmark/${landmarkId}`);
    return { message: "Reply posted successfully!", code: 200 };
  } catch (err) {
    return renderError(err, 402);
  }
};
